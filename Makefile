lint-frontend:
	make -C frontend lint

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npm start

develop:
	make start-backend & make start-frontend

build:
	rm frontend/build -rf
	npm run build