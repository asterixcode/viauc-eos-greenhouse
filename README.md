# Embedded Operating System @ VIA UC

Greenhouse Project for BeagleBone Black

## Technologies used

- bash
- c++
- Node.js

## How to run

### 1. Install dependencies

$ npm install

### 2. Make sure the bash files are with executable permission

$ chmod a+x getHeaterState.sh getLightLevel.sh getWindowState.sh setHeaterState.sh setLightLevel.sh setWindowState.sh

### 3. Run the server with sudo permissions

$ sudo node server.js
