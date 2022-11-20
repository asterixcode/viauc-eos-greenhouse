#include <iostream>
#include "hih8120Sensor.h"

int main(int argc, char **argv) {
    hih8120Sensor::hih8120Sensor hih8120Sensor(2, 0x27); //Instantiate the sensor class
    
    //Logical decision to measure either temperature or humidity based on the 1st argument
    if (std::string(argv[1]) == "temperature") {
        hih8120Sensor.readTemperature();
        std::cout << hih8120Sensor.temperature << std::endl; 
    }
    else if (std::string(argv[1]) == "humidity") {
        hih8120Sensor.readHumidity();
        std::cout << hih8120Sensor.humidity << std::endl;
    }
    else {
        std::cout << "Argument error" << std::endl;
        return 2;
    }
    return 0;
}
