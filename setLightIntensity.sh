#!/bin/bash

config-pin P9_22 pwm
sh -c "echo 1 > export"
cycle=$((200000 * $1))
cd /sys/class/pwm/pwmchip1/
cd pwm-1\:0
sh -c "echo 20000000 > period"
sh -c "echo ${cycle} > duty_cycle"
sh -c "echo 1 > enable"