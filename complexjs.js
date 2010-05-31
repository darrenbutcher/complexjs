//********************************************************************************//
//*  Project Name : ComplexJs                                                    *//
//*  Developer(s): Darren Butcher                                                *//
//*  Date: May 2nd 2010                                                          *//
//*                                                                              *//
//*  Project Description:                                                        *//
//*                                                                              *//
//*  This is an open source library for creating custom validators for complex form *//
//*  elements. This project is inspired by custom validation that had to be done *// 
//*  in a class project.                                                         *//
//*                                                                              *//
//*  Feel free to use and/or modify the code.                                    *//
//********************************************************************************//

// =================================================================================
//  FUNCTIONS CODED:
//    checkRadio, checkSelection, range, position, checkPresent
//    checkNumeric, checkPositive, checkHypen, checkWhole, checkNumericFloat
//    checkMore, sum, sumCheck, checkAlphabetic, firstLetterUpperCase 
// ==================================================================================

// ========================================
//  Used to check if radio button is selected
// ========================================
function checkRadio(name, value){
	
	var max = value.length -1;
	
    for (var i = 0; i <= max; i++) {
      if (value[i].checked  == true) {
    	  return true;
      }
    }
    errMessages += "<li>" + name + " - Please select a choice.</li>"; 
    return false; 
}

// ========================================
//  Used to check if a slection is made
// ========================================
function checkSelection(name, value){
	if (value == -1) {
    	     errMessages += "<li>" + name + " - Please select a choice.</li>";    
	}
	else {
		return true;
	}
}

// ========================================
//  Used to check number ranges ex. 
//  Checking month value is BETWEEN 1 and 12
// ========================================
function range(name, value, rangeOne, rangeTwo){	   
	   if (value >= rangeOne ){
		   if (value > rangeTwo){
               errMessages += "<li>" + name + " - "+ value + " is not in range (" + rangeOne + " - " + rangeTwo + ").</li>";
			   return false;
		   }
		   else {
			   return true;   
		   }
	   }
	   else {
		   errMessages += "<li>" + name + " - "+ value + " is not in range (" + rangeOne + " - " + rangeTwo + ").</li>";
		   return false;
	   }	   
}

// ========================================
//  Used to check positions, similar to substr(x,y) method but 
//  position(x, y) returns x and y
// ========================================
function position(positionOne, positionTwo){
	  var positionTwo = typeof(positionTwo) != 'undefined' ? positionTwo : 'empty';
	       
		   if (positionTwo != 'empty'){
			   positionOne = positionOne - 1;
			   positionTwo = positionTwo - 1;
			
	           return {posX:positionOne, posY:positionTwo};
		   }
		   else{
			   positionTwo = positionOne - 1;
			   positionOne = 0;

               return {posX:positionOne, posY:positionTwo}; 
		   }
}

// ========================================
//  Used to check if a textbox value is present
//  also based on position
// ========================================
function checkPresent(name, value, position){
  var position = typeof(position) != 'undefined' ? position : 'empty';
	           
	   if(position == 'empty'){
	          length = value.length;
	          if(value.length == 0){
	             errMessages += "<li>" + name + " - This field is required.</li>";
	             return false; 
	          }
	          else{
		         return true;
	          }        
	   }
	   else{
	        length = position.posY + 1;
	          if(value.length == 0){
	             errMessages += "<li>" + name + " - This field is required.</li>"; 
	             return false;       
	          }
	          else{
	             	if(value.length < length){
	                errMessages += "<li>" + name + " - " + length + " spaces is required.</li>";
	                return false;
	             	}
	             	else{
	                   	for(var i= position.posX; i <= length; i++){
	                    	if(value[i] == ' '){
	                             errMessages += "<li>" + name + " -  No spaces allowed.</li>";
	                             return false;
	                        }
		                } 
	                }
	                return true;   
	          }                
	   }
}

// ========================================
//  Used to check if a value of a textbox contains numerbers 
// ========================================
function checkNumeric(name, value, position){
	   var position = typeof(position) != "undefined" ? position : "empty";
	   
	   if(position == "empty"){
		   for(var i = 0; i < value.length; i++){
			   if (value.charCodeAt(i) < 48 || value.charCodeAt(i) > 57){
                   errMessages += "<li>" + name + " - Value must be a number.</li>";
                   return false;
			   }
           } 
		   return true;   
	   }
	   else{	   
		   for(var i = position.posX; i < position.posY + 1; i++){
			   if (value.charCodeAt(i) < 48 || value.charCodeAt(i) > 57){
                   errMessages += "<li>" + name + " - Value must be a number.</li>";
                   return false;
			   }
		   }
          return true;        
	   }
}

// ========================================
//  Used to check if a textbox value is positive
// ========================================	
function checkPositive(name, value){
	   if (value.substr(0, 1) == '-'){
		   errMessages += "<li>" + name + " - Cannot be a negative number.</li>";
		   return false; 
	   }
	   else{
		   return true;
	   }
}

