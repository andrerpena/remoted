#!/usr/bin/env bash

. ./scripts/common.sh

# Expects PGDATABASE, PGUSER and PGPASSWORD to be set
dropdb --if-exists ${PGDATABASE}
dropdb --if-exists ${PGDATABASE_TEST}