FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf

#COPY init.sql /docker-entrypoint-initdb.d/
#####################################3
FROM postgres 
ENV POSTGRES_USER postgres
ENV PDATA /data/postgres
ENV POSTGRES_PASSWORD postgrespassword
ENV POSTGRES_DB postgres
COPY init.sql /docker-entrypoint-initdb.d/
