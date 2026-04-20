(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["flvjs"] = factory();
	else
		root["flvjs"] = factory();
})(self, function() {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */
(function (global, factory) {
     true ? module.exports = factory() :
        0;
}(this, (function () {
    'use strict';
    function objectOrFunction(x) {
        var type = typeof x;
        return x !== null && (type === 'object' || type === 'function');
    }
    function isFunction(x) {
        return typeof x === 'function';
    }
    var _isArray = void 0;
    if (Array.isArray) {
        _isArray = Array.isArray;
    }
    else {
        _isArray = function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        };
    }
    var isArray = _isArray;
    var len = 0;
    var vertxNext = void 0;
    var customSchedulerFn = void 0;
    var asap = function asap(callback, arg) {
        queue[len] = callback;
        queue[len + 1] = arg;
        len += 2;
        if (len === 2) {
            // If len is 2, that means that we need to schedule an async flush.
            // If additional callbacks are queued before the queue is flushed, they
            // will be processed by this flush that we are scheduling.
            if (customSchedulerFn) {
                customSchedulerFn(flush);
            }
            else {
                scheduleFlush();
            }
        }
    };
    function setScheduler(scheduleFn) {
        customSchedulerFn = scheduleFn;
    }
    function setAsap(asapFn) {
        asap = asapFn;
    }
    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
    // test for web worker but not in IE10
    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
    // node
    function useNextTick() {
        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
        // see https://github.com/cujojs/when/issues/410 for details
        return function () {
            return process.nextTick(flush);
        };
    }
    // vertx
    function useVertxTimer() {
        if (typeof vertxNext !== 'undefined') {
            return function () {
                vertxNext(flush);
            };
        }
        return useSetTimeout();
    }
    function useMutationObserver() {
        var iterations = 0;
        var observer = new BrowserMutationObserver(flush);
        var node = document.createTextNode('');
        observer.observe(node, { characterData: true });
        return function () {
            node.data = iterations = ++iterations % 2;
        };
    }
    // web worker
    function useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = flush;
        return function () {
            return channel.port2.postMessage(0);
        };
    }
    function useSetTimeout() {
        // Store setTimeout reference so es6-promise will be unaffected by
        // other code modifying setTimeout (like sinon.useFakeTimers())
        var globalSetTimeout = setTimeout;
        return function () {
            return globalSetTimeout(flush, 1);
        };
    }
    var queue = new Array(1000);
    function flush() {
        for (var i = 0; i < len; i += 2) {
            var callback = queue[i];
            var arg = queue[i + 1];
            callback(arg);
            queue[i] = undefined;
            queue[i + 1] = undefined;
        }
        len = 0;
    }
    function attemptVertx() {
        try {
            var vertx = Function('return this')().require('vertx');
            vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return useVertxTimer();
        }
        catch (e) {
            return useSetTimeout();
        }
    }
    var scheduleFlush = void 0;
    // Decide what async method to use to triggering processing of queued callbacks:
    if (isNode) {
        scheduleFlush = useNextTick();
    }
    else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    }
    else if (isWorker) {
        scheduleFlush = useMessageChannel();
    }
    else if (browserWindow === undefined && "function" === 'function') {
        scheduleFlush = attemptVertx();
    }
    else {
        scheduleFlush = useSetTimeout();
    }
    function then(onFulfillment, onRejection) {
        var parent = this;
        var child = new this.constructor(noop);
        if (child[PROMISE_ID] === undefined) {
            makePromise(child);
        }
        var _state = parent._state;
        if (_state) {
            var callback = arguments[_state - 1];
            asap(function () {
                return invokeCallback(_state, child, callback, parent._result);
            });
        }
        else {
            subscribe(parent, child, onFulfillment, onRejection);
        }
        return child;
    }
    /**
      `Promise.resolve` returns a promise that will become resolved with the
      passed `value`. It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        resolve(1);
      });
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.resolve(1);
    
      promise.then(function(value){
        // value === 1
      });
      ```
    
      @method resolve
      @static
      @param {Any} value value that the returned promise will be resolved with
      Useful for tooling.
      @return {Promise} a promise that will become fulfilled with the given
      `value`
    */
    function resolve$1(object) {
        /*jshint validthis:true */
        var Constructor = this;
        if (object && typeof object === 'object' && object.constructor === Constructor) {
            return object;
        }
        var promise = new Constructor(noop);
        resolve(promise, object);
        return promise;
    }
    var PROMISE_ID = Math.random().toString(36).substring(2);
    function noop() { }
    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    function selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
    }
    function cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
    }
    function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
        try {
            then$$1.call(value, fulfillmentHandler, rejectionHandler);
        }
        catch (e) {
            return e;
        }
    }
    function handleForeignThenable(promise, thenable, then$$1) {
        asap(function (promise) {
            var sealed = false;
            var error = tryThen(then$$1, thenable, function (value) {
                if (sealed) {
                    return;
                }
                sealed = true;
                if (thenable !== value) {
                    resolve(promise, value);
                }
                else {
                    fulfill(promise, value);
                }
            }, function (reason) {
                if (sealed) {
                    return;
                }
                sealed = true;
                reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));
            if (!sealed && error) {
                sealed = true;
                reject(promise, error);
            }
        }, promise);
    }
    function handleOwnThenable(promise, thenable) {
        if (thenable._state === FULFILLED) {
            fulfill(promise, thenable._result);
        }
        else if (thenable._state === REJECTED) {
            reject(promise, thenable._result);
        }
        else {
            subscribe(thenable, undefined, function (value) {
                return resolve(promise, value);
            }, function (reason) {
                return reject(promise, reason);
            });
        }
    }
    function handleMaybeThenable(promise, maybeThenable, then$$1) {
        if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
            handleOwnThenable(promise, maybeThenable);
        }
        else {
            if (then$$1 === undefined) {
                fulfill(promise, maybeThenable);
            }
            else if (isFunction(then$$1)) {
                handleForeignThenable(promise, maybeThenable, then$$1);
            }
            else {
                fulfill(promise, maybeThenable);
            }
        }
    }
    function resolve(promise, value) {
        if (promise === value) {
            reject(promise, selfFulfillment());
        }
        else if (objectOrFunction(value)) {
            var then$$1 = void 0;
            try {
                then$$1 = value.then;
            }
            catch (error) {
                reject(promise, error);
                return;
            }
            handleMaybeThenable(promise, value, then$$1);
        }
        else {
            fulfill(promise, value);
        }
    }
    function publishRejection(promise) {
        if (promise._onerror) {
            promise._onerror(promise._result);
        }
        publish(promise);
    }
    function fulfill(promise, value) {
        if (promise._state !== PENDING) {
            return;
        }
        promise._result = value;
        promise._state = FULFILLED;
        if (promise._subscribers.length !== 0) {
            asap(publish, promise);
        }
    }
    function reject(promise, reason) {
        if (promise._state !== PENDING) {
            return;
        }
        promise._state = REJECTED;
        promise._result = reason;
        asap(publishRejection, promise);
    }
    function subscribe(parent, child, onFulfillment, onRejection) {
        var _subscribers = parent._subscribers;
        var length = _subscribers.length;
        parent._onerror = null;
        _subscribers[length] = child;
        _subscribers[length + FULFILLED] = onFulfillment;
        _subscribers[length + REJECTED] = onRejection;
        if (length === 0 && parent._state) {
            asap(publish, parent);
        }
    }
    function publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;
        if (subscribers.length === 0) {
            return;
        }
        var child = void 0, callback = void 0, detail = promise._result;
        for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];
            if (child) {
                invokeCallback(settled, child, callback, detail);
            }
            else {
                callback(detail);
            }
        }
        promise._subscribers.length = 0;
    }
    function invokeCallback(settled, promise, callback, detail) {
        var hasCallback = isFunction(callback), value = void 0, error = void 0, succeeded = true;
        if (hasCallback) {
            try {
                value = callback(detail);
            }
            catch (e) {
                succeeded = false;
                error = e;
            }
            if (promise === value) {
                reject(promise, cannotReturnOwn());
                return;
            }
        }
        else {
            value = detail;
        }
        if (promise._state !== PENDING) {
            // noop
        }
        else if (hasCallback && succeeded) {
            resolve(promise, value);
        }
        else if (succeeded === false) {
            reject(promise, error);
        }
        else if (settled === FULFILLED) {
            fulfill(promise, value);
        }
        else if (settled === REJECTED) {
            reject(promise, value);
        }
    }
    function initializePromise(promise, resolver) {
        try {
            resolver(function resolvePromise(value) {
                resolve(promise, value);
            }, function rejectPromise(reason) {
                reject(promise, reason);
            });
        }
        catch (e) {
            reject(promise, e);
        }
    }
    var id = 0;
    function nextId() {
        return id++;
    }
    function makePromise(promise) {
        promise[PROMISE_ID] = id++;
        promise._state = undefined;
        promise._result = undefined;
        promise._subscribers = [];
    }
    function validationError() {
        return new Error('Array Methods must be provided an Array');
    }
    var Enumerator = function () {
        function Enumerator(Constructor, input) {
            this._instanceConstructor = Constructor;
            this.promise = new Constructor(noop);
            if (!this.promise[PROMISE_ID]) {
                makePromise(this.promise);
            }
            if (isArray(input)) {
                this.length = input.length;
                this._remaining = input.length;
                this._result = new Array(this.length);
                if (this.length === 0) {
                    fulfill(this.promise, this._result);
                }
                else {
                    this.length = this.length || 0;
                    this._enumerate(input);
                    if (this._remaining === 0) {
                        fulfill(this.promise, this._result);
                    }
                }
            }
            else {
                reject(this.promise, validationError());
            }
        }
        Enumerator.prototype._enumerate = function _enumerate(input) {
            for (var i = 0; this._state === PENDING && i < input.length; i++) {
                this._eachEntry(input[i], i);
            }
        };
        Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
            var c = this._instanceConstructor;
            var resolve$$1 = c.resolve;
            if (resolve$$1 === resolve$1) {
                var _then = void 0;
                var error = void 0;
                var didError = false;
                try {
                    _then = entry.then;
                }
                catch (e) {
                    didError = true;
                    error = e;
                }
                if (_then === then && entry._state !== PENDING) {
                    this._settledAt(entry._state, i, entry._result);
                }
                else if (typeof _then !== 'function') {
                    this._remaining--;
                    this._result[i] = entry;
                }
                else if (c === Promise$1) {
                    var promise = new c(noop);
                    if (didError) {
                        reject(promise, error);
                    }
                    else {
                        handleMaybeThenable(promise, entry, _then);
                    }
                    this._willSettleAt(promise, i);
                }
                else {
                    this._willSettleAt(new c(function (resolve$$1) {
                        return resolve$$1(entry);
                    }), i);
                }
            }
            else {
                this._willSettleAt(resolve$$1(entry), i);
            }
        };
        Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
            var promise = this.promise;
            if (promise._state === PENDING) {
                this._remaining--;
                if (state === REJECTED) {
                    reject(promise, value);
                }
                else {
                    this._result[i] = value;
                }
            }
            if (this._remaining === 0) {
                fulfill(promise, this._result);
            }
        };
        Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
            var enumerator = this;
            subscribe(promise, undefined, function (value) {
                return enumerator._settledAt(FULFILLED, i, value);
            }, function (reason) {
                return enumerator._settledAt(REJECTED, i, reason);
            });
        };
        return Enumerator;
    }();
    /**
      `Promise.all` accepts an array of promises, and returns a new promise which
      is fulfilled with an array of fulfillment values for the passed promises, or
      rejected with the reason of the first passed promise to be rejected. It casts all
      elements of the passed iterable to promises as it runs this algorithm.
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = resolve(2);
      let promise3 = resolve(3);
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // The array here would be [ 1, 2, 3 ];
      });
      ```
    
      If any of the `promises` given to `all` are rejected, the first promise
      that is rejected will be given as an argument to the returned promises's
      rejection handler. For example:
    
      Example:
    
      ```javascript
      let promise1 = resolve(1);
      let promise2 = reject(new Error("2"));
      let promise3 = reject(new Error("3"));
      let promises = [ promise1, promise2, promise3 ];
    
      Promise.all(promises).then(function(array){
        // Code here never runs because there are rejected promises!
      }, function(error) {
        // error.message === "2"
      });
      ```
    
      @method all
      @static
      @param {Array} entries array of promises
      @param {String} label optional string for labeling the promise.
      Useful for tooling.
      @return {Promise} promise that is fulfilled when all `promises` have been
      fulfilled, or rejected if any of them become rejected.
      @static
    */
    function all(entries) {
        return new Enumerator(this, entries).promise;
    }
    /**
      `Promise.race` returns a new promise which is settled in the same way as the
      first passed promise to settle.
    
      Example:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 2');
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // result === 'promise 2' because it was resolved before promise1
        // was resolved.
      });
      ```
    
      `Promise.race` is deterministic in that only the state of the first
      settled promise matters. For example, even if other promises given to the
      `promises` array argument are resolved, but the first settled promise has
      become rejected before the other promises became fulfilled, the returned
      promise will become rejected:
    
      ```javascript
      let promise1 = new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve('promise 1');
        }, 200);
      });
    
      let promise2 = new Promise(function(resolve, reject){
        setTimeout(function(){
          reject(new Error('promise 2'));
        }, 100);
      });
    
      Promise.race([promise1, promise2]).then(function(result){
        // Code here never runs
      }, function(reason){
        // reason.message === 'promise 2' because promise 2 became rejected before
        // promise 1 became fulfilled
      });
      ```
    
      An example real-world use case is implementing timeouts:
    
      ```javascript
      Promise.race([ajax('foo.json'), timeout(5000)])
      ```
    
      @method race
      @static
      @param {Array} promises array of promises to observe
      Useful for tooling.
      @return {Promise} a promise which settles in the same way as the first passed
      promise to settle.
    */
    function race(entries) {
        /*jshint validthis:true */
        var Constructor = this;
        if (!isArray(entries)) {
            return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
            });
        }
        else {
            return new Constructor(function (resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                    Constructor.resolve(entries[i]).then(resolve, reject);
                }
            });
        }
    }
    /**
      `Promise.reject` returns a promise rejected with the passed `reason`.
      It is shorthand for the following:
    
      ```javascript
      let promise = new Promise(function(resolve, reject){
        reject(new Error('WHOOPS'));
      });
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      Instead of writing the above, your code now simply becomes the following:
    
      ```javascript
      let promise = Promise.reject(new Error('WHOOPS'));
    
      promise.then(function(value){
        // Code here doesn't run because the promise is rejected!
      }, function(reason){
        // reason.message === 'WHOOPS'
      });
      ```
    
      @method reject
      @static
      @param {Any} reason value that the returned promise will be rejected with.
      Useful for tooling.
      @return {Promise} a promise rejected with the given `reason`.
    */
    function reject$1(reason) {
        /*jshint validthis:true */
        var Constructor = this;
        var promise = new Constructor(noop);
        reject(promise, reason);
        return promise;
    }
    function needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }
    function needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }
    /**
      Promise objects represent the eventual result of an asynchronous operation. The
      primary way of interacting with a promise is through its `then` method, which
      registers callbacks to receive either a promise's eventual value or the reason
      why the promise cannot be fulfilled.
    
      Terminology
      -----------
    
      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
      - `thenable` is an object or function that defines a `then` method.
      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
      - `exception` is a value that is thrown using the throw statement.
      - `reason` is a value that indicates why a promise was rejected.
      - `settled` the final resting state of a promise, fulfilled or rejected.
    
      A promise can be in one of three states: pending, fulfilled, or rejected.
    
      Promises that are fulfilled have a fulfillment value and are in the fulfilled
      state.  Promises that are rejected have a rejection reason and are in the
      rejected state.  A fulfillment value is never a thenable.
    
      Promises can also be said to *resolve* a value.  If this value is also a
      promise, then the original promise's settled state will match the value's
      settled state.  So a promise that *resolves* a promise that rejects will
      itself reject, and a promise that *resolves* a promise that fulfills will
      itself fulfill.
    
    
      Basic Usage:
      ------------
    
      ```js
      let promise = new Promise(function(resolve, reject) {
        // on success
        resolve(value);
    
        // on failure
        reject(reason);
      });
    
      promise.then(function(value) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Advanced Usage:
      ---------------
    
      Promises shine when abstracting away asynchronous interactions such as
      `XMLHttpRequest`s.
    
      ```js
      function getJSON(url) {
        return new Promise(function(resolve, reject){
          let xhr = new XMLHttpRequest();
    
          xhr.open('GET', url);
          xhr.onreadystatechange = handler;
          xhr.responseType = 'json';
          xhr.setRequestHeader('Accept', 'application/json');
          xhr.send();
    
          function handler() {
            if (this.readyState === this.DONE) {
              if (this.status === 200) {
                resolve(this.response);
              } else {
                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
              }
            }
          };
        });
      }
    
      getJSON('/posts.json').then(function(json) {
        // on fulfillment
      }, function(reason) {
        // on rejection
      });
      ```
    
      Unlike callbacks, promises are great composable primitives.
    
      ```js
      Promise.all([
        getJSON('/posts'),
        getJSON('/comments')
      ]).then(function(values){
        values[0] // => postsJSON
        values[1] // => commentsJSON
    
        return values;
      });
      ```
    
      @class Promise
      @param {Function} resolver
      Useful for tooling.
      @constructor
    */
    var Promise$1 = function () {
        function Promise(resolver) {
            this[PROMISE_ID] = nextId();
            this._result = this._state = undefined;
            this._subscribers = [];
            if (noop !== resolver) {
                typeof resolver !== 'function' && needsResolver();
                this instanceof Promise ? initializePromise(this, resolver) : needsNew();
            }
        }
        /**
        The primary way of interacting with a promise is through its `then` method,
        which registers callbacks to receive either a promise's eventual value or the
        reason why the promise cannot be fulfilled.
         ```js
        findUser().then(function(user){
          // user is available
        }, function(reason){
          // user is unavailable, and you are given the reason why
        });
        ```
         Chaining
        --------
         The return value of `then` is itself a promise.  This second, 'downstream'
        promise is resolved with the return value of the first promise's fulfillment
        or rejection handler, or rejected if the handler throws an exception.
         ```js
        findUser().then(function (user) {
          return user.name;
        }, function (reason) {
          return 'default name';
        }).then(function (userName) {
          // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
          // will be `'default name'`
        });
         findUser().then(function (user) {
          throw new Error('Found user, but still unhappy');
        }, function (reason) {
          throw new Error('`findUser` rejected and we're unhappy');
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
          // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
        });
        ```
        If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
         ```js
        findUser().then(function (user) {
          throw new PedagogicalException('Upstream error');
        }).then(function (value) {
          // never reached
        }).then(function (value) {
          // never reached
        }, function (reason) {
          // The `PedgagocialException` is propagated all the way down to here
        });
        ```
         Assimilation
        ------------
         Sometimes the value you want to propagate to a downstream promise can only be
        retrieved asynchronously. This can be achieved by returning a promise in the
        fulfillment or rejection handler. The downstream promise will then be pending
        until the returned promise is settled. This is called *assimilation*.
         ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // The user's comments are now available
        });
        ```
         If the assimliated promise rejects, then the downstream promise will also reject.
         ```js
        findUser().then(function (user) {
          return findCommentsByAuthor(user);
        }).then(function (comments) {
          // If `findCommentsByAuthor` fulfills, we'll have the value here
        }, function (reason) {
          // If `findCommentsByAuthor` rejects, we'll have the reason here
        });
        ```
         Simple Example
        --------------
         Synchronous Example
         ```javascript
        let result;
         try {
          result = findResult();
          // success
        } catch(reason) {
          // failure
        }
        ```
         Errback Example
         ```js
        findResult(function(result, err){
          if (err) {
            // failure
          } else {
            // success
          }
        });
        ```
         Promise Example;
         ```javascript
        findResult().then(function(result){
          // success
        }, function(reason){
          // failure
        });
        ```
         Advanced Example
        --------------
         Synchronous Example
         ```javascript
        let author, books;
         try {
          author = findAuthor();
          books  = findBooksByAuthor(author);
          // success
        } catch(reason) {
          // failure
        }
        ```
         Errback Example
         ```js
         function foundBooks(books) {
         }
         function failure(reason) {
         }
         findAuthor(function(author, err){
          if (err) {
            failure(err);
            // failure
          } else {
            try {
              findBoooksByAuthor(author, function(books, err) {
                if (err) {
                  failure(err);
                } else {
                  try {
                    foundBooks(books);
                  } catch(reason) {
                    failure(reason);
                  }
                }
              });
            } catch(error) {
              failure(err);
            }
            // success
          }
        });
        ```
         Promise Example;
         ```javascript
        findAuthor().
          then(findBooksByAuthor).
          then(function(books){
            // found books
        }).catch(function(reason){
          // something went wrong
        });
        ```
         @method then
        @param {Function} onFulfilled
        @param {Function} onRejected
        Useful for tooling.
        @return {Promise}
        */
        /**
        `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
        as the catch block of a try/catch statement.
        ```js
        function findAuthor(){
        throw new Error('couldn't find that author');
        }
        // synchronous
        try {
        findAuthor();
        } catch(reason) {
        // something went wrong
        }
        // async with promises
        findAuthor().catch(function(reason){
        // something went wrong
        });
        ```
        @method catch
        @param {Function} onRejection
        Useful for tooling.
        @return {Promise}
        */
        Promise.prototype.catch = function _catch(onRejection) {
            return this.then(null, onRejection);
        };
        /**
          `finally` will be invoked regardless of the promise's fate just as native
          try/catch/finally behaves
        
          Synchronous example:
        
          ```js
          findAuthor() {
            if (Math.random() > 0.5) {
              throw new Error();
            }
            return new Author();
          }
        
          try {
            return findAuthor(); // succeed or fail
          } catch(error) {
            return findOtherAuther();
          } finally {
            // always runs
            // doesn't affect the return value
          }
          ```
        
          Asynchronous example:
        
          ```js
          findAuthor().catch(function(reason){
            return findOtherAuther();
          }).finally(function(){
            // author was either found, or not
          });
          ```
        
          @method finally
          @param {Function} callback
          @return {Promise}
        */
        Promise.prototype.finally = function _finally(callback) {
            var promise = this;
            var constructor = promise.constructor;
            if (isFunction(callback)) {
                return promise.then(function (value) {
                    return constructor.resolve(callback()).then(function () {
                        return value;
                    });
                }, function (reason) {
                    return constructor.resolve(callback()).then(function () {
                        throw reason;
                    });
                });
            }
            return promise.then(callback, callback);
        };
        return Promise;
    }();
    Promise$1.prototype.then = then;
    Promise$1.all = all;
    Promise$1.race = race;
    Promise$1.resolve = resolve$1;
    Promise$1.reject = reject$1;
    Promise$1._setScheduler = setScheduler;
    Promise$1._setAsap = setAsap;
    Promise$1._asap = asap;
    /*global self*/
    function polyfill() {
        var local = void 0;
        if (typeof __webpack_require__.g !== 'undefined') {
            local = __webpack_require__.g;
        }
        else if (typeof self !== 'undefined') {
            local = self;
        }
        else {
            try {
                local = Function('return this')();
            }
            catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }
        var P = local.Promise;
        if (P) {
            var promiseToString = null;
            try {
                promiseToString = Object.prototype.toString.call(P.resolve());
            }
            catch (e) {
                // silently ignored
            }
            if (promiseToString === '[object Promise]' && !P.cast) {
                return;
            }
        }
        local.Promise = Promise$1;
    }
    // Strange compat..
    Promise$1.polyfill = polyfill;
    Promise$1.Promise = Promise$1;
    return Promise$1;
})));


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ (function(module) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var R = typeof Reflect === 'object' ? Reflect : null;
var ReflectApply = R && typeof R.apply === 'function'
    ? R.apply
    : function ReflectApply(target, receiver, args) {
        return Function.prototype.apply.call(target, receiver, args);
    };
var ReflectOwnKeys;
if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
}
else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target)
            .concat(Object.getOwnPropertySymbols(target));
    };
}
else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
        return Object.getOwnPropertyNames(target);
    };
}
function ProcessEmitWarning(warning) {
    if (console && console.warn)
        console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
};
function EventEmitter() {
    EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;
function checkListener(listener) {
    if (typeof listener !== 'function') {
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }
}
Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function () {
        return defaultMaxListeners;
    },
    set: function (arg) {
        if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
        }
        defaultMaxListeners = arg;
    }
});
EventEmitter.init = function () {
    if (this._events === undefined ||
        this._events === Object.getPrototypeOf(this)._events) {
        this._events = Object.create(null);
        this._eventsCount = 0;
    }
    this._maxListeners = this._maxListeners || undefined;
};
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }
    this._maxListeners = n;
    return this;
};
function _getMaxListeners(that) {
    if (that._maxListeners === undefined)
        return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit(type) {
    var args = [];
    for (var i = 1; i < arguments.length; i++)
        args.push(arguments[i]);
    var doError = (type === 'error');
    var events = this._events;
    if (events !== undefined)
        doError = (doError && events.error === undefined);
    else if (!doError)
        return false;
    // If there is no 'error' event listener then throw.
    if (doError) {
        var er;
        if (args.length > 0)
            er = args[0];
        if (er instanceof Error) {
            // Note: The comments on the `throw` lines are intentional, they show
            // up in Node's output if this results in an unhandled exception.
            throw er; // Unhandled 'error' event
        }
        // At least give some kind of context to the user
        var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
        err.context = er;
        throw err; // Unhandled 'error' event
    }
    var handler = events[type];
    if (handler === undefined)
        return false;
    if (typeof handler === 'function') {
        ReflectApply(handler, this, args);
    }
    else {
        var len = handler.length;
        var listeners = arrayClone(handler, len);
        for (var i = 0; i < len; ++i)
            ReflectApply(listeners[i], this, args);
    }
    return true;
};
function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;
    checkListener(listener);
    events = target._events;
    if (events === undefined) {
        events = target._events = Object.create(null);
        target._eventsCount = 0;
    }
    else {
        // To avoid recursion in the case that type === "newListener"! Before
        // adding it to the listeners, first emit "newListener".
        if (events.newListener !== undefined) {
            target.emit('newListener', type, listener.listener ? listener.listener : listener);
            // Re-assign `events` because a newListener handler could have caused the
            // this._events to be assigned to a new object
            events = target._events;
        }
        existing = events[type];
    }
    if (existing === undefined) {
        // Optimize the case of one listener. Don't need the extra array object.
        existing = events[type] = listener;
        ++target._eventsCount;
    }
    else {
        if (typeof existing === 'function') {
            // Adding the second element, need to change to array.
            existing = events[type] =
                prepend ? [listener, existing] : [existing, listener];
            // If we've already got an array, just append.
        }
        else if (prepend) {
            existing.unshift(listener);
        }
        else {
            existing.push(listener);
        }
        // Check for listener leak
        m = _getMaxListeners(target);
        if (m > 0 && existing.length > m && !existing.warned) {
            existing.warned = true;
            // No error code for this since it is a Warning
            // eslint-disable-next-line no-restricted-syntax
            var w = new Error('Possible EventEmitter memory leak detected. ' +
                existing.length + ' ' + String(type) + ' listeners ' +
                'added. Use emitter.setMaxListeners() to ' +
                'increase limit');
            w.name = 'MaxListenersExceededWarning';
            w.emitter = target;
            w.type = type;
            w.count = existing.length;
            ProcessEmitWarning(w);
        }
    }
    return target;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
        return _addListener(this, type, listener, true);
    };
