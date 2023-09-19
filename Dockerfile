# STAGE 1 - build the react app
# set the base image to build from
# This is the application image from which all other subsequent
# applications run. Alpine Linux is a security-oriented, lightweight
#(~5Mb) Linux distribution.
FROM node:alpine AS build

# set working directory
# this is the working folder in the container from which the app
# will be running from
WORKDIR /usr/src/app

ENV REACT_APP_API_URL "https://api.dabou.best"
#ENV HTTPS true
#ENV CERT_PATH "src/certificate/localhost.pem"
#ENV KEY_PATH "src/certificate/localhost-key.pem"

# add the node_modules folder to $PATH
#ENV PATH /app/node_modules/.bin:$PATH

# copy package.json file to /app directory for installation prep
COPY ./package*.json /usr/src/app/

# install dependencies
RUN npm ci

# copy everything to /app directory
COPY . /usr/src/app

#RUN apk update && \
#    apk add -q openssl && \
#    openssl req -newkey rsa:4096 -new -nodes -x509 -days 3650 -keyout /usr/src/app/certificate/localhost-key.pem -out ./src/https-server/certificate/localhost.pem \
#    -subj "/C=FR/ST=PACA/L=Marseille/O=Digitech/CN=example.com"


# set environment variables
#ENV REACT_APP_API_URL "http://back.node1"
#ENV HTTPS true

# build the app
RUN yarn build
#RUN npm run build

# STAGE 2 - build the final image using a nginx web server
# distribution and copy the react build files
FROM nginx:alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
#COPY --from=build /usr/src/app/certificates /home/certificate

# needed this to make React Router work properly
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for HTTP Traffic
EXPOSE 80
# Expose port 443 for HTTPS Traffic
EXPOSE 443

# start the nginx web server
CMD ["nginx", "-g", "daemon off;"]


