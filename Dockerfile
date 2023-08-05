FROM postgres:16beta2-alpine
ENV POSTGRES_DB=ecommercedatabase
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=ecommdb
COPY *.sql /docker-entrypoint-initdb.d/
EXPOSE 5432