function onceWrapper() {
    if (!this.fired) {
        this.target.removeListener(this.type, this.wrapFn);
        this.fired = true;
        if (arguments.length === 0)
            return this.listener.call(this.target);
        return this.listener.apply(this.target, arguments);
    }
}
function _onceWrap(target, type, listener) {
    var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
    checkListener(listener);
    this.on(type, _onceWrap(this, type, listener));
    return this;
};
EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
        checkListener(listener);
        this.prependListener(type, _onceWrap(this, type, listener));
        return this;
    };
// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
        var list, events, position, i, originalListener;
        checkListener(listener);
        events = this._events;
        if (events === undefined)
            return this;
        list = events[type];
        if (list === undefined)
            return this;
        if (list === listener || list.listener === listener) {
            if (--this._eventsCount === 0)
                this._events = Object.create(null);
            else {
                delete events[type];
                if (events.removeListener)
                    this.emit('removeListener', type, list.listener || listener);
            }
        }
        else if (typeof list !== 'function') {
            position = -1;
            for (i = list.length - 1; i >= 0; i--) {
                if (list[i] === listener || list[i].listener === listener) {
                    originalListener = list[i].listener;
                    position = i;
                    break;
                }
            }
            if (position < 0)
                return this;
            if (position === 0)
                list.shift();
            else {
                spliceOne(list, position);
            }
            if (list.length === 1)
                events[type] = list[0];
            if (events.removeListener !== undefined)
                this.emit('removeListener', type, originalListener || listener);
        }
        return this;
    };
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
        var listeners, events, i;
        events = this._events;
        if (events === undefined)
            return this;
        // not listening for removeListener, no need to emit
        if (events.removeListener === undefined) {
            if (arguments.length === 0) {
                this._events = Object.create(null);
                this._eventsCount = 0;
            }
            else if (events[type] !== undefined) {
                if (--this._eventsCount === 0)
                    this._events = Object.create(null);
                else
                    delete events[type];
            }
            return this;
        }
        // emit removeListener for all listeners on all events
        if (arguments.length === 0) {
            var keys = Object.keys(events);
            var key;
            for (i = 0; i < keys.length; ++i) {
                key = keys[i];
                if (key === 'removeListener')
                    continue;
                this.removeAllListeners(key);
            }
            this.removeAllListeners('removeListener');
            this._events = Object.create(null);
            this._eventsCount = 0;
            return this;
        }
        listeners = events[type];
        if (typeof listeners === 'function') {
            this.removeListener(type, listeners);
        }
        else if (listeners !== undefined) {
            // LIFO order
            for (i = listeners.length - 1; i >= 0; i--) {
                this.removeListener(type, listeners[i]);
            }
        }
        return this;
    };
function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined)
        return [];
    var evlistener = events[type];
    if (evlistener === undefined)
        return [];
    if (typeof evlistener === 'function')
        return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ?
        unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
};
EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
        return emitter.listenerCount(type);
    }
    else {
        return listenerCount.call(emitter, type);
    }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
    var events = this._events;
    if (events !== undefined) {
        var evlistener = events[type];
        if (typeof evlistener === 'function') {
            return 1;
        }
        else if (evlistener !== undefined) {
            return evlistener.length;
        }
    }
    return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
    var copy = new Array(n);
    for (var i = 0; i < n; ++i)
        copy[i] = arr[i];
    return copy;
}
function spliceOne(list, index) {
    for (; index + 1 < list.length; index++)
        list[index] = list[index + 1];
    list.pop();
}
function unwrapListeners(arr) {
    var ret = new Array(arr.length);
    for (var i = 0; i < ret.length; ++i) {
        ret[i] = arr[i].listener || arr[i];
    }
    return ret;
}
function once(emitter, name) {
    return new Promise(function (resolve, reject) {
        function errorListener(err) {
            emitter.removeListener(name, resolver);
            reject(err);
        }
        function resolver() {
            if (typeof emitter.removeListener === 'function') {
                emitter.removeListener('error', errorListener);
            }
            resolve([].slice.call(arguments));
        }
        ;
        eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
        if (name !== 'error') {
            addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
        }
    });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
    if (typeof emitter.on === 'function') {
        eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
    }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
    if (typeof emitter.on === 'function') {
        if (flags.once) {
            emitter.once(name, listener);
        }
        else {
            emitter.on(name, listener);
        }
    }
    else if (typeof emitter.addEventListener === 'function') {
        // EventTarget does not have `error` event semantics like Node
        // EventEmitters, we do not listen for `error` events here.
        emitter.addEventListener(name, function wrapListener(arg) {
            // IE does not have builtin `{ once: true }` support so we
            // have to do it manually.
            if (flags.once) {
                emitter.removeEventListener(name, wrapListener);
            }
            listener(arg);
        });
    }
    else {
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
    }
}


/***/ }),

/***/ "./node_modules/webworkify-webpack/index.js":
/*!**************************************************!*\
  !*** ./node_modules/webworkify-webpack/index.js ***!
  \**************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

function webpackBootstrapFunc(modules) {
    /******/ // The module cache
    /******/ var installedModules = {};
    /******/ // The require function
    /******/ function __nested_webpack_require_164__(moduleId) {
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId])
            /******/ return installedModules[moduleId].exports;
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/ 
        };
        /******/ // Execute the module function
        /******/ modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_164__);
        /******/ // Flag the module as loaded
        /******/ module.l = true;
        /******/ // Return the exports of the module
        /******/ return module.exports;
        /******/ 
    }
    /******/ // expose the modules object (__webpack_modules__)
    /******/ __nested_webpack_require_164__.m = modules;
    /******/ // expose the module cache
    /******/ __nested_webpack_require_164__.c = installedModules;
    /******/ // identity function for calling harmony imports with the correct context
    /******/ __nested_webpack_require_164__.i = function (value) { return value; };
    /******/ // define getter function for harmony exports
    /******/ __nested_webpack_require_164__.d = function (exports, name, getter) {
        /******/ if (!__nested_webpack_require_164__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
                /******/ 
            });
            /******/ }
        /******/ 
    };
    /******/ // define __esModule on exports
    /******/ __nested_webpack_require_164__.r = function (exports) {
        /******/ Object.defineProperty(exports, '__esModule', { value: true });
        /******/ 
    };
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __nested_webpack_require_164__.n = function (module) {
        /******/ var getter = module && module.__esModule ?
            /******/ function getDefault() { return module['default']; } :
            /******/ function getModuleExports() { return module; };
        /******/ __nested_webpack_require_164__.d(getter, 'a', getter);
        /******/ return getter;
        /******/ 
    };
    /******/ // Object.prototype.hasOwnProperty.call
    /******/ __nested_webpack_require_164__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/ // __webpack_public_path__
    /******/ __nested_webpack_require_164__.p = "/";
    /******/ // on error function for async loading
    /******/ __nested_webpack_require_164__.oe = function (err) { console.error(err); throw err; };
    var f = __nested_webpack_require_164__(__nested_webpack_require_164__.s = ENTRY_MODULE);
    return f.default || f; // try to call default if defined to also support babel esmodule exports
}
var moduleNameReqExp = '[\\.|\\-|\\+|\\w|\/|@]+';
var dependencyRegExp = '\\(\\s*(\/\\*.*?\\*\/)?\\s*.*?(' + moduleNameReqExp + ').*?\\)'; // additional chars when output.pathinfo is true
// http://stackoverflow.com/a/2593661/130442
function quoteRegExp(str) {
    return (str + '').replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&');
}
function isNumeric(n) {
    return !isNaN(1 * n); // 1 * n converts integers, integers as string ("123"), 1e3 and "1e3" to integers and strings to NaN
}
function getModuleDependencies(sources, module, queueName) {
    var retval = {};
    retval[queueName] = [];
    var fnString = module.toString();
    var wrapperSignature = fnString.match(/^function\s?\w*\(\w+,\s*\w+,\s*(\w+)\)/);
    if (!wrapperSignature)
        return retval;
    var webpackRequireName = wrapperSignature[1];
    // main bundle deps
    var re = new RegExp('(\\\\n|\\W)' + quoteRegExp(webpackRequireName) + dependencyRegExp, 'g');
    var match;
    while ((match = re.exec(fnString))) {
        if (match[3] === 'dll-reference')
            continue;
        retval[queueName].push(match[3]);
    }
    // dll deps
    re = new RegExp('\\(' + quoteRegExp(webpackRequireName) + '\\("(dll-reference\\s(' + moduleNameReqExp + '))"\\)\\)' + dependencyRegExp, 'g');
    while ((match = re.exec(fnString))) {
        if (!sources[match[2]]) {
            retval[queueName].push(match[1]);
            sources[match[2]] = __webpack_require__(match[1]).m;
        }
        retval[match[2]] = retval[match[2]] || [];
        retval[match[2]].push(match[4]);
    }
    // convert 1e3 back to 1000 - this can be important after uglify-js converted 1000 to 1e3
    var keys = Object.keys(retval);
    for (var i = 0; i < keys.length; i++) {
        for (var j = 0; j < retval[keys[i]].length; j++) {
            if (isNumeric(retval[keys[i]][j])) {
                retval[keys[i]][j] = 1 * retval[keys[i]][j];
            }
        }
    }
    return retval;
}
function hasValuesInQueues(queues) {
    var keys = Object.keys(queues);
    return keys.reduce(function (hasValues, key) {
        return hasValues || queues[key].length > 0;
    }, false);
}
function getRequiredModules(sources, moduleId) {
    var modulesQueue = {
        main: [moduleId]
    };
    var requiredModules = {
        main: []
    };
    var seenModules = {
        main: {}
    };
    while (hasValuesInQueues(modulesQueue)) {
        var queues = Object.keys(modulesQueue);
        for (var i = 0; i < queues.length; i++) {
            var queueName = queues[i];
            var queue = modulesQueue[queueName];
            var moduleToCheck = queue.pop();
            seenModules[queueName] = seenModules[queueName] || {};
            if (seenModules[queueName][moduleToCheck] || !sources[queueName][moduleToCheck])
                continue;
            seenModules[queueName][moduleToCheck] = true;
            requiredModules[queueName] = requiredModules[queueName] || [];
            requiredModules[queueName].push(moduleToCheck);
            var newModules = getModuleDependencies(sources, sources[queueName][moduleToCheck], queueName);
            var newModulesKeys = Object.keys(newModules);
            for (var j = 0; j < newModulesKeys.length; j++) {
                modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]] || [];
                modulesQueue[newModulesKeys[j]] = modulesQueue[newModulesKeys[j]].concat(newModules[newModulesKeys[j]]);
            }
        }
    }
    return requiredModules;
}
module.exports = function (moduleId, options) {
    options = options || {};
    var sources = {
        main: __webpack_require__.m
    };
    var requiredModules = options.all ? { main: Object.keys(sources.main) } : getRequiredModules(sources, moduleId);
    var src = '';
    Object.keys(requiredModules).filter(function (m) { return m !== 'main'; }).forEach(function (module) {
        var entryModule = 0;
        while (requiredModules[module][entryModule]) {
            entryModule++;
        }
        requiredModules[module].push(entryModule);
        sources[module][entryModule] = '(function(module, exports, __webpack_require__) { module.exports = __webpack_require__; })';
        src = src + 'var ' + module + ' = (' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(entryModule)) + ')({' + requiredModules[module].map(function (id) { return '' + JSON.stringify(id) + ': ' + sources[module][id].toString(); }).join(',') + '});\n';
    });
    src = src + 'new ((' + webpackBootstrapFunc.toString().replace('ENTRY_MODULE', JSON.stringify(moduleId)) + ')({' + requiredModules.main.map(function (id) { return '' + JSON.stringify(id) + ': ' + sources.main[id].toString(); }).join(',') + '}))(self);';
    var blob = new window.Blob([src], { type: 'text/javascript' });
    if (options.bare) {
        return blob;
    }
    var URL = window.URL || window.webkitURL || window.mozURL || window.msURL;
    var workerUrl = URL.createObjectURL(blob);
    var worker = new window.Worker(workerUrl);
    worker.objectURL = workerUrl;
    return worker;
};


