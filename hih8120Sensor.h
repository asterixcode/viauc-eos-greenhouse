#include "I2CDevice.h"

namespace hih8120Sensor {

// hih8120Sensor implements the provided helper I2CDevice class to communicate via I2C bus   
class hih8120Sensor: protected exploringBB::I2CDevice {

public:
    float temperature;
    float humidity;
    
    hih8120Sensor(unsigned int I2CBus, unsigned int I2CAddress=0x53);
    void readTemperature();
    void readHumidity();

private:
    unsigned int I2CBus, I2CAddress;
};
}