#!/usr/bin/env bash

. ./scripts/common.sh

# Expects PGDATABASE, PGUSER and PGPASSWORD to be set
pg_dump --schema-only \
  --no-password \
  -f db/db.sql -p \
  5432