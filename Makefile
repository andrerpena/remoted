.PHONY: clean dev prod

clean:
	rm -rf ./build
	rm -rf ./build-server

dev:
	npm rum start:dev

dev-server:
	npm run start:dev:server

build:
	npm run build

build-server:
	npm run build:server

prod: clean build build-server
	npm run start:server
