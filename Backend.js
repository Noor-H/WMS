// Generate a new random MQTT client id on each page load
var MQTT_CLIENT_ID = "iot_web_"+Math.floor((1 + Math.random()) * 0x10000000000).toString(16);

// Create a MQTT client instance
var MQTT_CLIENT = new Paho.MQTT.Client("test.mosquitto.org", Number("9001"), "/ws", MQTT_CLIENT_ID);
/*"test.mosquitto.org" is a cloud server, so you can run and understand the code, otherwise we have implemented it in the local machine
this is just for your undertanding and handson practice*/
// client instance conneting to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });




//------------------------------------TEMPERATURE topic-----------------------
//Subscribing the topic
function myClientConnected() {
  MQTT_CLIENT.subscribe("temperature");
}

//  received messages
function myMessageArrived(message) {
  // Get the payload
  var messageBody = message.payloadString;

  // HTML element wrapping the message payload
  var messageHTML = $("<p>"+messageBody+"</p>");

  // Insert inside the div id=temp 
  $("#temp").prepend(messageHTML);
};
// confirm that msg arrived
MQTT_CLIENT.onMessageArrived = myMessageArrived;

//----------------------------------------------------------------------------