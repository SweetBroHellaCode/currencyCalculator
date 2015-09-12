/**
* Object constructor to hold money 
*/

function currencyFactory(name, convertValue) {
	var _name = name;
	var _convertValue = convertValue;	

	return {
		"name" : _name,
		"convertValue" : _convertValue
	}
}