FROM debian:stretch-20170723

# Install dependencies
RUN apt-get update && apt-get install -y git \
    curl \
    g++ \
    python3.5 \
    libpython3.5-dev \
    python3-pip \
    uwsgi \
    uwsgi-plugin-python3 \
    python3-psycopg2 \
    nodejs

# Copy django code to the image
ADD . /srv/webcode

# Copy uWSGI settings to the image
COPY openkgb.ini /etc/uwsgi/apps-available/openkgb.ini
COPY openkgb.ini /etc/uwsgi/apps-enabled/openkgb.ini

# Install pip dependencies
RUN pip3 install --no-cache-dir -r /srv/webcode/requirements.txt

# Build frontend
WORKDIR /srv/webcode/webcode/frontend
RUN npm run build

# Get backend ready and run
WORKDIR /srv/webcode/webcode
RUN python3 manage.py check
RUN python3 manage.py collectstatic --clear --noinput

CMD /bin/bash -c "python3 manage.py makemigrations --noinput; python3 manage.py migrate --noinput; /usr/bin/uwsgi --emperor /etc/uwsgi/apps-enabled/openkgb.ini"
