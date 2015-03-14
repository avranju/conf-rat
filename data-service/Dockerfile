FROM node:0.12-onbuild

# Run service using file based persistence driver
# by default. Override this with the value ./drivers/documentdb
# to use an Azure DocumentDB based storage driver.

ENV CONF_RAT_DATA_DRIVER ./drivers/json-file

# When using the DocumentDB storage driver, uncomment and
# initialize the following environment variables with
# the correct DocumentDB host name and auth key.

# ENV DOCUMENTDB_HOST https://nerdworks.documents.azure.com:443/
# ENV DOCUMENTDB_AUTH_KEY Hls0MEmKKHqIuFt72gJYMVlj1MTkAZvzBSem5m+nMvR837tkEAiIcYgWGwxdKK0eycHQK1Uv8VDJCIoYd3Y1SQ==

# Port the Node Express server should listen on.
ENV PORT 3001

EXPOSE $PORT
