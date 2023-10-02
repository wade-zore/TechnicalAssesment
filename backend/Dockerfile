FROM python:3.10-slim as builder
RUN apt-get update && \
    apt-get install -y --no-install-recommends gcc
RUN mkdir -p /app
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY backend/requirements.txt /app/
RUN pip install -r requirements.txt

# final stage
FROM python:3.10-slim
RUN mkdir -p /app
WORKDIR /app
COPY --from=builder /app/requirements.txt .
RUN pip install -r requirements.txt

COPY ./backend /app/


CMD ["python","manage.py", "runserver", "0.0.0.0:8000"]