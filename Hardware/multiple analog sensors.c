#include <Adafruit_ADS1X15.h>  

int soilmoisturepercent1, soilmoisturepercent2, methanepercent;
Adafruit_ADS1X15 ads;   
  
void setup() {   
  Serial.begin(115200);  
  ads.begin();  
} 
 
void loop() {         
  soilmoisturepercent1 = ads.readADC_SingleEnded(0);
  soilmoisturepercent1 = map(soilmoisturepercent1,17220,9000,0,100);

  soilmoisturepercent2 = ads.readADC_SingleEnded(1);
  soilmoisturepercent2 = map(soilmoisturepercent2,17220,9000,0,100);

  methanepercent = ads.readADC_SingleEnded(2);
  //methanepercent = map(methanepercent,350,1024,0,100);
 
  Serial.print("Moisture1: "); Serial.println(soilmoisturepercent1);  
  Serial.print("Moisture2: "); Serial.println(soilmoisturepercent2);  
  Serial.print("Methane: "); Serial.println(methanepercent);    
  Serial.println(" ");  
  delay(1000);  
}  