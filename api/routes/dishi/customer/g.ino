
// Include Libraries
#include "Arduino.h"
#include "RFID.h"
#include <SoftwareSerial.h>
#include "ArduinoJson.h"

// Pin Definitions
#define RFID_PIN_RST	2
#define RFID_PIN_SDA	4
#define SIM800L_SOFTWARESERIAL_PIN_TX	10
#define SIM800L_SOFTWARESERIAL_PIN_RX	3
//Create software serial object to communicate with SIM800L
SoftwareSerial sim800l(3, 2); //SIM800L Tx & Rx is connected to Arduino #3 & #2

DynamicJsonDocument doc(1024);
//deserializeJson(doc, json);
// Global variables and defines

// object initialization
RFID rfid(RFID_PIN_SDA,RFID_PIN_RST);


// define vars for testing menu
const int timeout = 1000;       //define timeout of 10 sec
char menuOption = 0;
long time0;

// Setup the essentials for your circuit to work. It runs first every time your circuit is powered with electricity.
void setup() 
{
    sim800l.begin(9600);   //Module baude rate, this is on max, it depends on the version
 
    // Setup Serial which is useful for debugging
    // Use the Serial Monitor to view printed messages
    Serial.begin(9600);
    while (!Serial) ; // wait for serial port to connect. Needed for native USB
    Serial.println("start");
    
    //initialize RFID module
    rfid.init();
    menuOption = menu();
    
}

// Main logic of your circuit. It defines the interaction between the components you selected. After setup, it runs over and over again, in an eternal loop.
void loop() 
{
    
    
    if(menuOption == '1') {
    // RFID Card Reader - RC522 - Test Code
    //Read RFID tag if present
    String rfidtag = rfid.readTag();
    //print the tag to serial monitor if one was discovered
    rfid.printTag(rfidtag);

    }
    else if(menuOption == '2')
    {
      Serial.println("Perfoming Check");
    // Disclaimer: The QuadBand GPRS-GSM SIM800L is in testing and/or doesn't have code, therefore it may be buggy. Please be kind and report any bugs you may find.
    }
       else if(menuOption == '3')
    {
     /* char json[] = "{\"sensor\":\"gps\",\"time\":1351824120,\"data\":[48.756080,2.302038]}";


const char* sensor = doc["sensor"];
long time          = doc["time"];
double latitude    = doc["data"][0];
double longitude   = doc["data"][1];*/
    // Disclaimer: The QuadBand GPRS-GSM SIM800L is in testing and/or doesn't have code, therefore it may be buggy. Please be kind and report any bugs you may find.
     // RFID Card Reader - RC522 - Test Code
    //Read RFID tag if present
   // String rfidtag = rfid.readTag();
   String rfidtag = "35499267";
    //print the tag to serial monitor if one was discovered
    //rfid.printTag(rfidtag);
    Serial.println("Perfoming Check");
    delay(1000);
    String MajorCrimes[2] = {"35499267","0"};
    String MinorCrimes[2] = {"32563217","0"};
    String id_number[4] = {"34123489","23749467","35499267","32563217"};
    String user_name[4] = {"David Wanyonyi","Agripina Anyango","Edward Johnson","Michael Brown"};
    String CrimeProbability[4] = {"0.02","0.01","0.9","0.8"};
    searchIdMajorCrimes(MajorCrimes,rfidtag);
    searchIdMinorCrimes(MinorCrimes,rfidtag);
 /*   if(CrimeProbability>0.5){
      //displayInformation(String user_name,int id_number,String rfid_tag,float CrimeProbability,int time_ofentry);
      displayInformation(user_nam,id_number,rfid_tag,CrimeProbability,time_ofentry);
  }
      }
    elseif(){
          displayInformation(user_nam,id_number,rfid_tag,CrimeProbability,time_ofentry);
      } 
    elseif(){
       displayInformation(user_nam,id_number,rfid_tag,CrimeProbability,time_ofentry);
      } 
    elseif(){
         displayInformation(user_nam,id_number,rfid_tag,CrimeProbability,time_ofentry);
      }*/       
    }
    
    if (millis() - time0 > timeout)
    {
        menuOption = menu();
    }
    
}



