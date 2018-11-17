#!/usr/bin/env bash

. scripts/common.sh

# Expects PGDATABASE, PGUSER and PGPASSWORD to be set
echo $PGDATABASE
pg_dump --schema-only \
  --no-password \
  -f db/db.sql -p 5432