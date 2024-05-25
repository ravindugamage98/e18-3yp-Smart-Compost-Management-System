// TECHATRONIC.COM  
 // library  
 // https://github.com/adafruit/Adafruit_ADS1X15  
 // https://github.com/manrueda/ESP8266HttpClient  
 // https://github.com/ekstrand/ESP8266wifi  
 #include <ESP8266WiFi.h>  
 #include <ESP8266HTTPClient.h>  
 #include <Adafruit_ADS1015.h>  
 WiFiClient client;  
 String thingSpeakAddress= "http://api.thingspeak.com/update?";  
 String writeAPIKey;  
 String tsfield1Name;  
 String request_string;  
 HTTPClient http;  
 Adafruit_ADS1115 ads;   
 
 void setup()  
 {   
  Serial.begin(115200);  
  delay(3000);  
  WiFi.disconnect();  
  Serial.println("START");  
  WiFi.begin("DESKTOP","asdfghjkl");   // Wifi ("ID","Password")  
  while ((!(WiFi.status() == WL_CONNECTED))){  
  delay(300);  
  Serial.println("...");  
  }  
  Serial.println("I AM CONNECTED");  
   Serial.println("Hello!");  
  Serial.println("Getting single-ended readings from AIN0..3");  
  Serial.println("ADC Range: +/- 6.144V (1 bit = 3mV/ADS1015, 0.1875mV/ADS1115)");  
  ads.begin();  
 }  
 void loop()  
 {  
  int16_t adc0, adc1, adc2, adc3;  
  Serial.println(" ");  
   adc0 = ads.readADC_SingleEnded(0);  
   adc0 = adc0 / 25;  
   adc1 = ads.readADC_SingleEnded(1);  
   adc1 = adc1 / 25;  
   adc2 = ads.readADC_SingleEnded(2);  
   adc2 = adc2 / 25;  
   adc3 = ads.readADC_SingleEnded(3);  
   adc3 = adc3 / 25;  
   Serial.print("SOIL MOISTURE in persent 1% : "); Serial.println(adc0);  
   Serial.print("SOIL MOISTURE in persent 2% : "); Serial.println(adc1);  
   Serial.print("SOIL MOISTURE in persent 3% : "); Serial.println(adc2);  
   Serial.print("SOIL MOISTURE in persent 4% : "); Serial.println(adc3);  
   Serial.println(" ");  
   if (client.connect("api.thingspeak.com",80))  
   {  
    request_string = thingSpeakAddress;  
    request_string += "key=";  
    request_string += "2YGO2FHN3XI3GFE7";  
    request_string += "&";  
    request_string += "field1";  
    request_string += "=";  
    request_string += adc0;  
    http.begin(request_string);  
    http.GET();  
    http.end();  
   }  
 delay(10);  
   if (client.connect("api.thingspeak.com",80))  
   {  
    request_string = thingSpeakAddress;  
    request_string += "key=";  
    request_string += "2YGO2FHN3XI3GFE7";  
    request_string += "&";  
    request_string += "field2";  
    request_string += "=";  
    request_string += adc1;  
    http.begin(request_string);  
    http.GET();  
    http.end();  
   }  
 delay(10);  
  if (client.connect("api.thingspeak.com",80))  
   {  
    request_string = thingSpeakAddress;  
    request_string += "key=";  
    request_string += "2YGO2FHN3XI3GFE7";  
    request_string += "&";  
    request_string += "field3";  
    request_string += "=";  
    request_string += adc2;  
    http.begin(request_string);  
    http.GET();  
    http.end();  
   }  
 delay(10);  
  if (client.connect("api.thingspeak.com",80))  
   {  
    request_string = thingSpeakAddress;  
    request_string += "key=";  
    request_string += "2YGO2FHN3XI3GFE7";  
    request_string += "&";  
    request_string += "field4";  
    request_string += "=";  
    request_string += adc3;  
    http.begin(request_string);  
    http.GET();  
    http.end();  
   }  
 delay(10);  
 }  