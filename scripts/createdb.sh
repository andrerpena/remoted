#!/usr/bin/env bash

. ./scripts/common.sh

createdb2() {
  createdb \
   -E UTF8 \
   -T template0 \
   --username=${PGUSER} \
   --no-password \
   $1
  psql $1 ${PGUSER} --file ./db/db.sql
}

createdb2 "${PGDATABASE}"
createdb2 "${PGDATABASE_TEST}"

#createdb \
# -E UTF8 \
# -T template0 \
# --username=${PGUSER} \
# --no-password \
# ${PGDATABASE}

# psql -d postgres -U ${PGUSER} -f ./db/db.sql

#createdb -E UTF8 --lc-collate C --lc-ctype C -T template0 ${PGDATABASE_TEST}
