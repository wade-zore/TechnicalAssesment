up:
	@docker-compose up

dup:
	@docker-compose up -d

build:
	@docker-compose build --build-arg BUILD=DEV

stop:
	@docker-compose stop

down:
	@docker-compose down

makemigrations:
	@docker-compose run --rm backend python manage.py makemigrations

migrate:
	@docker-compose run --rm backend python manage.py migrate

shell:
	@docker-compose run --rm backend python manage.py shell

createsuperuser:
	@docker-compose run --rm backend python manage.py createsuperuser

logs:
	@docker-compose logs -tf backend

test:
	@docker-compose run --rm backend pytest --cov=. --cov-report=term-missing


