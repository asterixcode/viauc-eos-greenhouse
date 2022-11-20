# Embedded Operating System @ VIA UC

Greenhouse Project for BeagleBone Black

## Main technologies used

- bash
- c++
- node.js

### The project also uses:
- HTML, CSS, JavaScript
- Bootstrap
- socket.io

# How to run

## 1. Clone the project 

`$ git clone https://github.com/asterixcode/viauc-eos-greenhouse.git`

## 2. Transfer the following files to the BeagleBone Black

`$ scp server.js index.html index.js styles.css username@beaglebone.local:~/greenhouse-project`

`$ scp getDaylight.sh getHeaterState.sh getLightLevel.sh getWindowState.sh setHeaterState.sh setLightLevel.sh setWindowState.sh build.sh username@beaglebone.local:~/greenhouse-project`

`$ scp hih8120Sensor.h hih8120Sensor.cpp I2CDevice.h I2CDevice.cpp main.cpp username@beaglebone.local:~/greenhouse-project`

`$ scp package.json username@beaglebone.local:~/greenhouse-project`

## 3. Set executable permissions on the following files:

`$ sudo chmod a+x getHeaterState.sh getLightLevel.sh getWindowState.sh setHeaterState.sh setLightLevel.sh setWindowState.sh build.sh`

## 4. Install dependencies

`$ npm install`

## 5. Compile the c++ code (reads temperature and humidity)

`$ ./build.sh`

## 6. Run the server with sudo permissions

```$ sudo node server.js```
