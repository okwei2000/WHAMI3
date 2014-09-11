cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.transistorsoft.cordova.background-geolocation/www/BackgroundGeoLocation.js",
        "id": "org.transistorsoft.cordova.background-geolocation.BackgroundGeoLocation",
        "clobbers": [
            "plugins.backgroundGeoLocation"
        ]
    },
    {
        "file": "plugins/com.phonegap.plugins.PushPlugin/www/PushNotification.js",
        "id": "com.phonegap.plugins.PushPlugin.PushNotification",
        "clobbers": [
            "PushNotification"
        ]
    },
    {
        "file": "plugins/com.simonmacdonald.prefs/src/android/applicationPreferences.js",
        "id": "com.simonmacdonald.prefs.applicationPreferences",
        "clobbers": [
            "applicationPreferences"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "org.transistorsoft.cordova.background-geolocation": "0.3.2",
    "com.phonegap.plugins.PushPlugin": "2.2.1",
    "com.simonmacdonald.prefs": "1.0.0",
    "org.apache.cordova.geolocation": "0.3.9"
}
// BOTTOM OF METADATA
});