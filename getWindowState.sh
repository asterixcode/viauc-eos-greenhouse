var=$(cat /sys/class/pwm/pwmchip1/pwm-1\:1/duty_cycle)
if [ $var == 1000000 ]
    then
        echo 'open'
elif [ $var == 2000000 ]
    then    
        echo 'close'
else
    echo 'unkown'
fi
