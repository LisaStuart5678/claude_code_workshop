---
name: sql-style
description: >
  Use when writing, reviewing, or debugging
  SQL queries for our Postgres database.
---
## Required Patterns
- Always use CTEs instead of subqueries
- No SELECT * in production queries
- Wrap queries in EXPLAIN ANALYZE
## Example
WITH active_users AS (
  SELECT id, email FROM users WHERE active = true
)
SELECT au.email, COUNT(o.id) FROM ...
