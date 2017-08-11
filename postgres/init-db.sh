#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" << EOSQL
    CREATE DATABASE db;
    GRANT ALL PRIVILEGES ON DATABASE db TO postgres;
EOSQL
