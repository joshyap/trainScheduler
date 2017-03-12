var train = "";
var destination = "";
var firstTrain = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";
var currentTime = moment();
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBw3FhACjkIA3IUS9_dLKqJ3KebfBi8D-U",
    authDomain: "trainscheduler-95947.firebaseapp.com",
    databaseURL: "https://trainscheduler-95947.firebaseio.com",
    storageBucket: "trainscheduler-95947.appspot.com",
    messagingSenderId: "641258482697"
  };
  firebase.initializeApp(config);
  var database = firebase.database();


$("#searchBtn").on("click", function() {

  event.preventDefault();

	train = $("#train-name").val().trim();
	destination = $("#destination-name").val().trim();
	firstTrain = moment($("#first-trainMT").val().trim(), "hh:mm").format("X");
	frequency = $("#frequency-input").val().trim();
	
	console.log(firstTrain);

	var newTrain = { 
		name: train, 
		trainDestination: destination, 
		first: firstTrain, 
		trainFrequency: frequency,
		//timeAway: minutesAway,
		//nextArrival: nextArrival,
		};

		database.ref().push(newTrain);


		$("#train-name").val("");
		$("#destination-name").val("");
		$("#first-trainMT").val("");
		$("#frequency-input").val("");
		

		return false;

  });

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
		

	var train = childSnapshot.val().name; 
	var destination = childSnapshot.val().trainDestination; 
	var first = childSnapshot.val().firstTrain; 
	var frequency = childSnapshot.val().trainFrequency; 
	//var timeAway = childSnapshot.val().minutesAway;

	
	var diffTime = moment().diff(moment.unix(firstTrain, "X"), "minutes");
	console.log(diffTime);

	var tRemainder = diffTime % frequency;
	console.log(tRemainder);

	minutesAway = frequency - tRemainder;
	console.log("minutes till train: " + minutesAway);

	nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
	console.log(nextArrival);
	

	$(".table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
	
});

