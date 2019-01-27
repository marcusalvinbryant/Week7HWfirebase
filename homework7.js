// Initialize Firebase
var config = {
    apiKey: "AIzaSyCEDi02mfLPoT9-qNJaa3XHB_9RgnO-lsk",
    authDomain: "homework-7-aafa3.firebaseapp.com",
    databaseURL: "https://homework-7-aafa3.firebaseio.com",
    projectId: "homework-7-aafa3",
    storageBucket: "",
    messagingSenderId: "1000339668737"
  };
  firebase.initializeApp(config);




$('#submit').on('click', function() {
	var trainName = $('#trainNameInput').val().trim();
	var destination = $('#destinationInput').val().trim();
	var firstTrainTime = $('#trainTimeInput').val().trim();
	var frequency = $('#frequencyInput').val().trim();

	var newTrain = {
		train: trainName,
		destination: destination,
		trainTime: firstTrainTime,
		frequency: frequency
	}

	trainData.push(newTrain);

	$('#trainNameInput').val("");
	$('#destinationInput').val("");
	$('#trainTimeInput').val("");
	$('#frequencyInput').val("");

	return false;
});

trainData.on("child_added", function(childSnapshot) {
	console.log(childSnapshot.val());

	var trainName = childSnapshot.val().train;
	var destination = childSnapshot.val().destination;
	var firstTrainTime = childSnapshot.val().trainTime;
	var frequency = childSnapshot.val().frequency;

	var trainFrequency = frequency;
	var firstTime = firstTrainTime;

	var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "y");

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
	// Difference between the times
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);
	// Time apart (remainder)
	var tRemainder = diffTime % trainFrequency;
	console.log(tRemainder);
	// Minute Until Train
	var minutesTillTrain = trainFrequency - tRemainder;
	// Next Train
	var nextTrain = moment().add(minutesTillTrain, "minutes");
	var arrival = moment(nextTrain).format("hh:mm a");
	console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	$('#catchTrain > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutesTillTrain + "</td></tr>");
});