FROM python:3

# Copy django code to the image

ADD . /srv/webcode

# Copy uWSGI settings to the image

COPY openkgb.ini /etc/uwsgi/apps-available/openkgb.ini
COPY openkgb.ini /etc/uwsgi/apps-enabled/openkgb.ini

# Install dependencies

RUN apt-get update && apt-get install -y git \
	curl \
    g++ \
    python3.5 \
    libpython3.5-dev \
    python3-pip \
    uwsgi \
    uwsgi-plugin-python3 \
    python3-psycopg2

RUN pip3 install --no-cache-dir -r /srv/webcode/requirements.txt

# Get everything ready and run

WORKDIR /srv/webcode/webcode
RUN python3 manage.py check
RUN python3 manage.py collectstatic --clear --noinput

CMD /bin/bash -c "python3 manage.py makemigrations --noinput; python3 manage.py migrate --noinput; /usr/bin/uwsgi --emperor /etc/uwsgi/apps-enabled/openkgb.ini"
