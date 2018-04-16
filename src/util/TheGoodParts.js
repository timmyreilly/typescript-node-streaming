// Create myObject. It has a value and an increment
// method. The increment method takes an optional parameter. 
// If the argument is not a number, then 1 is used as the default. 

var myObject = {
    value: 0, 
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1; 
    }
}

