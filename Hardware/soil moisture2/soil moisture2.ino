int sensor_pin = A0;
int output_value;
void setup() {
  Serial.begin(115200);
  Serial.println("Reading From the Sensor ...");
  delay(2000); 
}
void loop() {
  output_value = analogRead(sensor_pin);
  output_value = map(output_value,1024,501,0,100);
  Serial.print("Moisture : ");
  Serial.print(output_value);
  Serial.print("%\n");
  delay(1000); 
}