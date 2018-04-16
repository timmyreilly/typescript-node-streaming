document.writeln("hello world"); 

// Function literal: 

var add = function (a, b) {
    return a + b; 
}

// Create myObject. It has a value and an increment
// method. The increment method takes an optional parameter. 
// If the argument is not a number, then 1 is used as the default. 

var myObject = {
    value: 0, 
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1; 
    }
}

myObject.increment(); 
document.writeln(myObject.value); 

myObject.increment(2); 
document.writeln(myObject.value); 

// Augment myObject with a double method. 

myObject.double = function ( ) {
    var that = this; 

    var helper = function ( ) {
        that.value = add(that.value, that.value); 
    }; 

    helper( ); 
}; 

// Invoke double as a method

myObject.double(); 
document.writeln(myObject.value); 

// Create a constructor function called Quo. 
// It makes an object with a status property. 

var Quo = function (string){
    this.status = string; 
}

// Give all instances of Quo a public method 
// called get_status. 

Quo.prototype.get_status = function ( ) {
    return this.status; 
};

// Make an instance of Quo. 

var myQuo = new Quo("confused"); 

document.writeln(myQuo.get_status()); 

// Make an array of 2 number and add them. 

var array = [3, 4]; 
var sum = add.apply(null, array); 

// Make an object with a status member. 

var statusObject = {
    status: 'A-OK'
}; 

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on 
// statusObject even though statusObject does not have
// a get_status method. 

var status = Quo.prototype.get_status.apply(statusObject); 
document.writeln(status); 

// Make a function that adds a lot of stuff. 

// Note that defining the variable sum inside of the function does not interfere with the sum defined outside 
// of the function. The function only sees the inner one. 

var sum = function ( ) {
    var i, sum = 0; 
    for(i = 0; i < arguments.length; i += 1){
        sum += arguments[i]; 
    }
    return sum; 
};

document.writeln(sum(4, 8, 15, 16, 23, 42)); 

var add = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number'){
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b; 
}

var try_it = function ( ) {
    try {
        add("seven"); 
    } catch (e){
        document.writeln(e.name + ': ' + e.message); 
    }
}

try_it(); 

Function.prototype.method = function (name, func) {
    this.prototype[name] = func; 
    return this; 
};

Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this); 
});

document.writeln((-10 / 3).integer()); 

// JavaScript lacks a method that removes spaces from the ends of a string. That is an easy oversight to fix: 

String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, ''); 

})
document.writeln('"' + "     neat    ".trim( ) + '"'); 

// Add a method conditionally. 

Function.prototype.method = function (name, func) {
    if (!this.prototype[name]){
        this.prototype[name] = func; 
        return this; 
    }
}; 

var hanoi = function hanoi(disc, src, aux, dst) {
    if(disc > 0) {
        hanoi(disc - 1, src, dst, aux);
        document.writeln('Move disc ' + disc + ' from ' + src + ' to ' + dst); 
        hanoi(disc -1, aux, src, dst); 
    }
};

hanoi(3, 'Src', 'Aux', 'Dst'); 

// Define a walk_the_DOM function that visits every 
// node of the tree in HTML source order, starting
// from some give node. It invokes a function,
// passing it each node in turn. walk_the_DOM calls
// itself to process each of the child nodes. 

var walk_the_DOM = function walk(node, func){
    func(node);
    node = node.firstChild; 
    while(node) {
        walk(node, func); 
        node = node.nextSibling; 
    }
};

// Define a getElementsByAttribute function. It
// takes an attribute name string and an optional 
// matching value. It calls walk_the_DOM, passing it a 
// function that looks for an attribute name in the node. 
// The matching nodes are accumulated in a results array. 

var getElementsByAttribute = function (att, value) {
    var results = []; 

    walk_the_DOM(document.body, function(node) {
        var actual = node.nodeType === 1 && node.getAttribute(att); 
        if (typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
            results.push(node); 
        }
    });

    return results; 
}

var factorial = function factorial(i, a){
    a = a || 1; 
    if (i < 2){
        return a; 
    }
    return factorial(i - 1, a * i); 
};

document.writeln(factorial(4)); 