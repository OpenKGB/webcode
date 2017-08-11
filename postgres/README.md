This container contains persistent data
=======================================

This container holds postgres database AS WELL AS /media folder that contains user uploads (images etc.), mapped from database fields to the filesystem. Think twice before removing it.

How to build database container:
================================

Just run:

    docker build -t webcode-postgres .

How to run database container:
==============================

    docker run --name webcode-postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=thisisahugesecret -v /srv/openkgb/webcode/django/media:/srv/openkgb/media -d webcode-postgres

You can optionally map container port to a different host port with `-p host_port:container_post" e.g.:

    -p 5433:5432

For additional information, see:

 * https://hub.docker.com/_/postgres/
 * https://docs.docker.com/engine/examples/postgresql_service/