/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultConfig": function() { return /* binding */ defaultConfig; },
/* harmony export */   "createDefaultConfig": function() { return /* binding */ createDefaultConfig; }
/* harmony export */ });
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var defaultConfig = {
    enableWorker: false,
    enableStashBuffer: true,
    stashInitialSize: undefined,
    isLive: false,
    lazyLoad: true,
    lazyLoadMaxDuration: 3 * 60,
    lazyLoadRecoverDuration: 30,
    deferLoadAfterSourceOpen: true,
    // autoCleanupSourceBuffer: default as false, leave unspecified
    autoCleanupMaxBackwardDuration: 3 * 60,
    autoCleanupMinBackwardDuration: 2 * 60,
    statisticsInfoReportInterval: 600,
    fixAudioTimestampGap: true,
    accurateSeek: false,
    seekType: 'range',
    seekParamStart: 'bstart',
    seekParamEnd: 'bend',
    rangeLoadZeroStart: false,
    customSeekHandler: undefined,
    reuseRedirectedURL: false,
    // referrerPolicy: leave as unspecified
    headers: undefined,
    customLoader: undefined
};
function createDefaultConfig() {
    return Object.assign({}, defaultConfig);
}


/***/ }),

/***/ "./src/core/features.js":
/*!******************************!*\
  !*** ./src/core/features.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _io_io_controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../io/io-controller.js */ "./src/io/io-controller.js");
/* harmony import */ var _config_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config.js */ "./src/config.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var Features = /** @class */ (function () {
    function Features() {
    }
    Features.supportMSEH264Playback = function () {
        return window.MediaSource &&
            window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    };
    Features.supportNetworkStreamIO = function () {
        var ioctl = new _io_io_controller_js__WEBPACK_IMPORTED_MODULE_0__.default({}, (0,_config_js__WEBPACK_IMPORTED_MODULE_1__.createDefaultConfig)());
        var loaderType = ioctl.loaderType;
        ioctl.destroy();
        return loaderType == 'fetch-stream-loader' || loaderType == 'xhr-moz-chunked-loader';
    };
    Features.getNetworkLoaderTypeName = function () {
        var ioctl = new _io_io_controller_js__WEBPACK_IMPORTED_MODULE_0__.default({}, (0,_config_js__WEBPACK_IMPORTED_MODULE_1__.createDefaultConfig)());
        var loaderType = ioctl.loaderType;
        ioctl.destroy();
        return loaderType;
    };
    Features.supportNativeMediaPlayback = function (mimeType) {
        if (Features.videoElement == undefined) {
            Features.videoElement = window.document.createElement('video');
        }
        var canPlay = Features.videoElement.canPlayType(mimeType);
        return canPlay === 'probably' || canPlay == 'maybe';
    };
    Features.getFeatureList = function () {
        var features = {
            mseFlvPlayback: false,
            mseLiveFlvPlayback: false,
            networkStreamIO: false,
            networkLoaderName: '',
            nativeMP4H264Playback: false,
            nativeWebmVP8Playback: false,
            nativeWebmVP9Playback: false
        };
        features.mseFlvPlayback = Features.supportMSEH264Playback();
        features.networkStreamIO = Features.supportNetworkStreamIO();
        features.networkLoaderName = Features.getNetworkLoaderTypeName();
        features.mseLiveFlvPlayback = features.mseFlvPlayback && features.networkStreamIO;
        features.nativeMP4H264Playback = Features.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"');
        features.nativeWebmVP8Playback = Features.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"');
        features.nativeWebmVP9Playback = Features.supportNativeMediaPlayback('video/webm; codecs="vp9"');
        return features;
    };
    return Features;
}());
/* harmony default export */ __webpack_exports__["default"] = (Features);


/***/ }),

/***/ "./src/core/media-info.js":
/*!********************************!*\
  !*** ./src/core/media-info.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MediaInfo = /** @class */ (function () {
    function MediaInfo() {
        this.mimeType = null;
        this.duration = null;
        this.hasAudio = null;
        this.hasVideo = null;
        this.audioCodec = null;
        this.videoCodec = null;
        this.audioDataRate = null;
        this.videoDataRate = null;
        this.audioSampleRate = null;
        this.audioChannelCount = null;
        this.width = null;
        this.height = null;
        this.fps = null;
        this.profile = null;
        this.level = null;
        this.refFrames = null;
        this.chromaFormat = null;
        this.sarNum = null;
        this.sarDen = null;
        this.metadata = null;
        this.segments = null; // MediaInfo[]
        this.segmentCount = null;
        this.hasKeyframesIndex = null;
        this.keyframesIndex = null;
    }
    MediaInfo.prototype.isComplete = function () {
        var audioInfoComplete = (this.hasAudio === false) ||
            (this.hasAudio === true &&
                this.audioCodec != null &&
                this.audioSampleRate != null &&
                this.audioChannelCount != null);
        var videoInfoComplete = (this.hasVideo === false) ||
            (this.hasVideo === true &&
                this.videoCodec != null &&
                this.width != null &&
                this.height != null &&
                this.fps != null &&
                this.profile != null &&
                this.level != null &&
                this.refFrames != null &&
                this.chromaFormat != null &&
                this.sarNum != null &&
                this.sarDen != null);
        // keyframesIndex may not be present
        return this.mimeType != null &&
            this.duration != null &&
            this.metadata != null &&
            this.hasKeyframesIndex != null &&
            audioInfoComplete &&
            videoInfoComplete;
    };
    MediaInfo.prototype.isSeekable = function () {
        return this.hasKeyframesIndex === true;
    };
    MediaInfo.prototype.getNearestKeyframe = function (milliseconds) {
        if (this.keyframesIndex == null) {
            return null;
        }
        var table = this.keyframesIndex;
        var keyframeIdx = this._search(table.times, milliseconds);
        return {
            index: keyframeIdx,
            milliseconds: table.times[keyframeIdx],
            fileposition: table.filepositions[keyframeIdx]
        };
    };
    MediaInfo.prototype._search = function (list, value) {
        var idx = 0;
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        if (value < list[0]) {
            idx = 0;
            lbound = ubound + 1; // skip search
        }
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (value >= list[mid] && value < list[mid + 1])) {
                idx = mid;
                break;
            }
            else if (list[mid] < value) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
        return idx;
    };
    return MediaInfo;
}());
/* harmony default export */ __webpack_exports__["default"] = (MediaInfo);


/***/ }),

/***/ "./src/core/media-segment-info.js":
/*!****************************************!*\
  !*** ./src/core/media-segment-info.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SampleInfo": function() { return /* binding */ SampleInfo; },
/* harmony export */   "MediaSegmentInfo": function() { return /* binding */ MediaSegmentInfo; },
/* harmony export */   "IDRSampleList": function() { return /* binding */ IDRSampleList; },
/* harmony export */   "MediaSegmentInfoList": function() { return /* binding */ MediaSegmentInfoList; }
/* harmony export */ });
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// Represents an media sample (audio / video)
var SampleInfo = /** @class */ (function () {
    function SampleInfo(dts, pts, duration, originalDts, isSync) {
        this.dts = dts;
        this.pts = pts;
        this.duration = duration;
        this.originalDts = originalDts;
        this.isSyncPoint = isSync;
        this.fileposition = null;
    }
    return SampleInfo;
}());

// Media Segment concept is defined in Media Source Extensions spec.
// Particularly in ISO BMFF format, an Media Segment contains a moof box followed by a mdat box.
var MediaSegmentInfo = /** @class */ (function () {
    function MediaSegmentInfo() {
        this.beginDts = 0;
        this.endDts = 0;
        this.beginPts = 0;
        this.endPts = 0;
        this.originalBeginDts = 0;
        this.originalEndDts = 0;
        this.syncPoints = []; // SampleInfo[n], for video IDR frames only
        this.firstSample = null; // SampleInfo
        this.lastSample = null; // SampleInfo
    }
    MediaSegmentInfo.prototype.appendSyncPoint = function (sampleInfo) {
        sampleInfo.isSyncPoint = true;
        this.syncPoints.push(sampleInfo);
    };
    return MediaSegmentInfo;
}());

// Ordered list for recording video IDR frames, sorted by originalDts
var IDRSampleList = /** @class */ (function () {
    function IDRSampleList() {
        this._list = [];
    }
    IDRSampleList.prototype.clear = function () {
        this._list = [];
    };
    IDRSampleList.prototype.appendArray = function (syncPoints) {
        var list = this._list;
        if (syncPoints.length === 0) {
            return;
        }
        if (list.length > 0 && syncPoints[0].originalDts < list[list.length - 1].originalDts) {
            this.clear();
        }
        Array.prototype.push.apply(list, syncPoints);
    };
    IDRSampleList.prototype.getLastSyncPointBeforeDts = function (dts) {
        if (this._list.length == 0) {
            return null;
        }
        var list = this._list;
        var idx = 0;
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        if (dts < list[0].dts) {
            idx = 0;
            lbound = ubound + 1;
        }
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (dts >= list[mid].dts && dts < list[mid + 1].dts)) {
                idx = mid;
                break;
            }
            else if (list[mid].dts < dts) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
        return this._list[idx];
    };
    return IDRSampleList;
}());

// Data structure for recording information of media segments in single track.
var MediaSegmentInfoList = /** @class */ (function () {
    function MediaSegmentInfoList(type) {
        this._type = type;
        this._list = [];
        this._lastAppendLocation = -1; // cached last insert location
    }
    Object.defineProperty(MediaSegmentInfoList.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaSegmentInfoList.prototype, "length", {
        get: function () {
            return this._list.length;
        },
        enumerable: false,
        configurable: true
    });
    MediaSegmentInfoList.prototype.isEmpty = function () {
        return this._list.length === 0;
    };
    MediaSegmentInfoList.prototype.clear = function () {
        this._list = [];
        this._lastAppendLocation = -1;
    };
    MediaSegmentInfoList.prototype._searchNearestSegmentBefore = function (originalBeginDts) {
        var list = this._list;
        if (list.length === 0) {
            return -2;
        }
        var last = list.length - 1;
        var mid = 0;
        var lbound = 0;
        var ubound = last;
        var idx = 0;
        if (originalBeginDts < list[0].originalBeginDts) {
            idx = -1;
            return idx;
        }
        while (lbound <= ubound) {
            mid = lbound + Math.floor((ubound - lbound) / 2);
            if (mid === last || (originalBeginDts > list[mid].lastSample.originalDts &&
                (originalBeginDts < list[mid + 1].originalBeginDts))) {
                idx = mid;
                break;
            }
            else if (list[mid].originalBeginDts < originalBeginDts) {
                lbound = mid + 1;
            }
            else {
                ubound = mid - 1;
            }
        }
        return idx;
    };
    MediaSegmentInfoList.prototype._searchNearestSegmentAfter = function (originalBeginDts) {
        return this._searchNearestSegmentBefore(originalBeginDts) + 1;
    };
    MediaSegmentInfoList.prototype.append = function (mediaSegmentInfo) {
        var list = this._list;
        var msi = mediaSegmentInfo;
        var lastAppendIdx = this._lastAppendLocation;
        var insertIdx = 0;
        if (lastAppendIdx !== -1 && lastAppendIdx < list.length &&
            msi.originalBeginDts >= list[lastAppendIdx].lastSample.originalDts &&
            ((lastAppendIdx === list.length - 1) ||
                (lastAppendIdx < list.length - 1 &&
                    msi.originalBeginDts < list[lastAppendIdx + 1].originalBeginDts))) {
            insertIdx = lastAppendIdx + 1; // use cached location idx
        }
        else {
            if (list.length > 0) {
                insertIdx = this._searchNearestSegmentBefore(msi.originalBeginDts) + 1;
            }
        }
        this._lastAppendLocation = insertIdx;
        this._list.splice(insertIdx, 0, msi);
    };
    MediaSegmentInfoList.prototype.getLastSegmentBefore = function (originalBeginDts) {
        var idx = this._searchNearestSegmentBefore(originalBeginDts);
        if (idx >= 0) {
            return this._list[idx];
        }
        else { // -1
            return null;
        }
    };
    MediaSegmentInfoList.prototype.getLastSampleBefore = function (originalBeginDts) {
        var segment = this.getLastSegmentBefore(originalBeginDts);
        if (segment != null) {
            return segment.lastSample;
        }
        else {
            return null;
        }
    };
    MediaSegmentInfoList.prototype.getLastSyncPointBefore = function (originalBeginDts) {
        var segmentIdx = this._searchNearestSegmentBefore(originalBeginDts);
        var syncPoints = this._list[segmentIdx].syncPoints;
        while (syncPoints.length === 0 && segmentIdx > 0) {
            segmentIdx--;
            syncPoints = this._list[segmentIdx].syncPoints;
        }
        if (syncPoints.length > 0) {
            return syncPoints[syncPoints.length - 1];
        }
        else {
            return null;
        }
    };
    return MediaSegmentInfoList;
}());



/***/ }),

/***/ "./src/core/mse-controller.js":
/*!************************************!*\
  !*** ./src/core/mse-controller.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/browser.js */ "./src/utils/browser.js");
/* harmony import */ var _mse_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mse-events.js */ "./src/core/mse-events.js");
/* harmony import */ var _media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./media-segment-info.js */ "./src/core/media-segment-info.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






