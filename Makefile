PHP_BIN             := php
COMPOSER_BIN        := composer
NPM_BIN				:= npm

.PHONY: list
list:
	@echo ""
	@echo "Useful targets:"
	@echo ""
	@echo "  install      > install everything to run the project"
	@echo "  update       > update grav and plugins to latest stable version"
	@echo "  user         > create a new user"
	@echo "  theme        > create a new blank theme"
	@echo "  plugin       > create a new blank plugin"
	@echo ""
	@echo "  init         > prepare to setup a new project"
	@echo ""

.PHONY: install
install:
	.ddev/install.sh

.PHONY: init
init:
	.ddev/initialize.sh

.PHONY: update
update:
	./bin/gpm selfupgrade
	./bin/gpm update

.PHONY: user
user:
	./bin/plugin login newuser -s enabled

.PHONY: theme
theme:
	bin/plugin devtools new-theme

.PHONY: plugin
plugin:
	bin/plugin devtools new-plugin

.PHONY: lint
lint:
	npm run lint --prefix user/themes/chassis/

.PHONY: watch
watch:
	npm run watch --prefix user/themes/chassis/

.PHONY: build
build:
	npm run build --prefix user/themes/chassis/

.PHONY: cssmin
cssmin:
	npm run cssmin --prefix user/themes/chassis/