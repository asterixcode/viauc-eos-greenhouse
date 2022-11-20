# About

### _> Greenhouse Project for BeagleBone Black_<br>

Project developed as an assignment for Embedded Operating System course EOS1 @ VIA University College Horsens.

## Built With

- bash
- c++
- node.js
- socket.io
- Bootstrap
- HTML, CSS, JavaScript

# How to run

## 1. Clone the project 

```sh
git clone https://github.com/asterixcode/viauc-eos-greenhouse.git
```

</br>

## 2. Transfer via ssh/scp the following files to the BeagleBone Black (replace with your username)

```sh
scp server.js index.html index.js styles.css getDaylight.sh getHeaterState.sh getLightLevel.sh getWindowState.sh setHeaterState.sh setLightLevel.sh setWindowState.sh build.sh hih8120Sensor.h hih8120Sensor.cpp I2CDevice.h I2CDevice.cpp main.cpp package.json username@beaglebone.local:~/greenhouse-project
```

</br>

## 3. Set executable permissions on the following files:

```sh 
sudo chmod a+x getHeaterState.sh getLightLevel.sh getWindowState.sh setHeaterState.sh setLightLevel.sh setWindowState.sh build.sh
```

</br>

## 4. Install dependencies

```sh 
npm install
```

</br>

## 5. Compile the c++ code

```sh
./build.sh
```

</br>

## 6. Run the server with sudo permissions

```sh
sudo node server.js
```

</br>

# Features implemented

> Read data
- [x] live monitoring of the sensors
- [x] read temperature
- [x] read humidity
- [x] read day light
- [x] read window position (open/close)
- [x] read heater status (on/off)
- [x] read light intensity of the LED

> Control of actuators
- [x] open/close the window (servo motor)
- [x] turn on/off the heater
- [x] change the light intensity of the LED