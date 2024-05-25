#include <Wire.h>
#include <LiquidCrystal_I2C.h>
// Set the LCD address to 0x27 for a 20 chars and 4 line display
LiquidCrystal_I2C lcd(0x27, 20, 4);
 
void setup() { 
  // initialize the LCD, 
  lcd.begin();
  // Turn on the blacklight and print a message.
  lcd.backlight();
  lcd.clear();
  lcd.setCursor (5,1);
  lcd.print("WELCOME TO");
  lcd.setCursor (2,2);
  lcd.print("SMART COMPOSTER!"); 
  delay(5000);       
}
 
void loop() {
  lcd.setCursor (2,0); //character zero, line 1
  lcd.print("SMART COMPOSTER!"); // print text  
 
  lcd.setCursor (0,1); //character 4, line 2
  lcd.print("Subscribe YouTube"); // print text   
 
  lcd.setCursor (0,2); //character 0, line 3
  lcd.print("fb/somtipsofficial"); // print text 
}