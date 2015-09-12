function currencyCalculatorFactory() {

	/**
	* Array to hold 
	*/
	var currencyCalculator = new Object();

	var userInputAmount = prompt("Enter number in USD");

	currencyCalculator.currencyObjectCollection = [];

	/**
	* Request for the JSON data amounts 
	*/
	currencyCalculator.requestData = function (url) { 
		var request = new XMLHttpRequest();
		request.open('GET', url);
		request.onreadystatechange = function() {
			if((request.status == 200) && (request.readyState == 4)) {
				var convertedJSON = JSON.parse(request.responseText);
				for(key in convertedJSON){
					currencyObj = currencyFactory(key, convertedJSON[key].USD);
					currencyCalculator.currencyObjectCollection.push(currencyObj);
					
				}
				console.log(currencyCalculator.currencyObjectCollection);
				currencyCalculator.convertAmount(currencyCalculator.currencyObjectCollection);
			}
		}
		request.send();
	}


	/**
	* Conversion of JSON data amounts into usable currency amounts  
	*/
	currencyCalculator.convertAmount = function (data) {
		for (key in data) {
			var bitcoinAmount = (data[0].convertValue);
			var goldAmount = (data[1].convertValue);
			var silverAmount = (data[2].convertValue);
			
		}
		var finalBitcoinAmount = bitcoinAmount *= userInputAmount;
		var finalGoldAmount = goldAmount *= userInputAmount;
		var finalSilverAmount = silverAmount *= userInputAmount;

		//Displays final result in an alert box
		alert("Bitcoin equals " + finalBitcoinAmount + "\n" + "Gold equals " + finalGoldAmount + "\n" + "Silver equals " + finalSilverAmount);
			
	}


	/**
	*Calls to have currency conversion data on screen
	*/
	function init(){
		currencyCalculator.requestData('http://coinabul.com/api.php');	
	}
	
	init();
}
currencyCalculatorFactory();

