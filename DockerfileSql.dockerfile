FROM postgres 
ENV POSTGRES_USER postgres
ENV PDATA /data/postgres
ENV POSTGRES_PASSWORD postgrespassword
ENV POSTGRES_DB postgres
COPY init.sql /docker-entrypoint-initdb.d/