FROM debian:latest

RUN apt-get update && apt-get install -y --force-yes --no-install-recommends \
    ca-certificates \
    gettext-base \
    nginx \
    sed \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


# Copy nginx configuration, certificate and private key to the image

COPY openkgb.conf /etc/nginx/sites-available/default
COPY openkgb.crt /etc/ssl/private/
COPY openkgb.key /etc/ssl/private/

EXPOSE 80 443

CMD /bin/bash -c '/usr/sbin/nginx -g "daemon off;"'
