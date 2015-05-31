/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if(n){
      return array.slice(0,n);
    } else {
      return array[0];
    }
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n && n <= array.length - 1){
      return array.slice(array.length - n , array.length)
    } else if(n && n > array.length - 1){
      return array;
    } else {
      return array[array.length - 1];
    }
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    for (var key in collection) {
      iterator(collection[key], key, collection);
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    for(var i = 0; i < array.length; i++){
      if(array[i] === target){
        return i;
      } 
    }
    return -1;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var newArr = [];
    for(var i = 0; i < collection.length; i++){
      if(iterator(collection[i]) === true){
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var newArr = [];
    for(var i = 0; i < collection.length; i++){
      if(iterator(collection[i]) !== true){
        newArr.push(collection[i]);
      }
    }
    return newArr;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var newArr = [];
    for (var i = 0; i < array.length; i++){
      if( newArr.indexOf(array[i]) === -1){
        newArr.push(array[i]);
      }
    }
    return newArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    var newArr = [];
    for (var i = 0; i < array.length; i++){
      newArr.push(iterator(array[i]));
    }
    return newArr;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {

    var newArr = [];

    for(var i = 0; i < array.length; i++) {
      newArr.push(array[i][propertyName]);
    }
    return newArr;

  };


  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    if(typeof methodName === 'string'){
      for(var i = 0; i < list.length; i++){
        list[i][methodName]();
      }
      return list;
    } else if(typeof methodName === 'function') {
      for(var i = 0; i < list.length; i++){
        methodName.call(list[i]);
      }
    return list;
    } 
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  _.reduce = function(collection, iterator, initialValue) {
    if(initialValue === undefined){
      initialValue = 0;
    }
    for(var i = 0; i < collection.length; i++){
      initialValue = iterator(initialValue, collection[i]);
    }
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    for (var key in collection) {
      if (collection[key] === target) {
        return true;
      }
    }
    return false;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    for (var i = 0; i < collection.length; i++) {
      if(iterator) {
        if(!iterator(collection[i])){
          return false;
        }
      } else {
        if(!collection[i]){
          return false;
        }
      }
    }
    return true
   };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    for(var i = 0; i < collection.length; i++) {
      if(iterator) {
        if(iterator(collection[i])) {
          return true;
        }
      } else {
        if(collection[i]) {
          return true;
        }
      }
    }
    return false;
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    var passedInObjects = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < passedInObjects.length; i++){
      for (var key in passedInObjects[i]) {
        obj[key] = passedInObjects[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var passedInObjects = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < passedInObjects.length; i++){
      for (var key in passedInObjects[i]) {
        var hasProperty = false
        if(obj.hasOwnProperty(key)){
          hasProperty = true;
        }
        if(hasProperty === false){
          obj[key] = passedInObjects[i][key];
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var result = func();
    return function() {
      return result;
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    return function(param){
      return func(param);
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var myArguments = Array.prototype.slice.call(arguments, 2);
    setTimeout(function(){
      func.apply(null, myArguments);
    }, wait);
  };

  /*
  _.delay = function(func, wait) {
    var myArguments = Array.prototype.slice.call(arguments, 2);
    console.log(myArguments);
    setTimeout(function(){
      func.apply(null, myArguments);
    }, wait);
  };
  */



  // Shuffle an array.
  _.shuffle = function(array) {
    var newArray = [];
    for (var i = 0; i < array.length; i++) {
      var rand = Math.floor(Math.random() * array.length);
      newArray.push(array[rand]);
      array.splice(rand, 1);
    }
    return newArray;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.


  //

  _.sortBy = function(collection, iterator) {
    var sortedArray = [];
    for (var key in collection) {
      var obj = collection[key];
      ///*
      if(typeof iterator === 'string') {
        var objProperty = obj.iterator;
        if(sortedArray.length === 0 || !objProperty) {
          sortedArray.push(obj);
        }else{

          for(var i = 0; i < sortedArray.length; i++){
            var current = sortedArray[i];
            var currentProperty = current.iterator;
            var next = sortedArray[i + 1];
        
            if(!currentProperty || currentProperty > objProperty){
              sortedArray.splice(i, 0, obj);
              break;
            } else if(!next){
              sortedArray.push(obj);
              break;
            } else {
              var nextProperty = next.iterator;
              if(nextProperty > objProperty){
              sortedArray.splice(i+1, 0, obj);
              break;
              }
            }
          }
        }

      }else{
        //*/
        var objProperty = iterator(obj);

        if(sortedArray.length === 0 || !objProperty) {
          sortedArray.push(obj);
        }else{

          for(var i = 0; i < sortedArray.length; i++){
            var current = sortedArray[i];
            var currentProperty = iterator(current);
            var next = sortedArray[i + 1];
        
            if(!currentProperty || currentProperty > objProperty){
              sortedArray.splice(i, 0, obj);
              break;
            } else if(!next){
              sortedArray.push(obj);
              break;
            } else {
              var nextProperty = iterator(next);
              if(nextProperty > objProperty){
              sortedArray.splice(i+1, 0, obj);
              break;
              }
            }
          }
        }
      }     
    }
    return sortedArray;
  };
  
  

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var newArray = [];
    var myArguments = Array.prototype.slice.call(arguments, 0);

    var arrLength = 0;
    for (var i = 0; i < myArguments.length; i++) {
      if (myArguments[i].length > arrLength){
        arrLength = myArguments[i].length;
      }
    }

    for ( var i = 0; i < arrLength; i++){
      newArray[i] = []
      for( var j = 0; j < myArguments.length; j++){
        newArray[i].push(myArguments[j][i]);
      }
    }
      return newArray;
    };


  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  
_.flatten = function(nestedArray) {
    var newArray = []
    for(var i = 0; i < nestedArray.length; i++){
      if(!nestedArray[i].length){
        newArray.push(String(nestedArray[i]));
      } else {
        for(var j = 0; j < nestedArray[i].length; j++){
          newArray.push(String(nestedArray[i][j]));
        }
      }
    }
    return newArray;
  };
  
  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  
  _.intersection = function() {
    var newArray = [];
    var myArguments = Array.prototype.slice.call(arguments, 0);
    var result = true;
    for(var i = 0; i < myArguments[0].length; i++){
      for(var j = 1; j < myArguments.length; j++) {
        if(myArguments[j].indexOf(myArguments[0][i]) === -1) {
          result = false;
        }
      }
      if(result === true){
        newArray.push(myArguments[0][i]);
      }
    }
    return newArray;
  };


  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var newArray = [];
    var myArguments = Array.prototype.slice.call(arguments, 1);
    for(var i = 0; i < array.length; i++){
      var result = false;
      for(var j = 0; j < myArguments.length; j++) {
        if(myArguments[j].indexOf(array[i]) !== -1) {
          result = true;
        }
      }
      if(result === false){
        newArray.push(array[i]);
      }
    }
    return newArray;
    
  };

}).call(this);

