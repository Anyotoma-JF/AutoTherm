// Output
int bluePin = 10; // Blue LED, connected to digital pin 11
int redPin = 11; // Red LED, connected to digital pin 9

int heatRelay = 8; // heating coil relay is connected to digital pin 8


// Include the libraries we need
#include <OneWire.h>
#include <DallasTemperature.h>

// Data wire is plugged into port 2 on the Arduino
#define ONE_WIRE_BUS 13
#define ONE_WIRE_BUS 12
#define ONE_WIRE_BUS 9

// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);

// Pass our oneWire reference to Dallas Temperature. 
DallasTemperature sensors(&oneWire);

/*
 * The setup function. We only start the sensors here
 */
void setup(void)
{
 pinMode(redPin, OUTPUT); // sets the pins as output
 pinMode(bluePin, OUTPUT);
 pinMode(heatRelay, OUTPUT);
 digitalWrite(heatRelay, HIGH); // sets heat coil relay to off (active low)
  // start serial port
  Serial.begin(9600);
  Serial.println("Dallas Temperature IC Control Library Demo");

  // Start up the library
  sensors.begin();
}

/*
 * Main function, get and show the temperature
 */
void loop(void)
{ 
  // call sensors.requestTemperatures() to issue a global temperature 
  // request to all devices on the bus
  Serial.print("Requesting temperatures...");
  sensors.requestTemperatures(); // Send the command to get temperatures
  Serial.println("DONE");
  // After we got the temperatures, we can print them here.
  // We use the function ByIndex, and as an example get the temperature from the first sensor only.
  float tempA = sensors.getTempCByIndex(0);
  float tempD = sensors.getTempCByIndex(0);
  float tempE = sensors.getTempCByIndex(0);
  float tempC = (tempA+tempD+tempE)/3;

  // Check if reading was successful
    Serial.print("Average temperature is: ");
    Serial.println(tempC);


   
  if (tempC < 37) // cold phase of fades
      {
        digitalWrite(redPin, HIGH);
        digitalWrite(bluePin, LOW);
        digitalWrite(heatRelay, HIGH); // activate heat (active low)
        delay(2000); // wait
      }
else
// warm phase of fades
      {
      digitalWrite(bluePin, HIGH);
      digitalWrite(redPin, LOW);
      digitalWrite(heatRelay, LOW); // deactivate heat (active low)
      delay(2000); // wait

      }

}
