#!/usr/bin/env node
// PreToolUse hook (matcher: Bash|PowerShell — see .claude/settings.json). Reads
// the tool-call payload from stdin and blocks (exit 2) commands that are
// destructive or hard to reverse. This is a safety net, not a policy engine:
// patterns are conservative on purpose (fail closed on anything ambiguous),
// but recursive-delete of known disposable build/dependency directories is
// allowed since that's routine, safe, fully-reversible dev workflow (e.g.
// `rm -rf node_modules` to fix a corrupted lockfile install).
const { readFileSync } = require('node:fs')

let payload
try {
  payload = JSON.parse(readFileSync(0, 'utf-8'))
} catch {
  process.exit(0)
}

const command = payload?.tool_input?.command ?? ''

// Directories safe to recursively wipe: disposable build/dependency output,
// never hand-authored source. Extend this list as the project grows.
const DISPOSABLE_DIRS = new Set([
  'node_modules',
  'dist',
  'dist-ssr',
  'build',
  'out',
  'coverage',
  'playwright-report',
  'test-results',
  '.cache',
  '.turbo',
  '.parcel-cache',
  '.vite',
])

function basenameOf(rawPath) {
  const trimmed = rawPath
    .trim()
    .replace(/["']/g, '')
    .replace(/[/\\]+$/, '')
  const parts = trimmed.split(/[/\\]/)
  return { full: trimmed, base: parts[parts.length - 1], segments: parts }
}

/** True only if every path argument is a bare disposable-dir name (no nesting, no `..`, not absolute/home). */
function allTargetsAreDisposable(pathArgs) {
  if (pathArgs.length === 0) return false
  return pathArgs.every((arg) => {
    const { full, base, segments } = basenameOf(arg)
    if (!full || full === '/' || full === '~' || full === '.' || full === '..') return false
    if (full.includes('..')) return false
    if (full.startsWith('/') || full.startsWith('~') || /^[A-Za-z]:/.test(full)) return false
    if (segments.length > 1) return false // only bare "node_modules", not "some/nested/node_modules"
    return DISPOSABLE_DIRS.has(base)
  })
}

function checkRm(stmt) {
  const match = stmt.match(/\brm\s+((?:-[\w-]+\s+)*)(.+)/i)
  if (!match) return null
  const flags = match[1]
  if (!/[rR]/.test(flags.replace(/-/g, '').match(/^\S*/)?.[0] ?? '') && !/-r\b/i.test(flags)) {
    // not actually recursive, not our concern here
    return null
  }
  const args = match[2].split(/\s+/).filter(Boolean)
  return allTargetsAreDisposable(args) ? null : 'recursive rm'
}

function checkRemoveItem(stmt) {
  if (!/-Recurse\b/i.test(stmt) || !/-Force\b/i.test(stmt)) return null
  const match = stmt.match(/Remove-Item\s+(.+)/i)
  const args = (match?.[1] ?? '').split(/\s+/).filter((tok) => tok && !tok.startsWith('-'))
  return allTargetsAreDisposable(args) ? null : 'Remove-Item -Recurse -Force'
}

// Split on shell chaining so `rm -rf node_modules && something-else-dangerous`
// still gets each statement evaluated independently.
const statements = command.split(/&&|;|\|(?!\|)/)

const OTHER_PATTERNS = [
  [/\bsudo\b/i, 'sudo (privilege escalation)'],
  [/\bmkfs(\.\w+)?\b/i, 'filesystem format'],
  [/\bdd\s+if=/i, 'raw disk write (dd)'],
  [/>\s*\/dev\/sd[a-z]/i, 'raw disk write redirect'],
  [/\bchmod\s+-R\s+777\b/i, 'recursive chmod 777'],
  [/\bgit\s+push\s+(--force|-f)\b(?!.*--force-with-lease)/i, 'force push'],
  [/\bgit\s+reset\s+--hard\b/i, 'git reset --hard'],
  [/\bgit\s+clean\s+-\w*[fF]\w*[dD]\w*\b/i, 'git clean -fd'],
  [/(curl|wget)[^|]*\|\s*(sudo\s+)?(sh|bash|zsh)\b/i, 'pipe remote script to a shell'],
  [/\b(shutdown|reboot)\b/i, 'shutdown/reboot'],
  [/\bdel\s+\/[fF]\s+\/[sS]\s+\/[qQ]\b/i, 'del /f /s /q'],
]

function block(label) {
  process.stderr.write(
    `Blocked by block-dangerous-bash hook: looks like "${label}".\n` +
      `Command: ${command}\n` +
      'If this is genuinely intended, run it yourself outside Claude Code rather than through this tool.\n',
  )
  process.exit(2)
}

for (const stmt of statements) {
  const rmHit = checkRm(stmt)
  if (rmHit) block(rmHit)

  const riHit = checkRemoveItem(stmt)
  if (riHit) block(riHit)
}

for (const [pattern, label] of OTHER_PATTERNS) {
  if (pattern.test(command)) block(label)
}

process.exit(0)