// Media Source Extensions controller
var MSEController = /** @class */ (function () {
    function MSEController(config) {
        this.TAG = 'MSEController';
        this._config = config;
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        if (this._config.isLive && this._config.autoCleanupSourceBuffer == undefined) {
            // For live stream, do auto cleanup by default
            this._config.autoCleanupSourceBuffer = true;
        }
        this.e = {
            onSourceOpen: this._onSourceOpen.bind(this),
            onSourceEnded: this._onSourceEnded.bind(this),
            onSourceClose: this._onSourceClose.bind(this),
            onSourceBufferError: this._onSourceBufferError.bind(this),
            onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
        };
        this._mediaSource = null;
        this._mediaSourceObjectURL = null;
        this._mediaElement = null;
        this._isBufferFull = false;
        this._hasPendingEos = false;
        this._requireSetMediaDuration = false;
        this._pendingMediaDuration = 0;
        this._pendingSourceBufferInit = [];
        this._mimeTypes = {
            video: null,
            audio: null
        };
        this._sourceBuffers = {
            video: null,
            audio: null
        };
        this._lastInitSegments = {
            video: null,
            audio: null
        };
        this._pendingSegments = {
            video: [],
            audio: []
        };
        this._pendingRemoveRanges = {
            video: [],
            audio: []
        };
        this._idrList = new _media_segment_info_js__WEBPACK_IMPORTED_MODULE_4__.IDRSampleList();
    }
    MSEController.prototype.destroy = function () {
        if (this._mediaElement || this._mediaSource) {
            this.detachMediaElement();
        }
        this.e = null;
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    MSEController.prototype.on = function (event, listener) {
        this._emitter.addListener(event, listener);
    };
    MSEController.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    MSEController.prototype.attachMediaElement = function (mediaElement) {
        if (this._mediaSource) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__.IllegalStateException('MediaSource has been attached to an HTMLMediaElement!');
        }
        var ms = this._mediaSource = new window.MediaSource();
        ms.addEventListener('sourceopen', this.e.onSourceOpen);
        ms.addEventListener('sourceended', this.e.onSourceEnded);
        ms.addEventListener('sourceclose', this.e.onSourceClose);
        this._mediaElement = mediaElement;
        this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource);
        mediaElement.src = this._mediaSourceObjectURL;
    };
    MSEController.prototype.detachMediaElement = function () {
        if (this._mediaSource) {
            var ms = this._mediaSource;
            for (var type in this._sourceBuffers) {
                // pending segments should be discard
                var ps = this._pendingSegments[type];
                ps.splice(0, ps.length);
                this._pendingSegments[type] = null;
                this._pendingRemoveRanges[type] = null;
                this._lastInitSegments[type] = null;
                // remove all sourcebuffers
                var sb = this._sourceBuffers[type];
                if (sb) {
                    if (ms.readyState !== 'closed') {
                        // ms edge can throw an error: Unexpected call to method or property access
                        try {
                            ms.removeSourceBuffer(sb);
                        }
                        catch (error) {
                            _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                        }
                        sb.removeEventListener('error', this.e.onSourceBufferError);
                        sb.removeEventListener('updateend', this.e.onSourceBufferUpdateEnd);
                    }
                    this._mimeTypes[type] = null;
                    this._sourceBuffers[type] = null;
                }
            }
            if (ms.readyState === 'open') {
                try {
                    ms.endOfStream();
                }
                catch (error) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                }
            }
            ms.removeEventListener('sourceopen', this.e.onSourceOpen);
            ms.removeEventListener('sourceended', this.e.onSourceEnded);
            ms.removeEventListener('sourceclose', this.e.onSourceClose);
            this._pendingSourceBufferInit = [];
            this._isBufferFull = false;
            this._idrList.clear();
            this._mediaSource = null;
        }
        if (this._mediaElement) {
            this._mediaElement.src = '';
            this._mediaElement.removeAttribute('src');
            this._mediaElement = null;
        }
        if (this._mediaSourceObjectURL) {
            window.URL.revokeObjectURL(this._mediaSourceObjectURL);
            this._mediaSourceObjectURL = null;
        }
    };
    MSEController.prototype.appendInitSegment = function (initSegment, deferred) {
        if (!this._mediaSource || this._mediaSource.readyState !== 'open') {
            // sourcebuffer creation requires mediaSource.readyState === 'open'
            // so we defer the sourcebuffer creation, until sourceopen event triggered
            this._pendingSourceBufferInit.push(initSegment);
            // make sure that this InitSegment is in the front of pending segments queue
            this._pendingSegments[initSegment.type].push(initSegment);
            return;
        }
        var is = initSegment;
        var mimeType = "" + is.container;
        if (is.codec && is.codec.length > 0) {
            mimeType += ";codecs=" + is.codec;
        }
        var firstInitSegment = false;
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'Received Initialization Segment, mimeType: ' + mimeType);
        this._lastInitSegments[is.type] = is;
        if (mimeType !== this._mimeTypes[is.type]) {
            if (!this._mimeTypes[is.type]) { // empty, first chance create sourcebuffer
                firstInitSegment = true;
                try {
                    var sb = this._sourceBuffers[is.type] = this._mediaSource.addSourceBuffer(mimeType);
                    sb.addEventListener('error', this.e.onSourceBufferError);
                    sb.addEventListener('updateend', this.e.onSourceBufferUpdateEnd);
                }
                catch (error) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                    this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.ERROR, { code: error.code, msg: error.message });
                    return;
                }
            }
            else {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, "Notice: " + is.type + " mimeType changed, origin: " + this._mimeTypes[is.type] + ", target: " + mimeType);
            }
            this._mimeTypes[is.type] = mimeType;
        }
        if (!deferred) {
            // deferred means this InitSegment has been pushed to pendingSegments queue
            this._pendingSegments[is.type].push(is);
        }
        if (!firstInitSegment) { // append immediately only if init segment in subsequence
            if (this._sourceBuffers[is.type] && !this._sourceBuffers[is.type].updating) {
                this._doAppendSegments();
            }
        }
        if (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari && is.container === 'audio/mpeg' && is.mediaDuration > 0) {
            // 'audio/mpeg' track under Safari may cause MediaElement's duration to be NaN
            // Manually correct MediaSource.duration to make progress bar seekable, and report right duration
            this._requireSetMediaDuration = true;
            this._pendingMediaDuration = is.mediaDuration / 1000; // in seconds
            this._updateMediaSourceDuration();
        }
    };
    MSEController.prototype.appendMediaSegment = function (mediaSegment) {
        var ms = mediaSegment;
        this._pendingSegments[ms.type].push(ms);
        if (this._config.autoCleanupSourceBuffer && this._needCleanupSourceBuffer()) {
            this._doCleanupSourceBuffer();
        }
        var sb = this._sourceBuffers[ms.type];
        if (sb && !sb.updating && !this._hasPendingRemoveRanges()) {
            this._doAppendSegments();
        }
    };
    MSEController.prototype.seek = function (seconds) {
        // remove all appended buffers
        for (var type in this._sourceBuffers) {
            if (!this._sourceBuffers[type]) {
                continue;
            }
            // abort current buffer append algorithm
            var sb = this._sourceBuffers[type];
            if (this._mediaSource.readyState === 'open') {
                try {
                    // If range removal algorithm is running, InvalidStateError will be throwed
                    // Ignore it.
                    sb.abort();
                }
                catch (error) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                }
            }
            // IDRList should be clear
            this._idrList.clear();
            // pending segments should be discard
            var ps = this._pendingSegments[type];
            ps.splice(0, ps.length);
            if (this._mediaSource.readyState === 'closed') {
                // Parent MediaSource object has been detached from HTMLMediaElement
                continue;
            }
            // record ranges to be remove from SourceBuffer
            for (var i = 0; i < sb.buffered.length; i++) {
                var start = sb.buffered.start(i);
                var end = sb.buffered.end(i);
                this._pendingRemoveRanges[type].push({ start: start, end: end });
            }
            // if sb is not updating, let's remove ranges now!
            if (!sb.updating) {
                this._doRemoveRanges();
            }
            // Safari 10 may get InvalidStateError in the later appendBuffer() after SourceBuffer.remove() call
            // Internal parser's state may be invalid at this time. Re-append last InitSegment to workaround.
            // Related issue: https://bugs.webkit.org/show_bug.cgi?id=159230
            if (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari) {
                var lastInitSegment = this._lastInitSegments[type];
                if (lastInitSegment) {
                    this._pendingSegments[type].push(lastInitSegment);
                    if (!sb.updating) {
                        this._doAppendSegments();
                    }
                }
            }
        }
    };
    MSEController.prototype.endOfStream = function () {
        var ms = this._mediaSource;
        var sb = this._sourceBuffers;
        if (!ms || ms.readyState !== 'open') {
            if (ms && ms.readyState === 'closed' && this._hasPendingSegments()) {
                // If MediaSource hasn't turned into open state, and there're pending segments
                // Mark pending endOfStream, defer call until all pending segments appended complete
                this._hasPendingEos = true;
            }
            return;
        }
        if (sb.video && sb.video.updating || sb.audio && sb.audio.updating) {
            // If any sourcebuffer is updating, defer endOfStream operation
            // See _onSourceBufferUpdateEnd()
            this._hasPendingEos = true;
        }
        else {
            this._hasPendingEos = false;
            // Notify media data loading complete
            // This is helpful for correcting total duration to match last media segment
            // Otherwise MediaElement's ended event may not be triggered
            ms.endOfStream();
        }
    };
    MSEController.prototype.getNearestKeyframe = function (dts) {
        return this._idrList.getLastSyncPointBeforeDts(dts);
    };
    MSEController.prototype._needCleanupSourceBuffer = function () {
        if (!this._config.autoCleanupSourceBuffer) {
            return false;
        }
        var currentTime = this._mediaElement.currentTime;
        for (var type in this._sourceBuffers) {
            var sb = this._sourceBuffers[type];
            if (sb) {
                var buffered = sb.buffered;
                if (buffered.length >= 1) {
                    if (currentTime - buffered.start(0) >= this._config.autoCleanupMaxBackwardDuration) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    MSEController.prototype._doCleanupSourceBuffer = function () {
        var currentTime = this._mediaElement.currentTime;
        for (var type in this._sourceBuffers) {
            var sb = this._sourceBuffers[type];
            if (sb) {
                var buffered = sb.buffered;
                var doRemove = false;
                for (var i = 0; i < buffered.length; i++) {
                    var start = buffered.start(i);
                    var end = buffered.end(i);
                    if (start <= currentTime && currentTime < end + 3) { // padding 3 seconds
                        if (currentTime - start >= this._config.autoCleanupMaxBackwardDuration) {
                            doRemove = true;
                            var removeEnd = currentTime - this._config.autoCleanupMinBackwardDuration;
                            this._pendingRemoveRanges[type].push({ start: start, end: removeEnd });
                        }
                    }
                    else if (end < currentTime) {
                        doRemove = true;
                        this._pendingRemoveRanges[type].push({ start: start, end: end });
                    }
                }
                if (doRemove && !sb.updating) {
                    this._doRemoveRanges();
                }
            }
        }
    };
    MSEController.prototype._updateMediaSourceDuration = function () {
        var sb = this._sourceBuffers;
        if (this._mediaElement.readyState === 0 || this._mediaSource.readyState !== 'open') {
            return;
        }
        if ((sb.video && sb.video.updating) || (sb.audio && sb.audio.updating)) {
            return;
        }
        var current = this._mediaSource.duration;
        var target = this._pendingMediaDuration;
        if (target > 0 && (isNaN(current) || target > current)) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, "Update MediaSource duration from " + current + " to " + target);
            this._mediaSource.duration = target;
        }
        this._requireSetMediaDuration = false;
        this._pendingMediaDuration = 0;
    };
    MSEController.prototype._doRemoveRanges = function () {
        for (var type in this._pendingRemoveRanges) {
            if (!this._sourceBuffers[type] || this._sourceBuffers[type].updating) {
                continue;
            }
            var sb = this._sourceBuffers[type];
            var ranges = this._pendingRemoveRanges[type];
            while (ranges.length && !sb.updating) {
                var range = ranges.shift();
                sb.remove(range.start, range.end);
            }
        }
    };
    MSEController.prototype._doAppendSegments = function () {
        var pendingSegments = this._pendingSegments;
        for (var type in pendingSegments) {
            if (!this._sourceBuffers[type] || this._sourceBuffers[type].updating) {
                continue;
            }
            if (pendingSegments[type].length > 0) {
                var segment = pendingSegments[type].shift();
                if (segment.timestampOffset) {
                    // For MPEG audio stream in MSE, if unbuffered-seeking occurred
                    // We need explicitly set timestampOffset to the desired point in timeline for mpeg SourceBuffer.
                    var currentOffset = this._sourceBuffers[type].timestampOffset;
                    var targetOffset = segment.timestampOffset / 1000; // in seconds
                    var delta = Math.abs(currentOffset - targetOffset);
                    if (delta > 0.1) { // If time delta > 100ms
                        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, "Update MPEG audio timestampOffset from " + currentOffset + " to " + targetOffset);
                        this._sourceBuffers[type].timestampOffset = targetOffset;
                    }
                    delete segment.timestampOffset;
                }
                if (!segment.data || segment.data.byteLength === 0) {
                    // Ignore empty buffer
                    continue;
                }
                try {
                    this._sourceBuffers[type].appendBuffer(segment.data);
                    this._isBufferFull = false;
                    if (type === 'video' && segment.hasOwnProperty('info')) {
                        this._idrList.appendArray(segment.info.syncPoints);
                    }
                }
                catch (error) {
                    this._pendingSegments[type].unshift(segment);
                    if (error.code === 22) { // QuotaExceededError
                        /* Notice that FireFox may not throw QuotaExceededError if SourceBuffer is full
                         * Currently we can only do lazy-load to avoid SourceBuffer become scattered.
                         * SourceBuffer eviction policy may be changed in future version of FireFox.
                         *
                         * Related issues:
                         * https://bugzilla.mozilla.org/show_bug.cgi?id=1279885
                         * https://bugzilla.mozilla.org/show_bug.cgi?id=1280023
                         */
                        // report buffer full, abort network IO
                        if (!this._isBufferFull) {
                            this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.BUFFER_FULL);
                        }
                        this._isBufferFull = true;
                    }
                    else {
                        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, error.message);
                        this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.ERROR, { code: error.code, msg: error.message });
                    }
                }
            }
        }
    };
    MSEController.prototype._onSourceOpen = function () {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'MediaSource onSourceOpen');
        this._mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
        // deferred sourcebuffer creation / initialization
        if (this._pendingSourceBufferInit.length > 0) {
            var pendings = this._pendingSourceBufferInit;
            while (pendings.length) {
                var segment = pendings.shift();
                this.appendInitSegment(segment, true);
            }
        }
        // there may be some pending media segments, append them
        if (this._hasPendingSegments()) {
            this._doAppendSegments();
        }
        this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.SOURCE_OPEN);
    };
    MSEController.prototype._onSourceEnded = function () {
        // fired on endOfStream
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'MediaSource onSourceEnded');
    };
    MSEController.prototype._onSourceClose = function () {
        // fired on detaching from media element
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.v(this.TAG, 'MediaSource onSourceClose');
        if (this._mediaSource && this.e != null) {
            this._mediaSource.removeEventListener('sourceopen', this.e.onSourceOpen);
            this._mediaSource.removeEventListener('sourceended', this.e.onSourceEnded);
            this._mediaSource.removeEventListener('sourceclose', this.e.onSourceClose);
        }
    };
    MSEController.prototype._hasPendingSegments = function () {
        var ps = this._pendingSegments;
        return ps.video.length > 0 || ps.audio.length > 0;
    };
    MSEController.prototype._hasPendingRemoveRanges = function () {
        var prr = this._pendingRemoveRanges;
        return prr.video.length > 0 || prr.audio.length > 0;
    };
    MSEController.prototype._onSourceBufferUpdateEnd = function () {
        if (this._requireSetMediaDuration) {
            this._updateMediaSourceDuration();
        }
        else if (this._hasPendingRemoveRanges()) {
            this._doRemoveRanges();
        }
        else if (this._hasPendingSegments()) {
            this._doAppendSegments();
        }
        else if (this._hasPendingEos) {
            this.endOfStream();
        }
        this._emitter.emit(_mse_events_js__WEBPACK_IMPORTED_MODULE_3__.default.UPDATE_END);
    };
    MSEController.prototype._onSourceBufferError = function (e) {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, "SourceBuffer Error: " + e);
        // this error might not always be fatal, just ignore it
    };
    return MSEController;
}());
/* harmony default export */ __webpack_exports__["default"] = (MSEController);


/***/ }),

/***/ "./src/core/mse-events.js":
/*!********************************!*\
  !*** ./src/core/mse-events.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var MSEEvents = {
    ERROR: 'error',
    SOURCE_OPEN: 'source_open',
    UPDATE_END: 'update_end',
    BUFFER_FULL: 'buffer_full'
};
/* harmony default export */ __webpack_exports__["default"] = (MSEEvents);


/***/ }),

/***/ "./src/core/transmuxer.js":
/*!********************************!*\
  !*** ./src/core/transmuxer.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var webworkify_webpack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! webworkify-webpack */ "./node_modules/webworkify-webpack/index.js");
/* harmony import */ var webworkify_webpack__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(webworkify_webpack__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/logging-control.js */ "./src/utils/logging-control.js");
/* harmony import */ var _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transmuxing-controller.js */ "./src/core/transmuxing-controller.js");
/* harmony import */ var _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transmuxing-events.js */ "./src/core/transmuxing-events.js");
/* harmony import */ var _media_info_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./media-info.js */ "./src/core/media-info.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







var Transmuxer = /** @class */ (function () {
    function Transmuxer(mediaDataSource, config) {
        this.TAG = 'Transmuxer';
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        if (config.enableWorker && typeof (Worker) !== 'undefined') {
            try {
                this._worker = webworkify_webpack__WEBPACK_IMPORTED_MODULE_1___default()(/*require.resolve*/(/*! ./transmuxing-worker */ "./src/core/transmuxing-worker.js"));
                this._workerDestroying = false;
                this._worker.addEventListener('message', this._onWorkerMessage.bind(this));
                this._worker.postMessage({ cmd: 'init', param: [mediaDataSource, config] });
                this.e = {
                    onLoggingConfigChanged: this._onLoggingConfigChanged.bind(this)
                };
                _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__.default.registerListener(this.e.onLoggingConfigChanged);
                this._worker.postMessage({ cmd: 'logging_config', param: _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__.default.getConfig() });
            }
            catch (error) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.e(this.TAG, 'Error while initialize transmuxing worker, fallback to inline transmuxing');
                this._worker = null;
                this._controller = new _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_4__.default(mediaDataSource, config);
            }
        }
        else {
            this._controller = new _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_4__.default(mediaDataSource, config);
        }
        if (this._controller) {
            var ctl = this._controller;
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.IO_ERROR, this._onIOError.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.DEMUX_ERROR, this._onDemuxError.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.INIT_SEGMENT, this._onInitSegment.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_SEGMENT, this._onMediaSegment.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.LOADING_COMPLETE, this._onLoadingComplete.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_INFO, this._onMediaInfo.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.METADATA_ARRIVED, this._onMetaDataArrived.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.SCRIPTDATA_ARRIVED, this._onScriptDataArrived.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.STATISTICS_INFO, this._onStatisticsInfo.bind(this));
            ctl.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this));
        }
    }
    Transmuxer.prototype.destroy = function () {
        if (this._worker) {
            if (!this._workerDestroying) {
                this._workerDestroying = true;
                this._worker.postMessage({ cmd: 'destroy' });
                _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_3__.default.removeListener(this.e.onLoggingConfigChanged);
                this.e = null;
            }
        }
        else {
            this._controller.destroy();
            this._controller = null;
        }
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    Transmuxer.prototype.on = function (event, listener) {
        this._emitter.addListener(event, listener);
    };
    Transmuxer.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    Transmuxer.prototype.hasWorker = function () {
        return this._worker != null;
    };
    Transmuxer.prototype.open = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'start' });
        }
        else {
            this._controller.start();
        }
    };
    Transmuxer.prototype.close = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'stop' });
        }
        else {
            this._controller.stop();
        }
    };
    Transmuxer.prototype.seek = function (milliseconds) {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'seek', param: milliseconds });
        }
        else {
            this._controller.seek(milliseconds);
        }
    };
    Transmuxer.prototype.pause = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'pause' });
        }
        else {
            this._controller.pause();
        }
    };
    Transmuxer.prototype.resume = function () {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'resume' });
        }
        else {
            this._controller.resume();
        }
    };
    Transmuxer.prototype._onInitSegment = function (type, initSegment) {
        var _this = this;
        // do async invoke
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.INIT_SEGMENT, type, initSegment);
        });
    };
    Transmuxer.prototype._onMediaSegment = function (type, mediaSegment) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_SEGMENT, type, mediaSegment);
        });
    };
    Transmuxer.prototype._onLoadingComplete = function () {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.LOADING_COMPLETE);
        });
    };
    Transmuxer.prototype._onRecoveredEarlyEof = function () {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOVERED_EARLY_EOF);
        });
    };
    Transmuxer.prototype._onMediaInfo = function (mediaInfo) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_INFO, mediaInfo);
        });
    };
    Transmuxer.prototype._onMetaDataArrived = function (metadata) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.METADATA_ARRIVED, metadata);
        });
    };
    Transmuxer.prototype._onScriptDataArrived = function (data) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.SCRIPTDATA_ARRIVED, data);
        });
    };
    Transmuxer.prototype._onStatisticsInfo = function (statisticsInfo) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.STATISTICS_INFO, statisticsInfo);
        });
    };
    Transmuxer.prototype._onIOError = function (type, info) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.IO_ERROR, type, info);
        });
    };
    Transmuxer.prototype._onDemuxError = function (type, info) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.DEMUX_ERROR, type, info);
        });
    };
    Transmuxer.prototype._onRecommendSeekpoint = function (milliseconds) {
        var _this = this;
        Promise.resolve().then(function () {
            _this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMEND_SEEKPOINT, milliseconds);
        });
    };
    Transmuxer.prototype._onLoggingConfigChanged = function (config) {
        if (this._worker) {
            this._worker.postMessage({ cmd: 'logging_config', param: config });
        }
    };
    Transmuxer.prototype._onWorkerMessage = function (e) {
        var message = e.data;
        var data = message.data;
        if (message.msg === 'destroyed' || this._workerDestroying) {
            this._workerDestroying = false;
            this._worker.terminate();
            this._worker = null;
            return;
        }
        switch (message.msg) {
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.INIT_SEGMENT:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_SEGMENT:
                this._emitter.emit(message.msg, data.type, data.data);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.LOADING_COMPLETE:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOVERED_EARLY_EOF:
                this._emitter.emit(message.msg);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.MEDIA_INFO:
                Object.setPrototypeOf(data, _media_info_js__WEBPACK_IMPORTED_MODULE_6__.default.prototype);
                this._emitter.emit(message.msg, data);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.METADATA_ARRIVED:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.SCRIPTDATA_ARRIVED:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.STATISTICS_INFO:
                this._emitter.emit(message.msg, data);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.IO_ERROR:
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.DEMUX_ERROR:
                this._emitter.emit(message.msg, data.type, data.info);
                break;
            case _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_5__.default.RECOMMEND_SEEKPOINT:
                this._emitter.emit(message.msg, data);
                break;
            case 'logcat_callback':
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_2__.default.emitter.emit('log', data.type, data.logcat);
                break;
            default:
                break;
        }
    };
    return Transmuxer;
}());
/* harmony default export */ __webpack_exports__["default"] = (Transmuxer);


/***/ }),