// ========================================
//  Used to check if a symbol is a specific position
//  ex. check for a Hypen
// ========================================	
function checkSymbol(name, value, symbolName, symbol, position){
	   if (value.substr(position - 1, 1) != symbol){
		   errMessages += "<li>" + name + " - Must have a "+ symbolName + " (" + symbol + ")  in position " + position + ".</li>";
		   return false;
	   }
	   else{
		   return true;
	   }
} 

// ========================================
//  Used to check if a value in a textbox is whole number
// ========================================
function checkWhole(name, value){
	   if (value.lastIndexOf('.') > -1){
		   errMessages += "<li>" + name + " - Must be whole number.</li>";
		   return false;
	   }
	   else{
		   return true;
	   }
} 

// ========================================
//  Used to check if value is a number with decimals
//  ex. checking interest rate between 3.000 - 18.0000
// ========================================
function checkNumericFloat(name, value){
	var conversion = parseFloat(value);
	
	if (isNaN(conversion) == true){
		errMessages += "<li>" + name + " - Value must be a number with decimals.</li>";
		return false;
	}
	else{
		return true;
	}
}

// ========================================
//  Used to check the downPayment and propertyValue
// ========================================
function checkMore(name, amount, comparision){
	switch(name){
    case 'Down Payment':
    	if (amount >= comparision){
	        return true;
        }
    	else{
    		errMessages += "<li>" + name + " - Down payment must be 5% more than Property Value.</li>";
            return false;
    	}	
      break;
    case 'Property Value':
    	if (amount >= comparision){
	       return true;
        }
    	else{
    		errMessages += "<li>"  + name + " - Property Value must be 50,000 more than Down Payment.</li>";
            return false;
    	}
      break;
	}
}

// ========================================
//  Used to check if the sum of value of a textbox is greater than 0
// ========================================
function sum(name, value, x, y){
    var total = 0;
    for(var i = x -1; i < y; i++){
    	var temp = value.substr(i, 1);
    	total = total + eval(temp);
}
    if (total <= 0){
    	errMessages = "<li>" + name + " - The sum of the numbers to the left/right of the hyphen (-) must be greater than zero.</li>";
        return false;
    }else{
           return total;
    }
}

// ========================================
//  Used to check if the sum of numbers is double the sum of another number
// ========================================
function sumCheck(name, sum1, sum2){
	if (sum1/2  != sum2 ) {
		errMessages += "<li>" + name + " - The sum of the numbers to the right of the hyphen (-) " +
		 "must be double the sum of the numbers to the left of the hyphen (-).</li>";
		return false;
	}
	else{
		return true;
	}
}

// ========================================
//  Used to check if the value of a textbox contains alphabetic characters
//    In addition:
//       Checks if an apostrophe or hyphen is the last letter
//       Checks if an apostrophe or hypen is next to each other
// ========================================
function checkAlphabetic(name, value, position){
	   var position = typeof(position) != 'undefined' ? position : 'empty';

	   	   if(position == 'empty'){
		   
		   for(var i = 0; i < value.length; i++){
			   if (value.charCodeAt(i)  > 64 && value.charCodeAt(i) < 124 || value.charCodeAt(i) == 39 || value.charCodeAt(i) == 45){
				   //do nothing
			   }
			   else{
                     errMessages += "<li>" + name + " - Value is not alphabetic.</li>.";
				     return false;
			   }
		   }
		   if(value.lastIndexOf('-') >= 0  || value.lastIndexOf('\'') >= 0 ){
			   if(value.lastIndexOf('-') == value.length -1  || value.lastIndexOf('\'') == value.length -1 ){
				    	errMessages += "<li>" + name + " - A hypen (-) or apostrophe (') cannot be last letter.</li>";
				    return false;
			   }
				   if(value.substr((value.lastIndexOf('-')+1), 1) == '\'' || value.substr((value.lastIndexOf('-')-1), 1) == '\''){
					   	errMessages += "<li>" + name + " - A hypen (-) and apostrophe (') cannot be next to each other.</li>";
					   return false;
				   }
		   }
		   return true;
	   }
	   else{	   
		   for(var i = position.posX; i < position.posY + 1; i++){
			   if (value.charCodeAt(i)  < 64 || value.charCodeAt(i) > 122 || value.charCodeAt(i) == 39 || value.charCodeAt(i) == 45){
                          	errMessages += "<li>" + name + " - First " + position.y +  " spaces must start with (a -z) or (A -Z).</li>";
				          return false;
			   }
		   }
           return true;
	   }
}
// ========================================
//  Used to change the first letter of a textbox to a capital letter
// ========================================
function firstLetterUpperCase(value){
	var value = value.substr(0,1).toUpperCase() + value.substr(1,value.length);
	return value;
}