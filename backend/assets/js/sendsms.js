const accountSid = "";
const authToken = "";

const client = require('twilio')(accountSid,authToken);

client.messages.create({
    to : "+2349077891532",
    from : "Hobbinator",
    body : ""

}).then((message) => console.log(message.sid));