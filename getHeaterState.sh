#!/bin/bash

# Author: Michal Pupak - 299128
# Date: 27.11.22

# P9_23 GPIO_49
# echo $(cat /sys/class/gpio/gpio49/value)

cat /sys/class/leds/beaglebone:green:usr0/brightness
