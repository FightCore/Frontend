# Original source: https://mherman.org/blog/dockerizing-an-angular-app/
# Docker file meant for "production" use.

# base image
FROM node:12.14.0 as build

RUN apt-get update

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@9.1.9

# add app
COPY . /app

# generate build
RUN ng build --prod --output-path=dist

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
