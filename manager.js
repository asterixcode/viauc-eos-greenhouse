const exec = require('child_process').execSync;

module.exports = class Manager {

  constructor() {
    
  }
  // readHeaterState() {
  //   var result = exec("echo $(cat /sys/class/gpio/gpio49/value)").toString("utf8").trim();
  //   if (result == "0"){
  //       this.heaterState = "off";
  //   } else if(result == "1") {
  //       this.heaterState = "on";
  //   }
  // }

  handleHeater(newState) {
    var result = exec("sudo ./toggleHeater " + newState)
    // this.readHeaterState();
  }


}