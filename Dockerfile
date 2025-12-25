# Use the lightweight Alpine-based Apache image
FROM httpd:alpine

# Copy the HTML file to the standard Apache document root
# Note: The default path for Apache is different from Nginx
COPY *.html /usr/local/apache2/htdocs/index.html

# Expose port 80
EXPOSE 80

# The base image automatically handles the CMD to start Apache