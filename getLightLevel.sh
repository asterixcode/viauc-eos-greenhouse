#!/bin/bash

cd /sys/class/pwm/pwmchip1/
cd pwm-1\:0
value=$(<duty_cycle)
result=$(($value/200000))
echo $result