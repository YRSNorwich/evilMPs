// Sweep
// by BARRAGAN <http://barraganstudio.com> 
// This example code is in the public domain.


#include <Servo.h> 
 
Servo trigger;  // create servo object to control a servo 
                // a maximum of eight servo objects can be created 
 
int pos = 0;    // variable to store the servo position 
int fire;
 
void setup() 
{ 
  trigger.attach(9);  // attaches the servo on pin 9 to the servo object 
  Serial.begin(9600);
} 
 
 
void loop() 
{ 
  if (Serial.available()>0){
    
    fire = Serial.parseInt();
    if (fire==1){
    trigger.write(90);
    time.delay(3000);
    trigger.write(0);
    }
  }

}
