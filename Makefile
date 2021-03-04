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
	@echo "  clear        > clear grav cache"
	@echo ""
	@echo "  lint         > check frontend code for errors and bad style"
	@echo "  watch        > start watching frontend code"
	@echo "  build        > build frontend"
	@echo "  cssmin       > quick frontend CSS minifing"
	@echo "  jsmin        > quick frontend JS minifing"
	@echo ""

.PHONY: install
install:
	.ddev/install.sh
	npm install --prefix user/themes/laube/

.PHONY: update
update:
	./bin/gpm selfupgrade
	./bin/gpm update

.PHONY: clear
clear:
	bin/grav cache

.PHONY: lint
lint:
	npm run lint --prefix user/themes/laube/

.PHONY: watch
watch:
	npm run watch --prefix user/themes/laube/

.PHONY: build
build:
	npm run build --prefix user/themes/laube/

.PHONY: cssmin
cssmin:
	npm run cssmin --prefix user/themes/laube/

.PHONY: jsmin
jsmin:
	npm run jsmin --prefix user/themes/laube/