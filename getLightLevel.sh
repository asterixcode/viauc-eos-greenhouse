#!/bin/bash

# Author: Michal Pupak - 299128
# Date: 27.11.22

#change to proper directory
cd /sys/class/pwm/pwmchip1/
cd pwm-1\:0

#read value from duty_cycle and calculate the light level
value=$(<duty_cycle)
result=$(($value/200000))
echo $result
