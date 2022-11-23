#!/bin/bash

#Pin P9_21
config-pin P9_21 pwm
cd /sys/class/pwm/pwmchip1/
cd pwm-1\:1
sudo sh -c "echo 20000000 > period" #set period to 20 ms

#Pass corresponding value to duty_cycle based on the argument provided by the caller
if [ "$1" == "open" ]
    then
        sudo sh -c "echo 1000000 > duty_cycle"
elif [ "$1" == "close" ]
    then
        sudo sh -c "echo 2000000 > duty_cycle"
else
        sudo sh -c "echo 1500000 > duty_cycle"
fi
sudo sh -c "echo 1 > enable" #enable PWM output
