#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h> 

String api_key = "UXMWTUTCRNJNVQPE";
const char *ssid = "SLT-4G_154499";
const char *pass = "A2CD89C9";
const char* server = "api.thingspeak.com";

int sensor_pin = A0;
int soilmoisturepercent;
int relaypin = D5;

LiquidCrystal_I2C lcd(0x27,20,4);  // set the LCD address to 0x3F for a 16 chars and 2 line display
 
// Data wire is connected to digital pin 4 on the Arduino
#define ONE_WIRE_BUS 2
 
// Setup a oneWire instance to communicate with any OneWire device
OneWire oneWire(ONE_WIRE_BUS);	
 
// Pass oneWire reference to DallasTemperature library
DallasTemperature sensors(&oneWire);

WiFiClient client;

void setup(void){
  sensors.begin();	// Start up the library
  Serial.begin(115200);
  Serial.println("Reading From the Sensor ...");
  
  Serial.println("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, pass);
  
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  
  lcd.begin();
  lcd.clear();         
  lcd.backlight();      // Make sure backlight is on
  
  lcd.setCursor (5,1);
  lcd.print("WELCOME TO");
  lcd.setCursor (2,2);
  lcd.print("SMART COMPOSTER!"); 
  delay(5000);  
  
  pinMode(relaypin, OUTPUT);
  delay(2000); 
}
 
void loop(void){ 
  // Send the command to get temperatures
  sensors.requestTemperatures(); 
 
  //print the temperature in Celsius
  Serial.print("Temperature 1: ");
  Serial.print(sensors.getTempCByIndex(0));
  Serial.println(" C");
  
  Serial.print("Temperature 2: ");
  Serial.print(sensors.getTempCByIndex(1));
  Serial.println(" C");
  
  soilmoisturepercent = analogRead(sensor_pin);
  soilmoisturepercent = map(soilmoisturepercent,1024,501,0,100);
  Serial.print("Moisture : ");
  Serial.print(soilmoisturepercent);
  Serial.print("%\n");  
  
  String ts="T1:"+String(sensors.getTempCByIndex(0))+"C  T2:"+String(sensors.getTempCByIndex(1))+"C";
  String hs="M1: "+String(soilmoisturepercent)+"%     ";
  
  lcd.setCursor (2,0); //character zero, line 1
  lcd.print("SMART COMPOSTER!"); // print text    
  
  lcd.setCursor(0, 1);
  lcd.print(ts);
  lcd.setCursor(0, 2);
  lcd.print(hs);
  delay(1000);
  
  if(soilmoisturepercent >=0 && soilmoisturepercent <= 30){
    digitalWrite(relaypin, HIGH);
    Serial.println("Motor is ON");
  }else if (soilmoisturepercent >30 && soilmoisturepercent <= 100){
    digitalWrite(relaypin, LOW);
    Serial.println("Motor is OFF");
  }  
  
  if(client.connect(server, 80)){
    String data_to_send = api_key;
    data_to_send += "&field1=";
    data_to_send += sensors.getTempCByIndex(0);
    data_to_send += "&field2=";
    data_to_send += sensors.getTempCByIndex(1);    
    data_to_send += "\r\n\r\n"; 
    
    client.print("POST /update HTTP/1.1\n");
    client.print("Host: api.thingspeak.com\n");
    client.print("Connection: close\n");
    client.print("X-THINGSPEAKAPIKEY: " + api_key + "\n");
    client.print("Content-Type: application/x-www-form-urlencoded\n");
    client.print("Content-Length: ");
    client.print(data_to_send.length());
    client.print("\n\n");
    client.print(data_to_send);
    delay(1000);
  }
  
  client.stop();
}