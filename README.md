# Trådfri App

Progressive web app to manage and control IKEA Trådfri lights using your browser or smartphone.

The IKEA app that you can download from the App/Play store has some basic functionality.
I want to do custom fancy stuff, so I decided to create a web app to do some experimentation.

Based on the [node-tradfri-client](AlCalzone/node-tradfri-client) from AlCalzone.

## Build Setup

### Server

Rename default.config.json to config.json and fill in your connection details.

When everything is set up, run a server that connects with your gateway:

`npm run server`

The server has some REST endpoints:

* `GET /tradfri/device` Get all devices
* `GET /tradfri/device/1` Get device with id 1
* `PUT /tradfri/device/1` Update device with id 1
* `PUT /tradfri/device/control/1` Control device with id 1

* `GET /tradfri/group` Get all groups
* `GET /tradfri/group/1` Get group with id 1
* `PUT /tradfri/group/1` Update group with id 1 
* `PUT /tradfri/group/control/1` Update group with id 1

The WebSocket channel is on `/updates`. 

### Front-end

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
