#!/bin/bash
#command to compile the c++ code to read from hih8120Sensor
g++ I2CDevice.h I2CDevice.cpp hih8120Sensor.h hih8120Sensor.cpp main.cpp -o readTempHum

# set read write execute permissions to the output file
chmod a+rwx readTempHum