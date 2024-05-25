#include <OneWire.h>
#include <DallasTemperature.h>
 
int sensor_pin = A0;
int output_value;
 
// Data wire is connected to digital pin 4 on the Arduino
#define ONE_WIRE_BUS 2
 
// Setup a oneWire instance to communicate with any OneWire device
OneWire oneWire(ONE_WIRE_BUS);	
 
// Pass oneWire reference to DallasTemperature library
DallasTemperature sensors(&oneWire);
 
void setup(void){
  sensors.begin();	// Start up the library
  Serial.begin(115200);
  Serial.println("Reading From the Sensor ...");
  delay(2000); 
}
 
void loop(void){ 
  // Send the command to get temperatures
  sensors.requestTemperatures(); 
 
  //print the temperature in Celsius
  Serial.print("Temperature: ");
  Serial.print(sensors.getTempCByIndex(0));
  Serial.println(" C");
  
  output_value = analogRead(sensor_pin);
  output_value = map(output_value,1024,501,0,100);
  Serial.print("Moisture : ");
  Serial.print(output_value);
  Serial.print("%\n");  
  
  delay(1000);
}