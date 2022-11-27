#!/bin/bash

# Author: Michal Pupak - 299128
# Date: 27.11.22

config-pin P9_22 pwm
sh -c "echo 1 > export"

#calculate value to pass to duty_cycle, 200000 represents 1% intensity, $1 is desired intensity
cycle=$((200000 * $1))
#go to correct directory and update period, duty_cycle, and enable to update intensity 
cd /sys/class/pwm/pwmchip1/
cd pwm-1\:0
sh -c "echo 20000000 > period"
sh -c "echo ${cycle} > duty_cycle"
sh -c "echo 1 > enable"
