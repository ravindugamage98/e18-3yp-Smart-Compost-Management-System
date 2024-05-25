#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>

int sensor_pin = A0;
int output_value;

LiquidCrystal_I2C lcd(0x27,16,2);  // set the LCD address to 0x3F for a 16 chars and 2 line display
 
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
  
  lcd.begin();
  lcd.clear();         
  lcd.backlight();      // Make sure backlight is on
  
  // Print a message on both lines of the LCD.
  lcd.setCursor(2,0);   //Set cursor to character 2 on line 0
  lcd.print("Hello world!");
  
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
  
  String ts="Temp    : "+String(sensors.getTempCByIndex(0))+"C     ";
  String hs="Moisture: "+String(output_value)+"%     ";
  
  lcd.setCursor(0, 0);
  lcd.print(ts);
  lcd.setCursor(0, 1);
  lcd.print(hs);  
  
  
  delay(1000);
}