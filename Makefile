.PHONY: clean dev prod dumpdb dropdb createdb

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

dumpdb:
	./scripts/dumpdb.sh

dropdb:
	./scripts/dropdb.sh

createdb:
	./scripts/createdb.sh