/***/ "./src/core/transmuxing-controller.js":
/*!********************************************!*\
  !*** ./src/core/transmuxing-controller.js ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! events */ "./node_modules/events/events.js");
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(events__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_browser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/browser.js */ "./src/utils/browser.js");
/* harmony import */ var _media_info_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./media-info.js */ "./src/core/media-info.js");
/* harmony import */ var _demux_flv_demuxer_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../demux/flv-demuxer.js */ "./src/demux/flv-demuxer.js");
/* harmony import */ var _remux_mp4_remuxer_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../remux/mp4-remuxer.js */ "./src/remux/mp4-remuxer.js");
/* harmony import */ var _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../demux/demux-errors.js */ "./src/demux/demux-errors.js");
/* harmony import */ var _io_io_controller_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../io/io-controller.js */ "./src/io/io-controller.js");
/* harmony import */ var _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transmuxing-events.js */ "./src/core/transmuxing-events.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









// Transmuxing (IO, Demuxing, Remuxing) controller, with multipart support
var TransmuxingController = /** @class */ (function () {
    function TransmuxingController(mediaDataSource, config) {
        this.TAG = 'TransmuxingController';
        this._emitter = new (events__WEBPACK_IMPORTED_MODULE_0___default())();
        this._config = config;
        // treat single part media as multipart media, which has only one segment
        if (!mediaDataSource.segments) {
            mediaDataSource.segments = [{
                    duration: mediaDataSource.duration,
                    filesize: mediaDataSource.filesize,
                    url: mediaDataSource.url
                }];
        }
        // fill in default IO params if not exists
        if (typeof mediaDataSource.cors !== 'boolean') {
            mediaDataSource.cors = true;
        }
        if (typeof mediaDataSource.withCredentials !== 'boolean') {
            mediaDataSource.withCredentials = false;
        }
        this._mediaDataSource = mediaDataSource;
        this._currentSegmentIndex = 0;
        var totalDuration = 0;
        this._mediaDataSource.segments.forEach(function (segment) {
            // timestampBase for each segment, and calculate total duration
            segment.timestampBase = totalDuration;
            totalDuration += segment.duration;
            // params needed by IOController
            segment.cors = mediaDataSource.cors;
            segment.withCredentials = mediaDataSource.withCredentials;
            // referrer policy control, if exist
            if (config.referrerPolicy) {
                segment.referrerPolicy = config.referrerPolicy;
            }
        });
        if (!isNaN(totalDuration) && this._mediaDataSource.duration !== totalDuration) {
            this._mediaDataSource.duration = totalDuration;
        }
        this._mediaInfo = null;
        this._demuxer = null;
        this._remuxer = null;
        this._ioctl = null;
        this._pendingSeekTime = null;
        this._pendingResolveSeekPoint = null;
        this._statisticsReporter = null;
    }
    TransmuxingController.prototype.destroy = function () {
        this._mediaInfo = null;
        this._mediaDataSource = null;
        if (this._statisticsReporter) {
            this._disableStatisticsReporter();
        }
        if (this._ioctl) {
            this._ioctl.destroy();
            this._ioctl = null;
        }
        if (this._demuxer) {
            this._demuxer.destroy();
            this._demuxer = null;
        }
        if (this._remuxer) {
            this._remuxer.destroy();
            this._remuxer = null;
        }
        this._emitter.removeAllListeners();
        this._emitter = null;
    };
    TransmuxingController.prototype.on = function (event, listener) {
        this._emitter.addListener(event, listener);
    };
    TransmuxingController.prototype.off = function (event, listener) {
        this._emitter.removeListener(event, listener);
    };
    TransmuxingController.prototype.start = function () {
        this._loadSegment(0);
        this._enableStatisticsReporter();
    };
    TransmuxingController.prototype._loadSegment = function (segmentIndex, optionalFrom) {
        this._currentSegmentIndex = segmentIndex;
        var dataSource = this._mediaDataSource.segments[segmentIndex];
        var ioctl = this._ioctl = new _io_io_controller_js__WEBPACK_IMPORTED_MODULE_7__.default(dataSource, this._config, segmentIndex);
        ioctl.onError = this._onIOException.bind(this);
        ioctl.onSeeked = this._onIOSeeked.bind(this);
        ioctl.onComplete = this._onIOComplete.bind(this);
        ioctl.onRedirect = this._onIORedirect.bind(this);
        ioctl.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this);
        if (optionalFrom) {
            this._demuxer.bindDataSource(this._ioctl);
        }
        else {
            ioctl.onDataArrival = this._onInitChunkArrival.bind(this);
        }
        ioctl.open(optionalFrom);
    };
    TransmuxingController.prototype.stop = function () {
        this._internalAbort();
        this._disableStatisticsReporter();
    };
    TransmuxingController.prototype._internalAbort = function () {
        if (this._ioctl) {
            this._ioctl.destroy();
            this._ioctl = null;
        }
    };
    TransmuxingController.prototype.pause = function () {
        if (this._ioctl && this._ioctl.isWorking()) {
            this._ioctl.pause();
            this._disableStatisticsReporter();
        }
    };
    TransmuxingController.prototype.resume = function () {
        if (this._ioctl && this._ioctl.isPaused()) {
            this._ioctl.resume();
            this._enableStatisticsReporter();
        }
    };
    TransmuxingController.prototype.seek = function (milliseconds) {
        if (this._mediaInfo == null || !this._mediaInfo.isSeekable()) {
            return;
        }
        var targetSegmentIndex = this._searchSegmentIndexContains(milliseconds);
        if (targetSegmentIndex === this._currentSegmentIndex) {
            // intra-segment seeking
            var segmentInfo = this._mediaInfo.segments[targetSegmentIndex];
            if (segmentInfo == undefined) {
                // current segment loading started, but mediainfo hasn't received yet
                // wait for the metadata loaded, then seek to expected position
                this._pendingSeekTime = milliseconds;
            }
            else {
                var keyframe = segmentInfo.getNearestKeyframe(milliseconds);
                this._remuxer.seek(keyframe.milliseconds);
                this._ioctl.seek(keyframe.fileposition);
                // Will be resolved in _onRemuxerMediaSegmentArrival()
                this._pendingResolveSeekPoint = keyframe.milliseconds;
            }
        }
        else {
            // cross-segment seeking
            var targetSegmentInfo = this._mediaInfo.segments[targetSegmentIndex];
            if (targetSegmentInfo == undefined) {
                // target segment hasn't been loaded. We need metadata then seek to expected time
                this._pendingSeekTime = milliseconds;
                this._internalAbort();
                this._remuxer.seek();
                this._remuxer.insertDiscontinuity();
                this._loadSegment(targetSegmentIndex);
                // Here we wait for the metadata loaded, then seek to expected position
            }
            else {
                // We have target segment's metadata, direct seek to target position
                var keyframe = targetSegmentInfo.getNearestKeyframe(milliseconds);
                this._internalAbort();
                this._remuxer.seek(milliseconds);
                this._remuxer.insertDiscontinuity();
                this._demuxer.resetMediaInfo();
                this._demuxer.timestampBase = this._mediaDataSource.segments[targetSegmentIndex].timestampBase;
                this._loadSegment(targetSegmentIndex, keyframe.fileposition);
                this._pendingResolveSeekPoint = keyframe.milliseconds;
                this._reportSegmentMediaInfo(targetSegmentIndex);
            }
        }
        this._enableStatisticsReporter();
    };
    TransmuxingController.prototype._searchSegmentIndexContains = function (milliseconds) {
        var segments = this._mediaDataSource.segments;
        var idx = segments.length - 1;
        for (var i = 0; i < segments.length; i++) {
            if (milliseconds < segments[i].timestampBase) {
                idx = i - 1;
                break;
            }
        }
        return idx;
    };
    TransmuxingController.prototype._onInitChunkArrival = function (data, byteStart) {
        var _this = this;
        var probeData = null;
        var consumed = 0;
        if (byteStart > 0) {
            // IOController seeked immediately after opened, byteStart > 0 callback may received
            this._demuxer.bindDataSource(this._ioctl);
            this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase;
            consumed = this._demuxer.parseChunks(data, byteStart);
        }
        else if ((probeData = _demux_flv_demuxer_js__WEBPACK_IMPORTED_MODULE_4__.default.probe(data)).match) {
            // Always create new FLVDemuxer
            this._demuxer = new _demux_flv_demuxer_js__WEBPACK_IMPORTED_MODULE_4__.default(probeData, this._config);
            if (!this._remuxer) {
                this._remuxer = new _remux_mp4_remuxer_js__WEBPACK_IMPORTED_MODULE_5__.default(this._config);
            }
            var mds = this._mediaDataSource;
            if (mds.duration != undefined && !isNaN(mds.duration)) {
                this._demuxer.overridedDuration = mds.duration;
            }
            if (typeof mds.hasAudio === 'boolean') {
                this._demuxer.overridedHasAudio = mds.hasAudio;
            }
            if (typeof mds.hasVideo === 'boolean') {
                this._demuxer.overridedHasVideo = mds.hasVideo;
            }
            this._demuxer.timestampBase = mds.segments[this._currentSegmentIndex].timestampBase;
            this._demuxer.onError = this._onDemuxException.bind(this);
            this._demuxer.onMediaInfo = this._onMediaInfo.bind(this);
            this._demuxer.onMetaDataArrived = this._onMetaDataArrived.bind(this);
            this._demuxer.onScriptDataArrived = this._onScriptDataArrived.bind(this);
            this._remuxer.bindDataSource(this._demuxer
                .bindDataSource(this._ioctl));
            this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this);
            this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this);
            consumed = this._demuxer.parseChunks(data, byteStart);
        }
        else {
            probeData = null;
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, 'Non-FLV, Unsupported media type!');
            Promise.resolve().then(function () {
                _this._internalAbort();
            });
            this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.DEMUX_ERROR, _demux_demux_errors_js__WEBPACK_IMPORTED_MODULE_6__.default.FORMAT_UNSUPPORTED, 'Non-FLV, Unsupported media type');
            consumed = 0;
        }
        return consumed;
    };
    TransmuxingController.prototype._onMediaInfo = function (mediaInfo) {
        var _this = this;
        if (this._mediaInfo == null) {
            // Store first segment's mediainfo as global mediaInfo
            this._mediaInfo = Object.assign({}, mediaInfo);
            this._mediaInfo.keyframesIndex = null;
            this._mediaInfo.segments = [];
            this._mediaInfo.segmentCount = this._mediaDataSource.segments.length;
            Object.setPrototypeOf(this._mediaInfo, _media_info_js__WEBPACK_IMPORTED_MODULE_3__.default.prototype);
        }
        var segmentInfo = Object.assign({}, mediaInfo);
        Object.setPrototypeOf(segmentInfo, _media_info_js__WEBPACK_IMPORTED_MODULE_3__.default.prototype);
        this._mediaInfo.segments[this._currentSegmentIndex] = segmentInfo;
        // notify mediaInfo update
        this._reportSegmentMediaInfo(this._currentSegmentIndex);
        if (this._pendingSeekTime != null) {
            Promise.resolve().then(function () {
                var target = _this._pendingSeekTime;
                _this._pendingSeekTime = null;
                _this.seek(target);
            });
        }
    };
    TransmuxingController.prototype._onMetaDataArrived = function (metadata) {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.METADATA_ARRIVED, metadata);
    };
    TransmuxingController.prototype._onScriptDataArrived = function (data) {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.SCRIPTDATA_ARRIVED, data);
    };
    TransmuxingController.prototype._onIOSeeked = function () {
        this._remuxer.insertDiscontinuity();
    };
    TransmuxingController.prototype._onIOComplete = function (extraData) {
        var segmentIndex = extraData;
        var nextSegmentIndex = segmentIndex + 1;
        if (nextSegmentIndex < this._mediaDataSource.segments.length) {
            this._internalAbort();
            this._remuxer.flushStashedSamples();
            this._loadSegment(nextSegmentIndex);
        }
        else {
            this._remuxer.flushStashedSamples();
            this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.LOADING_COMPLETE);
            this._disableStatisticsReporter();
        }
    };
    TransmuxingController.prototype._onIORedirect = function (redirectedURL) {
        var segmentIndex = this._ioctl.extraData;
        this._mediaDataSource.segments[segmentIndex].redirectedURL = redirectedURL;
    };
    TransmuxingController.prototype._onIORecoveredEarlyEof = function () {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.RECOVERED_EARLY_EOF);
    };
    TransmuxingController.prototype._onIOException = function (type, info) {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, "IOException: type = " + type + ", code = " + info.code + ", msg = " + info.msg);
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.IO_ERROR, type, info);
        this._disableStatisticsReporter();
    };
    TransmuxingController.prototype._onDemuxException = function (type, info) {
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_1__.default.e(this.TAG, "DemuxException: type = " + type + ", info = " + info);
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.DEMUX_ERROR, type, info);
    };
    TransmuxingController.prototype._onRemuxerInitSegmentArrival = function (type, initSegment) {
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.INIT_SEGMENT, type, initSegment);
    };
    TransmuxingController.prototype._onRemuxerMediaSegmentArrival = function (type, mediaSegment) {
        if (this._pendingSeekTime != null) {
            // Media segments after new-segment cross-seeking should be dropped.
            return;
        }
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.MEDIA_SEGMENT, type, mediaSegment);
        // Resolve pending seekPoint
        if (this._pendingResolveSeekPoint != null && type === 'video') {
            var syncPoints = mediaSegment.info.syncPoints;
            var seekpoint = this._pendingResolveSeekPoint;
            this._pendingResolveSeekPoint = null;
            // Safari: Pass PTS for recommend_seekpoint
            if (_utils_browser_js__WEBPACK_IMPORTED_MODULE_2__.default.safari && syncPoints.length > 0 && syncPoints[0].originalDts === seekpoint) {
                seekpoint = syncPoints[0].pts;
            }
            // else: use original DTS (keyframe.milliseconds)
            this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.RECOMMEND_SEEKPOINT, seekpoint);
        }
    };
    TransmuxingController.prototype._enableStatisticsReporter = function () {
        if (this._statisticsReporter == null) {
            this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval);
        }
    };
    TransmuxingController.prototype._disableStatisticsReporter = function () {
        if (this._statisticsReporter) {
            self.clearInterval(this._statisticsReporter);
            this._statisticsReporter = null;
        }
    };
    TransmuxingController.prototype._reportSegmentMediaInfo = function (segmentIndex) {
        var segmentInfo = this._mediaInfo.segments[segmentIndex];
        var exportInfo = Object.assign({}, segmentInfo);
        exportInfo.duration = this._mediaInfo.duration;
        exportInfo.segmentCount = this._mediaInfo.segmentCount;
        delete exportInfo.segments;
        delete exportInfo.keyframesIndex;
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.MEDIA_INFO, exportInfo);
    };
    TransmuxingController.prototype._reportStatisticsInfo = function () {
        var info = {};
        info.url = this._ioctl.currentURL;
        info.hasRedirect = this._ioctl.hasRedirect;
        if (info.hasRedirect) {
            info.redirectedURL = this._ioctl.currentRedirectedURL;
        }
        info.speed = this._ioctl.currentSpeed;
        info.loaderType = this._ioctl.loaderType;
        info.currentSegmentIndex = this._currentSegmentIndex;
        info.totalSegmentCount = this._mediaDataSource.segments.length;
        this._emitter.emit(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_8__.default.STATISTICS_INFO, info);
    };
    return TransmuxingController;
}());
/* harmony default export */ __webpack_exports__["default"] = (TransmuxingController);


/***/ }),

/***/ "./src/core/transmuxing-events.js":
/*!****************************************!*\
  !*** ./src/core/transmuxing-events.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var TransmuxingEvents = {
    IO_ERROR: 'io_error',
    DEMUX_ERROR: 'demux_error',
    INIT_SEGMENT: 'init_segment',
    MEDIA_SEGMENT: 'media_segment',
    LOADING_COMPLETE: 'loading_complete',
    RECOVERED_EARLY_EOF: 'recovered_early_eof',
    MEDIA_INFO: 'media_info',
    METADATA_ARRIVED: 'metadata_arrived',
    SCRIPTDATA_ARRIVED: 'scriptdata_arrived',
    STATISTICS_INFO: 'statistics_info',
    RECOMMEND_SEEKPOINT: 'recommend_seekpoint'
};
/* harmony default export */ __webpack_exports__["default"] = (TransmuxingEvents);


/***/ }),

/***/ "./src/core/transmuxing-worker.js":
/*!****************************************!*\
  !*** ./src/core/transmuxing-worker.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logging-control.js */ "./src/utils/logging-control.js");
/* harmony import */ var _utils_polyfill_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/polyfill.js */ "./src/utils/polyfill.js");
/* harmony import */ var _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transmuxing-controller.js */ "./src/core/transmuxing-controller.js");
/* harmony import */ var _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transmuxing-events.js */ "./src/core/transmuxing-events.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




/* post message to worker:
   data: {
       cmd: string
       param: any
   }

   receive message from worker:
   data: {
       msg: string,
       data: any
   }
 */
var TransmuxingWorker = function (self) {
    var TAG = 'TransmuxingWorker';
    var controller = null;
    var logcatListener = onLogcatCallback.bind(this);
    _utils_polyfill_js__WEBPACK_IMPORTED_MODULE_1__.default.install();
    self.addEventListener('message', function (e) {
        switch (e.data.cmd) {
            case 'init':
                controller = new _transmuxing_controller_js__WEBPACK_IMPORTED_MODULE_2__.default(e.data.param[0], e.data.param[1]);
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.IO_ERROR, onIOError.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.DEMUX_ERROR, onDemuxError.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.INIT_SEGMENT, onInitSegment.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_SEGMENT, onMediaSegment.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.LOADING_COMPLETE, onLoadingComplete.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOVERED_EARLY_EOF, onRecoveredEarlyEof.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_INFO, onMediaInfo.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.METADATA_ARRIVED, onMetaDataArrived.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.SCRIPTDATA_ARRIVED, onScriptDataArrived.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.STATISTICS_INFO, onStatisticsInfo.bind(this));
                controller.on(_transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOMMEND_SEEKPOINT, onRecommendSeekpoint.bind(this));
                break;
            case 'destroy':
                if (controller) {
                    controller.destroy();
                    controller = null;
                }
                self.postMessage({ msg: 'destroyed' });
                break;
            case 'start':
                controller.start();
                break;
            case 'stop':
                controller.stop();
                break;
            case 'seek':
                controller.seek(e.data.param);
                break;
            case 'pause':
                controller.pause();
                break;
            case 'resume':
                controller.resume();
                break;
            case 'logging_config': {
                var config = e.data.param;
                _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__.default.applyConfig(config);
                if (config.enableCallback === true) {
                    _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__.default.addLogListener(logcatListener);
                }
                else {
                    _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_0__.default.removeLogListener(logcatListener);
                }
                break;
            }
        }
    });
    function onInitSegment(type, initSegment) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.INIT_SEGMENT,
            data: {
                type: type,
                data: initSegment
            }
        };
        self.postMessage(obj, [initSegment.data]); // data: ArrayBuffer
    }
    function onMediaSegment(type, mediaSegment) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_SEGMENT,
            data: {
                type: type,
                data: mediaSegment
            }
        };
        self.postMessage(obj, [mediaSegment.data]); // data: ArrayBuffer
    }
    function onLoadingComplete() {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.LOADING_COMPLETE
        };
        self.postMessage(obj);
    }
    function onRecoveredEarlyEof() {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOVERED_EARLY_EOF
        };
        self.postMessage(obj);
    }
    function onMediaInfo(mediaInfo) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.MEDIA_INFO,
            data: mediaInfo
        };
        self.postMessage(obj);
    }
    function onMetaDataArrived(metadata) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.METADATA_ARRIVED,
            data: metadata
        };
        self.postMessage(obj);
    }
    function onScriptDataArrived(data) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.SCRIPTDATA_ARRIVED,
            data: data
        };
        self.postMessage(obj);
    }
    function onStatisticsInfo(statInfo) {
        var obj = {
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.STATISTICS_INFO,
            data: statInfo
        };
        self.postMessage(obj);
    }
    function onIOError(type, info) {
        self.postMessage({
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.IO_ERROR,
            data: {
                type: type,
                info: info
            }
        });
    }
    function onDemuxError(type, info) {
        self.postMessage({
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.DEMUX_ERROR,
            data: {
                type: type,
                info: info
            }
        });
    }
    function onRecommendSeekpoint(milliseconds) {
        self.postMessage({
            msg: _transmuxing_events_js__WEBPACK_IMPORTED_MODULE_3__.default.RECOMMEND_SEEKPOINT,
            data: milliseconds
        });
    }
    function onLogcatCallback(type, str) {
        self.postMessage({
            msg: 'logcat_callback',
            data: {
                type: type,
                logcat: str
            }
        });
    }
};
/* harmony default export */ __webpack_exports__["default"] = (TransmuxingWorker);


