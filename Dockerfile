# Select a specific node version for better stability.
FROM node:10.16.0-jessie-slim

# Create the working folders.
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# Copy the dependencies to the app folder.
COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

# Install the dependencies and the Angular CLI
RUN npm install --save \
    && npm install -g @angular/cli

# Copy the rest of the source to the app folder.
COPY . /usr/src/app

# Serve the application so it can be visited.
CMD ng serve --host 0.0.0.0

# 4200 should be exposed as it's the port that will be served.
EXPOSE 4200:4200