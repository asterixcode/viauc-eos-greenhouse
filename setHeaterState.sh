#/bin/bash

if [[ ! -e /sys/class/gpio/gpio49 ]]
    then
        sudo sh -c "echo 49 > /sys/class/gpio/export"
fi

if [[ ! -eq]]
sudo sh -c "echo out > /sys/class/gpio/gpio49/direction"
 
if [ "$1" == "off" ]
    then
        sudo sh -c "echo 0 > /sys/class/gpio/gpio49/value"
elif [ "$1" == "on" ]
    then
        sudo sh -c "echo 1 > /sys/class/gpio/gpio49/value"
else
    :
fi

