function currencyCalculatorFactory() {

	/**
	* Array to hold 
	*/
	var finalBitcoinAmount;

	var finalGoldAmount;

	var finalSilverAmount;

	var currencyCalculator = new Object();

	var userInputAmount = prompt("How much would you like to convert to USD?");

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
			finalBitcoinAmount = (data[0].convertValue);
		}
		 finalBitcoinAmount *= userInputAmount;
	}

	currencyCalculator.convertAmountGoldSilver = function (data) {
		for (key in data) {
			 finalGoldAmount = (data[0].convertValue);
			 finalSilverAmount = (data[1].convertValue);
			
		}

		 finalGoldAmount *= userInputAmount;
		 finalSilverAmount *= userInputAmount;
	}

	/**
	*Alerts user with final outputs
	*/
	currencyCalculator.printData = function () {
		alert("Bitcoin equals " +
		 finalBitcoinAmount + " dollars" +
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