// Menu function for selecting the components to be tested
// Follow serial monitor for instrcutions
char menu()
{

    Serial.println(F("\nWhich component would you like to test?"));
    Serial.println(F("(1) RFID Card Reader - RC522"));
    Serial.println(F("(2) QuadBand GPRS-GSM SIM800L"));
    Serial.println(F("(3) Security check"));
    Serial.println(F("(menu) send anything else or press on board reset button\n"));
    while (!Serial.available());

    // Read data from serial monitor if received
    while (Serial.available()) 
    {
        char c = Serial.read();
        if (isAlphaNumeric(c)) 
        {   
            
            if(c == '1') 
    			Serial.println(F("Now Testing RFID Card Reader - RC522"));
    		else if(c == '2') 
    			Serial.println(F("Now Testing QuadBand GPRS-GSM SIM800L - note that this component doesn't have a test code"));
          else if(c == '3') 
          Serial.println(F("Now performing security check!!")); 
            else
            {
                Serial.println(F("illegal input!"));
                return 0;
            }
            time0 = millis();
            return c;
        }
    }
}
void SendSMS()
{
  Serial.println("Sending SMS...");               //Show this message on serial monitor
  sim800l.print("AT+CMGF=1\r");                   //Set the module to SMS mode
  delay(100);
  sim800l.print("AT+CMGS=\"+254712322226\"\r");  //Your phone number don't forget to include your country code, example +212123456789"
  delay(500);
  sim800l.print("SIM800l is working");       //This is the text to send to the phone number, don't make it too long or you have to modify the SoftwareSerial buffer
  delay(500);
  sim800l.print((char)26);// (required according to the datasheet)
  delay(500);
  sim800l.println();
  Serial.println("Text Sent.");
  delay(500);

}
void searchIdMajorCrimes(String MajorCrimes[],String id){
  for(int i =0;i<=i<4;i++){
    // Serial.println(id);
     // Serial.println(MajorCrimes[2]);
    if(id==MajorCrimes[i]){
      String MajorCrimes[2] = {"35499267","0"};
    String MinorCrimes[2] = {"32563217","0"};
    String id_number[4] = {"34123489","23749467","35499267","32563217"};
    String user_name[4] = {"David Wanyonyi","Agripina Anyango","Edward Johnson","Michael Brown"};
    float CrimeProbability[4] = {0.02,0.01,0.9,0.8};
    Serial.println(MajorCrimes[i]);
    delay(100);
    Serial.println(user_name[i]);
    delay(100);
    Serial.println(id_number[i]);
    delay(100);
    Serial.println(CrimeProbability[i]);
    delay(100);
    displayInformation(user_name[i],id_number[i],id,CrimeProbability[i]);
      } 
    
    }
  
  
  }
void searchIdMinorCrimes(String MinorCrimes[],String id){
  for(int i =0;i<=i<4;i++){
    Serial.println(id);
   if(id==MinorCrimes[i]){
    String MajorCrimes[2] = {"35499267","0"};
    String MinorCrimes[2] = {"32563217","0"};
    String id_number[4] = {"34123489","23749467","35499267","32563217"};
    String user_name[4] = {"David Wanyonyi","Agripina Anyango","Edward Johnson","Michael Brown"};
    float CrimeProbability[4] = {0.02,0.01,0.9,0.8};
      displayInformation(user_name[i],id_number[i],id,CrimeProbability[i]);
      }
    
    
    }
  
  
  }  
   
void displayInformation(String user_name,String id_number,String rfid_tag,float CrimeProbability){
    Serial.println(user_name);
    delay(100);
      Serial.println(id_number);
      delay(100);
      Serial.println(rfid_tag);
      delay(100);
      Serial.println(CrimeProbability);
      delay(100);
      Serial.println(millis());
      if(CrimeProbability<0.9){
         Serial.println("Proceed to pay");
           delay(100);
        }
       Serial.println("Sending SMS to relevant authorities");
         delay(100);
   /*   sim800l.println("AT"); //Once the handshake test is successful, it will back to OK
      updateSerial();

      sim800l.println("AT+CMGF=1"); // Configuring TEXT mode
      updateSerial();
      sim800l.println("AT+CMGS=\"+254712322226\"");//change ZZ with country code and xxxxxxxxxxx with phone number to sms
      updateSerial();
      sim800l.print("Last Minute Engineers | lastminuteengineers.com"); //text content
      updateSerial();
      sim800l.write(26);*/
      }
      /*Serial.println("Sending SMS to relevant authorities");
      sim800l.println("AT"); //Once the handshake test is successful, it will back to OK
      updateSerial();

      sim800l.println("AT+CMGF=1"); // Configuring TEXT mode
      updateSerial();
      sim800l.println("AT+CMGS=\"+254712322226\"");//change ZZ with country code and xxxxxxxxxxx with phone number to sms
      updateSerial();
      sim800l.print("Last Minute Engineers | lastminuteengineers.com"); //text content
      updateSerial();
      sim800l.write(26);*/
  
  
void updateSerial()
{
  delay(500);
  while (Serial.available()) 
  {
    sim800l.write(Serial.read());//Forward what Serial received to Software Serial Port
  }
  while(sim800l.available()) 
  {
    Serial.write(sim800l.read());//Forward what Software Serial received to Serial Port
  }
}