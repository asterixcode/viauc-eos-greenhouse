#!/bin/bash
# Author: Michal Pupak - 299128
# Date: 27.11.22

if [[ ! -e /sys/class/gpio/gpio49 ]]
    then
        sudo sh -c "echo 49 > /sys/class/gpio/export"
fi

sudo sh -c "echo out > /sys/class/gpio/gpio49/direction"

if [ "$1" == "off" ]
    then
	echo off
        sudo sh -c "echo 0 > /sys/class/gpio/gpio49/value"
elif [ "$1" == "on" ]
    then
	echo on
        sudo sh -c "echo 1 > /sys/class/gpio/gpio49/value"
else
	echo skip...
	exit 1
fi