/***/ }),

/***/ "./src/demux/amf-parser.js":
/*!*********************************!*\
  !*** ./src/demux/amf-parser.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _utils_utf8_conv_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/utf8-conv.js */ "./src/utils/utf8-conv.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



var le = (function () {
    var buf = new ArrayBuffer(2);
    (new DataView(buf)).setInt16(0, 256, true); // little-endian write
    return (new Int16Array(buf))[0] === 256; // platform-spec read, if equal then LE
})();
var AMF = /** @class */ (function () {
    function AMF() {
    }
    AMF.parseScriptData = function (arrayBuffer, dataOffset, dataSize) {
        var data = {};
        try {
            var name_1 = AMF.parseValue(arrayBuffer, dataOffset, dataSize);
            var value = AMF.parseValue(arrayBuffer, dataOffset + name_1.size, dataSize - name_1.size);
            data[name_1.data] = value.data;
        }
        catch (e) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.e('AMF', e.toString());
        }
        return data;
    };
    AMF.parseObject = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 3) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse ScriptDataObject');
        }
        var name = AMF.parseString(arrayBuffer, dataOffset, dataSize);
        var value = AMF.parseValue(arrayBuffer, dataOffset + name.size, dataSize - name.size);
        var isObjectEnd = value.objectEnd;
        return {
            data: {
                name: name.data,
                value: value.data
            },
            size: name.size + value.size,
            objectEnd: isObjectEnd
        };
    };
    AMF.parseVariable = function (arrayBuffer, dataOffset, dataSize) {
        return AMF.parseObject(arrayBuffer, dataOffset, dataSize);
    };
    AMF.parseString = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 2) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse String');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var length = v.getUint16(0, !le);
        var str;
        if (length > 0) {
            str = (0,_utils_utf8_conv_js__WEBPACK_IMPORTED_MODULE_1__.default)(new Uint8Array(arrayBuffer, dataOffset + 2, length));
        }
        else {
            str = '';
        }
        return {
            data: str,
            size: 2 + length
        };
    };
    AMF.parseLongString = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 4) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse LongString');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var length = v.getUint32(0, !le);
        var str;
        if (length > 0) {
            str = (0,_utils_utf8_conv_js__WEBPACK_IMPORTED_MODULE_1__.default)(new Uint8Array(arrayBuffer, dataOffset + 4, length));
        }
        else {
            str = '';
        }
        return {
            data: str,
            size: 4 + length
        };
    };
    AMF.parseDate = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 10) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data size invalid when parse Date');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var timestamp = v.getFloat64(0, !le);
        var localTimeOffset = v.getInt16(8, !le);
        timestamp += localTimeOffset * 60 * 1000; // get UTC time
        return {
            data: new Date(timestamp),
            size: 8 + 2
        };
    };
    AMF.parseValue = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 1) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_2__.IllegalStateException('Data not enough when parse Value');
        }
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var offset = 1;
        var type = v.getUint8(0);
        var value;
        var objectEnd = false;
        try {
            switch (type) {
                case 0: // Number(Double) type
                    value = v.getFloat64(1, !le);
                    offset += 8;
                    break;
                case 1: { // Boolean type
                    var b = v.getUint8(1);
                    value = b ? true : false;
                    offset += 1;
                    break;
                }
                case 2: { // String type
                    var amfstr = AMF.parseString(arrayBuffer, dataOffset + 1, dataSize - 1);
                    value = amfstr.data;
                    offset += amfstr.size;
                    break;
                }
                case 3: { // Object(s) type
                    value = {};
                    var terminal = 0; // workaround for malformed Objects which has missing ScriptDataObjectEnd
                    if ((v.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) {
                        terminal = 3;
                    }
                    while (offset < dataSize - 4) { // 4 === type(UI8) + ScriptDataObjectEnd(UI24)
                        var amfobj = AMF.parseObject(arrayBuffer, dataOffset + offset, dataSize - offset - terminal);
                        if (amfobj.objectEnd)
                            break;
                        value[amfobj.data.name] = amfobj.data.value;
                        offset += amfobj.size;
                    }
                    if (offset <= dataSize - 3) {
                        var marker = v.getUint32(offset - 1, !le) & 0x00FFFFFF;
                        if (marker === 9) {
                            offset += 3;
                        }
                    }
                    break;
                }
                case 8: { // ECMA array type (Mixed array)
                    value = {};
                    offset += 4; // ECMAArrayLength(UI32)
                    var terminal = 0; // workaround for malformed MixedArrays which has missing ScriptDataObjectEnd
                    if ((v.getUint32(dataSize - 4, !le) & 0x00FFFFFF) === 9) {
                        terminal = 3;
                    }
                    while (offset < dataSize - 8) { // 8 === type(UI8) + ECMAArrayLength(UI32) + ScriptDataVariableEnd(UI24)
                        var amfvar = AMF.parseVariable(arrayBuffer, dataOffset + offset, dataSize - offset - terminal);
                        if (amfvar.objectEnd)
                            break;
                        value[amfvar.data.name] = amfvar.data.value;
                        offset += amfvar.size;
                    }
                    if (offset <= dataSize - 3) {
                        var marker = v.getUint32(offset - 1, !le) & 0x00FFFFFF;
                        if (marker === 9) {
                            offset += 3;
                        }
                    }
                    break;
                }
                case 9: // ScriptDataObjectEnd
                    value = undefined;
                    offset = 1;
                    objectEnd = true;
                    break;
                case 10: { // Strict array type
                    // ScriptDataValue[n]. NOTE: according to video_file_format_spec_v10_1.pdf
                    value = [];
                    var strictArrayLength = v.getUint32(1, !le);
                    offset += 4;
                    for (var i = 0; i < strictArrayLength; i++) {
                        var val = AMF.parseValue(arrayBuffer, dataOffset + offset, dataSize - offset);
                        value.push(val.data);
                        offset += val.size;
                    }
                    break;
                }
                case 11: { // Date type
                    var date = AMF.parseDate(arrayBuffer, dataOffset + 1, dataSize - 1);
                    value = date.data;
                    offset += date.size;
                    break;
                }
                case 12: { // Long string type
                    var amfLongStr = AMF.parseString(arrayBuffer, dataOffset + 1, dataSize - 1);
                    value = amfLongStr.data;
                    offset += amfLongStr.size;
                    break;
                }
                default:
                    // ignore and skip
                    offset = dataSize;
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w('AMF', 'Unsupported AMF value type ' + type);
            }
        }
        catch (e) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.e('AMF', e.toString());
        }
        return {
            data: value,
            size: offset,
            objectEnd: objectEnd
        };
    };
    return AMF;
}());
/* harmony default export */ __webpack_exports__["default"] = (AMF);


/***/ }),

/***/ "./src/demux/demux-errors.js":
/*!***********************************!*\
  !*** ./src/demux/demux-errors.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var DemuxErrors = {
    OK: 'OK',
    FORMAT_ERROR: 'FormatError',
    FORMAT_UNSUPPORTED: 'FormatUnsupported',
    CODEC_UNSUPPORTED: 'CodecUnsupported'
};
/* harmony default export */ __webpack_exports__["default"] = (DemuxErrors);


/***/ }),

/***/ "./src/demux/exp-golomb.js":
/*!*********************************!*\
  !*** ./src/demux/exp-golomb.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Exponential-Golomb buffer decoder
var ExpGolomb = /** @class */ (function () {
    function ExpGolomb(uint8array) {
        this.TAG = 'ExpGolomb';
        this._buffer = uint8array;
        this._buffer_index = 0;
        this._total_bytes = uint8array.byteLength;
        this._total_bits = uint8array.byteLength * 8;
        this._current_word = 0;
        this._current_word_bits_left = 0;
    }
    ExpGolomb.prototype.destroy = function () {
        this._buffer = null;
    };
    ExpGolomb.prototype._fillCurrentWord = function () {
        var buffer_bytes_left = this._total_bytes - this._buffer_index;
        if (buffer_bytes_left <= 0)
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__.IllegalStateException('ExpGolomb: _fillCurrentWord() but no bytes available');
        var bytes_read = Math.min(4, buffer_bytes_left);
        var word = new Uint8Array(4);
        word.set(this._buffer.subarray(this._buffer_index, this._buffer_index + bytes_read));
        this._current_word = new DataView(word.buffer).getUint32(0, false);
        this._buffer_index += bytes_read;
        this._current_word_bits_left = bytes_read * 8;
    };
    ExpGolomb.prototype.readBits = function (bits) {
        if (bits > 32)
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_0__.InvalidArgumentException('ExpGolomb: readBits() bits exceeded max 32bits!');
        if (bits <= this._current_word_bits_left) {
            var result_1 = this._current_word >>> (32 - bits);
            this._current_word <<= bits;
            this._current_word_bits_left -= bits;
            return result_1;
        }
        var result = this._current_word_bits_left ? this._current_word : 0;
        result = result >>> (32 - this._current_word_bits_left);
        var bits_need_left = bits - this._current_word_bits_left;
        this._fillCurrentWord();
        var bits_read_next = Math.min(bits_need_left, this._current_word_bits_left);
        var result2 = this._current_word >>> (32 - bits_read_next);
        this._current_word <<= bits_read_next;
        this._current_word_bits_left -= bits_read_next;
        result = (result << bits_read_next) | result2;
        return result;
    };
    ExpGolomb.prototype.readBool = function () {
        return this.readBits(1) === 1;
    };
    ExpGolomb.prototype.readByte = function () {
        return this.readBits(8);
    };
    ExpGolomb.prototype._skipLeadingZero = function () {
        var zero_count;
        for (zero_count = 0; zero_count < this._current_word_bits_left; zero_count++) {
            if (0 !== (this._current_word & (0x80000000 >>> zero_count))) {
                this._current_word <<= zero_count;
                this._current_word_bits_left -= zero_count;
                return zero_count;
            }
        }
        this._fillCurrentWord();
        return zero_count + this._skipLeadingZero();
    };
    ExpGolomb.prototype.readUEG = function () {
        var leading_zeros = this._skipLeadingZero();
        return this.readBits(leading_zeros + 1) - 1;
    };
    ExpGolomb.prototype.readSEG = function () {
        var value = this.readUEG();
        if (value & 0x01) {
            return (value + 1) >>> 1;
        }
        else {
            return -1 * (value >>> 1);
        }
    };
    return ExpGolomb;
}());
/* harmony default export */ __webpack_exports__["default"] = (ExpGolomb);


/***/ }),

/***/ "./src/demux/flv-demuxer.js":
/*!**********************************!*\
  !*** ./src/demux/flv-demuxer.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/logger.js */ "./src/utils/logger.js");
/* harmony import */ var _amf_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./amf-parser.js */ "./src/demux/amf-parser.js");
/* harmony import */ var _sps_parser_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sps-parser.js */ "./src/demux/sps-parser.js");
/* harmony import */ var _demux_errors_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./demux-errors.js */ "./src/demux/demux-errors.js");
/* harmony import */ var _core_media_info_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/media-info.js */ "./src/core/media-info.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */






