FROM postgres:16-alpine

ENV POSTGRES_DB=appdb
ENV POSTGRES_USER=appuser
ENV POSTGRES_PASSWORD=securepassword

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432