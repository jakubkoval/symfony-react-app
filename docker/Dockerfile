FROM php:8.1-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Enable Apache modules
RUN a2enmod rewrite
# Install any extensions you need
RUN docker-php-ext-install mysqli pdo pdo_mysql
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add NodeSource APT repository
RUN curl -sL https://deb.nodesource.com/setup_21.x | bash -

# Install Node.js
RUN apt-get install -y nodejs

#install some base extensions
RUN apt-get install -y \
        libzip-dev \
        zip \
  && docker-php-ext-install zip

# Check that Node.js and NPM were correctly installed
RUN node -v
RUN npm -v

# Set the working directory to /var/www/html
WORKDIR /var/www/html