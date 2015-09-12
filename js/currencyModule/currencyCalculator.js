function currencyCalculatorFactory() {

	/**
	* Array to hold 
	*/
	var currencyCalculator = new Object();

	currencyCalculator.currencyObjectCollection = [];

	/**
	* Request for the JSON data amounts 
	*/
	currencyCalculator.requestData = function (url) { 
		var request = new XMLHttpRequest();
			console.log("Heey");
		request.open('GET', url);
		request.onreadystatechange = function() {
			if((request.status == 200) && (request.readyState == 4)) {
				var convertedJSON = JSON.parse(request.responseText);
				for(key in convertedJSON){
					currencyObj = currencyFactory(key, convertedJSON[key].USD);
					currencyCalculator.currencyObjectCollection.push(currencyObj);
					
				}
				console.log(currencyCalculator.currencyObjectCollection);
				
			}
		}
		request.send();
	}


	/**
	* Conversion of JSON data amounts into usable currency amounts  
	*/



	/**
	*Display currency data on screen
	*/
	function init(){
		currencyCalculator.requestData('http://coinabul.com/api.php');	
	}
	
	init();
}
currencyCalculatorFactory();