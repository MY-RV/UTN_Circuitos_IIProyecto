#include <Ethernet.h>
#include <SPI.h>

// byte mac[] = { 0x00, 0xAB, 0xBC, 0xCC, 0xDE, 0x01 }; // RESERVED MAC ADDRESS
byte mac[] = {0x90, 0xA2, 0xDA, 0x0F, 0x4C, 0xE3};
EthernetClient client;

const int PIN_Sensor1 = 3;
int es1 = 0;
const int PIN_Sensor2 = 5;
int es2 = 0;

const String PIN_Sensor3 = "A0";
int es3 = 0;
const int valorReferencia = 300;

void setup()
{
    Serial.begin(9600);

    pinMode(PIN_Sensor1, INPUT);
    // pinMode(3, INPUT);      // sets the digital pin as output
    if (Ethernet.begin(mac) == 0)
    {
        Serial.println("Failed to configure Ethernet using DHCP");
    }
    else
    {
        Serial.print("My IP address: ");
        Serial.println(Ethernet.localIP());
    }
    delay(1000); // GIVE THE SENSOR SOME TIME TO START
}
void conection(String a, String b, String c)
{
    String data = "device=";
    data.concat(a);
    data.concat("&sensor=");
    data.concat(b);
    data.concat("&detail=");
    data.concat(c);

    if (client.connect("10.60.41.145", 80))
    {                                              // REPLACE WITH YOUR SERVER ADDRESS
        client.println("POST /reports  HTTP/1.1"); // REPLACE WITH YOUR URLS
        client.println("Host: 10.60.41.145");
        client.println("Content-Type: application/x-www-form-urlencoded");
        client.println("Connection:close");
        client.print("Content-Length:");
        client.println(data.length());
        client.println();
        client.print(data);
        client.flush();
        client.stop();
    }
}
void loop()
{
    // Serial.println(analogRead(A0));

    // String mensage = "Estado registrado ";
    // mensage.concat(es1);
    // mensage.concat(" Estado Actual ");
    // mensage.concat(digitalRead(PIN_Sensor1));
    // Serial.println(mensage);

    // sensor 1
    if ((digitalRead(PIN_Sensor1) == 0) && (es1 == 1))
    {
        es1 = 0;
        conection("arduino uno ", "s1", "open");
        Serial.println("sensor 1 abierto");
    }
    else if ((digitalRead(PIN_Sensor1) == 1) && (es1 == 0))
    {
        es1 = 1;
        conection("arduino uno ", "s1", "close");
        Serial.println("sensor 2 Cerrado");
    }
    // Sensor2
    if ((digitalRead(PIN_Sensor2) == 0) && (es2 == 1))
    {
        es2 = 0;
        conection("arduino uno ", "s2", "Open");
        Serial.println("sensor 2 abierto");
    }
    else if ((digitalRead(PIN_Sensor2) == 1) && (es2 == 0))
    {
        es2 = 1;
        conection("arduino uno ", "s2", "close");
        Serial.println("sensor 2 Cerrado");
    }
    // Sensor3
    // int sensor3 = analogRead(A0);
    // Serial.println(analogRead(A0),DEC);
    if ((analogRead(A0) < valorReferencia) && (es3 == 1))
    {
        es3 = 0;
        conection("arduino uno ", "s3", "open");
        Serial.println("sensor 3 abierto");
    }
    else if ((analogRead(A0) >= valorReferencia) && (es3 == 0))
    {
        es3 = 1;
        conection("arduino uno ", "s3", "close");
        Serial.println("sensor 3 Cerrado");
    }
    delay(500);
}