function Swap16(src) {
    return (((src >>> 8) & 0xFF) |
        ((src & 0xFF) << 8));
}
function Swap32(src) {
    return (((src & 0xFF000000) >>> 24) |
        ((src & 0x00FF0000) >>> 8) |
        ((src & 0x0000FF00) << 8) |
        ((src & 0x000000FF) << 24));
}
function ReadBig32(array, index) {
    return ((array[index] << 24) |
        (array[index + 1] << 16) |
        (array[index + 2] << 8) |
        (array[index + 3]));
}
var FLVDemuxer = /** @class */ (function () {
    function FLVDemuxer(probeData, config) {
        this.TAG = 'FLVDemuxer';
        this._config = config;
        this._onError = null;
        this._onMediaInfo = null;
        this._onMetaDataArrived = null;
        this._onScriptDataArrived = null;
        this._onTrackMetadata = null;
        this._onDataAvailable = null;
        this._dataOffset = probeData.dataOffset;
        this._firstParse = true;
        this._dispatch = false;
        this._hasAudio = probeData.hasAudioTrack;
        this._hasVideo = probeData.hasVideoTrack;
        this._hasAudioFlagOverrided = false;
        this._hasVideoFlagOverrided = false;
        this._audioInitialMetadataDispatched = false;
        this._videoInitialMetadataDispatched = false;
        this._mediaInfo = new _core_media_info_js__WEBPACK_IMPORTED_MODULE_4__.default();
        this._mediaInfo.hasAudio = this._hasAudio;
        this._mediaInfo.hasVideo = this._hasVideo;
        this._metadata = null;
        this._audioMetadata = null;
        this._videoMetadata = null;
        this._naluLengthSize = 4;
        this._timestampBase = 0; // int32, in milliseconds
        this._timescale = 1000;
        this._duration = 0; // int32, in milliseconds
        this._durationOverrided = false;
        this._referenceFrameRate = {
            fixed: true,
            fps: 23.976,
            fps_num: 23976,
            fps_den: 1000
        };
        this._flvSoundRateTable = [5500, 11025, 22050, 44100, 48000];
        this._mpegSamplingRates = [
            96000, 88200, 64000, 48000, 44100, 32000,
            24000, 22050, 16000, 12000, 11025, 8000, 7350
        ];
        this._mpegAudioV10SampleRateTable = [44100, 48000, 32000, 0];
        this._mpegAudioV20SampleRateTable = [22050, 24000, 16000, 0];
        this._mpegAudioV25SampleRateTable = [11025, 12000, 8000, 0];
        this._mpegAudioL1BitRateTable = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, -1];
        this._mpegAudioL2BitRateTable = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, -1];
        this._mpegAudioL3BitRateTable = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, -1];
        this._videoTrack = { type: 'video', id: 1, sequenceNumber: 0, samples: [], length: 0 };
        this._audioTrack = { type: 'audio', id: 2, sequenceNumber: 0, samples: [], length: 0 };
        this._littleEndian = (function () {
            var buf = new ArrayBuffer(2);
            (new DataView(buf)).setInt16(0, 256, true); // little-endian write
            return (new Int16Array(buf))[0] === 256; // platform-spec read, if equal then LE
        })();
    }
    FLVDemuxer.prototype.destroy = function () {
        this._mediaInfo = null;
        this._metadata = null;
        this._audioMetadata = null;
        this._videoMetadata = null;
        this._videoTrack = null;
        this._audioTrack = null;
        this._onError = null;
        this._onMediaInfo = null;
        this._onMetaDataArrived = null;
        this._onScriptDataArrived = null;
        this._onTrackMetadata = null;
        this._onDataAvailable = null;
    };
    FLVDemuxer.probe = function (buffer) {
        var data = new Uint8Array(buffer);
        var mismatch = { match: false };
        if (data[0] !== 0x46 || data[1] !== 0x4C || data[2] !== 0x56 || data[3] !== 0x01) {
            return mismatch;
        }
        var hasAudio = ((data[4] & 4) >>> 2) !== 0;
        var hasVideo = (data[4] & 1) !== 0;
        var offset = ReadBig32(data, 5);
        if (offset < 9) {
            return mismatch;
        }
        return {
            match: true,
            consumed: offset,
            dataOffset: offset,
            hasAudioTrack: hasAudio,
            hasVideoTrack: hasVideo
        };
    };
    FLVDemuxer.prototype.bindDataSource = function (loader) {
        loader.onDataArrival = this.parseChunks.bind(this);
        return this;
    };
    Object.defineProperty(FLVDemuxer.prototype, "onTrackMetadata", {
        // prototype: function(type: string, metadata: any): void
        get: function () {
            return this._onTrackMetadata;
        },
        set: function (callback) {
            this._onTrackMetadata = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onMediaInfo", {
        // prototype: function(mediaInfo: MediaInfo): void
        get: function () {
            return this._onMediaInfo;
        },
        set: function (callback) {
            this._onMediaInfo = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onMetaDataArrived", {
        get: function () {
            return this._onMetaDataArrived;
        },
        set: function (callback) {
            this._onMetaDataArrived = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onScriptDataArrived", {
        get: function () {
            return this._onScriptDataArrived;
        },
        set: function (callback) {
            this._onScriptDataArrived = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onError", {
        // prototype: function(type: number, info: string): void
        get: function () {
            return this._onError;
        },
        set: function (callback) {
            this._onError = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "onDataAvailable", {
        // prototype: function(videoTrack: any, audioTrack: any): void
        get: function () {
            return this._onDataAvailable;
        },
        set: function (callback) {
            this._onDataAvailable = callback;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "timestampBase", {
        // timestamp base for output samples, must be in milliseconds
        get: function () {
            return this._timestampBase;
        },
        set: function (base) {
            this._timestampBase = base;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "overridedDuration", {
        get: function () {
            return this._duration;
        },
        // Force-override media duration. Must be in milliseconds, int32
        set: function (duration) {
            this._durationOverrided = true;
            this._duration = duration;
            this._mediaInfo.duration = duration;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "overridedHasAudio", {
        // Force-override audio track present flag, boolean
        set: function (hasAudio) {
            this._hasAudioFlagOverrided = true;
            this._hasAudio = hasAudio;
            this._mediaInfo.hasAudio = hasAudio;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FLVDemuxer.prototype, "overridedHasVideo", {
        // Force-override video track present flag, boolean
        set: function (hasVideo) {
            this._hasVideoFlagOverrided = true;
            this._hasVideo = hasVideo;
            this._mediaInfo.hasVideo = hasVideo;
        },
        enumerable: false,
        configurable: true
    });
    FLVDemuxer.prototype.resetMediaInfo = function () {
        this._mediaInfo = new _core_media_info_js__WEBPACK_IMPORTED_MODULE_4__.default();
    };
    FLVDemuxer.prototype._isInitialMetadataDispatched = function () {
        if (this._hasAudio && this._hasVideo) { // both audio & video
            return this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched;
        }
        if (this._hasAudio && !this._hasVideo) { // audio only
            return this._audioInitialMetadataDispatched;
        }
        if (!this._hasAudio && this._hasVideo) { // video only
            return this._videoInitialMetadataDispatched;
        }
        return false;
    };
    // function parseChunks(chunk: ArrayBuffer, byteStart: number): number;
    FLVDemuxer.prototype.parseChunks = function (chunk, byteStart) {
        if (!this._onError || !this._onMediaInfo || !this._onTrackMetadata || !this._onDataAvailable) {
            throw new _utils_exception_js__WEBPACK_IMPORTED_MODULE_5__.IllegalStateException('Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified');
        }
        var offset = 0;
        var le = this._littleEndian;
        if (byteStart === 0) { // buffer with FLV header
            if (chunk.byteLength > 13) {
                var probeData = FLVDemuxer.probe(chunk);
                offset = probeData.dataOffset;
            }
            else {
                return 0;
            }
        }
        if (this._firstParse) { // handle PreviousTagSize0 before Tag1
            this._firstParse = false;
            if (byteStart + offset !== this._dataOffset) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'First time parsing but chunk byteStart invalid!');
            }
            var v = new DataView(chunk, offset);
            var prevTagSize0 = v.getUint32(0, !le);
            if (prevTagSize0 !== 0) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'PrevTagSize0 !== 0 !!!');
            }
            offset += 4;
        }
        while (offset < chunk.byteLength) {
            this._dispatch = true;
            var v = new DataView(chunk, offset);
            if (offset + 11 + 4 > chunk.byteLength) {
                // data not enough for parsing an flv tag
                break;
            }
            var tagType = v.getUint8(0);
            var dataSize = v.getUint32(0, !le) & 0x00FFFFFF;
            if (offset + 11 + dataSize + 4 > chunk.byteLength) {
                // data not enough for parsing actual data body
                break;
            }
            if (tagType !== 8 && tagType !== 9 && tagType !== 18) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Unsupported tag type " + tagType + ", skipped");
                // consume the whole tag (skip it)
                offset += 11 + dataSize + 4;
                continue;
            }
            var ts2 = v.getUint8(4);
            var ts1 = v.getUint8(5);
            var ts0 = v.getUint8(6);
            var ts3 = v.getUint8(7);
            var timestamp = ts0 | (ts1 << 8) | (ts2 << 16) | (ts3 << 24);
            var streamId = v.getUint32(7, !le) & 0x00FFFFFF;
            if (streamId !== 0) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Meet tag which has StreamID != 0!');
            }
            var dataOffset = offset + 11;
            switch (tagType) {
                case 8: // Audio
                    this._parseAudioData(chunk, dataOffset, dataSize, timestamp);
                    break;
                case 9: // Video
                    this._parseVideoData(chunk, dataOffset, dataSize, timestamp, byteStart + offset);
                    break;
                case 18: // ScriptDataObject
                    this._parseScriptData(chunk, dataOffset, dataSize);
                    break;
            }
            var prevTagSize = v.getUint32(11 + dataSize, !le);
            if (prevTagSize !== 11 + dataSize) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Invalid PrevTagSize " + prevTagSize);
            }
            offset += 11 + dataSize + 4; // tagBody + dataSize + prevTagSize
        }
        // dispatch parsed frames to consumer (typically, the remuxer)
        if (this._isInitialMetadataDispatched()) {
            if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                this._onDataAvailable(this._audioTrack, this._videoTrack);
            }
        }
        return offset; // consumed bytes, just equals latest offset index
    };
    FLVDemuxer.prototype._parseScriptData = function (arrayBuffer, dataOffset, dataSize) {
        var scriptData = _amf_parser_js__WEBPACK_IMPORTED_MODULE_1__.default.parseScriptData(arrayBuffer, dataOffset, dataSize);
        if (scriptData.hasOwnProperty('onMetaData')) {
            if (scriptData.onMetaData == null || typeof scriptData.onMetaData !== 'object') {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Invalid onMetaData structure!');
                return;
            }
            if (this._metadata) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Found another onMetaData tag!');
            }
            this._metadata = scriptData;
            var onMetaData = this._metadata.onMetaData;
            if (this._onMetaDataArrived) {
                this._onMetaDataArrived(Object.assign({}, onMetaData));
            }
            if (typeof onMetaData.hasAudio === 'boolean') { // hasAudio
                if (this._hasAudioFlagOverrided === false) {
                    this._hasAudio = onMetaData.hasAudio;
                    this._mediaInfo.hasAudio = this._hasAudio;
                }
            }
            if (typeof onMetaData.hasVideo === 'boolean') { // hasVideo
                if (this._hasVideoFlagOverrided === false) {
                    this._hasVideo = onMetaData.hasVideo;
                    this._mediaInfo.hasVideo = this._hasVideo;
                }
            }
            if (typeof onMetaData.audiodatarate === 'number') { // audiodatarate
                this._mediaInfo.audioDataRate = onMetaData.audiodatarate;
            }
            if (typeof onMetaData.videodatarate === 'number') { // videodatarate
                this._mediaInfo.videoDataRate = onMetaData.videodatarate;
            }
            if (typeof onMetaData.width === 'number') { // width
                this._mediaInfo.width = onMetaData.width;
            }
            if (typeof onMetaData.height === 'number') { // height
                this._mediaInfo.height = onMetaData.height;
            }
            if (typeof onMetaData.duration === 'number') { // duration
                if (!this._durationOverrided) {
                    var duration = Math.floor(onMetaData.duration * this._timescale);
                    this._duration = duration;
                    this._mediaInfo.duration = duration;
                }
            }
            else {
                this._mediaInfo.duration = 0;
            }
            if (typeof onMetaData.framerate === 'number') { // framerate
                var fps_num = Math.floor(onMetaData.framerate * 1000);
                if (fps_num > 0) {
                    var fps = fps_num / 1000;
                    this._referenceFrameRate.fixed = true;
                    this._referenceFrameRate.fps = fps;
                    this._referenceFrameRate.fps_num = fps_num;
                    this._referenceFrameRate.fps_den = 1000;
                    this._mediaInfo.fps = fps;
                }
            }
            if (typeof onMetaData.keyframes === 'object') { // keyframes
                this._mediaInfo.hasKeyframesIndex = true;
                var keyframes = onMetaData.keyframes;
                this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(keyframes);
                onMetaData.keyframes = null; // keyframes has been extracted, remove it
            }
            else {
                this._mediaInfo.hasKeyframesIndex = false;
            }
            this._dispatch = false;
            this._mediaInfo.metadata = onMetaData;
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed onMetaData');
            if (this._mediaInfo.isComplete()) {
                this._onMediaInfo(this._mediaInfo);
            }
        }
        if (Object.keys(scriptData).length > 0) {
            if (this._onScriptDataArrived) {
                this._onScriptDataArrived(Object.assign({}, scriptData));
            }
        }
    };
    FLVDemuxer.prototype._parseKeyframesIndex = function (keyframes) {
        var times = [];
        var filepositions = [];
        // ignore first keyframe which is actually AVC Sequence Header (AVCDecoderConfigurationRecord)
        for (var i = 1; i < keyframes.times.length; i++) {
            var time = this._timestampBase + Math.floor(keyframes.times[i] * 1000);
            times.push(time);
            filepositions.push(keyframes.filepositions[i]);
        }
        return {
            times: times,
            filepositions: filepositions
        };
    };
    FLVDemuxer.prototype._parseAudioData = function (arrayBuffer, dataOffset, dataSize, tagTimestamp) {
        if (dataSize <= 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid audio packet, missing SoundData payload!');
            return;
        }
        if (this._hasAudioFlagOverrided === true && this._hasAudio === false) {
            // If hasAudio: false indicated explicitly in MediaDataSource,
            // Ignore all the audio packets
            return;
        }
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var soundSpec = v.getUint8(0);
        var soundFormat = soundSpec >>> 4;
        if (soundFormat !== 2 && soundFormat !== 10) { // MP3 or AAC
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.CODEC_UNSUPPORTED, 'Flv: Unsupported audio codec idx: ' + soundFormat);
            return;
        }
        var soundRate = 0;
        var soundRateIndex = (soundSpec & 12) >>> 2;
        if (soundRateIndex >= 0 && soundRateIndex <= 4) {
            soundRate = this._flvSoundRateTable[soundRateIndex];
        }
        else {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid audio sample rate idx: ' + soundRateIndex);
            return;
        }
        var soundSize = (soundSpec & 2) >>> 1; // unused
        var soundType = (soundSpec & 1);
        var meta = this._audioMetadata;
        var track = this._audioTrack;
        if (!meta) {
            if (this._hasAudio === false && this._hasAudioFlagOverrided === false) {
                this._hasAudio = true;
                this._mediaInfo.hasAudio = true;
            }
            // initial metadata
            meta = this._audioMetadata = {};
            meta.type = 'audio';
            meta.id = track.id;
            meta.timescale = this._timescale;
            meta.duration = this._duration;
            meta.audioSampleRate = soundRate;
            meta.channelCount = (soundType === 0 ? 1 : 2);
        }
        if (soundFormat === 10) { // AAC
            var aacData = this._parseAACAudioData(arrayBuffer, dataOffset + 1, dataSize - 1);
            if (aacData == undefined) {
                return;
            }
            if (aacData.packetType === 0) { // AAC sequence header (AudioSpecificConfig)
                if (meta.config) {
                    _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Found another AudioSpecificConfig!');
                }
                var misc = aacData.data;
                meta.audioSampleRate = misc.samplingRate;
                meta.channelCount = misc.channelCount;
                meta.codec = misc.codec;
                meta.originalCodec = misc.originalCodec;
                meta.config = misc.config;
                // The decode result of an aac sample is 1024 PCM samples
                meta.refSampleDuration = 1024 / meta.audioSampleRate * meta.timescale;
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed AudioSpecificConfig');
                if (this._isInitialMetadataDispatched()) {
                    // Non-initial metadata, force dispatch (or flush) parsed frames to remuxer
                    if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                        this._onDataAvailable(this._audioTrack, this._videoTrack);
                    }
                }
                else {
                    this._audioInitialMetadataDispatched = true;
                }
                // then notify new metadata
                this._dispatch = false;
                this._onTrackMetadata('audio', meta);
                var mi = this._mediaInfo;
                mi.audioCodec = meta.originalCodec;
                mi.audioSampleRate = meta.audioSampleRate;
                mi.audioChannelCount = meta.channelCount;
                if (mi.hasVideo) {
                    if (mi.videoCodec != null) {
                        mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                    }
                }
                else {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
                }
                if (mi.isComplete()) {
                    this._onMediaInfo(mi);
                }
            }
            else if (aacData.packetType === 1) { // AAC raw frame data
                var dts = this._timestampBase + tagTimestamp;
                var aacSample = { unit: aacData.data, length: aacData.data.byteLength, dts: dts, pts: dts };
                track.samples.push(aacSample);
                track.length += aacData.data.length;
            }
            else {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.e(this.TAG, "Flv: Unsupported AAC data type " + aacData.packetType);
            }
        }
        else if (soundFormat === 2) { // MP3
            if (!meta.codec) {
                // We need metadata for mp3 audio track, extract info from frame header
                var misc = this._parseMP3AudioData(arrayBuffer, dataOffset + 1, dataSize - 1, true);
                if (misc == undefined) {
                    return;
                }
                meta.audioSampleRate = misc.samplingRate;
                meta.channelCount = misc.channelCount;
                meta.codec = misc.codec;
                meta.originalCodec = misc.originalCodec;
                // The decode result of an mp3 sample is 1152 PCM samples
                meta.refSampleDuration = 1152 / meta.audioSampleRate * meta.timescale;
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed MPEG Audio Frame Header');
                this._audioInitialMetadataDispatched = true;
                this._onTrackMetadata('audio', meta);
                var mi = this._mediaInfo;
                mi.audioCodec = meta.codec;
                mi.audioSampleRate = meta.audioSampleRate;
                mi.audioChannelCount = meta.channelCount;
                mi.audioDataRate = misc.bitRate;
                if (mi.hasVideo) {
                    if (mi.videoCodec != null) {
                        mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                    }
                }
                else {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.audioCodec + '"';
                }
                if (mi.isComplete()) {
                    this._onMediaInfo(mi);
                }
            }
            // This packet is always a valid audio packet, extract it
            var data = this._parseMP3AudioData(arrayBuffer, dataOffset + 1, dataSize - 1, false);
            if (data == undefined) {
                return;
            }
            var dts = this._timestampBase + tagTimestamp;
            var mp3Sample = { unit: data, length: data.byteLength, dts: dts, pts: dts };
            track.samples.push(mp3Sample);
            track.length += data.length;
        }
    };
    FLVDemuxer.prototype._parseAACAudioData = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize <= 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid AAC packet, missing AACPacketType or/and Data!');
            return;
        }
        var result = {};
        var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
        result.packetType = array[0];
        if (array[0] === 0) {
            result.data = this._parseAACAudioSpecificConfig(arrayBuffer, dataOffset + 1, dataSize - 1);
        }
        else {
            result.data = array.subarray(1);
        }
        return result;
    };
    FLVDemuxer.prototype._parseAACAudioSpecificConfig = function (arrayBuffer, dataOffset, dataSize) {
        var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
        var config = null;
        /* Audio Object Type:
           0: Null
           1: AAC Main
           2: AAC LC
           3: AAC SSR (Scalable Sample Rate)
           4: AAC LTP (Long Term Prediction)
           5: HE-AAC / SBR (Spectral Band Replication)
           6: AAC Scalable
        */
        var audioObjectType = 0;
        var originalAudioObjectType = 0;
        var audioExtensionObjectType = null;
        var samplingIndex = 0;
        var extensionSamplingIndex = null;
        // 5 bits
        audioObjectType = originalAudioObjectType = array[0] >>> 3;
        // 4 bits
        samplingIndex = ((array[0] & 0x07) << 1) | (array[1] >>> 7);
        if (samplingIndex < 0 || samplingIndex >= this._mpegSamplingRates.length) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: AAC invalid sampling frequency index!');
            return;
        }
        var samplingFrequence = this._mpegSamplingRates[samplingIndex];
        // 4 bits
        var channelConfig = (array[1] & 0x78) >>> 3;
        if (channelConfig < 0 || channelConfig >= 8) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: AAC invalid channel configuration');
            return;
        }
        if (audioObjectType === 5) { // HE-AAC?
            // 4 bits
            extensionSamplingIndex = ((array[1] & 0x07) << 1) | (array[2] >>> 7);
            // 5 bits
            audioExtensionObjectType = (array[2] & 0x7C) >>> 2;
        }
        // workarounds for various browsers
        var userAgent = self.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('firefox') !== -1) {
            // firefox: use SBR (HE-AAC) if freq less than 24kHz
            if (samplingIndex >= 6) {
                audioObjectType = 5;
                config = new Array(4);
                extensionSamplingIndex = samplingIndex - 3;
            }
            else { // use LC-AAC
                audioObjectType = 2;
                config = new Array(2);
                extensionSamplingIndex = samplingIndex;
            }
        }
        else if (userAgent.indexOf('android') !== -1) {
            // android: always use LC-AAC
            audioObjectType = 2;
            config = new Array(2);
            extensionSamplingIndex = samplingIndex;
        }
        else {
            // for other browsers, e.g. chrome...
            // Always use HE-AAC to make it easier to switch aac codec profile
            audioObjectType = 5;
            extensionSamplingIndex = samplingIndex;
            config = new Array(4);
            if (samplingIndex >= 6) {
                extensionSamplingIndex = samplingIndex - 3;
            }
            else if (channelConfig === 1) { // Mono channel
                audioObjectType = 2;
                config = new Array(2);
                extensionSamplingIndex = samplingIndex;
            }
        }
        config[0] = audioObjectType << 3;
        config[0] |= (samplingIndex & 0x0F) >>> 1;
        config[1] = (samplingIndex & 0x0F) << 7;
        config[1] |= (channelConfig & 0x0F) << 3;
        if (audioObjectType === 5) {
            config[1] |= ((extensionSamplingIndex & 0x0F) >>> 1);
            config[2] = (extensionSamplingIndex & 0x01) << 7;
            // extended audio object type: force to 2 (LC-AAC)
            config[2] |= (2 << 2);
            config[3] = 0;
        }
        return {
            config: config,
            samplingRate: samplingFrequence,
            channelCount: channelConfig,
            codec: 'mp4a.40.' + audioObjectType,
            originalCodec: 'mp4a.40.' + originalAudioObjectType
        };
    };
    FLVDemuxer.prototype._parseMP3AudioData = function (arrayBuffer, dataOffset, dataSize, requestHeader) {
        if (dataSize < 4) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid MP3 packet, header missing!');
            return;
        }
        var le = this._littleEndian;
        var array = new Uint8Array(arrayBuffer, dataOffset, dataSize);
        var result = null;
        if (requestHeader) {
            if (array[0] !== 0xFF) {
                return;
            }
            var ver = (array[1] >>> 3) & 0x03;
            var layer = (array[1] & 0x06) >> 1;
            var bitrate_index = (array[2] & 0xF0) >>> 4;
            var sampling_freq_index = (array[2] & 0x0C) >>> 2;
            var channel_mode = (array[3] >>> 6) & 0x03;
            var channel_count = channel_mode !== 3 ? 2 : 1;
            var sample_rate = 0;
            var bit_rate = 0;
            var object_type = 34; // Layer-3, listed in MPEG-4 Audio Object Types
            var codec = 'mp3';
            switch (ver) {
                case 0: // MPEG 2.5
                    sample_rate = this._mpegAudioV25SampleRateTable[sampling_freq_index];
                    break;
                case 2: // MPEG 2
                    sample_rate = this._mpegAudioV20SampleRateTable[sampling_freq_index];
                    break;
                case 3: // MPEG 1
                    sample_rate = this._mpegAudioV10SampleRateTable[sampling_freq_index];
                    break;
            }
            switch (layer) {
                case 1: // Layer 3
                    object_type = 34;
                    if (bitrate_index < this._mpegAudioL3BitRateTable.length) {
                        bit_rate = this._mpegAudioL3BitRateTable[bitrate_index];
                    }
                    break;
                case 2: // Layer 2
                    object_type = 33;
                    if (bitrate_index < this._mpegAudioL2BitRateTable.length) {
                        bit_rate = this._mpegAudioL2BitRateTable[bitrate_index];
                    }
                    break;
                case 3: // Layer 1
                    object_type = 32;
                    if (bitrate_index < this._mpegAudioL1BitRateTable.length) {
                        bit_rate = this._mpegAudioL1BitRateTable[bitrate_index];
                    }
                    break;
            }
            result = {
                bitRate: bit_rate,
                samplingRate: sample_rate,
                channelCount: channel_count,
                codec: codec,
                originalCodec: codec
            };
        }
        else {
            result = array;
        }
        return result;
    };
    FLVDemuxer.prototype._parseVideoData = function (arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition) {
        if (dataSize <= 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid video packet, missing VideoData payload!');
            return;
        }
        if (this._hasVideoFlagOverrided === true && this._hasVideo === false) {
            // If hasVideo: false indicated explicitly in MediaDataSource,
            // Ignore all the video packets
            return;
        }
        var spec = (new Uint8Array(arrayBuffer, dataOffset, dataSize))[0];
        var frameType = (spec & 240) >>> 4;
        var codecId = spec & 15;
        if (codecId !== 7) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + codecId);
            return;
        }
        this._parseAVCVideoPacket(arrayBuffer, dataOffset + 1, dataSize - 1, tagTimestamp, tagPosition, frameType);
    };
    FLVDemuxer.prototype._parseAVCVideoPacket = function (arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType) {
        if (dataSize < 4) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime');
            return;
        }
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var packetType = v.getUint8(0);
        var cts_unsigned = v.getUint32(0, !le) & 0x00FFFFFF;
        var cts = (cts_unsigned << 8) >> 8; // convert to 24-bit signed int
        if (packetType === 0) { // AVCDecoderConfigurationRecord
            this._parseAVCDecoderConfigurationRecord(arrayBuffer, dataOffset + 4, dataSize - 4);
        }
        else if (packetType === 1) { // One or more Nalus
            this._parseAVCVideoData(arrayBuffer, dataOffset + 4, dataSize - 4, tagTimestamp, tagPosition, frameType, cts);
        }
        else if (packetType === 2) {
            // empty, AVC end of sequence
        }
        else {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, "Flv: Invalid video packet type " + packetType);
            return;
        }
    };
    FLVDemuxer.prototype._parseAVCDecoderConfigurationRecord = function (arrayBuffer, dataOffset, dataSize) {
        if (dataSize < 7) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Flv: Invalid AVCDecoderConfigurationRecord, lack of data!');
            return;
        }
        var meta = this._videoMetadata;
        var track = this._videoTrack;
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        if (!meta) {
            if (this._hasVideo === false && this._hasVideoFlagOverrided === false) {
                this._hasVideo = true;
                this._mediaInfo.hasVideo = true;
            }
            meta = this._videoMetadata = {};
            meta.type = 'video';
            meta.id = track.id;
            meta.timescale = this._timescale;
            meta.duration = this._duration;
        }
        else {
            if (typeof meta.avcc !== 'undefined') {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, 'Found another AVCDecoderConfigurationRecord!');
            }
        }
        var version = v.getUint8(0); // configurationVersion
        var avcProfile = v.getUint8(1); // avcProfileIndication
        var profileCompatibility = v.getUint8(2); // profile_compatibility
        var avcLevel = v.getUint8(3); // AVCLevelIndication
        if (version !== 1 || avcProfile === 0) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord');
            return;
        }
        this._naluLengthSize = (v.getUint8(4) & 3) + 1; // lengthSizeMinusOne
        if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) { // holy shit!!!
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1));
            return;
        }
        var spsCount = v.getUint8(5) & 31; // numOfSequenceParameterSets
        if (spsCount === 0) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord: No SPS');
            return;
        }
        else if (spsCount > 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: SPS Count = " + spsCount);
        }
        var offset = 6;
        for (var i = 0; i < spsCount; i++) {
            var len = v.getUint16(offset, !le); // sequenceParameterSetLength
            offset += 2;
            if (len === 0) {
                continue;
            }
            // Notice: Nalu without startcode header (00 00 00 01)
            var sps = new Uint8Array(arrayBuffer, dataOffset + offset, len);
            offset += len;
            var config = _sps_parser_js__WEBPACK_IMPORTED_MODULE_2__.default.parseSPS(sps);
            if (i !== 0) {
                // ignore other sps's config
                continue;
            }
            meta.codecWidth = config.codec_size.width;
            meta.codecHeight = config.codec_size.height;
            meta.presentWidth = config.present_size.width;
            meta.presentHeight = config.present_size.height;
            meta.profile = config.profile_string;
            meta.level = config.level_string;
            meta.bitDepth = config.bit_depth;
            meta.chromaFormat = config.chroma_format;
            meta.sarRatio = config.sar_ratio;
            meta.frameRate = config.frame_rate;
            if (config.frame_rate.fixed === false ||
                config.frame_rate.fps_num === 0 ||
                config.frame_rate.fps_den === 0) {
                meta.frameRate = this._referenceFrameRate;
            }
            var fps_den = meta.frameRate.fps_den;
            var fps_num = meta.frameRate.fps_num;
            meta.refSampleDuration = meta.timescale * (fps_den / fps_num);
            var codecArray = sps.subarray(1, 4);
            var codecString = 'avc1.';
            for (var j = 0; j < 3; j++) {
                var h = codecArray[j].toString(16);
                if (h.length < 2) {
                    h = '0' + h;
                }
                codecString += h;
            }
            meta.codec = codecString;
            var mi = this._mediaInfo;
            mi.width = meta.codecWidth;
            mi.height = meta.codecHeight;
            mi.fps = meta.frameRate.fps;
            mi.profile = meta.profile;
            mi.level = meta.level;
            mi.refFrames = config.ref_frames;
            mi.chromaFormat = config.chroma_format_string;
            mi.sarNum = meta.sarRatio.width;
            mi.sarDen = meta.sarRatio.height;
            mi.videoCodec = codecString;
            if (mi.hasAudio) {
                if (mi.audioCodec != null) {
                    mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + ',' + mi.audioCodec + '"';
                }
            }
            else {
                mi.mimeType = 'video/x-flv; codecs="' + mi.videoCodec + '"';
            }
            if (mi.isComplete()) {
                this._onMediaInfo(mi);
            }
        }
        var ppsCount = v.getUint8(offset); // numOfPictureParameterSets
        if (ppsCount === 0) {
            this._onError(_demux_errors_js__WEBPACK_IMPORTED_MODULE_3__.default.FORMAT_ERROR, 'Flv: Invalid AVCDecoderConfigurationRecord: No PPS');
            return;
        }
        else if (ppsCount > 1) {
            _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Flv: Strange AVCDecoderConfigurationRecord: PPS Count = " + ppsCount);
        }
        offset++;
        for (var i = 0; i < ppsCount; i++) {
            var len = v.getUint16(offset, !le); // pictureParameterSetLength
            offset += 2;
            if (len === 0) {
                continue;
            }
            // pps is useless for extracting video information
            offset += len;
        }
        meta.avcc = new Uint8Array(dataSize);
        meta.avcc.set(new Uint8Array(arrayBuffer, dataOffset, dataSize), 0);
        _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.v(this.TAG, 'Parsed AVCDecoderConfigurationRecord');
        if (this._isInitialMetadataDispatched()) {
            // flush parsed frames
            if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
                this._onDataAvailable(this._audioTrack, this._videoTrack);
            }
        }
        else {
            this._videoInitialMetadataDispatched = true;
        }
        // notify new metadata
        this._dispatch = false;
        this._onTrackMetadata('video', meta);
    };
    FLVDemuxer.prototype._parseAVCVideoData = function (arrayBuffer, dataOffset, dataSize, tagTimestamp, tagPosition, frameType, cts) {
        var le = this._littleEndian;
        var v = new DataView(arrayBuffer, dataOffset, dataSize);
        var units = [], length = 0;
        var offset = 0;
        var lengthSize = this._naluLengthSize;
        var dts = this._timestampBase + tagTimestamp;
        var keyframe = (frameType === 1); // from FLV Frame Type constants
        while (offset < dataSize) {
            if (offset + 4 >= dataSize) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Malformed Nalu near timestamp " + dts + ", offset = " + offset + ", dataSize = " + dataSize);
                break; // data not enough for next Nalu
            }
            // Nalu with length-header (AVC1)
            var naluSize = v.getUint32(offset, !le); // Big-Endian read
            if (lengthSize === 3) {
                naluSize >>>= 8;
            }
            if (naluSize > dataSize - lengthSize) {
                _utils_logger_js__WEBPACK_IMPORTED_MODULE_0__.default.w(this.TAG, "Malformed Nalus near timestamp " + dts + ", NaluSize > DataSize!");
                return;
            }
            var unitType = v.getUint8(offset + lengthSize) & 0x1F;
            if (unitType === 5) { // IDR
                keyframe = true;
            }
            var data = new Uint8Array(arrayBuffer, dataOffset + offset, lengthSize + naluSize);
            var unit = { type: unitType, data: data };
            units.push(unit);
            length += data.byteLength;
            offset += lengthSize + naluSize;
        }
        if (units.length) {
            var track = this._videoTrack;
            var avcSample = {
                units: units,
                length: length,
                isKeyframe: keyframe,
                dts: dts,
                cts: cts,
                pts: (dts + cts)
            };
            if (keyframe) {
                avcSample.fileposition = tagPosition;
            }
            track.samples.push(avcSample);
            track.length += length;
        }
    };
    return FLVDemuxer;
}());
/* harmony default export */ __webpack_exports__["default"] = (FLVDemuxer);


