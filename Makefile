install:
	npm ci

	# develop:
	# 	npx webpack serve --mode development --hot --open

build:
	npm run build

lint:
	npx eslint .