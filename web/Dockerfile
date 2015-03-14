FROM node:0.12-onbuild

# Install bower
RUN npm install bower -g

# Install bower dependencies
RUN bower --allow-root install -p

# Port the Node Express server should listen on.
ENV PORT 3000

# When running this container it needs to know the URL
# of the endpoint where the data service is running. This
# needs to be specified via the environment variable
# CONF_RAT_DATA_SERVICE_URL. In case you're linking
# this container with the container where the data service
# is running then you can create this environment variable
# while running the container like so:
#
#   docker run -d --name cr-web -p 3000:3000 --link cr-data-service:crds -e CONF_RAT_DATA_SERVICE_URL=http://crds:3001/ avranju/cr-web 

EXPOSE $PORT
