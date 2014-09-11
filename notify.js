var gcm = require('node-gcm');
var message = new gcm.Message();
 
//API Server Key
var sender = new gcm.Sender('AIzaSyD38JpZFG88WCGKHuFw1kgtgO5c-y6quUw');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',"\u270C Peace, Love \u2764 and PhoneGap \u2706!");
message.addData('title','Push Notification Sample' );
message.addData('msgcnt','3'); // Shows up in the notification in the status bar
message.addData('soundname','beep.wav'); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
//registrationIds.push('APA91bFKvfNwB10jH-ywRnFThin771j3JRtjMGng_wtHCWYXl0h-oF0YmuTYpapC2S1kuH1ecBHcshUoMVJwPVK8RKzt5wuVeEHzLR_IJKmF2M0qXEaVwkFhTjP5cu4LBe-k8LosjBmv5t93qOEb6JJqVP0L9wIL5g');
 
 //registrationIds.push('APA91bHF3cVx1hBLio8GOzJYl3Ow06ADTcZx84oQ5C6LoUpkcAZOID_SBXkZM0dSuTjgyla4XP2zs9wI4yq_nfLmaEJo3U3bZBnrK1R313bGbRJQQoaPotjOA02rng-4BWUcAml2HP2lXD685TbsMUi8DL4D0XvPww');
 
 registrationIds.push('APA91bEZ4K_hCa4LTXZLBSEAKRPd81fKwCu_fju5vSz8cJNx2iZrg9Y1FaAtXs3nTE1qVU0vWzGcZ9kY4R9KOYmMB0Y9EcWG1iEPX9hzcACxIi-RiX9qHkVGVrWxnVVI1kw8Tx1LIXaL8-8koSNJ0OwozANWV_RNkQ');
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log(result);
});