#include "hih8120Sensor.h"

#include <iostream>
#include <unistd.h>
#include <math.h>
#include <stdio.h>
#include <bitset>
#include <iomanip> 

using namespace std;

namespace hih8120Sensor{
hih8120Sensor::hih8120Sensor(unsigned int I2CBus, unsigned int I2CAddress):
        I2CDevice(I2CBus, I2CAddress){
        this->I2CAddress = I2CAddress;
        this->I2CBus = I2CBus;
        this->temperature = 0;  
        this->humidity = 0;
    }

void hih8120Sensor::readHumidity(){
    unsigned char* result = this->readDevice(4);

    int adjustedRes0 = result[0];

    if (result[0] > 63){
        adjustedRes0 = result[0] & ~(0x01 << 6);
    }

    unsigned int humidity = adjustedRes0 << 8 | result[1];
    this->humidity = floor((humidity/16383.0 * 100.0) * 10) / 10;
}

void hih8120Sensor::readTemperature(){
    unsigned char* result = this->readDevice(4);
    unsigned int temperature = result[2] << 6 | result[3] >> 2;
    this->temperature = floor((temperature/16383.0 * 165.0 - 40.0) * 10) / 10;
}

}