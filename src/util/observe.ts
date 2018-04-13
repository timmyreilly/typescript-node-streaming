import { map } from "bluebird";

// Let's learn about observables...
// http://reactivex.io/learnrx/

// map, filter, concatAll, reduce, zip


function mainOne() {
    const newReleases = [
        {
            "id": 70111470,
            "title": "Die Hard",
            "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        },
        {
            "id": 654356453,
            "title": "Bad Boys",
            "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id: 432534, time: 65876586 }]
        },
        {
            "id": 65432445,
            "title": "The Chamber",
            "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [4.0],
            "bookmark": []
        },
        {
            "id": 675465,
            "title": "Fracture",
            "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
            "uri": "http://api.netflix.com/catalog/titles/movies/70111470",
            "rating": [5.0],
            "bookmark": [{ id: 432534, time: 65876586 }]
        }
    ],
        videoAndTitlePairs = [];

    // ------------ INSERT CODE HERE! -----------------------------------
    // Use forEach function to accumulate {id, title} pairs from each video.
    // Put the results into the videoAndTitlePairs array using the Array's
    // push() method. Example: videoAndTitlePairs.push(newItem);
    // ------------ INSERT CODE HERE! -----------------------------------
    newReleases.forEach(function (item) {
        videoAndTitlePairs.push({ "id": item.id, "title": item.title });
    });


    return videoAndTitlePairs;
}
console.log(mainOne());

Array.prototype.concatAll = function () {
    let results = [];
    this.forEach(function (subArray) {
        // ------------ INSERT CODE HERE! ----------------------------
        // Add all the items in each subArray to the results array.
        // ------------ INSERT CODE HERE! ----------------------------
        subArray.forEach(function (item) { results.push(item); });
    });

    return results;
};

function mainTwo() {
    let movieLists = [
        {
            name: "Instant Queue",
            videos: [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ];


    // Use one or more map, concatAll, and filter calls to create an array with the following items
    // [
    // {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
    // {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
    // {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
    // {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
    // ];

    return movieLists.map(
        function (genres) {
            return genres.videos.map(
                function (videos) {
                    return {
                        "id": videos.id,
                        "title": videos.title,
                        "boxart": videos.boxarts.filter(
                            function (boxArts) {
                                return boxArts.width == 150;
                            }).map(
                                function (art) {
                                    return art.url;
                                })
                    };
                }
            );
        }
    ).concatAll();  // Complete this expression!

}

console.log(mainTwo());

function mainThree() {
    let movieLists = [
        {
            name: "Instant Queue",
            videos: [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ];

    return movieLists.
        map(function (movieList) {
            return movieList.videos.
                map(function (video) {
                    return video.boxarts.
                        filter(function (boxart) {
                            return boxart.width === 150 && boxart.height === 200;
                        }).
                        map(function (boxart) {
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                }).
                concatAll();
        }).
        concatAll();


}

console.log("<----- mainThree() ------->");
console.log(mainThree());

Array.prototype.concatMap = function (projectionFunctionThatReturnsArray) {
    return this.
        map(function (item) {
            // ------------   INSERT CODE HERE!  ----------------------------
            // Apply the projection function to each item. The projection
            // function will return a new child array. This will create a
            // two-dimensional array.
            // ------------   INSERT CODE HERE!  ----------------------------
            return projectionFunctionThatReturnsArray(item);
        }).
        // apply the concatAll function to flatten the two-dimensional array
        concatAll();
};

function mainFour() {
    var movieLists = [
        {
            name: "Instant Queue",
            videos: [
                {
                    "id": 70111470,
                    "title": "Die Hard",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 654356453,
                    "title": "Bad Boys",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        },
        {
            name: "New Releases",
            videos: [
                {
                    "id": 65432445,
                    "title": "The Chamber",
                    "boxarts": [
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 4.0,
                    "bookmark": []
                },
                {
                    "id": 675465,
                    "title": "Fracture",
                    "boxarts": [
                        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
                        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
                        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
                    ],
                    "url": "http://api.netflix.com/catalog/titles/movies/70111470",
                    "rating": 5.0,
                    "bookmark": [{ id: 432534, time: 65876586 }]
                }
            ]
        }
    ];


    // Use one or more concatMap, map, and filter calls to create an array with the following items
    // [
    // 	 {"id": 675465, "title": "Fracture", "boxart": "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
    // 	 {"id": 65432445, "title": "The Chamber", "boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
    // 	 {"id": 654356453, "title": "Bad Boys", "boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
    // 	 {"id": 70111470, "title": "Die Hard", "boxart": "http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
    // ];

    return movieLists.
        concatMap(function (movieList) {
            return movieList.videos.
                concatMap(function (video) {
                    return video.boxarts.
                        filter(function (boxart) {
                            return boxart.width === 150;
                        }).
                        map(function (boxart) {
                            return { id: video.id, title: video.title, boxart: boxart.url };
                        });
                });
        }); // Complete this expression!

}

console.log("<----main four --->");
console.log(mainFour());

// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }); === [6];
// [1,2,3].reduce(function(accumulatedValue, currentValue) { return accumulatedValue + currentValue; }, 10); === [16];

Array.prototype.reduce = function (combiner, initialValue) {
    let counter,
        accumulatedValue;

    // If the array is empty, do nothing
    if (this.length === 0) {
        return this;
    }
    else {
        // If the user didn't pass an initial value, use the first item.
        if (arguments.length === 1) {
            counter = 1;
            accumulatedValue = this[0];
        }
        else if (arguments.length >= 2) {
            counter = 0;
            accumulatedValue = initialValue;
        }
        else {
            throw "Invalid arguments.";
        }

        // Loop through the array, feeding the current value and the result of
        // the previous computation back into the combiner function until
        // we've exhausted the entire array and are left with only one value.
        while (counter < this.length) {
            accumulatedValue = combiner(accumulatedValue, this[counter]);
            counter++;
        }

        return [accumulatedValue];
    }
};

function mainFive() {
    const boxarts = [
        { width: 200, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
        { width: 150, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
        { width: 300, height: 200, url: "http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" },
        { width: 425, height: 150, url: "http://cdn-0.nflximg.com/images/2891/Fracture425.jpg" }
    ];

    // You should return an array containing only the URL of the largest box art. Remember that reduce always
    // returns an array with one item.
    return boxarts.
        reduce(function (acc, curr) {
            const x = curr.height * curr.width;
            if (x > acc) {
                return x;
            } else {
                return curr;
            }
        }).map(function (item) { return item.url; });   // Complete this expression
}

console.log("main 5 >>>>>>>>");
console.log(mainFive());

// Doug Crawford suggests... class free object oriented programming. 
// Looks something like this...
/*
class free: 

got a function which will take some value to initialize it. Recommend it be an object - a JSON text to create new instances. 
You can call another constructor to inherit it's stuff. In any case, you're going to create a new object and put it into an object called that. 
You'll create all your member variables and everything that's going to become properties of the object
Those methods will be functions which will close over the initialization variables and for all those method variables. 
If it doesn't use this or that, you can take any of the functions out of the object and it will do the exact same thing. 
Can pass any of those things without having to use a callback.
Any methods for public or privledge get aspects, multiple inheritance, and all these rich patterns.

This is dense.


*/

const jah = {
    user: "tim",
    title: "friday night monitors",
    condition: true,
    level: [1, 2, 3]
}

function listener(init){
    var that = 
}

function getter(init){
    var that = listener(init),
        member, 
        method = function() {

        }
}


// one more example. Functional programming is coming to every other language.
/*
Functional Programming is good for a lot of the things we do. 
We showed the rest of the languages how to do this.
Paradigm shifts are hard.
It's hard for paradigm shifts from a bad idea.
Is your reason its a bad idea you get emotional. Then you might be wrong.

Sources of Misunderstanding:
The name
Mispositioning
Design Errors
Bad Implementations
The Browser
Bad Books
Substandard Standard

JavaScript is available in a lot of different venues.

Extreme range of ridiculous and sublime.
Very sophisticated programmers and everything in between.
It can do it well. Some people who don't know how to program are using it.
Lots of complaints: not a language that I know. Languages to choose from...

Pony up and learn how to JavaScript
AJAX libraries to make the program experience in the browser.
Not fast enough... We'll see.
JavaScript has good parts! That's the incredible part. Intentional stuff was good.

Load and go delivery.
Loose typing.
Objects as general containers.
Prototypal inheritance
Lambda - functions as first class objects
Linkage through global variables - no linked in the browser, they all get loaded into a common global space. They're the central idea for linkage. Cross site scripting attacks enabled by this and not so good

Numbers
- 64 bit floating point, Does not map well to common understanding of arithmetic: 0.1 + 0.2 !== 0.3  is the most common error filed with mozilla. 
- go to whole numbers and then divide back down. 
NaN
- NaN == NaN is false => This is toxic
- NaN != Nan is true 

parseInt function
parseInt(value, 10) converts the value int a number. It stops at the first non-digit character. 

string.length
similar strings are equal
chatAt, concat, indexOf

Two Booleans: true, false;
Boolean(value) returns true or false. 

undefined - a value that isn't even that. 
Falsy: false, null, undefined, "", 0, NaN


*/