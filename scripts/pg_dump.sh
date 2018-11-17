#!/usr/bin/env bash

# Expects PGDATABASE, PGUSER and PGPASSWORD to be set
pg_dump --schema-only \
  --no-password \
  -f db/setupDb.sql -p 5432