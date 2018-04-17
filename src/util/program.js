
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

var myObject = (function () {
    var value = 0; 

    return { 
        incrememnt: function (inc) {
            value += typeof inc === 'number' ? inc : 1; 
        }, 
        getValue: function ( ) {
            return value; 
        }
    };
}()); 

var quo = function (status) {
    return {
        get_status: function ( ) {
            return status; 
        }
    };
};

// Make an instance of quo. 

var myQuo = quo("amazed"); 

document.writeln(myQuo.get_status()); 

// Let's look a more useful example: 

// Define a function that sets a DOM node's color
// to yellow and then fades it to white. 

var fade = function(node) {
    var level = 1; 
    var step = function ( ) {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex; 
        if (level < 15) {
            level += 1; 
            setTimeout(step, 100); 
        }
    };
    setTimeout(step, 100); 
}

fade(document.body); 

// check out his back example. 

// Make a function that assigns event handler functions to an array of nodes the wrong way. 
// When you click on a node, an alert box is supposed to display the ordinal of the node. 
// But it always displays the number of nodes instead. 

var add_the_handlers = function(nodes) {
    var i; 
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (e) {
            alert(i); 
        };
    }
};

// It fails because the handler functions are bound to the variable i, not the value of the variable i at the time the function was made. 

// Here's a better example..

// Make a function that assigns event handler functions to an array of nodes. 
// When you click on a node, an alert box will display the ordinal of the node. 

var add_the_handlers = function (nodes) {
    var helper = function (i) {
        return function (e) {
            alert(i); 
        };
    };
    var i; 
    for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = helper(i); 
    }
};

// Callbacks

// request = prepare_the_request ( ); 
// send_request_asynchronously(request, function(response) {
//     display(response); 
// });

String.method('deentityify', function ( ) {
    // the entity table. it maps entity names to characters. 

    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };

    // Return the deentityify method.

    return function ( ) {
        // This is the deentityify method. It call the string
        // replace method, looking for substring that start 
        // with '&' and end with ';'. If the characters in
        // between are in the entity table, then replace the 
        // entity with the character from the table. It uses
        // a regular expression

        return this.replace(/&([^&;]+);/g, 
            function (a, b) {
                var r = entity[b]; 
                return typeof r === 'string' ? r : a; 
            }
        );
    };
}( ));

document.writeln( '&lt;&quot;&gt;'.deentityify( )); 

// This is weird. 

var serial_maker = function ( ) {
    // Produce an object that produces unique strings. A 
    // unique string is made up of two pars: a prefix
    // and a sequence number. The object comes with 
    // methods for setting the prefex and sequence number,
    // and a gensym method that produces unique strings. 

    var prefix = ''; 
    var seq = 0; 
    return {
        set_prefix: function (p) {
            prefix = String(p); 
        },
        set_seq: function (s) {
            seq = s; 
        },
        gensym: function ( ) {
            var result = prefix + seq; 
            seq += 1; 
            return result; 
        }
    };
};

var seqer = serial_maker( ); 
seqer.set_prefix('Q'); 
seqer.set_seq(1000); 
var unique = seqer.gensym( ); 
var unique1 = seqer.gensym( ); 
var unique2 = seqer.gensym( ); 

document.writeln(`1 ${unique} 2 ${unique1} 3 ${unique2}`); 

// DANG that's kinda cool. 

// CASCADES

// getElementsByAttribute('myBoxDiv')
// .move(350, 150)
// .width(100)
// .height(100)
// .color('red')
// .border('10px outset')
// .padding('4px')
// .appendText("Please stand by")
// .on('mousedown', function (m) {
//     this.startDrag(m, this.getNinth(m));
// })
// .on('mousemove', 'drag')
// .on('mouseup', 'stopDrag')
// .later(2000, function ( ) {
//     this
//         .color('yellow')
//         .setHTML("What hath God wraught?")
//         .slide(400, 40, 200, 200); 
// })
// .tip("This box is resizeable") 

// Each interface does just a little bit. 


Function.method('curry', function ( ){
    var slice = Array.prototype.slice, 
        args = slice.apply(arguments),
        that = this; 
    return function ( ) {
        return that.apply(null, args.concat(slice.apply(arguments)));
    };
});  // Something isn't right... 

var add1 = add.curry(1); 
document.writeln(add1(6)); 

// Not memorization... Memoization 

var fibonacci = function (n) {
    return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2); 
};

for (var i = 0; i <= 10; i += 1) {
    document.writeln('// ' + i + ': ' + fibonacci(i)); 
}

// This is expensive and dumb. Let's use memoization to save our recently computed values. 

var fibonacci = (function ( ) {
    var memo = [0, 1]; 
    var fib = function (n) {
        var result = memo[n]; 
        if(typeof result !== 'number') {
            result = fib(n -1) + fib(n - 2);
            memo[n] = result; 
        }
        return result; 
    };
    return fib; 
}( )); 

// What the flip... We can write a memoizer function...

