/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	apikey: "",
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        if (window.plugins.backgroundGeoLocation) {
            app.configureBackgroundGeoLocation();
        }
		
		if(window.plugins.pushNotification){
			var pushNotification = window.plugins.pushNotification;
			pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"541265057364","ecb":"app.onNotificationGCM"});
		}
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

		$('.app').hide();
		$('#whami').show();
		
        console.log('Received Event: ' + id);
    },
    configureBackgroundGeoLocation: function() {
        // Your app must execute AT LEAST ONE call for the current position via standard Cordova geolocation,
        //  in order to prompt the user for Location permission.
        window.navigator.geolocation.getCurrentPosition(function(location) {
            console.log('Location from Phonegap');
        });

        var bgGeo = window.plugins.backgroundGeoLocation;

        /**
        * This would be your own callback for Ajax-requests after POSTing background geolocation to your server.
        */
        var yourAjaxCallback = function(response) {
            ////
            // IMPORTANT:  You must execute the #finish method here to inform the native plugin that you're finished,
            //  and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
            // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
            //
            //
			//alert('called');
            bgGeo.finish();
            //document.getElementById('app').innerHTML += "yourAjaxCallback is called <br>";
        };

        /**
        * This callback will be executed every time a geolocation is recorded in the background.
        */
        var callbackFn = function(location) {
            console.log('[js] BackgroundGeoLocation callback:  ' + location.latitudue + ',' + location.longitude);
			
			//create tickit
			//var manualTickitUrl = _baseUrl + "tickitService/" + textapiKeyValue +"/createTickit" ;
			var manualTickitUrl = 'http://dev.tickittaskit.com/flippadoo/mobile/tickitService/111234567/createTickit';
			var form = new FormData();
		
			form.append('ownerId' , 16);
			form.append('tickitStatus' , 8);
			form.append('msgBody' , (new Date()).toLocaleString());
			form.append('tickitType' , "11");
			form.append('recipient' , "chris@abc.com");
			form.append('subject' , 'Auto GPS Tracking');
			form.append('ip' , "192.168.1.217");
			form.append('gps' , location.latitude + ";" + location.longitude);
            $.ajax({
				url: manualTickitUrl,
				data: form,
				dataType: 'text',
				processData: false,
				contentType: false,
				type: 'POST',
				success: function(data){
				},
				error:function(data){
				}
			});
			
            // Log to my server
			$.ajax({
				url: 'http://qdevinc.com/test/requestDump',
				type: "POST",
				dataType: 'text',
				cache: false,
				processData: false,
				contentType: false,				
				data: form,
				success: function( data, textStatus, jqXHR ){
					//alert('registration id = '+e.regid);
				},
				error: function(jqXHR, textStatus, errorThrown){
				},
				complete: function(){
				}
			});				
            yourAjaxCallback.call(this);
        };

        var failureFn = function(error) {
            console.log('BackgroundGeoLocation error');
        }
        
        // BackgroundGeoLocation is highly configurable.
        bgGeo.configure(callbackFn, failureFn, {
            url: 'http://qdevinc.com/test/requestDump', // <-- only required for Android; ios allows javascript callbacks for your http
            params: {                                               // HTTP POST params sent to your server when persisting locations.
                auth_token: 'user_secret_auth_token',
                foo: 'bar'
            },
            headers: {
                'X-Foo': 'bar'
            },
            desiredAccuracy: 10,
            stationaryRadius: 20,
            distanceFilter: 30,
            notificationTitle: 'Background tracking',   // <-- android only, customize the title of the notification
            notificationText: 'ENABLED',                // <-- android only, customize the text of the notification
            activityType: "AutomotiveNavigation",       // <-- iOS-only
            debug: true     // <-- enable this hear sounds for background-geolocation life-cycle.
        });
    },
	
	startTracking: function(){
		if($.trim($('#apikey').val()).length==0){
			alert("You must enter an API key");
		}else{
			app.apikey=$.trim($('#apikey').val());
			$('#apikey').attr("disabled", true);
			// Turn ON the background-geolocation system.  The user will be tracked whenever they suspend the app.
			var bgGeo = window.plugins.backgroundGeoLocation;
			bgGeo.start();
		}
	},
	
	stopTracking: function(){
		var bgGeo = window.plugins.backgroundGeoLocation;
		bgGeo.stop();
		$('#apikey').removeAttr("disabled");
	},
	
	registerNotification: function(){
		var pushNotification = window.plugins.pushNotification;
		pushNotification.register(app.successHandler, app.errorHandler,{"senderID":"541265057364","ecb":"app.onNotificationGCM"});
	},
	// result contains any message sent from the plugin call
	successHandler: function(result) {
		//alert('Callback Success! Result = '+result)
	},	
	errorHandler:function(error) {
		alert(error);
	},
	onNotificationGCM: function(e) {
        switch( e.event ){
            case 'registered':
                if ( e.regid.length > 0 ){
                    console.log("Regid " + e.regid);
                    //alert('registration id = '+e.regid);
					$.ajax({
						url: 'http://qdevinc.com/test/requestDump',
						type: "POST",
						dataType: 'json',
						cache: false,
						data: JSON.stringify({registerId:e.regid}),
						contentType: "application/json; charset=utf-8",
						success: function( data, textStatus, jqXHR ){
							alert('registration id = '+e.regid);
						},
						error: function(jqXHR, textStatus, errorThrown){
						},
						complete: function( jqXHR, textStatus ){
						}
					});
                }
            break;
 
            case 'message':
              // this is the actual push notification. its format depends on the data model from the push server
              //alert('message = '+e.message+' msgcnt = '+e.msgcnt);
			  //app.startTracking();
            break;
 
            case 'error':
              alert('GCM error = '+e.msg);
            break;
 
            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }	
};
