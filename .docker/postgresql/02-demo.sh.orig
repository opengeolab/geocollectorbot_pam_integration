#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  \connect $APP_DB_NAME $POSTGRES_USER
  BEGIN;
    INSERT INTO webuser (username, password, groupname) VALUES ('user1', 'user1', 'admins');
    INSERT INTO webuser (username, password, groupname) VALUES ('user2', 'user2', 'users');
  COMMIT;
  BEGIN;
    INSERT INTO interactions (id, created_at, username, site_of_interest, chat_id, curr_step_id, interaction_state, description, location, media, deleted) VALUES (100,'2022-02-18', 'user1', 'Parco Spina Verde', 1, 'step_1', 'ongoing', 'title_1', 'description 1', ST_GeomFromText('POINT(9.07 45.80)', 4326), ARRAY['/uploads/Parco_SpinaVerde.jpg','/uploads/img1.jpg','/uploads/video1.mp4'], false);

    INSERT INTO interactions (id, created_at, username, site_of_interest, chat_id, curr_step_id, interaction_state, description, location, media, deleted) VALUES (101,'2022-02-19', 'user2', 'Parco Pineta', 2, 'step_2', 'aborted', 'title_2', 'description 2', ST_GeomFromText('POINT(8.93 45.73)', 4326), ARRAY['/uploads/Parco_Pineta.jpg','/uploads/img2.jpg','/uploads/img3.jpg','/uploads/video2.webm'], false);

    INSERT INTO interactions (id, created_at, username, site_of_interest, chat_id, curr_step_id, interaction_state, description, location, media, deleted) VALUES (102,'2022-04-20', 'user3', 'Parco Campo dei Fiori', 3, 'step_3', 'completed', 'title_3', 'description 3', ST_GeomFromText('POINT(8.75 45.87)', 4326), ARRAY['/uploads/Parco_CampoFiori.jpg','/uploads/img4.jpg'], false);

    INSERT INTO interactions (id, created_at, username, site_of_interest, chat_id, curr_step_id, interaction_state, description, location, media, deleted) VALUES (103,'2022-07-21', 'user3', 'Parco del Penz', 3, 'step_3', 'completed', 'title_3', 'description 3', ST_GeomFromText('POINT(9.01 45.83)', 4326), ARRAY['/uploads/Parco_Penz.jpg','/uploads/img5.jpg', '/uploads/img6.jpg'], false);

    INSERT INTO interactions (id, created_at, username, site_of_interest, chat_id, curr_step_id, interaction_state, description, location, media, deleted) VALUES (104,'2022-09-22', 'user3', 'Parco delle Gole della Breggia', 3, 'step_3', 'completed', 'title_3', 'description 3', ST_GeomFromText('POINT(9.00 45.89)', 4326), ARRAY['/uploads/Parco_GoleBreggia.jpg','/uploads/img7.jpg'], false);

  COMMIT;
  BEGIN;
    INSERT INTO messages (id, created_at, status, message, id_interaction, sent) VALUES (1000, '2022-02-18', 1, 'message 1', 100, false);
    INSERT INTO messages (id, created_at, status, message, id_interaction, sent) VALUES (1001, '2022-02-19', 1, 'message 2', 100, true);
    INSERT INTO messages (id, created_at, status, message, id_interaction, sent) VALUES (1002, '2022-03-20', 2, 'message 3', 101, false);
    INSERT INTO messages (id, created_at, status, message, id_interaction, sent) VALUES (1003, '2022-07-21', 3, 'message 4', 102, true);
  COMMIT;
EOSQL
