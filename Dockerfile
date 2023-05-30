# pull official base image
FROM python:3.10-alpine

WORKDIR /app

# install psycopg2 dependencies
RUN apk update \
   && apk add postgresql-dev gcc musl-dev jpeg-dev zlib-dev


# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install python dependencies
COPY requirements.txt /app/requirements.txt
RUN pip install --upgrade pip
RUN pip install -U setuptools
RUN pip install --no-cache-dir -r requirements.txt

# copy project
COPY . .
