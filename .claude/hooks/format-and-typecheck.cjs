#!/usr/bin/env node
// PostToolUse hook (matcher: Edit|Write|MultiEdit). Formats the edited file
// with Prettier, and for .ts/.tsx files also runs the project typecheck.
// Exiting 2 feeds stderr back to Claude so it can fix the errors it just
// introduced, instead of the change silently landing broken.
const { readFileSync } = require('node:fs')
const { execFileSync } = require('node:child_process')
const path = require('node:path')

let payload
try {
  payload = JSON.parse(readFileSync(0, 'utf-8'))
} catch {
  process.exit(0)
}

const filePath = payload?.tool_input?.file_path
if (!filePath) process.exit(0)

const ext = path.extname(filePath)
const FORMATTABLE = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.cjs',
  '.mjs',
  '.css',
  '.json',
  '.md',
  '.yml',
  '.yaml',
])
const TYPECHECKED = new Set(['.ts', '.tsx'])

if (FORMATTABLE.has(ext)) {
  try {
    execFileSync('npx', ['prettier', '--write', filePath], { stdio: 'ignore', shell: true })
  } catch {
    // A mid-edit syntax error can make Prettier choke; the typecheck below (or
    // the next lint pass) will surface real problems, so don't fail the hook here.
  }
}

if (TYPECHECKED.has(ext)) {
  try {
    execFileSync('npx', ['tsc', '-b', '--noEmit'], { stdio: 'pipe', shell: true })
  } catch (err) {
    const output = (err.stdout?.toString() ?? '') + (err.stderr?.toString() ?? '')
    process.stderr.write(`TypeScript errors after editing ${filePath}:\n${output}\n`)
    process.exit(2)
  }
}

process.exit(0)
