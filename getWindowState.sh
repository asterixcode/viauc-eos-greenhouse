#!/bin/bash

# Author: Michal Pupak - 299128
# Date: 27.11.22

#read the duty_cycle value from proper directory
var=$(cat /sys/class/pwm/pwmchip1/pwm-1\:1/duty_cycle)

#values are taken from Servo Motor SG90 datasheet, echo correct value 
if [[ $var == 1000000 ]]
    then
        echo 'open'
elif [[ $var == 2000000 ]]
    then    
        echo 'close'
else
    echo 'unkown'
fi