var memoizer = function (memo, formula) {
    var recur = function (n) {
        var result = memo[n]; 
        if (typeof result !== 'number') {
            result = formula(recur, n); 
            memo[n] = result; 
        }
        return result; 
    }
    return recur; 
};

// this is so freaking confusing. 

var fibonacci = memoizer([0, 1], function (recur, n) {
    return recur(n -1 ) + recur ( n -2 ); 
});

document.writeln(fibonacci(10)); 

// freaking factorials I guess...

var factorial = memoizer([1, 1], function (recur, n) {
    return n * recur(n - 1); 
});

document.writeln(factorial(10)); 

// Dude all these shakespeare quotes are awesome. 

// Divides one thing entire to many objects; Like perspectives, which rightly gazed upon Show nothing but confustion.. 

// We can define a constructor and augment its prototype: 

var Mammal = function (name) {
    this.name = name; 
}

Mammal.prototype.get_name = function ( ) {
    return this.name; 
};

Mammal.prototype.says = function () {
    return this.saying || ''; 
};

var myMammal = new Mammal('Herb the Mammal'); 
var name = myMammal.get_name( ); 
document.writeln('Name: ', name); 

var Cat = function(name) {
    this.name = name; 
    this.saying = 'meow'; 
};

// Replace Cat.prototype with a new instance of Mammal

Cat.prototype = new Mammal( ); 

// Augment the new prototype with purr and get_name methods. 

Cat.prototype.purr = function (n) {
    var i, s = ''; 
    for(i = 0; i < n; i +=1) {
        if  (s) {
            s += '-';
        }

        s += 'r'; 
    }
    return s; 
};

Cat.prototype.get_name = function ( ) {
    return this.says( ) + ' ' + this.name + ' ' + this.says( ); 
}; 

var myCat = new Cat('Henrietta'); 
var says = myCat.says( ); 
var purr = myCat.purr(5); 
var name = myCat.get_name( ); 

document.writeln(`says: ${says} purr: ${purr} name: ${name}`)

// This is kinda cool I guess. Still feel like I need a lot of practice to ever get it right...

Function.method('inherits', function (Parent) {
    this.prototype = new Parent( ); 
    return this; 
});

// Out inherits and method methods return this, allowing us to program in a cascade style. 
// We can now make our Cat with one statement...

var Cat = function (name) {
    this.name = name; 
    this.saying = 'meow'
}.
    inherits(Mammal).
    method('purr', function (n) {
        var i, s = ''; 
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-'; 
            }
            s += 'r'; 
        }
        return s; 
    }).
    method('get_name', function ( ) {
        return this.says( )  + ' ' + this.name + ' ' + this.says( ); 
    });

// This whole thing is a serious design error in the language. To mitigate this problem, there is a convention that all contructor functions are named with an intitial capital, and that nothing else is spelled with an initial capital. 
// This givus us a prayer that visual inspection can find a missing new. A much better alternative is to not use new at all. 

// This pseudoclassical form can provide comfort, but also hides the true nature of the language. 
// JavaScript has more and better options. 

// object specifiers. Pass an object into your function as arguments labeled. 

// Prototypal inheritance we dispense with classes... Cool! 

var myMammal = {
    name: 'Herb the Mammal',
    get_name: function ( ) {
        return this.name; 
    },
    says: function ( ) {
        return this.saying || ''; 
    }
};

var myCat = Object.create(myMammal); 
myCat.name = "Henrietta"; 
myCat.saying = 'meow'; 
myCat.purr = function (n) {
    var i, s = ''; 
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-'; 
        }
        s += 'r'; 
    }
    return s; 
};
myCat.get_name = function ( ) {
    return this.says() + ' ' + this.name + ' ' + this.says(); 
}

var block = function ( ) {
    // remember the current scope. Make a new scope that includes everything from the current one. 

    var oldScope = scope; 
    scope = Object.create(scope); 

    // Advance past the left curly brace. 

    advance('{'); 

    // Parse using the new scope. 

    parse(scope); 

    // Advance past the right curly brace and discard the new scope, restoring the old one. 

    advance('}'); 
    scope = oldScope; 
};

// Module pattern to keep properties private. 

var mammal = function (spec) {
    var that = {}; 

    that.get_name = function ( ) {
        return spec.name; 
    };

    that.says = function ( ) {
        return spec.saying || ''; 
    };

    return that; 
};

var myMammal = mammal({ name: 'Herb'}); 


var cat = function (spec) {
    spec.saying = spec.saying || 'meow'; 
    var that = mammal(spec); 
    that.purr = function (n) {
        var i, s = ''; 
        for (i = 0; i < n; i+= 1) {
            if (s) {
                s += '-'; 
            }
            s += 'r'; 
        }
        return s; 
    };
    that.get_name = function () {
        return that.says() + ' ' + spec.name + ' ' + that.says(); 
    };
    return that; 
};

var myCat = cat({ name: 'Henrietta'}); // Hmm that's kinda cool. 

