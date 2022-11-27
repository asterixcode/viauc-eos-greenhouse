#!/bin/bash

# Author: Michal Pupak - 299128
# Date: 27.11.22

# raw voltage levels can be read from the following path according to the book
cd /sys/bus/iio/devices/iio:device0
cat in_voltage0_raw
