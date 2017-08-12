FROM debian:latest

ADD . /srv/webcode
COPY openkgb.ini /etc/uwsgi/apps-available/openkgb.ini
COPY openkgb.ini /etc/uwsgi/apps-enabled/openkgb.ini

# Install dependencies

RUN apt-get update && apt-get install -y git \
	curl \
    g++ \
    python3.5 \
    libpython3.5-dev \
    uwsgi \
    uwsgi-plugin-python \
    python3-psycopg2

RUN easy_install pip

RUN pip install -r /srv/webcode/requirements.txt

# Set up node.js and build frontend

RUN curl --silent --location https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs

RUN npm install -g webpack

WORKDIR /srv/workflows/workflows/frontend
RUN npm install
RUN mkdir -p ../static
RUN mkdir -p ../../static
RUN npm build

# Get everything ready and run

WORKDIR /srv/workflows
RUN python manage.py check
RUN python manage.py collectstatic --clear --noinput

CMD /bin/bash -c "python manage.py makemigrations --noinput; python manage.py migrate --noinput; /usr/bin/uwsgi --emperor /etc/uwsgi/apps-enabled/openkgb.ini"
