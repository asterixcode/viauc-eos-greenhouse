#!bin/bash

# raw volatage levels can be read from the following path according to the book
cd /sys/bus/iio/devices/iio:device0
cat in_voltage0_raw
