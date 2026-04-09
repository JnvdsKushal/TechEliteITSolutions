#!/usr/bin/env bash
# backend/build.sh
# Render runs this script to build the Django backend

set -o errexit  # exit on error

pip install -r requirements.txt

python manage.py collectstatic --noinput

python manage.py migrate