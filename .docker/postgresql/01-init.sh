#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE DATABASE $APP_DB_NAME;
  \connect $APP_DB_NAME $POSTGRES_USER
  BEGIN;
    CREATE EXTENSION IF NOT EXISTS postgis;
    CREATE EXTENSION IF NOT EXISTS pgcrypto;
  COMMIT;
  CREATE USER $APP_DB_USER WITH PASSWORD '$APP_DB_PASS';
  GRANT ALL PRIVILEGES ON DATABASE $APP_DB_NAME TO $APP_DB_USER;
  \connect $APP_DB_NAME $APP_DB_USER
  BEGIN;
    CREATE TABLE IF NOT EXISTS interactions (
      id SERIAL,
      chat_id bigint NOT NULL,
      username character varying,
      curr_step_id character varying,
      interaction_state character varying,
      created_at timestamp with time zone,
      updated_at timestamp with time zone,
      title character varying,
      description character varying,
      location geometry(Point,4326),
      site_of_interest character varying,
      media character varying[],
      deleted boolean,
      CONSTRAINT data_pkey PRIMARY KEY (id)
  );
  COMMIT;
  BEGIN;
    CREATE TABLE IF NOT EXISTS messages (
      id SERIAL,
      status integer,
      message character varying,
      id_interaction integer,
      created_at timestamp with time zone,
      to_send boolean,
      sent boolean,
      sent_at timestamp with time zone,
      CONSTRAINT messages_pkey PRIMARY KEY (id),
      CONSTRAINT messages_fkey FOREIGN KEY (id_interaction)
        REFERENCES interactions (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
  );
  COMMIT;
  BEGIN;
    CREATE TABLE IF NOT EXISTS webuser (
      username character varying NOT NULL,
      password character varying(255)NOT NULL,
      groupname character varying NOT NULL,
      CONSTRAINT user_pkey PRIMARY KEY (username)
  );
  COMMIT;
EOSQL
