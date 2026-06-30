# .claude — Team Claude Code Configuration

This directory contains the shared Claude Code setup for the Meridian Portal project.
Clone the repo and run `claude` — this configuration loads automatically.

## What's in here

### CLAUDE.md
Claude's standing brief for this project. Loaded at the start of every session.
Contains: project overview, tech stack, coding standards, key file locations,
and rules Claude must always follow.

### settings.json
Hook configuration. Currently active hooks:
- PostToolUse (Edit|Write) → runs `npm test` after every file edit
  Claude sees test failures and fixes them without being asked.

### skills/sql-style/SKILL.md
Enforces our SQL conventions automatically on any SQL task.
Loads only when Claude is writing, reviewing, or debugging SQL.
Key rules: CTEs over subqueries, no SELECT *, EXPLAIN ANALYZE wrapper.

## How to use
1. Clone the repo
2. Run `claude` in the project root
3. Claude reads CLAUDE.md and your Skills are available immediately
4. No setup required — the hooks fire automatically on file edits

## Making changes
Treat CLAUDE.md updates like code changes — open a PR, get a review, merge.
Every improvement is instantly shared with the whole team on git pull.
