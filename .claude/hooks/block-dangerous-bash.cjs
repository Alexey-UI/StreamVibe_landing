#!/usr/bin/env node
// PreToolUse hook (matcher: Bash). Reads the tool-call payload from stdin and
// blocks (exit 2) commands that are destructive or hard to reverse. Adjust the
// pattern list to taste — this is a safety net, not a policy engine.
const { readFileSync } = require('node:fs')

let payload
try {
  payload = JSON.parse(readFileSync(0, 'utf-8'))
} catch {
  process.exit(0)
}

const command = payload?.tool_input?.command ?? ''

const DANGEROUS_PATTERNS = [
  [/\brm\s+(-\w*\s+)*-\w*[rR]\w*/i, 'recursive rm'],
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
  [/Remove-Item\s+.*-Recurse\b.*-Force\b/i, 'Remove-Item -Recurse -Force'],
  [/\bdel\s+\/[fF]\s+\/[sS]\s+\/[qQ]\b/i, 'del /f /s /q'],
]

for (const [pattern, label] of DANGEROUS_PATTERNS) {
  if (pattern.test(command)) {
    process.stderr.write(
      `Blocked by block-dangerous-bash hook: looks like "${label}".\n` +
        `Command: ${command}\n` +
        'If this is genuinely intended, run it yourself outside Claude Code rather than through the Bash tool.\n',
    )
    process.exit(2)
  }
}

process.exit(0)
