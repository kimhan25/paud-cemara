# =====================================================================
# PAUD Cemara — container build (Apache + PHP 8.3 + pdo_pgsql)
# Cocok untuk Railway / Render / Fly.io / VPS Docker.
# =====================================================================
FROM php:8.3-apache

# Extension yang dibutuhkan
RUN apt-get update \
 && apt-get install -y --no-install-recommends libpq-dev \
 && docker-php-ext-install pdo pdo_pgsql \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Apache: aktifkan mod_rewrite + mod_headers
RUN a2enmod rewrite headers deflate

# Copy source
COPY . /var/www/html/

# Set permission folder uploads (writable oleh Apache)
RUN mkdir -p /var/www/html/uploads/{gallery,news,settings} \
 && chown -R www-data:www-data /var/www/html/uploads \
 && chmod -R 775 /var/www/html/uploads

# Apache: izinkan .htaccess
RUN sed -ri 's!<Directory /var/www/>!<Directory /var/www/>\n    AllowOverride All!' \
       /etc/apache2/apache2.conf

# PHP production settings
COPY --chown=root:root <<'EOF' /usr/local/etc/php/conf.d/paud.ini
display_errors = Off
log_errors = On
upload_max_filesize = 10M
post_max_size = 12M
session.cookie_httponly = 1
session.cookie_samesite = "Lax"
session.use_strict_mode = 1
EOF

# Railway / Render menyediakan $PORT; map ke Apache
ENV PORT=80
RUN sed -ri 's!Listen 80!Listen ${PORT}!' /etc/apache2/ports.conf \
 && sed -ri 's!<VirtualHost \*:80>!<VirtualHost *:${PORT}>!' /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80
CMD ["apache2-foreground"]
