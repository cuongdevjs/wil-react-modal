'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactDom = require('react-dom');

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function sleep(ms) {
  return new Promise(function (resolve) {
    var timeout = setTimeout(function () {
      resolve();
      clearTimeout(timeout);
    }, ms);
    return timeout;
  });
}

var Emitter =
/*#__PURE__*/
function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    _defineProperty(this, "events", {});
  }

  _createClass(Emitter, [{
    key: "emit",
    value: function emit(type, data) {
      if (this.events[type]) {
        this.events[type].forEach(function (_ref) {
          var listener = _ref.listener;
          listener(data);
        });
      }
    }
  }, {
    key: "on",
    value: function on(type, listener) {
      var date = new Date();
      var token = date.getTime();
      this.events = _objectSpread2({}, this.events, _defineProperty({}, type, [].concat(_toConsumableArray(this.events[type] || []), [{
        listener: listener,
        token: token
      }])));
      return token;
    }
  }, {
    key: "once",
    value: function once(type, listener) {
      var date = new Date();
      var token = date.getTime();
      this.events = _objectSpread2({}, this.events, _defineProperty({}, type, [{
        listener: listener,
        token: token
      }]));
      return token;
    }
  }, {
    key: "off",
    value: function off(token) {
      var _this = this;

      this.events = Object.keys(this.events).reduce(function (obj, key) {
        return _objectSpread2({}, obj, _defineProperty({}, key, _this.events[key].filter(function (item) {
          return item.token !== token;
        })));
      }, {});
    }
  }, {
    key: "offReference",
    value: function offReference(type, listener) {
      if (this.events[type]) {
        this.events[type] = this.events[type].filter(function (item) {
          return item.listener !== listener;
        });
      }
    }
  }, {
    key: "offEvent",
    value: function offEvent(type) {
      var _this2 = this;

      if (this.events[type]) {
        this.events = Object.keys(this.events).reduce(function (obj, key) {
          return _objectSpread2({}, obj, {}, key === type ? {} : _defineProperty({}, key, _this2.events[key]));
        }, {});
      }
    }
  }]);

  return Emitter;
}();

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles_modalContentWrapper__29wUF {\n  position: fixed;\n  overflow: hidden;\n  z-index: 10000;\n}\n\n.styles_fullScreen__ZQEF8 {\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.styles_modalContent__2s9Lt {\n  width: 100%;\n  height: 100%;\n}\n\n.styles_modalContentInner__19dn4 {\n  position: relative;\n  z-index: 10;\n  will-change: opacity, transform;\n  transition: all 0.3s ease;\n}\n\n.styles_underlay__1rSen {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 9;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n\n.styles_center__2Zkpe .styles_modalContent__2s9Lt {\n  position: relative;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  flex-wrap: wrap;\n}\n\n.styles_left__1QLwJ {\n  top: 0;\n  bottom: 0;\n  left: 0;\n}\n\n.styles_left__1QLwJ .styles_modalContent__2s9Lt {\n  display: flex;\n}\n\n.styles_left__1QLwJ .styles_modalContentInner__19dn4 {\n  height: 100%;\n}\n\n.styles_right__1THUQ {\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n\n.styles_right__1THUQ .styles_modalContent__2s9Lt {\n  display: flex;\n  justify-content: flex-end;\n  height: 100%;\n}\n\n.styles_right__1THUQ .styles_modalContentInner__19dn4 {\n  height: 100%;\n}\n\n.styles_top__1as09 {\n  top: 0;\n  left: 0;\n  right: 0;\n}\n\n.styles_top__1as09 .styles_modalContent__2s9Lt {\n  width: 100%;\n}\n\n.styles_bottom__1CYW9 {\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n.styles_bottom__1CYW9 .styles_modalContent__2s9Lt {\n  display: flex;\n  align-items: flex-end;\n}\n\n.styles_bottom__1CYW9 .styles_modalContentInner__19dn4 {\n  width: 100%;\n}\n\n.styles_fade__39lAn .styles_modalContentInner__19dn4 {\n  opacity: 0;\n}\n\n.styles_zoom__1MrWD .styles_modalContentInner__19dn4 {\n  opacity: 0;\n  transform: scale(0.6);\n}\n\n.styles_fadeLeft__21nsl .styles_modalContentInner__19dn4 {\n  opacity: 0;\n  transform: translate(-20vw, 0);\n}\n\n.styles_fadeRight__1yExP .styles_modalContentInner__19dn4 {\n  opacity: 0;\n  transform: translate(20vw, 0);\n}\n\n.styles_fadeUp__3HvN2 .styles_modalContentInner__19dn4 {\n  opacity: 0;\n  transform: translate(0, -20vh);\n}\n\n.styles_fadeDown__12VgQ .styles_modalContentInner__19dn4 {\n  opacity: 0;\n  transform: translate(0, 20vh);\n}\n\n.styles_slideLeft__22inw .styles_modalContentInner__19dn4 {\n  opacity: 0;\n  transform: translate(-20%, 0);\n}\n\n.styles_slideRight__1BvTu .styles_modalContentInner__19dn4 {\n  transform: translate(100%, 0);\n}\n\n.styles_slideUp__1qSUR .styles_modalContentInner__19dn4 {\n  transform: translate(0, -100%);\n}\n\n.styles_slideDown__-veIR .styles_modalContentInner__19dn4 {\n  transform: translate(0, 100%);\n}\n\n.styles_animated__eXIXQ.styles_fade__39lAn .styles_modalContentInner__19dn4 {\n  opacity: 1;\n}\n.styles_animated__eXIXQ.styles_zoom__1MrWD .styles_modalContentInner__19dn4 {\n  transform: scale(1);\n  opacity: 1;\n}\n\n.styles_animated__eXIXQ.styles_fadeLeft__21nsl .styles_modalContentInner__19dn4,\n.styles_animated__eXIXQ.styles_fadeRight__1yExP .styles_modalContentInner__19dn4,\n.styles_animated__eXIXQ.styles_fadeUp__3HvN2 .styles_modalContentInner__19dn4,\n.styles_animated__eXIXQ.styles_fadeDown__12VgQ .styles_modalContentInner__19dn4,\n.styles_animated__eXIXQ.styles_slideLeft__22inw .styles_modalContentInner__19dn4,\n.styles_animated__eXIXQ.styles_slideRight__1BvTu .styles_modalContentInner__19dn4,\n.styles_animated__eXIXQ.styles_slideUp__1qSUR .styles_modalContentInner__19dn4,\n.styles_animated__eXIXQ.styles_slideDown__-veIR .styles_modalContentInner__19dn4 {\n  opacity: 1;\n  transform: translate(0, 0);\n}\n\n.styles_animated__eXIXQ .styles_underlay__1rSen {\n  opacity: 1;\n}\n";
var styles = {"modalContentWrapper":"styles_modalContentWrapper__29wUF","fullScreen":"styles_fullScreen__ZQEF8","modalContent":"styles_modalContent__2s9Lt","modalContentInner":"styles_modalContentInner__19dn4","underlay":"styles_underlay__1rSen","center":"styles_center__2Zkpe","left":"styles_left__1QLwJ","right":"styles_right__1THUQ","top":"styles_top__1as09","bottom":"styles_bottom__1CYW9","fade":"styles_fade__39lAn","zoom":"styles_zoom__1MrWD","fadeLeft":"styles_fadeLeft__21nsl","fadeRight":"styles_fadeRight__1yExP","fadeUp":"styles_fadeUp__3HvN2","fadeDown":"styles_fadeDown__12VgQ","slideLeft":"styles_slideLeft__22inw","slideRight":"styles_slideRight__1BvTu","slideUp":"styles_slideUp__1qSUR","slideDown":"styles_slideDown__-veIR","animated":"styles_animated__eXIXQ"};
styleInject(css);

var Event = new Emitter();

var Modal =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Modal, _PureComponent);

  function Modal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Modal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isAnimated: false,
      isVisible: false,
      modalId: 0,
      scrollBarContentWidth: 0
    });

    _defineProperty(_assertThisInitialized(_this), "_open", void 0);

    _defineProperty(_assertThisInitialized(_this), "_close", void 0);

    _defineProperty(_assertThisInitialized(_this), "_modalContent", void 0);

    _defineProperty(_assertThisInitialized(_this), "_setModalContentRef", function (c) {
      _this._modalContent = c;
    });

    _defineProperty(_assertThisInitialized(_this), "_setVisibleModalWithPropVisible", function (type) {
      var isVisible = _this.props.isVisible;

      if (isVisible) {
        type !== "close" && _this._handleOpenModal();
      } else {
        type !== "open" && _this._handleCloseModal();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_setModalVisible",
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee(value) {
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.setState({
                  isVisible: value
                });

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_setModalAnimated",
    /*#__PURE__*/
    function () {
      var _ref2 = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee2(value) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _this.setState({
                  isAnimated: value
                });

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x2) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_setModalId",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee3() {
      var date;
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              date = new Date();
              _context3.next = 3;
              return _this.setState({
                modalId: date.getTime()
              });

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));

    _defineProperty(_assertThisInitialized(_this), "_handleEventOpen",
    /*#__PURE__*/
    function () {
      var _ref5 = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee4(_ref4) {
        var _displayName, payload, displayName;

        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _displayName = _ref4.displayName, payload = _ref4.payload;
                displayName = _this.props.displayName;

                if (!(_displayName === displayName)) {
                  _context4.next = 6;
                  break;
                }

                _context4.next = 5;
                return _this._setModalVisible(true);

              case 5:
                _this._handleOpenModal(payload);

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x3) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_handleEventClose",
    /*#__PURE__*/
    function () {
      var _ref6 = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee5(_displayName) {
        var displayName;
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                displayName = _this.props.displayName;

                if (_displayName === displayName) {
                  _this._handleCloseModal();
                }

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x4) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_setScrollBarOverflow", function (overflow, paddingRight) {
      var scrollTarget = _this.props.scrollTarget;
      var $scrollTarget = scrollTarget === "window" ? document.body : document.querySelector(scrollTarget);

      if ($scrollTarget) {
        $scrollTarget.style.overflow = overflow;
        $scrollTarget.style.paddingRight = !!paddingRight ? "".concat(paddingRight, "px") : "";
      }
    });

    _defineProperty(_assertThisInitialized(_this), "_getScrollBarWidth", function (scrollTarget) {
      if (!scrollTarget) {
        return 0;
      }

      if (scrollTarget === "window") {
        return document.documentElement ? window.innerWidth - document.documentElement.clientWidth : 0;
      }

      if (scrollTarget instanceof Node) {
        return scrollTarget.offsetWidth - scrollTarget.clientWidth;
      }

      var $scrollTarget = document.querySelector(scrollTarget);
      return $scrollTarget ? $scrollTarget.offsetWidth - $scrollTarget.clientWidth : 0;
    });

    _defineProperty(_assertThisInitialized(_this), "_getLengthModals", function () {
      var $modals = _toConsumableArray(document.querySelectorAll("[id^='__wil_modal_']"));

      return $modals.filter(function ($modal) {
        return !!$modal && $modal.getAttribute("data-static") !== "true";
      }).length;
    });

    _defineProperty(_assertThisInitialized(_this), "_handleOpenModal",
    /*#__PURE__*/
    function () {
      var _ref7 = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee6(payload) {
        var _this$props, scrollTargetEnabled, onOpen, onOpenEnd, animationType, scrollTarget;

        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _this$props = _this.props, scrollTargetEnabled = _this$props.scrollTargetEnabled, onOpen = _this$props.onOpen, onOpenEnd = _this$props.onOpenEnd, animationType = _this$props.animationType, scrollTarget = _this$props.scrollTarget;
                _context6.next = 3;
                return _this._setModalId();

              case 3:
                if (_this._getLengthModals() === 1 && !scrollTargetEnabled) {
                  _this._setScrollBarOverflow("hidden", _this._getScrollBarWidth(scrollTarget));
                }

                _context6.next = 6;
                return _this._setModalVisible(true);

              case 6:
                onOpen(payload);
                _context6.next = 9;
                return sleep(animationType === "none" ? 0 : 50);

              case 9:
                _context6.next = 11;
                return _this._setModalAnimated(true);

              case 11:
                _this.setState({
                  scrollBarContentWidth: _this._getScrollBarWidth(_this._modalContent)
                });

                _context6.next = 14;
                return sleep(animationType === "none" ? 0 : 300);

              case 14:
                onOpenEnd(payload);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x5) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "_handleCloseModal",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regenerator.mark(function _callee7() {
      var _this$props2, scrollTargetEnabled, animationType, onCloseEnd;

      return regenerator.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _this$props2 = _this.props, scrollTargetEnabled = _this$props2.scrollTargetEnabled, animationType = _this$props2.animationType, onCloseEnd = _this$props2.onCloseEnd;
              _context7.next = 3;
              return _this._setModalAnimated(false);

            case 3:
              _context7.next = 5;
              return sleep(animationType === "none" ? 0 : 300);

            case 5:
              if (_this._getLengthModals() === 1 && !scrollTargetEnabled) {
                _this._setScrollBarOverflow("", 0);
              }

              _context7.next = 8;
              return _this._setModalVisible(false);

            case 8:
              onCloseEnd();

            case 9:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));

    _defineProperty(_assertThisInitialized(_this), "_renderModalPortal", function () {
      var scrollTargetEnabled = _this.props.scrollTargetEnabled;
      var _this$state = _this.state,
          modalId = _this$state.modalId,
          isVisible = _this$state.isVisible;

      if (!isVisible) {
        return null;
      }

      return reactDom.createPortal(React__default.createElement("div", {
        id: "__wil_modal_".concat(modalId, "__"),
        "data-static": scrollTargetEnabled
      }, _this._renderModal()), document.body);
    });

    _defineProperty(_assertThisInitialized(_this), "_renderUnderlay", function () {
      var _this$props3 = _this.props,
          underlayColor = _this$props3.underlayColor,
          underlayEnabled = _this$props3.underlayEnabled,
          animationType = _this$props3.animationType;
      var scrollBarContentWidth = _this.state.scrollBarContentWidth;

      if (!underlayEnabled) {
        return null;
      }

      return React__default.createElement("div", {
        className: styles.underlay,
        style: _objectSpread2({
          backgroundColor: underlayColor,
          right: !!scrollBarContentWidth ? scrollBarContentWidth : 0
        }, animationType === "none" ? {
          transition: "none"
        } : {}),
        role: "presentation",
        onClick: _this._handleCloseModal
      });
    });

    _defineProperty(_assertThisInitialized(_this), "_renderModal", function () {
      var _this$props4 = _this.props,
          children = _this$props4.children,
          underlayEnabled = _this$props4.underlayEnabled,
          placement = _this$props4.placement,
          animationType = _this$props4.animationType,
          fullScreen = _this$props4.fullScreen;
      var isAnimated = _this.state.isAnimated;
      var isCenter = placement === "center";
      var fullScreenClassName = underlayEnabled || isCenter ? styles.fullScreen : "";
      var animatedClassName = isAnimated ? styles.animated : "";
      return React__default.createElement("div", {
        className: "".concat(styles.modalContentWrapper, " ").concat(styles[placement], " ").concat(animatedClassName, " ").concat(styles[animationType], " ").concat(fullScreenClassName).trim()
      }, React__default.createElement("div", {
        ref: _this._setModalContentRef,
        className: styles.modalContent,
        style: isAnimated ? {
          overflow: "hidden auto"
        } : {}
      }, _this._renderUnderlay(), React__default.createElement("div", {
        className: styles.modalContentInner,
        style: _objectSpread2({}, fullScreen ? {
          width: "100%",
          height: "100%"
        } : {}, {}, animationType === "none" ? {
          transition: "none"
        } : {})
      }, children)));
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee8() {
        var displayName;
        return regenerator.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                displayName = this.props.displayName;
                this._open = Event.once("".concat(displayName, "_open"), this._handleEventOpen);
                this._close = Event.once("".concat(displayName, "_close"), this._handleEventClose);

                this._setVisibleModalWithPropVisible("open");

              case 4:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function () {
      var _componentDidUpdate = _asyncToGenerator(
      /*#__PURE__*/
      regenerator.mark(function _callee9(prevProps) {
        var isVisible;
        return regenerator.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                isVisible = this.props.isVisible;

                if (prevProps.isVisible !== isVisible) {
                  this._setVisibleModalWithPropVisible("all");
                }

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function componentDidUpdate(_x6) {
        return _componentDidUpdate.apply(this, arguments);
      }

      return componentDidUpdate;
    }()
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      Event.off(this._open);
      Event.off(this._close);
    }
  }, {
    key: "render",
    value: function render() {
      return this._renderModalPortal();
    }
  }]);

  return Modal;
}(React.PureComponent);

_defineProperty(Modal, "defaultProps", {
  onOpen: function onOpen(payload) {},
  onOpenEnd: function onOpenEnd(payload) {},
  onCloseEnd: function onCloseEnd() {},
  fullScreen: false,
  displayName: "",
  placement: "center",
  animationType: "none",
  scrollTarget: "window",
  underlayColor: "rgba(0, 0, 0, 0.5)",
  underlayEnabled: true,
  isVisible: false,
  scrollTargetEnabled: false
});

_defineProperty(Modal, "open", function (displayName, payload) {
  Event.emit("".concat(displayName, "_open"), {
    displayName: displayName,
    payload: payload
  });
});

_defineProperty(Modal, "close", function (displayName) {
  Event.emit("".concat(displayName, "_close"), displayName);
});

module.exports = Modal;
//# sourceMappingURL=index.js.map
