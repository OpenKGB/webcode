This is our website webserver
=============================

It runs uwsgi server within and serves our website to 8000 port. It is also supposed to be connected
to a postgres container to store all the data in postgres.

It also contains a static folder that maps to the host filesystem.


How to build django webserver container:
========================================

Just run:

    docker build -t django .

How to run this container:
==========================

This container needs database container, called postgres, to be up and running.

To start this container, use the following command:

    docker run --name django -d -p 8000:8000 --link postgres:postgres --volumes-from postgres -v /srv/webcode/static/ django


Flags explanation:

 * --link flag writes address resolution for postgres to /etc/hosts
 * --volumes-from takes /media folder from postgres container
 * -v creates /static volume
