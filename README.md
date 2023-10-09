Technical Assesment
=============

Employee Management system for my leveling up assessment


Requirements:
-------------

- [Docker](https://www.docker.com/get-started/)
- [node.js](https://nodejs.org/en)

Getting Started
---------------

1. Clone the repo:

```
$ git clone https://github.com/wade-zore/TechnicalAssesment.git
$ cd TechnicalAssesment
```

2. Build docker image

```
$ make build
```

3. Install npm:

```
$ make npm-install
```

4. Setup database

```
$ make migrate
$ make createsuperuser
```

5. Run tests

```
$ make test
```

7. Start the application

```
$ make dup
```

8. Start the application

```
You can access the app via 
http://localhost:3000/
```
