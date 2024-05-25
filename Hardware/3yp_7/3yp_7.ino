#include <OneWire.h>
#include <DallasTemperature.h>
#include <LiquidCrystal_I2C.h>
#include <ESP8266WiFi.h> 
#include <Adafruit_ADS1X15.h>  

String api_key = "UXMWTUTCRNJNVQPE";
const char *ssid = "SLT-4G_154499";
const char *pass = "A2CD89C9";
const char* server = "api.thingspeak.com";

int sensor_pin = A0;
int soilmoisturepercent1, soilmoisturepercent2, methanepercent;
Adafruit_ADS1X15 ads;  
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
  ads.begin();  
  sensors.begin();	// Start up the library
  Serial.begin(115200);
  Serial.println("Reading From the Sensor ...");
/* 
  Serial.println("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, pass);
  
  while (WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
*/ 
  lcd.begin();
  lcd.clear();         
  lcd.backlight();      // Make sure backlight is on
  
  lcd.setCursor (5,1);
  lcd.print("WELCOME TO");
  lcd.setCursor (2,2);
  lcd.print("SMART COMPOSTER!"); 
  pinMode(relaypin, OUTPUT);
  delay(3000);  
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
  
  soilmoisturepercent1 = ads.readADC_SingleEnded(0);
  Serial.print("Moisture 1: ");
  Serial.print(soilmoisturepercent1);
  Serial.print("\n"); 
  soilmoisturepercent1 = map(soilmoisturepercent1,17150,8500,0,100);
  Serial.print("Moisture 1: ");
  Serial.print(soilmoisturepercent1);
  Serial.print("%\n");  
  
  soilmoisturepercent2 = ads.readADC_SingleEnded(1);
  Serial.print("Moisture 2: ");
  Serial.print(soilmoisturepercent2);
  Serial.print("\n");    
  soilmoisturepercent2 = map(soilmoisturepercent2,17150,8500,0,100);
  Serial.print("Moisture 2: ");
  Serial.print(soilmoisturepercent2);
  Serial.print("%\n");    

  methanepercent = ads.readADC_SingleEnded(2);
  //methanepercent = map(methanepercent,350,1024,0,100);
  methanepercent = 0;  
  Serial.print("Methane: ");
  Serial.print(methanepercent);
  Serial.print("%\n"); 
  
  String ts1="T1:"+String(sensors.getTempCByIndex(0))+"C  ";
  String ts2="T2:"+String(sensors.getTempCByIndex(1))+"C";
  
  soilmoisturepercent1=soilmoisturepercent1-40;
  soilmoisturepercent2=soilmoisturepercent2-40;
  
  String ms1="M1:"+String(soilmoisturepercent1)+"%      ";
  String ms2="M2:"+String(soilmoisturepercent2)+"%  ";
  //String ch4s="CH4:"+String(methanepercent);  
  String ch4s="CH4:0ppm";
  
  lcd.setCursor (2,0); //character zero, line 1
  lcd.print("SMART COMPOSTER!"); // print text    
  
  lcd.setCursor(0, 1);
  lcd.print(ts1);
  lcd.setCursor(11, 1);
  lcd.print(ts2);
  
  lcd.setCursor(0, 2);
  lcd.print(ms1);
  lcd.setCursor(11, 2);
  lcd.print(ms2);  
  
  
  lcd.setCursor(0, 3);
  lcd.print(ch4s);
  delay(1000);
  
  if(soilmoisturepercent1 >=0 && soilmoisturepercent1 <= 30){
    digitalWrite(relaypin, HIGH);
    Serial.println("Motor is ON");
  }else if (soilmoisturepercent1 >30 && soilmoisturepercent1 <= 100){
    digitalWrite(relaypin, LOW);
    Serial.println("Motor is OFF");
  }  
  
  if(client.connect(server, 80)){
    String data_to_send = api_key;
    data_to_send += "&field1=";
    data_to_send += sensors.getTempCByIndex(0);
    data_to_send += "&field2=";
    data_to_send += sensors.getTempCByIndex(1);    
    
    data_to_send += "&field3=";
    data_to_send += soilmoisturepercent1;
    data_to_send += "&field4=";
    data_to_send += soilmoisturepercent2;   
    data_to_send += "&field5=";
    data_to_send += methanepercent;     
        
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