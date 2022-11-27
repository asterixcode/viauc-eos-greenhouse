#!/bin/bash

# Author: Michal Pupak - 299128, Lucas Krause Saldanha – 300709
# Date: 27.11.22


#command to compile the c++ code to read from hih8120Sensor
g++ I2CDevice.h I2CDevice.cpp hih8120Sensor.h hih8120Sensor.cpp main.cpp -o readTempHum

# set read write execute permissions to the output file
chmod a+rwx readTempHum
