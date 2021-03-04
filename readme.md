# laube

This ist the repository of my personal website https://sebastianlaube.de which uses [grav](https://getgrav.org).

## Installation

To get up and running:

````
make install
ddev start
````

### What it does

* Download and extract the latest grav
* Remove unneccesary stuff from the download
* Move the downloaded grav to root directory, so its also your webroot
* Install Plugins and themes defined in ``user/.dependencies``
* Upgrade grav and its plugins and themes, just to be sure
* Ask to add a new user

### you may also like:

| command | function |
|---|---|
| make install | install grav and dependencies |
| make update | update grav and plugins to latest stable version |
| make clear | clear grav cache |
| make watch | start watching frontend code |
| make build | build frontend |
| make cssmin | quick frontend CSS minifing |
| make jsmin | quick frontend JS minifing |

