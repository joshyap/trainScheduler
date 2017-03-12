// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBw3FhACjkIA3IUS9_dLKqJ3KebfBi8D-U",
    authDomain: "trainscheduler-95947.firebaseapp.com",
    databaseURL: "https://trainscheduler-95947.firebaseio.com",
    storageBucket: "trainscheduler-95947.appspot.com",
    messagingSenderId: "641258482697"
  };
  firebase.initializeApp(config);

  firebase.database().ref().on("value", function(snapshot){
  	results = snapshot.val();
  	console.log(results);
  });

  var trainEntry = "";
  var destinationEntry = "";
  var trainStartTime = 0;
  var frequencyEntry = 0;
  var nextArrival = 0;
  var minutesAway = 0;
  var currentTime = moment();


  $("#submit").on("click", function(event) {
  	event.preventDefault();

  	trainEntry = $("#trainName").val().trim();
  	destinationEntry = $("#destinationName").val().trim();
  	frequencyEntry = $("#trainFrequency").val().trim();
  	trainStartTime = moment($("#trainStartTime").val().trim(), "hh:mm").format("X");

  	console.log('button pressed');

  	//var newTrain = { 
	//	name:trainEntry, 
	//	trainDestination:destinationEntry, 
	//	first:trainStartTime, 
	//	trainFrequency:frequencyEntry,
		//timeAway: minutesAway,
		//nextArrival: nextArrival,
	//};
		//firebase.database().ref().push(newTrain);


		firebase.database().ref().push({
			name: trainEntry,
			trainDestination: destinationEntry,
			trainFrequency: frequencyEntry,
			trainStart: trainStartTime
		})

		//$("#trainName").val("");
		//$("#destinationName").val("");
		//$("#trainStartTime").val("");
		//$("#trainFrequency").val("");
		

		return false;

  });


firebase.database().ref().on("child_added", function(childSnapshot, prevChildKey) {
		

	var train = childSnapshot.val().name; 
	var destination = childSnapshot.val().trainDestination; 
	var first = childSnapshot.val().trainStart; 
	var frequency = childSnapshot.val().trainFrequency; 
	//var timeAway = childSnapshot.val().minutesAway;

	
	var diffTime = moment().diff(moment.unix(first, "X"), "minutes");
	//console.log(diffTime);

	var tRemainder = diffTime % frequency;
	//console.log(tRemainder);

	minutesAway = frequency - tRemainder;
	//console.log("minutes till train: " + minutesAway);

	nextArrival = moment().add(minutesAway, "minutes").format("hh:mm");
	//console.log(nextArrival);
	

	$(".table > tbody").append("<tr><td>" + train + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
	
});
  
