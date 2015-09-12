function currencyCalculatorFactory() {

	/**
	* Array to hold 
	*/
	var finalBitcoinAmount;

	var finalGoldAmount;

	var finalSilverAmount;

	var currencyCalculator = new Object();

	var userInputAmount = prompt("Enter amount in USD");

	currencyCalculator.currencyObjectCollectionUSD = [];

	currencyCalculator.currencyObjectCollectionGrams = [];

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
					currencyObjUSD = currencyFactory(key, convertedJSON[key].USD);
					currencyCalculator.currencyObjectCollectionUSD.push(currencyObjUSD);

					currencyObjGrams = currencyFactory(key, convertedJSON[key].Grams);
					currencyCalculator.currencyObjectCollectionGrams.push(currencyObjGrams);
					
				}
				
				currencyCalculator.convertAmountBitcoin(currencyCalculator.currencyObjectCollectionUSD);
				currencyCalculator.convertAmountGoldSilver(currencyCalculator.currencyObjectCollectionGrams);
				
				currencyCalculator.printData();
			}
		}
		request.send();
	}


	/**
	* Conversion of JSON data amounts into usable currency amounts  
	*/
	currencyCalculator.convertAmountBitcoin = function (data) {
		for (key in data) {
			var bitcoinAmount = (data[0].convertValue);
			//var goldAmount = (data[1].convertValue);
			//var silverAmount = (data[2].convertValue);
			
		}
		 finalBitcoinAmount = bitcoinAmount *= userInputAmount;
		//var finalGoldAmount = goldAmount *= userInputAmount;
		//var finalSilverAmount = silverAmount *= userInputAmount;

		//Displays final result in an alert box
		//alert("Bitcoin equals " + finalBitcoinAmount + "\n" + "Gold equals " + finalGoldAmount + "\n" + "Silver equals " + finalSilverAmount);
			
	}

	currencyCalculator.convertAmountGoldSilver = function (data) {
		for (key in data) {
			var goldAmount = (data[0].convertValue);
			var silverAmount = (data[1].convertValue);
			
		}

		 finalGoldAmount = goldAmount *= userInputAmount;
		 finalSilverAmount = silverAmount *= userInputAmount;
	}

	/**
	*Alerts user with final outputs
	*/
	currencyCalculator.printData = function () {
		alert("Bitcoin equals " +
		 finalBitcoinAmount + "dollars" +
		  "\n" + "Gold equals " +
		   finalGoldAmount + " grams" +
		    "\n" + "Silver equals " +
		    finalSilverAmount + " grams");
	}	

	/**
	*Calls to get currency conversion data
	*/
	function init(){
		currencyCalculator.requestData('http://coinabul.com/api.php');	
	}
	
	init();
}


currencyCalculatorFactory();