/***/ }),

/***/ "./src/demux/sps-parser.js":
/*!*********************************!*\
  !*** ./src/demux/sps-parser.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _exp_golomb_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exp-golomb.js */ "./src/demux/exp-golomb.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var SPSParser = /** @class */ (function () {
    function SPSParser() {
    }
    SPSParser._ebsp2rbsp = function (uint8array) {
        var src = uint8array;
        var src_length = src.byteLength;
        var dst = new Uint8Array(src_length);
        var dst_idx = 0;
        for (var i = 0; i < src_length; i++) {
            if (i >= 2) {
                // Unescape: Skip 0x03 after 00 00
                if (src[i] === 0x03 && src[i - 1] === 0x00 && src[i - 2] === 0x00) {
                    continue;
                }
            }
            dst[dst_idx] = src[i];
            dst_idx++;
        }
        return new Uint8Array(dst.buffer, 0, dst_idx);
    };
    SPSParser.parseSPS = function (uint8array) {
        var rbsp = SPSParser._ebsp2rbsp(uint8array);
        var gb = new _exp_golomb_js__WEBPACK_IMPORTED_MODULE_0__.default(rbsp);
        gb.readByte();
        var profile_idc = gb.readByte(); // profile_idc
        gb.readByte(); // constraint_set_flags[5] + reserved_zero[3]
        var level_idc = gb.readByte(); // level_idc
        gb.readUEG(); // seq_parameter_set_id
        var profile_string = SPSParser.getProfileString(profile_idc);
        var level_string = SPSParser.getLevelString(level_idc);
        var chroma_format_idc = 1;
        var chroma_format = 420;
        var chroma_format_table = [0, 420, 422, 444];
        var bit_depth = 8;
        if (profile_idc === 100 || profile_idc === 110 || profile_idc === 122 ||
            profile_idc === 244 || profile_idc === 44 || profile_idc === 83 ||
            profile_idc === 86 || profile_idc === 118 || profile_idc === 128 ||
            profile_idc === 138 || profile_idc === 144) {
            chroma_format_idc = gb.readUEG();
            if (chroma_format_idc === 3) {
                gb.readBits(1); // separate_colour_plane_flag
            }
            if (chroma_format_idc <= 3) {
                chroma_format = chroma_format_table[chroma_format_idc];
            }
            bit_depth = gb.readUEG() + 8; // bit_depth_luma_minus8
            gb.readUEG(); // bit_depth_chroma_minus8
            gb.readBits(1); // qpprime_y_zero_transform_bypass_flag
            if (gb.readBool()) { // seq_scaling_matrix_present_flag
                var scaling_list_count = (chroma_format_idc !== 3) ? 8 : 12;
                for (var i = 0; i < scaling_list_count; i++) {
                    if (gb.readBool()) { // seq_scaling_list_present_flag
                        if (i < 6) {
                            SPSParser._skipScalingList(gb, 16);
                        }
                        else {
                            SPSParser._skipScalingList(gb, 64);
                        }
                    }
                }
            }
        }
        gb.readUEG(); // log2_max_frame_num_minus4
        var pic_order_cnt_type = gb.readUEG();
        if (pic_order_cnt_type === 0) {
            gb.readUEG(); // log2_max_pic_order_cnt_lsb_minus_4
        }
        else if (pic_order_cnt_type === 1) {
            gb.readBits(1); // delta_pic_order_always_zero_flag
            gb.readSEG(); // offset_for_non_ref_pic
            gb.readSEG(); // offset_for_top_to_bottom_field
            var num_ref_frames_in_pic_order_cnt_cycle = gb.readUEG();
            for (var i = 0; i < num_ref_frames_in_pic_order_cnt_cycle; i++) {
                gb.readSEG(); // offset_for_ref_frame
            }
        }
        var ref_frames = gb.readUEG(); // max_num_ref_frames
        gb.readBits(1); // gaps_in_frame_num_value_allowed_flag
        var pic_width_in_mbs_minus1 = gb.readUEG();
        var pic_height_in_map_units_minus1 = gb.readUEG();
        var frame_mbs_only_flag = gb.readBits(1);
        if (frame_mbs_only_flag === 0) {
            gb.readBits(1); // mb_adaptive_frame_field_flag
        }
        gb.readBits(1); // direct_8x8_inference_flag
        var frame_crop_left_offset = 0;
        var frame_crop_right_offset = 0;
        var frame_crop_top_offset = 0;
        var frame_crop_bottom_offset = 0;
        var frame_cropping_flag = gb.readBool();
        if (frame_cropping_flag) {
            frame_crop_left_offset = gb.readUEG();
            frame_crop_right_offset = gb.readUEG();
            frame_crop_top_offset = gb.readUEG();
            frame_crop_bottom_offset = gb.readUEG();
        }
        var sar_width = 1, sar_height = 1;
        var fps = 0, fps_fixed = true, fps_num = 0, fps_den = 0;
        var vui_parameters_present_flag = gb.readBool();
        if (vui_parameters_present_flag) {
            if (gb.readBool()) { // aspect_ratio_info_present_flag
                var aspect_ratio_idc = gb.readByte();
                var sar_w_table = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
                var sar_h_table = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
                if (aspect_ratio_idc > 0 && aspect_ratio_idc < 16) {
                    sar_width = sar_w_table[aspect_ratio_idc - 1];
                    sar_height = sar_h_table[aspect_ratio_idc - 1];
                }
                else if (aspect_ratio_idc === 255) {
                    sar_width = gb.readByte() << 8 | gb.readByte();
                    sar_height = gb.readByte() << 8 | gb.readByte();
                }
            }
            if (gb.readBool()) { // overscan_info_present_flag
                gb.readBool(); // overscan_appropriate_flag
            }
            if (gb.readBool()) { // video_signal_type_present_flag
                gb.readBits(4); // video_format & video_full_range_flag
                if (gb.readBool()) { // colour_description_present_flag
                    gb.readBits(24); // colour_primaries & transfer_characteristics & matrix_coefficients
                }
            }
            if (gb.readBool()) { // chroma_loc_info_present_flag
                gb.readUEG(); // chroma_sample_loc_type_top_field
                gb.readUEG(); // chroma_sample_loc_type_bottom_field
            }
            if (gb.readBool()) { // timing_info_present_flag
                var num_units_in_tick = gb.readBits(32);
                var time_scale = gb.readBits(32);
                fps_fixed = gb.readBool(); // fixed_frame_rate_flag
                fps_num = time_scale;
                fps_den = num_units_in_tick * 2;
                fps = fps_num / fps_den;
            }
        }
        var sarScale = 1;
        if (sar_width !== 1 || sar_height !== 1) {
            sarScale = sar_width / sar_height;
        }
        var crop_unit_x = 0, crop_unit_y = 0;
        if (chroma_format_idc === 0) {
            crop_unit_x = 1;
            crop_unit_y = 2 - frame_mbs_only_flag;
        }
        else {
            var sub_wc = (chroma_format_idc === 3) ? 1 : 2;
            var sub_hc = (chroma_format_idc === 1) ? 2 : 1;
            crop_unit_x = sub_wc;
            crop_unit_y = sub_hc * (2 - frame_mbs_only_flag);
        }
        var codec_width = (pic_width_in_mbs_minus1 + 1) * 16;
        var codec_height = (2 - frame_mbs_only_flag) * ((pic_height_in_map_units_minus1 + 1) * 16);
        codec_width -= (frame_crop_left_offset + frame_crop_right_offset) * crop_unit_x;
        codec_height -= (frame_crop_top_offset + frame_crop_bottom_offset) * crop_unit_y;
        var present_width = Math.ceil(codec_width * sarScale);
        gb.destroy();
        gb = null;
        return {
            profile_string: profile_string,
            level_string: level_string,
            bit_depth: bit_depth,
            ref_frames: ref_frames,
            chroma_format: chroma_format,
            chroma_format_string: SPSParser.getChromaFormatString(chroma_format),
            frame_rate: {
                fixed: fps_fixed,
                fps: fps,
                fps_den: fps_den,
                fps_num: fps_num
            },
            sar_ratio: {
                width: sar_width,
                height: sar_height
            },
            codec_size: {
                width: codec_width,
                height: codec_height
            },
            present_size: {
                width: present_width,
                height: codec_height
            }
        };
    };
    SPSParser._skipScalingList = function (gb, count) {
        var last_scale = 8, next_scale = 8;
        var delta_scale = 0;
        for (var i = 0; i < count; i++) {
            if (next_scale !== 0) {
                delta_scale = gb.readSEG();
                next_scale = (last_scale + delta_scale + 256) % 256;
            }
            last_scale = (next_scale === 0) ? last_scale : next_scale;
        }
    };
    SPSParser.getProfileString = function (profile_idc) {
        switch (profile_idc) {
            case 66:
                return 'Baseline';
            case 77:
                return 'Main';
            case 88:
                return 'Extended';
            case 100:
                return 'High';
            case 110:
                return 'High10';
            case 122:
                return 'High422';
            case 244:
                return 'High444';
            default:
                return 'Unknown';
        }
    };
    SPSParser.getLevelString = function (level_idc) {
        return (level_idc / 10).toFixed(1);
    };
    SPSParser.getChromaFormatString = function (chroma) {
        switch (chroma) {
            case 420:
                return '4:2:0';
            case 422:
                return '4:2:2';
            case 444:
                return '4:4:4';
            default:
                return 'Unknown';
        }
    };
    return SPSParser;
}());
/* harmony default export */ __webpack_exports__["default"] = (SPSParser);


/***/ }),

/***/ "./src/flv.js":
/*!********************!*\
  !*** ./src/flv.js ***!
  \********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/polyfill.js */ "./src/utils/polyfill.js");
/* harmony import */ var _core_features_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/features.js */ "./src/core/features.js");
/* harmony import */ var _io_loader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./io/loader.js */ "./src/io/loader.js");
/* harmony import */ var _player_flv_player_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./player/flv-player.js */ "./src/player/flv-player.js");
/* harmony import */ var _player_native_player_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./player/native-player.js */ "./src/player/native-player.js");
/* harmony import */ var _player_player_events_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./player/player-events.js */ "./src/player/player-events.js");
/* harmony import */ var _player_player_errors_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./player/player-errors.js */ "./src/player/player-errors.js");
/* harmony import */ var _utils_logging_control_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/logging-control.js */ "./src/utils/logging-control.js");
/* harmony import */ var _utils_exception_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/exception.js */ "./src/utils/exception.js");
/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */








