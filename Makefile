.PHONY: default build run_audit install dev audit

build:
	docker build --rm --force-rm -t sonny/lighthouse-demo .

run_audit:
	docker run --rm -it -v ${PWD}:/demo sonny/lighthouse-demo npm run audit

install:
	docker run --rm -it -v ${PWD}:/demo sonny/lighthouse-demo npm install

dev:
	docker run --rm -it -v ${PWD}:/demo sonny/lighthouse-demo /bin/bash

audit: build install run_audit
