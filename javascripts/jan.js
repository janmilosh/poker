//this function will output the singular name of a card
var rank;
function singularName(rank) {
	var card;
	switch (rank) {
		case 2: card = 'Two';
			break;
		case 3: card = 'Three';
			break;
		case 4: card = 'Four';
			break;
		case 5: card = 'Five';
			break;
		case 6: card = 'Six';
			break;
		case 7: card = 'Seven';
			break;
		case 8: card = 'Eight';
			break;
		case 9: card = 'Nine';
			break;
		case 10: card = 'Ten';
			break;
		case 11: card = 'Jack';
			break;
		case 12: card = 'Queen';
			break;
		case 13: card = 'King';
			break;
		case 14: card = 'Ace';
			break;
	}
	return card;
}
//this function will output the plural name of a card
function pluralName(rank) {
	var card;
	switch (rank) {
		case 2: card = 'Twos';
			break;
		case 3: card = 'Threes';
			break;
		case 4: card = 'Fours';
			break;
		case 5: card = 'Fives';
			break;
		case 6: card = 'Sixes';
			break;
		case 7: card = 'Sevens';
			break;
		case 8: card = 'Eights';
			break;
		case 9: card = 'Nines';
			break;
		case 10: card = 'Tens';
			break;
		case 11: card = 'Jacks';
			break;
		case 12: card = 'Queens';
			break;
		case 13: card = 'Kings';
			break;
		case 14: card = 'Aces';
			break;
	}
	return card;
}
//This function shuffles the deck, deals five cards each to two players,
//then creates properties to represent their value and suit.
var myCards = [];
var yourCards = [];
function dealCards() {
	document.getElementById('my-hand').innerHTML = "";
	document.getElementById('your-hand').innerHTML = "";
	document.getElementById('my-hand-2').innerHTML = "";
	document.getElementById('your-hand-2').innerHTML = "";
	document.getElementById('my-win').innerHTML = "";
	document.getElementById('your-win').innerHTML = "";
	document.getElementById('my-rank').innerHTML = "";
	document.getElementById('your-rank').innerHTML = "";
	document.getElementById('my-suit').innerHTML = "";
	document.getElementById('your-suit').innerHTML = "";
	
	// This function shuffles the cards
	function fisherYates ( myArray ) {
	  var i = myArray.length;
	  if ( i === 0 ) return false;
	  while ( --i ) {
		 var j = Math.floor( Math.random() * ( i + 1 ) );
		 var tempi = myArray[i];
		 var tempj = myArray[j];
		 myArray[i] = tempj;
		 myArray[j] = tempi;
	   }
	}
	//create 52 card array
	var deck = [];
	for (i = 0; i <= 51; i++) {
		deck[i] = i + 1;
		//console.log(deck[i]);
	}
	//shuffle deck
	fisherYates(deck);
	for (i = 0; i <= 51; i++) {
		//console.log(deck[i]);
	}
	//create arrays for the two hands
	var showCards = document.getElementsByTagName('img');
	var myHand = [];
	var yourHand = [];
	for (i = 0; i <= 9; i++) {
		dealtCard = deck[i];
		if (i%2 === 0) {
		yourHand.push(dealtCard);
		} else {
		myHand.push(dealtCard);
		}
	}
//These are for manually entering cards during testing
//	yourHand[0] = 4;
//	yourHand[1] = 40;
//	yourHand[2] = 43;
//	yourHand[3] = 44;
//	yourHand[4] = 14;
//	myHand[0] = 3;
//	myHand[1] = 2;
//	myHand[2] = 4;
//	myHand[3] = 5;
//	myHand[4] = 1;

	//display the card images on the webpage
	for (i = 0; i <= 4; i++) {
		var yourNum = yourHand[i];
		var yourString = yourNum.toString();
		var yourURL = 'images/' + yourString + '.png';
		showCards[i].setAttribute("src", yourURL);	
		var myNum = myHand[i];
		var myString = myNum.toString();
		var myURL = 'images/' + myString + '.png';
		showCards[i+5].setAttribute("src", myURL);
	}
	//create objects for cards with their value and suit properties
	for (i = 0; i <= 4; i++) {
		if (myHand[i] <= 13) {
			cardValue = myHand[i];
			myCards[i] = {value: cardValue, suit: "spades"};
		} else if ((myHand[i] > 13) && (myHand[i] <= 26)) {
			cardValue = myHand[i] - 13;
			myCards[i] = {value: cardValue, suit: 'hearts'};
		} else if ((myHand[i] > 26) && (myHand[i] <= 39)) {
			cardValue = myHand[i] - 26;
			myCards[i] = {value: cardValue, suit: 'clubs'};
		} else {
			cardValue = myHand[i] - 39;
			myCards[i] = {value: cardValue, suit: 'diamonds'};
		}
		if ((myCards[i].value === 1) || (myCards[i].value >= 10)) {
			myCards[i].face = 'face';
		}
		if (yourHand[i] <= 13) {
			cardValue = yourHand[i];
			yourCards[i] = {value: cardValue, suit: "spades"};
		} else if ((yourHand[i] > 13) && (yourHand[i] <= 26)) {
			cardValue = yourHand[i] - 13;
			yourCards[i] = {value: cardValue, suit: 'hearts'};
		} else if ((yourHand[i] > 26) && (yourHand[i] <= 39)) {
			cardValue = yourHand[i] - 26;
			yourCards[i] = {value: cardValue, suit: 'clubs'};
		} else {
			cardValue = yourHand[i] - 39;
			yourCards[i] = {value: cardValue, suit: 'diamonds'};
		}
		if ((yourCards[i].value === 1) || (yourCards[i].value >= 10)) {
			yourCards[i].face = 'face';
		}
	}
evaluateHand();
}
//
//
//This function evaluates the hands and ouputs the winner and score
//
function evaluateHand() {
	var i, j;
	var myPoints = 0;
	var yourPoints = 0;
	//sort cards by value
	yourCards.sort(function(a, b) {
		if (a.value < b.value) return -1;
		if (a.value > b.value) return 1;		
		return 0;
	});
	myCards.sort(function(a, b) {
		if (a.value < b.value) return -1;
		if (a.value > b.value) return 1;		
		return 0;
	});
	//
	//Make aces high if not needed for a low run - first for myCards
	//
	if ((myCards[0].value !== 1) || (myCards[1].value !== 2) || (myCards[2].value !== 3) || (myCards[3].value !== 4) || (myCards[4].value !== 5)) { //if not a low run...
		for (i = 0; i <=4; i++) {			//loop through the hand
			if (myCards[i].value === 1) { 	//if a card is an ace
				myCards[i].value = 14;		//then make it one above a king
			}
		}
		myCards.sort(function(a, b) {		//now we need to sort the cards again
			if (a.value < b.value) return -1;
			if (a.value > b.value) return 1;		
			return 0;
		});
	}
	//
	//Now make aces high if not needed for a low run - now for yourCards
	//
	if ((yourCards[0].value !== 1) || (yourCards[1].value !== 2) || (yourCards[2].value !== 3) || (yourCards[3].value !== 4) || (yourCards[4].value !== 5)) { //if not a low run...
		for (i = 0; i <=4; i++) {							//loop through the hand
			if (yourCards[i].value === 1) { 				//if a card is an ace
				yourCards[i].value = 14;					//then make it one above a king
			}
		}
		yourCards.sort(function(a, b) {						//now we need to sort the cards again
			if (a.value < b.value) return -1;
			if (a.value > b.value) return 1;		
			return 0;
		});
	}
	for (i = 0; i <=4; i++) {
	}
	//
	//Check for a flush
	//
	for (i = 1; i <=4; i++) {									//Go through loop and see if each suit matches the first one
		j = i - 1;
		if (myCards[i].suit !== myCards[j].suit) break;
		var myFlushCounter = i;
	}
	if (myFlushCounter === 4) {
		myPoints = myPoints + 500 + myCards[4].value;			//500 points for a flush, add high card value to points
		document.getElementById('my-hand-2').innerHTML = "Flush ";
		document.getElementById('my-suit').innerHTML = myCards[4].suit;			
		document.getElementById('my-rank').innerHTML = '- ' + singularName(myCards[4].value) + " high, ";
	}
	for (i = 1; i <=4; i++) {									//Go through loop and see if each suit matches the first one
		j = i - 1;
		if (yourCards[i].suit !== yourCards[j].suit) break;
		var yourFlushCounter = i;
	}
	if (yourFlushCounter === 4) {
		yourPoints = yourPoints + 500 + yourCards[4].value;		//500 points for a flush, add high card value to points
		document.getElementById('your-hand-2').innerHTML = "Flush ";
		document.getElementById('your-suit').innerHTML = yourCards[4].suit;		
		document.getElementById('your-rank').innerHTML = '- ' + singularName(yourCards[4].value) + " high, ";
	}
	//
	//Check for a straight
	//
	for (i = 1; i <=4; i++) {									//Go through loop and subtract values
		j = i - 1;
		var difference = myCards[i].value - myCards[j].value;
		if (difference !== 1) break;
		var myStraightCounter = i;
	}
	if (myStraightCounter === 4) {
		myPoints = myPoints + 400 + myCards[4].value;			//400 points for a straight, add high card value to points
		document.getElementById('my-hand').innerHTML = "Straight ";
		if (myPoints < 500) {
			document.getElementById('my-rank').innerHTML = '- ' + singularName(myCards[4].value) + " high";
		}
	}
	for (i = 1; i <=4; i++) {									//Go through loop and subtract values
		j = i - 1;
		difference = yourCards[i].value - yourCards[j].value;
		if (difference !== 1) break;
		var yourStraightCounter = i;
	}
	if (yourStraightCounter === 4) {
		yourPoints = yourPoints + 400 + yourCards[4].value;		//400 points for a straight, add high card value to points
		document.getElementById('your-hand').innerHTML = "Straight ";
		if (yourPoints < 500) {
			document.getElementById('your-rank').innerHTML = '- ' + singularName(yourCards[4].value) + " high";
		}
	}
	//
	//Check for two, three, and four-of-a-kind
	//
	if (myPoints < 400) {											//don't try this if there is already a flush or straight
		var myHiCard;
		var myPairsArray = [];
		for (i = 1; i <=4; i++) {									//Go through loop and subtract values
			j = i - 1;
			difference = myCards[i].value - myCards[j].value;
			if (difference === 0) {
				myPairsArray[j] = 1;
				myHiCard = myCards[i].value;
			} else {
				myPairsArray[j] = 0;
			}
		}
		var myPairsTotal = 0;											//total up the points for the pairs
		for (i = 0; i <= 3; i++) {
			myPairsTotal = myPairsTotal + myPairsArray[i];
		}
		if (myPairsTotal === 1) {										//Check for pairs
			myPoints = myPoints + 100 + myHiCard;
			document.getElementById('my-hand').innerHTML = "A pair ";
			document.getElementById('my-rank').innerHTML = "of " + pluralName(myHiCard) + " ";
		}
		if (myPairsTotal === 0) {										//If nothing else, high card is used
			myPoints = myPoints + myCards[4].value;
			document.getElementById('my-rank').innerHTML = "A single " + singularName(myCards[4].value) + " ";
			document.getElementById('my-suit').innerHTML = 'of ' + myCards[4].suit + " ";
		}
		if ((myPairsTotal === 3) && (myPairsArray[1] === 0 || myPairsArray[2] === 0)) {	//full house
			myPoints = myPoints + 600 + myCards[4].value;
			document.getElementById('my-hand').innerHTML = "Full-house, ";
			document.getElementById('my-rank').innerHTML = pluralName(myCards[4].value) + " high";
		}
		if ((myPairsTotal === 3) && (myPairsArray[0] === 0 || myPairsArray[3] === 0)) {	
			myPoints = myPoints + 700 + myCards[3].value;								//four-of-a-kind
			document.getElementById('my-hand').innerHTML = "Four-of-a-kind, ";
			document.getElementById('my-rank').innerHTML = pluralName(myCards[3].value);
		}
		if (myPairsTotal === 2) {										//Check for two pairs or 3 of a kind
			if ((myPairsArray[0] === 1 && myPairsArray[1] === 1) || (myPairsArray[1] === 1 && myPairsArray[2] ===1) || (myPairsArray[2] === 1 && myPairsArray[3] ===1)) {
				myPoints = myPoints + 300 + myCards[2].value;
				document.getElementById('my-hand').innerHTML = "Three-of-a-kind, ";
				document.getElementById('my-rank').innerHTML = pluralName(myCards[2].value);
			} else {
				myPoints = myPoints + 200 + myCards[3].value;
				document.getElementById('my-hand').innerHTML = "Two pairs, ";
				document.getElementById('my-rank').innerHTML = pluralName(myCards[3].value) + " high";
			}
		}
	}
	if (yourPoints < 400) {												//don't try this if there is already a flush or straight
		var yourHiCard;
		var yourPairsArray = [];
		for (i = 1; i <=4; i++) {										//Go through loop and subtract values
			j = i - 1;
			difference = yourCards[i].value - yourCards[j].value;
			if (difference === 0) {
				yourPairsArray[j] = 1;
				yourHiCard = yourCards[i].value;
			} else {
				yourPairsArray[j] = 0;
			}
		}
		var yourPairsTotal = 0;											//total up the points for the pairs
		for (i = 0; i <= 3; i++) {
			yourPairsTotal = yourPairsTotal + yourPairsArray[i];
		}
			if (yourPairsTotal === 1) {									//Check for pairs
			yourPoints = yourPoints + 100 + yourHiCard;
			document.getElementById('your-hand').innerHTML = "A pair ";
			document.getElementById('your-rank').innerHTML = "of " + pluralName(yourHiCard) + " ";
		}
			if (yourPairsTotal === 0) {									//if nothing else, high card is used
			yourPoints = yourPoints + yourCards[4].value;
			document.getElementById('your-rank').innerHTML = "A single " + singularName(yourCards[4].value) + " ";
			document.getElementById('your-suit').innerHTML = 'of ' + yourCards[4].suit + " ";
		}
		if ((yourPairsTotal === 3) && (yourPairsArray[1] === 0 || yourPairsArray[2] === 0)) {	//full house
			yourPoints = yourPoints + 600 + yourCards[4].value;
			document.getElementById('your-hand').innerHTML = "Full-house, ";
			document.getElementById('your-rank').innerHTML = pluralName(yourCards[4].value) + " high";
		}
		if ((yourPairsTotal === 3) && (yourPairsArray[0] === 0 || yourPairsArray[3] === 0)) {
			yourPoints = yourPoints + 700 + yourCards[3].value;									//four-of-a-kind
			document.getElementById('your-hand').innerHTML = "Four-of-a-kind, ";
			document.getElementById('your-rank').innerHTML = pluralName(yourCards[3].value);
		}
		if (yourPairsTotal === 2) {										//Check for two pairs or 3 of a kind
			if ((yourPairsArray[0] === 1 && yourPairsArray[1] === 1) || (yourPairsArray[1] === 1 && yourPairsArray[2] ===1) || (yourPairsArray[2] === 1 && yourPairsArray[3] ===1)) {
				yourPoints = yourPoints + 300 + yourCards[2].value;
				document.getElementById('your-hand').innerHTML = "Three-of-a-kind, ";
				document.getElementById('your-rank').innerHTML = pluralName(yourCards[2].value);
			} else {
				yourPoints = yourPoints + 200 + yourCards[3].value;
				document.getElementById('your-hand').innerHTML = "Two pairs, ";
				document.getElementById('your-rank').innerHTML = pluralName(yourCards[3].value) + " high";
			}
		}
	}
	if ((myPairsTotal === 0) && (yourPairsTotal === 0) && (myPoints === yourPoints)) {	//break a single card tie with next ranking high cards
		for (i = 3; i >= 0; i--) {
			myPoints = myPoints + myCards[i].value;
			yourPoints = yourPoints + yourCards[i].value;
			if (myPoints !== yourPoints) break;
		}
	}
	if ((myPairsTotal === 1) && (yourPairsTotal === 1) && (myPoints === yourPoints)) {	//break a pairs tie with next ranking high cards
		for (i = 4; i >= 0; i--) {
			myPoints = myPoints + myCards[i].value;
			yourPoints = yourPoints + yourCards[i].value;
			if (myPoints !== yourPoints) break;
		}
	}		
	if (myPoints > yourPoints) {
		myResult = ' - Win!';
		yourResult = ' - Lose';
		myUpdate = myCounter();
	}
	if (myPoints < yourPoints) {
		yourResult = ' - Win!';
		myResult = ' - Lose';
		yourUpdate = yourCounter();
		}
	if (myPoints === yourPoints) {
		yourResult = ' - Tie';
		myResult = ' - Tie';
	}
	if (yourPoints === 928) {
		document.getElementById('your-hand').innerHTML = "Royal ";
		document.getElementById('your-rank').innerHTML = "";
	}	
	if (myPoints === 928) {
		document.getElementById('my-hand').innerHTML = "Royal ";
		document.getElementById('my-rank').innerHTML = "";
	}	
	document.getElementById('my-win').innerHTML = ' ' + myPoints + myResult;
	document.getElementById('my-total').innerHTML = ' (' + myUpdate + ' total wins)';
	document.getElementById('your-win').innerHTML = ' ' + yourPoints + yourResult;
	document.getElementById('your-total').innerHTML = ' (' + yourUpdate + ' total wins)';
}
var myUpdate = 0;
var yourUpdate = 0;
var myCount = 0;
var yourCount = 0;
function myCounter() {
	myCount = myCount + 1;
	return myCount;
}
function yourCounter() {
	yourCount = yourCount + 1;
	return yourCount;
}
function reloadPage() {
	location.reload(true);
}