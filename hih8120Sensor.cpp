// Author: Michal Pupak - 299128
// Date: 27.11.22

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

    int firstByte = result[0];
    
    //clear status bits if needed
    if (result[0] > 63){
        firstByte = result[0] & ~(0x01 << 6);
    }
    //concatinate first and second byte to get humidity reading
    unsigned int humidity = firstByte << 8 | result[1];
        
    //perform formula from HIH8120 sensor documentation to get humidity reading  
    this->humidity = floor((humidity/16382.0 * 100.0) * 10) / 10;
}

void hih8120Sensor::readTemperature(){
    unsigned char* result = this->readDevice(4);
        
    //concatinate 3rd and 4th byte to get temperature reading, exclude last 2 bits    
    unsigned int temperature = result[2] << 6 | result[3] >> 2;
    
    //perform formula from HIH8120 sensor documentation to get temperature reading
    this->temperature = floor((temperature/16382.0 * 165.0 - 40.0) * 10) / 10;
}

}
