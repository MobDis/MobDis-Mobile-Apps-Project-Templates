/*!
 * jQuery JavaScript Library v1.4.4
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Thu Nov 11 19:04:53 2010 -0500
 */
(function(window, undefined){

    // Use the correct document accordingly with window argument (sandbox)
    var document = window.document;
    var jQuery = (function(){
    
        // Define a local copy of jQuery
        var jQuery = function(selector, context){
            // The jQuery object is actually just the init constructor 'enhanced'
            return new jQuery.fn.init(selector, context);
        },        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,        // Map over the $ in case of overwrite
        _$ = window.$,        // A central reference to the root jQuery(document)
        rootjQuery,        // A simple way to check for HTML strings or ID strings
        // (both of which we optimize for)
        quickExpr = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)$)/,        // Is it a simple selector
        isSimple = /^.[^:#\[\.,]*$/,        // Check if a string has a non-whitespace character in it
        rnotwhite = /\S/, rwhite = /\s/,        // Used for trimming whitespace
        trimLeft = /^\s+/, trimRight = /\s+$/,        // Check for non-word characters
        rnonword = /\W/,        // Check for digits
        rdigit = /\d/,        // Match a standalone tag
        rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,        // JSON RegExp
        rvalidchars = /^[\],:{}\s]*$/, rvalidescape = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rvalidtokens = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,        // Useragent RegExp
        rwebkit = /(webkit)[ \/]([\w.]+)/, ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/, rmsie = /(msie) ([\w.]+)/, rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,        // Keep a UserAgent string for use with jQuery.browser
        userAgent = navigator.userAgent,        // For matching the engine and version of the browser
        browserMatch,        // Has the ready events already been bound?
        readyBound = false,        // The functions to execute on DOM ready
        readyList = [],        // The ready event handler
        DOMContentLoaded,        // Save a reference to some core methods
        toString = Object.prototype.toString, hasOwn = Object.prototype.hasOwnProperty, push = Array.prototype.push, slice = Array.prototype.slice, trim = String.prototype.trim, indexOf = Array.prototype.indexOf,        // [[Class]] -> type pairs
        class2type = {};
        
        jQuery.fn = jQuery.prototype = {
            init: function(selector, context){
                var match, elem, ret, doc;
                
                // Handle $(""), $(null), or $(undefined)
                if (!selector) {
                    return this;
                }
                
                // Handle $(DOMElement)
                if (selector.nodeType) {
                    this.context = this[0] = selector;
                    this.length = 1;
                    return this;
                }
                
                // The body element only exists once, optimize finding it
                if (selector === "body" && !context && document.body) {
                    this.context = document;
                    this[0] = document.body;
                    this.selector = "body";
                    this.length = 1;
                    return this;
                }
                
                // Handle HTML strings
                if (typeof selector === "string") {
                    // Are we dealing with HTML string or an ID?
                    match = quickExpr.exec(selector);
                    
                    // Verify a match, and that no context was specified for #id
                    if (match && (match[1] || !context)) {
                    
                        // HANDLE: $(html) -> $(array)
                        if (match[1]) {
                            doc = (context ? context.ownerDocument || context : document);
                            
                            // If a single string is passed in and it's a single tag
                            // just do a createElement and skip the rest
                            ret = rsingleTag.exec(selector);
                            
                            if (ret) {
                                if (jQuery.isPlainObject(context)) {
                                    selector = [document.createElement(ret[1])];
                                    jQuery.fn.attr.call(selector, context, true);
                                    
                                }
                                else {
                                    selector = [doc.createElement(ret[1])];
                                }
                                
                            }
                            else {
                                ret = jQuery.buildFragment([match[1]], [doc]);
                                selector = (ret.cacheable ? ret.fragment.cloneNode(true) : ret.fragment).childNodes;
                            }
                            
                            return jQuery.merge(this, selector);
                            
                            // HANDLE: $("#id")
                        }
                        else {
                            elem = document.getElementById(match[2]);
                            
                            // Check parentNode to catch when Blackberry 4.6 returns
                            // nodes that are no longer in the document #6963
                            if (elem && elem.parentNode) {
                                // Handle the case where IE and Opera return items
                                // by name instead of ID
                                if (elem.id !== match[2]) {
                                    return rootjQuery.find(selector);
                                }
                                
                                // Otherwise, we inject the element directly into the jQuery object
                                this.length = 1;
                                this[0] = elem;
                            }
                            
                            this.context = document;
                            this.selector = selector;
                            return this;
                        }
                        
                        // HANDLE: $("TAG")
                    }
                    else 
                        if (!context && !rnonword.test(selector)) {
                            this.selector = selector;
                            this.context = document;
                            selector = document.getElementsByTagName(selector);
                            return jQuery.merge(this, selector);
                            
                        // HANDLE: $(expr, $(...))
                        }
                        else 
                            if (!context || context.jquery) {
                                return (context || rootjQuery).find(selector);
                                
                            // HANDLE: $(expr, context)
                            // (which is just equivalent to: $(context).find(expr)
                            }
                            else {
                                return jQuery(context).find(selector);
                            }
                    
                    // HANDLE: $(function)
                    // Shortcut for document ready
                }
                else 
                    if (jQuery.isFunction(selector)) {
                        return rootjQuery.ready(selector);
                    }
                
                if (selector.selector !== undefined) {
                    this.selector = selector.selector;
                    this.context = selector.context;
                }
                
                return jQuery.makeArray(selector, this);
            },
            
            // Start with an empty selector
            selector: "",
            
            // The current version of jQuery being used
            jquery: "1.4.4",
            
            // The default length of a jQuery object is 0
            length: 0,
            
            // The number of elements contained in the matched element set
            size: function(){
                return this.length;
            },
            
            toArray: function(){
                return slice.call(this, 0);
            },
            
            // Get the Nth element in the matched element set OR
            // Get the whole matched element set as a clean array
            get: function(num){
                return num == null ?                // Return a 'clean' array
                this.toArray() :                // Return just the object
                (num < 0 ? this.slice(num)[0] : this[num]);
            },
            
            // Take an array of elements and push it onto the stack
            // (returning the new matched element set)
            pushStack: function(elems, name, selector){
                // Build a new jQuery matched element set
                var ret = jQuery();
                
                if (jQuery.isArray(elems)) {
                    push.apply(ret, elems);
                    
                }
                else {
                    jQuery.merge(ret, elems);
                }
                
                // Add the old object onto the stack (as a reference)
                ret.prevObject = this;
                
                ret.context = this.context;
                
                if (name === "find") {
                    ret.selector = this.selector + (this.selector ? " " : "") + selector;
                }
                else 
                    if (name) {
                        ret.selector = this.selector + "." + name + "(" + selector + ")";
                    }
                
                // Return the newly-formed element set
                return ret;
            },
            
            // Execute a callback for every element in the matched set.
            // (You can seed the arguments with an array of args, but this is
            // only used internally.)
            each: function(callback, args){
                return jQuery.each(this, callback, args);
            },
            
            ready: function(fn){
                // Attach the listeners
                jQuery.bindReady();
                
                // If the DOM is already ready
                if (jQuery.isReady) {
                    // Execute the function immediately
                    fn.call(document, jQuery);
                    
                    // Otherwise, remember the function for later
                }
                else 
                    if (readyList) {
                        // Add the function to the wait list
                        readyList.push(fn);
                    }
                
                return this;
            },
            
            eq: function(i){
                return i === -1 ? this.slice(i) : this.slice(i, +i + 1);
            },
            
            first: function(){
                return this.eq(0);
            },
            
            last: function(){
                return this.eq(-1);
            },
            
            slice: function(){
                return this.pushStack(slice.apply(this, arguments), "slice", slice.call(arguments).join(","));
            },
            
            map: function(callback){
                return this.pushStack(jQuery.map(this, function(elem, i){
                    return callback.call(elem, i, elem);
                }));
            },
            
            end: function(){
                return this.prevObject || jQuery(null);
            },
            
            // For internal use only.
            // Behaves like an Array's method, not like a jQuery method.
            push: push,
            sort: [].sort,
            splice: [].splice
        };
        
        // Give the init function the jQuery prototype for later instantiation
        jQuery.fn.init.prototype = jQuery.fn;
        
        jQuery.extend = jQuery.fn.extend = function(){
            var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
            
            // Handle a deep copy situation
            if (typeof target === "boolean") {
                deep = target;
                target = arguments[1] || {};
                // skip the boolean and the target
                i = 2;
            }
            
            // Handle case when target is a string or something (possible in deep copy)
            if (typeof target !== "object" && !jQuery.isFunction(target)) {
                target = {};
            }
            
            // extend jQuery itself if only one argument is passed
            if (length === i) {
                target = this;
                --i;
            }
            
            for (; i < length; i++) {
                // Only deal with non-null/undefined values
                if ((options = arguments[i]) != null) {
                    // Extend the base object
                    for (name in options) {
                        src = target[name];
                        copy = options[name];
                        
                        // Prevent never-ending loop
                        if (target === copy) {
                            continue;
                        }
                        
                        // Recurse if we're merging plain objects or arrays
                        if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                            if (copyIsArray) {
                                copyIsArray = false;
                                clone = src && jQuery.isArray(src) ? src : [];
                                
                            }
                            else {
                                clone = src && jQuery.isPlainObject(src) ? src : {};
                            }
                            
                            // Never move original objects, clone them
                            target[name] = jQuery.extend(deep, clone, copy);
                            
                            // Don't bring in undefined values
                        }
                        else 
                            if (copy !== undefined) {
                                target[name] = copy;
                            }
                    }
                }
            }
            
            // Return the modified object
            return target;
        };
        
        jQuery.extend({
            noConflict: function(deep){
                window.$ = _$;
                
                if (deep) {
                    window.jQuery = _jQuery;
                }
                
                return jQuery;
            },
            
            // Is the DOM ready to be used? Set to true once it occurs.
            isReady: false,
            
            // A counter to track how many items to wait for before
            // the ready event fires. See #6781
            readyWait: 1,
            
            // Handle when the DOM is ready
            ready: function(wait){
                // A third-party is pushing the ready event forwards
                if (wait === true) {
                    jQuery.readyWait--;
                }
                
                // Make sure that the DOM is not already loaded
                if (!jQuery.readyWait || (wait !== true && !jQuery.isReady)) {
                    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                    if (!document.body) {
                        return setTimeout(jQuery.ready, 1);
                    }
                    
                    // Remember that the DOM is ready
                    jQuery.isReady = true;
                    
                    // If a normal DOM Ready event fired, decrement, and wait if need be
                    if (wait !== true && --jQuery.readyWait > 0) {
                        return;
                    }
                    
                    // If there are functions bound, to execute
                    if (readyList) {
                        // Execute all of them
                        var fn, i = 0, ready = readyList;
                        
                        // Reset the list of functions
                        readyList = null;
                        
                        while ((fn = ready[i++])) {
                            fn.call(document, jQuery);
                        }
                        
                        // Trigger any bound ready events
                        if (jQuery.fn.trigger) {
                            jQuery(document).trigger("ready").unbind("ready");
                        }
                    }
                }
            },
            
            bindReady: function(){
                if (readyBound) {
                    return;
                }
                
                readyBound = true;
                
                // Catch cases where $(document).ready() is called after the
                // browser event has already occurred.
                if (document.readyState === "complete") {
                    // Handle it asynchronously to allow scripts the opportunity to delay ready
                    return setTimeout(jQuery.ready, 1);
                }
                
                // Mozilla, Opera and webkit nightlies currently support this event
                if (document.addEventListener) {
                    // Use the handy event callback
                    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
                    
                    // A fallback to window.onload, that will always work
                    window.addEventListener("load", jQuery.ready, false);
                    
                    // If IE event model is used
                }
                else 
                    if (document.attachEvent) {
                        // ensure firing before onload,
                        // maybe late but safe also for iframes
                        document.attachEvent("onreadystatechange", DOMContentLoaded);
                        
                        // A fallback to window.onload, that will always work
                        window.attachEvent("onload", jQuery.ready);
                        
                        // If IE and not a frame
                        // continually check to see if the document is ready
                        var toplevel = false;
                        
                        try {
                            toplevel = window.frameElement == null;
                        } 
                        catch (e) {
                        }
                        
                        if (document.documentElement.doScroll && toplevel) {
                            doScrollCheck();
                        }
                    }
            },
            
            // See test/unit/core.js for details concerning isFunction.
            // Since version 1.3, DOM methods and functions like alert
            // aren't supported. They return false on IE (#2968).
            isFunction: function(obj){
                return jQuery.type(obj) === "function";
            },
            
            isArray: Array.isArray ||
            function(obj){
                return jQuery.type(obj) === "array";
            },
            
            // A crude way of determining if an object is a window
            isWindow: function(obj){
                return obj && typeof obj === "object" && "setInterval" in obj;
            },
            
            isNaN: function(obj){
                return obj == null || !rdigit.test(obj) || isNaN(obj);
            },
            
            type: function(obj){
                return obj == null ? String(obj) : class2type[toString.call(obj)] || "object";
            },
            
            isPlainObject: function(obj){
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                    return false;
                }
                
                // Not own constructor property must be Object
                if (obj.constructor &&
                !hasOwn.call(obj, "constructor") &&
                !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
                
                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.
                
                var key;
                for (key in obj) {
                }
                
                return key === undefined || hasOwn.call(obj, key);
            },
            
            isEmptyObject: function(obj){
                for (var name in obj) {
                    return false;
                }
                return true;
            },
            
            error: function(msg){
                throw msg;
            },
            
            parseJSON: function(data){
                if (typeof data !== "string" || !data) {
                    return null;
                }
                
                // Make sure leading/trailing whitespace is removed (IE can't handle it)
                data = jQuery.trim(data);
                
                // Make sure the incoming data is actual JSON
                // Logic borrowed from http://json.org/json2.js
                if (rvalidchars.test(data.replace(rvalidescape, "@").replace(rvalidtokens, "]").replace(rvalidbraces, ""))) {
                
                    // Try to use the native JSON parser first
                    return window.JSON && window.JSON.parse ? window.JSON.parse(data) : (new Function("return " + data))();
                    
                }
                else {
                    jQuery.error("Invalid JSON: " + data);
                }
            },
            
            noop: function(){
            },
            
            // Evalulates a script in a global context
            globalEval: function(data){
                if (data && rnotwhite.test(data)) {
                    // Inspired by code by Andrea Giammarchi
                    // http://webreflection.blogspot.com/2007/08/global-scope-evaluation-and-dom.html
                    var head = document.getElementsByTagName("head")[0] || document.documentElement, script = document.createElement("script");
                    
                    script.type = "text/javascript";
                    
                    if (jQuery.support.scriptEval) {
                        script.appendChild(document.createTextNode(data));
                    }
                    else {
                        script.text = data;
                    }
                    
                    // Use insertBefore instead of appendChild to circumvent an IE6 bug.
                    // This arises when a base node is used (#2709).
                    head.insertBefore(script, head.firstChild);
                    head.removeChild(script);
                }
            },
            
            nodeName: function(elem, name){
                return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
            },
            
            // args is for internal usage only
            each: function(object, callback, args){
                var name, i = 0, length = object.length, isObj = length === undefined || jQuery.isFunction(object);
                
                if (args) {
                    if (isObj) {
                        for (name in object) {
                            if (callback.apply(object[name], args) === false) {
                                break;
                            }
                        }
                    }
                    else {
                        for (; i < length;) {
                            if (callback.apply(object[i++], args) === false) {
                                break;
                            }
                        }
                    }
                    
                    // A special, fast, case for the most common use of each
                }
                else {
                    if (isObj) {
                        for (name in object) {
                            if (callback.call(object[name], name, object[name]) === false) {
                                break;
                            }
                        }
                    }
                    else {
                        for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) {
                        }
                    }
                }
                
                return object;
            },
            
            // Use native String.trim function wherever possible
            trim: trim ? function(text){
                return text == null ? "" : trim.call(text);
            }
 :            // Otherwise use our own trimming functionality
            function(text){
                return text == null ? "" : text.toString().replace(trimLeft, "").replace(trimRight, "");
            },
            
            // results is for internal usage only
            makeArray: function(array, results){
                var ret = results || [];
                
                if (array != null) {
                    // The window, strings (and functions) also have 'length'
                    // The extra typeof function check is to prevent crashes
                    // in Safari 2 (See: #3039)
                    // Tweaked logic slightly to handle Blackberry 4.7 RegExp issues #6930
                    var type = jQuery.type(array);
                    
                    if (array.length == null || type === "string" || type === "function" || type === "regexp" || jQuery.isWindow(array)) {
                        push.call(ret, array);
                    }
                    else {
                        jQuery.merge(ret, array);
                    }
                }
                
                return ret;
            },
            
            inArray: function(elem, array){
                if (array.indexOf) {
                    return array.indexOf(elem);
                }
                
                for (var i = 0, length = array.length; i < length; i++) {
                    if (array[i] === elem) {
                        return i;
                    }
                }
                
                return -1;
            },
            
            merge: function(first, second){
                var i = first.length, j = 0;
                
                if (typeof second.length === "number") {
                    for (var l = second.length; j < l; j++) {
                        first[i++] = second[j];
                    }
                    
                }
                else {
                    while (second[j] !== undefined) {
                        first[i++] = second[j++];
                    }
                }
                
                first.length = i;
                
                return first;
            },
            
            grep: function(elems, callback, inv){
                var ret = [], retVal;
                inv = !!inv;
                
                // Go through the array, only saving the items
                // that pass the validator function
                for (var i = 0, length = elems.length; i < length; i++) {
                    retVal = !!callback(elems[i], i);
                    if (inv !== retVal) {
                        ret.push(elems[i]);
                    }
                }
                
                return ret;
            },
            
            // arg is for internal usage only
            map: function(elems, callback, arg){
                var ret = [], value;
                
                // Go through the array, translating each of the items to their
                // new value (or values).
                for (var i = 0, length = elems.length; i < length; i++) {
                    value = callback(elems[i], i, arg);
                    
                    if (value != null) {
                        ret[ret.length] = value;
                    }
                }
                
                return ret.concat.apply([], ret);
            },
            
            // A global GUID counter for objects
            guid: 1,
            
            proxy: function(fn, proxy, thisObject){
                if (arguments.length === 2) {
                    if (typeof proxy === "string") {
                        thisObject = fn;
                        fn = thisObject[proxy];
                        proxy = undefined;
                        
                    }
                    else 
                        if (proxy && !jQuery.isFunction(proxy)) {
                            thisObject = proxy;
                            proxy = undefined;
                        }
                }
                
                if (!proxy && fn) {
                    proxy = function(){
                        return fn.apply(thisObject || this, arguments);
                    };
                }
                
                // Set the guid of unique handler to the same of original handler, so it can be removed
                if (fn) {
                    proxy.guid = fn.guid = fn.guid || proxy.guid || jQuery.guid++;
                }
                
                // So proxy can be declared as an argument
                return proxy;
            },
            
            // Mutifunctional method to get and set values to a collection
            // The value/s can be optionally by executed if its a function
            access: function(elems, key, value, exec, fn, pass){
                var length = elems.length;
                
                // Setting many attributes
                if (typeof key === "object") {
                    for (var k in key) {
                        jQuery.access(elems, k, key[k], exec, fn, value);
                    }
                    return elems;
                }
                
                // Setting one attribute
                if (value !== undefined) {
                    // Optionally, function values get executed if exec is true
                    exec = !pass && exec && jQuery.isFunction(value);
                    
                    for (var i = 0; i < length; i++) {
                        fn(elems[i], key, exec ? value.call(elems[i], i, fn(elems[i], key)) : value, pass);
                    }
                    
                    return elems;
                }
                
                // Getting an attribute
                return length ? fn(elems[0], key) : undefined;
            },
            
            now: function(){
                return (new Date()).getTime();
            },
            
            // Use of jQuery.browser is frowned upon.
            // More details: http://docs.jquery.com/Utilities/jQuery.browser
            uaMatch: function(ua){
                ua = ua.toLowerCase();
                
                var match = rwebkit.exec(ua) ||
                ropera.exec(ua) ||
                rmsie.exec(ua) ||
                ua.indexOf("compatible") < 0 && rmozilla.exec(ua) ||
                [];
                
                return {
                    browser: match[1] || "",
                    version: match[2] || "0"
                };
            },
            
            browser: {}
        });
        
        // Populate the class2type map
        jQuery.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name){
            class2type["[object " + name + "]"] = name.toLowerCase();
        });
        
        browserMatch = jQuery.uaMatch(userAgent);
        if (browserMatch.browser) {
            jQuery.browser[browserMatch.browser] = true;
            jQuery.browser.version = browserMatch.version;
        }
        
        // Deprecated, use jQuery.browser.webkit instead
        if (jQuery.browser.webkit) {
            jQuery.browser.safari = true;
        }
        
        if (indexOf) {
            jQuery.inArray = function(elem, array){
                return indexOf.call(array, elem);
            };
        }
        
        // Verify that \s matches non-breaking spaces
        // (IE fails on this test)
        if (!rwhite.test("\xA0")) {
            trimLeft = /^[\s\xA0]+/;
            trimRight = /[\s\xA0]+$/;
        }
        
        // All jQuery objects should point back to these
        rootjQuery = jQuery(document);
        
        // Cleanup functions for the document ready method
        if (document.addEventListener) {
            DOMContentLoaded = function(){
                document.removeEventListener("DOMContentLoaded", DOMContentLoaded, false);
                jQuery.ready();
            };
            
        }
        else 
            if (document.attachEvent) {
                DOMContentLoaded = function(){
                    // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
                    if (document.readyState === "complete") {
                        document.detachEvent("onreadystatechange", DOMContentLoaded);
                        jQuery.ready();
                    }
                };
            }
        
        // The DOM ready check for Internet Explorer
        function doScrollCheck(){
            if (jQuery.isReady) {
                return;
            }
            
            try {
                // If IE is used, use the trick by Diego Perini
                // http://javascript.nwbox.com/IEContentLoaded/
                document.documentElement.doScroll("left");
            } 
            catch (e) {
                setTimeout(doScrollCheck, 1);
                return;
            }
            
            // and execute any waiting functions
            jQuery.ready();
        }
        
        // Expose jQuery to the global object
        return (window.jQuery = window.$ = jQuery);
        
    })();
    
    
    (function(){
    
        jQuery.support = {};
        
        var root = document.documentElement, script = document.createElement("script"), div = document.createElement("div"), id = "script" + jQuery.now();
        
        div.style.display = "none";
        div.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
        
        var all = div.getElementsByTagName("*"), a = div.getElementsByTagName("a")[0], select = document.createElement("select"), opt = select.appendChild(document.createElement("option"));
        
        // Can't get basic test support
        if (!all || !all.length || !a) {
            return;
        }
        
        jQuery.support = {
            // IE strips leading whitespace when .innerHTML is used
            leadingWhitespace: div.firstChild.nodeType === 3,
            
            // Make sure that tbody elements aren't automatically inserted
            // IE will insert them into empty tables
            tbody: !div.getElementsByTagName("tbody").length,
            
            // Make sure that link elements get serialized correctly by innerHTML
            // This requires a wrapper element in IE
            htmlSerialize: !!div.getElementsByTagName("link").length,
            
            // Get the style information from getAttribute
            // (IE uses .cssText insted)
            style: /red/.test(a.getAttribute("style")),
            
            // Make sure that URLs aren't manipulated
            // (IE normalizes it by default)
            hrefNormalized: a.getAttribute("href") === "/a",
            
            // Make sure that element opacity exists
            // (IE uses filter instead)
            // Use a regex to work around a WebKit issue. See #5145
            opacity: /^0.55$/.test(a.style.opacity),
            
            // Verify style float existence
            // (IE uses styleFloat instead of cssFloat)
            cssFloat: !!a.style.cssFloat,
            
            // Make sure that if no value is specified for a checkbox
            // that it defaults to "on".
            // (WebKit defaults to "" instead)
            checkOn: div.getElementsByTagName("input")[0].value === "on",
            
            // Make sure that a selected-by-default option has a working selected property.
            // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
            optSelected: opt.selected,
            
            // Will be defined later
            deleteExpando: true,
            optDisabled: false,
            checkClone: false,
            scriptEval: false,
            noCloneEvent: true,
            boxModel: null,
            inlineBlockNeedsLayout: false,
            shrinkWrapBlocks: false,
            reliableHiddenOffsets: true
        };
        
        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as diabled)
        select.disabled = true;
        jQuery.support.optDisabled = !opt.disabled;
        
        script.type = "text/javascript";
        try {
            script.appendChild(document.createTextNode("window." + id + "=1;"));
        } 
        catch (e) {
        }
        
        root.insertBefore(script, root.firstChild);
        
        // Make sure that the execution of code works by injecting a script
        // tag with appendChild/createTextNode
        // (IE doesn't support this, fails, and uses .text instead)
        if (window[id]) {
            jQuery.support.scriptEval = true;
            delete window[id];
        }
        
        // Test to see if it's possible to delete an expando from an element
        // Fails in Internet Explorer
        try {
            delete script.test;
            
        } 
        catch (e) {
            jQuery.support.deleteExpando = false;
        }
        
        root.removeChild(script);
        
        if (div.attachEvent && div.fireEvent) {
            div.attachEvent("onclick", function click(){
                // Cloning a node shouldn't copy over any
                // bound event handlers (IE does this)
                jQuery.support.noCloneEvent = false;
                div.detachEvent("onclick", click);
            });
            div.cloneNode(true).fireEvent("onclick");
        }
        
        div = document.createElement("div");
        div.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
        
        var fragment = document.createDocumentFragment();
        fragment.appendChild(div.firstChild);
        
        // WebKit doesn't clone checked state correctly in fragments
        jQuery.support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
        
        // Figure out if the W3C box model works as expected
        // document.body must exist before we can do this
        jQuery(function(){
            var div = document.createElement("div");
            div.style.width = div.style.paddingLeft = "1px";
            
            document.body.appendChild(div);
            jQuery.boxModel = jQuery.support.boxModel = div.offsetWidth === 2;
            
            if ("zoom" in div.style) {
                // Check if natively block-level elements act like inline-block
                // elements when setting their display to 'inline' and giving
                // them layout
                // (IE < 8 does this)
                div.style.display = "inline";
                div.style.zoom = 1;
                jQuery.support.inlineBlockNeedsLayout = div.offsetWidth === 2;
                
                // Check if elements with layout shrink-wrap their children
                // (IE 6 does this)
                div.style.display = "";
                div.innerHTML = "<div style='width:4px;'></div>";
                jQuery.support.shrinkWrapBlocks = div.offsetWidth !== 2;
            }
            
            div.innerHTML = "<table><tr><td style='padding:0;display:none'></td><td>t</td></tr></table>";
            var tds = div.getElementsByTagName("td");
            
            // Check if table cells still have offsetWidth/Height when they are set
            // to display:none and there are still other visible table cells in a
            // table row; if so, offsetWidth/Height are not reliable for use when
            // determining if an element has been hidden directly using
            // display:none (it is still safe to use offsets if a parent element is
            // hidden; don safety goggles and see bug #4512 for more information).
            // (only IE 8 fails this test)
            jQuery.support.reliableHiddenOffsets = tds[0].offsetHeight === 0;
            
            tds[0].style.display = "";
            tds[1].style.display = "none";
            
            // Check if empty table cells still have offsetWidth/Height
            // (IE < 8 fail this test)
            jQuery.support.reliableHiddenOffsets = jQuery.support.reliableHiddenOffsets && tds[0].offsetHeight === 0;
            div.innerHTML = "";
            
            document.body.removeChild(div).style.display = "none";
            div = tds = null;
        });
        
        // Technique from Juriy Zaytsev
        // http://thinkweb2.com/projects/prototype/detecting-event-support-without-browser-sniffing/
        var eventSupported = function(eventName){
            var el = document.createElement("div");
            eventName = "on" + eventName;
            
            var isSupported = (eventName in el);
            if (!isSupported) {
                el.setAttribute(eventName, "return;");
                isSupported = typeof el[eventName] === "function";
            }
            el = null;
            
            return isSupported;
        };
        
        jQuery.support.submitBubbles = eventSupported("submit");
        jQuery.support.changeBubbles = eventSupported("change");
        
        // release memory in IE
        root = script = div = all = a = null;
    })();
    
    
    
    var windowData = {}, rbrace = /^(?:\{.*\}|\[.*\])$/;
    
    jQuery.extend({
        cache: {},
        
        // Please use with caution
        uuid: 0,
        
        // Unique for each copy of jQuery on the page	
        expando: "jQuery" + jQuery.now(),
        
        // The following elements throw uncatchable exceptions if you
        // attempt to add expando properties to them.
        noData: {
            "embed": true,
            // Ban all objects except for Flash (which handle expandos)
            "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            "applet": true
        },
        
        data: function(elem, name, data){
            if (!jQuery.acceptData(elem)) {
                return;
            }
            
            elem = elem == window ? windowData : elem;
            
            var isNode = elem.nodeType, id = isNode ? elem[jQuery.expando] : null, cache = jQuery.cache, thisCache;
            
            if (isNode && !id && typeof name === "string" && data === undefined) {
                return;
            }
            
            // Get the data from the object directly
            if (!isNode) {
                cache = elem;
                
                // Compute a unique ID for the element
            }
            else 
                if (!id) {
                    elem[jQuery.expando] = id = ++jQuery.uuid;
                }
            
            // Avoid generating a new cache unless none exists and we
            // want to manipulate it.
            if (typeof name === "object") {
                if (isNode) {
                    cache[id] = jQuery.extend(cache[id], name);
                    
                }
                else {
                    jQuery.extend(cache, name);
                }
                
            }
            else 
                if (isNode && !cache[id]) {
                    cache[id] = {};
                }
            
            thisCache = isNode ? cache[id] : cache;
            
            // Prevent overriding the named cache with undefined values
            if (data !== undefined) {
                thisCache[name] = data;
            }
            
            return typeof name === "string" ? thisCache[name] : thisCache;
        },
        
        removeData: function(elem, name){
            if (!jQuery.acceptData(elem)) {
                return;
            }
            
            elem = elem == window ? windowData : elem;
            
            var isNode = elem.nodeType, id = isNode ? elem[jQuery.expando] : elem, cache = jQuery.cache, thisCache = isNode ? cache[id] : id;
            
            // If we want to remove a specific section of the element's data
            if (name) {
                if (thisCache) {
                    // Remove the section of cache data
                    delete thisCache[name];
                    
                    // If we've removed all the data, remove the element's cache
                    if (isNode && jQuery.isEmptyObject(thisCache)) {
                        jQuery.removeData(elem);
                    }
                }
                
                // Otherwise, we want to remove all of the element's data
            }
            else {
                if (isNode && jQuery.support.deleteExpando) {
                    delete elem[jQuery.expando];
                    
                }
                else 
                    if (elem.removeAttribute) {
                        elem.removeAttribute(jQuery.expando);
                        
                    // Completely remove the data cache
                    }
                    else 
                        if (isNode) {
                            delete cache[id];
                            
                        // Remove all fields from the object
                        }
                        else {
                            for (var n in elem) {
                                delete elem[n];
                            }
                        }
            }
        },
        
        // A method for determining if a DOM node can handle the data expando
        acceptData: function(elem){
            if (elem.nodeName) {
                var match = jQuery.noData[elem.nodeName.toLowerCase()];
                
                if (match) {
                    return !(match === true || elem.getAttribute("classid") !== match);
                }
            }
            
            return true;
        }
    });
    
    jQuery.fn.extend({
        data: function(key, value){
            var data = null;
            
            if (typeof key === "undefined") {
                if (this.length) {
                    var attr = this[0].attributes, name;
                    data = jQuery.data(this[0]);
                    
                    for (var i = 0, l = attr.length; i < l; i++) {
                        name = attr[i].name;
                        
                        if (name.indexOf("data-") === 0) {
                            name = name.substr(5);
                            dataAttr(this[0], name, data[name]);
                        }
                    }
                }
                
                return data;
                
            }
            else 
                if (typeof key === "object") {
                    return this.each(function(){
                        jQuery.data(this, key);
                    });
                }
            
            var parts = key.split(".");
            parts[1] = parts[1] ? "." + parts[1] : "";
            
            if (value === undefined) {
                data = this.triggerHandler("getData" + parts[1] + "!", [parts[0]]);
                
                // Try to fetch any internally stored data first
                if (data === undefined && this.length) {
                    data = jQuery.data(this[0], key);
                    data = dataAttr(this[0], key, data);
                }
                
                return data === undefined && parts[1] ? this.data(parts[0]) : data;
                
            }
            else {
                return this.each(function(){
                    var $this = jQuery(this), args = [parts[0], value];
                    
                    $this.triggerHandler("setData" + parts[1] + "!", args);
                    jQuery.data(this, key, value);
                    $this.triggerHandler("changeData" + parts[1] + "!", args);
                });
            }
        },
        
        removeData: function(key){
            return this.each(function(){
                jQuery.removeData(this, key);
            });
        }
    });
    
    function dataAttr(elem, key, data){
        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {
            data = elem.getAttribute("data-" + key);
            
            if (typeof data === "string") {
                try {
                    data = data === "true" ? true : data === "false" ? false : data === "null" ? null : !jQuery.isNaN(data) ? parseFloat(data) : rbrace.test(data) ? jQuery.parseJSON(data) : data;
                } 
                catch (e) {
                }
                
                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);
                
            }
            else {
                data = undefined;
            }
        }
        
        return data;
    }
    
    
    
    
    jQuery.extend({
        queue: function(elem, type, data){
            if (!elem) {
                return;
            }
            
            type = (type || "fx") + "queue";
            var q = jQuery.data(elem, type);
            
            // Speed up dequeue by getting out quickly if this is just a lookup
            if (!data) {
                return q || [];
            }
            
            if (!q || jQuery.isArray(data)) {
                q = jQuery.data(elem, type, jQuery.makeArray(data));
                
            }
            else {
                q.push(data);
            }
            
            return q;
        },
        
        dequeue: function(elem, type){
            type = type || "fx";
            
            var queue = jQuery.queue(elem, type), fn = queue.shift();
            
            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
            }
            
            if (fn) {
                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }
                
                fn.call(elem, function(){
                    jQuery.dequeue(elem, type);
                });
            }
        }
    });
    
    jQuery.fn.extend({
        queue: function(type, data){
            if (typeof type !== "string") {
                data = type;
                type = "fx";
            }
            
            if (data === undefined) {
                return jQuery.queue(this[0], type);
            }
            return this.each(function(i){
                var queue = jQuery.queue(this, type, data);
                
                if (type === "fx" && queue[0] !== "inprogress") {
                    jQuery.dequeue(this, type);
                }
            });
        },
        dequeue: function(type){
            return this.each(function(){
                jQuery.dequeue(this, type);
            });
        },
        
        // Based off of the plugin by Clint Helfers, with permission.
        // http://blindsignals.com/index.php/2009/07/jquery-delay/
        delay: function(time, type){
            time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
            type = type || "fx";
            
            return this.queue(type, function(){
                var elem = this;
                setTimeout(function(){
                    jQuery.dequeue(elem, type);
                }, time);
            });
        },
        
        clearQueue: function(type){
            return this.queue(type || "fx", []);
        }
    });
    
    
    
    
    var rclass = /[\n\t]/g, rspaces = /\s+/, rreturn = /\r/g, rspecialurl = /^(?:href|src|style)$/, rtype = /^(?:button|input)$/i, rfocusable = /^(?:button|input|object|select|textarea)$/i, rclickable = /^a(?:rea)?$/i, rradiocheck = /^(?:radio|checkbox)$/i;
    
    jQuery.props = {
        "for": "htmlFor",
        "class": "className",
        readonly: "readOnly",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        rowspan: "rowSpan",
        colspan: "colSpan",
        tabindex: "tabIndex",
        usemap: "useMap",
        frameborder: "frameBorder"
    };
    
    jQuery.fn.extend({
        attr: function(name, value){
            return jQuery.access(this, name, value, true, jQuery.attr);
        },
        
        removeAttr: function(name, fn){
            return this.each(function(){
                jQuery.attr(this, name, "");
                if (this.nodeType === 1) {
                    this.removeAttribute(name);
                }
            });
        },
        
        addClass: function(value){
            if (jQuery.isFunction(value)) {
                return this.each(function(i){
                    var self = jQuery(this);
                    self.addClass(value.call(this, i, self.attr("class")));
                });
            }
            
            if (value && typeof value === "string") {
                var classNames = (value || "").split(rspaces);
                
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    
                    if (elem.nodeType === 1) {
                        if (!elem.className) {
                            elem.className = value;
                            
                        }
                        else {
                            var className = " " + elem.className + " ", setClass = elem.className;
                            
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                if (className.indexOf(" " + classNames[c] + " ") < 0) {
                                    setClass += " " + classNames[c];
                                }
                            }
                            elem.className = jQuery.trim(setClass);
                        }
                    }
                }
            }
            
            return this;
        },
        
        removeClass: function(value){
            if (jQuery.isFunction(value)) {
                return this.each(function(i){
                    var self = jQuery(this);
                    self.removeClass(value.call(this, i, self.attr("class")));
                });
            }
            
            if ((value && typeof value === "string") || value === undefined) {
                var classNames = (value || "").split(rspaces);
                
                for (var i = 0, l = this.length; i < l; i++) {
                    var elem = this[i];
                    
                    if (elem.nodeType === 1 && elem.className) {
                        if (value) {
                            var className = (" " + elem.className + " ").replace(rclass, " ");
                            for (var c = 0, cl = classNames.length; c < cl; c++) {
                                className = className.replace(" " + classNames[c] + " ", " ");
                            }
                            elem.className = jQuery.trim(className);
                            
                        }
                        else {
                            elem.className = "";
                        }
                    }
                }
            }
            
            return this;
        },
        
        toggleClass: function(value, stateVal){
            var type = typeof value, isBool = typeof stateVal === "boolean";
            
            if (jQuery.isFunction(value)) {
                return this.each(function(i){
                    var self = jQuery(this);
                    self.toggleClass(value.call(this, i, self.attr("class"), stateVal), stateVal);
                });
            }
            
            return this.each(function(){
                if (type === "string") {
                    // toggle individual class names
                    var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.split(rspaces);
                    
                    while ((className = classNames[i++])) {
                        // check each className given, space seperated list
                        state = isBool ? state : !self.hasClass(className);
                        self[state ? "addClass" : "removeClass"](className);
                    }
                    
                }
                else 
                    if (type === "undefined" || type === "boolean") {
                        if (this.className) {
                            // store className if set
                            jQuery.data(this, "__className__", this.className);
                        }
                        
                        // toggle whole className
                        this.className = this.className || value === false ? "" : jQuery.data(this, "__className__") || "";
                    }
            });
        },
        
        hasClass: function(selector){
            var className = " " + selector + " ";
            for (var i = 0, l = this.length; i < l; i++) {
                if ((" " + this[i].className + " ").replace(rclass, " ").indexOf(className) > -1) {
                    return true;
                }
            }
            
            return false;
        },
        
        val: function(value){
            if (!arguments.length) {
                var elem = this[0];
                
                if (elem) {
                    if (jQuery.nodeName(elem, "option")) {
                        // attributes.value is undefined in Blackberry 4.7 but
                        // uses .value. See #6932
                        var val = elem.attributes.value;
                        return !val || val.specified ? elem.value : elem.text;
                    }
                    
                    // We need to handle select boxes special
                    if (jQuery.nodeName(elem, "select")) {
                        var index = elem.selectedIndex, values = [], options = elem.options, one = elem.type === "select-one";
                        
                        // Nothing was selected
                        if (index < 0) {
                            return null;
                        }
                        
                        // Loop through all the selected options
                        for (var i = one ? index : 0, max = one ? index + 1 : options.length; i < max; i++) {
                            var option = options[i];
                            
                            // Don't return options that are disabled or in a disabled optgroup
                            if (option.selected && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, "optgroup"))) {
                            
                                // Get the specific value for the option
                                value = jQuery(option).val();
                                
                                // We don't need an array for one selects
                                if (one) {
                                    return value;
                                }
                                
                                // Multi-Selects return an array
                                values.push(value);
                            }
                        }
                        
                        return values;
                    }
                    
                    // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
                    if (rradiocheck.test(elem.type) && !jQuery.support.checkOn) {
                        return elem.getAttribute("value") === null ? "on" : elem.value;
                    }
                    
                    
                    // Everything else, we just grab the value
                    return (elem.value || "").replace(rreturn, "");
                    
                }
                
                return undefined;
            }
            
            var isFunction = jQuery.isFunction(value);
            
            return this.each(function(i){
                var self = jQuery(this), val = value;
                
                if (this.nodeType !== 1) {
                    return;
                }
                
                if (isFunction) {
                    val = value.call(this, i, self.val());
                }
                
                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";
                }
                else 
                    if (typeof val === "number") {
                        val += "";
                    }
                    else 
                        if (jQuery.isArray(val)) {
                            val = jQuery.map(val, function(value){
                                return value == null ? "" : value + "";
                            });
                        }
                
                if (jQuery.isArray(val) && rradiocheck.test(this.type)) {
                    this.checked = jQuery.inArray(self.val(), val) >= 0;
                    
                }
                else 
                    if (jQuery.nodeName(this, "select")) {
                        var values = jQuery.makeArray(val);
                        
                        jQuery("option", this).each(function(){
                            this.selected = jQuery.inArray(jQuery(this).val(), values) >= 0;
                        });
                        
                        if (!values.length) {
                            this.selectedIndex = -1;
                        }
                        
                    }
                    else {
                        this.value = val;
                    }
            });
        }
    });
    
    jQuery.extend({
        attrFn: {
            val: true,
            css: true,
            html: true,
            text: true,
            data: true,
            width: true,
            height: true,
            offset: true
        },
        
        attr: function(elem, name, value, pass){
            // don't set attributes on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                return undefined;
            }
            
            if (pass && name in jQuery.attrFn) {
                return jQuery(elem)[name](value);
            }
            
            var notxml = elem.nodeType !== 1 || !jQuery.isXMLDoc(elem),            // Whether we are setting (or getting)
            set = value !== undefined;
            
            // Try to normalize/fix the name
            name = notxml && jQuery.props[name] || name;
            
            // These attributes require special treatment
            var special = rspecialurl.test(name);
            
            // Safari mis-reports the default selected property of an option
            // Accessing the parent's selectedIndex property fixes it
            if (name === "selected" && !jQuery.support.optSelected) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;
                    
                    // Make sure that it also works with optgroups, see #5701
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
            
            // If applicable, access the attribute via the DOM 0 way
            // 'in' checks fail in Blackberry 4.7 #6931
            if ((name in elem || elem[name] !== undefined) && notxml && !special) {
                if (set) {
                    // We can't allow the type property to be changed (since it causes problems in IE)
                    if (name === "type" && rtype.test(elem.nodeName) && elem.parentNode) {
                        jQuery.error("type property can't be changed");
                    }
                    
                    if (value === null) {
                        if (elem.nodeType === 1) {
                            elem.removeAttribute(name);
                        }
                        
                    }
                    else {
                        elem[name] = value;
                    }
                }
                
                // browsers index elements by id/name on forms, give priority to attributes.
                if (jQuery.nodeName(elem, "form") && elem.getAttributeNode(name)) {
                    return elem.getAttributeNode(name).nodeValue;
                }
                
                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                if (name === "tabIndex") {
                    var attributeNode = elem.getAttributeNode("tabIndex");
                    
                    return attributeNode && attributeNode.specified ? attributeNode.value : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : undefined;
                }
                
                return elem[name];
            }
            
            if (!jQuery.support.style && notxml && name === "style") {
                if (set) {
                    elem.style.cssText = "" + value;
                }
                
                return elem.style.cssText;
            }
            
            if (set) {
                // convert the value to a string (all browsers do this but IE) see #1070
                elem.setAttribute(name, "" + value);
            }
            
            // Ensure that missing attributes return undefined
            // Blackberry 4.7 returns "" from getAttribute #6938
            if (!elem.attributes[name] && (elem.hasAttribute && !elem.hasAttribute(name))) {
                return undefined;
            }
            
            var attr = !jQuery.support.hrefNormalized && notxml && special ?            // Some attributes require a special call on IE
            elem.getAttribute(name, 2) : elem.getAttribute(name);
            
            // Non-existent attributes return null, we normalize to undefined
            return attr === null ? undefined : attr;
        }
    });
    
    
    
    
    var rnamespaces = /\.(.*)$/, rformElems = /^(?:textarea|input|select)$/i, rperiod = /\./g, rspace = / /g, rescape = /[^\w\s.|`]/g, fcleanup = function(nm){
        return nm.replace(rescape, "\\$&");
    }, focusCounts = {
        focusin: 0,
        focusout: 0
    };
    
    /*
     * A number of helper functions used for managing events.
     * Many of the ideas behind this code originated from
     * Dean Edwards' addEvent library.
     */
    jQuery.event = {
    
        // Bind an event to an element
        // Original by Dean Edwards
        add: function(elem, types, handler, data){
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            
            // For whatever reason, IE has trouble passing the window object
            // around, causing it to be cloned in the process
            if (jQuery.isWindow(elem) && (elem !== window && !elem.frameElement)) {
                elem = window;
            }
            
            if (handler === false) {
                handler = returnFalse;
            }
            else 
                if (!handler) {
                    // Fixes bug #7229. Fix recommended by jdalton
                    return;
                }
            
            var handleObjIn, handleObj;
            
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
            }
            
            // Make sure that the function being executed has a unique ID
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }
            
            // Init the element's event structure
            var elemData = jQuery.data(elem);
            
            // If no elemData is found then we must be trying to bind to one of the
            // banned noData elements
            if (!elemData) {
                return;
            }
            
            // Use a key less likely to result in collisions for plain JS objects.
            // Fixes bug #7150.
            var eventKey = elem.nodeType ? "events" : "__events__", events = elemData[eventKey], eventHandle = elemData.handle;
            
            if (typeof events === "function") {
                // On plain objects events is a fn that holds the the data
                // which prevents this data from being JSON serialized
                // the function does not need to be called, it just contains the data
                eventHandle = events.handle;
                events = events.events;
                
            }
            else 
                if (!events) {
                    if (!elem.nodeType) {
                        // On plain objects, create a fn that acts as the holder
                        // of the values to avoid JSON serialization of event data
                        elemData[eventKey] = elemData = function(){
                        };
                    }
                    
                    elemData.events = events = {};
                }
            
            if (!eventHandle) {
                elemData.handle = eventHandle = function(){
                    // Handle the second event of a trigger and when
                    // an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" && !jQuery.event.triggered ? jQuery.event.handle.apply(eventHandle.elem, arguments) : undefined;
                };
            }
            
            // Add elem as a property of the handle function
            // This is to prevent a memory leak with non-native events in IE.
            eventHandle.elem = elem;
            
            // Handle multiple events separated by a space
            // jQuery(...).bind("mouseover mouseout", fn);
            types = types.split(" ");
            
            var type, i = 0, namespaces;
            
            while ((type = types[i++])) {
                handleObj = handleObjIn ? jQuery.extend({}, handleObjIn) : {
                    handler: handler,
                    data: data
                };
                
                // Namespaced event handlers
                if (type.indexOf(".") > -1) {
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    handleObj.namespace = namespaces.slice(0).sort().join(".");
                    
                }
                else {
                    namespaces = [];
                    handleObj.namespace = "";
                }
                
                handleObj.type = type;
                if (!handleObj.guid) {
                    handleObj.guid = handler.guid;
                }
                
                // Get the current list of functions bound to this event
                var handlers = events[type], special = jQuery.event.special[type] || {};
                
                // Init the event handler queue
                if (!handlers) {
                    handlers = events[type] = [];
                    
                    // Check for a special event handler
                    // Only use addEventListener/attachEvent if the special
                    // events handler returns false
                    if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);
                            
                        }
                        else 
                            if (elem.attachEvent) {
                                elem.attachEvent("on" + type, eventHandle);
                            }
                    }
                }
                
                if (special.add) {
                    special.add.call(elem, handleObj);
                    
                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }
                
                // Add the function to the element's handler list
                handlers.push(handleObj);
                
                // Keep track of which events have been used, for global triggering
                jQuery.event.global[type] = true;
            }
            
            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },
        
        global: {},
        
        // Detach an event or set of events from an element
        remove: function(elem, types, handler, pos){
            // don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }
            
            if (handler === false) {
                handler = returnFalse;
            }
            
            var ret, type, fn, j, i = 0, all, namespaces, namespace, special, eventType, handleObj, origType, eventKey = elem.nodeType ? "events" : "__events__", elemData = jQuery.data(elem), events = elemData && elemData[eventKey];
            
            if (!elemData || !events) {
                return;
            }
            
            if (typeof events === "function") {
                elemData = events;
                events = events.events;
            }
            
            // types is actually an event object here
            if (types && types.type) {
                handler = types.handler;
                types = types.type;
            }
            
            // Unbind all events for the element
            if (!types || typeof types === "string" && types.charAt(0) === ".") {
                types = types || "";
                
                for (type in events) {
                    jQuery.event.remove(elem, type + types);
                }
                
                return;
            }
            
            // Handle multiple events separated by a space
            // jQuery(...).unbind("mouseover mouseout", fn);
            types = types.split(" ");
            
            while ((type = types[i++])) {
                origType = type;
                handleObj = null;
                all = type.indexOf(".") < 0;
                namespaces = [];
                
                if (!all) {
                    // Namespaced event handlers
                    namespaces = type.split(".");
                    type = namespaces.shift();
                    
                    namespace = new RegExp("(^|\\.)" +
                    jQuery.map(namespaces.slice(0).sort(), fcleanup).join("\\.(?:.*\\.)?") +
                    "(\\.|$)");
                }
                
                eventType = events[type];
                
                if (!eventType) {
                    continue;
                }
                
                if (!handler) {
                    for (j = 0; j < eventType.length; j++) {
                        handleObj = eventType[j];
                        
                        if (all || namespace.test(handleObj.namespace)) {
                            jQuery.event.remove(elem, origType, handleObj.handler, j);
                            eventType.splice(j--, 1);
                        }
                    }
                    
                    continue;
                }
                
                special = jQuery.event.special[type] || {};
                
                for (j = pos || 0; j < eventType.length; j++) {
                    handleObj = eventType[j];
                    
                    if (handler.guid === handleObj.guid) {
                        // remove the given handler for the given type
                        if (all || namespace.test(handleObj.namespace)) {
                            if (pos == null) {
                                eventType.splice(j--, 1);
                            }
                            
                            if (special.remove) {
                                special.remove.call(elem, handleObj);
                            }
                        }
                        
                        if (pos != null) {
                            break;
                        }
                    }
                }
                
                // remove generic event handler if no more handlers exist
                if (eventType.length === 0 || pos != null && eventType.length === 1) {
                    if (!special.teardown || special.teardown.call(elem, namespaces) === false) {
                        jQuery.removeEvent(elem, type, elemData.handle);
                    }
                    
                    ret = null;
                    delete events[type];
                }
            }
            
            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                var handle = elemData.handle;
                if (handle) {
                    handle.elem = null;
                }
                
                delete elemData.events;
                delete elemData.handle;
                
                if (typeof elemData === "function") {
                    jQuery.removeData(elem, eventKey);
                    
                }
                else 
                    if (jQuery.isEmptyObject(elemData)) {
                        jQuery.removeData(elem);
                    }
            }
        },
        
        // bubbling is internal
        trigger: function(event, data, elem /*, bubbling */){
            // Event object or event type
            var type = event.type || event, bubbling = arguments[3];
            
            if (!bubbling) {
                event = typeof event === "object" ?                // jQuery.Event object
                event[jQuery.expando] ? event :                // Object literal
                jQuery.extend(jQuery.Event(type), event) :                // Just the event type (string)
                jQuery.Event(type);
                
                if (type.indexOf("!") >= 0) {
                    event.type = type = type.slice(0, -1);
                    event.exclusive = true;
                }
                
                // Handle a global trigger
                if (!elem) {
                    // Don't bubble custom events when global (to avoid too much overhead)
                    event.stopPropagation();
                    
                    // Only trigger if we've ever bound an event for it
                    if (jQuery.event.global[type]) {
                        jQuery.each(jQuery.cache, function(){
                            if (this.events && this.events[type]) {
                                jQuery.event.trigger(event, data, this.handle.elem);
                            }
                        });
                    }
                }
                
                // Handle triggering a single element
                
                // don't do events on text and comment nodes
                if (!elem || elem.nodeType === 3 || elem.nodeType === 8) {
                    return undefined;
                }
                
                // Clean up in case it is reused
                event.result = undefined;
                event.target = elem;
                
                // Clone the incoming data, if any
                data = jQuery.makeArray(data);
                data.unshift(event);
            }
            
            event.currentTarget = elem;
            
            // Trigger the event, it is assumed that "handle" is a function
            var handle = elem.nodeType ? jQuery.data(elem, "handle") : (jQuery.data(elem, "__events__") || {}).handle;
            
            if (handle) {
                handle.apply(elem, data);
            }
            
            var parent = elem.parentNode || elem.ownerDocument;
            
            // Trigger an inline bound script
            try {
                if (!(elem && elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()])) {
                    if (elem["on" + type] && elem["on" + type].apply(elem, data) === false) {
                        event.result = false;
                        event.preventDefault();
                    }
                }
                
                // prevent IE from throwing an error for some elements with some event types, see #3533
            } 
            catch (inlineError) {
            }
            
            if (!event.isPropagationStopped() && parent) {
                jQuery.event.trigger(event, data, parent, true);
                
            }
            else 
                if (!event.isDefaultPrevented()) {
                    var old, target = event.target, targetType = type.replace(rnamespaces, ""), isClick = jQuery.nodeName(target, "a") && targetType === "click", special = jQuery.event.special[targetType] || {};
                    
                    if ((!special._default || special._default.call(elem, event) === false) &&
                    !isClick &&
                    !(target && target.nodeName && jQuery.noData[target.nodeName.toLowerCase()])) {
                    
                        try {
                            if (target[targetType]) {
                                // Make sure that we don't accidentally re-trigger the onFOO events
                                old = target["on" + targetType];
                                
                                if (old) {
                                    target["on" + targetType] = null;
                                }
                                
                                jQuery.event.triggered = true;
                                target[targetType]();
                            }
                            
                        // prevent IE from throwing an error for some elements with some event types, see #3533
                        } 
                        catch (triggerError) {
                        }
                        
                        if (old) {
                            target["on" + targetType] = old;
                        }
                        
                        jQuery.event.triggered = false;
                    }
                }
        },
        
        handle: function(event){
            var all, handlers, namespaces, namespace_re, events, namespace_sort = [], args = jQuery.makeArray(arguments);
            
            event = args[0] = jQuery.event.fix(event || window.event);
            event.currentTarget = this;
            
            // Namespaced event handlers
            all = event.type.indexOf(".") < 0 && !event.exclusive;
            
            if (!all) {
                namespaces = event.type.split(".");
                event.type = namespaces.shift();
                namespace_sort = namespaces.slice(0).sort();
                namespace_re = new RegExp("(^|\\.)" + namespace_sort.join("\\.(?:.*\\.)?") + "(\\.|$)");
            }
            
            event.namespace = event.namespace || namespace_sort.join(".");
            
            events = jQuery.data(this, this.nodeType ? "events" : "__events__");
            
            if (typeof events === "function") {
                events = events.events;
            }
            
            handlers = (events || {})[event.type];
            
            if (events && handlers) {
                // Clone the handlers to prevent manipulation
                handlers = handlers.slice(0);
                
                for (var j = 0, l = handlers.length; j < l; j++) {
                    var handleObj = handlers[j];
                    
                    // Filter the functions by class
                    if (all || namespace_re.test(handleObj.namespace)) {
                        // Pass in a reference to the handler function itself
                        // So that we can later remove it
                        event.handler = handleObj.handler;
                        event.data = handleObj.data;
                        event.handleObj = handleObj;
                        
                        var ret = handleObj.handler.apply(this, args);
                        
                        if (ret !== undefined) {
                            event.result = ret;
                            if (ret === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                        
                        if (event.isImmediatePropagationStopped()) {
                            break;
                        }
                    }
                }
            }
            
            return event.result;
        },
        
        props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
        
        fix: function(event){
            if (event[jQuery.expando]) {
                return event;
            }
            
            // store a copy of the original event object
            // and "clone" to set read-only properties
            var originalEvent = event;
            event = jQuery.Event(originalEvent);
            
            for (var i = this.props.length, prop; i;) {
                prop = this.props[--i];
                event[prop] = originalEvent[prop];
            }
            
            // Fix target property, if necessary
            if (!event.target) {
                // Fixes #1925 where srcElement might not be defined either
                event.target = event.srcElement || document;
            }
            
            // check if target is a textnode (safari)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }
            
            // Add relatedTarget, if necessary
            if (!event.relatedTarget && event.fromElement) {
                event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
            }
            
            // Calculate pageX/Y if missing and clientX/Y available
            if (event.pageX == null && event.clientX != null) {
                var doc = document.documentElement, body = document.body;
                
                event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
                event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
            }
            
            // Add which for key events
            if (event.which == null && (event.charCode != null || event.keyCode != null)) {
                event.which = event.charCode != null ? event.charCode : event.keyCode;
            }
            
            // Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
            if (!event.metaKey && event.ctrlKey) {
                event.metaKey = event.ctrlKey;
            }
            
            // Add which for click: 1 === left; 2 === middle; 3 === right
            // Note: button is not normalized, so don't use it
            if (!event.which && event.button !== undefined) {
                event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
            }
            
            return event;
        },
        
        // Deprecated, use jQuery.guid instead
        guid: 1E8,
        
        // Deprecated, use jQuery.proxy instead
        proxy: jQuery.proxy,
        
        special: {
            ready: {
                // Make sure the ready event is setup
                setup: jQuery.bindReady,
                teardown: jQuery.noop
            },
            
            live: {
                add: function(handleObj){
                    jQuery.event.add(this, liveConvert(handleObj.origType, handleObj.selector), jQuery.extend({}, handleObj, {
                        handler: liveHandler,
                        guid: handleObj.handler.guid
                    }));
                },
                
                remove: function(handleObj){
                    jQuery.event.remove(this, liveConvert(handleObj.origType, handleObj.selector), handleObj);
                }
            },
            
            beforeunload: {
                setup: function(data, namespaces, eventHandle){
                    // We only want to do this special case on windows
                    if (jQuery.isWindow(this)) {
                        this.onbeforeunload = eventHandle;
                    }
                },
                
                teardown: function(namespaces, eventHandle){
                    if (this.onbeforeunload === eventHandle) {
                        this.onbeforeunload = null;
                    }
                }
            }
        }
    };
    
    jQuery.removeEvent = document.removeEventListener ? function(elem, type, handle){
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handle, false);
        }
    }
 : function(elem, type, handle){
        if (elem.detachEvent) {
            elem.detachEvent("on" + type, handle);
        }
    };
    
    jQuery.Event = function(src){
        // Allow instantiation without the 'new' keyword
        if (!this.preventDefault) {
            return new jQuery.Event(src);
        }
        
        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;
            // Event type
        }
        else {
            this.type = src;
        }
        
        // timeStamp is buggy for some events on Firefox(#3843)
        // So we won't rely on the native value
        this.timeStamp = jQuery.now();
        
        // Mark it as fixed
        this[jQuery.expando] = true;
    };
    
    function returnFalse(){
        return false;
    }
    function returnTrue(){
        return true;
    }
    
    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        preventDefault: function(){
            this.isDefaultPrevented = returnTrue;
            
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            
            // if preventDefault exists run it on the original event
            if (e.preventDefault) {
                e.preventDefault();
                
                // otherwise set the returnValue property of the original event to false (IE)
            }
            else {
                e.returnValue = false;
            }
        },
        stopPropagation: function(){
            this.isPropagationStopped = returnTrue;
            
            var e = this.originalEvent;
            if (!e) {
                return;
            }
            // if stopPropagation exists run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }
            // otherwise set the cancelBubble property of the original event to true (IE)
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function(){
            this.isImmediatePropagationStopped = returnTrue;
            this.stopPropagation();
        },
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse
    };
    
    // Checks if an event happened on an element within another element
    // Used in jQuery.event.special.mouseenter and mouseleave handlers
    var withinElement = function(event){
        // Check if mouse(over|out) are still within the same parent element
        var parent = event.relatedTarget;
        
        // Firefox sometimes assigns relatedTarget a XUL element
        // which we cannot access the parentNode property of
        try {
            // Traverse up the tree
            while (parent && parent !== this) {
                parent = parent.parentNode;
            }
            
            if (parent !== this) {
                // set the correct event type
                event.type = event.data;
                
                // handle event if we actually just moused on to a non sub-element
                jQuery.event.handle.apply(this, arguments);
            }
            
            // assuming we've left the element since we most likely mousedover a xul element
        } 
        catch (e) {
        }
    },    // In case of event delegation, we only need to rename the event.type,
    // liveHandler will take care of the rest.
    delegate = function(event){
        event.type = event.data;
        jQuery.event.handle.apply(this, arguments);
    };
    
    // Create mouseenter and mouseleave events
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(orig, fix){
        jQuery.event.special[orig] = {
            setup: function(data){
                jQuery.event.add(this, fix, data && data.selector ? delegate : withinElement, orig);
            },
            teardown: function(data){
                jQuery.event.remove(this, fix, data && data.selector ? delegate : withinElement);
            }
        };
    });
    
    // submit delegation
    if (!jQuery.support.submitBubbles) {
    
        jQuery.event.special.submit = {
            setup: function(data, namespaces){
                if (this.nodeName.toLowerCase() !== "form") {
                    jQuery.event.add(this, "click.specialSubmit", function(e){
                        var elem = e.target, type = elem.type;
                        
                        if ((type === "submit" || type === "image") && jQuery(elem).closest("form").length) {
                            e.liveFired = undefined;
                            return trigger("submit", this, arguments);
                        }
                    });
                    
                    jQuery.event.add(this, "keypress.specialSubmit", function(e){
                        var elem = e.target, type = elem.type;
                        
                        if ((type === "text" || type === "password") && jQuery(elem).closest("form").length && e.keyCode === 13) {
                            e.liveFired = undefined;
                            return trigger("submit", this, arguments);
                        }
                    });
                    
                }
                else {
                    return false;
                }
            },
            
            teardown: function(namespaces){
                jQuery.event.remove(this, ".specialSubmit");
            }
        };
        
    }
    
    // change delegation, happens here so we have bind.
    if (!jQuery.support.changeBubbles) {
    
        var changeFilters, getVal = function(elem){
            var type = elem.type, val = elem.value;
            
            if (type === "radio" || type === "checkbox") {
                val = elem.checked;
                
            }
            else 
                if (type === "select-multiple") {
                    val = elem.selectedIndex > -1 ? jQuery.map(elem.options, function(elem){
                        return elem.selected;
                    }).join("-") : "";
                    
                }
                else 
                    if (elem.nodeName.toLowerCase() === "select") {
                        val = elem.selectedIndex;
                    }
            
            return val;
        }, testChange = function testChange(e){
            var elem = e.target, data, val;
            
            if (!rformElems.test(elem.nodeName) || elem.readOnly) {
                return;
            }
            
            data = jQuery.data(elem, "_change_data");
            val = getVal(elem);
            
            // the current data will be also retrieved by beforeactivate
            if (e.type !== "focusout" || elem.type !== "radio") {
                jQuery.data(elem, "_change_data", val);
            }
            
            if (data === undefined || val === data) {
                return;
            }
            
            if (data != null || val) {
                e.type = "change";
                e.liveFired = undefined;
                return jQuery.event.trigger(e, arguments[1], elem);
            }
        };
        
        jQuery.event.special.change = {
            filters: {
                focusout: testChange,
                
                beforedeactivate: testChange,
                
                click: function(e){
                    var elem = e.target, type = elem.type;
                    
                    if (type === "radio" || type === "checkbox" || elem.nodeName.toLowerCase() === "select") {
                        return testChange.call(this, e);
                    }
                },
                
                // Change has to be called before submit
                // Keydown will be called before keypress, which is used in submit-event delegation
                keydown: function(e){
                    var elem = e.target, type = elem.type;
                    
                    if ((e.keyCode === 13 && elem.nodeName.toLowerCase() !== "textarea") ||
                    (e.keyCode === 32 && (type === "checkbox" || type === "radio")) ||
                    type === "select-multiple") {
                        return testChange.call(this, e);
                    }
                },
                
                // Beforeactivate happens also before the previous element is blurred
                // with this event you can't trigger a change event, but you can store
                // information
                beforeactivate: function(e){
                    var elem = e.target;
                    jQuery.data(elem, "_change_data", getVal(elem));
                }
            },
            
            setup: function(data, namespaces){
                if (this.type === "file") {
                    return false;
                }
                
                for (var type in changeFilters) {
                    jQuery.event.add(this, type + ".specialChange", changeFilters[type]);
                }
                
                return rformElems.test(this.nodeName);
            },
            
            teardown: function(namespaces){
                jQuery.event.remove(this, ".specialChange");
                
                return rformElems.test(this.nodeName);
            }
        };
        
        changeFilters = jQuery.event.special.change.filters;
        
        // Handle when the input is .focus()'d
        changeFilters.focus = changeFilters.beforeactivate;
    }
    
    function trigger(type, elem, args){
        args[0].type = type;
        return jQuery.event.handle.apply(elem, args);
    }
    
    // Create "bubbling" focus and blur events
    if (document.addEventListener) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix){
            jQuery.event.special[fix] = {
                setup: function(){
                    if (focusCounts[fix]++ === 0) {
                        document.addEventListener(orig, handler, true);
                    }
                },
                teardown: function(){
                    if (--focusCounts[fix] === 0) {
                        document.removeEventListener(orig, handler, true);
                    }
                }
            };
            
            function handler(e){
                e = jQuery.event.fix(e);
                e.type = fix;
                return jQuery.event.trigger(e, null, e.target);
            }
        });
    }
    
    jQuery.each(["bind", "one"], function(i, name){
        jQuery.fn[name] = function(type, data, fn){
            // Handle object literals
            if (typeof type === "object") {
                for (var key in type) {
                    this[name](key, data, type[key], fn);
                }
                return this;
            }
            
            if (jQuery.isFunction(data) || data === false) {
                fn = data;
                data = undefined;
            }
            
            var handler = name === "one" ? jQuery.proxy(fn, function(event){
                jQuery(this).unbind(event, handler);
                return fn.apply(this, arguments);
            }) : fn;
            
            if (type === "unload" && name !== "one") {
                this.one(type, data, fn);
                
            }
            else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.add(this[i], type, handler, data);
                }
            }
            
            return this;
        };
    });
    
    jQuery.fn.extend({
        unbind: function(type, fn){
            // Handle object literals
            if (typeof type === "object" && !type.preventDefault) {
                for (var key in type) {
                    this.unbind(key, type[key]);
                }
                
            }
            else {
                for (var i = 0, l = this.length; i < l; i++) {
                    jQuery.event.remove(this[i], type, fn);
                }
            }
            
            return this;
        },
        
        delegate: function(selector, types, data, fn){
            return this.live(types, data, fn, selector);
        },
        
        undelegate: function(selector, types, fn){
            if (arguments.length === 0) {
                return this.unbind("live");
                
            }
            else {
                return this.die(types, null, fn, selector);
            }
        },
        
        trigger: function(type, data){
            return this.each(function(){
                jQuery.event.trigger(type, data, this);
            });
        },
        
        triggerHandler: function(type, data){
            if (this[0]) {
                var event = jQuery.Event(type);
                event.preventDefault();
                event.stopPropagation();
                jQuery.event.trigger(event, data, this[0]);
                return event.result;
            }
        },
        
        toggle: function(fn){
            // Save reference to arguments for access in closure
            var args = arguments, i = 1;
            
            // link all the functions, so any of them can unbind this click handler
            while (i < args.length) {
                jQuery.proxy(fn, args[i++]);
            }
            
            return this.click(jQuery.proxy(fn, function(event){
                // Figure out which function to execute
                var lastToggle = (jQuery.data(this, "lastToggle" + fn.guid) || 0) % i;
                jQuery.data(this, "lastToggle" + fn.guid, lastToggle + 1);
                
                // Make sure that clicks stop
                event.preventDefault();
                
                // and execute the function
                return args[lastToggle].apply(this, arguments) || false;
            }));
        },
        
        hover: function(fnOver, fnOut){
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });
    
    var liveMap = {
        focus: "focusin",
        blur: "focusout",
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
    
    jQuery.each(["live", "die"], function(i, name){
        jQuery.fn[name] = function(types, data, fn, origSelector /* Internal Use Only */){
            var type, i = 0, match, namespaces, preType, selector = origSelector || this.selector, context = origSelector ? this : jQuery(this.context);
            
            if (typeof types === "object" && !types.preventDefault) {
                for (var key in types) {
                    context[name](key, data, types[key], selector);
                }
                
                return this;
            }
            
            if (jQuery.isFunction(data)) {
                fn = data;
                data = undefined;
            }
            
            types = (types || "").split(" ");
            
            while ((type = types[i++]) != null) {
                match = rnamespaces.exec(type);
                namespaces = "";
                
                if (match) {
                    namespaces = match[0];
                    type = type.replace(rnamespaces, "");
                }
                
                if (type === "hover") {
                    types.push("mouseenter" + namespaces, "mouseleave" + namespaces);
                    continue;
                }
                
                preType = type;
                
                if (type === "focus" || type === "blur") {
                    types.push(liveMap[type] + namespaces);
                    type = type + namespaces;
                    
                }
                else {
                    type = (liveMap[type] || type) + namespaces;
                }
                
                if (name === "live") {
                    // bind live handler
                    for (var j = 0, l = context.length; j < l; j++) {
                        jQuery.event.add(context[j], "live." + liveConvert(type, selector), {
                            data: data,
                            selector: selector,
                            handler: fn,
                            origType: type,
                            origHandler: fn,
                            preType: preType
                        });
                    }
                    
                }
                else {
                    // unbind live handler
                    context.unbind("live." + liveConvert(type, selector), fn);
                }
            }
            
            return this;
        };
    });
    
    function liveHandler(event){
        var stop, maxLevel, related, match, handleObj, elem, j, i, l, data, close, namespace, ret, elems = [], selectors = [], events = jQuery.data(this, this.nodeType ? "events" : "__events__");
        
        if (typeof events === "function") {
            events = events.events;
        }
        
        // Make sure we avoid non-left-click bubbling in Firefox (#3861)
        if (event.liveFired === this || !events || !events.live || event.button && event.type === "click") {
            return;
        }
        
        if (event.namespace) {
            namespace = new RegExp("(^|\\.)" + event.namespace.split(".").join("\\.(?:.*\\.)?") + "(\\.|$)");
        }
        
        event.liveFired = this;
        
        var live = events.live.slice(0);
        
        for (j = 0; j < live.length; j++) {
            handleObj = live[j];
            
            if (handleObj.origType.replace(rnamespaces, "") === event.type) {
                selectors.push(handleObj.selector);
                
            }
            else {
                live.splice(j--, 1);
            }
        }
        
        match = jQuery(event.target).closest(selectors, event.currentTarget);
        
        for (i = 0, l = match.length; i < l; i++) {
            close = match[i];
            
            for (j = 0; j < live.length; j++) {
                handleObj = live[j];
                
                if (close.selector === handleObj.selector && (!namespace || namespace.test(handleObj.namespace))) {
                    elem = close.elem;
                    related = null;
                    
                    // Those two events require additional checking
                    if (handleObj.preType === "mouseenter" || handleObj.preType === "mouseleave") {
                        event.type = handleObj.preType;
                        related = jQuery(event.relatedTarget).closest(handleObj.selector)[0];
                    }
                    
                    if (!related || related !== elem) {
                        elems.push({
                            elem: elem,
                            handleObj: handleObj,
                            level: close.level
                        });
                    }
                }
            }
        }
        
        for (i = 0, l = elems.length; i < l; i++) {
            match = elems[i];
            
            if (maxLevel && match.level > maxLevel) {
                break;
            }
            
            event.currentTarget = match.elem;
            event.data = match.handleObj.data;
            event.handleObj = match.handleObj;
            
            ret = match.handleObj.origHandler.apply(match.elem, arguments);
            
            if (ret === false || event.isPropagationStopped()) {
                maxLevel = match.level;
                
                if (ret === false) {
                    stop = false;
                }
                if (event.isImmediatePropagationStopped()) {
                    break;
                }
            }
        }
        
        return stop;
    }
    
    function liveConvert(type, selector){
        return (type && type !== "*" ? type + "." : "") + selector.replace(rperiod, "`").replace(rspace, "&");
    }
    
    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
    "change select submit keydown keypress keyup error").split(" "), function(i, name){
    
        // Handle event binding
        jQuery.fn[name] = function(data, fn){
            if (fn == null) {
                fn = data;
                data = null;
            }
            
            return arguments.length > 0 ? this.bind(name, data, fn) : this.trigger(name);
        };
        
        if (jQuery.attrFn) {
            jQuery.attrFn[name] = true;
        }
    });
    
    // Prevent memory leaks in IE
    // Window isn't included so as not to unbind existing unload events
    // More info:
    //  - http://isaacschlueter.com/2006/10/msie-memory-leaks/
    if (window.attachEvent && !window.addEventListener) {
        jQuery(window).bind("unload", function(){
            for (var id in jQuery.cache) {
                if (jQuery.cache[id].handle) {
                    // Try/Catch is to handle iframes being unloaded, see #4280
                    try {
                        jQuery.event.remove(jQuery.cache[id].handle.elem);
                    } 
                    catch (e) {
                    }
                }
            }
        });
    }
    
    
    /*!
     * Sizzle CSS Selector Engine - v1.0
     *  Copyright 2009, The Dojo Foundation
     *  Released under the MIT, BSD, and GPL Licenses.
     *  More information: http://sizzlejs.com/
     */
    (function(){
    
        var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, done = 0, toString = Object.prototype.toString, hasDuplicate = false, baseHasDuplicate = true;
        
        // Here we check if the JavaScript engine is using some sort of
        // optimization where it does not always call our comparision
        // function. If that is the case, discard the hasDuplicate value.
        //   Thus far that includes Google Chrome.
        [0, 0].sort(function(){
            baseHasDuplicate = false;
            return 0;
        });
        
        var Sizzle = function(selector, context, results, seed){
            results = results || [];
            context = context || document;
            
            var origContext = context;
            
            if (context.nodeType !== 1 && context.nodeType !== 9) {
                return [];
            }
            
            if (!selector || typeof selector !== "string") {
                return results;
            }
            
            var m, set, checkSet, extra, ret, cur, pop, i, prune = true, contextXML = Sizzle.isXML(context), parts = [], soFar = selector;
            
            // Reset the position of the chunker regexp (start from head)
            do {
                chunker.exec("");
                m = chunker.exec(soFar);
                
                if (m) {
                    soFar = m[3];
                    
                    parts.push(m[1]);
                    
                    if (m[2]) {
                        extra = m[3];
                        break;
                    }
                }
            }
            while (m);
            
            if (parts.length > 1 && origPOS.exec(selector)) {
            
                if (parts.length === 2 && Expr.relative[parts[0]]) {
                    set = posProcess(parts[0] + parts[1], context);
                    
                }
                else {
                    set = Expr.relative[parts[0]] ? [context] : Sizzle(parts.shift(), context);
                    
                    while (parts.length) {
                        selector = parts.shift();
                        
                        if (Expr.relative[selector]) {
                            selector += parts.shift();
                        }
                        
                        set = posProcess(selector, set);
                    }
                }
                
            }
            else {
                // Take a shortcut and set the context if the root selector is an ID
                // (but not if it'll be faster if the inner selector is an ID)
                if (!seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
                Expr.match.ID.test(parts[0]) &&
                !Expr.match.ID.test(parts[parts.length - 1])) {
                
                    ret = Sizzle.find(parts.shift(), context, contextXML);
                    context = ret.expr ? Sizzle.filter(ret.expr, ret.set)[0] : ret.set[0];
                }
                
                if (context) {
                    ret = seed ? {
                        expr: parts.pop(),
                        set: makeArray(seed)
                    } : Sizzle.find(parts.pop(), parts.length === 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode ? context.parentNode : context, contextXML);
                    
                    set = ret.expr ? Sizzle.filter(ret.expr, ret.set) : ret.set;
                    
                    if (parts.length > 0) {
                        checkSet = makeArray(set);
                        
                    }
                    else {
                        prune = false;
                    }
                    
                    while (parts.length) {
                        cur = parts.pop();
                        pop = cur;
                        
                        if (!Expr.relative[cur]) {
                            cur = "";
                        }
                        else {
                            pop = parts.pop();
                        }
                        
                        if (pop == null) {
                            pop = context;
                        }
                        
                        Expr.relative[cur](checkSet, pop, contextXML);
                    }
                    
                }
                else {
                    checkSet = parts = [];
                }
            }
            
            if (!checkSet) {
                checkSet = set;
            }
            
            if (!checkSet) {
                Sizzle.error(cur || selector);
            }
            
            if (toString.call(checkSet) === "[object Array]") {
                if (!prune) {
                    results.push.apply(results, checkSet);
                    
                }
                else 
                    if (context && context.nodeType === 1) {
                        for (i = 0; checkSet[i] != null; i++) {
                            if (checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && Sizzle.contains(context, checkSet[i]))) {
                                results.push(set[i]);
                            }
                        }
                        
                    }
                    else {
                        for (i = 0; checkSet[i] != null; i++) {
                            if (checkSet[i] && checkSet[i].nodeType === 1) {
                                results.push(set[i]);
                            }
                        }
                    }
                
            }
            else {
                makeArray(checkSet, results);
            }
            
            if (extra) {
                Sizzle(extra, origContext, results, seed);
                Sizzle.uniqueSort(results);
            }
            
            return results;
        };
        
        Sizzle.uniqueSort = function(results){
            if (sortOrder) {
                hasDuplicate = baseHasDuplicate;
                results.sort(sortOrder);
                
                if (hasDuplicate) {
                    for (var i = 1; i < results.length; i++) {
                        if (results[i] === results[i - 1]) {
                            results.splice(i--, 1);
                        }
                    }
                }
            }
            
            return results;
        };
        
        Sizzle.matches = function(expr, set){
            return Sizzle(expr, null, null, set);
        };
        
        Sizzle.matchesSelector = function(node, expr){
            return Sizzle(expr, null, null, [node]).length > 0;
        };
        
        Sizzle.find = function(expr, context, isXML){
            var set;
            
            if (!expr) {
                return [];
            }
            
            for (var i = 0, l = Expr.order.length; i < l; i++) {
                var match, type = Expr.order[i];
                
                if ((match = Expr.leftMatch[type].exec(expr))) {
                    var left = match[1];
                    match.splice(1, 1);
                    
                    if (left.substr(left.length - 1) !== "\\") {
                        match[1] = (match[1] || "").replace(/\\/g, "");
                        set = Expr.find[type](match, context, isXML);
                        
                        if (set != null) {
                            expr = expr.replace(Expr.match[type], "");
                            break;
                        }
                    }
                }
            }
            
            if (!set) {
                set = context.getElementsByTagName("*");
            }
            
            return {
                set: set,
                expr: expr
            };
        };
        
        Sizzle.filter = function(expr, set, inplace, not){
            var match, anyFound, old = expr, result = [], curLoop = set, isXMLFilter = set && set[0] && Sizzle.isXML(set[0]);
            
            while (expr && set.length) {
                for (var type in Expr.filter) {
                    if ((match = Expr.leftMatch[type].exec(expr)) != null && match[2]) {
                        var found, item, filter = Expr.filter[type], left = match[1];
                        
                        anyFound = false;
                        
                        match.splice(1, 1);
                        
                        if (left.substr(left.length - 1) === "\\") {
                            continue;
                        }
                        
                        if (curLoop === result) {
                            result = [];
                        }
                        
                        if (Expr.preFilter[type]) {
                            match = Expr.preFilter[type](match, curLoop, inplace, result, not, isXMLFilter);
                            
                            if (!match) {
                                anyFound = found = true;
                                
                            }
                            else 
                                if (match === true) {
                                    continue;
                                }
                        }
                        
                        if (match) {
                            for (var i = 0; (item = curLoop[i]) != null; i++) {
                                if (item) {
                                    found = filter(item, match, i, curLoop);
                                    var pass = not ^ !!found;
                                    
                                    if (inplace && found != null) {
                                        if (pass) {
                                            anyFound = true;
                                            
                                        }
                                        else {
                                            curLoop[i] = false;
                                        }
                                        
                                    }
                                    else 
                                        if (pass) {
                                            result.push(item);
                                            anyFound = true;
                                        }
                                }
                            }
                        }
                        
                        if (found !== undefined) {
                            if (!inplace) {
                                curLoop = result;
                            }
                            
                            expr = expr.replace(Expr.match[type], "");
                            
                            if (!anyFound) {
                                return [];
                            }
                            
                            break;
                        }
                    }
                }
                
                // Improper expression
                if (expr === old) {
                    if (anyFound == null) {
                        Sizzle.error(expr);
                        
                    }
                    else {
                        break;
                    }
                }
                
                old = expr;
            }
            
            return curLoop;
        };
        
        Sizzle.error = function(msg){
            throw "Syntax error, unrecognized expression: " + msg;
        };
        
        var Expr = Sizzle.selectors = {
            order: ["ID", "NAME", "TAG"],
            
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+\-]*)\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            
            leftMatch: {},
            
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            
            attrHandle: {
                href: function(elem){
                    return elem.getAttribute("href");
                }
            },
            
            relative: {
                "+": function(checkSet, part){
                    var isPartStr = typeof part === "string", isTag = isPartStr && !/\W/.test(part), isPartStrNotTag = isPartStr && !isTag;
                    
                    if (isTag) {
                        part = part.toLowerCase();
                    }
                    
                    for (var i = 0, l = checkSet.length, elem; i < l; i++) {
                        if ((elem = checkSet[i])) {
                            while ((elem = elem.previousSibling) && elem.nodeType !== 1) {
                            }
                            
                            checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ? elem || false : elem === part;
                        }
                    }
                    
                    if (isPartStrNotTag) {
                        Sizzle.filter(part, checkSet, true);
                    }
                },
                
                ">": function(checkSet, part){
                    var elem, isPartStr = typeof part === "string", i = 0, l = checkSet.length;
                    
                    if (isPartStr && !/\W/.test(part)) {
                        part = part.toLowerCase();
                        
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            
                            if (elem) {
                                var parent = elem.parentNode;
                                checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                            }
                        }
                        
                    }
                    else {
                        for (; i < l; i++) {
                            elem = checkSet[i];
                            
                            if (elem) {
                                checkSet[i] = isPartStr ? elem.parentNode : elem.parentNode === part;
                            }
                        }
                        
                        if (isPartStr) {
                            Sizzle.filter(part, checkSet, true);
                        }
                    }
                },
                
                "": function(checkSet, part, isXML){
                    var nodeCheck, doneName = done++, checkFn = dirCheck;
                    
                    if (typeof part === "string" && !/\W/.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    
                    checkFn("parentNode", part, doneName, checkSet, nodeCheck, isXML);
                },
                
                "~": function(checkSet, part, isXML){
                    var nodeCheck, doneName = done++, checkFn = dirCheck;
                    
                    if (typeof part === "string" && !/\W/.test(part)) {
                        part = part.toLowerCase();
                        nodeCheck = part;
                        checkFn = dirNodeCheck;
                    }
                    
                    checkFn("previousSibling", part, doneName, checkSet, nodeCheck, isXML);
                }
            },
            
            find: {
                ID: function(match, context, isXML){
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        return m && m.parentNode ? [m] : [];
                    }
                },
                
                NAME: function(match, context){
                    if (typeof context.getElementsByName !== "undefined") {
                        var ret = [], results = context.getElementsByName(match[1]);
                        
                        for (var i = 0, l = results.length; i < l; i++) {
                            if (results[i].getAttribute("name") === match[1]) {
                                ret.push(results[i]);
                            }
                        }
                        
                        return ret.length === 0 ? null : ret;
                    }
                },
                
                TAG: function(match, context){
                    return context.getElementsByTagName(match[1]);
                }
            },
            preFilter: {
                CLASS: function(match, curLoop, inplace, result, not, isXML){
                    match = " " + match[1].replace(/\\/g, "") + " ";
                    
                    if (isXML) {
                        return match;
                    }
                    
                    for (var i = 0, elem; (elem = curLoop[i]) != null; i++) {
                        if (elem) {
                            if (not ^ (elem.className && (" " + elem.className + " ").replace(/[\t\n]/g, " ").indexOf(match) >= 0)) {
                                if (!inplace) {
                                    result.push(elem);
                                }
                                
                            }
                            else 
                                if (inplace) {
                                    curLoop[i] = false;
                                }
                        }
                    }
                    
                    return false;
                },
                
                ID: function(match){
                    return match[1].replace(/\\/g, "");
                },
                
                TAG: function(match, curLoop){
                    return match[1].toLowerCase();
                },
                
                CHILD: function(match){
                    if (match[1] === "nth") {
                        // parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
                        var test = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
                        !/\D/.test(match[2]) && "0n+" + match[2] ||
                        match[2]);
                        
                        // calculate the numbers (first)n+(last) including if they are negative
                        match[2] = (test[1] + (test[2] || 1)) - 0;
                        match[3] = test[3] - 0;
                    }
                    
                    // TODO: Move to normal caching system
                    match[0] = done++;
                    
                    return match;
                },
                
                ATTR: function(match, curLoop, inplace, result, not, isXML){
                    var name = match[1].replace(/\\/g, "");
                    
                    if (!isXML && Expr.attrMap[name]) {
                        match[1] = Expr.attrMap[name];
                    }
                    
                    if (match[2] === "~=") {
                        match[4] = " " + match[4] + " ";
                    }
                    
                    return match;
                },
                
                PSEUDO: function(match, curLoop, inplace, result, not){
                    if (match[1] === "not") {
                        // If we're dealing with a complex expression, or a simple one
                        if ((chunker.exec(match[3]) || "").length > 1 || /^\w/.test(match[3])) {
                            match[3] = Sizzle(match[3], null, null, curLoop);
                            
                        }
                        else {
                            var ret = Sizzle.filter(match[3], curLoop, inplace, true ^ not);
                            
                            if (!inplace) {
                                result.push.apply(result, ret);
                            }
                            
                            return false;
                        }
                        
                    }
                    else 
                        if (Expr.match.POS.test(match[0]) || Expr.match.CHILD.test(match[0])) {
                            return true;
                        }
                    
                    return match;
                },
                
                POS: function(match){
                    match.unshift(true);
                    
                    return match;
                }
            },
            
            filters: {
                enabled: function(elem){
                    return elem.disabled === false && elem.type !== "hidden";
                },
                
                disabled: function(elem){
                    return elem.disabled === true;
                },
                
                checked: function(elem){
                    return elem.checked === true;
                },
                
                selected: function(elem){
                    // Accessing this property makes selected-by-default
                    // options in Safari work properly
                    elem.parentNode.selectedIndex;
                    
                    return elem.selected === true;
                },
                
                parent: function(elem){
                    return !!elem.firstChild;
                },
                
                empty: function(elem){
                    return !elem.firstChild;
                },
                
                has: function(elem, i, match){
                    return !!Sizzle(match[3], elem).length;
                },
                
                header: function(elem){
                    return (/h\d/i).test(elem.nodeName);
                },
                
                text: function(elem){
                    return "text" === elem.type;
                },
                radio: function(elem){
                    return "radio" === elem.type;
                },
                
                checkbox: function(elem){
                    return "checkbox" === elem.type;
                },
                
                file: function(elem){
                    return "file" === elem.type;
                },
                password: function(elem){
                    return "password" === elem.type;
                },
                
                submit: function(elem){
                    return "submit" === elem.type;
                },
                
                image: function(elem){
                    return "image" === elem.type;
                },
                
                reset: function(elem){
                    return "reset" === elem.type;
                },
                
                button: function(elem){
                    return "button" === elem.type || elem.nodeName.toLowerCase() === "button";
                },
                
                input: function(elem){
                    return (/input|select|textarea|button/i).test(elem.nodeName);
                }
            },
            setFilters: {
                first: function(elem, i){
                    return i === 0;
                },
                
                last: function(elem, i, match, array){
                    return i === array.length - 1;
                },
                
                even: function(elem, i){
                    return i % 2 === 0;
                },
                
                odd: function(elem, i){
                    return i % 2 === 1;
                },
                
                lt: function(elem, i, match){
                    return i < match[3] - 0;
                },
                
                gt: function(elem, i, match){
                    return i > match[3] - 0;
                },
                
                nth: function(elem, i, match){
                    return match[3] - 0 === i;
                },
                
                eq: function(elem, i, match){
                    return match[3] - 0 === i;
                }
            },
            filter: {
                PSEUDO: function(elem, match, i, array){
                    var name = match[1], filter = Expr.filters[name];
                    
                    if (filter) {
                        return filter(elem, i, match, array);
                        
                    }
                    else 
                        if (name === "contains") {
                            return (elem.textContent || elem.innerText || Sizzle.getText([elem]) || "").indexOf(match[3]) >= 0;
                            
                        }
                        else 
                            if (name === "not") {
                                var not = match[3];
                                
                                for (var j = 0, l = not.length; j < l; j++) {
                                    if (not[j] === elem) {
                                        return false;
                                    }
                                }
                                
                                return true;
                                
                            }
                            else {
                                Sizzle.error("Syntax error, unrecognized expression: " + name);
                            }
                },
                
                CHILD: function(elem, match){
                    var type = match[1], node = elem;
                    
                    switch (type) {
                        case "only":
                        case "first":
                            while ((node = node.previousSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            
                            if (type === "first") {
                                return true;
                            }
                            
                            node = elem;
                            
                        case "last":
                            while ((node = node.nextSibling)) {
                                if (node.nodeType === 1) {
                                    return false;
                                }
                            }
                            
                            return true;
                            
                        case "nth":
                            var first = match[2], last = match[3];
                            
                            if (first === 1 && last === 0) {
                                return true;
                            }
                            
                            var doneName = match[0], parent = elem.parentNode;
                            
                            if (parent && (parent.sizcache !== doneName || !elem.nodeIndex)) {
                                var count = 0;
                                
                                for (node = parent.firstChild; node; node = node.nextSibling) {
                                    if (node.nodeType === 1) {
                                        node.nodeIndex = ++count;
                                    }
                                }
                                
                                parent.sizcache = doneName;
                            }
                            
                            var diff = elem.nodeIndex - last;
                            
                            if (first === 0) {
                                return diff === 0;
                                
                            }
                            else {
                                return (diff % first === 0 && diff / first >= 0);
                            }
                    }
                },
                
                ID: function(elem, match){
                    return elem.nodeType === 1 && elem.getAttribute("id") === match;
                },
                
                TAG: function(elem, match){
                    return (match === "*" && elem.nodeType === 1) || elem.nodeName.toLowerCase() === match;
                },
                
                CLASS: function(elem, match){
                    return (" " + (elem.className || elem.getAttribute("class")) + " ").indexOf(match) >
                    -1;
                },
                
                ATTR: function(elem, match){
                    var name = match[1], result = Expr.attrHandle[name] ? Expr.attrHandle[name](elem) : elem[name] != null ? elem[name] : elem.getAttribute(name), value = result + "", type = match[2], check = match[4];
                    
                    return result == null ? type === "!=" : type === "=" ? value === check : type === "*=" ? value.indexOf(check) >= 0 : type === "~=" ? (" " + value + " ").indexOf(check) >= 0 : !check ? value && result !== false : type === "!=" ? value !== check : type === "^=" ? value.indexOf(check) === 0 : type === "$=" ? value.substr(value.length - check.length) === check : type === "|=" ? value === check || value.substr(0, check.length + 1) === check + "-" : false;
                },
                
                POS: function(elem, match, i, array){
                    var name = match[2], filter = Expr.setFilters[name];
                    
                    if (filter) {
                        return filter(elem, i, match, array);
                    }
                }
            }
        };
        
        var origPOS = Expr.match.POS, fescape = function(all, num){
            return "\\" + (num - 0 + 1);
        };
        
        for (var type in Expr.match) {
            Expr.match[type] = new RegExp(Expr.match[type].source + (/(?![^\[]*\])(?![^\(]*\))/.source));
            Expr.leftMatch[type] = new RegExp(/(^(?:.|\r|\n)*?)/.source + Expr.match[type].source.replace(/\\(\d+)/g, fescape));
        }
        
        var makeArray = function(array, results){
            array = Array.prototype.slice.call(array, 0);
            
            if (results) {
                results.push.apply(results, array);
                return results;
            }
            
            return array;
        };
        
        // Perform a simple check to determine if the browser is capable of
        // converting a NodeList to an array using builtin methods.
        // Also verifies that the returned array holds DOM nodes
        // (which is not the case in the Blackberry browser)
        try {
            Array.prototype.slice.call(document.documentElement.childNodes, 0)[0].nodeType;
            
            // Provide a fallback method if it does not work
        } 
        catch (e) {
            makeArray = function(array, results){
                var i = 0, ret = results || [];
                
                if (toString.call(array) === "[object Array]") {
                    Array.prototype.push.apply(ret, array);
                    
                }
                else {
                    if (typeof array.length === "number") {
                        for (var l = array.length; i < l; i++) {
                            ret.push(array[i]);
                        }
                        
                    }
                    else {
                        for (; array[i]; i++) {
                            ret.push(array[i]);
                        }
                    }
                }
                
                return ret;
            };
        }
        
        var sortOrder, siblingCheck;
        
        if (document.documentElement.compareDocumentPosition) {
            sortOrder = function(a, b){
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                }
                
                if (!a.compareDocumentPosition || !b.compareDocumentPosition) {
                    return a.compareDocumentPosition ? -1 : 1;
                }
                
                return a.compareDocumentPosition(b) & 4 ? -1 : 1;
            };
            
        }
        else {
            sortOrder = function(a, b){
                var al, bl, ap = [], bp = [], aup = a.parentNode, bup = b.parentNode, cur = aup;
                
                // The nodes are identical, we can exit early
                if (a === b) {
                    hasDuplicate = true;
                    return 0;
                    
                    // If the nodes are siblings (or identical) we can do a quick check
                }
                else 
                    if (aup === bup) {
                        return siblingCheck(a, b);
                        
                    // If no parents were found then the nodes are disconnected
                    }
                    else 
                        if (!aup) {
                            return -1;
                            
                        }
                        else 
                            if (!bup) {
                                return 1;
                            }
                
                // Otherwise they're somewhere else in the tree so we need
                // to build up a full list of the parentNodes for comparison
                while (cur) {
                    ap.unshift(cur);
                    cur = cur.parentNode;
                }
                
                cur = bup;
                
                while (cur) {
                    bp.unshift(cur);
                    cur = cur.parentNode;
                }
                
                al = ap.length;
                bl = bp.length;
                
                // Start walking down the tree looking for a discrepancy
                for (var i = 0; i < al && i < bl; i++) {
                    if (ap[i] !== bp[i]) {
                        return siblingCheck(ap[i], bp[i]);
                    }
                }
                
                // We ended someplace up the tree so do a sibling check
                return i === al ? siblingCheck(a, bp[i], -1) : siblingCheck(ap[i], b, 1);
            };
            
            siblingCheck = function(a, b, ret){
                if (a === b) {
                    return ret;
                }
                
                var cur = a.nextSibling;
                
                while (cur) {
                    if (cur === b) {
                        return -1;
                    }
                    
                    cur = cur.nextSibling;
                }
                
                return 1;
            };
        }
        
        // Utility function for retreiving the text value of an array of DOM nodes
        Sizzle.getText = function(elems){
            var ret = "", elem;
            
            for (var i = 0; elems[i]; i++) {
                elem = elems[i];
                
                // Get the text from text nodes and CDATA nodes
                if (elem.nodeType === 3 || elem.nodeType === 4) {
                    ret += elem.nodeValue;
                    
                    // Traverse everything else, except comment nodes
                }
                else 
                    if (elem.nodeType !== 8) {
                        ret += Sizzle.getText(elem.childNodes);
                    }
            }
            
            return ret;
        };
        
        // Check to see if the browser returns elements by name when
        // querying by getElementById (and provide a workaround)
        (function(){
            // We're going to inject a fake input element with a specified name
            var form = document.createElement("div"), id = "script" + (new Date()).getTime(), root = document.documentElement;
            
            form.innerHTML = "<a name='" + id + "'/>";
            
            // Inject it into the root element, check its status, and remove it quickly
            root.insertBefore(form, root.firstChild);
            
            // The workaround has to do additional checks after a getElementById
            // Which slows things down for other browsers (hence the branching)
            if (document.getElementById(id)) {
                Expr.find.ID = function(match, context, isXML){
                    if (typeof context.getElementById !== "undefined" && !isXML) {
                        var m = context.getElementById(match[1]);
                        
                        return m ? m.id === match[1] || typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id").nodeValue === match[1] ? [m] : undefined : [];
                    }
                };
                
                Expr.filter.ID = function(elem, match){
                    var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                    
                    return elem.nodeType === 1 && node && node.nodeValue === match;
                };
            }
            
            root.removeChild(form);
            
            // release memory in IE
            root = form = null;
        })();
        
        (function(){
            // Check to see if the browser returns only elements
            // when doing getElementsByTagName("*")
            
            // Create a fake element
            var div = document.createElement("div");
            div.appendChild(document.createComment(""));
            
            // Make sure no comments are found
            if (div.getElementsByTagName("*").length > 0) {
                Expr.find.TAG = function(match, context){
                    var results = context.getElementsByTagName(match[1]);
                    
                    // Filter out possible comments
                    if (match[1] === "*") {
                        var tmp = [];
                        
                        for (var i = 0; results[i]; i++) {
                            if (results[i].nodeType === 1) {
                                tmp.push(results[i]);
                            }
                        }
                        
                        results = tmp;
                    }
                    
                    return results;
                };
            }
            
            // Check to see if an attribute returns normalized href attributes
            div.innerHTML = "<a href='#'></a>";
            
            if (div.firstChild && typeof div.firstChild.getAttribute !== "undefined" &&
            div.firstChild.getAttribute("href") !== "#") {
            
                Expr.attrHandle.href = function(elem){
                    return elem.getAttribute("href", 2);
                };
            }
            
            // release memory in IE
            div = null;
        })();
        
        if (document.querySelectorAll) {
            (function(){
                var oldSizzle = Sizzle, div = document.createElement("div"), id = "__sizzle__";
                
                div.innerHTML = "<p class='TEST'></p>";
                
                // Safari can't handle uppercase or unicode characters when
                // in quirks mode.
                if (div.querySelectorAll && div.querySelectorAll(".TEST").length === 0) {
                    return;
                }
                
                Sizzle = function(query, context, extra, seed){
                    context = context || document;
                    
                    // Make sure that attribute selectors are quoted
                    query = query.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    
                    // Only use querySelectorAll on non-XML documents
                    // (ID selectors don't work in non-HTML documents)
                    if (!seed && !Sizzle.isXML(context)) {
                        if (context.nodeType === 9) {
                            try {
                                return makeArray(context.querySelectorAll(query), extra);
                            } 
                            catch (qsaError) {
                            }
                            
                            // qSA works strangely on Element-rooted queries
                            // We can work around this by specifying an extra ID on the root
                            // and working up from there (Thanks to Andrew Dupont for the technique)
                            // IE 8 doesn't work on object elements
                        }
                        else 
                            if (context.nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
                                var old = context.getAttribute("id"), nid = old || id;
                                
                                if (!old) {
                                    context.setAttribute("id", nid);
                                }
                                
                                try {
                                    return makeArray(context.querySelectorAll("#" + nid + " " + query), extra);
                                    
                                } 
                                catch (pseudoError) {
                                }
                                finally {
                                    if (!old) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                    }
                    
                    return oldSizzle(query, context, extra, seed);
                };
                
                for (var prop in oldSizzle) {
                    Sizzle[prop] = oldSizzle[prop];
                }
                
                // release memory in IE
                div = null;
            })();
        }
        
        (function(){
            var html = document.documentElement, matches = html.matchesSelector || html.mozMatchesSelector || html.webkitMatchesSelector || html.msMatchesSelector, pseudoWorks = false;
            
            try {
                // This should fail with an exception
                // Gecko does not error, returns false instead
                matches.call(document.documentElement, "[test!='']:sizzle");
                
            } 
            catch (pseudoError) {
                pseudoWorks = true;
            }
            
            if (matches) {
                Sizzle.matchesSelector = function(node, expr){
                    // Make sure that attribute selectors are quoted
                    expr = expr.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    
                    if (!Sizzle.isXML(node)) {
                        try {
                            if (pseudoWorks || !Expr.match.PSEUDO.test(expr) && !/!=/.test(expr)) {
                                return matches.call(node, expr);
                            }
                        } 
                        catch (e) {
                        }
                    }
                    
                    return Sizzle(expr, null, null, [node]).length > 0;
                };
            }
        })();
        
        (function(){
            var div = document.createElement("div");
            
            div.innerHTML = "<div class='test e'></div><div class='test'></div>";
            
            // Opera can't find a second classname (in 9.6)
            // Also, make sure that getElementsByClassName actually exists
            if (!div.getElementsByClassName || div.getElementsByClassName("e").length === 0) {
                return;
            }
            
            // Safari caches class attributes, doesn't catch changes (in 3.2)
            div.lastChild.className = "e";
            
            if (div.getElementsByClassName("e").length === 1) {
                return;
            }
            
            Expr.order.splice(1, 0, "CLASS");
            Expr.find.CLASS = function(match, context, isXML){
                if (typeof context.getElementsByClassName !== "undefined" && !isXML) {
                    return context.getElementsByClassName(match[1]);
                }
            };
            
            // release memory in IE
            div = null;
        })();
        
        function dirNodeCheck(dir, cur, doneName, checkSet, nodeCheck, isXML){
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                
                if (elem) {
                    var match = false;
                    
                    elem = elem[dir];
                    
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        
                        if (elem.nodeType === 1 && !isXML) {
                            elem.sizcache = doneName;
                            elem.sizset = i;
                        }
                        
                        if (elem.nodeName.toLowerCase() === cur) {
                            match = elem;
                            break;
                        }
                        
                        elem = elem[dir];
                    }
                    
                    checkSet[i] = match;
                }
            }
        }
        
        function dirCheck(dir, cur, doneName, checkSet, nodeCheck, isXML){
            for (var i = 0, l = checkSet.length; i < l; i++) {
                var elem = checkSet[i];
                
                if (elem) {
                    var match = false;
                    
                    elem = elem[dir];
                    
                    while (elem) {
                        if (elem.sizcache === doneName) {
                            match = checkSet[elem.sizset];
                            break;
                        }
                        
                        if (elem.nodeType === 1) {
                            if (!isXML) {
                                elem.sizcache = doneName;
                                elem.sizset = i;
                            }
                            
                            if (typeof cur !== "string") {
                                if (elem === cur) {
                                    match = true;
                                    break;
                                }
                                
                            }
                            else 
                                if (Sizzle.filter(cur, [elem]).length > 0) {
                                    match = elem;
                                    break;
                                }
                        }
                        
                        elem = elem[dir];
                    }
                    
                    checkSet[i] = match;
                }
            }
        }
        
        if (document.documentElement.contains) {
            Sizzle.contains = function(a, b){
                return a !== b && (a.contains ? a.contains(b) : true);
            };
            
        }
        else 
            if (document.documentElement.compareDocumentPosition) {
                Sizzle.contains = function(a, b){
                    return !!(a.compareDocumentPosition(b) & 16);
                };
                
            }
            else {
                Sizzle.contains = function(){
                    return false;
                };
            }
        
        Sizzle.isXML = function(elem){
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833) 
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };
        
        var posProcess = function(selector, context){
            var match, tmpSet = [], later = "", root = context.nodeType ? [context] : context;
            
            // Position selectors must be done after the filter
            // And so must :not(positional) so we move all PSEUDOs to the end
            while ((match = Expr.match.PSEUDO.exec(selector))) {
                later += match[0];
                selector = selector.replace(Expr.match.PSEUDO, "");
            }
            
            selector = Expr.relative[selector] ? selector + "*" : selector;
            
            for (var i = 0, l = root.length; i < l; i++) {
                Sizzle(selector, root[i], tmpSet);
            }
            
            return Sizzle.filter(later, tmpSet);
        };
        
        // EXPOSE
        jQuery.find = Sizzle;
        jQuery.expr = Sizzle.selectors;
        jQuery.expr[":"] = jQuery.expr.filters;
        jQuery.unique = Sizzle.uniqueSort;
        jQuery.text = Sizzle.getText;
        jQuery.isXMLDoc = Sizzle.isXML;
        jQuery.contains = Sizzle.contains;
        
        
    })();
    
    
    var runtil = /Until$/, rparentsprev = /^(?:parents|prevUntil|prevAll)/,    // Note: This RegExp should be improved, or likely pulled from Sizzle
    rmultiselector = /,/, isSimple = /^.[^:#\[\.,]*$/, slice = Array.prototype.slice, POS = jQuery.expr.match.POS;
    
    jQuery.fn.extend({
        find: function(selector){
            var ret = this.pushStack("", "find", selector), length = 0;
            
            for (var i = 0, l = this.length; i < l; i++) {
                length = ret.length;
                jQuery.find(selector, this[i], ret);
                
                if (i > 0) {
                    // Make sure that the results are unique
                    for (var n = length; n < ret.length; n++) {
                        for (var r = 0; r < length; r++) {
                            if (ret[r] === ret[n]) {
                                ret.splice(n--, 1);
                                break;
                            }
                        }
                    }
                }
            }
            
            return ret;
        },
        
        has: function(target){
            var targets = jQuery(target);
            return this.filter(function(){
                for (var i = 0, l = targets.length; i < l; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },
        
        not: function(selector){
            return this.pushStack(winnow(this, selector, false), "not", selector);
        },
        
        filter: function(selector){
            return this.pushStack(winnow(this, selector, true), "filter", selector);
        },
        
        is: function(selector){
            return !!selector && jQuery.filter(selector, this).length > 0;
        },
        
        closest: function(selectors, context){
            var ret = [], i, l, cur = this[0];
            
            if (jQuery.isArray(selectors)) {
                var match, selector, matches = {}, level = 1;
                
                if (cur && selectors.length) {
                    for (i = 0, l = selectors.length; i < l; i++) {
                        selector = selectors[i];
                        
                        if (!matches[selector]) {
                            matches[selector] = jQuery.expr.match.POS.test(selector) ? jQuery(selector, context || this.context) : selector;
                        }
                    }
                    
                    while (cur && cur.ownerDocument && cur !== context) {
                        for (selector in matches) {
                            match = matches[selector];
                            
                            if (match.jquery ? match.index(cur) > -1 : jQuery(cur).is(match)) {
                                ret.push({
                                    selector: selector,
                                    elem: cur,
                                    level: level
                                });
                            }
                        }
                        
                        cur = cur.parentNode;
                        level++;
                    }
                }
                
                return ret;
            }
            
            var pos = POS.test(selectors) ? jQuery(selectors, context || this.context) : null;
            
            for (i = 0, l = this.length; i < l; i++) {
                cur = this[i];
                
                while (cur) {
                    if (pos ? pos.index(cur) > -1 : jQuery.find.matchesSelector(cur, selectors)) {
                        ret.push(cur);
                        break;
                        
                    }
                    else {
                        cur = cur.parentNode;
                        if (!cur || !cur.ownerDocument || cur === context) {
                            break;
                        }
                    }
                }
            }
            
            ret = ret.length > 1 ? jQuery.unique(ret) : ret;
            
            return this.pushStack(ret, "closest", selectors);
        },
        
        // Determine the position of an element within
        // the matched set of elements
        index: function(elem){
            if (!elem || typeof elem === "string") {
                return jQuery.inArray(this[0],                // If it receives a string, the selector is used
                // If it receives nothing, the siblings are used
                elem ? jQuery(elem) : this.parent().children());
            }
            // Locate the position of the desired element
            return jQuery.inArray(            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem, this);
        },
        
        add: function(selector, context){
            var set = typeof selector === "string" ? jQuery(selector, context || this.context) : jQuery.makeArray(selector), all = jQuery.merge(this.get(), set);
            
            return this.pushStack(isDisconnected(set[0]) || isDisconnected(all[0]) ? all : jQuery.unique(all));
        },
        
        andSelf: function(){
            return this.add(this.prevObject);
        }
    });
    
    // A painfully simple check to see if an element is disconnected
    // from a document (should be improved, where feasible).
    function isDisconnected(node){
        return !node || !node.parentNode || node.parentNode.nodeType === 11;
    }
    
    jQuery.each({
        parent: function(elem){
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem){
            return jQuery.dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until){
            return jQuery.dir(elem, "parentNode", until);
        },
        next: function(elem){
            return jQuery.nth(elem, 2, "nextSibling");
        },
        prev: function(elem){
            return jQuery.nth(elem, 2, "previousSibling");
        },
        nextAll: function(elem){
            return jQuery.dir(elem, "nextSibling");
        },
        prevAll: function(elem){
            return jQuery.dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until){
            return jQuery.dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until){
            return jQuery.dir(elem, "previousSibling", until);
        },
        siblings: function(elem){
            return jQuery.sibling(elem.parentNode.firstChild, elem);
        },
        children: function(elem){
            return jQuery.sibling(elem.firstChild);
        },
        contents: function(elem){
            return jQuery.nodeName(elem, "iframe") ? elem.contentDocument || elem.contentWindow.document : jQuery.makeArray(elem.childNodes);
        }
    }, function(name, fn){
        jQuery.fn[name] = function(until, selector){
            var ret = jQuery.map(this, fn, until);
            
            if (!runtil.test(name)) {
                selector = until;
            }
            
            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }
            
            ret = this.length > 1 ? jQuery.unique(ret) : ret;
            
            if ((this.length > 1 || rmultiselector.test(selector)) && rparentsprev.test(name)) {
                ret = ret.reverse();
            }
            
            return this.pushStack(ret, name, slice.call(arguments).join(","));
        };
    });
    
    jQuery.extend({
        filter: function(expr, elems, not){
            if (not) {
                expr = ":not(" + expr + ")";
            }
            
            return elems.length === 1 ? jQuery.find.matchesSelector(elems[0], expr) ? [elems[0]] : [] : jQuery.find.matches(expr, elems);
        },
        
        dir: function(elem, dir, until){
            var matched = [], cur = elem[dir];
            
            while (cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery(cur).is(until))) {
                if (cur.nodeType === 1) {
                    matched.push(cur);
                }
                cur = cur[dir];
            }
            return matched;
        },
        
        nth: function(cur, result, dir, elem){
            result = result || 1;
            var num = 0;
            
            for (; cur; cur = cur[dir]) {
                if (cur.nodeType === 1 && ++num === result) {
                    break;
                }
            }
            
            return cur;
        },
        
        sibling: function(n, elem){
            var r = [];
            
            for (; n; n = n.nextSibling) {
                if (n.nodeType === 1 && n !== elem) {
                    r.push(n);
                }
            }
            
            return r;
        }
    });
    
    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, keep){
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i){
                var retVal = !!qualifier.call(elem, i, elem);
                return retVal === keep;
            });
            
        }
        else 
            if (qualifier.nodeType) {
                return jQuery.grep(elements, function(elem, i){
                    return (elem === qualifier) === keep;
                });
                
            }
            else 
                if (typeof qualifier === "string") {
                    var filtered = jQuery.grep(elements, function(elem){
                        return elem.nodeType === 1;
                    });
                    
                    if (isSimple.test(qualifier)) {
                        return jQuery.filter(qualifier, filtered, !keep);
                    }
                    else {
                        qualifier = jQuery.filter(qualifier, filtered);
                    }
                }
        
        return jQuery.grep(elements, function(elem, i){
            return (jQuery.inArray(elem, qualifier) >= 0) === keep;
        });
    }
    
    
    
    
    var rinlinejQuery = / jQuery\d+="(?:\d+|null)"/g, rleadingWhitespace = /^\s+/, rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, rtagName = /<([\w:]+)/, rtbody = /<tbody/i, rhtml = /<|&#?\w+;/, rnocache = /<(?:script|object|embed|option|style)/i,    // checked="checked" or checked (html5)
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, raction = /\=([^="'>\s]+\/)>/g, wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        area: [1, "<map>", "</map>"],
        _default: [0, "", ""]
    };
    
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    
    // IE can't serialize <link> and <script> tags normally
    if (!jQuery.support.htmlSerialize) {
        wrapMap._default = [1, "div<div>", "</div>"];
    }
    
    jQuery.fn.extend({
        text: function(text){
            if (jQuery.isFunction(text)) {
                return this.each(function(i){
                    var self = jQuery(this);
                    
                    self.text(text.call(this, i, self.text()));
                });
            }
            
            if (typeof text !== "object" && text !== undefined) {
                return this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(text));
            }
            
            return jQuery.text(this);
        },
        
        wrapAll: function(html){
            if (jQuery.isFunction(html)) {
                return this.each(function(i){
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }
            
            if (this[0]) {
                // The elements to wrap the target around
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
                
                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }
                
                wrap.map(function(){
                    var elem = this;
                    
                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }
                    
                    return elem;
                }).append(this);
            }
            
            return this;
        },
        
        wrapInner: function(html){
            if (jQuery.isFunction(html)) {
                return this.each(function(i){
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }
            
            return this.each(function(){
                var self = jQuery(this), contents = self.contents();
                
                if (contents.length) {
                    contents.wrapAll(html);
                    
                }
                else {
                    self.append(html);
                }
            });
        },
        
        wrap: function(html){
            return this.each(function(){
                jQuery(this).wrapAll(html);
            });
        },
        
        unwrap: function(){
            return this.parent().each(function(){
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        },
        
        append: function(){
            return this.domManip(arguments, true, function(elem){
                if (this.nodeType === 1) {
                    this.appendChild(elem);
                }
            });
        },
        
        prepend: function(){
            return this.domManip(arguments, true, function(elem){
                if (this.nodeType === 1) {
                    this.insertBefore(elem, this.firstChild);
                }
            });
        },
        
        before: function(){
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem){
                    this.parentNode.insertBefore(elem, this);
                });
            }
            else 
                if (arguments.length) {
                    var set = jQuery(arguments[0]);
                    set.push.apply(set, this.toArray());
                    return this.pushStack(set, "before", arguments);
                }
        },
        
        after: function(){
            if (this[0] && this[0].parentNode) {
                return this.domManip(arguments, false, function(elem){
                    this.parentNode.insertBefore(elem, this.nextSibling);
                });
            }
            else 
                if (arguments.length) {
                    var set = this.pushStack(this, "after", arguments);
                    set.push.apply(set, jQuery(arguments[0]).toArray());
                    return set;
                }
        },
        
        // keepData is for internal use only--do not document
        remove: function(selector, keepData){
            for (var i = 0, elem; (elem = this[i]) != null; i++) {
                if (!selector || jQuery.filter(selector, [elem]).length) {
                    if (!keepData && elem.nodeType === 1) {
                        jQuery.cleanData(elem.getElementsByTagName("*"));
                        jQuery.cleanData([elem]);
                    }
                    
                    if (elem.parentNode) {
                        elem.parentNode.removeChild(elem);
                    }
                }
            }
            
            return this;
        },
        
        empty: function(){
            for (var i = 0, elem; (elem = this[i]) != null; i++) {
                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                    jQuery.cleanData(elem.getElementsByTagName("*"));
                }
                
                // Remove any remaining nodes
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }
            }
            
            return this;
        },
        
        clone: function(events){
            // Do the clone
            var ret = this.map(function(){
                if (!jQuery.support.noCloneEvent && !jQuery.isXMLDoc(this)) {
                    // IE copies events bound via attachEvent when
                    // using cloneNode. Calling detachEvent on the
                    // clone will also remove the events from the orignal
                    // In order to get around this, we use innerHTML.
                    // Unfortunately, this means some modifications to
                    // attributes in IE that are actually only stored
                    // as properties will not be copied (such as the
                    // the name attribute on an input).
                    var html = this.outerHTML, ownerDocument = this.ownerDocument;
                    
                    if (!html) {
                        var div = ownerDocument.createElement("div");
                        div.appendChild(this.cloneNode(true));
                        html = div.innerHTML;
                    }
                    
                    return jQuery.clean([html.replace(rinlinejQuery, "")                    // Handle the case in IE 8 where action=/test/> self-closes a tag
                    .replace(raction, '="$1">').replace(rleadingWhitespace, "")], ownerDocument)[0];
                }
                else {
                    return this.cloneNode(true);
                }
            });
            
            // Copy the events from the original to the clone
            if (events === true) {
                cloneCopyEvent(this, ret);
                cloneCopyEvent(this.find("*"), ret.find("*"));
            }
            
            // Return the cloned set
            return ret;
        },
        
        html: function(value){
            if (value === undefined) {
                return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(rinlinejQuery, "") : null;
                
                // See if we can take a shortcut and just use innerHTML
            }
            else 
                if (typeof value === "string" && !rnocache.test(value) &&
                (jQuery.support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
                !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
                
                    value = value.replace(rxhtmlTag, "<$1></$2>");
                    
                    try {
                        for (var i = 0, l = this.length; i < l; i++) {
                            // Remove element nodes and prevent memory leaks
                            if (this[i].nodeType === 1) {
                                jQuery.cleanData(this[i].getElementsByTagName("*"));
                                this[i].innerHTML = value;
                            }
                        }
                        
                    // If using innerHTML throws an exception, use the fallback method
                    } 
                    catch (e) {
                        this.empty().append(value);
                    }
                    
                }
                else 
                    if (jQuery.isFunction(value)) {
                        this.each(function(i){
                            var self = jQuery(this);
                            
                            self.html(value.call(this, i, self.html()));
                        });
                        
                    }
                    else {
                        this.empty().append(value);
                    }
            
            return this;
        },
        
        replaceWith: function(value){
            if (this[0] && this[0].parentNode) {
                // Make sure that the elements are removed from the DOM before they are inserted
                // this can help fix replacing a parent with child elements
                if (jQuery.isFunction(value)) {
                    return this.each(function(i){
                        var self = jQuery(this), old = self.html();
                        self.replaceWith(value.call(this, i, old));
                    });
                }
                
                if (typeof value !== "string") {
                    value = jQuery(value).detach();
                }
                
                return this.each(function(){
                    var next = this.nextSibling, parent = this.parentNode;
                    
                    jQuery(this).remove();
                    
                    if (next) {
                        jQuery(next).before(value);
                    }
                    else {
                        jQuery(parent).append(value);
                    }
                });
            }
            else {
                return this.pushStack(jQuery(jQuery.isFunction(value) ? value() : value), "replaceWith", value);
            }
        },
        
        detach: function(selector){
            return this.remove(selector, true);
        },
        
        domManip: function(args, table, callback){
            var results, first, fragment, parent, value = args[0], scripts = [];
            
            // We can't cloneNode fragments that contain checked, in WebKit
            if (!jQuery.support.checkClone && arguments.length === 3 && typeof value === "string" && rchecked.test(value)) {
                return this.each(function(){
                    jQuery(this).domManip(args, table, callback, true);
                });
            }
            
            if (jQuery.isFunction(value)) {
                return this.each(function(i){
                    var self = jQuery(this);
                    args[0] = value.call(this, i, table ? self.html() : undefined);
                    self.domManip(args, table, callback);
                });
            }
            
            if (this[0]) {
                parent = value && value.parentNode;
                
                // If we're in a fragment, just use that instead of building a new one
                if (jQuery.support.parentNode && parent && parent.nodeType === 11 && parent.childNodes.length === this.length) {
                    results = {
                        fragment: parent
                    };
                    
                }
                else {
                    results = jQuery.buildFragment(args, this, scripts);
                }
                
                fragment = results.fragment;
                
                if (fragment.childNodes.length === 1) {
                    first = fragment = fragment.firstChild;
                }
                else {
                    first = fragment.firstChild;
                }
                
                if (first) {
                    table = table && jQuery.nodeName(first, "tr");
                    
                    for (var i = 0, l = this.length; i < l; i++) {
                        callback.call(table ? root(this[i], first) : this[i], i > 0 || results.cacheable || this.length > 1 ? fragment.cloneNode(true) : fragment);
                    }
                }
                
                if (scripts.length) {
                    jQuery.each(scripts, evalScript);
                }
            }
            
            return this;
        }
    });
    
    function root(elem, cur){
        return jQuery.nodeName(elem, "table") ? (elem.getElementsByTagName("tbody")[0] ||
        elem.appendChild(elem.ownerDocument.createElement("tbody"))) : elem;
    }
    
    function cloneCopyEvent(orig, ret){
        var i = 0;
        
        ret.each(function(){
            if (this.nodeName !== (orig[i] && orig[i].nodeName)) {
                return;
            }
            
            var oldData = jQuery.data(orig[i++]), curData = jQuery.data(this, oldData), events = oldData && oldData.events;
            
            if (events) {
                delete curData.handle;
                curData.events = {};
                
                for (var type in events) {
                    for (var handler in events[type]) {
                        jQuery.event.add(this, type, events[type][handler], events[type][handler].data);
                    }
                }
            }
        });
    }
    
    jQuery.buildFragment = function(args, nodes, scripts){
        var fragment, cacheable, cacheresults, doc = (nodes && nodes[0] ? nodes[0].ownerDocument || nodes[0] : document);
        
        // Only cache "small" (1/2 KB) strings that are associated with the main document
        // Cloning options loses the selected state, so don't cache them
        // IE 6 doesn't like it when you put <object> or <embed> elements in a fragment
        // Also, WebKit does not clone 'checked' attributes on cloneNode, so don't cache
        if (args.length === 1 && typeof args[0] === "string" && args[0].length < 512 && doc === document &&
        !rnocache.test(args[0]) &&
        (jQuery.support.checkClone || !rchecked.test(args[0]))) {
        
            cacheable = true;
            cacheresults = jQuery.fragments[args[0]];
            if (cacheresults) {
                if (cacheresults !== 1) {
                    fragment = cacheresults;
                }
            }
        }
        
        if (!fragment) {
            fragment = doc.createDocumentFragment();
            jQuery.clean(args, doc, fragment, scripts);
        }
        
        if (cacheable) {
            jQuery.fragments[args[0]] = cacheresults ? fragment : 1;
        }
        
        return {
            fragment: fragment,
            cacheable: cacheable
        };
    };
    
    jQuery.fragments = {};
    
    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original){
        jQuery.fn[name] = function(selector){
            var ret = [], insert = jQuery(selector), parent = this.length === 1 && this[0].parentNode;
            
            if (parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1) {
                insert[original](this[0]);
                return this;
                
            }
            else {
                for (var i = 0, l = insert.length; i < l; i++) {
                    var elems = (i > 0 ? this.clone(true) : this).get();
                    jQuery(insert[i])[original](elems);
                    ret = ret.concat(elems);
                }
                
                return this.pushStack(ret, name, insert.selector);
            }
        };
    });
    
    jQuery.extend({
        clean: function(elems, context, fragment, scripts){
            context = context || document;
            
            // !context.createElement fails in IE with an error but returns typeof 'object'
            if (typeof context.createElement === "undefined") {
                context = context.ownerDocument || context[0] && context[0].ownerDocument || document;
            }
            
            var ret = [];
            
            for (var i = 0, elem; (elem = elems[i]) != null; i++) {
                if (typeof elem === "number") {
                    elem += "";
                }
                
                if (!elem) {
                    continue;
                }
                
                // Convert html string into DOM nodes
                if (typeof elem === "string" && !rhtml.test(elem)) {
                    elem = context.createTextNode(elem);
                    
                }
                else 
                    if (typeof elem === "string") {
                        // Fix "XHTML"-style tags in all browsers
                        elem = elem.replace(rxhtmlTag, "<$1></$2>");
                        
                        // Trim whitespace, otherwise indexOf won't work as expected
                        var tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase(), wrap = wrapMap[tag] || wrapMap._default, depth = wrap[0], div = context.createElement("div");
                        
                        // Go to html and back, then peel off extra wrappers
                        div.innerHTML = wrap[1] + elem + wrap[2];
                        
                        // Move to the right depth
                        while (depth--) {
                            div = div.lastChild;
                        }
                        
                        // Remove IE's autoinserted <tbody> from table fragments
                        if (!jQuery.support.tbody) {
                        
                            // String was a <table>, *may* have spurious <tbody>
                            var hasBody = rtbody.test(elem), tbody = tag === "table" && !hasBody ? div.firstChild && div.firstChild.childNodes :                        // String was a bare <thead> or <tfoot>
                            wrap[1] === "<table>" && !hasBody ? div.childNodes : [];
                            
                            for (var j = tbody.length - 1; j >= 0; --j) {
                                if (jQuery.nodeName(tbody[j], "tbody") && !tbody[j].childNodes.length) {
                                    tbody[j].parentNode.removeChild(tbody[j]);
                                }
                            }
                            
                        }
                        
                        // IE completely kills leading whitespace when innerHTML is used
                        if (!jQuery.support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                            div.insertBefore(context.createTextNode(rleadingWhitespace.exec(elem)[0]), div.firstChild);
                        }
                        
                        elem = div.childNodes;
                    }
                
                if (elem.nodeType) {
                    ret.push(elem);
                }
                else {
                    ret = jQuery.merge(ret, elem);
                }
            }
            
            if (fragment) {
                for (i = 0; ret[i]; i++) {
                    if (scripts && jQuery.nodeName(ret[i], "script") && (!ret[i].type || ret[i].type.toLowerCase() === "text/javascript")) {
                        scripts.push(ret[i].parentNode ? ret[i].parentNode.removeChild(ret[i]) : ret[i]);
                        
                    }
                    else {
                        if (ret[i].nodeType === 1) {
                            ret.splice.apply(ret, [i + 1, 0].concat(jQuery.makeArray(ret[i].getElementsByTagName("script"))));
                        }
                        fragment.appendChild(ret[i]);
                    }
                }
            }
            
            return ret;
        },
        
        cleanData: function(elems){
            var data, id, cache = jQuery.cache, special = jQuery.event.special, deleteExpando = jQuery.support.deleteExpando;
            
            for (var i = 0, elem; (elem = elems[i]) != null; i++) {
                if (elem.nodeName && jQuery.noData[elem.nodeName.toLowerCase()]) {
                    continue;
                }
                
                id = elem[jQuery.expando];
                
                if (id) {
                    data = cache[id];
                    
                    if (data && data.events) {
                        for (var type in data.events) {
                            if (special[type]) {
                                jQuery.event.remove(elem, type);
                                
                            }
                            else {
                                jQuery.removeEvent(elem, type, data.handle);
                            }
                        }
                    }
                    
                    if (deleteExpando) {
                        delete elem[jQuery.expando];
                        
                    }
                    else 
                        if (elem.removeAttribute) {
                            elem.removeAttribute(jQuery.expando);
                        }
                    
                    delete cache[id];
                }
            }
        }
    });
    
    function evalScript(i, elem){
        if (elem.src) {
            jQuery.ajax({
                url: elem.src,
                async: false,
                dataType: "script"
            });
        }
        else {
            jQuery.globalEval(elem.text || elem.textContent || elem.innerHTML || "");
        }
        
        if (elem.parentNode) {
            elem.parentNode.removeChild(elem);
        }
    }
    
    
    
    
    var ralpha = /alpha\([^)]*\)/i, ropacity = /opacity=([^)]*)/, rdashAlpha = /-([a-z])/ig, rupper = /([A-Z])/g, rnumpx = /^-?\d+(?:px)?$/i, rnum = /^-?\d/, cssShow = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, cssWidth = ["Left", "Right"], cssHeight = ["Top", "Bottom"], curCSS, getComputedStyle, currentStyle, fcamelCase = function(all, letter){
        return letter.toUpperCase();
    };
    
    jQuery.fn.css = function(name, value){
        // Setting 'undefined' is a no-op
        if (arguments.length === 2 && value === undefined) {
            return this;
        }
        
        return jQuery.access(this, name, value, true, function(elem, name, value){
            return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
        });
    };
    
    jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function(elem, computed){
                    if (computed) {
                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity", "opacity");
                        return ret === "" ? "1" : ret;
                        
                    }
                    else {
                        return elem.style.opacity;
                    }
                }
            }
        },
        
        // Exclude the following css properties to add px
        cssNumber: {
            "zIndex": true,
            "fontWeight": true,
            "opacity": true,
            "zoom": true,
            "lineHeight": true
        },
        
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {
            // normalize float css property
            "float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        
        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra){
            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }
            
            // Make sure that we're working with the right name
            var ret, origName = jQuery.camelCase(name), style = elem.style, hooks = jQuery.cssHooks[origName];
            
            name = jQuery.cssProps[origName] || origName;
            
            // Check if we're setting a value
            if (value !== undefined) {
                // Make sure that NaN and null values aren't set. See: #7116
                if (typeof value === "number" && isNaN(value) || value == null) {
                    return;
                }
                
                // If a number was passed in, add 'px' to the (except for certain CSS properties)
                if (typeof value === "number" && !jQuery.cssNumber[origName]) {
                    value += "px";
                }
                
                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value)) !== undefined) {
                    // Wrapped to prevent IE from throwing errors when 'invalid' values are provided
                    // Fixes bug #5509
                    try {
                        style[name] = value;
                    } 
                    catch (e) {
                    }
                }
                
            }
            else {
                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
                    return ret;
                }
                
                // Otherwise just get the value from the style object
                return style[name];
            }
        },
        
        css: function(elem, name, extra){
            // Make sure that we're working with the right name
            var ret, origName = jQuery.camelCase(name), hooks = jQuery.cssHooks[origName];
            
            name = jQuery.cssProps[origName] || origName;
            
            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks && (ret = hooks.get(elem, true, extra)) !== undefined) {
                return ret;
                
                // Otherwise, if a way to get the computed value exists, use that
            }
            else 
                if (curCSS) {
                    return curCSS(elem, name, origName);
                }
        },
        
        // A method for quickly swapping in/out CSS properties to get correct calculations
        swap: function(elem, options, callback){
            var old = {};
            
            // Remember the old values, and insert the new ones
            for (var name in options) {
                old[name] = elem.style[name];
                elem.style[name] = options[name];
            }
            
            callback.call(elem);
            
            // Revert the old values
            for (name in options) {
                elem.style[name] = old[name];
            }
        },
        
        camelCase: function(string){
            return string.replace(rdashAlpha, fcamelCase);
        }
    });
    
    // DEPRECATED, Use jQuery.css() instead
    jQuery.curCSS = jQuery.css;
    
    jQuery.each(["height", "width"], function(i, name){
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra){
                var val;
                
                if (computed) {
                    if (elem.offsetWidth !== 0) {
                        val = getWH(elem, name, extra);
                        
                    }
                    else {
                        jQuery.swap(elem, cssShow, function(){
                            val = getWH(elem, name, extra);
                        });
                    }
                    
                    if (val <= 0) {
                        val = curCSS(elem, name, name);
                        
                        if (val === "0px" && currentStyle) {
                            val = currentStyle(elem, name, name);
                        }
                        
                        if (val != null) {
                            // Should return "auto" instead of 0, use 0 for
                            // temporary backwards-compat
                            return val === "" || val === "auto" ? "0px" : val;
                        }
                    }
                    
                    if (val < 0 || val == null) {
                        val = elem.style[name];
                        
                        // Should return "auto" instead of 0, use 0 for
                        // temporary backwards-compat
                        return val === "" || val === "auto" ? "0px" : val;
                    }
                    
                    return typeof val === "string" ? val : val + "px";
                }
            },
            
            set: function(elem, value){
                if (rnumpx.test(value)) {
                    // ignore negative width and height values #1599
                    value = parseFloat(value);
                    
                    if (value >= 0) {
                        return value + "px";
                    }
                    
                }
                else {
                    return value;
                }
            }
        };
    });
    
    if (!jQuery.support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed){
                // IE uses filters for opacity
                return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "") ? (parseFloat(RegExp.$1) / 100) + "" : computed ? "1" : "";
            },
            
            set: function(elem, value){
                var style = elem.style;
                
                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;
                
                // Set the alpha filter to set the opacity
                var opacity = jQuery.isNaN(value) ? "" : "alpha(opacity=" + value * 100 + ")", filter = style.filter || "";
                
                style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : style.filter + ' ' + opacity;
            }
        };
    }
    
    if (document.defaultView && document.defaultView.getComputedStyle) {
        getComputedStyle = function(elem, newName, name){
            var ret, defaultView, computedStyle;
            
            name = name.replace(rupper, "-$1").toLowerCase();
            
            if (!(defaultView = elem.ownerDocument.defaultView)) {
                return undefined;
            }
            
            if ((computedStyle = defaultView.getComputedStyle(elem, null))) {
                ret = computedStyle.getPropertyValue(name);
                if (ret === "" && !jQuery.contains(elem.ownerDocument.documentElement, elem)) {
                    ret = jQuery.style(elem, name);
                }
            }
            
            return ret;
        };
    }
    
    if (document.documentElement.currentStyle) {
        currentStyle = function(elem, name){
            var left, rsLeft, ret = elem.currentStyle && elem.currentStyle[name], style = elem.style;
            
            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
            
            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            if (!rnumpx.test(ret) && rnum.test(ret)) {
                // Remember the original values
                left = style.left;
                rsLeft = elem.runtimeStyle.left;
                
                // Put in the new values to get a computed value out
                elem.runtimeStyle.left = elem.currentStyle.left;
                style.left = name === "fontSize" ? "1em" : (ret || 0);
                ret = style.pixelLeft + "px";
                
                // Revert the changed values
                style.left = left;
                elem.runtimeStyle.left = rsLeft;
            }
            
            return ret === "" ? "auto" : ret;
        };
    }
    
    curCSS = getComputedStyle || currentStyle;
    
    function getWH(elem, name, extra){
        var which = name === "width" ? cssWidth : cssHeight, val = name === "width" ? elem.offsetWidth : elem.offsetHeight;
        
        if (extra === "border") {
            return val;
        }
        
        jQuery.each(which, function(){
            if (!extra) {
                val -= parseFloat(jQuery.css(elem, "padding" + this)) || 0;
            }
            
            if (extra === "margin") {
                val += parseFloat(jQuery.css(elem, "margin" + this)) || 0;
                
            }
            else {
                val -= parseFloat(jQuery.css(elem, "border" + this + "Width")) || 0;
            }
        });
        
        return val;
    }
    
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.hidden = function(elem){
            var width = elem.offsetWidth, height = elem.offsetHeight;
            
            return (width === 0 && height === 0) || (!jQuery.support.reliableHiddenOffsets && (elem.style.display || jQuery.css(elem, "display")) === "none");
        };
        
        jQuery.expr.filters.visible = function(elem){
            return !jQuery.expr.filters.hidden(elem);
        };
    }
    
    
    
    
    var jsc = jQuery.now(), rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, rselectTextarea = /^(?:select|textarea)/i, rinput = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, rnoContent = /^(?:GET|HEAD)$/, rbracket = /\[\]$/, jsre = /\=\?(&|$)/, rquery = /\?/, rts = /([?&])_=[^&]*/, rurl = /^(\w+:)?\/\/([^\/?#]+)/, r20 = /%20/g, rhash = /#.*$/,    // Keep a copy of the old load method
    _load = jQuery.fn.load;
    
    jQuery.fn.extend({
        load: function(url, params, callback){
            if (typeof url !== "string" && _load) {
                return _load.apply(this, arguments);
                
                // Don't do a request if no elements are being requested
            }
            else 
                if (!this.length) {
                    return this;
                }
            
            var off = url.indexOf(" ");
            if (off >= 0) {
                var selector = url.slice(off, url.length);
                url = url.slice(0, off);
            }
            
            // Default to a GET request
            var type = "GET";
            
            // If the second parameter was provided
            if (params) {
                // If it's a function
                if (jQuery.isFunction(params)) {
                    // We assume that it's the callback
                    callback = params;
                    params = null;
                    
                    // Otherwise, build a param string
                }
                else 
                    if (typeof params === "object") {
                        params = jQuery.param(params, jQuery.ajaxSettings.traditional);
                        type = "POST";
                    }
            }
            
            var self = this;
            
            // Request the remote document
            jQuery.ajax({
                url: url,
                type: type,
                dataType: "html",
                data: params,
                complete: function(res, status){
                    // If successful, inject the HTML into all the matched elements
                    if (status === "success" || status === "notmodified") {
                        // See if a selector was specified
                        self.html(selector ?                        // Create a dummy div to hold the results
                        jQuery("<div>")                        // inject the contents of the document in, removing the scripts
                        // to avoid any 'Permission Denied' errors in IE
                        .append(res.responseText.replace(rscript, ""))                        // Locate the specified elements
                        .find(selector) :                        // If not, just inject the full result
                        res.responseText);
                    }
                    
                    if (callback) {
                        self.each(callback, [res.responseText, status, res]);
                    }
                }
            });
            
            return this;
        },
        
        serialize: function(){
            return jQuery.param(this.serializeArray());
        },
        
        serializeArray: function(){
            return this.map(function(){
                return this.elements ? jQuery.makeArray(this.elements) : this;
            }).filter(function(){
                return this.name && !this.disabled &&
                (this.checked || rselectTextarea.test(this.nodeName) ||
                rinput.test(this.type));
            }).map(function(i, elem){
                var val = jQuery(this).val();
                
                return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function(val, i){
                    return {
                        name: elem.name,
                        value: val
                    };
                }) : {
                    name: elem.name,
                    value: val
                };
            }).get();
        }
    });
    
    // Attach a bunch of functions for handling common AJAX events
    jQuery.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(i, o){
        jQuery.fn[o] = function(f){
            return this.bind(o, f);
        };
    });
    
    jQuery.extend({
        get: function(url, data, callback, type){
            // shift arguments if data argument was omited
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = null;
            }
            
            return jQuery.ajax({
                type: "GET",
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        },
        
        getScript: function(url, callback){
            return jQuery.get(url, null, callback, "script");
        },
        
        getJSON: function(url, data, callback){
            return jQuery.get(url, data, callback, "json");
        },
        
        post: function(url, data, callback, type){
            // shift arguments if data argument was omited
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = {};
            }
            
            return jQuery.ajax({
                type: "POST",
                url: url,
                data: data,
                success: callback,
                dataType: type
            });
        },
        
        ajaxSetup: function(settings){
            jQuery.extend(jQuery.ajaxSettings, settings);
        },
        
        ajaxSettings: {
            url: location.href,
            global: true,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: true,
            async: true,
            /*
             timeout: 0,
             data: null,
             username: null,
             password: null,
             traditional: false,
             */
            // This function can be overriden by calling jQuery.ajaxSetup
            xhr: function(){
                return new window.XMLHttpRequest();
            },
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                script: "text/javascript, application/javascript",
                json: "application/json, text/javascript",
                text: "text/plain",
                _default: "*/*"
            }
        },
        
        ajax: function(origSettings){
            var s = jQuery.extend(true, {}, jQuery.ajaxSettings, origSettings), jsonp, status, data, type = s.type.toUpperCase(), noContent = rnoContent.test(type);
            
            s.url = s.url.replace(rhash, "");
            
            // Use original (not extended) context object if it was provided
            s.context = origSettings && origSettings.context != null ? origSettings.context : s;
            
            // convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }
            
            // Handle JSONP Parameter Callbacks
            if (s.dataType === "jsonp") {
                if (type === "GET") {
                    if (!jsre.test(s.url)) {
                        s.url += (rquery.test(s.url) ? "&" : "?") + (s.jsonp || "callback") + "=?";
                    }
                }
                else 
                    if (!s.data || !jsre.test(s.data)) {
                        s.data = (s.data ? s.data + "&" : "") + (s.jsonp || "callback") + "=?";
                    }
                s.dataType = "json";
            }
            
            // Build temporary JSONP function
            if (s.dataType === "json" && (s.data && jsre.test(s.data) || jsre.test(s.url))) {
                jsonp = s.jsonpCallback || ("jsonp" + jsc++);
                
                // Replace the =? sequence both in the query string and the data
                if (s.data) {
                    s.data = (s.data + "").replace(jsre, "=" + jsonp + "$1");
                }
                
                s.url = s.url.replace(jsre, "=" + jsonp + "$1");
                
                // We need to make sure
                // that a JSONP style response is executed properly
                s.dataType = "script";
                
                // Handle JSONP-style loading
                var customJsonp = window[jsonp];
                
                window[jsonp] = function(tmp){
                    if (jQuery.isFunction(customJsonp)) {
                        customJsonp(tmp);
                        
                    }
                    else {
                        // Garbage collect
                        window[jsonp] = undefined;
                        
                        try {
                            delete window[jsonp];
                        } 
                        catch (jsonpError) {
                        }
                    }
                    
                    data = tmp;
                    jQuery.handleSuccess(s, xhr, status, data);
                    jQuery.handleComplete(s, xhr, status, data);
                    
                    if (head) {
                        head.removeChild(script);
                    }
                };
            }
            
            if (s.dataType === "script" && s.cache === null) {
                s.cache = false;
            }
            
            if (s.cache === false && noContent) {
                var ts = jQuery.now();
                
                // try replacing _= if it is there
                var ret = s.url.replace(rts, "$1_=" + ts);
                
                // if nothing was replaced, add timestamp to the end
                s.url = ret + ((ret === s.url) ? (rquery.test(s.url) ? "&" : "?") + "_=" + ts : "");
            }
            
            // If data is available, append data to url for GET/HEAD requests
            if (s.data && noContent) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.data;
            }
            
            // Watch for a new set of requests
            if (s.global && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }
            
            // Matches an absolute URL, and saves the domain
            var parts = rurl.exec(s.url), remote = parts && (parts[1] && parts[1].toLowerCase() !== location.protocol || parts[2].toLowerCase() !== location.host);
            
            // If we're requesting a remote document
            // and trying to load JSON or Script with a GET
            if (s.dataType === "script" && type === "GET" && remote) {
                var head = document.getElementsByTagName("head")[0] || document.documentElement;
                var script = document.createElement("script");
                if (s.scriptCharset) {
                    script.charset = s.scriptCharset;
                }
                script.src = s.url;
                
                // Handle Script loading
                if (!jsonp) {
                    var done = false;
                    
                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function(){
                        if (!done &&
                        (!this.readyState ||
                        this.readyState === "loaded" ||
                        this.readyState === "complete")) {
                            done = true;
                            jQuery.handleSuccess(s, xhr, status, data);
                            jQuery.handleComplete(s, xhr, status, data);
                            
                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;
                            if (head && script.parentNode) {
                                head.removeChild(script);
                            }
                        }
                    };
                }
                
                // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
                // This arises when a base node is used (#2709 and #4378).
                head.insertBefore(script, head.firstChild);
                
                // We handle everything using the script element injection
                return undefined;
            }
            
            var requestDone = false;
            
            // Create the request object
            var xhr = s.xhr();
            
            if (!xhr) {
                return;
            }
            
            // Open the socket
            // Passing null username, generates a login popup on Opera (#2865)
            if (s.username) {
                xhr.open(type, s.url, s.async, s.username, s.password);
            }
            else {
                xhr.open(type, s.url, s.async);
            }
            
            // Need an extra try/catch for cross domain requests in Firefox 3
            try {
                // Set content-type if data specified and content-body is valid for this type
                if ((s.data != null && !noContent) || (origSettings && origSettings.contentType)) {
                    xhr.setRequestHeader("Content-Type", s.contentType);
                }
                
                // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                if (s.ifModified) {
                    if (jQuery.lastModified[s.url]) {
                        xhr.setRequestHeader("If-Modified-Since", jQuery.lastModified[s.url]);
                    }
                    
                    if (jQuery.etag[s.url]) {
                        xhr.setRequestHeader("If-None-Match", jQuery.etag[s.url]);
                    }
                }
                
                // Set header so the called script knows that it's an XMLHttpRequest
                // Only send the header if it's not a remote XHR
                if (!remote) {
                    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                }
                
                // Set the Accepts header for the server, depending on the dataType
                xhr.setRequestHeader("Accept", s.dataType && s.accepts[s.dataType] ? s.accepts[s.dataType] + ", */*; q=0.01" : s.accepts._default);
            } 
            catch (headerError) {
            }
            
            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
                // Handle the global AJAX counter
                if (s.global && jQuery.active-- === 1) {
                    jQuery.event.trigger("ajaxStop");
                }
                
                // close opended socket
                xhr.abort();
                return false;
            }
            
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxSend", [xhr, s]);
            }
            
            // Wait for a response to come back
            var onreadystatechange = xhr.onreadystatechange = function(isTimeout){
                // The request was aborted
                if (!xhr || xhr.readyState === 0 || isTimeout === "abort") {
                    // Opera doesn't call onreadystatechange before this point
                    // so we simulate the call
                    if (!requestDone) {
                        jQuery.handleComplete(s, xhr, status, data);
                    }
                    
                    requestDone = true;
                    if (xhr) {
                        xhr.onreadystatechange = jQuery.noop;
                    }
                    
                    // The transfer is complete and the data is available, or the request timed out
                }
                else 
                    if (!requestDone && xhr && (xhr.readyState === 4 || isTimeout === "timeout")) {
                        requestDone = true;
                        xhr.onreadystatechange = jQuery.noop;
                        
                        status = isTimeout === "timeout" ? "timeout" : !jQuery.httpSuccess(xhr) ? "error" : s.ifModified && jQuery.httpNotModified(xhr, s.url) ? "notmodified" : "success";
                        
                        var errMsg;
                        
                        if (status === "success") {
                            // Watch for, and catch, XML document parse errors
                            try {
                                // process the data (runs the xml through httpData regardless of callback)
                                data = jQuery.httpData(xhr, s.dataType, s);
                            } 
                            catch (parserError) {
                                status = "parsererror";
                                errMsg = parserError;
                            }
                        }
                        
                        // Make sure that the request was successful or notmodified
                        if (status === "success" || status === "notmodified") {
                            // JSONP handles its own success callback
                            if (!jsonp) {
                                jQuery.handleSuccess(s, xhr, status, data);
                            }
                        }
                        else {
                            jQuery.handleError(s, xhr, status, errMsg);
                        }
                        
                        // Fire the complete handlers
                        if (!jsonp) {
                            jQuery.handleComplete(s, xhr, status, data);
                        }
                        
                        if (isTimeout === "timeout") {
                            xhr.abort();
                        }
                        
                        // Stop memory leaks
                        if (s.async) {
                            xhr = null;
                        }
                    }
            };
            
            // Override the abort handler, if we can (IE 6 doesn't allow it, but that's OK)
            // Opera doesn't fire onreadystatechange at all on abort
            try {
                var oldAbort = xhr.abort;
                xhr.abort = function(){
                    if (xhr) {
                        // oldAbort has no call property in IE7 so
                        // just do it this way, which works in all
                        // browsers
                        Function.prototype.call.call(oldAbort, xhr);
                    }
                    
                    onreadystatechange("abort");
                };
            } 
            catch (abortError) {
            }
            
            // Timeout checker
            if (s.async && s.timeout > 0) {
                setTimeout(function(){
                    // Check to see if the request is still happening
                    if (xhr && !requestDone) {
                        onreadystatechange("timeout");
                    }
                }, s.timeout);
            }
            
            // Send the data
            try {
                xhr.send(noContent || s.data == null ? null : s.data);
                
            } 
            catch (sendError) {
                jQuery.handleError(s, xhr, null, sendError);
                
                // Fire the complete handlers
                jQuery.handleComplete(s, xhr, status, data);
            }
            
            // firefox 1.5 doesn't fire statechange for sync requests
            if (!s.async) {
                onreadystatechange();
            }
            
            // return XMLHttpRequest to allow aborting the request etc.
            return xhr;
        },
        
        // Serialize an array of form elements or a set of
        // key/values into a query string
        param: function(a, traditional){
            var s = [], add = function(key, value){
                // If value is a function, invoke it and return its value
                value = jQuery.isFunction(value) ? value() : value;
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };
            
            // Set traditional to true for jQuery <= 1.3.2 behavior.
            if (traditional === undefined) {
                traditional = jQuery.ajaxSettings.traditional;
            }
            
            // If an array was passed in, assume that it is an array of form elements.
            if (jQuery.isArray(a) || a.jquery) {
                // Serialize the form elements
                jQuery.each(a, function(){
                    add(this.name, this.value);
                });
                
            }
            else {
                // If traditional, encode the "old" way (the way 1.3.2 or older
                // did it), otherwise encode params recursively.
                for (var prefix in a) {
                    buildParams(prefix, a[prefix], traditional, add);
                }
            }
            
            // Return the resulting serialization
            return s.join("&").replace(r20, "+");
        }
    });
    
    function buildParams(prefix, obj, traditional, add){
        if (jQuery.isArray(obj) && obj.length) {
            // Serialize array item.
            jQuery.each(obj, function(i, v){
                if (traditional || rbracket.test(prefix)) {
                    // Treat each array item as a scalar.
                    add(prefix, v);
                    
                }
                else {
                    // If array item is non-scalar (array or object), encode its
                    // numeric index to resolve deserialization ambiguity issues.
                    // Note that rack (as of 1.0.0) can't currently deserialize
                    // nested arrays properly, and attempting to do so may cause
                    // a server error. Possible fixes are to modify rack's
                    // deserialization algorithm or to provide an option or flag
                    // to force array serialization to be shallow.
                    buildParams(prefix + "[" + (typeof v === "object" || jQuery.isArray(v) ? i : "") + "]", v, traditional, add);
                }
            });
            
        }
        else 
            if (!traditional && obj != null && typeof obj === "object") {
                if (jQuery.isEmptyObject(obj)) {
                    add(prefix, "");
                    
                // Serialize object item.
                }
                else {
                    jQuery.each(obj, function(k, v){
                        buildParams(prefix + "[" + k + "]", v, traditional, add);
                    });
                }
                
            }
            else {
                // Serialize scalar item.
                add(prefix, obj);
            }
    }
    
    // This is still on the jQuery object... for now
    // Want to move this to jQuery.ajax some day
    jQuery.extend({
    
        // Counter for holding the number of active queries
        active: 0,
        
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        
        handleError: function(s, xhr, status, e){
            // If a local callback was specified, fire it
            if (s.error) {
                s.error.call(s.context, xhr, status, e);
            }
            
            // Fire the global callback
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxError", [xhr, s, e]);
            }
        },
        
        handleSuccess: function(s, xhr, status, data){
            // If a local callback was specified, fire it and pass it the data
            if (s.success) {
                s.success.call(s.context, data, status, xhr);
            }
            
            // Fire the global callback
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxSuccess", [xhr, s]);
            }
        },
        
        handleComplete: function(s, xhr, status){
            // Process result
            if (s.complete) {
                s.complete.call(s.context, xhr, status);
            }
            
            // The request was completed
            if (s.global) {
                jQuery.triggerGlobal(s, "ajaxComplete", [xhr, s]);
            }
            
            // Handle the global AJAX counter
            if (s.global && jQuery.active-- === 1) {
                jQuery.event.trigger("ajaxStop");
            }
        },
        
        triggerGlobal: function(s, type, args){
            (s.context && s.context.url == null ? jQuery(s.context) : jQuery.event).trigger(type, args);
        },
        
        // Determines if an XMLHttpRequest was successful or not
        httpSuccess: function(xhr){
            try {
                // IE error sometimes returns 1223 when it should be 204 so treat it as success, see #1450
                return !xhr.status && location.protocol === "file:" ||
                xhr.status >= 200 && xhr.status < 300 ||
                xhr.status === 304 ||
                xhr.status === 1223;
            } 
            catch (e) {
            }
            
            return false;
        },
        
        // Determines if an XMLHttpRequest returns NotModified
        httpNotModified: function(xhr, url){
            var lastModified = xhr.getResponseHeader("Last-Modified"), etag = xhr.getResponseHeader("Etag");
            
            if (lastModified) {
                jQuery.lastModified[url] = lastModified;
            }
            
            if (etag) {
                jQuery.etag[url] = etag;
            }
            
            return xhr.status === 304;
        },
        
        httpData: function(xhr, type, s){
            var ct = xhr.getResponseHeader("content-type") || "", xml = type === "xml" || !type && ct.indexOf("xml") >= 0, data = xml ? xhr.responseXML : xhr.responseText;
            
            if (xml && data.documentElement.nodeName === "parsererror") {
                jQuery.error("parsererror");
            }
            
            // Allow a pre-filtering function to sanitize the response
            // s is checked to keep backwards compatibility
            if (s && s.dataFilter) {
                data = s.dataFilter(data, type);
            }
            
            // The filter can actually parse the response
            if (typeof data === "string") {
                // Get the JavaScript object, if JSON is used.
                if (type === "json" || !type && ct.indexOf("json") >= 0) {
                    data = jQuery.parseJSON(data);
                    
                    // If the type is "script", eval it in global context
                }
                else 
                    if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
                        jQuery.globalEval(data);
                    }
            }
            
            return data;
        }
        
    });
    
    /*
     * Create the request object; Microsoft failed to properly
     * implement the XMLHttpRequest in IE7 (can't request local files),
     * so we use the ActiveXObject when it is available
     * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
     * we need a fallback.
     */
    if (window.ActiveXObject) {
        jQuery.ajaxSettings.xhr = function(){
            if (window.location.protocol !== "file:") {
                try {
                    return new window.XMLHttpRequest();
                } 
                catch (xhrError) {
                }
            }
            
            try {
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch (activeError) {
            }
        };
    }
    
    // Does this browser support XHR requests?
    jQuery.support.ajax = !!jQuery.ajaxSettings.xhr();
    
    
    
    
    var elemdisplay = {}, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = /^([+\-]=)?([\d+.\-]+)(.*)$/, timerId, fxAttrs = [    // height animations
    ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],    // width animations
    ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],    // opacity animations
    ["opacity"]];
    
    jQuery.fn.extend({
        show: function(speed, easing, callback){
            var elem, display;
            
            if (speed || speed === 0) {
                return this.animate(genFx("show", 3), speed, easing, callback);
                
            }
            else {
                for (var i = 0, j = this.length; i < j; i++) {
                    elem = this[i];
                    display = elem.style.display;
                    
                    // Reset the inline display of this element to learn if it is
                    // being hidden by cascaded rules or not
                    if (!jQuery.data(elem, "olddisplay") && display === "none") {
                        display = elem.style.display = "";
                    }
                    
                    // Set elements which have been overridden with display: none
                    // in a stylesheet to whatever the default browser style is
                    // for such an element
                    if (display === "" && jQuery.css(elem, "display") === "none") {
                        jQuery.data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                    }
                }
                
                // Set the display of most of the elements in a second loop
                // to avoid the constant reflow
                for (i = 0; i < j; i++) {
                    elem = this[i];
                    display = elem.style.display;
                    
                    if (display === "" || display === "none") {
                        elem.style.display = jQuery.data(elem, "olddisplay") || "";
                    }
                }
                
                return this;
            }
        },
        
        hide: function(speed, easing, callback){
            if (speed || speed === 0) {
                return this.animate(genFx("hide", 3), speed, easing, callback);
                
            }
            else {
                for (var i = 0, j = this.length; i < j; i++) {
                    var display = jQuery.css(this[i], "display");
                    
                    if (display !== "none") {
                        jQuery.data(this[i], "olddisplay", display);
                    }
                }
                
                // Set the display of the elements in a second loop
                // to avoid the constant reflow
                for (i = 0; i < j; i++) {
                    this[i].style.display = "none";
                }
                
                return this;
            }
        },
        
        // Save the old toggle function
        _toggle: jQuery.fn.toggle,
        
        toggle: function(fn, fn2, callback){
            var bool = typeof fn === "boolean";
            
            if (jQuery.isFunction(fn) && jQuery.isFunction(fn2)) {
                this._toggle.apply(this, arguments);
                
            }
            else 
                if (fn == null || bool) {
                    this.each(function(){
                        var state = bool ? fn : jQuery(this).is(":hidden");
                        jQuery(this)[state ? "show" : "hide"]();
                    });
                    
                }
                else {
                    this.animate(genFx("toggle", 3), fn, fn2, callback);
                }
            
            return this;
        },
        
        fadeTo: function(speed, to, easing, callback){
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: to
            }, speed, easing, callback);
        },
        
        animate: function(prop, speed, easing, callback){
            var optall = jQuery.speed(speed, easing, callback);
            
            if (jQuery.isEmptyObject(prop)) {
                return this.each(optall.complete);
            }
            
            return this[optall.queue === false ? "each" : "queue"](function(){
                // XXX 'this' does not always have a nodeName when running the
                // test suite
                
                var opt = jQuery.extend({}, optall), p, isElement = this.nodeType === 1, hidden = isElement && jQuery(this).is(":hidden"), self = this;
                
                for (p in prop) {
                    var name = jQuery.camelCase(p);
                    
                    if (p !== name) {
                        prop[name] = prop[p];
                        delete prop[p];
                        p = name;
                    }
                    
                    if (prop[p] === "hide" && hidden || prop[p] === "show" && !hidden) {
                        return opt.complete.call(this);
                    }
                    
                    if (isElement && (p === "height" || p === "width")) {
                        // Make sure that nothing sneaks out
                        // Record all 3 overflow attributes because IE does not
                        // change the overflow attribute when overflowX and
                        // overflowY are set to the same value
                        opt.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY];
                        
                        // Set display property to inline-block for height/width
                        // animations on inline elements that are having width/height
                        // animated
                        if (jQuery.css(this, "display") === "inline" &&
                        jQuery.css(this, "float") === "none") {
                            if (!jQuery.support.inlineBlockNeedsLayout) {
                                this.style.display = "inline-block";
                                
                            }
                            else {
                                var display = defaultDisplay(this.nodeName);
                                
                                // inline-level elements accept inline-block;
                                // block-level elements need to be inline with layout
                                if (display === "inline") {
                                    this.style.display = "inline-block";
                                    
                                }
                                else {
                                    this.style.display = "inline";
                                    this.style.zoom = 1;
                                }
                            }
                        }
                    }
                    
                    if (jQuery.isArray(prop[p])) {
                        // Create (if needed) and add to specialEasing
                        (opt.specialEasing = opt.specialEasing || {})[p] = prop[p][1];
                        prop[p] = prop[p][0];
                    }
                }
                
                if (opt.overflow != null) {
                    this.style.overflow = "hidden";
                }
                
                opt.curAnim = jQuery.extend({}, prop);
                
                jQuery.each(prop, function(name, val){
                    var e = new jQuery.fx(self, opt, name);
                    
                    if (rfxtypes.test(val)) {
                        e[val === "toggle" ? hidden ? "show" : "hide" : val](prop);
                        
                    }
                    else {
                        var parts = rfxnum.exec(val), start = e.cur() || 0;
                        
                        if (parts) {
                            var end = parseFloat(parts[2]), unit = parts[3] || "px";
                            
                            // We need to compute starting value
                            if (unit !== "px") {
                                jQuery.style(self, name, (end || 1) + unit);
                                start = ((end || 1) / e.cur()) * start;
                                jQuery.style(self, name, start + unit);
                            }
                            
                            // If a +=/-= token was provided, we're doing a relative animation
                            if (parts[1]) {
                                end = ((parts[1] === "-=" ? -1 : 1) * end) + start;
                            }
                            
                            e.custom(start, end, unit);
                            
                        }
                        else {
                            e.custom(start, val, "");
                        }
                    }
                });
                
                // For JS strict compliance
                return true;
            });
        },
        
        stop: function(clearQueue, gotoEnd){
            var timers = jQuery.timers;
            
            if (clearQueue) {
                this.queue([]);
            }
            
            this.each(function(){
                // go in reverse order so anything added to the queue during the loop is ignored
                for (var i = timers.length - 1; i >= 0; i--) {
                    if (timers[i].elem === this) {
                        if (gotoEnd) {
                            // force the next step to be the last
                            timers[i](true);
                        }
                        
                        timers.splice(i, 1);
                    }
                }
            });
            
            // start the next in the queue if the last step wasn't forced
            if (!gotoEnd) {
                this.dequeue();
            }
            
            return this;
        }
        
    });
    
    function genFx(type, num){
        var obj = {};
        
        jQuery.each(fxAttrs.concat.apply([], fxAttrs.slice(0, num)), function(){
            obj[this] = type;
        });
        
        return obj;
    }
    
    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show", 1),
        slideUp: genFx("hide", 1),
        slideToggle: genFx("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props){
        jQuery.fn[name] = function(speed, easing, callback){
            return this.animate(props, speed, easing, callback);
        };
    });
    
    jQuery.extend({
        speed: function(speed, easing, fn){
            var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
                complete: fn || !fn && easing ||
                jQuery.isFunction(speed) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
            };
            
            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
            
            // Queueing
            opt.old = opt.complete;
            opt.complete = function(){
                if (opt.queue !== false) {
                    jQuery(this).dequeue();
                }
                if (jQuery.isFunction(opt.old)) {
                    opt.old.call(this);
                }
            };
            
            return opt;
        },
        
        easing: {
            linear: function(p, n, firstNum, diff){
                return firstNum + diff * p;
            },
            swing: function(p, n, firstNum, diff){
                return ((-Math.cos(p * Math.PI) / 2) + 0.5) * diff + firstNum;
            }
        },
        
        timers: [],
        
        fx: function(elem, options, prop){
            this.options = options;
            this.elem = elem;
            this.prop = prop;
            
            if (!options.orig) {
                options.orig = {};
            }
        }
        
    });
    
    jQuery.fx.prototype = {
        // Simple function for setting a style value
        update: function(){
            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }
            
            (jQuery.fx.step[this.prop] || jQuery.fx.step._default)(this);
        },
        
        // Get the current size
        cur: function(){
            if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
                return this.elem[this.prop];
            }
            
            var r = parseFloat(jQuery.css(this.elem, this.prop));
            return r && r > -10000 ? r : 0;
        },
        
        // Start an animation from one number to another
        custom: function(from, to, unit){
            var self = this, fx = jQuery.fx;
            
            this.startTime = jQuery.now();
            this.start = from;
            this.end = to;
            this.unit = unit || this.unit || "px";
            this.now = this.start;
            this.pos = this.state = 0;
            
            function t(gotoEnd){
                return self.step(gotoEnd);
            }
            
            t.elem = this.elem;
            
            if (t() && jQuery.timers.push(t) && !timerId) {
                timerId = setInterval(fx.tick, fx.interval);
            }
        },
        
        // Simple 'show' function
        show: function(){
            // Remember where we started, so that we can go back to it later
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.show = true;
            
            // Begin the animation
            // Make sure that we start at a small width/height to avoid any
            // flash of content
            this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
            
            // Start by showing the element
            jQuery(this.elem).show();
        },
        
        // Simple 'hide' function
        hide: function(){
            // Remember where we started, so that we can go back to it later
            this.options.orig[this.prop] = jQuery.style(this.elem, this.prop);
            this.options.hide = true;
            
            // Begin the animation
            this.custom(this.cur(), 0);
        },
        
        // Each step of an animation
        step: function(gotoEnd){
            var t = jQuery.now(), done = true;
            
            if (gotoEnd || t >= this.options.duration + this.startTime) {
                this.now = this.end;
                this.pos = this.state = 1;
                this.update();
                
                this.options.curAnim[this.prop] = true;
                
                for (var i in this.options.curAnim) {
                    if (this.options.curAnim[i] !== true) {
                        done = false;
                    }
                }
                
                if (done) {
                    // Reset the overflow
                    if (this.options.overflow != null && !jQuery.support.shrinkWrapBlocks) {
                        var elem = this.elem, options = this.options;
                        
                        jQuery.each(["", "X", "Y"], function(index, value){
                            elem.style["overflow" + value] = options.overflow[index];
                        });
                    }
                    
                    // Hide the element if the "hide" operation was done
                    if (this.options.hide) {
                        jQuery(this.elem).hide();
                    }
                    
                    // Reset the properties, if the item has been hidden or shown
                    if (this.options.hide || this.options.show) {
                        for (var p in this.options.curAnim) {
                            jQuery.style(this.elem, p, this.options.orig[p]);
                        }
                    }
                    
                    // Execute the complete function
                    this.options.complete.call(this.elem);
                }
                
                return false;
                
            }
            else {
                var n = t - this.startTime;
                this.state = n / this.options.duration;
                
                // Perform the easing function, defaults to swing
                var specialEasing = this.options.specialEasing && this.options.specialEasing[this.prop];
                var defaultEasing = this.options.easing || (jQuery.easing.swing ? "swing" : "linear");
                this.pos = jQuery.easing[specialEasing || defaultEasing](this.state, n, 0, 1, this.options.duration);
                this.now = this.start + ((this.end - this.start) * this.pos);
                
                // Perform the next step of the animation
                this.update();
            }
            
            return true;
        }
    };
    
    jQuery.extend(jQuery.fx, {
        tick: function(){
            var timers = jQuery.timers;
            
            for (var i = 0; i < timers.length; i++) {
                if (!timers[i]()) {
                    timers.splice(i--, 1);
                }
            }
            
            if (!timers.length) {
                jQuery.fx.stop();
            }
        },
        
        interval: 13,
        
        stop: function(){
            clearInterval(timerId);
            timerId = null;
        },
        
        speeds: {
            slow: 600,
            fast: 200,
            // Default speed
            _default: 400
        },
        
        step: {
            opacity: function(fx){
                jQuery.style(fx.elem, "opacity", fx.now);
            },
            
            _default: function(fx){
                if (fx.elem.style && fx.elem.style[fx.prop] != null) {
                    fx.elem.style[fx.prop] = (fx.prop === "width" || fx.prop === "height" ? Math.max(0, fx.now) : fx.now) + fx.unit;
                }
                else {
                    fx.elem[fx.prop] = fx.now;
                }
            }
        }
    });
    
    if (jQuery.expr && jQuery.expr.filters) {
        jQuery.expr.filters.animated = function(elem){
            return jQuery.grep(jQuery.timers, function(fn){
                return elem === fn.elem;
            }).length;
        };
    }
    
    function defaultDisplay(nodeName){
        if (!elemdisplay[nodeName]) {
            var elem = jQuery("<" + nodeName + ">").appendTo("body"), display = elem.css("display");
            
            elem.remove();
            
            if (display === "none" || display === "") {
                display = "block";
            }
            
            elemdisplay[nodeName] = display;
        }
        
        return elemdisplay[nodeName];
    }
    
    
    
    
    var rtable = /^t(?:able|d|h)$/i, rroot = /^(?:body|html)$/i;
    
    if ("getBoundingClientRect" in document.documentElement) {
        jQuery.fn.offset = function(options){
            var elem = this[0], box;
            
            if (options) {
                return this.each(function(i){
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            
            try {
                box = elem.getBoundingClientRect();
            } 
            catch (e) {
            }
            
            var doc = elem.ownerDocument, docElem = doc.documentElement;
            
            // Make sure we're not dealing with a disconnected DOM node
            if (!box || !jQuery.contains(docElem, elem)) {
                return box ||
                {
                    top: 0,
                    left: 0
                };
            }
            
            var body = doc.body, win = getWindow(doc), clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0, scrollTop = (win.pageYOffset || jQuery.support.boxModel && docElem.scrollTop || body.scrollTop), scrollLeft = (win.pageXOffset || jQuery.support.boxModel && docElem.scrollLeft || body.scrollLeft), top = box.top + scrollTop - clientTop, left = box.left + scrollLeft - clientLeft;
            
            return {
                top: top,
                left: left
            };
        };
        
    }
    else {
        jQuery.fn.offset = function(options){
            var elem = this[0];
            
            if (options) {
                return this.each(function(i){
                    jQuery.offset.setOffset(this, options, i);
                });
            }
            
            if (!elem || !elem.ownerDocument) {
                return null;
            }
            
            if (elem === elem.ownerDocument.body) {
                return jQuery.offset.bodyOffset(elem);
            }
            
            jQuery.offset.initialize();
            
            var computedStyle, offsetParent = elem.offsetParent, prevOffsetParent = elem, doc = elem.ownerDocument, docElem = doc.documentElement, body = doc.body, defaultView = doc.defaultView, prevComputedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle, top = elem.offsetTop, left = elem.offsetLeft;
            
            while ((elem = elem.parentNode) && elem !== body && elem !== docElem) {
                if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                    break;
                }
                
                computedStyle = defaultView ? defaultView.getComputedStyle(elem, null) : elem.currentStyle;
                top -= elem.scrollTop;
                left -= elem.scrollLeft;
                
                if (elem === offsetParent) {
                    top += elem.offsetTop;
                    left += elem.offsetLeft;
                    
                    if (jQuery.offset.doesNotAddBorder && !(jQuery.offset.doesAddBorderForTableAndCells && rtable.test(elem.nodeName))) {
                        top += parseFloat(computedStyle.borderTopWidth) || 0;
                        left += parseFloat(computedStyle.borderLeftWidth) || 0;
                    }
                    
                    prevOffsetParent = offsetParent;
                    offsetParent = elem.offsetParent;
                }
                
                if (jQuery.offset.subtractsBorderForOverflowNotVisible && computedStyle.overflow !== "visible") {
                    top += parseFloat(computedStyle.borderTopWidth) || 0;
                    left += parseFloat(computedStyle.borderLeftWidth) || 0;
                }
                
                prevComputedStyle = computedStyle;
            }
            
            if (prevComputedStyle.position === "relative" || prevComputedStyle.position === "static") {
                top += body.offsetTop;
                left += body.offsetLeft;
            }
            
            if (jQuery.offset.supportsFixedPosition && prevComputedStyle.position === "fixed") {
                top += Math.max(docElem.scrollTop, body.scrollTop);
                left += Math.max(docElem.scrollLeft, body.scrollLeft);
            }
            
            return {
                top: top,
                left: left
            };
        };
    }
    
    jQuery.offset = {
        initialize: function(){
            var body = document.body, container = document.createElement("div"), innerDiv, checkDiv, table, td, bodyMarginTop = parseFloat(jQuery.css(body, "marginTop")) || 0, html = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
            
            jQuery.extend(container.style, {
                position: "absolute",
                top: 0,
                left: 0,
                margin: 0,
                border: 0,
                width: "1px",
                height: "1px",
                visibility: "hidden"
            });
            
            container.innerHTML = html;
            body.insertBefore(container, body.firstChild);
            innerDiv = container.firstChild;
            checkDiv = innerDiv.firstChild;
            td = innerDiv.nextSibling.firstChild.firstChild;
            
            this.doesNotAddBorder = (checkDiv.offsetTop !== 5);
            this.doesAddBorderForTableAndCells = (td.offsetTop === 5);
            
            checkDiv.style.position = "fixed";
            checkDiv.style.top = "20px";
            
            // safari subtracts parent border width here which is 5px
            this.supportsFixedPosition = (checkDiv.offsetTop === 20 || checkDiv.offsetTop === 15);
            checkDiv.style.position = checkDiv.style.top = "";
            
            innerDiv.style.overflow = "hidden";
            innerDiv.style.position = "relative";
            
            this.subtractsBorderForOverflowNotVisible = (checkDiv.offsetTop === -5);
            
            this.doesNotIncludeMarginInBodyOffset = (body.offsetTop !== bodyMarginTop);
            
            body.removeChild(container);
            body = container = innerDiv = checkDiv = table = td = null;
            jQuery.offset.initialize = jQuery.noop;
        },
        
        bodyOffset: function(body){
            var top = body.offsetTop, left = body.offsetLeft;
            
            jQuery.offset.initialize();
            
            if (jQuery.offset.doesNotIncludeMarginInBodyOffset) {
                top += parseFloat(jQuery.css(body, "marginTop")) || 0;
                left += parseFloat(jQuery.css(body, "marginLeft")) || 0;
            }
            
            return {
                top: top,
                left: left
            };
        },
        
        setOffset: function(elem, options, i){
            var position = jQuery.css(elem, "position");
            
            // set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }
            
            var curElem = jQuery(elem), curOffset = curElem.offset(), curCSSTop = jQuery.css(elem, "top"), curCSSLeft = jQuery.css(elem, "left"), calculatePosition = (position === "absolute" && jQuery.inArray('auto', [curCSSTop, curCSSLeft]) > -1), props = {}, curPosition = {}, curTop, curLeft;
            
            // need to be able to calculate position if either top or left is auto and position is absolute
            if (calculatePosition) {
                curPosition = curElem.position();
            }
            
            curTop = calculatePosition ? curPosition.top : parseInt(curCSSTop, 10) || 0;
            curLeft = calculatePosition ? curPosition.left : parseInt(curCSSLeft, 10) || 0;
            
            if (jQuery.isFunction(options)) {
                options = options.call(elem, i, curOffset);
            }
            
            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }
            
            if ("using" in options) {
                options.using.call(elem, props);
            }
            else {
                curElem.css(props);
            }
        }
    };
    
    
    jQuery.fn.extend({
        position: function(){
            if (!this[0]) {
                return null;
            }
            
            var elem = this[0],            // Get *real* offsetParent
            offsetParent = this.offsetParent(),            // Get correct offsets
            offset = this.offset(), parentOffset = rroot.test(offsetParent[0].nodeName) ? {
                top: 0,
                left: 0
            } : offsetParent.offset();
            
            // Subtract element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            offset.top -= parseFloat(jQuery.css(elem, "marginTop")) || 0;
            offset.left -= parseFloat(jQuery.css(elem, "marginLeft")) || 0;
            
            // Add offsetParent borders
            parentOffset.top += parseFloat(jQuery.css(offsetParent[0], "borderTopWidth")) || 0;
            parentOffset.left += parseFloat(jQuery.css(offsetParent[0], "borderLeftWidth")) || 0;
            
            // Subtract the two offsets
            return {
                top: offset.top - parentOffset.top,
                left: offset.left - parentOffset.left
            };
        },
        
        offsetParent: function(){
            return this.map(function(){
                var offsetParent = this.offsetParent || document.body;
                while (offsetParent && (!rroot.test(offsetParent.nodeName) && jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent;
            });
        }
    });
    
    
    // Create scrollLeft and scrollTop methods
    jQuery.each(["Left", "Top"], function(i, name){
        var method = "scroll" + name;
        
        jQuery.fn[method] = function(val){
            var elem = this[0], win;
            
            if (!elem) {
                return null;
            }
            
            if (val !== undefined) {
                // Set the scroll offset
                return this.each(function(){
                    win = getWindow(this);
                    
                    if (win) {
                        win.scrollTo(!i ? val : jQuery(win).scrollLeft(), i ? val : jQuery(win).scrollTop());
                        
                    }
                    else {
                        this[method] = val;
                    }
                });
            }
            else {
                win = getWindow(elem);
                
                // Return the scroll offset
                return win ? ("pageXOffset" in win) ? win[i ? "pageYOffset" : "pageXOffset"] : jQuery.support.boxModel && win.document.documentElement[method] ||
                win.document.body[method] : elem[method];
            }
        };
    });
    
    function getWindow(elem){
        return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    
    
    
    
    // Create innerHeight, innerWidth, outerHeight and outerWidth methods
    jQuery.each(["Height", "Width"], function(i, name){
    
        var type = name.toLowerCase();
        
        // innerHeight and innerWidth
        jQuery.fn["inner" + name] = function(){
            return this[0] ? parseFloat(jQuery.css(this[0], type, "padding")) : null;
        };
        
        // outerHeight and outerWidth
        jQuery.fn["outer" + name] = function(margin){
            return this[0] ? parseFloat(jQuery.css(this[0], type, margin ? "margin" : "border")) : null;
        };
        
        jQuery.fn[type] = function(size){
            // Get window width or height
            var elem = this[0];
            if (!elem) {
                return size == null ? null : this;
            }
            
            if (jQuery.isFunction(size)) {
                return this.each(function(i){
                    var self = jQuery(this);
                    self[type](size.call(this, i, self[type]()));
                });
            }
            
            if (jQuery.isWindow(elem)) {
                // Everyone else use document.documentElement or document.body depending on Quirks vs Standards mode
                return elem.document.compatMode === "CSS1Compat" && elem.document.documentElement["client" + name] ||
                elem.document.body["client" + name];
                
                // Get document width or height
            }
            else 
                if (elem.nodeType === 9) {
                    // Either scroll[Width/Height] or offset[Width/Height], whichever is greater
                    return Math.max(elem.documentElement["client" + name], elem.body["scroll" + name], elem.documentElement["scroll" + name], elem.body["offset" + name], elem.documentElement["offset" + name]);
                    
                // Get or set width or height on the element
                }
                else 
                    if (size === undefined) {
                        var orig = jQuery.css(elem, type), ret = parseFloat(orig);
                        
                        return jQuery.isNaN(ret) ? orig : ret;
                        
                    // Set the width or height on the element (default to pixels if value is unitless)
                    }
                    else {
                        return this.css(type, typeof size === "string" ? size : size + "px");
                    }
        };
        
    });
    
    
})(window);


//**  Beginning of our stuff from old jquery file.. currently named jqueryx

// jquery timers
jQuery.fn.extend({
    everyTime: function(interval, label, fn, times){
        return this.each(function(){
            jQuery.timer.add(this, interval, label, fn, times);
        });
    },
    oneTime: function(interval, label, fn){
        return this.each(function(){
            jQuery.timer.add(this, interval, label, fn, 1);
        });
    },
    stopTime: function(label, fn){
        return this.each(function(){
            jQuery.timer.remove(this, label, fn);
        });
    }
});
jQuery.extend({
    timer: {
        global: [],
        guid: 1,
        dataKey: "jQuery.timer",
        regex: /^([0-9]+(?:\.[0-9]*)?)\s*(.*s)?$/,
        powers: {
            // Yeah this is major overkill...
            'ms': 1,
            'cs': 10,
            'ds': 100,
            's': 1000,
            'das': 10000,
            'hs': 100000,
            'ks': 1000000
        },
        timeParse: function(value){
            if (value == undefined || value == null) 
                return null;
            var result = this.regex.exec(jQuery.trim(value.toString()));
            if (result[2]) {
                var num = parseFloat(result[1]);
                var mult = this.powers[result[2]] || 1;
                return num * mult;
            }
            else {
                return value;
            }
        },
        add: function(element, interval, label, fn, times){
            var counter = 0;
            
            if (jQuery.isFunction(label)) {
                if (!times) 
                    times = fn;
                fn = label;
                label = interval;
            }
            
            interval = jQuery.timer.timeParse(interval);
            
            if (typeof interval != 'number' || isNaN(interval) || interval < 0) 
                return;
            
            if (typeof times != 'number' || isNaN(times) || times < 0) 
                times = 0;
            
            times = times || 0;
            
            var timers = jQuery.data(element, this.dataKey) || jQuery.data(element, this.dataKey, {});
            
            if (!timers[label]) 
                timers[label] = {};
            
            fn.timerID = fn.timerID || this.guid++;
            
            var handler = function(){
                if ((++counter > times && times !== 0) || fn.call(element, counter) === false) 
                    jQuery.timer.remove(element, label, fn);
            };
            
            handler.timerID = fn.timerID;
            
            if (!timers[label][fn.timerID]) 
                timers[label][fn.timerID] = window.setInterval(handler, interval);
            
            this.global.push(element);
            
        },
        remove: function(element, label, fn){
            var timers = jQuery.data(element, this.dataKey), ret;
            
            if (timers) {
            
                if (!label) {
                    for (label in timers) 
                        this.remove(element, label, fn);
                }
                else 
                    if (timers[label]) {
                        if (fn) {
                            if (fn.timerID) {
                                window.clearInterval(timers[label][fn.timerID]);
                                delete timers[label][fn.timerID];
                            }
                        }
                        else {
                            for (var fn in timers[label]) {
                                window.clearInterval(timers[label][fn]);
                                delete timers[label][fn];
                            }
                        }
                        
                        for (ret in timers[label]) 
                            break;
                        if (!ret) {
                            ret = null;
                            delete timers[label];
                        }
                    }
                
                for (ret in timers) 
                    break;
                if (!ret) 
                    jQuery.removeData(element, this.dataKey);
            }
        }
    }
});
jQuery(window).bind("unload", function(){
    jQuery.each(jQuery.timer.global, function(index, item){
        jQuery.timer.remove(item);
    });
});

// 2D Transform
(function(f, g, i, b){
    var c = 180 / Math.PI;
    var j = 200 / Math.PI;
    var e = Math.PI / 180;
    var d = 2 / 1.8;
    var h = 0.9;
    var a = Math.PI / 200;
    f.extend({
        angle: {
            runit: /(deg|g?rad)/,
            radianToDegree: function(k){
                return k * c
            },
            radianToGrad: function(k){
                return k * j
            },
            degreeToRadian: function(k){
                return k * e
            },
            degreeToGrad: function(k){
                return k * d
            },
            gradToDegree: function(k){
                return k * h
            },
            gradToRadian: function(k){
                return k * a
            }
        }
    })
})(jQuery, this, this.document);
(function(f, e, b, g){
    var c = /progid:DXImageTransform\.Microsoft\.Matrix\(.*?\)/;
    f.extend({
        transform: function(h){
            this.$elem = f(h);
            this.transformProperty = this.getTransformProperty()
        }
    });
    f.extend(f.transform, {
        funcs: ["origin", "reflect", "reflectX", "reflectXY", "reflectY", "rotateX", "rotateY", "rotateZ", "scale", "scaleX", "scaleY", "skew", "skewX", "skewY", "translate", "translateX", "translateY"],
        rfunc: {
            angle: /^rotate[X|Y|Z]|skew[X|Y]?$/,
            length: /^origin|translate[X|Y]?$/,
            scale: /^scale[X|Y]?$/,
            reflect: /^reflect(XY|X|Y)?$/
        }
    });
    f.fn.transform = function(h, i){
        return this.each(function(){
            var j = new f.transform(this);
            if (h) {
                j.transform(h, i)
            }
        })
    };
    f.transform.prototype = {
        transform: function(h, i){
            var j = this.transformProperty;
            i = f.extend(true, {
                forceMatrix: false,
                preserve: false
            }, i);
            if (i.preserve) {
                h = f.extend(true, this.getAttrs(true, true), h)
            }
            else {
                h = f.extend(true, {}, h)
            }
            this.clearAttrs();
            this.setAttrs(h);
            if (j && !i.forceMatrix) {
                return this.applyFuncs(h)
            }
            else {
                if (f.browser.msie || (j && i.forceMatrix)) {
                    return this.applyMatrix(h)
                }
            }
            return false
        },
        applyFuncs: function(j, h){
            var i = [];
            var l = this.transformProperty;
            for (var k in j) {
                if (k == "origin") {
                    this[k].apply(this, f.isArray(j[k]) ? j[k] : [j[k]])
                }
                else {
                    if (f.inArray(f.transform.funcs, k)) {
                        i.push(this.createTransformFunc(k, j[k]))
                    }
                }
            }
            this.$elem.css(l, i.join(" "));
            this.$elem.data("transformed", true);
            return true
        },
        applyMatrix: function(i){
            var t, v = this.transformProperty, q;
            var k = function(x, w){
                q[x] = parseFloat(w)
            };
            for (var l in i) {
                if (f.matrix[l]) {
                    q = f.isArray(i[l]) ? i[l] : [i[l]];
                    f.each(q, k);
                    if (!t) {
                        t = f.matrix[l].apply(this, q)
                    }
                    else {
                        t = t.x(f.matrix[l].apply(this, q))
                    }
                }
                else {
                    if (l == "origin") {
                        q = f.isArray(i[l]) ? i[l] : [i[l]];
                        this[l].apply(this, q)
                    }
                }
            }
            if (!t) {
                return
            }
            var u = parseFloat(parseFloat(t.e(1, 1)).toFixed(8)), s = parseFloat(parseFloat(t.e(2, 1)).toFixed(8)), r = parseFloat(parseFloat(t.e(1, 2)).toFixed(8)), p = parseFloat(parseFloat(t.e(2, 2)).toFixed(8)), n = parseFloat(parseFloat(t.e(1, 3)).toFixed(8)), m = parseFloat(parseFloat(t.e(2, 3)).toFixed(8));
            if (v && v.substr(0, 4) == "-moz") {
                this.$elem.css(v, "matrix(" + u + ", " + s + ", " + r + ", " + p + ", " + n + "px, " + m + "px)")
            }
            else {
                if (v) {
                    this.$elem.css(v, "matrix(" + u + ", " + s + ", " + r + ", " + p + ", " + n + ", " + m + ")")
                }
                else {
                    if (jQuery.browser.msie) {
                        var h = this.$elem[0].style;
                        var o = "progid:DXImageTransform.Microsoft.Matrix(M11=" + u + ", M12=" + r + ", M21=" + s + ", M22=" + p + ", sizingMethod='auto expand')";
                        var j = h.filter || jQuery.curCSS(this.$elem[0], "filter") || "";
                        h.filter = c.test(j) ? j.replace(c, o) : j ? j + " " + o : o;
                        this.$elem.css({
                            zoom: 1
                        });
                        this.fixPosition(t, n, m)
                    }
                }
            }
            this.$elem.data("transformed", true);
            return true
        },
        origin: function(i, l){
            var k = this.transformProperty, h = this.safeOuterHeight(), j = this.safeOuterWidth();
            switch (i) {
                case "left":
                    i = "0";
                    break;
                case "right":
                    i = j;
                    break;
                case "center":
                    i = j * 0.5;
                    break
            }
            switch (l) {
                case "top":
                    l = "0";
                    break;
                case "bottom":
                    l = h;
                    break;
                case "center":
                case g:
                    l = h * 0.5;
                    break
            }
            i = /%/.test(i) ? j * parseFloat(i) / 100 : parseFloat(i);
            if (typeof(l) !== "undefined") {
                l = /%/.test(l) ? h * parseFloat(l) / 100 : parseFloat(l)
            }
            if (k) {
                if (!l && l !== 0) {
                    this.$elem.css(k + "-origin", i + "px")
                }
                else {
                    this.$elem.css(k + "-origin", i + "px " + l + "px")
                }
            }
            if (!l && l !== 0) {
                this.setAttr("origin", i)
            }
            else {
                this.setAttr("origin", [i, l])
            }
            return true
        },
        getTransformProperty: function(){
            if (this.transformProperty) {
                return this.transformProperty
            }
            var i = this.$elem[0];
            var h;
            var j = {
                transform: "transform",
                MozTransform: "-moz-transform",
                WebkitTransform: "-webkit-transform",
                OTransform: "-o-transform"
            };
            for (var k in j) {
                if (typeof i.style[k] != "undefined") {
                    h = j[k];
                    return h
                }
            }
            return null
        },
        createTransformFunc: function(k, l){
            if (f.transform.rfunc.reflect.test(k) && l) {
                var j = f.matrix[k](), i = j.e(1, 1), h = j.e(2, 1), n = j.e(1, 2), m = j.e(2, 2);
                return "matrix(" + i + ", " + h + ", " + n + ", " + m + ", 0, 0)"
            }
            l = d(k, l);
            if (!f.isArray(l)) {
                return k + "(" + l + ")"
            }
            else {
                return k + "(" + l[0] + ", " + l[1] + ")"
            }
        },
        fixPosition: function(q, n, m){
            var s = this.safeOuterHeight(), h = this.safeOuterWidth(), l = new f.matrix.calc(q, s, h), r = this.getAttr("origin", true);
            var k = l.originOffset({
                x: parseFloat(r[0]),
                y: parseFloat(r[1])
            });
            var i = l.sides();
            var j = this.$elem.css("position");
            if (j == "static") {
                j = "relative"
            }
            var p = {
                top: 0,
                left: 0
            };
            var o = {
                position: j,
                top: (k.top + m + i.top + p.top) + "px",
                left: (k.left + n + i.left + p.left) + "px"
            };
            this.$elem.css(o)
        },
        safeOuterHeight: function(){
            return this.safeOuterLength("Height")
        },
        safeOuterWidth: function(){
            return this.safeOuterLength("Width")
        },
        safeOuterLength: function(l){
            var k = "outer" + (l.toLowerCase() == "width" ? "Width" : "Height");
            if (f.browser.msie) {
                var j = this.$elem[0];
                var h = j.style.filter;
                j.style.filter = "";
                var i = this.$elem[k]();
                j.style.filter = h;
                return i
            }
            return this.$elem[k]()
        },
        clearAttrs: function(){
            f.each(f.transform.funcs, f.proxy(function(h, j){
                if (this.$elem[0][j] !== g) {
                    this.$elem[0][j] = g
                }
            }, this))
        },
        setAttrs: function(h){
            f.each(h, f.proxy(this.setAttr, this))
        },
        setAttr: function(h, i){
            if (f.isArray(i)) {
                f.each(i, function(j){
                    i[j] = parseFloat(i[j])
                });
                i = i.join(" ")
            }
            else {
                if (i || i === 0) {
                    i = parseFloat(i)
                }
            }
            this.$elem[0][h] = i
        },
        getAttrs: function(j, i){
            var h = {}, k;
            f.each(f.transform.funcs, f.proxy(function(l, m){
                k = this.getAttr(m, j, i, true);
                if (k || k === 0) {
                    h[m] = k
                }
            }, this));
            return h
        },
        getAttr: function(m, j, i, h){
            var n = this.$elem[0][m];
            var k = /\s/;
            var l = /%/;
            if (h && !n && n !== 0) {
                return n
            }
            else {
                if (!n && n !== 0) {
                    if (m == "origin") {
                        n = this.transformProperty ? this.$elem.css(this.transformProperty + "-origin") : (this.safeOuterWidth() * 0.5) + " " + (this.safeOuterHeight() * 0.5);
                        if (l.test(n)) {
                            n = n.split(k);
                            if (l.test(n[0])) {
                                n[0] = this.safeOuterWidth() * (parseFloat(n[0]) / 100)
                            }
                            if (l.test(n[1])) {
                                n[1] = this.safeOuterHeight() * (parseFloat(n[1]) / 100)
                            }
                            n = n.join(" ")
                        }
                        n = n.replace(/px/g, "")
                    }
                    else {
                        n = f.transform.rfunc.scale.test(m) ? 1 : 0
                    }
                }
            }
            if (i) {
                if (k.test(n)) {
                    n = n.split(k)
                }
                n = d(m, n);
                if (f.isArray() && !j) {
                    n = n.join(" ")
                }
            }
            else {
                if (j && k.test(n)) {
                    n = n.split(k)
                }
            }
            return n
        }
    };
    var a = /^([+\-]=)?([\d+.\-]+)(.*)$/;
    function d(j, o){
        var q = !f.isArray(o) ? [o] : [o[0], o[1]], h = f.transform.rfunc.angle, p = f.transform.rfunc.length;
        for (var l = 0, m = q.length; l < m; l++) {
            var k = a.exec(q[l]), n = "";
            if (h.test(j)) {
                n = "deg";
                if (k[3] && !f.angle.runit.test(k[3])) {
                    k[3] = null
                }
            }
            else {
                if (p.test(j)) {
                    n = "px"
                }
            }
            if (!k) {
                q[l] = 0 + n
            }
            else {
                if (!k[3]) {
                    q[l] += n
                }
            }
        }
        return m == 1 ? q[0] : q
    }
})(jQuery, this, this.document);
(function(c, b, a, d){
    c.extend({
        matrix: {}
    });
    c.extend(c.matrix, {
        calc: function(e, f, g){
            this.matrix = e;
            this.outerHeight = f;
            this.outerWidth = g
        },
        reflect: function(){
            return $M([[-1, 0, 0], [0, -1, 0], [0, 0, 1]])
        },
        reflectX: function(){
            return $M([[1, 0, 0], [0, -1, 0], [0, 0, 1]])
        },
        reflectXY: function(){
            return $M([[0, 1, 0], [1, 0, 0], [0, 0, 1]])
        },
        reflectY: function(){
            return $M([[-1, 0, 0], [0, 1, 0], [0, 0, 1]])
        },
        rotateX: function(i){
            var f = c.angle.degreeToRadian(i), h = Math.cos(f), j = Math.sin(f);
            var g = h, e = j, l = -j, k = h;
            return $M([[1, 0, 0], [0, g, l], [0, e, k]])
        },
        rotateY: function(i){
            var f = c.angle.degreeToRadian(i), h = Math.cos(f), j = Math.sin(f);
            var g = h, e = j, l = -j, k = h;
            return $M([[g, 0, e], [0, 1, 0], [l, 0, k]])
        },
        rotateZ: function(i){
            var f = c.angle.degreeToRadian(i), h = Math.cos(f), j = Math.sin(f);
            var g = h, e = j, l = -j, k = h;
            return $M([[g, l, 0], [e, k, 0], [0, 0, 1]])
        },
        scale: function(f, e){
            f = f || f === 0 ? f : 1;
            e = e || e === 0 ? e : 1;
            return $M([[f, 0, 0], [0, e, 0], [0, 0, 1]])
        },
        scaleX: function(e){
            return c.matrix.scale(e)
        },
        scaleY: function(e){
            return c.matrix.scale(1, e)
        },
        skew: function(h, f){
            var i = c.angle.degreeToRadian(h), g = c.angle.degreeToRadian(f), e = Math.tan(i), j = Math.tan(g);
            return $M([[1, e, 0], [j, 1, 0], [0, 0, 1]])
        },
        skewX: function(g){
            var f = c.angle.degreeToRadian(g), e = Math.tan(f);
            return $M([[1, e, 0], [0, 1, 0], [0, 0, 1]])
        },
        skewY: function(f){
            var e = c.angle.degreeToRadian(f), g = Math.tan(e);
            return $M([[1, 0, 0], [g, 1, 0], [0, 0, 1]])
        },
        translate: function(f, e){
            f = f ? f : 0;
            e = e ? e : 0;
            return $M([[1, 0, f], [0, 1, e], [0, 0, 1]])
        },
        translateX: function(e){
            return c.matrix.translate(e)
        },
        translateY: function(e){
            return c.matrix.translate(0, e)
        }
    });
    c.matrix.calc.prototype = {
        coord: function(e, h){
            var f = this.matrix, g = f.x($M([[e], [h], [1]]));
            return {
                x: parseFloat(parseFloat(g.e(1, 1)).toFixed(8)),
                y: parseFloat(parseFloat(g.e(2, 1)).toFixed(8))
            }
        },
        corners: function(){
            var f = this.outerHeight, e = this.outerWidth;
            return {
                tl: this.coord(0, 0),
                bl: this.coord(0, f),
                tr: this.coord(e, 0),
                br: this.coord(e, f)
            }
        },
        sides: function(){
            var f = this.corners();
            var g = {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            }, e, i;
            for (var h in f) {
                e = f[h].x;
                i = f[h].y;
                if (i < g.top) {
                    g.top = i
                }
                if (i > g.bottom) {
                    g.bottom = i
                }
                if (e < g.left) {
                    g.left = e
                }
                if (e > g.right) {
                    g.right = e
                }
            }
            return g
        },
        size: function(){
            var e = this.sides();
            return {
                height: Math.abs(e.bottom - e.top),
                width: Math.abs(e.right - e.left)
            }
        },
        originOffset: function(h, g){
            h = h ? h : {
                x: this.outerWidth * 0.5,
                y: this.outerHeight * 0.5
            };
            g = g ? g : {
                x: 0,
                y: 0
            };
            var e = this.coord(h.x, h.y);
            var f = this.coord(g.x, g.y);
            return {
                top: (f.y - g.y) - (e.y - h.y),
                left: (f.x - g.x) - (e.x - h.x)
            }
        }
    }
})(jQuery, this, this.document);
(function(e, d, b, f){
    var a = /^([+\-]=)?([\d+.\-]+)(.*)$/;
    var c = /^(.*?)\s+([+\-]=)?([\d+.\-]+)(.*)$/;
    var h = e.fn.animate;
    e.fn.animate = function(m, j, l, k){
        if (m && !jQuery.isEmptyObject(m)) {
            var i = this;
            jQuery.each(m, function(n, o){
                for (var s = 0, t = e.transform.funcs.length; s < t; s++) {
                    if (n == e.transform.funcs[s]) {
                        var r = a.exec(o);
                        if (r) {
                            var p = parseFloat(r[2]), u = r[3] || "px", v = [];
                            v.push({
                                end: (r[1] ? r[1] : "") + p,
                                unit: u
                            });
                            var q = 0;
                            while (r = c.exec(u)) {
                                v[q].unit = r[1];
                                v.push({
                                    end: (r[2] ? r[2] : "") + parseFloat(r[3]),
                                    unit: r[4]
                                });
                                u = r[4];
                                q++
                            }
                            i.each(function(){
                                this["data-animate-" + n] = v
                            });
                            m[n] = v[0].end
                        }
                    }
                }
            })
        }
        return h.apply(this, arguments)
    };
    var g = e.fx.prototype.cur;
    e.fx.prototype.cur = function(l){
        for (var k = 0, j = e.transform.funcs.length; k < j; k++) {
            if (this.prop == e.transform.funcs[k]) {
                this.transform = this.transform || new e.transform(this.elem);
                var m = a.exec(this.transform.getAttr(this.prop));
                return parseFloat(m[2]) || 0
            }
        }
        return g.apply(this, arguments)
    };
    e.fx.multivalueInit = function(k){
        var l, i = k.transform.getAttr(k.prop, true), j = k.elem["data-animate-" + k.prop];
        k.values = [];
        if (j) {
            var m;
            e.each(j, function(n, o){
                m = i[n];
                if (!m && m !== 0) {
                    m = e.transform.rfunc.scale.test(k.prop) ? 1 : 0
                }
                m = parseFloat(m);
                if (l = a.exec(o.end)) {
                    if (l[1]) {
                        o.end = ((l[1] === "-=" ? -1 : 1) * parseFloat(l[2])) + m
                    }
                }
                k.values.push({
                    start: m,
                    end: o.end,
                    unit: o.unit
                })
            })
        }
        else {
            k.values.push({
                start: k.start,
                end: k.end,
                unit: k.unit
            })
        }
    };
    e.fx.multivalueStep = {
        _default: function(i){
            e.each(i.values, function(j, k){
                i.values[j].now = k.start + ((k.end - k.start) * i.pos)
            })
        }
    };
    e.each(e.transform.funcs, function(j, k){
        e.fx.step[k] = function(n){
            if (!n.transformInit) {
                n.transform = n.transform || new e.transform(n.elem);
                if (isNaN(n.start)) {
                    n.start = n.transform.getAttr(n.prop, true);
                    if (e.isArray(n.start)) {
                        n.start = n.start[0]
                    }
                    n.now = n.start + ((n.end - n.start) * n.pos)
                }
                e.fx.multivalueInit(n);
                if (n.values.length > 1) {
                    n.multiple = true
                }
                var m = e.transform.rfunc;
                if (m.angle.test(n.prop)) {
                    n.unit = "deg"
                }
                else {
                    if (m.scale.test(n.prop)) {
                        n.unit = ""
                    }
                    else {
                        if (m.reflect.test(n.prop)) {
                            n.unit = ""
                        }
                    }
                }
                e.each(n.values, function(o){
                    n.values[o].unit = n.unit
                });
                n.transformInit = true;
                if (n.start == n.end) {
                    return n.step(true)
                }
            }
            if (n.multiple) {
                (e.fx.multivalueStep[n.prop] || e.fx.multivalueStep._default)(n)
            }
            else {
                n.values[0].now = n.now
            }
            var l = [];
            e.each(n.values, function(o, p){
                if (p.unit == "deg") {
                    while (p.now >= 360) {
                        p.now -= 360
                    }
                    while (p.now <= -360) {
                        p.now += 360
                    }
                }
                l.push(parseFloat(parseFloat(p.now).toFixed(8)) + p.unit)
            });
            var i = {};
            i[n.prop] = n.multiple ? l : l[0];
            n.transform.transform(i, {
                preserve: true
            })
        }
    })
})(jQuery, this, this.document);
var Sylvester = {
    version: "0.1.3",
    precision: 0.000001
};
function Matrix(){
}

Matrix.prototype = {
    e: function(b, a){
        if (b < 1 || b > this.elements.length || a < 1 || a > this.elements[0].length) {
            return null
        }
        return this.elements[b - 1][a - 1]
    },
    map: function(f){
        var e = [], d = this.elements.length, h = d, c, b, g = this.elements[0].length, a;
        do {
            c = h - d;
            b = g;
            e[c] = [];
            do {
                a = g - b;
                e[c][a] = f(this.elements[c][a], c + 1, a + 1)
            }
            while (--b)
        }
        while (--d);
        return Matrix.create(e)
    },
    canMultiplyFromLeft: function(a){
        var b = a.elements || a;
        if (typeof(b[0][0]) == "undefined") {
            b = Matrix.create(b).elements
        }
        return (this.elements[0].length == b.length)
    },
    multiply: function(q){
        if (!q.elements) {
            return this.map(function(c){
                return c * q
            })
        }
        var h = q.modulus ? true : false;
        var n = q.elements || q;
        if (typeof(n[0][0]) == "undefined") {
            n = Matrix.create(n).elements
        }
        if (!this.canMultiplyFromLeft(n)) {
            return null
        }
        var e = this.elements.length, f = e, l, b, d = n[0].length, g;
        var p = this.elements[0].length, a = [], m, k, o;
        do {
            l = f - e;
            a[l] = [];
            b = d;
            do {
                g = d - b;
                m = 0;
                k = p;
                do {
                    o = p - k;
                    m += this.elements[l][o] * n[o][g]
                }
                while (--k);
                a[l][g] = m
            }
            while (--b)
        }
        while (--e);
        var n = Matrix.create(a);
        return h ? n.col(1) : n
    },
    x: function(a){
        return this.multiply(a)
    },
    setElements: function(h){
        var m, a = h.elements || h;
        if (typeof(a[0][0]) != "undefined") {
            var d = a.length, f = d, b, c, l;
            this.elements = [];
            do {
                m = f - d;
                b = a[m].length;
                c = b;
                this.elements[m] = [];
                do {
                    l = c - b;
                    this.elements[m][l] = a[m][l]
                }
                while (--b)
            }
            while (--d);
            return this
        }
        var e = a.length, g = e;
        this.elements = [];
        do {
            m = g - e;
            this.elements.push([a[m]])
        }
        while (--e);
        return this
    }
};
Matrix.create = function(a){
    var b = new Matrix();
    return b.setElements(a)
};
var $M = Matrix.create;

// jquery UI effects
jQuery.effects ||
function(f){
    function k(c){
        var a;
        if (c && c.constructor == Array && c.length == 3) 
            return c;
        if (a = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c)) 
            return [parseInt(a[1], 10), parseInt(a[2], 10), parseInt(a[3], 10)];
        if (a = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c)) 
            return [parseFloat(a[1]) * 2.55, parseFloat(a[2]) * 2.55, parseFloat(a[3]) * 2.55];
        if (a = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c)) 
            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)];
        if (a = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c)) 
            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)];
        if (/rgba\(0, 0, 0, 0\)/.exec(c)) 
            return l.transparent;
        return l[f.trim(c).toLowerCase()]
    }
    function q(c, a){
        var b;
        do {
            b = f.curCSS(c, a);
            if (b != "" && b != "transparent" || f.nodeName(c, "body")) 
                break;
            a = "backgroundColor"
        }
        while (c = c.parentNode);
        return k(b)
    }
    function m(){
        var c = document.defaultView ? document.defaultView.getComputedStyle(this, null) : this.currentStyle, a = {}, b, d;
        if (c && c.length && c[0] && c[c[0]]) 
            for (var e = c.length; e--;) {
                b = c[e];
                if (typeof c[b] == "string") {
                    d = b.replace(/\-(\w)/g, function(g, h){
                        return h.toUpperCase()
                    });
                    a[d] = c[b]
                }
            }
        else 
            for (b in c) 
                if (typeof c[b] === "string") 
                    a[b] = c[b];
        return a
    }
    function n(c){
        var a, b;
        for (a in c) {
            b = c[a];
            if (b == null || f.isFunction(b) || a in r || /scrollbar/.test(a) || !/color/i.test(a) && isNaN(parseFloat(b))) 
                delete c[a]
        }
        return c
    }
    function s(c, a){
        var b = {
            _: 0
        }, d;
        for (d in a) 
            if (c[d] != a[d]) 
                b[d] = a[d];
        return b
    }
    function j(c, a, b, d){
        if (typeof c == "object") {
            d = a;
            b = null;
            a = c;
            c = a.effect
        }
        if (f.isFunction(a)) {
            d = a;
            b = null;
            a = {}
        }
        if (f.isFunction(b)) {
            d = b;
            b = null
        }
        if (typeof a == "number" || f.fx.speeds[a]) {
            d = b;
            b = a;
            a = {}
        }
        a = a || {};
        b = b || a.duration;
        b = f.fx.off ? 0 : typeof b == "number" ? b : f.fx.speeds[b] || f.fx.speeds._default;
        d = d || a.complete;
        return [c, a, b, d]
    }
    f.effects = {};
    f.each(["backgroundColor", "borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor", "color", "outlineColor"], function(c, a){
        f.fx.step[a] = function(b){
            if (!b.colorInit) {
                b.start = q(b.elem, a);
                b.end = k(b.end);
                b.colorInit = true
            }
            b.elem.style[a] = "rgb(" + Math.max(Math.min(parseInt(b.pos * (b.end[0] - b.start[0]) + b.start[0], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[1] - b.start[1]) + b.start[1], 10), 255), 0) + "," + Math.max(Math.min(parseInt(b.pos * (b.end[2] - b.start[2]) + b.start[2], 10), 255), 0) + ")"
        }
    });
    var l = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0],
        transparent: [255, 255, 255]
    }, o = ["add", "remove", "toggle"], r = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    };
    f.effects.animateClass = function(c, a, b, d){
        if (f.isFunction(b)) {
            d = b;
            b = null
        }
        return this.each(function(){
            var e = f(this), g = e.attr("style") || " ", h = n(m.call(this)), p, t = e.attr("className");
            f.each(o, function(u, i){
                c[i] && e[i + "Class"](c[i])
            });
            p = n(m.call(this));
            e.attr("className", t);
            e.animate(s(h, p), a, b, function(){
                f.each(o, function(u, i){
                    c[i] && e[i + "Class"](c[i])
                });
                if (typeof e.attr("style") == "object") {
                    e.attr("style").cssText = "";
                    e.attr("style").cssText = g
                }
                else 
                    e.attr("style", g);
                d && d.apply(this, arguments)
            })
        })
    };
    f.fn.extend({
        _addClass: f.fn.addClass,
        addClass: function(c, a, b, d){
            return a ? f.effects.animateClass.apply(this, [{
                add: c
            }, a, b, d]) : this._addClass(c)
        },
        _removeClass: f.fn.removeClass,
        removeClass: function(c, a, b, d){
            return a ? f.effects.animateClass.apply(this, [{
                remove: c
            }, a, b, d]) : this._removeClass(c)
        },
        _toggleClass: f.fn.toggleClass,
        toggleClass: function(c, a, b, d, e){
            return typeof a == "boolean" || a === undefined ? b ? f.effects.animateClass.apply(this, [a ? {
                add: c
            } : {
                remove: c
            }, b, d, e]) : this._toggleClass(c, a) : f.effects.animateClass.apply(this, [{
                toggle: c
            }, a, b, d])
        },
        switchClass: function(c, a, b, d, e){
            return f.effects.animateClass.apply(this, [{
                add: a,
                remove: c
            }, b, d, e])
        }
    });
    f.extend(f.effects, {
        version: "1.8.2",
        save: function(c, a){
            for (var b = 0; b < a.length; b++) 
                a[b] !==
                null &&
                c.data("ec.storage." + a[b], c[0].style[a[b]])
        },
        restore: function(c, a){
            for (var b = 0; b < a.length; b++) 
                a[b] !== null && c.css(a[b], c.data("ec.storage." + a[b]))
        },
        setMode: function(c, a){
            if (a == "toggle") 
                a = c.is(":hidden") ? "show" : "hide";
            return a
        },
        getBaseline: function(c, a){
            var b;
            switch (c[0]) {
                case "top":
                    b = 0;
                    break;
                case "middle":
                    b = 0.5;
                    break;
                case "bottom":
                    b = 1;
                    break;
                default:
                    b = c[0] / a.height
            }
            switch (c[1]) {
                case "left":
                    c = 0;
                    break;
                case "center":
                    c = 0.5;
                    break;
                case "right":
                    c = 1;
                    break;
                default:
                    c = c[1] / a.width
            }
            return {
                x: c,
                y: b
            }
        },
        createWrapper: function(c){
            if (c.parent().is(".ui-effects-wrapper")) 
                return c.parent();
            var a = {
                width: c.outerWidth(true),
                height: c.outerHeight(true),
                "float": c.css("float")
            }, b = f("<div></div>").addClass("ui-effects-wrapper").css({
                fontSize: "100%",
                background: "transparent",
                border: "none",
                margin: 0,
                padding: 0
            });
            c.wrap(b);
            b = c.parent();
            if (c.css("position") == "static") {
                b.css({
                    position: "relative"
                });
                c.css({
                    position: "relative"
                })
            }
            else {
                f.extend(a, {
                    position: c.css("position"),
                    zIndex: c.css("z-index")
                });
                f.each(["top", "left", "bottom", "right"], function(d, e){
                    a[e] = c.css(e);
                    if (isNaN(parseInt(a[e], 10))) 
                        a[e] = "auto"
                });
                c.css({
                    position: "relative",
                    top: 0,
                    left: 0
                })
            }
            return b.css(a).show()
        },
        removeWrapper: function(c){
            if (c.parent().is(".ui-effects-wrapper")) 
                return c.parent().replaceWith(c);
            return c
        },
        setTransition: function(c, a, b, d){
            d = d || {};
            f.each(a, function(e, g){
                unit = c.cssUnit(g);
                if (unit[0] > 0) 
                    d[g] = unit[0] * b + unit[1]
            });
            return d
        }
    });
    f.fn.extend({
        effect: function(c){
            var a = j.apply(this, arguments);
            a = {
                options: a[1],
                duration: a[2],
                callback: a[3]
            };
            var b = f.effects[c];
            return b && !f.fx.off ? b.call(this, a) : this
        },
        _show: f.fn.show,
        show: function(c){
            if (!c ||
            typeof c == "number" ||
            f.fx.speeds[c]) 
                return this._show.apply(this, arguments);
            else {
                var a = j.apply(this, arguments);
                a[1].mode = "show";
                return this.effect.apply(this, a)
            }
        },
        _hide: f.fn.hide,
        hide: function(c){
            if (!c || typeof c == "number" || f.fx.speeds[c]) 
                return this._hide.apply(this, arguments);
            else {
                var a = j.apply(this, arguments);
                a[1].mode = "hide";
                return this.effect.apply(this, a)
            }
        },
        __toggle: f.fn.toggle,
        toggle: function(c){
            if (!c || typeof c == "number" || f.fx.speeds[c] || typeof c == "boolean" || f.isFunction(c)) 
                return this.__toggle.apply(this, arguments);
            else {
                var a = j.apply(this, arguments);
                a[1].mode = "toggle";
                return this.effect.apply(this, a)
            }
        },
        cssUnit: function(c){
            var a = this.css(c), b = [];
            f.each(["em", "px", "%", "pt"], function(d, e){
                if (a.indexOf(e) > 0) 
                    b = [parseFloat(a), e]
            });
            return b
        }
    });
    f.easing.jswing = f.easing.swing;
    f.extend(f.easing, {
        def: "easeOutQuad",
        swing: function(c, a, b, d, e){
            return f.easing[f.easing.def](c, a, b, d, e)
        },
        easeInQuad: function(c, a, b, d, e){
            return d * (a /= e) * a + b
        },
        easeOutQuad: function(c, a, b, d, e){
            return -d * (a /= e) * (a - 2) + b
        },
        easeInOutQuad: function(c, a, b, d, e){
            if ((a /= e / 2) < 1) 
                return d / 2 * a * a + b;
            return -d / 2 * (--a * (a - 2) - 1) + b
        },
        easeInCubic: function(c, a, b, d, e){
            return d * (a /= e) * a * a + b
        },
        easeOutCubic: function(c, a, b, d, e){
            return d * ((a = a / e - 1) * a * a + 1) + b
        },
        easeInOutCubic: function(c, a, b, d, e){
            if ((a /= e / 2) < 1) 
                return d / 2 * a * a * a + b;
            return d / 2 * ((a -= 2) * a * a + 2) + b
        },
        easeInQuart: function(c, a, b, d, e){
            return d * (a /= e) * a * a * a + b
        },
        easeOutQuart: function(c, a, b, d, e){
            return -d * ((a = a / e - 1) * a * a * a - 1) + b
        },
        easeInOutQuart: function(c, a, b, d, e){
            if ((a /= e / 2) < 1) 
                return d / 2 * a * a * a * a + b;
            return -d / 2 * ((a -= 2) * a * a * a - 2) +
            b
        },
        easeInQuint: function(c, a, b, d, e){
            return d * (a /= e) * a * a * a * a + b
        },
        easeOutQuint: function(c, a, b, d, e){
            return d * ((a = a / e - 1) * a * a * a * a + 1) + b
        },
        easeInOutQuint: function(c, a, b, d, e){
            if ((a /= e / 2) < 1) 
                return d / 2 * a * a * a * a * a + b;
            return d / 2 * ((a -= 2) * a * a * a * a + 2) + b
        },
        easeInSine: function(c, a, b, d, e){
            return -d * Math.cos(a / e * (Math.PI / 2)) + d + b
        },
        easeOutSine: function(c, a, b, d, e){
            return d * Math.sin(a / e * (Math.PI / 2)) + b
        },
        easeInOutSine: function(c, a, b, d, e){
            return -d / 2 * (Math.cos(Math.PI * a / e) - 1) + b
        },
        easeInExpo: function(c, a, b, d, e){
            return a == 0 ? b : d *
            Math.pow(2, 10 * (a / e - 1)) +
            b
        },
        easeOutExpo: function(c, a, b, d, e){
            return a == e ? b + d : d * (-Math.pow(2, -10 * a / e) + 1) + b
        },
        easeInOutExpo: function(c, a, b, d, e){
            if (a == 0) 
                return b;
            if (a == e) 
                return b + d;
            if ((a /= e / 2) < 1) 
                return d / 2 * Math.pow(2, 10 * (a - 1)) + b;
            return d / 2 * (-Math.pow(2, -10 * --a) + 2) + b
        },
        easeInCirc: function(c, a, b, d, e){
            return -d * (Math.sqrt(1 - (a /= e) * a) - 1) + b
        },
        easeOutCirc: function(c, a, b, d, e){
            return d * Math.sqrt(1 - (a = a / e - 1) * a) + b
        },
        easeInOutCirc: function(c, a, b, d, e){
            if ((a /= e / 2) < 1) 
                return -d / 2 * (Math.sqrt(1 - a * a) - 1) + b;
            return d / 2 *
            (Math.sqrt(1 -
            (a -= 2) *
            a) +
            1) +
            b
        },
        easeInElastic: function(c, a, b, d, e){
            c = 1.70158;
            var g = 0, h = d;
            if (a == 0) 
                return b;
            if ((a /= e) == 1) 
                return b + d;
            g || (g = e * 0.3);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            }
            else 
                c = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g)) + b
        },
        easeOutElastic: function(c, a, b, d, e){
            c = 1.70158;
            var g = 0, h = d;
            if (a == 0) 
                return b;
            if ((a /= e) == 1) 
                return b + d;
            g || (g = e * 0.3);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            }
            else 
                c = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * a) * Math.sin((a * e - c) * 2 * Math.PI / g) + d + b
        },
        easeInOutElastic: function(c, a, b, d, e){
            c = 1.70158;
            var g = 0, h = d;
            if (a == 0) 
                return b;
            if ((a /= e / 2) == 2) 
                return b + d;
            g || (g = e * 0.3 * 1.5);
            if (h < Math.abs(d)) {
                h = d;
                c = g / 4
            }
            else 
                c = g / (2 * Math.PI) * Math.asin(d / h);
            if (a < 1) 
                return -0.5 * h * Math.pow(2, 10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) + b;
            return h * Math.pow(2, -10 * (a -= 1)) * Math.sin((a * e - c) * 2 * Math.PI / g) * 0.5 + d + b
        },
        easeInBack: function(c, a, b, d, e, g){
            if (g == undefined) 
                g = 1.70158;
            return d * (a /= e) * a * ((g + 1) * a - g) + b
        },
        easeOutBack: function(c, a, b, d, e, g){
            if (g == undefined) 
                g = 1.70158;
            return d * ((a = a / e - 1) * a * ((g + 1) * a + g) + 1) + b
        },
        easeInOutBack: function(c, a, b, d, e, g){
            if (g == undefined) 
                g = 1.70158;
            if ((a /= e / 2) < 1) 
                return d / 2 * a * a * (((g *= 1.525) + 1) * a - g) + b;
            return d / 2 * ((a -= 2) * a * (((g *= 1.525) + 1) * a + g) + 2) + b
        },
        easeInBounce: function(c, a, b, d, e){
            return d - f.easing.easeOutBounce(c, e - a, 0, d, e) + b
        },
        easeOutBounce: function(c, a, b, d, e){
            return (a /= e) < 1 / 2.75 ? d * 7.5625 * a * a + b : a < 2 / 2.75 ? d * (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) + b : a < 2.5 / 2.75 ? d * (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) + b : d * (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375) + b
        },
        easeInOutBounce: function(c, a, b, d, e){
            if (a < e / 2) 
                return f.easing.easeInBounce(c, a * 2, 0, d, e) *
                0.5 +
                b;
            return f.easing.easeOutBounce(c, a * 2 - e, 0, d, e) * 0.5 + d * 0.5 + b
        }
    })
}(jQuery);
// Explode
(function(j){
    j.effects.explode = function(a){
        return this.queue(function(){
            var c = a.options.pieces ? Math.round(Math.sqrt(a.options.pieces)) : 3, d = a.options.pieces ? Math.round(Math.sqrt(a.options.pieces)) : 3;
            a.options.mode = a.options.mode == "toggle" ? j(this).is(":visible") ? "hide" : "show" : a.options.mode;
            var b = j(this).show().css("visibility", "hidden"), g = b.offset();
            g.top -= parseInt(b.css("marginTop"), 10) || 0;
            g.left -= parseInt(b.css("marginLeft"), 10) || 0;
            for (var h = b.outerWidth(true), i = b.outerHeight(true), e = 0; e < c; e++) 
                for (var f = 0; f < d; f++) 
                    b.clone().appendTo("body").wrap("<div></div>").css({
                        position: "absolute",
                        visibility: "visible",
                        left: -f * (h / d),
                        top: -e * (i / c)
                    }).parent().addClass("ui-effects-explode").css({
                        position: "absolute",
                        overflow: "hidden",
                        width: h / d,
                        height: i / c,
                        left: g.left + f * (h / d) + (a.options.mode == "show" ? (f - Math.floor(d / 2)) * (h / d) : 0),
                        top: g.top + e * (i / c) + (a.options.mode == "show" ? (e - Math.floor(c / 2)) * (i / c) : 0),
                        opacity: a.options.mode == "show" ? 0 : 1
                    }).animate({
                        left: g.left + f * (h / d) + (a.options.mode == "show" ? 0 : (f - Math.floor(d / 2)) * (h / d)),
                        top: g.top +
                        e * (i / c) +
                        (a.options.mode == "show" ? 0 : (e - Math.floor(c / 2)) * (i / c)),
                        opacity: a.options.mode == "show" ? 1 : 0
                    }, a.duration || 500);
            setTimeout(function(){
                a.options.mode == "show" ? b.css({
                    visibility: "visible"
                }) : b.css({
                    visibility: "visible"
                }).hide();
                a.callback && a.callback.apply(b[0]);
                b.dequeue();
                j("div.ui-effects-explode").remove()
            }, a.duration || 500)
        })
    }
})(jQuery);
// Blind
(function(b){
    b.effects.blind = function(c){
        return this.queue(function(){
            var a = b(this), g = ["position", "top", "left"], f = b.effects.setMode(a, c.options.mode || "hide"), d = c.options.direction || "vertical";
            b.effects.save(a, g);
            a.show();
            var e = b.effects.createWrapper(a).css({
                overflow: "hidden"
            }), h = d == "vertical" ? "height" : "width";
            d = d == "vertical" ? e.height() : e.width();
            f == "show" && e.css(h, 0);
            var i = {};
            i[h] = f == "show" ? d : 0;
            e.animate(i, c.duration, c.options.easing, function(){
                f == "hide" && a.hide();
                b.effects.restore(a, g);
                b.effects.removeWrapper(a);
                c.callback && c.callback.apply(a[0], arguments);
                a.dequeue()
            })
        })
    }
})(jQuery);
// clip
(function(b){
    b.effects.clip = function(e){
        return this.queue(function(){
            var a = b(this), i = ["position", "top", "left", "height", "width"], f = b.effects.setMode(a, e.options.mode || "hide"), c = e.options.direction || "vertical";
            b.effects.save(a, i);
            a.show();
            var d = b.effects.createWrapper(a).css({
                overflow: "hidden"
            });
            d = a[0].tagName == "IMG" ? d : a;
            var g = {
                size: c == "vertical" ? "height" : "width",
                position: c == "vertical" ? "top" : "left"
            };
            c = c == "vertical" ? d.height() : d.width();
            if (f == "show") {
                d.css(g.size, 0);
                d.css(g.position, c / 2)
            }
            var h = {};
            h[g.size] = f == "show" ? c : 0;
            h[g.position] = f == "show" ? 0 : c / 2;
            d.animate(h, {
                queue: false,
                duration: e.duration,
                easing: e.options.easing,
                complete: function(){
                    f == "hide" && a.hide();
                    b.effects.restore(a, i);
                    b.effects.removeWrapper(a);
                    e.callback && e.callback.apply(a[0], arguments);
                    a.dequeue()
                }
            })
        })
    }
})(jQuery);



/*
 * scroll
 */


/*

            _/    _/_/    _/_/_/_/_/                              _/       
               _/    _/      _/      _/_/    _/    _/    _/_/_/  _/_/_/    
          _/  _/  _/_/      _/    _/    _/  _/    _/  _/        _/    _/   
         _/  _/    _/      _/    _/    _/  _/    _/  _/        _/    _/    
        _/    _/_/  _/    _/      _/_/      _/_/_/    _/_/_/  _/    _/     
       _/                                                                  
    _/

    Created by David Kaneda <http://www.davidkaneda.com>
    Documentation and issue tracking on Google Code <http://code.google.com/p/jqtouch/>
    
    Special thanks to Jonathan Stark <http://jonathanstark.com/>
    and pinch/zoom <http://www.pinchzoom.com/>
    
    (c) 2009 by jQTouch project members.
    See LICENSE.txt for license.
    
    $Revision: 109 $
    $Date: 2009-10-06 12:23:30 -0400 (Tue, 06 Oct 2009) $
    $LastChangedBy: davidcolbykaneda $

*/

(function($) {
    $.jQTouch = function(options) {
        
        // Set support values
        $.support.WebKitCSSMatrix = (typeof WebKitCSSMatrix == "object");
        $.support.touch = (typeof Touch == "object");
        $.support.WebKitAnimationEvent = (typeof WebKitTransitionEvent == "object");
        
        // Initialize internal variables
        var $body, 
            $head=$('head'), 
            hist=[], 
            newPageCount=0, 
            jQTSettings={}, 
            hashCheckInterval,
            currentPage, 
            orientation, 
            isMobileWebKit = RegExp(" Mobile/").test(navigator.userAgent), 
            tapReady=true,
            lastAnimationTime=0,
            touchSelectors=[],
            publicObj={},
            extensions=$.jQTouch.prototype.extensions,
            defaultAnimations=['slide', 'slideright','flip', 'flipright', 'slideup', 'slidedown', 'swap', 'swapright', 'cubeleft', 'cube','pop','dissolve','fade','back'], 
            animations=[], 
            hairextensions='';
        // Get the party started
        init(options);

        function init(options) {
            
            var defaults = {
                addGlossToIcon: true,
                backSelector: '.back, .cancel, .goback',
                cacheGetRequests: true,
				cubeleftSelector: '.cubeleft',
                cubeSelector: '.cube',
                dissolveSelector: '.dissolve',
                fadeSelector: '.fade',
                fixedViewport: true,
                flipSelector: '.flip',
				fliprightSelector: '.flipright',
                formSelector: 'form',
                fullScreen: true,
                fullScreenClass: 'fullscreen',
                icon: null,
                touchSelector: 'a, .touch',
                popSelector: '.pop',
                preloadImages: false,
                slideSelector: 'body > * > ul li a',
				sliderightSelector: 'body > * > ul li a',
                slideupSelector: '.slideup',
				slidedownSelector: '.slidedown',
                startupScreen: null,
                statusBar: 'default', // other options: black-translucent, black
                submitSelector: '.submit',
				swapSelector: '.swap',
				swaprightSelector: '.swapright',
                useAnimations: true,
                useFastTouch: true // Experimental.
            };
            jQTSettings = $.extend({}, defaults, options);
            
            // Preload images
            if (jQTSettings.preloadImages) {
                for (var i = jQTSettings.preloadImages.length - 1; i >= 0; i--){
                    (new Image()).src = jQTSettings.preloadImages[i];
                };
            }
            // Set icon
            if (jQTSettings.icon) {
                var precomposed = (jQTSettings.addGlossToIcon) ? '' : '-precomposed';
                hairextensions += '<link rel="apple-touch-icon' + precomposed + '" href="' + jQTSettings.icon + '" />';
            }
            // Set startup screen
            if (jQTSettings.startupScreen) {
                hairextensions += '<link rel="apple-touch-startup-image" href="' + jQTSettings.startupScreen + '" />';
            }
            // Set viewport
            if (jQTSettings.fixedViewport) {
                hairextensions += '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0;"/>';
            }
            // Set full-screen
            if (jQTSettings.fullScreen) {
                hairextensions += '<meta name="apple-mobile-web-app-capable" content="yes" />';
                if (jQTSettings.statusBar) {
                    hairextensions += '<meta name="apple-mobile-web-app-status-bar-style" content="' + jQTSettings.statusBar + '" />';
                }
            }
            if (hairextensions)  { 
                $head.prepend(hairextensions);
            }

            // Initialize on document load:
            $(document).ready(function(){

                // Add extensions
                for (var i in extensions)
                {
                    var fn = extensions[i];
                    if ($.isFunction(fn))
                    {
                        $.extend(publicObj, fn(publicObj));
                    }
                }
                
                // Add animations
                for (var i in defaultAnimations)
                {
                    var name = defaultAnimations[i];
                    var selector = jQTSettings[name + 'Selector'];
                    if (typeof(selector) == 'string') {
                        addAnimation({name:name, selector:selector});
                    }
                }

                touchSelectors.push('input');
                touchSelectors.push(jQTSettings.touchSelector);
                touchSelectors.push(jQTSettings.backSelector);
                touchSelectors.push(jQTSettings.submitSelector);
                $(touchSelectors.join(', ')).css('-webkit-touch-callout', 'none');
                $(jQTSettings.backSelector).tap(liveTap);
                $(jQTSettings.submitSelector).tap(submitParentForm);

                $body = $('body');
                
                if (jQTSettings.fullScreenClass && window.navigator.standalone == true) {
                    $body.addClass(jQTSettings.fullScreenClass + ' ' + jQTSettings.statusBar);
                }

                // Create custom live events
                $body
                    .bind('touchstart', handleTouch)
                    .bind('orientationchange', updateOrientation)
                    .trigger('orientationchange')
                    .submit(submitForm);
                    
                if (jQTSettings.useFastTouch && $.support.touch)
                {
                    $body.click(function(e){
                        var $el = $(e.target);
                        if ($el.attr('target') == '_blank' || $el.attr('rel') == 'external' || $el.is('input[type="checkbox"]'))
                        {
                            return true;
                        } else {
                            return false;
                        }
                    });
                    
                    // This additionally gets rid of form focusses
                    $body.mousedown(function(e){
                        var timeDiff = (new Date()).getTime() - lastAnimationTime;
                        if (timeDiff < 200)
                        {
                            return false;
                        }
                    });
                }

                // Make sure exactly one child of body has "current" class
                if ($('body > .current').length == 0) {
                    currentPage = $('body > *:first');
                } else {
                    currentPage = $('body > .current:first');
                    $('body > .current').removeClass('current');
                }
                
                // Go to the top of the "current" page
                $(currentPage).addClass('current');
                location.hash = '#' + $(currentPage).attr('id');
                addPageToHistory(currentPage);
                scrollTo(0, 0);
                startHashCheck();
            });
        }
        
        // PUBLIC FUNCTIONS
        function goBack(to) {
            // Init the param
                var numberOfPages = Math.min(parseInt(to || 1, 10), hist.length-1),
                    curPage = hist[0];
                
                // Search through the history for an ID
                if( isNaN(numberOfPages) && typeof(to) === "string" && to != '#' ) {
                    for( var i=1, length=hist.length; i < length; i++ ) {
                        if( '#' + hist[i].id === to ) {
                            numberOfPages = i;
                            break;
                        }
                    }
                }

                // If still nothing, assume one
                if( isNaN(numberOfPages) || numberOfPages < 1 ) {
                    numberOfPages = 1;
                };

                if (hist.length > 1)
                {
                    // Remove all pages in front of the target page
                    hist.splice(0, numberOfPages);
					if (detectWebkitBrowser(navigator.userAgent.toLowerCase()))
                    	animatePages(curPage.page, hist[0].page, curPage.animation, curPage.reverse === false);
					else {
						curPage.className = "";
						document.getElementById(hist[0].id).className = "current";
					}
				}
                else
                {
                    location.hash = '#' + curPage.id;
                }

                return publicObj;
        }
        function goTo(toPage, animation, reverse) {
            var fromPage = hist[0].page;
            
            if (typeof(toPage) === 'string') {
                toPage = $(toPage);
            }
            if (typeof(animation) === 'string') {
                for (var i = animations.length - 1; i >= 0; i--){
                    if (animations[i].name === animation)
                    {
                        animation = animations[i];
                        break;
                    }
                }
            }
            if (animatePages(fromPage, toPage, animation, reverse)) {
                addPageToHistory(toPage, animation, reverse);
                return publicObj;
            }
            else
            {
                console.error('Could not animate pages.');
                return false;
            }
        }
        function getOrientation() {
            return orientation;
        }

        // PRIVATE FUNCTIONS
        function liveTap(e){
            
            // Grab the clicked element
            var $el = $(e.target);

            if ($el.attr('nodeName')!=='A' && $el.attr('nodeName')!=='AREA'){
                $el = $el.closest('a, area');
            }
            
            var target = $el.attr('target'), 
            hash = $el.attr('hash'), 
            animation=null;
            
            if (tapReady == false || !$el.length) {
                console.warn('Not able to tap element.');
                return false;
            }
            
            if ($el.attr('target') == '_blank' || $el.attr('rel') == 'external')
            {
                return true;
            }
            
            // Figure out the animation to use
            for (var i = animations.length - 1; i >= 0; i--){
                if ($el.is(animations[i].selector)) {
                    animation = animations[i];
                    break;
                }
            };

            // User clicked an internal link, fullscreen mode
            if (target == '_webapp') {
                window.location = $el.attr('href');
            }
            // User clicked a back button
            else if ($el.is(jQTSettings.backSelector)) {
                goBack(hash);
            }
            // Branch on internal or external href
            else if (hash && hash!='#') {
                $el.addClass('active');
                goTo($(hash).data('referrer', $el), animation, $(this).hasClass('reverse'));
            } else {
                $el.addClass('loading active');
                showPageByHref($el.attr('href'), {
                    animation: animation,
                    callback: function(){ 
                        $el.removeClass('loading'); setTimeout($.fn.unselect, 250, $el);
                    },
                    $referrer: $el
                });
            }
            return false;
        }
        function addPageToHistory(page, animation, reverse) {
            // Grab some info
            var pageId = page.attr('id');
            // Prepend info to page history
            hist.unshift({
                page: page, 
                animation: animation, 
                reverse: reverse || false,
                id: pageId
            });
        }
        function animatePages(fromPage, toPage, animation, backwards) {
            // Error check for target page
            if(toPage.length === 0){
                $.fn.unselect();
                console.error('Target element is missing.');
                return false;
            }
            
            // Collapse the keyboard
            $(':focus').blur();

            // Make sure we are scrolled up to hide location bar
            scrollTo(0, 0);
            
            // Define callback to run after animation completes
            var callback = function animationEnd(event){
                if (animation)
                {
                    toPage.removeClass('in ' + animation.name);
                    fromPage.removeClass('current out ' + animation.name);
                    if (backwards) {                    
                        toPage.toggleClass('reverse');
                        fromPage.toggleClass('reverse');
                    }
                }
                else
                {
                    fromPage.removeClass('current');
                }

                toPage.trigger('pageAnimationEnd', { direction: 'in' });
                fromPage.trigger('pageAnimationEnd', { direction: 'out' });

                clearInterval(hashCheckInterval);
                currentPage = toPage;
                location.hash = '#' + currentPage.attr('id');
                startHashCheck();

                var $originallink = toPage.data('referrer');
                if ($originallink) {
                    $originallink.unselect();
                }
                lastAnimationTime = (new Date()).getTime();
                tapReady = true;
            }

            fromPage.trigger('pageAnimationStart', { direction: 'out' });
            toPage.trigger('pageAnimationStart', { direction: 'in' });

            if ($.support.WebKitAnimationEvent && animation && jQTSettings.useAnimations) {
                toPage.one('webkitAnimationEnd', callback);
                tapReady = false;
                if (backwards) {                    
                    toPage.toggleClass('reverse');
                    fromPage.toggleClass('reverse');
                }
                toPage.addClass(animation.name + ' in current ');
                fromPage.addClass(animation.name + ' out');

            } else {
                toPage.addClass('current');
                callback();
            }

            return true;
        }
        function hashCheck() {
            var curid = currentPage.attr('id');
            if (location.hash == '') {
                location.hash = '#' + curid;
            } else if (location.hash != '#' + curid) {
                clearInterval(hashCheckInterval);
                goBack(location.hash);
            }
        }
        function startHashCheck(){
            hashCheckInterval = setInterval(hashCheck, 100);
        }
        function insertPages(nodes, animation) {
            var targetPage = null;
            $(nodes).each(function(index, node){
                var $node = $(this);
                if (!$node.attr('id')) {
                    $node.attr('id', 'page-' + (++newPageCount));
                }
                
                        $body.trigger('pageInserted', {page: $node.appendTo($body)});

                if ($node.hasClass('current') || !targetPage ) {
                    targetPage = $node;
                }
            });
            if (targetPage !== null) {
                goTo(targetPage, animation);
                return targetPage;
            }
            else
            {
                return false;
            }
        }
        function showPageByHref(href, options) {
            var defaults = {
                data: null,
                method: 'GET',
                animation: null,
                callback: null,
                $referrer: null
            };
            
            var settings = $.extend({}, defaults, options);

            if (href != '#')
            {
                $.ajax({
                    url: href,
                    data: settings.data,
                    type: settings.method,
                    success: function (data, textStatus) {
                        var firstPage = insertPages(data, settings.animation);
                        if (firstPage)
                        {
                            if (settings.method == 'GET' && jQTSettings.cacheGetRequests === true && settings.$referrer)
                            {
                                settings.$referrer.attr('href', '#' + firstPage.attr('id'));
                            }
                            if (settings.callback) {
                                settings.callback(true);
                            }
                        }
                    },
                    error: function (data) {
                        if (settings.$referrer) {
                            settings.$referrer.unselect();
                        }
                        if (settings.callback) {
                            settings.callback(false);
                        }
                    }
                });
            }
            else if ($referrer)
            {
                $referrer.unselect();
            }
        }
        function submitForm(e, callback){
            var $form = (typeof(e)==='string') ? $(e) : $(e.target);

            if ($form.length && $form.is(jQTSettings.formSelector)) {
                showPageByHref($form.attr('action'), {
                    data: $form.serialize(),
                    method: $form.attr('method') || "POST",
                    animation: animations[0] || null,
                    callback: callback
                });
                return false;
            }
            return true;
        }
        function submitParentForm(e){
            var $form = $(this).closest('form');
            if ($form.length)
            {
                evt = jQuery.Event("submit");
                evt.preventDefault();
                $form.trigger(evt);
                return false;
            }
            return true;
        }
        function addAnimation(animation) {
            if (typeof(animation.selector) == 'string' && typeof(animation.name) == 'string') {
                animations.push(animation);
                $(animation.selector).tap(liveTap);
                touchSelectors.push(animation.selector);
            }
        }
        function updateOrientation() {
            orientation = window.innerWidth < window.innerHeight ? 'profile' : 'landscape';
            $body.removeClass('profile landscape').addClass(orientation).trigger('turn', {orientation: orientation});
            // scrollTo(0, 0);
        }
        function handleTouch(e) {

            var $el = $(e.target);

            // Only handle touchSelectors
            if (!$(e.target).is(touchSelectors.join(', ')))
            {
                var $link = $(e.target).closest('a');
                
                if ($link.length){
                    $el = $link;
                } else {
                    return;
                }
            }
            if (event)
            {
                var hoverTimeout = null,
                    startX = event.changedTouches[0].clientX,
                    startY = event.changedTouches[0].clientY,
                    startTime = (new Date).getTime(),
                    deltaX = 0,
                    deltaY = 0,
                    deltaT = 0;

                // Let's bind these after the fact, so we can keep some internal values
                $el.bind('touchmove', touchmove).bind('touchend', touchend);

                hoverTimeout = setTimeout(function(){
                    $el.makeActive();
                }, 100);
                
            }

            // Private touch functions (TODO: insert dirty joke)
            function touchmove(e) {
                
                updateChanges();
                var absX = Math.abs(deltaX);
                var absY = Math.abs(deltaY);
                                
                // Check for swipe
                if (absX > absY && (absX > 35) && deltaT < 1000) {
                    $el.trigger('swipe', {direction: (deltaX < 0) ? 'left' : 'right'}).unbind('touchmove touchend');
                } else if (absY > 1) {
                    $el.removeClass('active');
                }

                clearTimeout(hoverTimeout);
            } 
            
            function touchend(){
                updateChanges();
            
                if (deltaY === 0 && deltaX === 0) {
                    $el.makeActive();
                    $el.trigger('tap');
                } else {
                    $el.removeClass('active');
                }
                $el.unbind('touchmove touchend');
                clearTimeout(hoverTimeout);
            }
            
            function updateChanges(){
                var first = event.changedTouches[0] || null;
                deltaX = first.pageX - startX;
                deltaY = first.pageY - startY;
                deltaT = (new Date).getTime() - startTime;
            }

        } // End touch handler

        // Public jQuery Fns
        $.fn.unselect = function(obj) {
            if (obj) {
                obj.removeClass('active');
            } else {
                $('.active').removeClass('active');
            }
        }
        $.fn.makeActive = function(){
            return $(this).addClass('active');
        }
        $.fn.swipe = function(fn) {
            if ($.isFunction(fn))
            {
                return $(this).bind('swipe', fn);
            } else {
                return $(this).trigger('swipe');
            }
        }
        $.fn.tap = function(fn){
            if ($.isFunction(fn))
            {
                var tapEvent = (jQTSettings.useFastTouch && $.support.touch) ? 'tap' : 'click';
                return $(this).live(tapEvent, fn);
            } else {
                return $(this).trigger('tap');
            }
        }

        publicObj = {
            getOrientation: getOrientation,
            goBack: goBack,
            goTo: goTo,
            addAnimation: addAnimation,
            submitForm: submitForm
        }

        return publicObj;
    }
    
    // Extensions directly manipulate the jQTouch object, before it's initialized.
    $.jQTouch.prototype.extensions = [];
    $.jQTouch.addExtension = function(extension){
        $.jQTouch.prototype.extensions.push(extension);
    }

})(jQuery);


/*
 * detect if the device use webkit browser
 * @params: userAgent: the user agent of the running device, not null 
 * @access: private
 */
function detectWebkitBrowser(userAgent) {
	userAgent = userAgent.toLowerCase();
    return (contains(userAgent, "webkit"));
}

/*********************Basic inheritance***********************/
Function.prototype.Inherits = function(parent){
    this.prototype = new parent();
    this.prototype.constructor = this;
    this.superClass = parent.prototype;
}
/*************************************************************/


/****************Animation-related collections******************/
// enumeration to match animation names to integer values
var Animations = {

    "Slide": 0,
    "RotateX": 1,
    "RotateY": 2,
    "RotateZ": 3,
    "ZoomXY": 4,
    "ZoomX": 5,
    "ZoomY": 6,
    "SkewX": 7,
    "SkewY": 8,
    "LoopBack": 9,
    "RotateXYZ": 10,
    "Rotate3D": 11,
    "Fade_In": 12,
    "Fade_Out": 13,
    "Slide_In": 14,
    "Slide_Out": 15

};



// enumeration to match all possible animation properties to integer values
var AnimationProperties = {
    "id": 0,
    "delay": 1,
    "duration": 2,
    "Repetitions": 3,
    "opacity": 4,
    "x": 5,
    "y": 6,
    "degree": 7,
    "ratio": 8,
    "pieces": 9,
    "direction": 10,
    "rotation": 11,
    "degreeX": 12,
    "degreeY": 13,
    "degreeZ": 14,
    "SlideType": 15
}

// this is used only for some animations (the last 3)
var AnimationDirection = {
    "horizontal": 0,
    "vertical": 1
}

// For displaying to user
//var animationNames = ["Fade", "Slide", "RotateX", "RotateY", "RotateZ", "ZoomXY", "ZoomX", "ZoomY", "SkewX", "SkewY", "Explode", "Implode", "BlindAppear", "BlindDisappear", "ClipAppear", "ClipDisappear"];

var animationNames = ["Slide", "RotateX", "RotateY", "RotateZ", "ZoomXY", "ZoomX", "ZoomY", "SkewX", "SkewY", "Restart Animations", "RotateXYZ", "Rotate3D", "Fade_In", "Fade_Out", "Slide_In", "Slide_Out"];
var animationProperties = ["id", "delay", "duration", "Repetitions", "opacity", "x", "y", "degree", "ratio", "pieces", "direction", "rotation", "degreeX", "degreeY", "degreeZ", "SlideType"];


/*
 * Match animation name to animation ID (integer values)
 */
function fromNameToID(animationName){
    var animationID;
    switch (animationName) {
        case "Slide":
            animationID = Animations.Slide;
            break;
        case "RotateX":
            animationID = Animations.RotateX;
            break;
        case "RotateY":
            animationID = Animations.RotateY;
            break;
        case "RotateZ":
            animationID = Animations.RotateZ;
            break;
        case "ZoomXY":
            animationID = Animations.ZoomXY;
            break;
        case "ZoomX":
            animationID = Animations.ZoomX;
            break;
        case "ZoomY":
            animationID = Animations.ZoomY;
            break;
        case "SkewX":
            animationID = Animations.SkewX;
            break;
        case "SkewY":
            animationID = Animations.SkewY;
            break;
        case "LoopBack":
            animationID = Animations.Explode;
            break;
        case "RotateXYZ":
            animationID = Animations.RotateXYZ;
            break;
        case "Rotate3D":
            animationID = Animations.Rotate3D;
            break;
        case "Fade_In":
            animationID = Animations.Fade_In;
            break;
        case "Fade_Out":
            animationID = Animations.Fade_Out;
            break;
        case "Slide_In":
            animationID = Animations.Slide_In;
            break;
        case "Slide_Out":
            animationID = Animations.Slide_Out;
            break;
        default:
            alert("Invalid animation : " + animationName + "!");
            break;
    }
    
    return animationID;
    
}

/*
 * Match animation ID (integer values) to animation name
 */
function fromIDToName(animationID){
    return animationNames[animationID];
}




// enumeration to match Direction to integer values
var animationDirections = {
    "Left": 0,
    "Top": 1,
    "Right": 2,
    "Bottom": 3,
    "Top Left": 4,
    "Top Right": 5,
    "Bottom Right": 6,
    "Bottom Left": 7

}

var directionNames = ["Left", "Top", "Right", "Bottom", "Top Left", "Top Right", "Bottom Right", "Bottom Left"];

/*
 * Match Direction name to animation ID (integer values)
 */
function fromDirectionToID(directionName){
    var directionID;
    switch (directionName) {
        case "Left":
            directionID = 0;
            break;
        case "Top":
            directionID = 1;
            break;
        case "Right":
            directionID = 2;
            break;
        case "Bottom":
            directionID = 3;
            break;
        case "Top Left":
            directionID = 4;
            break;
        case "Top Right":
            directionID = 5;
            break;
        case "Bottom Right":
            directionID = 6;
            break;
        case "Bottom Left":
            directionID = 7;
            break;
        default:
            alert("Invalid animation direction: " + directionName + "!");
            break;
    }
    return directionID;
}

/*
 * Match Direction ID (integer values) to animation name
 */
function fromIDToDirection(directionID){
    return directionNames[directionID];
}


/*
 * Match animation property name to animation property ID (integer values)
 */
function fromPropertyNameToID(propertyName){
    var propertyID;
    switch (propertyName) {
        case "Delay":
            propertyID = AnimationProperties.delay;
            break;
        case "Duration":
            propertyID = AnimationProperties.duration;
            break;
        case "Repetitions":
            propertyID = AnimationProperties.Repetitions;
            break;
        case "Opacity":
            propertyID = AnimationProperties.opacity;
            break;
        case "X":
            propertyID = AnimationProperties.x;
            break;
        case "Y":
            propertyID = AnimationProperties.y;
            break;
        case "Degree":
            propertyID = AnimationProperties.degree;
            break;
        case "Ratio":
            propertyID = AnimationProperties.ratio;
            break;
        case "Pieces":
            propertyID = AnimationProperties.pieces;
            break;
        case "Direction":
            propertyID = AnimationProperties.direction;
            break;
        case "DegreeX":
            propertyID = AnimationProperties.degreeX;
            break;
        case "DegreeY":
            propertyID = AnimationProperties.degreeY;
            break;
        case "DegreeZ":
            propertyID = AnimationProperties.degreeZ;
            break;
        case "SlideType":
            propertyID = AnimationProperties.SlideType;
            break;
        default:
            alert("Invalid property name!");
            propertyID = null;
            break;
    }
    return propertyID;
}

/*
 * Match animation property ID (integer values) to animation property name
 */
function fromPropertyIDToName(propertyID){
    return animationProperties[propertyID];
}

/*
 * Match direction name to direction ID (integer values)
 */
function directionToString(directionID){
    var direction;
    switch (directionID) {
        case AnimationDirection.horizontal:
            direction = "horizontal";
            break;
        case AnimationDirection.vertical:
            direction = "vertical";
            break;
        default:
            direction = "unknown direction";
            break;
    }
    return direction;
}

/*
 * Get the list of all available animations
 */
function getAllAvailableAnimations(){
    return animationNames;
}

/*************************************************************/


/********************Page transition effects******************/
var transitionNames = ["Slide Left", "Slide Right", "Slide Up", "Slide Down", "Cube Left", "Cube Right", "Dissolve", "Fade", "Flip Left", "Flip Right", "Pop", "Swap Left", "Swap Right"];
var transitionIDs = ["slide", "slideright", "slideup", "slidedown", "cubeleft", "cube", "dissolve", "fade", "flip", "flipright", "pop", "swap", "swapright"];
/**************************************************************/


/*******************Superclass Animation**********************/
/*
 * This constructor is never called explicitly
 * It should only be called in subclass constructor
 * protected constructor
 */
function Animation(id, delay, duration, Repetitions){
    this.id = id;
    this.delay = delay;
    this.duration = duration;
    this.Repetitions = Repetitions;
}

/*
 * Add the animation to a specified elementObject
 */
Animation.prototype.addTo = function(elementObject){
    // initialize animationList
    var animationList = $(elementObject).data("animationList");
    if (animationList == null || typeof(animationList) == undefined) 
        animationList = new Array();
    
    // add the animation to the animationList of the element object
    animationList[animationList.length] = this;
    $(elementObject).data("animationList", animationList);
}
/*
 * Remove the animation from a specified elementObject
 */
Animation.prototype.removeFrom = function(elementObject, animationIndex){
    var animationList = $(elementObject).data("animationList");
    
    if (animationIndex != null && typeof(animationIndex) != undefined) {
        animationList.splice(animationIndex, 1);
    }
    else {
        var thisAnimation = this;
        
        // using jQuery to remove an animation from the list by linear searching (using equals() as an criteria)
        animationList = $.grep(animationList, function(animation){
            return !animation.equals(thisAnimation);
        });
    }
    
    $(elementObject).data("animationList", animationList);
}
/*
 * Start an animation (which has been added) on an element object
 * This method is sort of abstract, should be overriden in subclass
 */
Animation.prototype.start = function(elementObject){
}
/*
 * Check if this animation is equal to a specified animation
 * @params: animation is a reference
 */
Animation.prototype.equals = function(animation){
    return (animation != null) && (this.toString() == animation.toString());
}
/*
 * Get the representation of an animation
 * which is compact to store in HTML code
 * and suffient to restore later
 */
Animation.prototype.toString = function(){
    var str = this.id + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions;
    return str;
}
/*
 * Get the representation of an animation
 * which is well-formatted to display to user
 */
Animation.prototype.display = function(){
    var delay = (this.delay < 0) ? "--" : "" + roundNumber((this.delay / 1000), 1) + "s";
    var name = fromIDToName(this.id);
    var duration = "" + roundNumber((this.duration / 1000), 1) + "s";
    return (delay + " " + name + " " + duration);
}
/*
 * Get an array of integer values representing all properties of an animation
 * This is a static method
 */
Animation.getProperties = function(){
    return [AnimationProperties.id, AnimationProperties.delay, AnimationProperties.duration, AnimationProperties.Repetitions];
}
/*
 * Get an array of integer values representing all properties of an animation
 * This is an instance method
 */
Animation.prototype.getProperties = function(){
    return Animation.getProperties.call(this);
}
/*************************************************************/


/***********************Subclass Fade*************************/
Fade.Inherits(Animation);
function Fade(delay, duration, Repetitions, opacity){
    Animation.call(this, Animations.Fade, delay, duration, Repetitions);
    this.opacity = opacity;
}

Fade.prototype.start = function(elementObject){

}
Fade.prototype.toString = function(){
    var str = Fade.superClass.toString.call(this);
    str += "|" + this.opacity;
    return str;
}
Fade.prototype.display = function(){
    var displayStr = Fade.superClass.display.call(this);
    displayStr += " " + roundNumber(this.opacity, 1);
    return displayStr;
}
Fade.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.opacity;
    return properties;
}
Fade.prototype.getProperties = function(){
    return Fade.getProperties.call(this);
}
/****************************************************************/

/***********************Subclass Fade_In*************************/
Fade_In.Inherits(Animation);
function Fade_In(delay, duration, Repetitions){
    Animation.call(this, Animations.Fade_In, delay, duration, Repetitions);
}

Fade_In.prototype.start = function(elementObject){

}
Fade_In.prototype.toString = function(){
    var str = Fade_In.superClass.toString.call(this);
    str += "|";
    return str;
}
Fade_In.prototype.display = function(){
    var displayStr = Fade_In.superClass.display.call(this);
    displayStr += " ";
    return displayStr;
}
Fade_In.getProperties = function(){
    var properties = Animation.getProperties();
    return properties;
}
Fade_In.prototype.getProperties = function(){
    return Fade_In.getProperties.call(this);
}
/*************************************************************/
/***********************Subclass Fade_Out*************************/
Fade_Out.Inherits(Animation);
function Fade_Out(delay, duration, Repetitions){
    Animation.call(this, Animations.Fade_Out, delay, duration, Repetitions);
}

Fade_Out.prototype.start = function(elementObject){

}
Fade_Out.prototype.toString = function(){
    var str = Fade_Out.superClass.toString.call(this);
    str += "|";
    return str;
}
Fade_Out.prototype.display = function(){
    var displayStr = Fade_Out.superClass.display.call(this);
    displayStr += " ";
    return displayStr;
}
Fade_Out.getProperties = function(){
    var properties = Animation.getProperties();
    return properties;
}
Fade_Out.prototype.getProperties = function(){
    return Fade_Out.getProperties.call(this);
}
/*************************************************************/

/***********************Subclass Slide*************************/
Slide.Inherits(Animation);
function Slide(delay, duration, Repetitions, x, y){
    Animation.call(this, Animations.Slide, delay, duration, Repetitions);
    this.x = x;
    this.y = y;
}

Slide.prototype.start = function(elementObject){

}
Slide.prototype.toString = function(){
    var str = Slide.superClass.toString.call(this);
    str += "|" + this.x + "|" + this.y;
    return str;
}
Slide.prototype.display = function(){
    var displayStr = Slide.superClass.display.call(this);
    displayStr += " " + roundNumber(this.x, 1) + "px " + roundNumber(this.y, 1) + "px";
    return displayStr;
}
Slide.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.x;
    properties[properties.length] = AnimationProperties.y;
    return properties;
}
Slide.prototype.getProperties = function(){
    return Slide.getProperties.call(this);
}
/**************************************************************/

/***********************Subclasses: Slide In and Slide_Out*************************/
Slide_In.Inherits(Animation);
function Slide_In(delay, duration, Repetitions, SlideType){
    Animation.call(this, Animations.Slide_In, delay, duration, Repetitions, SlideType);
    this.SlideType = SlideType;
    
}

Slide_In.prototype.start = function(elementObject){


}
Slide_In.prototype.toString = function(){
    var str = Slide.superClass.toString.call(this);
    str += "|" + this.SlideType;
    return str;
}
Slide_In.prototype.display = function(){
    var displayStr = Slide.superClass.display.call(this);
    displayStr += " " + roundNumber(parseInt(this.SlideType), 1);
    
    return displayStr;
}
Slide_In.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = parseInt(AnimationProperties.SlideType);
    return properties;
}
Slide_In.prototype.getProperties = function(){
    return Slide_In.getProperties.call(this);
}

Slide_Out.Inherits(Animation);
function Slide_Out(delay, duration, Repetitions, SlideType){
    Animation.call(this, Animations.Slide_Out, delay, duration, Repetitions, SlideType);
    this.SlideType = SlideType;
    
}

Slide_Out.prototype.start = function(elementObject){


}

Slide_Out.prototype.toString = function(){
    var str = Slide.superClass.toString.call(this);
    str += "|" + this.SlideType;
    return str;
}
Slide_Out.prototype.display = function(){
    var displayStr = Slide.superClass.display.call(this);
    displayStr += " " + roundNumber(parseInt(this.SlideType), 1);
    return displayStr;
}
Slide_Out.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = parseInt(AnimationProperties.SlideType);
    return properties;
}
Slide_Out.prototype.getProperties = function(){
    return Slide_Out.getProperties.call(this);
}
/**************************************************************/

/***********************Subclass Rotate************************/
Rotate.Inherits(Animation);
function Rotate(id, delay, duration, Repetitions, degree){
    Animation.call(this, id, delay, duration, Repetitions);
    this.degree = degree;
}

Rotate.prototype.start = function(elementObject){
}
Rotate.prototype.toString = function(){
    var str = Rotate.superClass.toString.call(this);
    str += "|" + this.degree;
    return str;
}
Rotate.prototype.display = function(){
    var displayStr = Rotate.superClass.display.call(this);
    displayStr += " " + roundNumber(this.degree, 1) + "&deg;";
    return displayStr;
}
Rotate.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.degree;
    return properties;
}
Rotate.prototype.getProperties = function(){
    return Rotate.getProperties.call(this);
}
/**************************************************************/

/*********************Subsubclass RotateX**********************/
RotateX.Inherits(Rotate);
function RotateX(delay, duration, Repetitions, degree){
    Rotate.call(this, Animations.RotateX, delay, duration, Repetitions, degree);
}

RotateX.prototype.start = function(elementObject){

}
/**************************************************************/

/*********************Subsubclass RotateY**********************/
RotateY.Inherits(Rotate);
function RotateY(delay, duration, Repetitions, degree){
    Rotate.call(this, Animations.RotateY, delay, duration, Repetitions, degree);
}

RotateY.prototype.start = function(elementObject){

}
/**************************************************************/

/*********************Subsubclass RotateZ**********************/
RotateZ.Inherits(Rotate);
function RotateZ(delay, duration, Repetitions, degree){
    Rotate.call(this, Animations.RotateZ, delay, duration, Repetitions, degree);
}

RotateZ.prototype.start = function(elementObject){

}
/**************************************************************/


/************************SubClass RotateXYZ********************/
RotateXYZ.Inherits(Animation);
function RotateXYZ(delay, duration, Repetitions, degreeX, degreeY, degreeZ){
    Animation.call(this, Animations.RotateXYZ, delay, duration, Repetitions, degreeX, degreeY, degreeZ);
    this.degreeX = degreeX;
    this.degreeY = degreeY;
    this.degreeZ = degreeZ;
}

RotateXYZ.prototype.start = function(elementObject){

}
RotateXYZ.prototype.toString = function(){
    var str = Rotate.superClass.toString.call(this);
    str += "|" + this.degreeX + "|" + this.degreeY + "|" + this.degreeZ;
    return str;
}
RotateXYZ.prototype.display = function(){
    var displayStr = Rotate.superClass.display.call(this);
    displayStr += " " + roundNumber(this.degreeX, 1) + "&deg;" + " " + roundNumber(this.degreeY, 1) + "&deg;" + " " + roundNumber(this.degreeZ, 1) + "&deg;";
    return displayStr;
}
RotateXYZ.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.degreeX;
    properties[properties.length] = AnimationProperties.degreeY;
    properties[properties.length] = AnimationProperties.degreeZ;
    return properties;
}
RotateXYZ.prototype.getProperties = function(){
    return RotateXYZ.getProperties.call(this);
}
/**************************************************************/

/************************SubClass Rotate3D********************/
Rotate3D.Inherits(Rotate);
function Rotate3D(delay, duration, Repetitions, degree){
    Rotate.call(this, Animations.Rotate3D, delay, duration, Repetitions, degree);
}

Rotate3D.prototype.start = function(elementObject){

}
/**************************************************************/

/************************Subclass Zoom*************************/
Zoom.Inherits(Animation);
function Zoom(id, delay, duration, Repetitions, ratio){
    Animation.call(this, id, delay, duration, Repetitions);
    this.ratio = ratio;
}

Zoom.prototype.start = function(elementObject){
}
Zoom.prototype.toString = function(){
    var str = Zoom.superClass.toString.call(this);
    str += "|" + this.ratio;
    return str;
}
Zoom.prototype.display = function(){
    var displayStr = Rotate.superClass.display.call(this);
    displayStr += " " + roundNumber(this.ratio, 1);
    return displayStr;
}
Zoom.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.ratio;
    return properties;
}
Zoom.prototype.getProperties = function(){
    return Zoom.getProperties.call(this);
}
/**************************************************************/

/*********************Subsubclass ZoomXY**********************/
ZoomXY.Inherits(Zoom);
function ZoomXY(delay, duration, Repetitions, ratio){
    Zoom.call(this, Animations.ZoomXY, delay, duration, Repetitions, ratio);
}

ZoomXY.prototype.start = function(elementObject){

}
/**************************************************************/

/**********************Subsubclass ZoomX***********************/
ZoomX.Inherits(Zoom);
function ZoomX(delay, duration, Repetitions, ratio){
    Zoom.call(this, Animations.ZoomX, delay, duration, Repetitions, ratio);
}

ZoomX.prototype.start = function(elementObject){

}
/**************************************************************/

/**********************Subsubclass ZoomY***********************/
ZoomY.Inherits(Zoom);
function ZoomY(delay, duration, Repetitions, ratio){
    Zoom.call(this, Animations.ZoomY, delay, duration, Repetitions, ratio);
}

ZoomY.prototype.start = function(elementObject){

}
/**************************************************************/


/************************Subclass Skew*************************/
Skew.Inherits(Animation);
function Skew(id, delay, duration, Repetitions, degree){
    Animation.call(this, id, delay, duration, Repetitions);
    this.degree = degree;
}

Skew.prototype.start = function(elementObject){
}
Skew.prototype.toString = function(){
    var str = Skew.superClass.toString.call(this);
    str += "|" + this.degree;
    return str;
}
Skew.prototype.display = function(){
    var displayStr = Rotate.superClass.display.call(this);
    displayStr += " " + roundNumber(this.degree, 1) + "&deg;";
    return displayStr;
}
Skew.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.degree;
    return properties;
}
Skew.prototype.getProperties = function(){
    return Skew.getProperties.call(this);
}
/**************************************************************/

/*********************Subsubclass SkewX**********************/
SkewX.Inherits(Skew);
function SkewX(delay, duration, Repetitions, degree){
    Skew.call(this, Animations.SkewX, delay, duration, Repetitions, degree);
}

SkewX.prototype.start = function(elementObject){

}
/**************************************************************/

/*********************Subsubclass SkewY**********************/
SkewY.Inherits(Skew);
function SkewY(delay, duration, Repetitions, degree){
    Skew.call(this, Animations.SkewY, delay, duration, Repetitions, degree);
}

SkewY.prototype.start = function(elementObject){

}
/**************************************************************/


/********************For reference only************************/
/*******************It will not be used************************/

/*********************Subclass CheckerBoard********************/
CheckerBoard.Inherits(Animation);
function CheckerBoard(id, delay, duration, Repetitions, pieces){
    Animation.call(this, id, delay, duration, Repetitions);
    this.pieces = pieces;
}

CheckerBoard.prototype.start = function(elementObject){
}
CheckerBoard.prototype.continueAnimation = function(elementObject){
    var Repetitions = this.Repetitions;
    var duration = this.duration;
    var pieces = this.pieces;
    
    switch (Repetitions) {
        case 0:
            $(elementObject).everyTime(duration + 200, function(){
                $(elementObject).delay(200);
                $(elementObject).toggle("explode", {
                    pieces: pieces
                }, duration, function(){
                    resetElement(elementObject);
                });
            });
            break;
        case 1:
            break;
        default:
            for (var i = 0; i < (2 * Repetitions - 2); i++) {
                $(elementObject).delay(200);
                if (!$(elementObject).data("animationStarted")) 
                    i = 2 * Repetitions - 3;
                $(elementObject).toggle("explode", {
                    pieces: 50
                }, duration, function(){
                    resetElement(elementObject);
                });
            }
            break;
    }
}
CheckerBoard.prototype.toString = function(){
    var str = CheckerBoard.superClass.toString.call(this);
    str += "|" + this.pieces;
    return str;
}
CheckerBoard.prototype.display = function(){
    var displayStr = CheckerBoard.superClass.display.call(this);
    displayStr += " " + this.pieces + "pieces";
    return displayStr;
}
CheckerBoard.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.pieces;
    return properties;
}
CheckerBoard.prototype.getProperties = function(){
    return CheckerBoard.getProperties.call(this);
}
/**************************************************************/


/***********************Subsubclass Explode***********************/
Explode.Inherits(CheckerBoard);
function Explode(delay, duration, Repetitions, pieces){
    CheckerBoard.call(this, Animations.Explode, delay, duration, Repetitions, pieces);
}

Explode.prototype.start = function(elementObject){
    if (this.delay > 0) 
        $(elementObject).delay(this.delay);
    var duration = this.duration;
    var Repetitions = this.Repetitions;
    var pieces = this.pieces;
    
    $(elementObject).hide("explode", {
        pieces: pieces
    }, duration, function(){
        resetElement(elementObject);
    });
    Explode.superClass.continueAnimation.call(this, elementObject);
}
/**************************************************************/


/***********************Subsubclass Implode***********************/
Implode.Inherits(CheckerBoard);
function Implode(delay, duration, Repetitions, pieces){
    CheckerBoard.call(this, Animations.Implode, delay, duration, Repetitions, pieces);
}

Implode.prototype.start = function(elementObject){
    if (this.delay > 0) 
        $(elementObject).delay(this.delay);
    var duration = this.duration;
    var Repetitions = this.Repetitions;
    var pieces = this.pieces;
    
    $(elementObject).show("explode", {
        pieces: pieces
    }, duration, function(){
        resetElement(elementObject);
    });
    Implode.superClass.continueAnimation.call(this, elementObject);
}
/**************************************************************/


/************************Subclass Blind************************/
Blind.Inherits(Animation);
function Blind(id, delay, duration, Repetitions, direction){
    Animation.call(this, id, delay, duration, Repetitions);
    this.direction = direction;
}

Blind.prototype.start = function(elementObject){
}
Blind.prototype.continueAnimation = function(elementObject){
    var Repetitions = this.Repetitions;
    var duration = this.duration;
    var direction = directionToString(this.direction);
    
    switch (Repetitions) {
        case 0:
            $(elementObject).everyTime(duration + 200, function(){
                $(elementObject).delay(200);
                $(elementObject).toggle("blind", {
                    direction: direction
                }, duration, function(){
                    resetElement(elementObject);
                });
            });
            break;
        case 1:
            break;
        default:
            for (var i = 0; i < (2 * Repetitions - 2); i++) {
                $(elementObject).delay(200);
                if (!$(elementObject).data("animationStarted")) 
                    i = 2 * Repetitions - 3;
                $(elementObject).toggle("blind", {
                    direction: direction
                }, duration, function(){
                    resetElement(elementObject);
                });
            }
            break;
    }
}
Blind.prototype.toString = function(){
    var str = Blind.superClass.toString.call(this);
    str += "|" + this.direction;
    return str;
}
Blind.prototype.display = function(){
    var displayStr = Blind.superClass.display.call(this);
    var direction = directionToString(this.direction);
    displayStr += " " + direction;
    return displayStr;
}
Blind.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.direction;
    return properties;
}
Blind.prototype.getProperties = function(){
    return Blind.getProperties.call(this);
}
/**************************************************************/

/***********************Subsubclass BlindAppear***********************/
BlindAppear.Inherits(Blind);
function BlindAppear(delay, duration, Repetitions, direction){
    Blind.call(this, Animations.BlindAppear, delay, duration, Repetitions, direction);
}

BlindAppear.prototype.start = function(elementObject){
    if (this.delay > 0) 
        $(elementObject).delay(this.delay);
    var duration = this.duration;
    var Repetitions = this.Repetitions;
    var direction = directionToString(this.direction);
    
    $(elementObject).show("blind", {
        direction: direction
    }, duration, function(){
        resetElement(elementObject);
    });
    BlindAppear.superClass.continueAnimation.call(this, elementObject);
}
/**************************************************************/

/***********************Subsubclass BlindDisappear***********************/
BlindDisappear.Inherits(Blind);
function BlindDisappear(delay, duration, Repetitions, direction){
    Blind.call(this, Animations.BlindDisappear, delay, duration, Repetitions, direction);
}

BlindDisappear.prototype.start = function(elementObject){
    if (this.delay > 0) 
        $(elementObject).delay(this.delay);
    var duration = this.duration;
    var Repetitions = this.Repetitions;
    var direction = directionToString(this.direction);
    
    $(elementObject).hide("blind", {
        direction: direction
    }, duration, function(){
        resetElement(elementObject);
    });
    BlindDisappear.superClass.continueAnimation.call(this, elementObject);
}
/**************************************************************/


/************************Subclass Clip*************************/
Clip.Inherits(Animation);
function Clip(id, delay, duration, Repetitions, direction){
    Animation.call(this, id, delay, duration, Repetitions);
    this.direction = direction; // direction is a string: "vertical" or "horizontal"
}

Clip.prototype.start = function(elementObject){
}
Clip.prototype.continueAnimation = function(elementObject){
    var duration = this.duration;
    var Repetitions = this.Repetitions;
    var direction = directionToString(this.direction);
    
    switch (Repetitions) {
        case 0:
            $(elementObject).everyTime(duration + 200, function(){
                $(elementObject).delay(200);
                $(elementObject).toggle("clip", {
                    direction: direction
                }, duration, function(){
                    resetElement(elementObject);
                });
            });
            break;
        case 1:
            break;
        default:
            for (var i = 0; i < (2 * Repetitions - 2); i++) {
                $(elementObject).delay(200);
                if (!$(elementObject).data("animationStarted")) 
                    i = 2 * Repetitions - 3;
                $(elementObject).toggle("clip", {
                    direction: direction
                }, duration, function(){
                    resetElement(elementObject);
                });
            }
            break;
    }
}
Clip.prototype.toString = function(){
    var str = Clip.superClass.toString.call(this);
    str += "|" + this.direction;
    return str;
}
Clip.prototype.display = function(){
    var displayStr = Clip.superClass.display.call(this);
    var direction = directionToString(this.direction);
    displayStr += " " + direction;
    return displayStr;
}
Clip.getProperties = function(){
    var properties = Animation.getProperties();
    properties[properties.length] = AnimationProperties.direction;
    return properties;
}
Clip.prototype.getProperties = function(){
    return Clip.getProperties.call(this);
}
/**************************************************************/

/************************Subsubclass ClipAppear*************************/
ClipAppear.Inherits(Clip);
function ClipAppear(delay, duration, Repetitions, direction){
    Clip.call(this, Animations.ClipAppear, delay, duration, Repetitions);
}

ClipAppear.prototype.start = function(elementObject){
    if (this.delay > 0) 
        $(elementObject).delay(this.delay);
    var duration = this.duration;
    var direction = directionToString(this.direction);
    
    $(elementObject).show("clip", {
        direction: direction
    }, duration, function(){
        resetElement(elementObject);
    });
    ClipAppear.superClass.continueAnimation.call(this, elementObject);
}
/**************************************************************/

/************************Subsubclass ClipDisappear*************************/
ClipDisappear.Inherits(Clip);
function ClipDisappear(delay, duration, Repetitions, direction){
    Clip.call(this, Animations.ClipDisappear, delay, duration, Repetitions);
}

ClipDisappear.prototype.start = function(elementObject){
    if (this.delay > 0) 
        $(elementObject).delay(this.delay);
    var duration = this.duration;
    var direction = directionToString(this.direction);
    
    $(elementObject).hide("clip", {
        direction: direction
    }, duration, function(){
        resetElement(elementObject);
    });
    ClipDisappear.superClass.continueAnimation.call(this, elementObject);
}
/**************************************************************/

/***************************End of reference part**************************/


/**************************Loop Back***************************/
/****Loop back all animations in an object from the begining***/
LoopBack.Inherits(Animation);
function LoopBack(delay){
    Animation.call(this, Animations.LoopBack, delay, null, null);
}

LoopBack.prototype.start = function(elementObject, totalDuration){
    if (this.delay != null && this.delay > 0) 
        totalDuration += this.delay;
    $(elementObject).everyTime(totalDuration, function(){
        $(elementObject).delay(300);
        elementObject.setAttribute("style", elementObject.getAttribute("data-initialState"));
        animationList = $(elementObject).data("animationList");
        for (var i = 0; i < animationList.length - 1; i++) 
            animationList[i].start(elementObject);
    });
}
LoopBack.prototype.toString = function(){
    return "" + this.id + "|" + this.delay;
}
LoopBack.prototype.display = function(){
    // if the delay is not positive --> see it as 0
    var delay = (this.delay <= 0) ? "0" : "" + roundNumber((this.delay / 1000), 1) + "s";
    return fromIDToName(this.id) + " " + delay;
}
LoopBack.getProperties = function(){
    return [AnimationProperties.id, AnimationProperties.delay];
}
LoopBack.prototype.getProperties = function(){
    return LoopBack.getProperties.call(this);
}
/**************************************************************/



/*******************indepedent-task methods********************/
// called when "Save"
/*
 * Store all animation details of each element object
 * inside a specific mainDIV in customized attributes
 */
function transferAllAnimationsToAttributes(mainDIV){
    var children = utility_GetElementsByClass("drsElement", mainDIV, 'div');
    
    for (var i = 0; i < children.length; i++) {
        transferAnimationsToAttribute(children[i]);
    }
}

/*
 * Store all animation details of a specific
 * element object in customized attributes
 */
function transferAnimationsToAttribute(elementObject){

    var animationList = $(elementObject).data("animationList");
    
    if (animationList == null) 
        return;
    
    var animationString = "";
    
    for (var i = 0; i < animationList.length; i++) {
        animationString += animationList[i]; // same as animationList[i].toString();
        if (i < animationList.length - 1) 
            animationString += ",";
    }
    
    elementObject.setAttribute("data-animation", animationString);
}

/*
 * Copy animation data from an element object
 * to another for preview purpose
 */
function copyDataToPreview(originalElement, previewElement){
    var animationList = $(originalElement).data("animationList");
    $(previewElement).data("animationList", animationList);
}

// called when "Load"
/*
 * Extract animation details from customized attributes
 * to RAM for each element object in specified mainDIV
 */
function loadAllAnimationsFromAttributes(mainDIV){
    var children = utility_GetElementsByClass("drsElement", mainDIV, 'div');
    
    for (var i = 0; i < children.length; i++) {
        loadAnimationsFromAttribute(children[i]);
    }
}

/*
 * Extract animation details from customized attributes
 * to RAM for a specified element object
 */
function loadAnimationsFromAttribute(elementObject){
    var animationString = elementObject.getAttribute("data-animation");
    if (animationString == null || animationString == "") 
        return;
    
    var animationList = new Array();
    var animationArr = animationString.split(",");
    
    for (var i = 0; i < animationArr.length; i++) {
        var animationProperties = animationArr[i].split("|");
        
        animationList[i] = getCorrespondingAnimation(animationProperties);
        
    }
    
    $(elementObject).data("animationList", animationList);
    
}


/*
 * Get the list of all animations added to a specific element object
 */
function getListOfAnimationNames(elementObject){
    var animationList = $(elementObject).data("animationList");
    //alert(animationList);
    var listOfAnimationNames = new Array();
    if (animationList != null) 
        for (var i = 0; i < animationList.length; i++) 
            listOfAnimationNames[i] = fromIDToName(animationList[i].id);
    
    return listOfAnimationNames;
}

/*
 * Get the value of the specified property of an animation
 * at specified index in an element object
 */
function getAnimationProperty(elementObject, animationIndex, property){
    var animationList = $(elementObject).data("animationList");
    //alert (animationList);
    var animation = animationList[animationIndex];
    var propertyValue;
    
    switch (property) {
        case AnimationProperties.id:
            propertyValue = animation.id;
            break;
        case AnimationProperties.delay:
            propertyValue = animation.delay;
            break;
        case AnimationProperties.duration:
            propertyValue = animation.duration;
            break;
        case AnimationProperties.Repetitions:
            propertyValue = animation.Repetitions;
            break;
        case AnimationProperties.opacity:
            propertyValue = animation.opacity;
            break;
        case AnimationProperties.x:
            propertyValue = animation.x;
            break;
        case AnimationProperties.y:
            propertyValue = animation.y;
            break;
        case AnimationProperties.degree:
            propertyValue = animation.degree;
            break;
        case AnimationProperties.ratio:
            propertyValue = animation.ratio;
            break;
        case AnimationProperties.pieces:
            propertyValue = animation.pieces;
            break;
        case AnimationProperties.direction:
            propertyValue = animation.direction;
            break;
        case AnimationProperties.degreeX:
            propertyValue = animation.degreeX;
            break;
        case AnimationProperties.degreeY:
            propertyValue = animation.degreeY;
            break;
        case AnimationProperties.degreeZ:
            propertyValue = animation.degreeZ;
            break;
        case AnimationProperties.SlideType:
            propertyValue = animation.SlideType;
            break;
        default:
            alert("Invalid property!");
            propertyValue = null;
            break;
    }
    
    return propertyValue;
}

/*
 * Set the value of the specified property of an animation
 * at specified index in an element object
 */
function setAnimationProperty(elementObject, animationIndex, property, value){
    stopAnimations(elementObject);
    
    var animationList = $(elementObject).data("animationList");
    var animation = animationList[animationIndex];
    
    
    //alert ("Property & value sent to SET animation property: " + property + "=" + value + " elementObject: " + elementObject + "animationIndex: " + animationIndex);
    
    
    switch (property) {
        case AnimationProperties.id:
            animation.id = value;
            break;
        case AnimationProperties.delay:
            animation.delay = value;
            break;
        case AnimationProperties.duration:
            animation.duration = value;
            break;
        case AnimationProperties.Repetitions:
            animation.Repetitions = value;
            break;
        case AnimationProperties.opacity:
            animation.opacity = value;
            break;
        case AnimationProperties.x:
            animation.x = value;
            break;
        case AnimationProperties.y:
            animation.y = value;
            break;
        case AnimationProperties.degree:
            animation.degree = value;
            break;
        case AnimationProperties.ratio:
            animation.ratio = value;
            break;
        case AnimationProperties.pieces:
            animation.pieces = value;
            break;
        case AnimationProperties.direction:
            animation.direction = value;
            break;
        case AnimationProperties.degreeX:
            animation.degreeX = value;
            break;
        case AnimationProperties.degreeY:
            animation.degreeY = value;
            break;
        case AnimationProperties.degreeZ:
            animation.degreeZ = value;
            break;
        case AnimationProperties.SlideType:
            animation.SlideType = value;
            break;
        default:
            alert("Invalid property set!");
            break;
    }
}


/*
 * Get the corresponding animation object based on
 * the array of animation properties (id, delay, duration, etc)
 */
function getCorrespondingAnimation(animationProperties){
    var animationObject;
    switch (parseInt(animationProperties[0])) {
        case Animations.Fade:
            animationObject = new Fade(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.Slide:
            animationObject = new Slide(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]), parseFloat(animationProperties[5]));
            break;
        case Animations.RotateX:
            animationObject = new RotateX(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.RotateY:
            animationObject = new RotateY(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.RotateZ:
            animationObject = new RotateZ(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.SkewX:
            animationObject = new SkewX(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.SkewY:
            animationObject = new SkewY(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.ZoomXY:
            animationObject = new ZoomXY(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.ZoomX:
            animationObject = new ZoomX(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.ZoomY:
            animationObject = new ZoomY(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.LoopBack:
            animationObject = new LoopBack(parseInt(animationProperties[1]));
            break;
        case Animations.RotateXYZ:
            animationObject = new RotateXYZ(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]), parseFloat(animationProperties[5]), parseFloat(animationProperties[6]));
            break;
        case Animations.Rotate3D:
            animationObject = new Rotate3D(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), parseFloat(animationProperties[4]));
            break;
        case Animations.Fade_In:
            animationObject = new Fade_In(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]));
            break;
        case Animations.Fade_Out:
            animationObject = new Fade_Out(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]));
            break;
        case Animations.Slide_In:
            animationObject = new Slide_In(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), animationProperties[4]);
            break;
        case Animations.Slide_Out:
            animationObject = new Slide_Out(parseInt(animationProperties[1]), parseInt(animationProperties[2]), parseInt(animationProperties[3]), animationProperties[4]);
            break;
        default:
            animationObject = null;
            break;
    }
    return animationObject;
}

/*
 * Get the "display" of an animation at specified
 * index in an element object
 */
function displayAnimation(elementObject, animationIndex){
    var animationList = $(elementObject).data("animationList");
    var animation = animationList[animationIndex];
    return animation.display();
}

/*
 * Get the reference to an animation at specified
 * index in an element object
 */
function getAnimation(elementObject, animationIndex){
    var animationList = $(elementObject).data("animationList");
    return animationList[animationIndex];
}


/*
 * Start all animations in each element object
 * inside a specified mainDIV
 */
function startAllAnimations(mainDIV){
    var totalDuration = -1;
    var children = utility_GetElementsByClass("drsElement", mainDIV, 'div');
    
    // estimate the total time for all animations in a page
    for (var i = 0; i < children.length; i++) {
        totalDuration = Math.max(totalDuration, estimateTotalAnimationTime(children[i]));
    }
    
    // start all animations
    for (var i = 0; i < children.length; i++) {
    
        $(children[i]).data("data-initialState", $(children[i]).attr("style"));
        startAnimations(children[i], totalDuration, mainDIV);
        
        
    }
}

/*
 * Start all animations in a specified element object
 */
function startAnimations(elementObject, totalDuration, mainDIV){

    var totalPreviewDuration = 0;
    var animationStarted = $(elementObject).data("animationStarted");
    if (animationStarted != null && animationStarted) {
        //alert("Going back, animation already started : " + animationStarted); 
        return;
    }
    
    var animationList = $(elementObject).data("animationList");
    if (animationList == null || animationList.length == 0) {
        //alert(animationList);
        
        return;
    }
    if (!$(elementObject).data("data-initialState")) 
        $(elementObject).data("data-initialState", $(elementObject).attr("style"));
    $(elementObject).data("animationStarted", true);
    
    var firstanimation = 1;
    var animationId = " x ";
    var deelay = 15;
    var previousAnimationTime = 15;
    var repeator = 1;
    var prevduration = 15;
    
    for (var i = 0; i < animationList.length; i++) {
        if (animationList[i].id != Animations.LoopBack) 
            totalPreviewDuration += animationList[i].duration;
        {
        
            var objectId = $(elementObject).attr('id');
            var parentId = $(elementObject).parent().attr('id');
            var animationProps = animationList[i].toString().split("|");
            
            if ((animationProps[1] == "NaN")) 
                animationProps[1] = 0;
            
            if ((parseInt(animationProps[1]) <= -1)) {
                animationProps[1] = -1;
                deelay += 15;
            }
            else 
                if (animationProps[1] >= 0) {
                    deelay += parseInt(animationProps[1]) + 15 + previousAnimationTime;
                }
            
            window.setTimeout(animationstarterb, deelay, mainDIV, objectId, animationProps, parentId);
            previousAnimationTime = (parseInt(animationProps[2]) * parseInt(animationProps[3]) * 2 + parseInt(animationProps[1] - parseInt(animationProps[2])));
        }
    }
    
    return totalPreviewDuration;
}


function startAnimationsPreview(elementObject){

    //alert('this is in preview mode!');
    
    var totalPreviewDuration = 0;
    var animationStarted = $(elementObject).data("animationStarted");
    if (animationStarted != null && animationStarted) {
        return;
    }
    
    var animationList = $(elementObject).data("animationList");
    if (animationList == null || animationList.length == 0) {
        return;
    }
    
    //if (!$(elementObject).data("data-initialState")) 
        $(elementObject).data("data-initialState", $(elementObject).attr("style"));
    
    $(elementObject).data("animationStarted", true);
    
    var deelay = 15;
    var previousAnimationTime = 15;
    
    for (var i = 0; i < animationList.length; i++) {
        if (animationList[i].id != Animations.LoopBack) 
            
        {
        	totalPreviewDuration += animationList[i].duration + animationList[i].delay;
			if (animationList[i].id==12) totalPreviewDuration += animationList[i].duration;
			
            var objectId = $(elementObject).attr('id');
            var parentId = $(elementObject).parent().attr('id');
            var animationProps = animationList[i].toString().split("|");
            
            if ((animationProps[1] == "NaN")) 
                animationProps[1] = 0;
            if ((parseInt(animationProps[1]) <= -1)) {
                animationProps[1] = -1;
                deelay += 15;
            }
            else 
                if (animationProps[1] >= 0) {
                    deelay += parseInt(animationProps[1]) + 15 + previousAnimationTime;
                }
            
            window.setTimeout(animationstarterb, deelay, 'preview', objectId, animationProps, parentId);
            previousAnimationTime = (parseInt(animationProps[2]) + parseInt(animationProps[1]));
            
        }
    }
    
    return totalPreviewDuration;
}


/*
 * Stop all animations in each element object
 * inside a specified mainDIV
 */
function stopAllAnimations(mainDIV){
    var children = utility_GetElementsByClass("drsElement", mainDIV, 'div');
    
    for (var i = 0; i < children.length; i++) {
        stopAnimations(children[i]);
    }
}

/*
 * Stop all animations in a specified element object
 */
function stopAnimations(elementObject){
    var animationStarted = $(elementObject).data("animationStarted");
    if (animationStarted == null || !animationStarted) 
        return;
    $(elementObject).data("animationStarted", false);
    $(elementObject).attr("style", $(elementObject).data("data-initialState"));
}

/*
 * Remove the animation at a specified index in an element object
 */
function removeAnimation(elementObject, animationIndex){
    var animationList = $(elementObject).data("animationList");
    animationList[animationIndex].removeFrom(elementObject, animationIndex);
    
}

/*
 * Remove all the animations in an element object
 */
function removeAllAnimations(elementObject){
    $(elementObject).removeData("animationList");
    $(elementObject).removeData("animationStarted");
}

/*
 * Put the element object back to initial state (before starting animations)
 */
function resetElement(elementObject){
    if (!$(elementObject).data("animationStarted")) {
        elementObject.setAttribute("style", elementObject.getAttribute("data-initialState"));
    }
}

/*
 * Extract animation details from customized attributes
 * to RAM and start animations for each element object
 * in specified mainDIV
 */
function prepareAndStartAllAnimations(mainDIV){
    loadAllAnimationsFromAttributes(mainDIV);
    loadVideo(mainDIV);
    startAllAnimations(mainDIV);
    deleteProgressBar();
}

/*
 * Estimate the total time for all animations in the element object
 */
function estimateTotalAnimationTime(elementObject){
    var animationList = $(elementObject).data("animationList");
    //alert ("Animation List[i] within estimateTotalAnimationTime" +  animationList[i]);
    if (animationList == null || animationList.length == 0) 
        return 0;
    var Repetitions = 0;
    var duration = 0;
    var delay = 0;
    var totalDuration = 0;
    // alert ("2nd Animation List[i] within estimateTotalAnimationTime" + animationList[i]);
    for (var i = 0; i < animationList.length; i++) {
        if (animationList[i].id == Animations.LoopBack) 
            continue;
        
        Repetitions = animationList[i].Repetitions;
        duration = animationList[i].duration;
        delay = animationList[i].delay;
        
        if (Repetitions == 0) 
            continue
        else 
            if (Repetitions == 1) {
                totalDuration += duration + delay;
            }
            else 
                if (Repetitions > 1) {
                    totalDuration += duration * (2 * Repetitions - 1) + delay;
                }
        
    }
    
    totalDuration += 400; // buffer time
    return totalDuration;
}

/**************************************************************/


/***********************Utilitity functions********************/
/*
 * Get an element object based on its class, its tag name
 * and its parent node
 */
/*
 function utility_GetElementsByClass(searchClass, domNode, tagName) {
 if (domNode == null) domNode = document;
 if (tagName == null) tagName = '*';
 var el = new Array();
 var tags = domNode.getElementsByTagName(tagName);
 var tcl = " "+searchClass+" ";
 for(i=0,j=0; i<tags.length; i++) {
 var test = " " + tags[i].className + " ";
 if (test.indexOf(tcl) != -1)
 el[j++] = tags[i];
 }
 return el;
 }
 */
function utility_GetElementsByClass(searchClass, domNode, tagName){
    if (domNode == null) 
        domNode = document;
    if (tagName == null) 
        tagName = '*';
    var el = new Array();
    var tags = domNode.getElementsByTagName(tagName);
    var tcl = " " + searchClass + " ";
    for (i = 0, j = 0; i < tags.length; i++) {
        var test = " " + tags[i].className + " ";
        if (test.indexOf(tcl) != -1) 
            el[j++] = tags[i];
    }
    return el;
}


/*
 * Round a number to a specific number of decimal places
 */
function roundNumber(number, decimalPlaces){
    var newNumber = Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    return newNumber;
}

/**************************************************************/

/*
 * Begin Balach's CSS Animations Implementation
 */
function slidebb(parentId, objectId, animationProps, delay, duration, Repetitions, displacementx, displacementy){

    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var delay2 = delay;
    var x1 = parseInt($(objectId).css("left"));
    var y1 = parseInt($(objectId).css("top"));
    var x2 = parseInt($(objectId).css("left")) + displacementx;
    var y2 = parseInt($(objectId).css("top")) + displacementy;
    var nleft = x2;
    var ntop = y2;
    
    if (Repetitions <= 0) 
        Repetitions = 500; // this is for infinite repetitions.. can change the implementation.
    
        
	var insertclass=true;
			
    while (Repetitions >= 1) {
        setTimeout(function(){
			
			if (insertclass) {
				if (!$(objectId).hasClass('animatable')) $(objectId).addClass('animatable');
				insertclass = false;
			}
            $(objectId).css("-webkit-transition-duration", duration + 'ms');
			$(objectId).css({
                left: nleft,
                top: ntop
            });
            if (nleft != x1 || ntop != y1) {
                nleft = x1;
                ntop = y1;
            }
            else {
                nleft = x2;
                ntop = y2;
            }
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
        
    }
    
    //Bind the end of the transition so we can remove the animation-based classes and flag the system as not being in an intermediary state - or do whatever you feel like..
    $(objectId).bind("webkitTransitionEnd", function(event){
        $(objectId).removeClass("animatable");
    });
    
}

function slideOutbb(parentId, objectId, animationProps, delay, duration, Repetitions, direction){

    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    parentId = "#" + parentId;
    
    direction = parseInt(direction);
    
    /*	var SlideOutDir = { "Left": 0,     "Top": 1,     "Right": 2,     "Bottom": 3,     "TopLeft": 4,     "TopRight": 5,     "BottomRight": 6,     "BottomLeft": 7     }; */
    
    var currentleft = parseInt($(objectId).css("left").replace('px', ''));
    var currenttop = parseInt($(objectId).css("top").replace('px', ''));
    var width = parseInt($(objectId).css("width").replace('px', ''));
    var height = parseInt($(objectId).css("height").replace('px', ''));
    
    var moveleft = 0;
    var movetop = 0;
    
    // // calculate where the object should end its slide at
    switch (direction) {
        case 0:{ //  -ow	
            newleft = parseInt($(objectId).css("width").replace('px', '')) * (-1);
            newtop = parseInt($(objectId).css("top").replace('px', ''));
            moveleft = -1 * (width + currentleft);
            movetop = 0;
            break;
            
        }
        case 1:{ //  -oh	
            newleft = parseInt($(objectId).css("left").replace('px', ''));
            newtop = parseInt($(objectId).css("height").replace('px', '')) * (-1);
            moveleft = 0;
            movetop = -1 * (height + currenttop);
            break;
        }
        case 2:{ //  pw	
            newleft = parseInt($(parentId).css("width").replace('px', ''));
            newtop = parseInt($(objectId).css("top").replace('px', ''));
            moveleft = newleft - currentleft;
            movetop = 0;
            break;
        }
        case 3:{ //  ph
            newleft = parseInt($(objectId).css("left").replace('px', ''));
            newtop = parseInt($(parentId).css("height").replace('px', ''));
            moveleft = 0;
            movetop = newtop - currenttop;
            break;
        }
        case 4:{ // Top Left => -ow,-oh
            newleft = (parseInt($(objectId).css("width").replace('px', '')) * (-1));
            newtop = parseInt($(objectId).css("height").replace('px', '')) * (-1);
            moveleft = -1 * (width + currentleft);
            movetop = -1 * (height + currenttop);
            break;
        }
        case 5:{ // Top Right => pw,-oh
            newleft = parseInt($(parentId).css("width").replace('px', ''));
            newtop = parseInt($(objectId).css("height").replace('px', '')) * (-1);
            moveleft = newleft - currentleft;
            movetop = -1 * (height + currenttop);
            break;
        }
        case 6:{ // Bottom Right => pw,ph
            newleft = parseInt($(parentId).css("width").replace('px', ''));
            newtop = parseInt($(parentId).css("height").replace('px', ''));
            moveleft = newleft - currentleft;
            movetop = newtop - currenttop;
            break;
        }
        case 7:{ // Bottom Left => -ow,ph
            newleft = (parseInt($(objectId).css("width").replace('px', '')) * (-1));
            newtop = parseInt($(parentId).css("height").replace('px', ''));
            moveleft = -1 * (width + currentleft);
            movetop = newtop - currenttop;
            break;
        }
        default:
            {
                alert('Positioning for sliding out could not be calculated.');
                break;
            }
    }
    
    var newtransform = "";
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    
    $.each(prevtransform, function(index, value){
        if (value.search('translate3d') > -1) 
            $(elementObject).show();
        prevtransform[index] = '';
    });
    
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	
    
    setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
        $(objectId).css("-webkit-transition-duration", duration + 'ms');
        newtransform = prevtransform.join(" ") + " translate3d(" + moveleft + "px," + movetop + "px,0px)";
        elementObject.style.webkitTransform = newtransform;
        
    }, '20ms');
    
}

function slideInitialPositionFix(objectId, startleft, starttop){

    $(objectId).css("left", startleft).css("top", starttop).hide();
}


function slideInbb(parentId, objectId, animationProps, delay, duration, Repetitions, direction){

    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    parentId = "#" + parentId;
    direction = parseInt(direction);
    
    var currentleft = parseInt($(objectId).css("left").replace('px', ''));
    var currenttop = parseInt($(objectId).css("top").replace('px', ''));
    var width = parseInt($(objectId).css("width").replace('px', ''));
    var height = parseInt($(objectId).css("height").replace('px', ''));
    
    var moveleft = 0;
    var movetop = 0;
    
    // calculate place the object where it should start to slide from and assign displacement values.
    
    switch (direction) {
        case 0:{ //  -ow	
            startleft = parseInt($(objectId).css("width").replace('px', '')) * (-1);
            starttop = currenttop;
            moveleft = width + currentleft;
            movetop = 0;
            break;
            
        }
        case 1:{ //  -oh	
            startleft = currentleft;
            starttop = parseInt($(objectId).css("height").replace('px', '')) * (-1);
            moveleft = 0;
            movetop = height + currenttop;
            break;
        }
        case 2:{ //  pw	
            startleft = parseInt($(parentId).css("width").replace('px', ''));
            starttop = currenttop;
            moveleft = -1 * (startleft - currentleft);
            movetop = 0;
            break;
        }
        case 3:{ //  ph
            startleft = currentleft;
            starttop = parseInt($(parentId).css("height").replace('px', ''));
            moveleft = 0;
            movetop = -1 * (starttop - currenttop);
            break;
        }
        
        case 4:{ // Top Left => -ow,-oh
            startleft = (parseInt($(objectId).css("width").replace('px', '')) * (-1));
            starttop = parseInt($(objectId).css("height").replace('px', '')) * (-1);
            moveleft = width + currentleft;
            movetop = height + currenttop;
            break;
        }
        case 5:{ // Top Right => pw,-oh
            startleft = parseInt($(parentId).css("width").replace('px', ''));
            starttop = parseInt($(objectId).css("height").replace('px', '')) * (-1);
            moveleft = -1 * (startleft - currentleft);
            movetop = height + currenttop;
            break;
        }
        case 6:{ // Bottom Right => pw,ph
            startleft = parseInt($(parentId).css("width").replace('px', ''));
            starttop = parseInt($(parentId).css("height").replace('px', ''));
            moveleft = -1 * (startleft - currentleft);
            movetop = -1 * (starttop - currenttop);
            break;
        }
        case 7:{ // Bottom Left => -ow,ph
            startleft = (parseInt($(objectId).css("width").replace('px', '')) * (-1));
            starttop = parseInt($(parentId).css("height").replace('px', ''));
            moveleft = width + currentleft;
            movetop = -1 * (starttop - currenttop);
            break;
            
        }
        default:
            {
                alert('Positioning for sliding in could not be calculated.');
                break;
            }
            
    }
    
    $(objectId).css("-webkit-transition-duration", '10ms');
    slideInitialPositionFix(objectId, startleft, starttop);
    $(elementObject).show();
    
    
    var newtransform = "";
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    
    $.each(prevtransform, function(index, value){
        if (value.search('translate3d') > -1) {
            $(elementObject).show();
            prevtransform[index] = '';
        }
    });
    
    var transitionProp =  $(objectId).css("-webkit-transition-property");
	
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	
    
    setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
        $(objectId).css("-webkit-transition-duration", duration + 'ms');
        newtransform = prevtransform.join(" ") + " translate3d(" + moveleft + "px," + movetop + "px,0px)";
        elementObject.style.webkitTransform += newtransform;
        
    }, '20ms');
    
}


function fadebb(parentId, objectId, animationProps, delay, duration, Repetitions, opaque){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var opaque2 = parseInt(opaque);
    var fadein = false;
    var fadeout = false;
    var delay2 = delay;
    
    if (Repetitions <= 0) 
        Repetitions = 500; // this is for infinite repetitions.. can change the implementation.
    if (opaque2 == 1) {
        fadein = true;
        $(objectId).css("opacity", 0);
        $(objectId).show();
    }
    else {
        fadeout = true;
    }
    
    var insertclass=true;
    
    while (Repetitions >= 1) {
        setTimeout(function(){
			if (insertclass) {
				if (!$(objectId).hasClass('animatable')) $(objectId).addClass('animatable');
				insertclass = false;
			}
            $(objectId).css("-webkit-transition-duration", duration + 'ms');
            $(objectId).css("opacity", opaque2);
            if (opaque2 > 0) 
                opaque2 = 0;
            else 
                opaque2 = 1;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
        
    }
    
    
    $(objectId).bind("webkitTransitionEnd", function(event){
        $(objectId).removeClass("animatable");
    });
    
}

function spinHorbb(parentId, objectId, animationProps, delay, duration, Repetitions, degrees){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    
    var newtransform = " rotateY(" + degrees + 'deg)';
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    var degrees2 = parseInt(degrees);
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    
    if (elementObject.style.webkitTransform.search('rotateY') == -1) {
        elementObject.style.webkitTransform += ' rotateY(0deg)';
    }
    else {
        $.each(prevtransform, function(index, value){
            if (value.search('rotateY') > -1) {
                prevtransform[index] = '';
            }
        });
        
    }
    
   
    // Following are for reference
    //$(objectId).css("-webkit-transform-style", 'flat');
    //$(objectId).css("-webkit-backface-visibility", 'hidden');
    //$(objectId).css("-webkit-transform-style", 'preserve-3d');
    //$(objectId).css("-webkit-perspective", 600);	
	$(objectId).show();
	
    
    var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + " rotateY(" + degrees2 + 'deg)';
            elementObject.style.webkitTransform = newtransform;
            if (degrees2 > 0) 
                degrees2 = 0;
            else 
                degrees2 += degrees;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
}

function spinVerbb(parentId, objectId, animationProps, delay, duration, Repetitions, degrees){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var newtransform = " rotateX(" + degrees + 'deg)';
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    var degrees2 = parseInt(degrees);
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    
    if (elementObject.style.webkitTransform.search('rotateX') == -1) {
        elementObject.style.webkitTransform += ' rotateX(0deg)';
    }
    else {
        $.each(prevtransform, function(index, value){
            if (value.search('rotateX') > -1) {
                prevtransform[index] = '';
            }
        });
        
    }
    
    $(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + " rotateX(" + degrees2 + 'deg)';
            elementObject.style.webkitTransform = newtransform;
            if (degrees2 > 0) 
                degrees2 = 0;
            else 
                degrees2 += degrees;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }    
    
}

function rotatebb(parentId, objectId, animationProps, delay, duration, Repetitions, degrees){

    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var newtransform = " rotateZ(" + degrees + 'deg)';
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    
    var degrees2 = parseInt(degrees);
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    if (elementObject.style.webkitTransform.search('rotateZ') == -1) {
        elementObject.style.webkitTransform += ' rotateZ(0deg)';
    }
    else {
        $.each(prevtransform, function(index, value){
            if (value.search('rotateZ') > -1) {
                prevtransform[index] = '';
            }
        });
        
    }
    
    $(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + " rotateZ(" + degrees2 + 'deg)';
            elementObject.style.webkitTransform = newtransform;
            if (degrees2 > 0) 
                degrees2 = 0;
            else 
                degrees2 += degrees;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
    
}

function rotatexyzbb(parentId, objectId, animationProps, delay, duration, Repetitions, degreesx, degreesy, degreesz){

    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var newtransform = ' rotateX(' + degreesx + 'deg) rotateY(' + degreesy + 'deg) rotateZ(' + degreesz + 'deg)';
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    var degreesx2 = degreesx;
    var degreesy2 = degreesy;
    var degreesz2 = degreesz;
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    
    $.each(prevtransform, function(index, value){
        if (value.search('rotateZ') > -1 || value.search('rotateY') > -1 || value.search('rotateX') > -1) {
           prevtransform[index] = '';
        }
    });
    
	$(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + ' rotateX(' + degreesx2 + 'deg) rotateY(' + degreesy2 + 'deg) rotateZ(' + degreesz2 + 'deg)';
            ;
            elementObject.style.webkitTransform = newtransform;
            
            if (degreesx2 > 0 || degreesy2 > 0 || degreesz2 > 0) {
                degreesx2 = 0;
                degreesy2 = 0;
                degreesz2 = 0;
            }
            else {
                degreesx2 = degreesx;
                degreesy2 = degreesy;
                degreesz2 = degreesz;
            }
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
}

function rotate3dbb(parentId, objectId, animationProps, delay, duration, Repetitions, degrees){

    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    var degreesx2 = degrees;
    var degreesy2 = degrees * 2;
    var degreesz2 = 360;
    var newtransform = ' rotateX(' + degreesx2 + 'deg) rotateY(' + degreesy2 + 'deg) rotateZ(' + degreesz2 + 'deg)';
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    
    $.each(prevtransform, function(index, value){
        if (value.search('rotateZ') > -1 || value.search('rotateY') > -1 || value.search('rotateX') > -1) {
            prevtransform[index] = '';
        }
    });
    
	$(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + ' rotateX(' + degreesx2 + 'deg) rotateY(' + degreesy2 + 'deg) rotateZ(' + degreesz2 + 'deg)';
            ;
            elementObject.style.webkitTransform = newtransform;
            
            if (degreesx2 > 0 || degreesy2 > 0 || degreesz2 > 0) {
                degreesx2 = 0;
                degreesy2 = 0;
                degreesz2 = 0;
            }
            else {
                degreesx2 = degrees;
                degreesy2 = degrees;
                degreesz2 = degrees;
            }
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    // For Reference: this is how transforms work: -webkit-transform: rotateX(72deg) rotateY(144deg) rotateZ(0deg);
}

function zoombb(parentId, objectId, animationProps, delay, duration, Repetitions, factor){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var factor2 = parseFloat(factor);
    var delay2 = delay;
    var newtransform = " scale(" + factor2 + "," + factor2 + ")";
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    $.each(prevtransform, function(index, value){
        if (value.search('scale') > -1) {
            prevtransform[index] = '';
        }
    });
    
    $(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
        
        
            newtransform = prevtransform.join(" ") + " scale(" + factor2 + "," + factor2 + ")";
            
            elementObject.style.webkitTransform = newtransform;
            if (factor2 > 1) 
                factor2 = 1;
            else 
                factor2 = factor;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
}

function stretchHorbb(parentId, objectId, animationProps, delay, duration, Repetitions, factor){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var factor2 = parseFloat(factor);
    var delay2 = delay;
    var newtransform = " scaleX(" + factor2 + ")";
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    $.each(prevtransform, function(index, value){
        if (value.search('scaleX(') > -1) {
            prevtransform[index] = '';
        }
    });
    $(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + " scaleX(" + factor2 + ")";
            elementObject.style.webkitTransform = newtransform;
            if (factor2 > 1) 
                factor2 = 1;
            else 
                factor2 = factor;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
}

function stretchVerbb(parentId, objectId, animationProps, delay, duration, Repetitions, factor){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var factor2 = parseFloat(factor);
    var delay2 = delay;
    var newtransform = " scaleY(" + factor2 + ")";
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    ;
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    $.each(prevtransform, function(index, value){
        if (value.search('scaleY(') > -1) {
            prevtransform[index] = '';
        }
    });
    $(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + " scaleY(" + factor2 + ")";
            elementObject.style.webkitTransform = newtransform;
            if (factor2 > 1) 
                factor2 = 1;
            else 
                factor2 = factor;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
}

function skewHorbb(parentId, objectId, animationProps, delay, duration, Repetitions, degrees){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var degrees2 = parseInt(degrees);
    var delay2 = 0;
    var newtransform = " skewX(" + degrees + "deg)";
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
    if (elementObject.style.webkitTransform.search('skewX') == -1) {
		elementObject.style.webkitTransform += ' skewX(0deg)';
	}
	else {
		$.each(prevtransform, function(index, value){
			if (value.search("skewX") > -1) {
				prevtransform[index] = '';
			}
		});
	}
	$(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + " skewX(" + degrees2 + "deg)";
            elementObject.style.webkitTransform = newtransform;
            
            if (degrees2 > 1) 
                degrees2 = 0;
            else 
                degrees2 = degrees;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
    
}

function skewVerbb(parentId, objectId, animationProps, delay, duration, Repetitions, degrees){
    objectId = '#' + parentId + ' #' + objectId;
    var elementObject = document.querySelector(objectId);
    var degrees2 = parseInt(degrees);
    var delay2 = 20;
    var newtransform = " skewY(" + degrees + "deg)";
    var prevtransform = elementObject.style.webkitTransform.split(" ");
    
    var delay2 = parseInt(delay);
    if (Repetitions < 0) 
        Repetitions = 555;
    
	if (elementObject.style.webkitTransform.search('skewY') == -1) {
		elementObject.style.webkitTransform += ' skewY(0deg)';
	}
	else {
		$.each(prevtransform, function(index, value){
			if (value.search("skewY") > -1) {
				prevtransform[index] = '';
			}
		});
	}
	$(objectId).show();
	var transitionProp =  $(objectId).css("-webkit-transition-property");
	if (transitionProp.search('-webkit-transform') == -1) transitionProp += ", -webkit-transform";
	    
    while (Repetitions >= 1) {
        setTimeout(function(){
		$(objectId).css("-webkit-transition-timing-function", 'cubic-bezier(0,0,1,1)');
		$(objectId).css("-webkit-transition-property", transitionProp);
		$(objectId).css("-webkit-transition-duration", duration + 'ms');
            newtransform = prevtransform.join(" ") + " skewY(" + degrees2 + "deg)";
            elementObject.style.webkitTransform = newtransform;
            
            if (degrees2 > 1) 
                degrees2 = 0;
            else 
                degrees2 = degrees;
        }, delay2 + 10);
        
        delay2 = delay2 + duration + 20;
        Repetitions -= .5;
    }
    
    
}


function animationstarterb(mainDIV, objectId, animationProps, parentId){

    var animationtype = parseInt(animationProps[0]);
    var delay = parseInt(animationProps[1]);
    var duration = parseInt(animationProps[2]);
    var Repetitions = parseInt(animationProps[3]);
    // In preview mode, just run each animation once.   
    if (mainDIV == 'preview') 
        Repetitions = 1;
    var queuetime = 15;
    
    setTimeout(function(){
        switch (animationtype) {
            case 0:{
            	slidebb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]), parseInt(animationProps[5]));
                break;
            }
            case 1:{
            	spinVerbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            case 2:{
            	spinHorbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            
            case 3:{
            	rotatebb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            case 4:{
            	zoombb(parentId, objectId, animationProps, delay, duration, Repetitions, parseFloat(animationProps[4]));
                break;
            }
            case 5:{
            	stretchHorbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseFloat(animationProps[4]));
                break;
            }
            case 6:{
	            stretchVerbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseFloat(animationProps[4]));
               	break;
            }
            case 7:{
            	skewHorbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            case 8:{
            	skewVerbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            case 9:{
            	loopBackbb(mainDIV, parentId, objectId);
                break;
            }
            case 10:{
                rotatexyzbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]), parseInt(animationProps[5]), parseInt(animationProps[6]));
                break;
            }
            case 11:{
            	rotate3dbb(parentId, objectId, animationProps, delay, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            case 12:{
                // for fade in, use the same function but give 1 as the final opacity
                fadebb(parentId, objectId, animationProps, delay, duration, Repetitions, 1);
                break;
            }
            case 13:{
                // for fade out, use the same function but give 0 as the final opacity
                fadebb(parentId, objectId, animationProps, delay, duration, Repetitions, 0);
                break;
            }
            case 14:{
            	slideInbb(parentId, objectId, animationProps, delay + 10, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            case 15:{
            	slideOutbb(parentId, objectId, animationProps, delay + 10, duration, Repetitions, parseInt(animationProps[4]));
                break;
            }
            
            default:
                {
                    alert('Invalid Animation Called!');
                    break;
                }
        }
        
}, '20ms');
    
    
}


function loopBackbb(mainDIV, parentId, objectId){

    var elementObject = $('#' + parentId + ' #' + objectId);
    var totalDuration = -1;
    
    $(elementObject).data("animationStarted", false);
    $(elementObject).attr("style", $(elementObject).data("data-initialState"));
    
    totalDuration = Math.max(totalDuration, estimateTotalAnimationTime(elementObject));
 	startAnimations(elementObject, totalDuration, mainDIV);
   
}

// *** End Balach's CSS Animations Implementation ***



/************************Progress Bar***********************/
/*
 * Display a processing screen within a specified duration
 */
function showProgressBar(duration)
{	
	var loadingScreen = document.getElementById('processingScreen');
	loadingScreen.style.display="block";
	setTimeout(function(){loadingScreen.style.display="none"},duration);
}

/*
 * Display a processing screen within a specified duration
 * After that, execute callBackFunction
 * callBackFunction has one parameter
 */
function showProgressBarWithNoParam(duration, callBackFunction)
{
	var loadingScreen = document.getElementById('processingScreen');
	loadingScreen.style.display="block";
	setTimeout(function(){loadingScreen.style.display="none";callBackFunction();},duration);
}

/*
 * Display a processing screen within a specified duration
 * After that, execute callBackFunction
 * callBackFunction has two parameters
 */
function showProgressBarWithOneParam(duration, callBackFunction, param)
{
	var loadingScreen = document.getElementById('processingScreen');
	loadingScreen.style.display="block";
	setTimeout(function(){loadingScreen.style.display="none";callBackFunction(param);},duration);
}

/*
 * Display a processing screen within a specified duration
 * After that, execute callBackFunction
 * callBackFunction has three parameters
 */
function showProgressBarWithTwoParam(duration, callBackFunction, param1, param2)
{
	var loadingScreen = document.getElementById('processingScreen');
	loadingScreen.style.display="block";
	setTimeout(function(){loadingScreen.style.display="none";callBackFunction(param1, param2);},duration);
}

/*
 * Display a processing screen within a specified duration
 * After that, execute callBackFunction
 * callBackFunction has four parameters
 */
function showProgressBarWithThreeParam(duration, callBackFunction, param1, param2, param3)
{
	var loadingScreen = document.getElementById('processingScreen');
	loadingScreen.style.display="block";
	setTimeout(function(){loadingScreen.style.display="none";callBackFunction(param1, param2, param3);},duration);
}

function deleteProgressBar()
{
  var loadingScreen = document.getElementById('processingScreen');
  if (loadingScreen) loadingScreen.style.display="none"
}

/***********************************************************/

//=Alert Box=
/**

  Used to show alert box with specified message title, and content.
  Height of the alert box can be adjusted. Type (Alert,prompt, etc) can be changed using
  parameter.
  
  Params:
  1.  msgTitle    : (compulsory) title of the message
  2.  msgBody     : (compulsory) content of the message
  3.  height      : (optional) height of the alert box in pixels as "integer"
              Default is 150.
  4.  type      : (optional) type of alert box. Default is "alert".
  
  Return
  None  - for "alert"

*/
function alertBox_Show(msgTitle,msgBody,height,type)
{
  if(height==null)height=150;
  if(type==null)type="alert"; 
  var alertBox = document.getElementById('alertBox'); 
  var title = document.getElementById('alertBox_Title');
  var close = document.getElementById('alertBox_Button_Close');
  close.onclick=function(e)
  {
    toggleDisplay('off');
  } 
  var icon = document.getElementById('alertBox_Image_Icon');
  var body = document.getElementById('alertBox_Body');
  var OK = document.getElementById('alertBox_Button_OK');
  var cancel = document.getElementById('alertBox_Button_Cancel');
  title.innerHTML = msgTitle; 
  alertBox.style.height = height + "px";
  alertBox.style.marginTop = -(height/2) + "px";  
  
  if(type=="alert")
  {   
    icon.src = "images/alertBox_Alert.png";
    body.innerHTML = msgBody;   
    toggleDisplay('on');
    OK.onclick=function(e)
    {
      toggleDisplay('off');
      if (document.getElementById("canvas"))
        clear_upload_data();      
    } 
    OK.style.display="block";
    cancel.style.display="none";
  }
  else if(type=="prompt"){
    icon.src = "images/alertBox_Prompt.png";
    body.innerHTML = msgBody;   
    toggleDisplay('on');
    OK.innerHTML = "Yes";
    cancel.innerHTML = "No";
    OK.onclick=function(e) { toggleDisplay('off'); } 
    cancel.onclick=function(e) { toggleDisplay('off'); }
    OK.style.display="block";
    cancel.style.display="block";
  }
  
  function toggleDisplay(toggle)
  {
    var displayProperty = (toggle == 'on') ? 'block': 'none';
    document.getElementById('fader').style.display = displayProperty;
    document.getElementById('alertBox').style.display = displayProperty;
    if(toggle=='off')
    {
      OK.style.display="none";
      cancel.style.display="none";
    }
  }
}

/*
 * Navigate to the page specified by the clicked element 
 * The pageID and the URL to get the content of the targeted page
 * is stored inside the clicked element.
 * @params: clickedElement: the element storing the infos for navigation, not null
 * @access: public
 */
function goToNextPage(clickedElement)
{
	// get the main div containing all the element objects
	var areaDiv = clickedElement.parentNode.parentNode;
	
	// get the URL to retrieve the page content
	var pageURL = clickedElement.getAttribute("data-pageurl");
	
	// get the pageID of the targeted page and replace spaces by underscores
  var pageID = clickedElement.getAttribute("data-pageid");
	// get the link of the external website
	var externalLink = clickedElement.getAttribute("data-exlink");
	
	// get the transition effect which is used to navigate to the targeted page
	var pageTransition = clickedElement.getAttribute("data-transition");
	
	// check if the link will go to an external website and open a new browser window
	if (pageID == null || pageID == "") {
		//if (externalLink != null && externalLink != "")
		if(externalLink == null || externalLink == "")return;
		if(externalLink.search("http")<0 && externalLink.search(":")<0)
			externalLink = "http://" + externalLink;
		window.open(externalLink, "width=320,height=416");
		return;
	}
	
	//change the title of document
  var title = document.title;
  title = title.replace(/\/\d{0,}\w{0,}/g, "");
  document.title = title + "/" + pageID;
	
	// check if the next page is the current page itself
	if ($(clickedElement).descendantOf("#" + pageID)) 
		return;
	
	// delete the targeted page if it has already been in the document
	//if (document.getElementById(pageID) != null)
		//document.body.removeChild(document.getElementById(pageID));
	
	// create the targeted page if it has not been existed
	if (document.getElementById(pageID) == null)	
		createDiv(pageID, pageURL);  
  else {
    var url = window.location.href;
    if (url.indexOf("full") > 0 || url.indexOf("file") >= 0){
      var cur_Div = sessionStorage.getItem(pageID);
      if(cur_Div==null){
        sessionStorage.setItem(pageID, true);
        prepareAndStartAllAnimations(document.getElementById(pageID).childNodes[1]);
        publishWidgets(document.getElementById(pageID).childNodes[1]); 
      }
    }
  } 
   
    // start the animation in the next page
	//setTimeout(function() {prepareAndStartAllAnimations(document.getElementById("area_" + pageID));}, 1000);
	
	// go to the next page with specified transition effect
	goToPage(areaDiv.parentNode, pageID, pageTransition);
}


/*
 * Check if the element this function called on
 * is the descendant of a specified element
 * This is an extension of jquery
 * @params: element: the specified element, not null
 * @access: private
 */
$.fn.descendantOf = function(element){
    element = $(element)[0];
    var current = this;
    var body = document.body;
    while (current && current != element && current != document.body) {
        current = $(current).parent()[0];
    }
    if (typeof(current) == "undefined" || typeof(current) == "null") {
		return false;
	}
	else {
		if (current == element) 
			return true;
		else {
			if (current == document.body)
				return false;
		}
	}
}

/*
 * Navigate to the previous page
 * Currently not used
 */
function goToPreviousPage(clickedElement)
{
    clickedElement.setAttribute("href", "#");
}

/*
 * Create a new div in the HTML document and populate the page content into
 * @params: pageID: also the id for the div, not null; 
 * pageURL: the URL to retrieve the content of the page, not null
 * @access: private
 */
function createDiv(pageID, pageURL)
{	
	// create main div
  var mainDiv = document.createElement("DIV");
  mainDiv.setAttribute("id", pageID);
  
	
	// create "area" div
  var areaDivID = "area_" + pageID;
	
	// add main div to current body
	document.body.appendChild(mainDiv);
	// load content to "area" div and start animations after that
	$("#" + pageID).load(pageURL, function() {
	  showLoadingScreen(pageID, areaDivID);
	  setTimeout(function() {$("#"+areaDivID).css("display", "block")}, 2000);
	});
}

/*
 * Go from the currentPage to the targeted page with specified transition effect
 * @params: currentPage: reference to the DIV containing content of the current page, not null;
 * nextPageId: the pageID of the targeted page, also the id of the corresponding DIV, not null, not empty;
 * transitionEffect: the transition effect, not null, not empty
 * @access: private
 */
function goToPage(currentPage, nextPageID, transitionEffect) {
	var userAgent = navigator.userAgent.toLowerCase();
	
    if (detectAppleDevice(userAgent) || detectAndroidDevice(userAgent) || detectWebkitBrowser(userAgent)) {
		jqt.goTo("#" + nextPageID, transitionEffect);
	}
	else if (detectBlackBerryDevice(userAgent) || detectSymbianDevice(userAgent)) {
		currentPage.className = "";
		document.getElementById(nextPageID).className = "current";
	}
	else if (detectWebkitBrowser(userAgent)) {
		currentPage.className = "";
		document.getElementById(nextPageID).className = "current";
	}
}

/*
 * detect if the device is an Apple device
 * @params: userAgent: the user agent of the running device, not null 
 * @access: private
 */
function detectAppleDevice(userAgent){
    userAgent = userAgent.toLowerCase();
    return (contains(userAgent, "iphone") || contains(userAgent, "ipad") || contains(userAgent, "ipod"));
}

/*
 * detect if the device is an Symbian S60 device
 * @params: userAgent: the user agent of the running device, not null 
 * @access: private
 */
function detectSymbianDevice(userAgent){
    userAgent = userAgent.toLowerCase();
    return (contains(userAgent, "webkit") && (contains(userAgent, "series60") || contains(userAgent, "symbian")));
}

/*
 * detect if the device is an Android device
 * @params: userAgent: the user agent of the running device, not null 
 * @access: private
 */
function detectAndroidDevice(userAgent){
    userAgent = userAgent.toLowerCase();
    return (contains(userAgent, "android") && contains(userAgent, "webkit"));
}

/*
 * detect if the device is an BlackBerry device
 * @params: userAgent: the user agent of the running device, not null 
 * @access: private
 */
function detectBlackBerryDevice(userAgent){
    userAgent = userAgent.toLowerCase();
    return (contains(userAgent, "blackberry"));
}

/*
 * detect if the device use webkit browser
 * @params: userAgent: the user agent of the running device, not null 
 * @access: private
 */
function detectWebkitBrowser(userAgent) {
	userAgent = userAgent.toLowerCase();
    return (contains(userAgent, "webkit"));
}

/*
 * check if a str contains another subStr
 * utility function
 * @params: str; subStr: not null 
 * @access: private
 */
function contains(str, subStr){
    return (str.search(subStr) > -1);
}

function loadVideo(mainDIV)
{
  var children = utility_GetElementsByClass("media", mainDIV ,'video');  
  
  for (var i=0; i < children.length; i++) 
  { 
    children[i].setAttribute('controls', "controls");
    children[i].setAttribute('preload', "auto");

  }
}

/*
 * adding the loading screen into the campus for the publish/preview
 */
function showLoadingScreen(divId, areaDiv){
  var parentDiv = document.getElementById(divId);
  var canvasWidth = $("#" + areaDiv).css("width");
  var canvasHeight = $("#" + areaDiv).css("height");

  $("#processingScreen").css({"width": canvasWidth, "height": canvasHeight});
  showProgressBar(2000);
  setTimeout(function() {prepareAndStartAllAnimations(document.getElementById(areaDiv));publishWidgets(document.getElementById(areaDiv));}, 2000);
}

$(document).ready(function(){
  var parentDiv = document.body.childNodes[1].id;
  showLoadingScreen(parentDiv, "area");
  changeMetaTag("area");
  detectOrientation("area");
});

function detectOrientation(){
  var userAgent = navigator.userAgent.toLowerCase();
  
  if (detectAppleDevice(userAgent)) { // || detectAndroidDevice(userAgent) || detectWebkitBrowser(userAgent)
    changeScreenOrientation();
  }
  else if (detectBlackBerryDevice(userAgent) || detectSymbianDevice(userAgent)) {

  }
  else if (detectWebkitBrowser(userAgent)) {
  }
}

function changeScreenOrientation(divId){
  var contentWidth=$("#"+divId).css("width");
  var contentHeight=$("#"+divId).css("height");
  width = screen.width;
  height = screen.height;
  if (contentWidth > contentHeight)
    window.orientation = 90;
  else
    window.orientation = 0;
}

function changeMetaTag(divId){
  var metaTag = document.getElementsByTagName("meta")[3];
  var contentWidth=$("#"+divId).css("width");
  var contentHeight=$("#"+divId).css("height");
  if(contentWidth){
    metaTag.content = "width="+ contentWidth.replace("px","") +",height="+ contentHeight.replace("px","") +",user-scalable=no,initial-scale=1.0";
   // document.body.style = "max-height:" + contentHeight + "!important;max-width:" + contentWidth + " !important;";
    document.body.width = contentWidth;
    document.body.height = contentHeight;
  }
}


/*
 * Maps Global Variables
 * */
var mapElemId;

var markerArray = new Array();




//-------------------------------------------------functions for cell property-----------------------------------------------------------------
var currentPageId;
$(function(){
    $('#flowGridView_title_1').click(function(){
        $('#flowGridView_table_1').toggle("fast");
        $(this).children().toggleClass("labels_max");
    });
    $('#flowGridView_title_2').click(function(){
        $('#flowGridView_table_2').toggle("fast");
        $(this).children().toggleClass("labels_max");
    });
    $('#flowGridView_title_3').click(function(){
        $('#flowGridView_table_3').toggle("fast");
        $(this).children().toggleClass("labels_max");
    });
    $('#flowGridView_title_4').click(function(){
        $('#flowGridView_table_4').toggle("fast");
        $(this).children().toggleClass("labels_max");
    });
    $('#rssGridView_title_1').click(function(){
        $('#rssGridView_table_1').toggle("fast");
        $(this).children().toggleClass("labels_max");
    });
    $('#rssGridView_title_2').click(function(){
        $('#rssGridView_table_2').toggle("fast");
        $(this).children().toggleClass("labels_max");
    });
    $('#rssGridView_title_3').click(function(){
        $('#rssGridView_table_3').toggle("fast");
        $(this).children().toggleClass("labels_max");
    });
    $('#mapView_title_1').click(function(){
        $('#mapView_table_1').toggle("fast");
        $(this).children().toggleClass("lables_max");
    });
    $("#flowGridView_title_3").css("display", "none");
    $("#property_flowView1").css("display", "block");
});

function selectAllImages(){
    var selected = document.getElementById('selectAll');
    if (selected.checked) {
        var images_library = document.getElementById('image_library_window');
        var chkboxes = images_library.getElementsByClassName('checkbox_imageLibrary');
        for (var j = 0; j < chkboxes.length; j++) {
            chkboxes[j].checked = true;
        }
    }
    else {
        var images_library = document.getElementById('image_library_window');
        var chkboxes = images_library.getElementsByClassName('checkbox_imageLibrary');
        for (var j = 0; j < chkboxes.length; j++) {
            chkboxes[j].checked = false;
        }
        
    }
}

function selectNoImages(){
    var images_library = document.getElementById('image_library_window');
    var chkboxes = images_library.getElementsByClassName('checkbox_imageLibrary');
    for (var j = 0; j < chkboxes.length; j++) {
        chkboxes[j].checked = false;
    }
}

function openImageLibraryWindow(){
    $('#image_library_window').css('display', 'block');
    lockScreen2();
    getImageLibrary();
}

/*$(function() {
 $('#image_library_window').draggable({
 containment: 'body', cursor: 'move', zIndex: 20000, handle: 'h4'
 });
 });*/
function documentWindow_Image_Library_Window(off){
    if (off == 'off') {
        lockScreen2("unlock");
        $('#image_library_window').css('display', 'none');
    }
}


$(function(){
    $("#cancel_image_library_window").click(function(){
        lockScreen2("unlock");
        $('#image_library_window').css('display', 'none');
    });
    $("img", "#image_library_window_container").click(function(){
        if ($(this).attr('isSelected') == 'yes') {
            $(this).css('border', 'none');
            $(this).attr('isSelected', 'no');
            var parent1 = this.parentNode;
            $("input", parent1).attr('checked', false);
        }
        else {
            $(this).css('border', '2px solid #19AEE7');
            $(this).attr('isSelected', 'yes');
            var parent1 = this.parentNode;
            $("input", parent1).attr('checked', true);
        }
    });
    $("input", "#image_library_window_container").change(function(){
        if ($(this).attr('checked') == true) {
            var parentI = this.parentNode;
            var parent2 = parentI.parentNode;
            $('img', parent2).css('border', '2px solid #19AEE7');
        }
        else {
            var imgs = this.parentNode.getElementsByTagName('img');
            var parentI = this.parentNode;
            var parent2 = parentI.parentNode;
            $('img', parent2).css('border', 'none');
        }
    });
    
    $("#confirm_image_library_window").click(function(){
        lockScreen2("unlock");
        $('#image_library_window').css('display', 'none');
        loadAndUpdateFlow();
    });
});



function populate_widgetProperties(newElement){

    if (newElement.getAttribute('widget_type') == 'flow') {
        if (newElement.getAttribute('mode') == 'rss') {
        
            $("#property_flowView1").css("display", "block");
            $("#flowGridView_title_3").css("display", "none");
        }
        else {
            $("#property_flowView1").css("display", "none");
            $("#flowGridView_title_3").css("display", "block");
            
        }
        
        document.getElementById('property_flowView1').value = newElement.getAttribute('feedurl');
        var elemId = "#" + newElement.id;
        var flowCells = newElement.getElementsByClassName('ad-flow-view-cell');
        var strwidth = $(".ad-flow-view-cell", $(elemId)).css('width');
        strwidth = strwidth.substring(0, strwidth.length - 2);
        
        var strheight = $(".ad-flow-view-cell", $(elemId)).css('height');
        strheight = strheight.substring(0, strheight.length - 2);
        
        document.getElementById('property_flowView2').value = strwidth;//$(".ad-flow-view-cell", $(elemId)).css('width');
        document.getElementById('property_flowView3').value = strheight;//$(".ad-flow-view-cell", $(elemId)).css('height');		
        document.getElementById('property_flowView4').value = flowCells.length;
        document.getElementById('property_flowView6').value = $(".ad-flow-view", $(elemId)).css('-webkit-perspective');
        document.getElementById('Prtive').value = $(".ad-flow-view", $(elemId)).css('-webkit-perspective');
        document.getElementById('property_flowView8').value = $(".ad-flow-view", $(elemId)).attr('onClickEvent');
        var cellTop = $(".ad-flow-view-cell", $(elemId)).css('top');
        var cellLeft = $(".ad-flow-view-cell", $(elemId)).css('left');
        document.getElementById('property_flowView9A').value = cellLeft.substring(0, cellLeft.length - 2);
        document.getElementById('property_flowView9B').value = cellTop.substring(0, cellTop.length - 2);
        document.getElementById('PositionX').value = document.getElementById('property_flowView9A').value;
        document.getElementById('PositionY').value = document.getElementById('property_flowView9B').value;
        
        
        //document.getElementById('property_flowView9A').value =$(".ad-flow-view-cell", ".ad-flow-view").css('top');
        //document.getElementById('property_flowView9B').value = 	$(".ad-flow-view-cell", ".ad-flow-view").css('left');
        var reg = new RegExp(/^([0-9]*)px\s([0-9]*)px/);
        
        if (newElement.getAttribute('mode') == 'rss') {
            document.getElementById('rss_radio').checked = true;
        }
        else {
            document.getElementById('local_radio').checked = true;
            
        }
        
        var origin = $(".ad-flow-view", $(elemId)).css('-webkit-perspective-origin');
        while (origin.indexOf("px") > -1) {
            origin = origin.replace("px", "");
        }
        var space = origin.indexOf(" ");
        var originx = origin.substring(0, space);
        var originy = origin.substring(space + 1, origin.length);
        document.getElementById('property_flowView7A').value = originx; //$(".ad-flow-view", $(elemId)).css('-webkit-perspective-origin');
        document.getElementById('property_flowView7B').value = originy;
        document.getElementById('PrtiveX').value = originx;
        document.getElementById('PrtiveY').value = originy;
    }
    else 
        if (newElement.getAttribute('widget_type') == 'rssNews') {
            var elemId = "#" + newElement.id;
            document.getElementById('property_newsRSSView1').value = newElement.getAttribute('feedurl');
            document.getElementById('property_newsRSSView2').value = $(".ad-table-view-cell", $(elemId)).css('width');
            document.getElementById('property_newsRSSView3').value = $(".ad-table-view-cell", $(elemId)).css('height');
            var cellNums = newElement.getElementsByClassName('ad-table-view-cell');
            document.getElementById('property_newsRSSView4').value = cellNums.length;
            
            var rgbString2 = $(".ad-table-view", $(elemId)).css('background-color');
            var partstwo = rgbString2.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
            if (partstwo != undefined) {
                delete (partstwo[0]);
                for (var i = 1; i <= 3; ++i) {
                    partstwo[i] = parseInt(partstwo[i]).toString(16);
                    if (partstwo[i].length == 1) 
                        partstwo[i] = '0' + partstwo[i];
                }
                var hexString2 = partstwo.join('');
                hexString2 = hexString2.toUpperCase();
                document.getElementById('property_newsRSSView5').value = hexString2;
                $("#property_newsRSSView5").css('background-color', "#" + hexString2);
            }
            else {
                $(".ad-table-view", $(elemId)).css('background-color', "#FFFFFF");
                document.getElementById('property_newsRSSView5').value = "#FFFFFF";
                $("#property_newsRSSView5").css('background-color', "#FFFFFF");
            }
            var rgbString = $(".ad-table-view-cell", $(elemId)).css('background-color');
            var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
            if (parts != undefined) {
                delete (parts[0]);
                for (var i = 1; i <= 3; ++i) {
                    parts[i] = parseInt(parts[i]).toString(16);
                    if (parts[i].length == 1) 
                        parts[i] = '0' + parts[i];
                }
                var hexString = parts.join('');
                hexString = hexString.toUpperCase();
                document.getElementById('property_newsRSSView9').value = hexString;
                $("#property_newsRSSView9").css('background-color', "#" + hexString);
            }
            else {
                $(".ad-table-view-cell", $(elemId)).css('background-color', "#000000");
                document.getElementById('property_newsRSSView9').value = "#000000";
                $("#property_newsRSSView9").css('background-color', "#000000");
                
            }
            var rgbString1 = $('.titleClass', newElement).css('color');
            if (rgbString1 != undefined) {
            

                var parts = rgbString1.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
                
                delete (parts[0]);
                for (var i = 1; i <= 3; ++i) {
                    parts[i] = parseInt(parts[i]).toString(16);
                    if (parts[i].length == 1) 
                        parts[i] = '0' + parts[i];
                }
                var hexString1 = parts.join('');
                hexString1 = hexString1.toUpperCase();

                
                document.getElementById('property_newsRSSView7').value = hexString1;
                $("#property_newsRSSView7").css('background-color', "#" + hexString1);
            }
            else {
                rgbString1 = $('.titleClass', newElement).css('color', "#000000");
                document.getElementById('property_newsRSSView7').value = "000000";
                $("#property_newsRSSView7").css('background-color', "#000000");
            }
            var fontsize = $('.titleClass', newElement).css('font-size');
            if (fontsize != undefined) {
            
                fontsize = fontsize.substring(0, fontsize.length - 2);
                document.getElementById('Rrange').value = fontsize;//$('.dateClass',newElement).css('font-size');
                document.getElementById('Rfonts').value = fontsize; //$('.dateClass',newElement).css('font-size');
            }
            else {
                $('.titleClass', newElement).css('font-size', "15px");
                document.getElementById('Rrange').value = 15;//$('.dateClass',newElement).css('font-size');
                document.getElementById('Rfonts').value = 15; //$('.dateClass',newElement).css('font-size');
            }
            var fontfamily = $('.titleClass', newElement).css('font-family');

            if (fontfamily == "Arial Narrow") {
                document.getElementById('property_newsRSSView8').value = "Arial Narrow";
            }
            else 
                if (fontfamily == undefined) {
                    document.getElementById('property_newsRSSView8').value = "helvetica";
                }
                else {
                    document.getElementById('property_newsRSSView8').value = fontfamily;
                }
            
            var tTop = $('.titleClass', newElement).css('padding-top');
            var tLeft = $('.titleClass', newElement).css('padding-left');
            
            document.getElementById('property_newsRSSView10A').value = tTop;
            document.getElementById('property_newsRSSView10B').value = tLeft;
            
            document.getElementById('property_newsRSSView6').value = 0;
            
            

        
        }
        else if (newElement.getAttribute('widget_type') == 'map') {
                document.getElementById("property_mapView1").value = newElement.getAttribute('feedurl');
            }

}

function updateTableTextProperties(){
    var textType = document.getElementById('property_newsRSSView6').value;
    var textT;
    switch (textType) {
        case '0':
            textT = 'titleClass';
            break;
        case '1':
            textT = 'contentClass';
            break;
        case '2':
            textT = 'dateClass';
            break;
            
            
    }
    
    var rgbString1 = $("." + textT, activeObject).css('color');
    var parts = rgbString1.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
    
    delete (parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) 
            parts[i] = '0' + parts[i];
    }
    var hexString1 = parts.join('');
    hexString1 = hexString1.toUpperCase();

    document.getElementById('property_newsRSSView7').value = hexString1;
    $("#property_newsRSSView7").css('background-color', "#" + hexString1);
    updatecolorinput_e();
    var fontsize = $("." + textT, activeObject).css('font-size');
    fontsize = fontsize.substring(0, fontsize.length - 2);
    document.getElementById('Rrange').value = fontsize;//$('.dateClass',newElement).css('font-size');
    document.getElementById('Rfonts').value = fontsize; //$('.dateClass',newElement).css('font-size');
    var fontfamily = $("." + textT, activeObject).css('font-family');
    
    document.getElementById('property_newsRSSView10A').value = $("." + textT, activeObject).css('padding-top');
    document.getElementById('property_newsRSSView10B').value = $("." + textT, activeObject).css('padding-left');
    
    fontfamily = fontfamily.toLowerCase();
    document.getElementById('property_newsRSSView8').value = fontfamily;
    


}

function propertyChange(propertyName, propertyVal){

    var widgetType = activeObject.getAttribute('widget_type');
    
    switch (widgetType) {
    
        case 'flow':
            switch (propertyName) {
                case 'cell_width':
                    if (event.keyCode == 13) {
                        var cellWidth = document.getElementById('property_flowView2').value;
                        var flowCells = activeObject.getElementsByClassName('ad-flow-view-cell');
                        var i;
                        for (i = 0; i < flowCells.length; i++) {
                            flowCells[i].style.width = cellWidth;
                        }
                    }
                    break;
                case 'cell_height':
                    if (event.keyCode == 13) {
                        var cellHeight = document.getElementById('property_flowView3').value;
                        var flowCells = activeObject.getElementsByClassName('ad-flow-view-cell');
                        var i;
                        for (i = 0; i < flowCells.length; i++) {
                            flowCells[i].style.height = cellHeight;
                        }
                    }
                    break;
                case 'flow_width':
                    if (event.keyCode == 13) {
                        var cellWidth = document.getElementById('property_flowView10A').value;
                        var flowCells = activeObject.getElementsByClassName('ad-flow-view');
                        var i;
                        for (i = 0; i < flowCells.length; i++) {
                            flowCells[i].style.width = cellWidth;
                        }
                    }
                    break;
                case 'flow_height':
                    if (event.keyCode == 13) {
                        var cellHeight = document.getElementById('property_flowView10B').value;
                        var flowCells = activeObject.getElementsByClassName('ad-flow-view');
                        var i;
                        for (i = 0; i < flowCells.length; i++) {
                            flowCells[i].style.height = cellHeight;
                        }
                    }
                    break;
                case 'perspective':
                    //if (event.keyCode == 13) {
                    document.getElementById('Prtive').value = document.getElementById('property_flowView6').value;
                    var elemId = "#" + activeObject.id;
                    var flows = activeObject.getElementsByClassName('ad-flow-view');
                    if (flows.length > 0) {
                        $(flows[0]).css('-webkit-perspective', document.getElementById('property_flowView6').value);
                    }
                    //}
                    //$(".ad-flow-view", $(elemId)).css('-webkit-perspective') = document.getElementById('property_flowView6').value;
                    break;
                case 'perspective-origin':
                    //if (event.keyCode == 13) {
                    document.getElementById('PrtiveX').value = document.getElementById('property_flowView7A').value;
                    document.getElementById('PrtiveY').value = document.getElementById('property_flowView7B').value;
                    var elemId = "#" + activeObject.id;
                    var flows = activeObject.getElementsByClassName('ad-flow-view');
                    var originval = document.getElementById('property_flowView7A').value + "px " + document.getElementById('property_flowView7B').value + "px";
                    
                    if (flows.length > 0) {
                        $(flows[0]).css('-webkit-perspective-origin', originval);
                    }
                    //}
                    //$(".ad-flow-view", $(elemId)).css('-webkit-perspective') = document.getElementById('property_flowView7').value;
                    break;
                case 'cell_numbers':
                    if (event.keyCode == 13) {
                        var elemId = "#" + activeObject.id;
                        var flows = activeObject.getElementsByClassName('ad-flow-view');
                        activeObject.setAttribute('cellNum', document.getElementById('property_flowView4').value);
                        
                        reloadNumberCellsFlow(activeObject.getAttribute('cellNum'));
                    }
                    break;
                case 'onClickEvent':
                    var flows = activeObject.getElementsByClassName('ad-flow-view');
                    if (flows.length > 0) {
                        flows[0].setAttribute('onClickEvent', document.getElementById('property_flowView8').value);
                    }
                    //		activeObject.setAttribute('onClickEvent',document.getElementById('property_flowView8').value);
                    break;
                case 'cell_position':
                    //if (event.keyCode == 13) {
                    document.getElementById('PositionX').value = document.getElementById('property_flowView9A').value;
                    document.getElementById('PositionY').value = document.getElementById('property_flowView9B').value;
                    $(".ad-flow-view-cell", activeObject).css('top', document.getElementById('property_flowView9B').value);
                    $(".ad-flow-view-cell", activeObject).css('left', document.getElementById('property_flowView9A').value);
                    //}
                    break;
                default:
                    break;
                    
            }
            break;
        case 'carousel':
            switch (propertyName) {
                case 'cell_width':
                    break;
                case 'cell_height':
                    break;
                default:
                    break;
            }
            break;
        case 'rssNews':
            var typeText = document.getElementById('property_newsRSSView6').value;
            switch (propertyName) {
                case 'cell_width':
                    if (event.keyCode == 13) {
                        var cellWidth = document.getElementById('property_newsRSSView2').value;
                        var tableCells = activeObject.getElementsByClassName('ad-table-view-cell');
                        var i;
                        for (i = 0; i < tableCells.length; i++) {
                            tableCells[i].style.width = cellWidth;
                        }
                    }
                    break;
                case 'cell_height':
                    if (event.keyCode == 13) {
                        var cellHeight = document.getElementById('property_newsRSSView3').value;
                        
                        var tableCells = activeObject.getElementsByClassName('ad-table-view-cell');
                        
                        var i;
                        for (i = 0; i < tableCells.length; i++) {
                            tableCells[i].style.height = cellHeight;
                        }
                        
                        cellHeight = cellHeight.substring(0, cellHeight.length - 2);
                        var tHeight = cellHeight * tableCells.length;
                    // $('.hosting-layer', activeObject).css('height', tHeight);
                    }
                    break;
                case 'background_color':
                    var bgColor = document.getElementById('property_newsRSSView5').value;
                    $(".ad-table-view", activeObject).css('background-color', ("#" + bgColor));
                    break;
                case 'cell_numbers':
                    if (event.keyCode == 13) {
                        var elemId = "#" + activeObject.id;
                        var flows = activeObject.getElementsByClassName('ad-table-view');
                        activeObject.setAttribute('cellNum', document.getElementById('property_newsRSSView4').value);
                        
                        reloadNumberCellsTable(activeObject.getAttribute('cellNum'));
                    }
                    break;
                case 'font_color':
                    if (typeText == '0') {
                        var color = document.getElementById('property_newsRSSView7').value;
                        $(".titleClass", activeObject).css('color', ("#" + color));
                    }
                    else 
                        if (typeText == '1') {
                            var color = document.getElementById('property_newsRSSView7').value;
                            $(".contentClass", activeObject).css('color', ("#" + color));
                        }
                        else 
                            if (typeText == '2') {
                                var color = document.getElementById('property_newsRSSView7').value;
                                $(".dateClass", activeObject).css('color', ("#" + color));
                            }
                    break;
                case 'font_align':
                    if (typeText == '0') {
                        $(".titleClass", activeObject).css('text-align', "" + propertyVal);
                    }
                    else 
                        if (typeText == '1') {
                            $(".contentClass", activeObject).css('text-align', "" + propertyVal);
                        }
                        else 
                            if (typeText == '2') {
                                $(".dateClass", activeObject).css('text-align', "" + propertyVal);
                            }
                    break;
                case 'font_decoration':
                    if (typeText == '0') {
                        if ($('.titleClass', activeObject).css('text-decoration') == propertyVal) {
                            $('.titleClass', activeObject).css('text-decoration', 'none');
                        }
                        else {
                            $(".titleClass", activeObject).css('text-decoration', "" + propertyVal);
                        }
                    }
                    else 
                        if (typeText == '1') {
                            if ($('.contentClass', activeObject).css('text-decoration') == propertyVal) {
                                $('.contentClass', activeObject).css('text-decoration', 'none');
                            }
                            else {
                                $(".contentClass", activeObject).css('text-decoration', "" + propertyVal);
                            }
                        }
                        else 
                            if (typeText == '2') {
                                if ($('.dateClass', activeObject).css('text-decoration') == propertyVal) {
                                    $('.dateClass', activeObject).css('text-decoration', 'none');
                                }
                                else {
                                    $(".dateClass", activeObject).css('text-decoration', "" + propertyVal);
                                }
                            }
                    break;
                case 'font_weight':
                    if (typeText == '0') {
                        if ($('.titleClass', activeObject).css('font-weight') == propertyVal) {
                        
                            $('.titleClass', activeObject).css('font-weight', 'normal');
                        }
                        else {
                            $(".titleClass", activeObject).css('font-weight', "" + propertyVal);
                        }
                    }
                    else 
                        if (typeText == '1') {
                            if ($('.contentClass', activeObject).css('font-weight') == propertyVal) {
                            
                                $('.contentClass', activeObject).css('font-weight', 'normal');
                            }
                            else {
                                $(".contentClass", activeObject).css('font-weight', "" + propertyVal);
                            }
                        }
                        else 
                            if (typeText == '2') {
                                if ($('.dateClass', activeObject).css('font-weight') == propertyVal) {
                                    $('.dateClass', activeObject).css('font-weight', 'normal');
                                }
                                else {
                                    $(".dateClass", activeObject).css('font-weight', "" + propertyVal);
                                }
                            }
                    break;
                case 'font_style':
                    if (typeText == '0') {
                        if ($('.titleClass', activeObject).css('font-style') == propertyVal) {
                            $('.titleClass', activeObject).css('font-style', 'normal');
                        }
                        else {
                            $(".titleClass", activeObject).css('font-style', propertyVal);
                        }
                    }
                    else 
                        if (typeText == '1') {
                            if ($('.contentClass', activeObject).css('font-style') == propertyVal) {
                                $('.contentClass', activeObject).css('font-style', 'normal');
                            }
                            else {
                                $(".contentClass", activeObject).css('font-style', propertyVal);
                            }
                        }
                        else 
                            if (typeText == '2') {
                                if ($('.dateClass', activeObject).css('font-style') == propertyVal) {
                                    $('.dateClass', activeObject).css('font-style', 'normal');
                                }
                                else {
                                    $(".dateClass", activeObject).css('font-style', propertyVal);
                                }
                            }
                    break;
                case 'font_size':
                    document.getElementById('Rfonts').value = propertyVal;
                    document.getElementById('Rrange').value = propertyVal;
                    if (typeText == '0') {
                        $(".titleClass", activeObject).css('font-size', propertyVal);
                    }
                    else 
                        if (typeText == '1') {
                            $(".contentClass", activeObject).css('font-size', propertyVal);
                        }
                        else 
                            if (typeText == '2') {
                                $(".dateClass", activeObject).css('font-size', propertyVal);
                            }
                    break;
                case 'font_family':
                    var familyName = document.getElementById('property_newsRSSView8').value;
                    if (typeText == '0') {
                        $(".titleClass", activeObject).css('font-family', familyName);
                    }
                    else 
                        if (typeText == '1') {
                            $(".contentClass", activeObject).css('font-family', familyName);
                        }
                        else 
                            if (typeText == '2') {
                                $(".dateClass", activeObject).css('font-family', familyName);
                            }
                    break;
                case 'cell_background_color':
                    var bgColor = document.getElementById('property_newsRSSView9').value;
                    $(".ad-table-view-cell", activeObject).css('background-color', ("#" + bgColor));
                    break;
                case 'text_position':
                    
                    var topPos = document.getElementById('property_newsRSSView10A').value;
                    var leftPos = document.getElementById('property_newsRSSView10B').value;
                    if (typeText == '0') {
                        $(".titleClass", activeObject).css('padding-top', topPos);
                        $(".titleClass", activeObject).css('padding-left', leftPos);
                    }
                    else 
                        if (typeText == '1') {
                            $(".contentClass", activeObject).css('padding-top', topPos);
                            $(".contentClass", activeObject).css('padding-left', leftPos);
                        }
                        else 
                            if (typeText == '2') {
                                $(".dateClass", activeObject).css('padding-top', topPos);
                                $(".dateClass", activeObject).css('padding-left', leftPos);
                            }
                    
                    break;
                default:
                    break;
            }
            break;
        case 'map':
            switch (propertyName) {
                case 'kml_feed':
                    if (event.keyCode == 13) {
                        var feedkml = document.getElementById('property_mapView1').value;
                        activeObject.setAttribute('feedurl', feedkml);
                    }
                    break;
            }
            break;
            
    }
    
    
}


//-------------------------------------------------functions for cell property end-----------------------------------------------------------------
var actualActiveObjectClass;
var actualActiveObjectId;
var actualSelected = true;
var tmpURL;
function applyEventToWidget(){

    $("#flowView").click(function(){
        $(".property_flowView").show();
        $(".property_carouselView").hide();
        $(".property_rss").hide();
    })
    $("#carouselView").click(function(){
        $(".property_flowView").hide();
        $(".property_carouselView").show();
        $(".property_rss").hide();
    })
    $("#rssNews").click(function(){
        $(".property_flowView").hide();
        $(".property_carouselView").hide();
        $(".property_rss").show();
    })
    
}


function publishWidgets(areaDiv){
    currentPageId = areaDiv.id;
    var toAdd = new Array();
    var count = 0;
    var previewChildren = areaDiv.getElementsByClassName('drsElement'); //areaDiv.childNodes;
    var i;
    for (i = 0; i < previewChildren.length; i++) {
        var child = previewChildren[i]; //areaDiv.childNodes[i];
        var attr = child.getAttribute('data-content');
        if (attr == 'widget') {
            attr = child.getAttribute('widget_type');
            switch (attr) {
                case 'flow':
                    this.flowView = new ADFlowView();
                    this.flowView.dataSource = this;
                    this.flowView.delegate = this;
                    
                    // customize flow view
                    this.flowView.sidePadding = 170;
                    this.flowView.cellRotation = 1.3;
                    this.flowView.cellGap = 56.9;
                    this.flowView.dragMultiplier = 1.0;
                    this.flowView.sideZOffset = -200;
                    this.flowView.idName = child.getAttribute('id');
                    
                    this.flowView.frontCellIndex = Math.round(numberOfCovers() / 2);
                    this.flowView.centerCamera();
                    var cellNums = child.getElementsByClassName('ad-flow-view-cell');
                    this.flowView.cellNum = cellNums.length;
                    this.flowView.reloadData();
                    var flowElem = child.getElementsByClassName('ad-flow-view');
                    if (flowElem.length > 0) {
                        this.flowView.layer.style.cssText = flowElem[0].style.cssText;
                        this.flowView.layer.setAttribute('onClickEvent', flowElem[0].getAttribute('onClickEvent'));
                    }
                    var flowCells = child.getElementsByClassName('ad-flow-view-cell');
                    var pflowCells = (this.flowView.layer).getElementsByClassName('ad-flow-view-cell');
                    var textCss = pflowCells[0].style.cssText;
                    var c;
                    for (c = 0; c < pflowCells.length; c++) {
                    
                        pflowCells[c].style.cssText = pflowCells[c].style.cssText + "width:" + flowCells[0].style.width + "; height:" + flowCells[0].style.height + ";";
                        
                    }
                    
                    var childId = "#" + child.id;
                    var cellTop = $(".ad-flow-view-cell", $(childId)).css('top'); //$('ad-flow-view-cell',$(childId)).css('top');
                    var cellLeft = $(".ad-flow-view-cell", $(childId)).css('left');//$('ad-flow-view-cell',$(childId)).css('left');
                    $(".ad-flow-view-cell", this.flowView.layer).css('top', cellTop);
                    $(".ad-flow-view-cell", this.flowView.layer).css('left', cellLeft);
                    $(this.flowView.layer).css('-webkit-perspective', $(flowElem[0]).css('-webkit-perspective'));
                    $(this.flowView.layer).css('-webkit-perspective-origin', $(flowElem[0]).css('-webkit-perspective-origin'));
                    textCss = textCss + "width:300px; height:200px;";
                    previewChildren[i].innerHTML = "";
                    previewChildren[i].appendChild(this.flowView.layer);
                    
                    break;
                case 'carousel':
                    this.carousel = new ADCarouselView();
                    // set metrics
                    this.carousel.cellSize = new ADSize(310, 110);
                    this.carousel.cellPadding = 5;
                    // set delegate
                    this.carousel.delegate = this;
                    this.carousel.dataSource = this;
                    //
                    this.carousel.position = new ADPoint(15, 10);
                    // add to root view
                    //ADRootView.sharedRoot.addSubview(this.carousel);
                    //
                    this.carousel.reloadData();
                    this.carousel.layer.style.overflow = "hidden";
                    previewChildren[i].innerHTML = "";
                    previewChildren[i].appendChild(this.carousel.layer);
                    break;
                case 'rssNews':
                    this.list = new ADTableView();
                    // set up protocol implementations
                    this.list.delegate = this;
                    this.list.dataSource = this;
                    this.list.idName = child.getAttribute('id');
                    var cellNums = child.getElementsByClassName('ad-table-view-cell');
                    var tab = child.getElementsByClassName('ad-table-view');
                    this.list.cellNum = cellNums.length;
                    var bgcolor = $(".ad-table-view-cell", child).css('background-color');
                    var width = $(".ad-table-view-cell", child).css('width');
                    var height = $(".ad-table-view-cell", child).css('height');
                    if (tab.length > 0) {
                    
                        this.list.layer.style.cssText = tab[0].style.cssText;
                    //  this.flowView.layer.setAttribute('onClickEvent', tab[0].getAttribute('onClickEvent'));
                    }
                    
                    height = height.substring(0, height.length - 2);
                    var tHeight = height * cellNums.length;
                    
                    

                    var canvasheight = $("#area").css("height").replace("px", "");
                    var twentyMultiple = 10 - (tHeight / 90);
                    var hlHeight = tHeight - 300 - (20 * twentyMultiple) + 10;
                    $('.hosting-layer', this.list.layer).css('height', hlHeight);

                    this.list.reloadData();
                    $(".ad-table-view-cell", this.list.layer).css('background-color', bgcolor);
                    $(".ad-table-view-cell", this.list.layer).css('width', width);
                    $(".ad-table-view-cell", this.list.layer).css('height', height);
                    
                    this.list.layer.style.overflow = "hidden";
                    previewChildren[i].innerHTML = "";
                    previewChildren[i].appendChild(this.list.layer);
                    break;
                case 'map':
                    
                    mapElemId = previewChildren[i].id;
                    var kmlUrl = child.getAttribute('feedurl');
                    loadRSSFeeds(kmlUrl, "getMapsFeed",mapElemId);
                    
                    
                    break;
                default:
                    break;
                    
                    
                    
            }
        }
    }
    
    
}

function previewWidgets(){
    var toAdd = new Array();
    var count = 0;
    var previewCanvas = document.getElementById('previewCanvas');
    var previewChildren = document.getElementById('previewCanvas').getElementsByClassName('drsElement');
    var i;
    for (i = 0; i < previewChildren.length; i++) {
        var child = previewChildren[i]; //document.getElementById('previewCanvas').childNodes[i];
        var attr = child.getAttribute('data-content');
        if (attr == 'widget') {
            attr = child.getAttribute('widget_type');
            switch (attr) {
                case 'flow':
                    this.flowView = new ADFlowView();
                    this.flowView.dataSource = this;
                    this.flowView.delegate = this;
                    
                    // customize flow view
                    this.flowView.sidePadding = 170;
                    this.flowView.cellRotation = 1.3;
                    this.flowView.cellGap = 56.9;
                    this.flowView.dragMultiplier = 1.0;
                    this.flowView.sideZOffset = -200;
                    this.flowView.idName = child.getAttribute('id');
                    
                    
                    this.flowView.frontCellIndex = Math.round(numberOfCovers() / 2);
                    this.flowView.centerCamera();
                    var cellNums = child.getElementsByClassName('ad-flow-view-cell');
                    this.flowView.cellNum = cellNums.length;
                    this.flowView.reloadData();
                    var flowElem = child.getElementsByClassName('ad-flow-view');
                    if (flowElem.length > 0) {
                        this.flowView.layer.style.cssText = flowElem[0].style.cssText;
                        this.flowView.layer.setAttribute('onClickEvent', flowElem[0].getAttribute('onClickEvent'));
                    }
                    var flowCells = child.getElementsByClassName('ad-flow-view-cell');
                    var pflowCells = (this.flowView.layer).getElementsByClassName('ad-flow-view-cell');
                    var textCss = pflowCells[0].style.cssText;
                    var c;
                    for (c = 0; c < pflowCells.length; c++) {
                    
                        pflowCells[c].style.cssText = pflowCells[c].style.cssText + "width:" + flowCells[0].style.width + "; height:" + flowCells[0].style.height + ";";
                        
                    }
                    var childId = "#" + child.id;
                    var cellTop = $(".ad-flow-view-cell", $(childId)).css('top'); //$('ad-flow-view-cell',$(childId)).css('top');
                    var cellLeft = $(".ad-flow-view-cell", $(childId)).css('left');//$('ad-flow-view-cell',$(childId)).css('left');
                    $(".ad-flow-view-cell", this.flowView.layer).css('top', cellTop);
                    $(".ad-flow-view-cell", this.flowView.layer).css('left', cellLeft);
                    $(this.flowView.layer).css('-webkit-perspective', $(flowElem[0]).css('-webkit-perspective'));
                    $(this.flowView.layer).css('-webkit-perspective-origin', $(flowElem[0]).css('-webkit-perspective-origin'));
                    textCss = textCss + "width:300px; height:200px;";
                    previewChildren[i].innerHTML = "";
                    previewChildren[i].appendChild(this.flowView.layer);
                    
                    break;
                case 'carousel':
                    this.carousel = new ADCarouselView();
                    // set metrics
                    this.carousel.cellSize = new ADSize(310, 110);
                    this.carousel.cellPadding = 5;
                    // set delegate
                    this.carousel.delegate = this;
                    this.carousel.dataSource = this;
                    //
                    this.carousel.position = new ADPoint(15, 10);
                    // add to root view
                    //ADRootView.sharedRoot.addSubview(this.carousel);
                    //
                    this.carousel.reloadData();
                    this.carousel.layer.style.overflow = "hidden";
                    previewChildren[i].innerHTML = "";
                    previewChildren[i].appendChild(this.carousel.layer);
                    break;
                case 'rssNews':
                    this.list = new ADTableView();
                    // set up protocol implementations
                    this.list.delegate = this;
                    this.list.dataSource = this;
                    this.list.idName = child.getAttribute('id');
                    var cellNums = child.getElementsByClassName('ad-table-view-cell');
                    var tab = child.getElementsByClassName('ad-table-view');
                    this.list.cellNum = cellNums.length;
                    var bgcolor = $(".ad-table-view-cell", child).css('background-color');
                    var width = $(".ad-table-view-cell", child).css('width');
                    var height = $(".ad-table-view-cell", child).css('height');
                    if (tab.length > 0) {
                    
                        this.list.layer.style.cssText = tab[0].style.cssText;
                    //  this.flowView.layer.setAttribute('onClickEvent', tab[0].getAttribute('onClickEvent'));
                    }
                    //alert("count" + cellNums.count);
                    //	$(".ad-table-view-cell").css('background-color',"#197569");
                    //alert($(".ad-table-view-cell", child).css('background-color'));
                    
                    //alert(this.list.layer.innerHTML);
                    //var tHeight = $('.hosting-layer', child).css('height');
                    height = height.substring(0, height.length - 2);
                    var tHeight = height * cellNums.length;
                    
                    
                    //alert("tHeight: "+tHeight);
                    var canvasheight = $("#canvas").css("height").replace("px", "");
                    var twentyMultiple = 10 - (tHeight / 90);
                    var hlHeight = tHeight - 300 - (20 * twentyMultiple);
                    $('.hosting-layer', this.list.layer).css('height', hlHeight);
                    //alert($('.hosting-layer',this.list.layer).css('height'));
                    
                    
                    this.list.reloadData();
                    $(".ad-table-view-cell", this.list.layer).css('background-color', bgcolor);
                    $(".ad-table-view-cell", this.list.layer).css('width', width);
                    $(".ad-table-view-cell", this.list.layer).css('height', height);
                    
                    //alert($(".ad-table-view-cell", this.list.layer).css('background-color'));
                    this.list.layer.style.overflow = "hidden";
                    previewChildren[i].innerHTML = "";
                    previewChildren[i].appendChild(this.list.layer);
                    break;
                case 'map':                    
                    mapElemId = previewChildren[i].id;
                    var kmlUrl = child.getAttribute('feedurl');
                    //alert("GeoRss feed: " + kmlUrl);
                    loadRSSFeeds(kmlUrl, "getMapsFeed",mapElemId);
                    
                    /*var mapElem = document.createElement('div');
                 mapElem.className = "mapImage";
                 var latlng = new google.maps.LatLng(1.358701,103.839426);
                 var myOptions = {
                 zoom: 8,
                 center: latlng,
                 mapTypeId: google.maps.MapTypeId.ROADMAP
                 };
                 alert("id: "+previewChildren[i].id);
                 mapElemId = previewChildren[i].id;
                 previewChildren[i].innerHTML = "";
                 previewChildren[i].appendChild(mapElem);
                 $(mapElem).css('height',"100%");
                 $(mapElem).css('width',"100%");
                 
                 var kmlUrl = child.getAttribute('feedurl');
                 loadRSSFeeds(kmlUrl, "getMapsFeed");
                 /*var map = new google.maps.Map(mapElem,myOptions);
                 
                 $(".mapImage","#previewCanvas").css('overflow','visible ! important');
                 $(".mapImage","#previewCanvas").css('position','');
                 
                 //load KML layer if present
                 
                 var kmlUrl = child.getAttribute('feedurl');
                 loadRSSFeeds(kmlUrl, "getMapsFeed");
                 //var kml = new google.maps.KmlLayer("http://maps.google.com/maps/ms?vps=3&jsv=304d&ie=UTF8&msa=0&output=georss&msid=205524661475547411128.00048cbed2c9f2beffed8");
                 //var kml = new google.maps.KmlLayer("http://maps.google.com/maps/ms?ie=UTF8&hl=en&vps=1&jsv=304e&msa=0&output=georss&msid=203781446332312345828.000499247ed36c4982dd1");
                 //	feed://maps.google.com/maps/ms?ie=UTF8&hl=en&vps=1&jsv=304e&msa=0&output=georss&msid=203781446332312345828.000499247ed36c4982dd1
                 var kml = new google.maps.KmlLayer(kmlUrl);
                 kml.setMap(map);*/
                    break;
                default:
                    break;
                    
                    
                    
            }
        }
    }
    
    
}

function defaultWidgetProperty(){
    $(".property_flowView").css("display", "none");
    $(".property_carouselView").css("display", "none");
    $(".property_newsRSSView").css("display", "none");
    $('#cell_property').css('display', 'none');
    $(".property_mapView").css("display", "none");
}

function setWidgetProperty(newElement){

    defaultWidgetProperty();
    var attr = newElement.getAttribute('widget_type');
    switch (attr) {
        case 'carousel':
            $(".property_carouselView").css("display", "block");
            break;
        case 'flow':
            $(".property_flowView").css("display", "block");
            break;
        case 'rssNews':
            $(".property_newsRSSView").css("display", "block");
            break;
        case 'map':
            $(".property_mapView").css("display", "block");//property_mapView
            break;
        default:
            break;
            
    }
}

function flowWidgetProperty(){
    $(".property_flowView").css("display", "block");
    $(".property_carouselView").css("display", "none");
    $(".property_newsRSSView").css("display", "none");
}

function carouselWidgetProperty(){
    $(".property_flowView").css("display", "none");
    $(".property_carouselView").css("display", "block");
    $(".property_newsRSSView").css("display", "none");
}

function rssNewsWidgetProperty(){

    $(".property_flowView").css("display", "none");
    $(".property_carouselView").css("display", "none");
    $(".property_newsRSSView").css("display", "block");
    
}

function updateWidgetProperties(){


    // alert("inside deselect element");
}

function setActivateWidget(){

    //alert("inside setActivateWidget");
    
    if (event.target.checked) {
    
        activeObject.setAttribute('active', 'yes');
        actualActiveObjectClass = activeObject.className;
        actualActiveObjectId = activeObject.id;
        activeObject.className = "unselectable";
        actualSelected = false;
        
        
    }
    else {
        activeObject.setAttribute('active', 'no');
        var temp = document.getElementById(actualActiveObjectId);
        temp.className = actualActiveObjectClass;
    }
}

/*
 * Carousel View Insert and Delegate Functions
 * */
function insertCarousel(){

    this.carousel = new ADCarouselView();
    // set metrics
    this.carousel.cellSize = new ADSize(310, 110);
    this.carousel.cellPadding = 5;
    // set delegate
    this.carousel.delegate = this;
    this.carousel.dataSource = this;
    //
    this.carousel.position = new ADPoint(15, 10);
    // add to root view
    ADRootView.sharedRoot.addSubview(this.carousel);
    //
    this.carousel.layer.style.overflow = "hidden";
    this.carousel.reloadData();
    objCount_Wid++;
    objCount_Car++;
    var width = $("#canvas").css("width").replace("px", "");
    var height = $("#canvas").css("height").replace("px", "");
    var myDiv = insertObject('widget', this.carousel.layer, 'myCarouselView' + objCount_Car, width, height, 0, 0);
    myDiv.setAttribute('widget_type', 'carousel');
    myDiv.setAttribute('active', 'no');
    myDiv.setAttribute('deleted', 'no');
    dragresize.select(myDiv);
    utility_RemoveImageHandles(this.carousel.layer);
    myDiv.style.overflow = "hidden";
    freezeWidget();
}

function freezeWidget(){


    var children = document.getElementById('canvas').getElementsByTagName('div');
    var i;
    for (i = 0; i < children.length; i++) {
        var attr = children[i].getAttribute('data-content');
        switch (attr) {
            case 'widget':
                var flows = children[i].getElementsByClassName('ad-flow-view');
                for (var x = 0; x < flows.length; x++) {
                    var tmp = flows[x].innerHTML;
                    flows[x].innerHTML = tmp;
                }
                var cars = children[i].getElementsByClassName('ad-carousel-view');
                for (var x = 0; x < cars.length; x++) {
                    var tmp = cars[x].innerHTML;
                    cars[x].innerHTML = tmp;
                }
                var tabs = children[i].getElementsByClassName('ad-scroll-view');
                for (var x = 0; x < tabs.length; x++) {
                    var tmp = tabs[x].innerHTML;
                    tabs[x].innerHTML = tmp;
                }
                break;
            default:
                break;
                
        }
    }
}



/**
 Carousel Widget Delegate Functions
 */
labelForIndex = function(index){
    return 'Cell index #' + (index + 1);
};

/* ==================== Delegates ==================== */

carouselViewNumberOfCells = function(theCarouselView){
    return 12;
};

carouselViewCellForIndex = function(theCarouselView, index){
    var cell = document.createElement('li');
    cell.textContent = this.labelForIndex(index);
    return cell;
};

carouselViewWillSelectCellAtIndex = function(theCarouselView, index, isInstantaneous){
    console.log('will select ' + this.labelForIndex(index));
};

carouselViewDidSelectCellAtIndex = function(theCarouselView, index, wasInstantaneous){
    console.log('selected ' + this.labelForIndex(index));
};


function carouselCellNum(){

    if (event.keyCode == 13) {
        //alert("enter clicked!");
        var re = new RegExp("^[1-9]+[0-9]*$");
        var matched = re.exec(this.value);
        if (matched == null) {
            // alert("Enter a valid number of cells for the Carousel View");
        }
        else {
        
            //  alert(this.value);
        
        }
    }
}

/*
 * Flow View Widget Delegate, DataSaource and Insert Functions
 */
/* ==================== ADFlowViewDataSource Protocol ==================== */
var rssData;
var cellArray;
var rssNewsArray;
var curRSSId;
var imgArray = ['http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg'];
var modeChange = false;
function changeFlowMode(mode){
    if (mode == 'rss') {
        $("#property_flowView1").css("display", "block");
        $("#flowGridView_title_3").css("display", "none");
        // alert('rss');
        if (activeObject.getAttribute('mode') == 'rss') {
            return;
        }
        else {
            activeObject.setAttribute('mode', 'rss');
            modeChange = true;
            reloadNumberCellsFlow(activeObject.getAttribute('cellNum'));
            
        }
        
    }
    else 
        if (mode == 'local') {
            $("#property_flowView1").css("display", "none");
            $("#flowGridView_title_3").css("display", "block");
            // alert('local');
            if (activeObject.getAttribute('mode') == 'local') {
                return;
            }
            else {
                activeObject.setAttribute('mode', 'local');
                modeChange = true;
                reloadNumberCellsFlow(activeObject.getAttribute('cellNum'));
                $('#image_library_window').css('display', 'block');
                lockScreen2();
                getImageLibrary();//open image library window
            }
        }
    
}

function reloadNumberCellsTable(cellNum){


    var rssFeed = document.getElementById('property_newsRSSView1');
    
    rssNewsArray = new Array();
    
    for (var x = 0; x < cellNum; x++) {
    
        var newsItem = document.createElement('div');
        
        newsItem.className = "rssNewsItem";
        rssNewsArray.push(newsItem);
    }
    
    showProgressBar(5000);
    
    /*var t=setTimeout("getRSSFeeds",5000);*/
    
    //var t=setTimeout("getRSSFeeds",5000);
    
    //document.getElementById('property_flowView1').value = "http://api.flickr.com/services/feeds/photos_public.gne?id=40408627@N07&lang=en-us&format=rss_200";
    //loadRSSFeeds(activeObject.getAttribute('feedurl'), "getRSSFeeds");
    loadRSSFeeds(activeObject.getAttribute('feedurl'), "getRSSNewsFeeds");
    activeObject.setAttribute('cellNum', cellNum);
    
    //loadRSSFeeds('http://api.flickr.com/services/feeds/photos_public.gne?id=33629650@N00&lang=en-us&format=rss_200');
    this.list = new ADTableView();
    this.list.dataSource = this;
    this.list.delegate = this;
    
    // customize flow view
    this.list.sidePadding = 170;
    this.list.cellRotation = 1.3;
    this.list.cellGap = 56.9;
    this.list.dragMultiplier = 1.0;
    this.list.sideZOffset = -200;
    this.list.tag = objCount_Rss;
    this.list.idName = "sample";
    this.list.cellNum = cellNum;
    // load the data
    this.list.reloadData();
    this.list.layer.style.overflow = "hidden";
    var tableView = activeObject.getElementsByClassName('ad-table-view');
    this.list.layer.setAttribute('class', tableView[0].getAttribute('class'));
    
    var tableElem = activeObject.getElementsByClassName('ad-table-view');
    if (tableElem.length > 0) {
        this.list.layer.style.cssText = tableElem[0].style.cssText;
    }
    var rHeight = $('.ad-table-view-cell', tableElem[0]).css('height');
    rHeight = rHeight.substring(0, rHeight.length - 2);
    var tHeight = rHeight * cellNum;
    // $('.hosting-layer', this.list.layer).css('height', tHeight);
    var tableCells = activeObject.getElementsByClassName('ad-table-view-cell');
    var ptableCells = (this.list.layer).getElementsByClassName('ad-table-view-cell');
    var textCss = ptableCells[0].style.cssText;
    var c;
    for (c = 0; c < ptableCells.length; c++) {
    
        ptableCells[c].style.cssText = ptableCells[c].style.cssText + "width:" + tableCells[0].style.width + "; height:" + tableCells[0].style.height + ";background-color:" + tableCells[0].style.backgroundColor + ";";
        
    }
    
    var tTop = $('.titleClass', activeObject).css('padding-top');
    var tLeft = $('.titleClass', activeObject).css('padding-left');
    
    var dTop = $('.dateClass', activeObject).css('padding-top');
    var dLeft = $('.dateClass', activeObject).css('padding-left');
    
    var cTop = $('.contentClass', activeObject).css('padding-top');
    var cLeft = $('.contentClass', activeObject).css('padding-left');
    
    
    $('.titleClass', this.list.layer).css('padding-top', tTop);
    $('.titleClass', this.list.layer).css('padding-left', tLeft);
    $('.dateClass', this.list.layer).css('padding-top', dTop);
    $('.dateClass', this.list.layer).css('padding-left', dLeft);
    $('.contentClass', this.list.layer).css('padding-top', cTop);
    $('.contentClass', this.list.layer).css('padding-left', cLeft);
    
    activeObject.replaceChild(this.list.layer, tableElem[0]);
    activeObject.setAttribute('cellNum', cellNum);
    activeObject.setAttribute('tTop', tTop);
    activeObject.setAttribute('tLeft', tLeft);
    activeObject.setAttribute('dTop', dTop);
    activeObject.setAttribute('dLeft', dLeft);
    activeObject.setAttribute('cTop', cTop);
    activeObject.setAttribute('cLeft', cLeft);
}

/*
 * Flow View Widget Delegate, DataSaource and Insert Functions
 */
/* ==================== ADFlowViewDataSource Protocol ==================== */
var rssData;
var cellArray;
var rssNewsArray;
var curRSSId;
var imgArray = ['http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg', 'http://farm4.static.flickr.com/3394/3344170704_0fca2268af_o.jpg'];
var modeChange = false;
function changeFlowMode(mode){
    if (mode == 'rss') {
        $("#property_flowView1").css("display", "block");
        $("#flowGridView_title_3").css("display", "none");
        //alert('rss');
        if (activeObject.getAttribute('mode') == 'rss') {
            return;
        }
        else {
            activeObject.setAttribute('mode', 'rss');
            modeChange = true;
            reloadNumberCellsFlow(activeObject.getAttribute('cellNum'));
        }
    }
    else 
        if (mode == 'local') {
            $("#property_flowView1").css("display", "none");
            $("#flowGridView_title_3").css("display", "block");
            //alert('local');
            if (activeObject.getAttribute('mode') == 'local') {
                return;
            }
            else {
                activeObject.setAttribute('mode', 'local');
                modeChange = true;
                reloadNumberCellsFlow(activeObject.getAttribute('cellNum'));
                $('#image_library_window').css('display', 'block');
                lockScreen2();
                getImageLibrary();//open image library window
            }
        }
}

function reloadNumberCellsFlow(cellNum){
    if (activeObject.getAttribute('mode') == "local") {
        //var exampleCell = (activeObject.getElementsByClassName('ad-flow-view').childNodes[0]).cloneNode(true);
        var myFlowView = activeObject.getElementsByClassName('ad-flow-view');
        var cellWrappers = myFlowView[0].getElementsByClassName('ad-flow-view-cell-wrapper');
        if (modeChange) {
            //must empty cells
            modeChange = false;
            for (var i = 0; i < cellWrappers.length; i++) {
            
                cellWrappers[i].childNodes[0].childNodes[0].src = "";
            }
            
        }
        var len = cellWrappers.length;
        if (cellNum < cellWrappers.length) {
        
            for (var i = cellNum; i < len; i++) {
                cellWrappers = myFlowView[0].getElementsByClassName('ad-flow-view-cell-wrapper');
                myFlowView[0].childNodes[0].removeChild(cellWrappers[cellWrappers.length - 1]);
            }
        }
        else 
            if (cellNum > cellWrappers.length) {
                var sampleChild = cellWrappers[0].cloneNode(true);
                sampleChild.childNodes[0].childNodes[0].src = "";
                for (var j = cellWrappers.length; j <= cellNum; j++) {
                    myFlowView[0].childNodes[0].appendChild(sampleChild.cloneNode(true));
                }
            }
        return;
    }
    var rssFeed = document.getElementById('property_flowView1');
    cellArray = new Array();
    for (i = 0; i < cellNum; i++) {
        var cell = document.createElement('div');
        cellArray[i] = cell;
    }
    
    showProgressBar(5000);
    
    /*var t=setTimeout("getRSSFeeds",5000);*/
    
    //var t=setTimeout("getRSSFeeds",5000);
    
    //document.getElementById('property_flowView1').value = "http://api.flickr.com/services/feeds/photos_public.gne?id=40408627@N07&lang=en-us&format=rss_200";
    loadRSSFeeds(activeObject.getAttribute('feedurl'), "getRSSFeeds");
    activeObject.setAttribute('cellNum', cellNum);
    
    //loadRSSFeeds('http://api.flickr.com/services/feeds/photos_public.gne?id=33629650@N00&lang=en-us&format=rss_200');
    this.flowView = new ADFlowView();
    this.flowView.dataSource = this;
    this.flowView.delegate = this;
    
    // customize flow view
    this.flowView.sidePadding = 170;
    this.flowView.cellRotation = 1.3;
    this.flowView.cellGap = 56.9;
    this.flowView.dragMultiplier = 1.0;
    this.flowView.sideZOffset = -200;
    this.flowView.tag = objCount_Flo;
    this.flowView.idName = "sample";
    this.flowView.cellNum = cellNum;
    // load the data
    this.flowView.reloadData();
    this.flowView.frontCellIndex = Math.round(numberOfCovers() / 2);
    this.flowView.centerCamera();
    
    // add to our tree
    //ADRootView.sharedRoot.addSubview(this.flowView);
    
    // wire up keyboard events
    //window.addEventListener("keydown", this, false);
    //this.flowView.layer.style.overflow = "hidden";
    var flows = activeObject.getElementsByClassName('ad-flow-view');
    //	alert(this.flowView.layer.style.cssText);
    //	alert(this.flowView.layer.getAttribute('class'));
    this.flowView.layer.setAttribute('class', flows[0].getAttribute('class'));
    
    var flowElem = activeObject.getElementsByClassName('ad-flow-view');
    if (flowElem.length > 0) {
        this.flowView.layer.style.cssText = flowElem[0].style.cssText;
    }
    var flowCells = activeObject.getElementsByClassName('ad-flow-view-cell');
    var pflowCells = (this.flowView.layer).getElementsByClassName('ad-flow-view-cell');
    var textCss = pflowCells[0].style.cssText;
    var c;
    for (c = 0; c < pflowCells.length; c++) {
    
        pflowCells[c].style.cssText = pflowCells[c].style.cssText + "width:" + flowCells[0].style.width + "; height:" + flowCells[0].style.height + ";";
        
    }
    if (flowCells[0].style.border) {
        //alert("border!");
    }
    var persp = $(flowElem[0]).css('-webkit-perspective');
    //alert(persp);
    persp = $(flowElem[0]).css('-webkit-perspective-origin');
    
    //alert(persp);
    if (flowElem[0].style.webkitPerspective) {
        //alert("perspective!");
    }
    $(this.flowView.layer).css('-webkit-perspective', flowElem[0].style.webkitPerspective);
    var childId = "#" + activeObject.id;
    var cellTop = $(".ad-flow-view-cell", $(childId)).css('top'); //$('ad-flow-view-cell',$(childId)).css('top');
    var cellLeft = $(".ad-flow-view-cell", $(childId)).css('left');//$('ad-flow-view-cell',$(childId)).css('left');
    $(".ad-flow-view-cell", this.flowView.layer).css('top', cellTop);
    $(".ad-flow-view-cell", this.flowView.layer).css('left', cellLeft);
    //$(this.flowView.layer).css('-webkit-perspective-origin', flowElem[0].style.webkitPerspective);
    this.flowView.layer.setAttribute('data-pageid', "");
    this.flowView.layer.setAttribute('data-pageurl', "");
    this.flowView.layer.setAttribute('data-exlink', "");
    this.flowView.layer.setAttribute('data-transition', "slide");
    this.flowView.layer.setAttribute('onClickEvent', flows[0].getAttribute('onClickEvent'));
    activeObject.replaceChild(this.flowView.layer, flows[0]);
    activeObject.setAttribute('cellNum', cellNum);
    //activeObject.replaceChild(this.flowView.layer,flows[0]);
    //flowElem = this.flowView.layer;
    //activeObject.appendChild(this.flowView.layer);
}

function getTopZindex(elementId){

    var top = 0;
    var children = document.getElementById(elementId).childNodes;
    var topZIndex, zIndex;
    var i = 0;
    for (i = 0; i < children.length; i++) {
        if (children[i].style != undefined) {
            zIndex = parseInt(children[i].style.zIndex);
            if (topZIndex == undefined || zIndex >= topZIndex) {
                topZIndex = zIndex;
                //topElement = elements[i];
            }
        }
    }
    return topZIndex;
    
}





flowViewNumberOfCells = function(flowView){
    if (flowView.cellNum) {
        //alert("returning number of cells: "+flowView.cellNum);
        return flowView.cellNum;
    }
    else {
        return 8;
    }
    //return numberOfCovers() * numberOfRepetitions();
};

flowViewCellAtIndex = function(flowView, index){
    //alert(flowView.idName);
    if (flowView.idName == "sample") {
        //alert(cellArray[index].innerHTML);
        return cellArray[index];
    }
    else {
        var flowObject = document.getElementById(flowView.idName);
        var images = flowObject.getElementsByClassName('flowImage');
        var cell = document.createElement('div');
        cell.appendChild(document.createElement('img')).src = images[index].src;
        return cell;
    }
    /*var cell = document.createElement('div');
     cell.appendChild(document.createElement('img')).src = 'images/' + ((index % numberOfCovers()) + 1) + '.jpg';
     return cell;*/
};

/* ==================== ADFlowViewDelegate Protocol ==================== */

var displayImg;

flowViewDidSelectCellAtIndex = function(flowView, index){

    if ($("#previewWindow").css('display') == 'none') {
        return;
    }
    
    if (flowView.layer.getAttribute('onClickEvent') == '1') {
        displayImg = document.createElement('img');
        displayImg.className = "viewing";
        
        var canvas = document.getElementById("previewCanvas");
        if (canvas == undefined) {
            canvas = document.getElementById(currentPageId);
            var cssA = document.getElementById('cssAnim');
            if (cssA != undefined) {
                cssA.parentNode.removeChild(cssA);
            }
            
            var cssA1 = document.getElementById('cssAnim1');
            if (cssA1 != undefined) {
                cssA1.parentNode.removeChild(cssA1);
            }
            var idid = flowView.idName;
            //set overflows
            //alert(idid);
            var prevCanvas = document.getElementById(currentPageId);
            
            var flowViewObj;// = (document.getElementById('previewCanvas')).getElementById(idid);
            for (var i = 0; i < prevCanvas.childNodes.length; i++) {
                if (prevCanvas.childNodes[i].id == idid) {
                    flowViewObj = prevCanvas.childNodes[i];
                }
            }
            /*$(flowViewObj).css('overflow-x',"visible ! important");
             $(flowViewObj).css('overflow-y',"visible ! important");
             $(flowViewObj).css('overflow',"visible ! important");
             $('.ad-flow-view',flowViewObj).css('overflow-x',"visible ! important");
             $('.ad-flow-view',flowViewObj).css('overflow-y',"visible ! important");
             $('.ad-flow-view',flowViewObj).css('overflow',"visible");*/
            flowViewObj.style.overflow = "visible";
            flowViewObj.style.overflowX = "visible";
            flowViewObj.style.overflowY = "visible";
            
            var flowviewdiv = flowViewObj.getElementsByClassName('ad-flow-view');
            flowviewdiv[0].style.overflow = "visible";
            flowviewdiv[0].style.overflowX = "visible";
            flowviewdiv[0].style.overflowY = "visible";
            
            
            var height = $("#" + currentPageId).css('height');
            var width = $("#" + currentPageId).css('width');
            var top = $("#" + currentPageId).css('top');
            var left = $("#" + currentPageId).css('left');
            var position = $("#" + currentPageId).css('position');
            var imgH = $(flowView._cells[index].childNodes[0]).css('height');
            var imgW = $(flowView._cells[index].childNodes[0]).css('width');
            height = height.substring(0, height.length - 2);
            width = width.substring(0, width.length - 2);
            imgH = imgH.substring(0, imgH.length - 2);
            imgW = imgW.substring(0, imgW.length - 2);
            var scaleWidth = width / imgW;
            var scaleHeight = height / imgH;
            
            var zind = getTopZindex(currentPageId);
            //$("#previewCanvas").append(flowView._cells[index].childNodes[0].cloneNode(true));
            $(flowView._cells[index]).css('z-index', 20000);
            var cssAnimation = document.createElement('style');
            cssAnimation.id = "cssAnim";
            cssAnimation.type = 'text/css';
            var offset = $(flowView._cells[index].childNodes[0]).offset();
            //alert( "left: " + offset.left + ", top: " + offset.top );
            var poffset = $("#" + currentPageId).offset();
            //alert( "left: " + poffset.left + ", top: " + poffset.top );
            //alert("dims: "+height +" "+width+" "+position+" "+imgH+" "+imgW);
            
            //fidning centre tranlation cordinates
            var pXCenter = poffset.left + (width / 2);
            var pYCenter = poffset.top + (height / 2);
            var iXCenter = offset.left + (imgW / 2);
            var iYCenter = offset.top + (imgH / 2);
            var xcenter = pXCenter - iXCenter;
            var ycenter = pYCenter - iYCenter;
            //alert(xcenter + " "+ycenter);
            flowView._cells[index].childNodes[0].id = "tempImg";
            
            
            $(flowView._cells[index].childNodes[0]).css('top', offset.top + ycenter);
            $(flowView._cells[index].childNodes[0]).css('left', offset.left + xcenter);
            //alert('sheight: '+scaleHeight + " swidth: "+scaleWidth);
            //var rules = document.createTextNode('@-webkit-keyframes slider {'+'0% {opacity: 0;-webkit-transform:scale(1.0); }'+'10%{opacity:1;-webkit-transform:translate('+xcenter+'px,'+ycenter+'px);}'+'100% { opacity: 1;-webkit-transform:scale('+scaleWidth+','+scaleHeight+') translate('+xcenter+'px,'+ycenter+'px);}'+'}');
            var rules = document.createTextNode('@-webkit-keyframes scaler {' + '0% {opacity: 1;-webkit-transform:scale(1.0); }' + '100% { opacity: 1;-webkit-transform:scale(' + scaleWidth + ',' + scaleHeight + ');}' + '}');
            cssAnimation.appendChild(rules);
            document.getElementsByTagName("head")[0].appendChild(cssAnimation);
            
            
            var cssAnimation1 = document.createElement('style');
            cssAnimation1.id = "cssAnim1";
            cssAnimation1.type = 'text/css';
            var rules1 = document.createTextNode('@-webkit-keyframes mover {' + '0% {opacity: 1;-webkit-transform:translate(0px,0px); }' + '100% { opacity: 1;-webkit-transform:translate(' + xcenter + 'px,' + ycenter + 'px);}' + '}');
            cssAnimation1.appendChild(rules1);
            document.getElementsByTagName("head")[0].appendChild(cssAnimation1);
            //flowView._cells[index].childNodes[0].style.webkitAnimationName = "slider";
            //flowView._cells[index].childNodes[0].style.webkitAnimationDuration = "4s";
            //setTimeout("$('#area').append(displayImg);",1700);
            var yC = offset.top - poffset.top;
            var xC = offset.left - poffset.left;
            //alert("yc: "+yC+" xC: "+xC);
            $(displayImg).css('height', imgH);
            $(displayImg).css('width', imgW);
            $(displayImg).css('top', yC);
            $(displayImg).css('left', xC);
            $(displayImg).css('position', 'absolute');
            canvas.appendChild(displayImg);
            $("#tempImg").css('opacity', 0);
            displayImg.style.webkitAnimationName = "mover";
            displayImg.style.webkitAnimationDuration = "1s";
            
            $(displayImg).bind("webkitAnimationEnd", function(event){
                $(displayImg).css('top', yC + ycenter);
                $(displayImg).css('left', xC + xcenter);
                displayImg.style.webkitAnimationName = "scaler";
                displayImg.style.webkitAnimationDuration = "2s";
                $(displayImg).bind("webkitAnimationEnd", function(event){
                
                    $(displayImg).css('top', "0px");
                    $(displayImg).css('left', "0px");
                    $(displayImg).css('height', height);
                    $(displayImg).css('width', width);
                })
            });
            // var zind = getTopZindex("previewCanvas");
            //alert(zind);
            $(displayImg).css('z-index', zind + 2);
            displayImg.setAttribute('onclick', 'minimizeDisplay()');
            displayImg.id = flowView.idName + index;
            //alert(displayImg.id);
            displayImg.src = flowView._cells[index].childNodes[0].src;
            // flowView._cells[index].childNodes[0].style.display = "none";
            // flowView._cells[index].appendChild(displayImg);
            flowView._cells[index].setAttribute('viewing', 'yes');
        }
        else {
            var cssA = document.getElementById('cssAnim');
            if (cssA != undefined) {
                cssA.parentNode.removeChild(cssA);
            }
            
            var cssA1 = document.getElementById('cssAnim1');
            if (cssA1 != undefined) {
                cssA1.parentNode.removeChild(cssA1);
            }
            var idid = flowView.idName;
            //set overflows
            //alert(idid);
            var prevCanvas = document.getElementById('previewCanvas');
            
            var flowViewObj;// = (document.getElementById('previewCanvas')).getElementById(idid);
            for (var i = 0; i < prevCanvas.childNodes.length; i++) {
                if (prevCanvas.childNodes[i].id == idid + "x" || prevCanvas.childNodes[i].id == idid) {
                    flowViewObj = prevCanvas.childNodes[i];
                }
            }
            /*$(flowViewObj).css('overflow-x',"visible ! important");
             $(flowViewObj).css('overflow-y',"visible ! important");
             $(flowViewObj).css('overflow',"visible ! important");
             $('.ad-flow-view',flowViewObj).css('overflow-x',"visible ! important");
             $('.ad-flow-view',flowViewObj).css('overflow-y',"visible ! important");
             $('.ad-flow-view',flowViewObj).css('overflow',"visible");*/
            flowViewObj.style.overflow = "visible";
            flowViewObj.style.overflowX = "visible";
            flowViewObj.style.overflowY = "visible";
            
            var flowviewdiv = flowViewObj.getElementsByClassName('ad-flow-view');
            flowviewdiv[0].style.overflow = "visible";
            flowviewdiv[0].style.overflowX = "visible";
            flowviewdiv[0].style.overflowY = "visible";
            
            
            var height = $("#previewCanvas").css('height');
            var width = $("#previewCanvas").css('width');
            var top = $("#previewCanvas").css('top');
            var left = $("#previewCanvas").css('left');
            var position = $("#previewCanvas").css('position');
            var imgH = $(flowView._cells[index].childNodes[0]).css('height');
            var imgW = $(flowView._cells[index].childNodes[0]).css('width');
            height = height.substring(0, height.length - 2);
            width = width.substring(0, width.length - 2);
            imgH = imgH.substring(0, imgH.length - 2);
            imgW = imgW.substring(0, imgW.length - 2);
            var scaleWidth = width / imgW;
            var scaleHeight = height / imgH;
            
            var zind = getTopZindex("previewCanvas");
            //$("#previewCanvas").append(flowView._cells[index].childNodes[0].cloneNode(true));
            $(flowView._cells[index]).css('z-index', 20000);
            var cssAnimation = document.createElement('style');
            cssAnimation.id = "cssAnim";
            cssAnimation.type = 'text/css';
            var offset = $(flowView._cells[index].childNodes[0]).offset();
            //alert( "left: " + offset.left + ", top: " + offset.top );
            var poffset = $("#previewCanvas").offset();
            //alert( "left: " + poffset.left + ", top: " + poffset.top );
            //alert("dims: "+height +" "+width+" "+position+" "+imgH+" "+imgW);
            
            //fidning centre tranlation cordinates
            var pXCenter = poffset.left + (width / 2);
            var pYCenter = poffset.top + (height / 2);
            var iXCenter = offset.left + (imgW / 2);
            var iYCenter = offset.top + (imgH / 2);
            var xcenter = pXCenter - iXCenter;
            var ycenter = pYCenter - iYCenter;
            //alert(xcenter + " "+ycenter);
            flowView._cells[index].childNodes[0].id = "tempImg";
            
            
            $(flowView._cells[index].childNodes[0]).css('top', offset.top + ycenter);
            $(flowView._cells[index].childNodes[0]).css('left', offset.left + xcenter);
            //alert('sheight: '+scaleHeight + " swidth: "+scaleWidth);
            //var rules = document.createTextNode('@-webkit-keyframes slider {'+'0% {opacity: 0;-webkit-transform:scale(1.0); }'+'10%{opacity:1;-webkit-transform:translate('+xcenter+'px,'+ycenter+'px);}'+'100% { opacity: 1;-webkit-transform:scale('+scaleWidth+','+scaleHeight+') translate('+xcenter+'px,'+ycenter+'px);}'+'}');
            var rules = document.createTextNode('@-webkit-keyframes scaler {' + '0% {opacity: 1;-webkit-transform:scale(1.0); }' + '100% { opacity: 1;-webkit-transform:scale(' + scaleWidth + ',' + scaleHeight + ');}' + '}');
            cssAnimation.appendChild(rules);
            document.getElementsByTagName("head")[0].appendChild(cssAnimation);
            
            
            var cssAnimation1 = document.createElement('style');
            cssAnimation1.id = "cssAnim1";
            cssAnimation1.type = 'text/css';
            var rules1 = document.createTextNode('@-webkit-keyframes mover {' + '0% {opacity: 1;-webkit-transform:translate(0px,0px); }' + '100% { opacity: 1;-webkit-transform:translate(' + xcenter + 'px,' + ycenter + 'px);}' + '}');
            cssAnimation1.appendChild(rules1);
            document.getElementsByTagName("head")[0].appendChild(cssAnimation1);
            //flowView._cells[index].childNodes[0].style.webkitAnimationName = "slider";
            //flowView._cells[index].childNodes[0].style.webkitAnimationDuration = "4s";
            //setTimeout("$('#previewCanvas').append(displayImg);",1700);
            var yC = offset.top - poffset.top;
            var xC = offset.left - poffset.left;
            //alert("yc: "+yC+" xC: "+xC);
            $(displayImg).css('height', imgH);
            $(displayImg).css('width', imgW);
            $(displayImg).css('top', yC);
            $(displayImg).css('left', xC);
            $(displayImg).css('position', 'absolute');
            canvas.appendChild(displayImg);
            $("#tempImg").css('opacity', 0);
            displayImg.style.webkitAnimationName = "mover";
            displayImg.style.webkitAnimationDuration = "1s";
            
            $(displayImg).bind("webkitAnimationEnd", function(event){
                $(displayImg).css('top', yC + ycenter);
                $(displayImg).css('left', xC + xcenter);
                displayImg.style.webkitAnimationName = "scaler";
                displayImg.style.webkitAnimationDuration = "2s";
                $(displayImg).bind("webkitAnimationEnd", function(event){
                
                    $(displayImg).css('top', "0px");
                    $(displayImg).css('left', "0px");
                    $(displayImg).css('height', height);
                    $(displayImg).css('width', width);
                })
            });
            // var zind = getTopZindex("previewCanvas");
            //alert(zind);
            $(displayImg).css('z-index', zind + 2);
            displayImg.setAttribute('onclick', 'minimizeDisplay()');
            displayImg.id = flowView.idName + index;
            //alert(displayImg.id);
            displayImg.src = flowView._cells[index].childNodes[0].src;
            // flowView._cells[index].childNodes[0].style.display = "none";
            // flowView._cells[index].appendChild(displayImg);
            flowView._cells[index].setAttribute('viewing', 'yes');
            
            
        }
        //flowView._cells[index].childNodes[0].height=480;
        //flowView._cells[index].childNodes[0].width=320;
        //alert("clicked me1!");	
    }
    //  console.log('flowViewDidSelectCellAtIndex ' + index);
};

function minimizeDisplay(){

    var parentid = event.target.parentElement.id;
    var tmpElem = document.getElementById("tempImg");
    tmpElem.style.opacity = 1;
    tmpElem.id = "";
    //alert(parentid);
    document.getElementById(parentid).removeChild(event.target);
    
    //alert("hello again");

}

flowViewDidBeginInteraction = function(flowView){
    //  console.log('flowViewDidBeginInteraction');
};

flowViewDidEndInteraction = function(flowView){
    //    console.log('flowViewDidEndInteraction');
};


getImageUrlForIndex = function(index){

    if ((rssData.readyState === 4) || (rssData.readyState === "complete")) {
    
    
    
        feeds = rssData.responseXML.getElementsByTagName("rss")[0]; // Specifying the root element
        // incrementing variable x by two, were "two" is the number <title> element's inside the feeds.
        
        var url = feeds.getElementsByTagName("item")[index].childNodes[15].attributes[0].nodeValue;
        // alert("URL: " + url);
        return url;
        
        
        
    }
    
    
    
    
};

getRSSFeedsAgain = function(){


    // div = ((document.getElementById) ? document.getElementById("content") : document.all.content);
    
    
    
    feeds = rssData.getElementsByTagName("rss")[0]; // Specifying the root element
    if (feeds == null) {
        alert('RSS data not found. Please check the RSS feed Url requested and try again.');
        return;
    }
    var cells = activeObject.getElementsByClassName('ad-flow-view-cell');
    //tnodes = ""; // Will be used to display our feeds
    for (var x = 0; x < cells.length; x++) { // incrementing variable x by two, were "two" is the number <title> element's inside the feeds.
        // var url = feeds.getElementsByTagName("item")[x].childNodes[15].attributes[0].nodeValue;
        //alert("URL: "+url);
        var link;
        var url = feeds.getElementsByTagName("item")[x];
        for (var i = 0; i < url.childNodes.length; i++) {
            if (url.childNodes[i].nodeName == 'media:content') {
                var contentNode = url.childNodes[i];
                link = contentNode.getAttribute('url');
            }
            
        }
        //var media = feeds.getElementsByTagName("media");
        //[x].getAttribute('url');  //feeds.getElementsByTagName("item")[x].childNodes[15].attributes[0].nodeValue;
        cellArray[x].appendChild(document.createElement('img')).src = link;
        
        //tnodes += "<h2>" + feeds.getElementsByTagName("title")[x].childNodes[0].nodeValue + "</h2>\n"; // Getting all the titles in the feeds, using the getElementsByTagName method.
        // tnodes += "<div>" + feeds.getElementsByTagName("description")[x].childNodes[0].nodeValue + "<br />\n"; // Now grabs the content for each title's
        //tnodes += String("Visit the link for title" + (x + 1)).link(feeds.getElementsByTagName("link")[x].childNodes[0].nodeValue); // Sends out the links available on this feeds.
        //tnodes += "</div>\n";
    }
    //div.innerHTML = tnodes;
    // displays everything from the feeds
    reloadImages();
};


var infoClose;


getMapsFeed = function(mapId){

	markerArray = new Array();
    feeds = rssData.getElementsByTagName("rss")[0]; // Specifying the root element
    if (feeds == null) {
        alert('RSS data not found. Please check the RSS feed Url requested and try again.');
        return;
    }
    
    var items = feeds.getElementsByTagName('item');
    
    var widgetElem;
    var previewCanvas = document.getElementById('previewCanvas');
    if(previewCanvas == null){
		previewCanvas = document.getElementById(currentPageId);
	}
    for (var i = 0; i < previewCanvas.childNodes.length; i++) {
        if (previewCanvas.childNodes[i].id == mapId || previewCanvas.childNodes[i].id == mapId + "x") {
            widgetElem = previewCanvas.childNodes[i];
            mapId = previewCanvas.childNodes[i].id;
            break;
        }
    }
    var mapElem = document.createElement('div');
    mapElem.className = "mapImage";
    var latlng = new google.maps.LatLng(1.358701, 103.839426);
    var myOptions = {
        zoom: 3,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl:false,
		streetViewControl:false,
		zoomControl:false
    };
	
	
    widgetElem.innerHTML = "";
    widgetElem.appendChild(mapElem);
    $(mapElem).css('height', "100%");
    $(mapElem).css('width', "100%");
    $(widgetElem).css('overflow','hidden');
    var map = new google.maps.Map(mapElem, myOptions);
    
    $(".mapImage", "#previewCanvas").css('overflow', 'visible ! important');
    $(".mapImage", "#previewCanvas").css('position', '');
    var updatedLatLngStr = false;
    for (var k = 0; k < items.length; k++) {
	
		var latlngStr, description;
		for (var j = 0; j < items[k].childNodes.length; j++) {
			if (items[k].childNodes[j].nodeName == "georss:point") {
				updatedLatLngStr = true;
				latlngStr = items[k].childNodes[j].childNodes[0].nodeValue;
			}
			if (items[k].childNodes[j].nodeName == "description") {
				description = items[k].childNodes[j].childNodes[0].nodeValue;
			}
		}
		
		if(updatedLatLngStr){
			
		updatedLatLngStr=false;
		var reg = new RegExp("[0-9|.]+");
		var matched = reg.exec(latlngStr);
		
		var space = latlngStr.indexOf(' ', matched.index);
		
		var lat = latlngStr.substring(7, space);
		latlngStr = latlngStr.substring(space, latlngStr.length);
		matched = reg.exec(latlngStr);
		var lng = matched[0];
		var image = root+'/images/pin.png';
		var marklatlng = new google.maps.LatLng(lat, lng);
		marker = new google.maps.Marker({
			position: marklatlng,
			title: items[k].getElementsByTagName('title')[0].childNodes[0].nodeValue,
			map: map,
			icon: image,
			draggable: false,
			clickable: true
		});
		marker.description = description;
		marker.infoOpen=false;
		marker.mId = k;
		map.setCenter(marklatlng);
		google.maps.event.addListener(marker, 'click', function(){
			
			if(this.infoOpen==true){
				$("#overlay"+mapId).remove();
				this.infoOpen=false;
				
				var mMap = this.getMap();
				var mArr = mMap.markerArray;
				for(var j=0;j<mArr.length;j++)
				{
					mArr[j].infoOpen=false;
				}
				
				return;
			}
			
			
			var mMap = this.getMap();
			var mArr = mMap.markerArray;
			for(var j=0;j<mArr.length;j++)
				{
					mArr[j].infoOpen=false;
				}
				
			this.infoOpen=true;
			
			var pos = this.getPosition();
			var contentString = this.title;
			
			var myWindow = document.getElementById('overlay'+mapId);
			if (myWindow == null) {
				myWindow = document.createElement('div');
				
				
				
			}
			
			var titleText = document.createElement('div');
			titleText.id = "infoTitle"+mapId;
			titleText.className = "infoTitle";
			titleText.innerText = this.title;
			$("#infoTitle"+mapId).remove();
			myWindow.appendChild(titleText);
			/*closeicon = document.createElement('img');
			closeicon.src = root + "images/cross.png";
			closeicon.id = "closeIcon";*/
			
			moreicon = document.createElement('img');
			moreicon.src = root + "images/arrow3.png";
			moreicon.className = "nextIcon";
			moreicon.id = "nextIcon"+mapId;
			infoClose = true;
			/*$(closeicon).click(function(){
				$("#overlay").remove();
			});*/
			
			
			var infoWindow = document.createElement('div');
			$(infoWindow).css('height', $(widgetElem).css('height'));
			$(infoWindow).css('width', $(widgetElem).css('width'));
			infoWindow.className = "detailWindow";
			infoWindow.id = "detailWindow"+mapId;
		//scrollView
		this.scrollView = new ADScrollView();
        // set up the viewable size, overflowing content is clipped by default
		var posX = $("#descText").css('left');
		var posY = $("#descText").css('top');
        this.scrollView.position = new ADPoint(posX, posY);
       // this.scrollView.size = new ADSize(width, height);
        // set up the complete size for the content of the scrollView
        // let's prevent vertical scrolling
        this.scrollView.verticalScrollEnabled = true;
		this.scrollView.horizontalScrollEnabled = false;
        // let's not show the scroll indicator
        this.scrollView.showsHorizontalScrollIndicator = false;
		this.scrollView.showsVerticaScrollIndicator = true;
        // turn on paging, this is the critical bit so that scrolling the contents
        // will snap to the nearest "page", where each of our page is the same size
        // as the viewable size set with .size
        //this.scrollView.pagingEnabled = true;
        // hook up the delegate to be our controller object, which allows us to
        // implement the ScrollViewDelegate protocol methods and get notifications
        // when we have scrolled to a new page
        this.scrollView.delegate = this;
        // build the contents of the scrollView
        //updateView();
        // and highlight the first item in our list
        //this.highlightItemAtIndex(0);
			
			//alert(this.scrollView.layer);
			 var container = this.scrollView.hostingLayer;
          container.appendChild(document.createElement('div')).innerHTML = this.description;
        
			var descText = document.createElement('div');
			//descText.innerHTML = this.description;
			descText.id = "descText"+mapId;
			descText.className = "descText";
			descText.appendChild(this.scrollView.layer);
			
			infoWindow.appendChild(descText);
			
			$(moreicon).click(function(){
			
				if (infoClose) {
					infoClose = false;
					this.src = root + "images/arrow4.png";
					
					$(infoWindow).css('position', 'absolute');
					$(infoWindow).css('top', $(myWindow).css('height'));
					$("#detailWindow"+mapId).remove();
					myWindow.appendChild(infoWindow);
					var cssAnimation1 = document.createElement('style');
					cssAnimation1.id = "cssAnim1";
					cssAnimation1.type = 'text/css';
					var widHeight = widgetElem.style.height;
					var widWidth = widgetElem.style.width;
					widHeight = widHeight.substring(0, widHeight.length - 2);
					var ycenter = 0.6 * widHeight;
					//ycenter=ycenter-50;
					var rules1 = document.createTextNode('@-webkit-keyframes mover {' + '0% {-webkit-transform:translate(0px,0px); }' + '100% { -webkit-transform:translate(0px,-' + ycenter + 'px);}' + '}');
					cssAnimation1.appendChild(rules1);
					$("#cssAnim1").remove();
					document.getElementsByTagName("head")[0].appendChild(cssAnimation1);
					$("#detailWindow"+mapId).css('display','block');
					myWindow.style.webkitAnimationName = "mover";
					myWindow.style.webkitAnimationDuration = "1s";
					
					//ycenter = widHeight - ycenter;
					$(myWindow).bind("webkitAnimationEnd", function(event){
						$("#overlay"+mapId).css('bottom', 0.6*widHeight);
						$(myWindow).css('left', '0px');
						$("#detailWindow"+mapId).css('display','block');
					});
					
				}
				else {
					infoClose = true;
					this.src = root + "images/arrow3.png";
					var cssAnimation1 = document.createElement('style');
					cssAnimation1.id = "cssAnim2";
					cssAnimation1.type = 'text/css';
					var widHeight = widgetElem.style.height;
					var widWidth = widgetElem.style.width;
					widHeight = widHeight.substring(0, widHeight.length - 2);
					var ycenter = 0.6 * widHeight;
					var rules1 = document.createTextNode('@-webkit-keyframes moverBack {' + '0% {-webkit-transform:translate(0px,0px); }' + '100% { -webkit-transform:translate(0px,' + ycenter + 'px);}' + '}');
					cssAnimation1.appendChild(rules1);
				    $("#cssAnim2").remove();
					document.getElementsByTagName("head")[0].appendChild(cssAnimation1);
					myWindow.style.webkitAnimationName = "moverBack";
					myWindow.style.webkitAnimationDuration = "1s";
					
					
					
					//ycenter = widHeight - ycenter;
					$(myWindow).bind("webkitAnimationEnd", function(event){
						$("#overlay"+mapId).css('bottom', '0');
						$(myWindow).css('left', '0px');
						$("#detailWindow"+mapId).css('display','none');
						//$("#detailWindow").remove();
					});
				}
				
				
				
				
				
				
			});
			//$("#closeIcon").remove();
			$("#nextIcon"+mapId).remove();
			//myWindow.appendChild(closeicon);
			myWindow.appendChild(moreicon);
			myWindow.className = "overlay";
			myWindow.id = "overlay"+mapId;
			
			
			widgetElem.appendChild(myWindow);
			
		/*	var cssAnimation3 = document.createElement('style');
					cssAnimation3.id = "cssAnim3";
					cssAnimation3.type = 'text/css';
					var widHeight = widgetElem.style.height;
					var widWidth = widgetElem.style.width;
					widHeight = widHeight.substring(0, widHeight.length - 2);
					var ycenter = 0.1 * widHeight;
					var rules3 = document.createTextNode('@-webkit-keyframes moverInit {' + '0% {opacity: 1;-webkit-transform:translate(0px,0px); }' + '100% { opacity: 1;-webkit-transform:translate(0px,' + ycenter + 'px);}' + '}');
					cssAnimation3.appendChild(rules3);
				    $("#cssAnim3").remove();
					document.getElementsByTagName("head")[0].appendChild(cssAnimation3);
					myWindow.style.webkitAnimationName = "moverInit";
					myWindow.style.webkitAnimationDuration = "2s";
					
					
					
					//ycenter = widHeight - ycenter;
					$(myWindow).bind("webkitAnimationEnd", function(event){
						$("#overlay").css('top', '90%');
						$(myWindow).css('left', '0px');
						//$("#detailWindow").remove();
					});*/
			
		});
	}
	
	markerArray.push(marker);
        
    }
	map.markerArray = markerArray;
    
};

updateView = function () {
        var container = this.scrollView.hostingLayer;
        for (var i = 0; i < 3; i++) {
          container.appendChild(document.createElement('div')).innerText = (i + 1);
        }
      };
getRSSFeeds = function(){


    // div = ((document.getElementById) ? document.getElementById("content") : document.all.content);
    
    //alert(rssData);
    
    feeds = rssData.getElementsByTagName("rss")[0]; // Specifying the root element
    if (feeds == null) {
        alert('RSS data not found. Please check the RSS feed Url requested and try again.');
        return;
    }
    //tnodes = ""; // Will be used to display our feeds
    
    for (var x = 0; x < cellArray.length; x++) { // incrementing variable x by two, were "two" is the number <title> element's inside the feeds.
        var url = feeds.getElementsByTagName("item")[x] //feeds.getElementsByTagName("media:content")[x].getAttribute('url');  //feeds.getElementsByTagName("item")[x].childNodes[15].attributes[0].nodeValue;
        var link;
        for (var i = 0; i < url.childNodes.length; i++) {
            if (url.childNodes[i].nodeName == 'media:content') {
                var contentNode = url.childNodes[i];
                link = contentNode.getAttribute('url');
            }
            
        }
        //alert("URL: "+url);
        cellArray[x].innerHTML = "";
        var imgObj = document.createElement('img');
        imgObj.src = link;
        imgObj.className = "flowImage";
        cellArray[x].appendChild(imgObj);
        
        //tnodes += "<h2>" + feeds.getElementsByTagName("title")[x].childNodes[0].nodeValue + "</h2>\n"; // Getting all the titles in the feeds, using the getElementsByTagName method.
        // tnodes += "<div>" + feeds.getElementsByTagName("description")[x].childNodes[0].nodeValue + "<br />\n"; // Now grabs the content for each title's
        //tnodes += String("Visit the link for title" + (x + 1)).link(feeds.getElementsByTagName("link")[x].childNodes[0].nodeValue); // Sends out the links available on this feeds.
        //tnodes += "</div>\n";
    }
    //div.innerHTML = tnodes;
    // displays everything from the feeds
    freezeWidget();
    //this.flowView.reloadData();
};

/*loadRSSFeeds = function(url, functionName){
 
 server_url = "builder/get_rss";
 loadRSSFeeds = function(url){
 
 rssData = null;
 if (window.XMLHttpRequest) { // Creates XMLHttpRequest object for IE7+, OP, ff etc.
 rssData = new XMLHttpRequest();
 }
 else
 if (window.ActiveXObject) {
 try { // Works well in IE Browser's
 rssData = new ActiveXObject("Microsoft.XMLHTTP");
 }
 catch (e) {
 rssData = new ActiveXObject("Msxml2.XMLHTTP");
 }
 }
 if (rssData !== null) { // Initiating function reference ( getRSSFeeds )
 rssData.onreadystatechange = getRSSFeeds;
 rssData.open("GET", url, true);
 // sending out request
 rssData.send(null);
 }
 else {
 alert("\nYour browser does not support AJAX Request!");
 }
 };*/
loadRSSFeeds = function(url, functionName,mapId){



    server_url = root + "builder/get_rss";
    
    
    
    
    var obj = {
        'url': url
    };
    
    
    var post_data = jQuery.param(obj, true);
    
    
    
    rssData = null;
    
    
    
    $.ajax({
        type: "POST",
        url: server_url,
        data: post_data,
        datatype: "xml",
        async: true,
        
        success: function(data, status, request){
        
        
            rssData = data;
            
            rssData = data;
			
			if (functionName == "getMapsFeed") {
				window[functionName](mapId);
			
			}
			else {
			
				window[functionName]();
			}
        },
        
        error: function(){
            alert("Error");
            document.getElementById('property_flowView1').value = tmpURL;
            activeObject.setAttribute('feedurl', tmpURL);
            
        }
        
    });
    
};


getImageLibrary = function(){



    server_url = "builder/get_library_images";
    $.ajax({
        type: "POST",
        url: server_url,
        async: true,
        success: function(data, status, request){
        
            // alert("success: " + data);
        
        },
        
        error: function(){
            alert("Error");
            
        }
        
    });
    
};




numberOfRepetitions = function(){
    return 1;
}

numberOfCovers = function(){
    return 8;
}
/** Insert Flow Widget Function*/


function insertFlow(){
    $('input:radio[name=group_widget]').filter("[value=widget_RSS]").attr("checked", "true");
    objCount_Flo++;
    var rssFeed = document.getElementById('property_flowView1');
    rssFeed.readOnly = false;
    cellArray = new Array();
    for (i = 0; i < 8; i++) {
        var cell = document.createElement('div');
        cellArray[i] = cell;
    }
    
    showProgressBar(5000);
    
    /*var t=setTimeout("getRSSFeeds",5000);*/
    
    //var t=setTimeout("getRSSFeeds",5000);
    
    document.getElementById('property_flowView1').value = "http://api.flickr.com/services/feeds/photos_public.gne?id=40408627@N07&lang=en-us&format=rss_200";
    loadRSSFeeds('http://api.flickr.com/services/feeds/photos_public.gne?id=40408627@N07&lang=en-us&format=rss_200', "getRSSFeeds");
    
    
    //loadRSSFeeds('http://api.flickr.com/services/feeds/photos_public.gne?id=33629650@N00&lang=en-us&format=rss_200');
    this.flowView = new ADFlowView();
    this.flowView.dataSource = this;
    this.flowView.delegate = this;
    
    // customize flow view
    this.flowView.sidePadding = 170;
    this.flowView.cellRotation = 1.3;
    this.flowView.cellGap = 56.9;
    this.flowView.dragMultiplier = 1.0;
    this.flowView.sideZOffset = -200;
    this.flowView.tag = objCount_Flo;
    this.flowView.idName = "sample";
    this.flowView.cellNum = 8;
    // load the data
    this.flowView.reloadData();
    this.flowView.frontCellIndex = Math.round(numberOfCovers() / 2);
    this.flowView.centerCamera();
    this.flowView.layer.setAttribute('onClickEvent', '1');
    // add to our tree
    //ADRootView.sharedRoot.addSubview(this.flowView);
    
    // wire up keyboard events
    //window.addEventListener("keydown", this, false);
    //this.flowView.layer.style.overflow = "hidden";
    objCount_Wid++;
    var width = $("#canvas").css("width").replace("px", "");
    var height = $("#canvas").css("height").replace("px", "");
    var myDiv = insertObject('widget', this.flowView.layer, 'myFlowView' + objCount_Flo, width, 220, 0, 0);
    myDiv.setAttribute('feedURL', document.getElementById('property_flowView1').value);
    myDiv.setAttribute('active', "no");
    myDiv.setAttribute('deleted', 'no');
    myDiv.setAttribute('widget_type', 'flow');
    myDiv.setAttribute('cellNum', 8);
    myDiv.setAttribute('mode', 'rss');
    //myDiv.style.overflow = 'hidden';
    myDiv.firstChild.style.opacity = 1.0;
    dragresize.select(myDiv);
    
    
    
    
}

function backFromGeo(arr, res, stat){

   // alert("inside back");
}

function insertGmaps(){

    var mapElem = document.createElement('img');
    mapElem.src = "../images/mapsDefault.png";
    mapElem.className = "mapImage";
    $(mapElem).css('height', "100%");
    $(mapElem).css('width', "100%");
    /*var latlng = new google.maps.LatLng(1.358701,103.839426);
     var myOptions = {
     zoom: 8,
     center: latlng,
     mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     var map = new google.maps.Map(mapElem,myOptions);*/
    var width = $("#canvas").css("width").replace("px", "");
    var height = $("#canvas").css("height").replace("px", "");
    var myDiv = insertObject('widget', mapElem, 'myMapView' + objCount_Flo, 320, 480, 0, 0);
    
    
    myDiv.setAttribute('widget_type', 'map');
    myDiv.setAttribute('feedurl', "http://maps.google.com/maps/ms?ie=UTF8&hl=en&msa=0&output=georss&msid=203781446332312345828.00049926c7c002f949021");
    document.getElementById('property_mapView1').value = "http://maps.google.com/maps/ms?ie=UTF8&hl=en&msa=0&output=georss&msid=203781446332312345828.00049926c7c002f949021";
}

function loadAndUpdateFlow(){
    cellArray = new Array();
    var image_library = document.getElementById('image_library_window_container');
    //var image_library = document.getElementsById('image_library_window_container');
    var listCells = image_library.getElementsByClassName('image_library_window_image_container');
    for (var i = 0; i < listCells.length; i++) {
        var list = listCells[i];
        if ($("input", list).attr('checked')) {
            var elem = document.createElement('div');
            var imgObj = document.createElement('img');
            imgObj.src = $('img', list).attr('src');
            imgObj.className = "flowImage";
            elem.appendChild(imgObj);
            cellArray.push(elem);
        }
    }
    activeObject.setAttribute('mode', 'local');
    reloadImages();
}

function flowReload(){
    var activeObjectId = activeObject.id;
    var activeElement = document.getElementById(activeObjectId);
    
    if (event.keyCode == 13) {
        //alert("old feed:"+activeElement.getAttribute('feedurl'));
        tmpURL = activeElement.getAttribute('feedurl');
        var url = document.getElementById('property_flowView1').value;
        url = url.replace(/^(feed)/g, "http");
        $("#property_flowView1").val(url);
        activeElement.setAttribute('feedurl', url);
        
        //alert("new feed:"+activeObject.getAttribute('feedurl'));
        cellArray = new Array();
        var cells = activeObject.getElementsByClassName('ad-flow-view-cell');
        for (i = 0; i < cells.length; i++) {
            var cell = document.createElement('div');
            cellArray[i] = cell;
        }
        
        
        loadRSSFeeds(url, "getRSSFeedsAgain");
        showProgressBar(2500);
        //var t = setTimeout("getRSSFeeds", 2000);
        //var u = setTimeout("reloadImages()", 2000);
    }
    else {
        return;
    }
    
}

function reloadImages(){

    var obj = document.getElementById(activeObject.id);
    var imgNodes = obj.children[0].children[0].childNodes;
    if (cellArray.length < imgNodes.length) {
        // alert("Warning: The number of cells in the coverflow are not equal to the number of selected images.")
    }
    for (i = 0; i < imgNodes.length; i++) {
        if (cellArray.length > i) {
            var src = cellArray[i].children[0].src;
            imgNodes[i].children[0].children[0].src = src;
        }
        else {
            imgNodes[i].children[0].children[0].src = "";
        }
        
    }
    
    //	activeObject.setAttribute('cellNum',cellArray.length);


}


/*
 * RSS Story Widget
 */
function rssNewsReload(){

    //alert("The MobDis RSS News widget is under development and will be available soon. :)");
    //return;
    
    var activeObjectId = activeObject.id;
    if (event.keyCode == 13) {
        var url = document.getElementById('property_newsRSSView1').value;
        url = url.replace(/^(feed)/g, "http");
        
        $("#property_newsRSSView1").val(url);
        
        activeObject.setAttribute('feedurl', url);
        //var t = setTimeout("getRSSNewsFeeds", 3000);
        rssNewsArray = new Array();
        var cellNum = activeObject.getAttribute('cellNum');
        for (var x = 0; x < cellNum; x++) {
        
            var newsItem = document.createElement('div');
            newsItem.className = "rssNewsItem";
            rssNewsArray.push(newsItem);
        }
        
        //loadRSSFeeds('http://api.flickr.com/services/feeds/photos_public.gne?id=7393085@N08&lang=en-us&format=rss_200');
        var tTop = $('.titleClass', activeObject).css('padding-top');
        var tLeft = $('.titleClass', activeObject).css('padding-left');
        
        var dTop = $('.dateClass', activeObject).css('padding-top');
        var dLeft = $('.dateClass', activeObject).css('padding-left');
        
        var cTop = $('.contentClass', activeObject).css('padding-top');
        var cLeft = $('.contentClass', activeObject).css('padding-left');
        
        activeObject.setAttribute('cellNum', cellNum);
        activeObject.setAttribute('tTop', tTop);
        activeObject.setAttribute('tLeft', tLeft);
        activeObject.setAttribute('dTop', dTop);
        activeObject.setAttribute('dLeft', dLeft);
        activeObject.setAttribute('cTop', cTop);
        activeObject.setAttribute('cLeft', cLeft);
        
        
        loadRSSFeeds(url, "getRSSNewsFeedsAgain");
        
        showProgressBar(5500);
        //var t = setTimeout("getRSSNewsFeeds", 2000);
        //var u = setTimeout("reloadRSSNews()", 5000);
    }
    else {
        return;
    }
}

function toggleActivateWidget(){


}

getRSSNewsFeeds = function(){





    // div = ((document.getElementById) ? document.getElementById("content") : document.all.content);
    
    
    
    feeds = rssData.getElementsByTagName("rss")[0]; // Specifying the root element
    // div = ((document.getElementById) ? document.getElementById("content") : document.all.content);
    feeds = rssData.getElementsByTagName("rss")[0]; // Specifying the root element
    if (feeds == null) {
        alert('RSS News data not found. Please check the RSS feed Url requested and try again.');
        return;
    }
    
    
    var itemDIV = document.createElement('div');
    
    
    var titleDIV = document.createElement('div');
    
    
    var dateDIV = document.createElement('div');
    
    
    var contentDIV = document.createElement('div');
    
    var actual_item;
    
    
    
    //tnodes = ""; // Will be used to display our feeds
    for (var x = 0; x < rssNewsArray.length; x++) { // incrementing variable x by two, were "two" is the number <title> element's inside the feeds.
        actual_item = feeds.getElementsByTagName("item")[x];
        if (actual_item == null) {
            titleDIV.innerText = "Title";
            titleDIV.className = "titleClass";
            $(titleDIV).css('font-family', "helvetica");
            $(titleDIV).css('font-size', '15px');
            $(titleDIV).css('color', "#000000");
            rssNewsArray[x].appendChild(titleDIV.cloneNode(true));
            
            contentDIV.innerHTML = "Content Unavailable";
            contentDIV.className = "contentClass";
            $(contentDIV).css('color', "#2E2E2E");
            $(contentDIV).css('font-family', "helvetica");
            $(contentDIV).css('font-size', '13px');
            rssNewsArray[x].appendChild(contentDIV.cloneNode(true));
            
            dateDIV.innerText = "Content Unavailable";
            dateDIV.className = "dateClass";
            rssNewsArray[x].appendChild(dateDIV.cloneNode(true));
            
            rssNewsArray[x].setAttribute('url', "www.google.com");
            
        }
        else {
        
            for (var y = 0; y < actual_item.childNodes.length; y++) {
            
                if (actual_item.childNodes[y].nodeName == "title") {
                
                    titleDIV.innerText = actual_item.childNodes[y].childNodes[0].nodeValue;
                    titleDIV.className = "titleClass";
                    $(titleDIV).css('font-family', "helvetica");
                    $(titleDIV).css('font-size', '15px');
                    $(titleDIV).css('color', "#000000");
                    rssNewsArray[x].appendChild(titleDIV.cloneNode(true));
                }
                
                if (actual_item.childNodes[y].nodeName == "description") {
                
                    contentDIV.innerHTML = actual_item.childNodes[y].childNodes[0].nodeValue;
                    contentDIV.className = "contentClass";
                    $(contentDIV).css('color', "#2E2E2E");
                    $(contentDIV).css('font-family', "helvetica");
                    $(contentDIV).css('font-size', '13px');
                    rssNewsArray[x].appendChild(contentDIV.cloneNode(true));
                    
                }
                
                if (actual_item.childNodes[y].nodeName == "pubDate") {
                
                    dateDIV.innerText = actual_item.childNodes[y].childNodes[0].nodeValue;
                    dateDIV.className = "dateClass";
                    rssNewsArray[x].appendChild(dateDIV.cloneNode(true));
                }
                
                if (actual_item.childNodes[y].nodeName == "link") {
                    rssNewsArray[x].setAttribute('url', actual_item.childNodes[y].childNodes[0].nodeValue);
                    
                }
            }
        }
        
    }
    
    
    
    
    //scrollElem.childNodes[0].childNodes[0].appendChild(allItemsDIVl);
    
    //div.innerHTML = tnodes;
    
    
    $(".titleClass", activeObject).css('padding-top', activeObject.getAttribute('tTop'));
    $(".titleClass", activeObject).css('padding-left', activeObject.getAttribute('tLeft'));
    $(".dateClass", activeObject).css('padding-top', activeObject.getAttribute('dTop'));
    $(".dateClass", activeObject).css('padding-left', activeObject.getAttribute('dLeft'));
    $(".contentClass", activeObject).css('padding-top', activeObject.getAttribute('cTop'));
    $(".contentClass", activeObject).css('padding-left', activeObject.getAttribute('cLeft'));
    //reloadRSSNews();
    
    //addNewsItems();
    
    freezeWidget();
    
};


getRSSNewsFeedsAgain = function(){





    // div = ((document.getElementById) ? document.getElementById("content") : document.all.content);
    
    
    
    feeds = rssData.getElementsByTagName("rss")[0]; // Specifying the root element
    // div = ((document.getElementById) ? document.getElementById("content") : document.all.content);
    feeds = rssData.getElementsByTagName("rss")[0]; // Specifying the root element
    if (feeds == null) {
        alert('RSS News data not found. Please check the RSS feed Url requested and try again.');
        return;
    }
    
    
    var itemDIV = document.createElement('div');
    
    
    var titleDIV = document.createElement('div');
    
    
    var dateDIV = document.createElement('div');
    
    
    var contentDIV = document.createElement('div');
    
    var actual_item;
    
    var cells = activeObject.getElementsByClassName('ad-table-view-cell');
    
    //tnodes = ""; // Will be used to display our feeds
    for (var x = 0; x < cells.length; x++) { // incrementing variable x by two, were "two" is the number <title> element's inside the feeds.
        actual_item = feeds.getElementsByTagName("item")[x];
        if (actual_item == null) {
            titleDIV.innerText = "Title";
            titleDIV.className = "titleClass";
            $(titleDIV).css('font-family', "helvetica");
            $(titleDIV).css('font-size', '15px');
            $(titleDIV).css('color', "#000000");
            rssNewsArray[x].appendChild(titleDIV.cloneNode(true));
            
            contentDIV.innerHTML = "Content Unavailable";
            contentDIV.className = "contentClass";
            $(contentDIV).css('color', "#2E2E2E");
            $(contentDIV).css('font-family', "helvetica");
            $(contentDIV).css('font-size', '13px');
            rssNewsArray[x].appendChild(contentDIV.cloneNode(true));
            
            dateDIV.innerText = "Content Unavailable";
            dateDIV.className = "dateClass";
            rssNewsArray[x].appendChild(dateDIV.cloneNode(true));
            
            rssNewsArray[x].setAttribute('url', "www.google.com");
            
        }
        else {
            for (var y = 0; y < actual_item.childNodes.length; y++) {
            
                if (actual_item.childNodes[y].nodeName == "title") {
                
                    titleDIV.innerText = actual_item.childNodes[y].childNodes[0].nodeValue;
                    titleDIV.className = "titleClass";
                    $(titleDIV).css('font-family', "helvetica");
                    $(titleDIV).css('font-size', '15px');
                    $(titleDIV).css('color', "#000000");
                    
                    rssNewsArray[x].appendChild(titleDIV.cloneNode(true));
                }
                
                if (actual_item.childNodes[y].nodeName == "description") {
                
                    contentDIV.innerHTML = actual_item.childNodes[y].childNodes[0].nodeValue;
                    contentDIV.className = "contentClass";
                    $(contentDIV).css('color', "#2E2E2E");
                    $(contentDIV).css('font-family', "helvetica");
                    $(contentDIV).css('font-size', '13px');
                    $(contentDIV).css('padding-top', activeObject.getAttribute('cTop'));
                    $(contentDIV).css('padding-left', activeObject.getAttribute('cLeft'));
                    rssNewsArray[x].appendChild(contentDIV.cloneNode(true));
                    
                }
                
                if (actual_item.childNodes[y].nodeName == "pubDate") {
                
                    dateDIV.innerText = actual_item.childNodes[y].childNodes[0].nodeValue;
                    dateDIV.className = "dateClass";
                    rssNewsArray[x].appendChild(dateDIV.cloneNode(true));
                    $(dateDIV).css('padding-top', activeObject.getAttribute('dTop'));
                    $(dateDIV).css('padding-left', activeObject.getAttribute('dLeft'));
                }
                if (actual_item.childNodes[y].nodeName == "link") {
                    rssNewsArray[x].setAttribute('url', actual_item.childNodes[y].childNodes[0].nodeValue);
                }
            }
        }
        
    }
    
    $(".titleClass", activeObject).css('padding-top', activeObject.getAttribute('tTop'));
    $(".titleClass", activeObject).css('padding-left', activeObject.getAttribute('tLeft'));
    $(".dateClass", activeObject).css('padding-top', activeObject.getAttribute('dTop'));
    $(".dateClass", activeObject).css('padding-left', activeObject.getAttribute('dLeft'));
    $(".contentClass", activeObject).css('padding-top', activeObject.getAttribute('cTop'));
    $(".contentClass", activeObject).css('padding-left', activeObject.getAttribute('cLeft'));
    reloadRSSNews();
    freezeWidget();
    
    
};


function addNewsItems(){

    var scrollElem = document.getElementById(curRSSId);
    
    for (var i = 0; i < rssNewsArray.length; i++) {
    
        scrollElem.childNodes[0].childNodes[0].childNodes[i] = (rssNewsArray[i].cloneNode(true));
        
    }
}

loadRSSNewsFeeds = function(url){
    rssData = null;
    if (window.XMLHttpRequest) { // Creates XMLHttpRequest object for IE7+, OP, ff etc.
        rssData = new XMLHttpRequest();
    }
    else 
        if (window.ActiveXObject) {
            try { // Works well in IE Browser's
                rssData = new ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch (e) {
                rssData = new ActiveXObject("Msxml2.XMLHTTP");
            }
        }
    if (rssData !== null) { // Initiating function reference ( getRSSFeeds )
        rssData.onreadystatechange = getRSSNewsFeeds;
        rssData.open("GET", url, true);
        // sending out request
        rssData.send(null);
    }
    else {
        alert("\nYour browser does not support AJAX Request!");
    }
    
};

function insertTableRSSWidget(){


    //alert("The MobDis RSS News widget is under development and will be available soon. :)");
    //return;
    
    showProgressBar(5000);
    //var t=setTimeout("getRSSNewsFeeds",3000);
    //var r=setTimeout("addNewsItems()",4000);
    
    //loadRSSNewsFeeds('http://news.feedzilla.com/en_us/headlines/top-news/business.rss');
    
    //loadRSSFeeds('http://www.feedforall.com/blog-feed.xml');
    document.getElementById('property_newsRSSView1').value = 'http://feeds.nytimes.com/nyt/rss/HomePage';
    loadRSSFeeds('http://feeds.nytimes.com/nyt/rss/HomePage', "getRSSNewsFeeds");
    
    //loadRSSNewsFeeds('http://www.feedforall.com/sample.xml');
    
    this.list = new ADTableView();
    // set up protocol implementations
    this.list.delegate = this;
    this.list.dataSource = this;
    this.list.layer.setAttribute('onClickEvent', '0');
    //this.list.size = new ADSize(window.innerWidth, window.innerHeight);
    // add to root view
    // ADRootView.sharedRoot.addSubview(this.list);
    
    this.list.cellNum = 10;
    rssNewsArray = new Array();
    
    for (var x = 0; x < 10; x++) {
    
        var newsItem = document.createElement('div');
        
        newsItem.className = "rssNewsItem";
        rssNewsArray.push(newsItem);
    }
    
    this.list.idName = "sample";
    
    // ready to display new data
    this.list.reloadData();
    
    objCount_Wid++;
    objCount_Rss++;
    var width = $("#canvas").css("width").replace("px", "");
    var height = $("#canvas").css("height").replace("px", "");
    
    // this.list.layer.className = this.list.layer.className + " unselectable";
    var myDiv = insertObject('widget', this.list.layer, 'myRSSWidgetView' + objCount_Rss, width, height, 0, 0);
    myDiv.setAttribute('widget_type', 'rssNews');
    myDiv.setAttribute('feedurl', 'http://feeds.nytimes.com/nyt/rss/HomePage');
    myDiv.setAttribute('active', "no");
    myDiv.setAttribute('deleted', 'no');
    myDiv.setAttribute('cellNum', 10);
    
    var scroll = myDiv.getElementsByClassName('ad-table-view');
    // $('.hosting-layer', myDiv).css('height', '900px');
    
    var tTop = $(".titleClass", myDiv).css('padding-top');
    var tLeft = $(".titleClass", myDiv).css('padding-left');
    var cTop = $(".contentClass", myDiv).css('padding-top');
    var cLeft = $(".contentClass", myDiv).css('padding-left');
    var dTop = $(".dateClass", myDiv).css('padding-top');
    var dLeft = $(".dateClass", myDiv).css('padding-left');
    
    myDiv.setAttribute('tTop', tTop);
    myDiv.setAttribute('tLeft', tLeft);
    myDiv.setAttribute('cTop', cTop);
    myDiv.setAttribute('cLeft', cLeft);
    myDiv.setAttribute('dTop', dTop);
    myDiv.setAttribute('dLeft', dLeft);
    myDiv.firstChild.style.opacity = 1.0;
    dragresize.select(myDiv);
    curRSSId = myDiv.id;
    
    
}

function reloadRSSNews(){

    var tableView = document.getElementById(activeObject.id);
    
    var myTableCellNodes = tableView.childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes;
    
    for (var z = 0; z < myTableCellNodes.length; z++) {
        for (var y = 0; y < myTableCellNodes[z].childNodes[0].childNodes.length; y++) {
        
        
            if (myTableCellNodes[z].childNodes[0].childNodes[y].className == "titleClass") {
            
                myTableCellNodes[z].childNodes[0].childNodes[y].innerText = rssNewsArray[z].childNodes[0].innerText;
                myTableCellNodes[z].childNodes[0].setAttribute('url', rssNewsArray[z].getAttribute('url'));
            }
            
            if (myTableCellNodes[z].childNodes[0].childNodes[y].className == "contentClass") {
            
                myTableCellNodes[z].childNodes[0].childNodes[y].innerHTML = rssNewsArray[z].childNodes[1].innerHTML;
            }
            
            if (myTableCellNodes[z].childNodes[0].childNodes[y].className == "dateClass") {
            
                myTableCellNodes[z].childNodes[0].childNodes[y].innerText = rssNewsArray[z].childNodes[2].innerText;
            }
        }
    }
    
    $(".titleClass", activeObject).css('padding-top', activeObject.getAttribute('tTop'));
    $(".titleClass", activeObject).css('padding-left', activeObject.getAttribute('tLeft'));
    $(".dateClass", activeObject).css('padding-top', activeObject.getAttribute('dTop'));
    $(".dateClass", activeObject).css('padding-left', activeObject.getAttribute('dLeft'));
    $(".contentClass", activeObject).css('padding-top', activeObject.getAttribute('cTop'));
    $(".contentClass", activeObject).css('padding-left', activeObject.getAttribute('cLeft'));
}


/* ==================== TableViewDataSource Protocol ==================== */

tableViewNumberOfRowsInSection = function(tableView, section){
    if (tableView.cellNum) {
        //alert("returning number of cells: "+flowView.cellNum);
        return tableView.cellNum;
    }
    else {
        return 10;
    }
};

tableViewCellForRowAtPath = function(tableView, path){

    if (tableView.idName == "sample") {
        var actualCell = document.createElement('div');
        actualCell.appendChild(rssNewsArray[path.row]);
        //    var cell = rssNewsArray[path.row];
        var url = rssNewsArray[path.row].getAttribute('url');
        
        return new ADTableViewCell(actualCell, ADTableViewCellStyleCustom);
    }
    else {
        var listObject = document.getElementById(tableView.idName);
        var newsItems = listObject.getElementsByClassName('rssNewsItem');
        var actualCell = document.createElement('div');
        if (path.row >= newsItems.length) {
            return new ADTableViewCell(actualCell, ADTableViewCellStyleCustom);
        }
        actualCell.appendChild((newsItems[path.row]).cloneNode(true));
        
        return new ADTableViewCell(actualCell, ADTableViewCellStyleCustom);
        //  var cell = document.createElement('div');
        // cell.appendChild(document.createElement('img')).src = images[index].src;
        //return newsItems[path.row];
    
    }
    
};

/* ==================== TableViewDelegate Protocol ==================== */

tableViewDidSelectRowAtPath = function(tableView, path){
    //alert("tableview item selected");
    var url1 = tableView._hostingLayer.childNodes[0].childNodes[0].childNodes[path.row].childNodes[0].getAttribute('url');
    //alert(url1);
    var tableCell = tableView._hostingLayer.childNodes[0].childNodes[0].childNodes[path.row].childNodes[0];
    tableCell.setAttribute('data-pageid', "");
    tableCell.setAttribute('data-pageurl', "");
    tableCell.setAttribute('data-exlink', url1);
    tableCell.setAttribute('data-transition', "");
    goToNextPage(tableCell);
    // newDIV.firstChild.setAttribute('data-transition',transitionIDs[0]);
    //window.open(url1, "", "height=480, width=320,status=1,scrollbars=1");


    //  console.log('Cell with label ' + this.labelForIndex(path.row) + ' was activated');
};



/**
*	Web Ad Builder: General JavaScript File
*	Created	:	05 May, 2010
*	Author	:	Myo Myint Aung, & Tao
*	Descript:	JavaScripts for general functionalities of the application
*/

function repaintAllCanvas(mainDIV) 
{
	var tempChildren = mainDIV.getElementsByTagName('CANVAS');
	var img = new Array();
	
	for (var i=0; i<tempChildren.length; i++) 
	{
		img[i] = new Image();
	    img[i].src = tempChildren[i].getAttribute('data-src');	
	}
	
	for (var i=0; i<tempChildren.length; i++) 
	{	    
        if(tempChildren[i].style.zIndex==-200)
		{        	        	
			tempChildren[i].getContext('2d').drawImage(img[i],0, 0,300,150);
		}
		else
		{
			tempChildren[i].getContext('2d').drawImage(img[i],0,0,300,150);
		}             
	}	
}

function repaintCanvas(mainDivID) 
{
	var mainDIV = document.getElementById(mainDivID);
	var tempChildren = mainDIV.getElementsByTagName('CANVAS');
	var img = new Array();
	
	for (var i=0; i<tempChildren.length; i++) 
	{
		img[i] = new Image();
	    img[i].src = tempChildren[i].getAttribute('data-src');	
	}
	
	for (var i=0; i<tempChildren.length; i++) 
	{	    
        if(tempChildren[i].style.zIndex==-200)
		{        	        	
			img[i].width = tempChildren[i].style.width = 320;
			img[i].height = tempChildren[i].style.height = 480;
			tempChildren[i].getContext('2d').drawImage(img[i],0, 0,img[i].width,img[i].height);
		}
		else
		{
			tempChildren[i].getContext('2d').drawImage(img[i],0,0,300,150);
		}             
	}	
}

function paintAllCanvas(mainDivID)
{
	setTimeout("repaintCanvas('" + mainDivID + "')", 2000);
}

function displayMainArea()
{
    var areaCode = name;
    document.getElementById("area").innerHTML = areaCode;
}

function attachActiveHandles(element)
{
	for(var i=0;i<8;i++)
	{
		activeHandles[i].style.display = 'inline';	
		element.appendChild(activeHandles[i]);
	}
	document.getElementById("objExpLI_"+element.id).style.background="#E95683";
	document.getElementById("objExpLI_"+element.id).style.color="white";
}
function detachActiveHandles(element)
{
	document.getElementById("objExpLI_"+element.id).style.background="";
	document.getElementById("objExpLI_"+element.id).style.color="";
}
function hideActiveHandles()
{
	for(var i=0;i<8;i++)
	{
		activeHandles[i].style.display = 'none';	
		handleHome.appendChild(activeHandles[i]);
	}
}

function updateActiveElement(element)
{	
	if(activeElement[0]!=null)
	{
		activeElement[1] = activeElement[0];
		activeElement[0] = element;	
		detachActiveHandles(activeElement[1]);
		attachActiveHandles(activeElement[0]);
	}
	else
	{
		activeElement[0]=element;
		attachActiveHandles(activeElement[0]);
	}
}

function updateList(elementUL,array,action)
{	
	while(elementUL.lastChild)
	{
		elementUL.removeChild(elementUL.lastChild);
	}
	for (var i=0; i<array.length; i++)
	{	
		elementLI = document.createElement("li");			
		elementUL.appendChild(elementLI);				
		elementLI.setAttribute('onclick',action);			
		elementLI.innerHTML = array[i];	
	}
}

function checkActiveElement()
{
	if(activeElement[0]!=null)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function toggleDisplayElement(element)
{
	if(element.style.display=="block")
	{
		element.style.display="none";
	}
	else if(element.style.display=="none")
	{
		element.style.display="block";
	}
}

function showStatus(msg)
{
	var statusBar = document.getElementById('statusBar');
	var statusBar_Message = document.getElementById('statusBar_Message');
	statusBar_Message.innerHTML = msg;
	
	var duration = 0;
	var opacity = 0;
	
	for(var i=0;i<20;i++)
	{
		setTimeout(statusBar.style.opacity=opacity,duration);
		opacity += 0.5;
		duration += 10;
	}
	
	duration += 2000;
	opacity = 1;

	for(var i=0;i<20;i++)
	{
		setTimeout(statusBar.style.opacity=opacity,duration);
		opacity -= 0.05;
		duration += 10;
	}
}