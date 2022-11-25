#!/bin/bash

if [ ! "on" == "$1" ] && [ ! "off" == "$1" ]
  then 
    echo
    echo "ERROR: Invalid argument. Valid values: on or off."
    echo
    exit 1
fi

if [ "$1" == "on" ]
  then
    cd /sys/class/leds/beaglebone\:green\:usr0
    echo none > trigger
    echo 1 > brightness

    cd /sys/class/leds/beaglebone\:green\:usr1
    echo none > trigger
    echo 1 > brightness

    cd /sys/class/leds/beaglebone\:green\:usr2
    echo none > trigger
    echo 1 > brightness

    cd /sys/class/leds/beaglebone\:green\:usr3
    echo none > trigger
    echo 1 > brightness
    
elif [ "$1" == "off" ]
  then
    cd /sys/class/leds/beaglebone\:green\:usr0
    echo none > trigger
    echo 0 > brightness

    cd /sys/class/leds/beaglebone\:green\:usr1
    echo none > trigger
    echo 0 > brightness

    cd /sys/class/leds/beaglebone\:green\:usr2
    echo none > trigger
    echo 0 > brightness

    cd /sys/class/leds/beaglebone\:green\:usr3
    echo none > trigger
    echo 0 > brightness
fi
