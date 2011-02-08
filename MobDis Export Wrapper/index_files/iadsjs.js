
/**
 *
 * Copyright © 2009, 2010 Apple Inc.  All rights reserved.
 *
 **/
/* iAd JS Version: 1.1 */
var ADAnalytics = {};
ADAnalytics.init = function(){
    if (!window.hasOwnProperty("ad")) {
        return
    }
    document.addEventListener(ADViewControllerViewWillAppearEvent, this, true);
    document.addEventListener(ADViewControllerViewDidAppearEvent, this, true);
    document.addEventListener(ADViewControllerViewWillDisappearEvent, this, true);
    document.addEventListener(ADViewControllerViewDidDisappearEvent, this, true);
    document.addEventListener("play", this, true);
    document.addEventListener("pause", this, true);
    document.addEventListener("ended", this, true)
};
ADAnalytics.handleEvent = function(A){
    if (A.hasOwnProperty("viewController")) {
        this.handleViewControllerEvent(A)
    }
    else {
        this.handleMediaPlaybackEvent(A)
    }
};
ADAnalytics.handleViewControllerEvent = function(A){
    this.logMessage(A.viewController.configuration.id, "v" + A.type.substring(15), "view", (A.animated ? "animated" : "not animated"))
};
ADAnalytics.handleMediaPlaybackEvent = function(B){
    var A = "video" + B.type.charAt(0).toUpperCase() + B.type.substr(1);
    this.logMessage(this.viewControllerIDForElement(B.target), A, B.target.localName, B.target.src)
};
ADAnalytics.viewControllerIDForElement = function(A){
    var B = "";
    while (A.parentNode) {
        if (A.hasOwnProperty("_view") && A._view.hasOwnProperty("_viewController")) {
            B = A._view._viewController.configuration.id;
            break
        }
        A = A.parentNode
    }
    return B
};
ADAnalytics.logMessage = function(F, A, B, D){
    var E = {
        v: 1.1
    };
    E[Date.now()] = {
        s: F,
        n: A,
        t: B,
        a: D
    };
    var C = {
        Events: E
    };
    window.ad.reportClickEvent(JSON.stringify(C))
};
window.addEventListener("DOMContentLoaded", function(){
    ADAnalytics.init()
}, false);
const ADVersion = "1.1";
const iPad = (navigator.platform == "iPad");
var HiDPI = false;
const ADSupportsTouches = ("createTouch" in document);
const ADStartEvent = ADSupportsTouches ? "touchstart" : "mousedown";
const ADMoveEvent = ADSupportsTouches ? "touchmove" : "mousemove";
const ADEndEvent = ADSupportsTouches ? "touchend" : "mouseup";
function ADUtils(){
}

ADUtils.assetsPath = "";
ADUtils.t = function(B, A){
    return ADUtils.t3d(B, A, 0)
};
ADUtils.t3d = function(B, A, C){
    return "translate3d(" + B + "px, " + A + "px, " + C + "px)"
};
ADUtils.r3d = function(A, D, C, B){
    return "rotate3d(" + A + ", " + D + ", " + C + ", " + B + "rad)"
};
ADUtils.px = function(A){
    return A + "px"
};
ADUtils.degreesToRadians = function(A){
    return (A / 360) * (Math.PI * 2)
};
ADUtils.radiansToDegrees = function(A){
    return (A / (Math.PI * 2)) * 360
};
ADUtils.copyPropertiesFromSourceToTarget = function(B, C){
    for (var A in B) {
        C[A] = B[A]
    }
};
ADUtils.cloneObject = function(A){
    var B = {};
    ADUtils.copyPropertiesFromSourceToTarget(A, B);
    return B
};
ADUtils.objectIsFunction = function(A){
    return (typeof A == "function")
};
ADUtils.objectIsUndefined = function(A){
    return (A === undefined)
};
ADUtils.objectIsString = function(A){
    return (typeof A == "string" || A instanceof String)
};
ADUtils.objectIsArray = function(A){
    return (A instanceof Array)
};
ADUtils.objectHasMethod = function(B, A){
    return (B !== null && !this.objectIsUndefined(B[A]) && this.objectIsFunction(B[A]))
};
ADUtils.disableScrolling = function(A){
    A.stopPropagation();
    window.addEventListener("touchmove", ADUtils.preventEventDefault, true);
    window.addEventListener("touchend", ADUtils.restoreScrollingBehavior, true);
    window.addEventListener("touchcancel", ADUtils.restoreScrollingBehavior, true)
};
ADUtils.preventEventDefault = function(A){
    A.preventDefault()
};
ADUtils.restoreScrolling = function(){
    window.removeEventListener("touchmove", ADUtils.preventEventDefault, true);
    window.removeEventListener("touchend", ADUtils.restoreScrollingBehavior, true);
    window.removeEventListener("touchcancel", ADUtils.restoreScrollingBehavior, true)
};
ADUtils.createUIEvent = function(A, B){
    return ADSupportsTouches ? this.createEventWithTouch(A, B) : this.createEventWithMouse(A, B)
};
ADUtils.createEventWithTouch = function(B, A){
    var C = document.createEvent("TouchEvent");
    C.initTouchEvent(B, A.bubbles, A.cancelable, window, A.detail, A.screenX, A.screenY, A.clientX, A.clientY, A.ctrlKey, A.altKey, A.shiftKey, A.metaKey, A.touches, A.targetTouches, A.changedTouches, A.scale, A.rotation);
    return C
};
ADUtils.createEventWithMouse = function(A, C){
    var B = document.createEvent("MouseEvent");
    B.initMouseEvent(A, C.bubbles, C.cancelable, document.defaultView, C.detail, C.screenX, C.screenY, C.clientX, C.clientY, C.ctrlKey, C.altKey, C.shiftKey, C.metaKey, C.metaKey, C.button, C.relatedTarget);
    return B
};
ADUtils.init = function(){
    if (window.hasOwnProperty("media") && "matchMedium" in window.media) {
        HiDPI = window.media.matchMedium("(-webkit-min-device-pixel-ratio: 2)");
        if (HiDPI) {
            document.body.addClassName("HiDPI")
        }
    }
    if (iPad) {
        document.body.addClassName("iPad")
    }
    for (var D = 0; D < document.styleSheets.length; D++) {
        var C = document.styleSheets[D];
        var B = C.href ? C.href.indexOf("dist/iAd") : -1;
        if (B != -1) {
            ADUtils.assetsPath = C.href.substring(0, B) + "assets/";
            break
        }
    }
    var A = document.querySelector(".ad-root-view");
    if (A !== null) {
        ADRootView._sharedRoot = ADUtils.getViewWithLayer(A)
    }
};
ADUtils.setupDisplayNames = function(A, C){
    var D = C || A.name;
    for (var B in A) {
        if (A.__lookupGetter__(B)) {
            continue
        }
        var E = A[B];
        if (ADUtils.objectIsFunction(E)) {
            E.displayName = ADUtils.createDisplayName(D, B)
        }
    }
    for (var B in A.prototype) {
        if (A.prototype.__lookupGetter__(B)) {
            continue
        }
        var E = A.prototype[B];
        if (ADUtils.objectIsFunction(E)) {
            E.displayName = ADUtils.createDisplayName(D, B)
        }
    }
};
ADUtils.createDisplayName = function(B, A){
    return B + "." + A + "()"
};
ADUtils.createNodeFromString = function(D){
    var A = document.createRange();
    A.selectNode(document.body);
    var B = A.createContextualFragment(D);
    var C = B.firstChild;
    while (C.nodeType != Node.ELEMENT_NODE && C.nextSibling) {
        C = C.nextSibling
    }
    return C
};
ADUtils.makeEventHandlerWithString = function(A){
    var B = new Function(A);
    return function(C){
        B.call(null, C)
    }
};
ADUtils.registeredHTMLViewLoadingClasses = [];
ADUtils.registerClassForHTMLViewLoading = function(A){
    ADUtils.registeredHTMLViewLoadingClasses.push(A)
};
ADUtils.getViewWithLayer = function(E){
    var A = null;
    var D = ADUtils.registeredHTMLViewLoadingClasses;
    var F = ADView;
    var B;
    for (var C = 0; C < D.length; C++) {
        B = D[C];
        if (E.hasClassName(B.cssClassName)) {
            F = B;
            break
        }
    }
    return new F(E)
};
ADUtils.viewsForClassAndNode = function(E, A){
    var D = [];
    if (!E.hasOwnProperty("cssClassName")) {
        return D
    }
    var C = A.querySelectorAll("." + E.cssClassName);
    for (var B = 0; B < C.length; B++) {
        D.push(C[B]._view)
    }
    return D
};
ADUtils.elementForNode = function(A){
    return (A.nodeType === Node.ELEMENT_NODE) ? A : A.parentElement
};
window.addEventListener("DOMContentLoaded", ADUtils.init, false);
ADUtils.setupDisplayNames(ADUtils, "ADUtils");
var ADEventTriage = {};
ADEventTriage.handleEvent = function(C){
    if (this instanceof ADObject) {
        this.callSuper(C)
    }
    var B = C.type;
    var A = "handle" + B.charAt(0).toUpperCase() + B.substr(1);
    if (ADUtils.objectHasMethod(this, A)) {
        this[A](C)
    }
};
ADUtils.setupDisplayNames(ADEventTriage, "ADEventTriage");
var ADEventTarget = {};
ADEventTarget.addEventListener = function(B, C, A){
    this.eventTarget.addEventListener(B, C, A)
};
ADEventTarget.removeEventListener = function(B, C, A){
    this.eventTarget.removeEventListener(B, C, A)
};
ADEventTarget.dispatchEvent = function(A){
    this.eventTarget.dispatchEvent(A)
};
ADUtils.setupDisplayNames(ADEventTarget, "ADEventTarget");
var ADPropertyTriage = {};
ADPropertyTriage.handlePropertyChange = function(C, B){
    var A = "handle" + B.charAt(0).toUpperCase() + B.substr(1) + "Change";
    if (ADUtils.objectHasMethod(this, A)) {
        this[A](C)
    }
};
ADUtils.setupDisplayNames(ADPropertyTriage, "ADPropertyTriage");
Element.prototype.hasClassName = function(A){
    return new RegExp("(?:^|\\s+)" + A + "(?:\\s+|$)").test(this.className)
};
Element.prototype.addClassName = function(A){
    if (!this.hasClassName(A)) {
        this.className = [this.className, A].join(" ");
        return true
    }
    else {
        return false
    }
};
Element.prototype.removeClassName = function(B){
    if (this.hasClassName(B)) {
        var A = this.className;
        this.className = A.replace(new RegExp("(?:^|\\s+)" + B + "(?:\\s+|$)", "g"), " ");
        return true
    }
    return false
};
Element.prototype.toggleClassName = function(A){
    this[this.hasClassName(A) ? "removeClassName" : "addClassName"](A)
};
ADUtils.setupDisplayNames(Element, "Element");
Node.prototype.getNearestView = function(){
    var A = this;
    while (ADUtils.objectIsUndefined(A._view) && A.parentNode) {
        A = A.parentNode
    }
    return (ADUtils.objectIsUndefined(A._view)) ? null : A._view
};
ADUtils.setupDisplayNames(Node, "Node");
function ADClass(E){
    if (!E.hasOwnProperty("superclass") && E !== ADObject) {
        E.superclass = ADObject
    }
    if (E.mixins) {
        ADClass.mixin(E.prototype, E.mixins)
    }
    var B = (E.synthesizedProperties) ? E.synthesizedProperties : [];
    for (var A = 0; A < B.length; A++) {
        ADClass.synthesizeProperty(E.prototype, B[A])
    }
    for (var D in E.prototype) {
        if (E.prototype.__lookupGetter__(D)) {
            continue
        }
        ADClass.processMethod(E, D)
    }
    if (E !== ADObject) {
        E.prototype.__proto__ = E.superclass.prototype
    }
    var C = E;
    while (true) {
        if (C.hasOwnProperty("initialize") && ADUtils.objectIsFunction(C.initialize)) {
            C.initialize.apply(E)
        }
        if (C.hasOwnProperty("superclass")) {
            C = C.superclass
        }
        else {
            break
        }
    }
}

ADClass.synthesizeProperty = function(C, B){
    var H = B.charAt(0).toUpperCase() + B.substr(1);
    var E = "get" + H;
    var A = "set" + H;
    var D = "_" + B;
    if (!ADUtils.objectHasMethod(C, A)) {
        C[A] = function(I){
            this[D] = I
        }
    }
    var G = function(I){
        this[A](I);
        this.notifyPropertyChange(B)
    };
    G.displayName = "Setter for ." + B + " on " + C.constructor.name;
    C.__defineSetter__(B, G);
    if (!ADUtils.objectHasMethod(C, E)) {
        C[E] = function(){
            return this[D]
        }
    }
    var F = function(){
        return this[E]()
    };
    F.displayName = "Getter for ." + B + " on " + C.constructor.name;
    C.__defineGetter__(B, F)
};
ADClass.processMethod = function(C, A){
    var B = C.prototype[A];
    if (ADUtils.objectIsFunction(B)) {
        B._class = C;
        B._name = A;
        B.displayName = ADUtils.createDisplayName(C.name, A)
    }
};
ADClass.mixin = function(C, A){
    for (var B = 0; B < A.length; B++) {
        ADUtils.copyPropertiesFromSourceToTarget(A[B], C)
    }
};
ADClass.synthesizeProperties = function(C, A){
    for (var B = 0; B < A.length; B++) {
        ADClass.synthesizeProperty(C.prototype, A[B])
    }
};
ADClass.processMethods = function(C, B){
    for (var A = 0; A < B.length; A++) {
        ADClass.processMethod(C, B[A])
    }
};
ADUtils.setupDisplayNames(ADClass, "ADClass");
const ADObjectPropertyChanged = "handlePropertyChange";
function ADObject(){
    this.observedProperties = {}
}

ADObject.prototype.callSuper = function(){
    var A = ADObject.prototype.callSuper.caller;
    if (ADUtils.objectHasMethod(A, "superclass")) {
        A.superclass.apply(this, arguments)
    }
    else {
        var C = A._class.superclass.prototype;
        var B = A._name;
        if (ADUtils.objectHasMethod(C, B)) {
            return C[B].apply(this, arguments)
        }
    }
};
ADObject.prototype.isPropertyObserved = function(A){
    return !ADUtils.objectIsUndefined(this.observedProperties[A])
};
ADObject.prototype.addPropertyObserver = function(C, B, A){
    var D = this.observedProperties[C];
    if (!this.isPropertyObserved(C)) {
        D = this.observedProperties[C] = {
            targets: [],
            methodNames: []
        }
    }
    else {
        if (D.targets.indexOf(B) > -1) {
            return
        }
    }
    var A = A || ADObjectPropertyChanged;
    if (ADUtils.objectHasMethod(B, A)) {
        D.targets.push(B);
        D.methodNames.push(A)
    }
};
ADObject.prototype.removePropertyObserver = function(C, B){
    if (!this.isPropertyObserved(C)) {
        return false
    }
    var E = this.observedProperties[C];
    var D = E.targets.indexOf(B);
    var A = D > -1;
    if (A) {
        E.targets.splice(D, 1);
        E.methodNames.splice(D, 1)
    }
    return A
};
ADObject.prototype.notifyPropertyChange = function(B){
    if (!this.isPropertyObserved(B)) {
        return
    }
    var E = this.observedProperties[B];
    var A = E.targets;
    var D = E.methodNames;
    for (var C = 0; C < A.length; C++) {
        A[C][D[C]](this, B)
    }
};
ADObject.prototype.callMethodNameAfterDelay = function(A, D){
    var E = this;
    var C = Array.prototype.slice.call(arguments, 2);
    var B = function(){
        E[A].apply(E, C)
    };
    B.displayName = ADUtils.createDisplayName(this.constructor.name, A);
    return setTimeout(B, D)
};
ADClass(ADObject, "ADObject");
function ADPoint(A, B){
    this.x = (A != null && !isNaN(A)) ? A : 0;
    this.y = (B != null && !isNaN(B)) ? B : 0
}

ADPoint.fromEvent = function(A){
    var A = (A.touches && A.touches.length > 0) ? A.touches[0] : A;
    return new ADPoint(A.pageX, A.pageY)
};
ADPoint.fromEventInElement = function(B, A){
    var B = (B.touches && B.touches.length > 0) ? B.touches[0] : B;
    return window.webkitConvertPointFromPageToNode(A, new WebKitPoint(B.pageX, B.pageY))
};
ADPoint.prototype.toString = function(){
    return "ADPoint[" + this.x + "," + this.y + "]"
};
ADPoint.prototype.copy = function(){
    return new ADPoint(this.x, this.y)
};
ADPoint.prototype.equals = function(A){
    return (this.x == A.x && this.y == A.y)
};
ADUtils.setupDisplayNames(ADPoint, "ADPoint");
const ADSizeZeroSize = new ADSize(0, 0);
function ADSize(B, A){
    this.width = (B != null && !isNaN(B)) ? B : 0;
    this.height = (A != null && !isNaN(A)) ? A : 0
}

ADSize.prototype.toString = function(){
    return "ADSize[" + this.width + "," + this.height + "]"
};
ADSize.prototype.copy = function(){
    return new ADSize(this.width, this.height)
};
ADSize.prototype.equals = function(A){
    return (this.width == A.width && this.height == A.height)
};
ADUtils.setupDisplayNames(ADSize);
function ADEdgeInsets(D, B, A, C){
    this.top = D;
    this.right = B;
    this.bottom = A;
    this.left = C
}

const ADImageHiDPISuffix = "@2x";
ADImage.superclass = ADObject;
ADImage.synthesizedProperties = ["width", "height"];
function ADImage(B, A){
    this.callSuper();
    this.scaleFactor = 1;
    if (A && HiDPI) {
        var C = B.lastIndexOf(".");
        B = B.substr(0, C) + ADImageHiDPISuffix + B.substr(C);
        this.scaleFactor = 0.5
    }
    this.url = B;
    this.loaded = false;
    this.element = new Image();
    this.element.src = B;
    this.element.addEventListener("load", this, false);
    this._width = 0;
    this._height = 0
}

ADImage.prototype.getWidth = function(){
    return this.element.width * this.scaleFactor
};
ADImage.prototype.getHeight = function(){
    return this.element.height * this.scaleFactor
};
ADImage.prototype.handleEvent = function(A){
    this.loaded = true;
    this.notifyPropertyChange("loaded")
};
ADClass(ADImage);
const ADAnimatorLinearType = 0;
const ADAnimatorSplinesType = 1;
const ADAnimatorInvalidArgsException = 2;
const ADAnimatorAnimationDidIterate = "animationDidIterate";
const ADAnimatorAnimationDidEnd = "animationDidEnd";
function ADAnimator(B, A, C){
    if (arguments.length != 2 && arguments.length != 3 && arguments.length != 7) {
        throw ADAnimatorInvalidArgsException;
        return false
    }
    this.ready = false;
    this.animating = false;
    this.timer = null;
    this.duration = B;
    this.delegate = A;
    if (!ADUtils.objectHasMethod(this.delegate, ADAnimatorAnimationDidIterate)) {
        return
    }
    if (arguments.length >= 2) {
        this.type = ADAnimatorSplinesType;
        this.x1 = C[0];
        this.y1 = C[1];
        this.x2 = C[2];
        this.y2 = C[3];
        this.init()
    }
    else {
        this.type = ADAnimatorLinearType
    }
    this.ready = true
}

ADAnimator.prototype.init = function(){
    this.cx = 3 * this.x1;
    this.bx = 3 * (this.x2 - this.x1) - this.cx;
    this.ax = 1 - this.cx - this.bx;
    this.cy = 3 * this.y1;
    this.by = 3 * (this.y2 - this.y1) - this.cy;
    this.ay = 1 - this.cy - this.by;
    var C = (this.duration / 1000) * 240;
    this.curve = new Array(C);
    var D = 1 / (C - 1);
    for (var B = 0; B < C; B++) {
        var A = B * D;
        this.curve[B] = {
            x: (this.ax * Math.pow(A, 3)) + (this.bx * Math.pow(A, 2)) + (this.cx * A),
            y: (this.ay * Math.pow(A, 3)) + (this.by * Math.pow(A, 2)) + (this.cy * A)
        }
    }
};
ADAnimator.prototype.start = function(){
    if (!this.ready) {
        var A = this;
        this.timer = setTimeout(function(){
            A.start()
        }, 0);
        return
    }
    this.animating = true;
    this.lastIndex = 0;
    this.startTime = (new Date()).getTime();
    this.iterate()
};
ADAnimator.prototype.stop = function(){
    this.animating = false;
    clearTimeout(this.timer)
};
ADAnimator.prototype.iterate = function(){
    var C = (new Date()).getTime() - this.startTime;
    if (C < this.duration) {
        var B = C / this.duration;
        if (this.type == ADAnimatorSplinesType) {
            var G = 0;
            for (var D = this.lastIndex; D < this.curve.length; D++) {
                var A = this.curve[D];
                if (A.x >= B && D > 0) {
                    var E = this.curve[D - 1];
                    if ((B - E.x) < (A.x - B)) {
                        this.lastIndex = D - 1;
                        G = E.y
                    }
                    else {
                        this.lastIndex = D;
                        G = A.y
                    }
                    break
                }
            }
        }
        this.delegate[ADAnimatorAnimationDidIterate]((this.type == ADAnimatorSplinesType) ? G : B);
        var F = this;
        this.timer = setTimeout(function(){
            F.iterate()
        }, 0)
    }
    else {
        this.delegate[ADAnimatorAnimationDidIterate](1);
        if (ADUtils.objectHasMethod(this.delegate, ADAnimatorAnimationDidEnd)) {
            this.delegate[ADAnimatorAnimationDidEnd]()
        }
        this.animating = false
    }
};
ADClass(ADAnimator);
const ADTransitionDidCompleteDelegate = "transitionDidComplete";
const ADTransitionDefaults = {
    duration: 0.5,
    delay: 0,
    removesTargetUponCompletion: false,
    revertsToOriginalValues: false
};
const ADTransitionStyles = ["-webkit-transition-property", "-webkit-transition-duration", "-webkit-transition-timing-function", "-webkit-transition-delay", "-webkit-transition"];
function ADTransition(A){
    this.target = null;
    this.properties = null;
    this.duration = null;
    this.delay = null;
    this.from = null;
    this.to = null;
    this.timingFunction = null;
    this.delegate = null;
    this.removesTargetUponCompletion = null;
    this.revertsToOriginalValues = null;
    this.defaultsApplied = false;
    this.archivedStyles = null;
    this.archivedValues = [];
    ADUtils.copyPropertiesFromSourceToTarget(A, this)
}

ADTransition.prototype.applyDefaults = function(){
    if (this.defaultsApplied) {
        return
    }
    for (var A in ADTransitionDefaults) {
        if (this[A] === null) {
            this[A] = ADTransitionDefaults[A]
        }
    }
    this.defaultsApplied = true
};
ADTransition.prototype.archiveTransitionStyles = function(){
    if (this.archivedStyles !== null) {
        return
    }
    var B = (this.target instanceof ADView) ? this.target.layer : this.target;
    this.archivedStyles = [];
    for (var A = 0; A < ADTransitionStyles.length; A++) {
        this.archivedStyles.push(B.style.getPropertyValue(ADTransitionStyles[A]))
    }
};
ADTransition.prototype.restoreTransitionStyles = function(){
    for (var A = 0; A < ADTransitionStyles.length; A++) {
        this.element.style.setProperty(ADTransitionStyles[A], this.archivedStyles[A], "")
    }
    this.archivedStyles = null
};
ADTransition.prototype.archiveBaseValues = function(){
    if (!this.revertsToOriginalValues) {
        return
    }
    if (this.target instanceof ADView) {
        for (var A = 0; A < this.properties.length; A++) {
            this.archivedValues.push(this.target[this.properties[A]])
        }
    }
    else {
        for (var A = 0; A < this.properties.length; A++) {
            this.archivedValues.push(this.target.layer.style.getPropertyValue(this.properties[A]))
        }
    }
};
ADTransition.prototype.restoreBaseValues = function(){
    if (this.target instanceof ADView) {
        for (var A = 0; A < this.properties.length; A++) {
            this.target[this.properties[A]] = this.archivedValues[A]
        }
    }
    else {
        for (var A = 0; A < this.properties.length; A++) {
            this.target.layer.style.setProperty(this.properties[A], this.archivedValues[A], null)
        }
    }
};
ADTransition.prototype.start = function(){
    if (ADTransaction.openTransactions > 0) {
        ADTransaction.addTransition(this);
        return
    }
    this.applyDefaults();
    if (this.from === null) {
        this.applyToState()
    }
    else {
        this.applyFromState();
        var A = this;
        setTimeout(function(){
            A.applyToState()
        }, 0)
    }
};
ADTransition.prototype.applyFromState = function(){
    if (this.from === null) {
        return
    }
    this.applyDefaults();
    this.archiveTransitionStyles();
    if (this.target instanceof ADView) {
        this.target.layer.style.webkitTransitionDuration = 0;
        for (var A = 0; A < this.properties.length; A++) {
            this.target[this.properties[A]] = this.processTransitionValue(this.from[A])
        }
    }
    else {
        this.target.style.webkitTransitionDuration = 0;
        for (var A = 0; A < this.properties.length; A++) {
            this.target.style.setProperty(this.properties[A], this.from[A], "")
        }
    }
};
ADTransition.prototype.applyToState = function(){
    this.applyDefaults();
    this.archiveTransitionStyles();
    this.archiveBaseValues();
    var D = (this.target instanceof ADView);
    this.cssProperties = [];
    var G = [];
    for (var B = 0; B < this.properties.length; B++) {
        var E = (D) ? this.target.cssPropertyNameForJSProperty(this.properties[B]) : this.properties[B];
        if (this.cssProperties.indexOf(E) > -1) {
            continue
        }
        var F = (ADUtils.objectIsArray(this.duration)) ? this.duration[B] : this.duration;
        var C = (ADUtils.objectIsArray(this.timingFunction)) ? this.timingFunction[B] : this.timingFunction;
        var A = (ADUtils.objectIsArray(this.delay)) ? this.delay[B] : this.delay;
        G.push([E, F + "s", C, A + "s"].join(" "));
        this.cssProperties.push(E)
    }
    if (D) {
        this.element = this.target.layer;
        for (var B = 0; B < this.properties.length; B++) {
            this.target[this.properties[B]] = this.processTransitionValue(this.to[B])
        }
    }
    else {
        this.element = this.target;
        for (var B = 0; B < this.properties.length; B++) {
            this.target.style.setProperty(this.properties[B], this.to[B], "")
        }
    }
    this.element.style.webkitTransition = G.join(", ");
    if (F !== 0) {
        this.element.addEventListener("webkitTransitionEnd", this, false)
    }
    this.completedTransitions = 0
};
ADTransition.prototype.handleEvent = function(A){
    if (A.target !== this.element) {
        return
    }
    this.completedTransitions++;
    if (this.completedTransitions != this.cssProperties.length) {
        return
    }
    if (ADUtils.objectHasMethod(this.delegate, ADTransitionDidCompleteDelegate)) {
        this.delegate[ADTransitionDidCompleteDelegate](this)
    }
    this.element.removeEventListener("webkitTransitionEnd", this, false);
    if (this.removesTargetUponCompletion) {
        var B = this.target;
        if (this.target instanceof ADView) {
            B.removeFromSuperview()
        }
        else {
            B.parentNode.removeChild(B)
        }
    }
    else {
        this.restoreTransitionStyles()
    }
    if (this.revertsToOriginalValues) {
        this.restoreBaseValues()
    }
};
const ADTransitionWidthRegExp = new RegExp(/\$width/g);
const ADTransitionHeightRegExp = new RegExp(/\$height/g);
ADTransition.prototype.processTransitionValue = function(A){
    if (!ADUtils.objectIsString(A)) {
        return A
    }
    A = A.replace(ADTransitionWidthRegExp, ADUtils.px(this.target.size.width));
    return A.replace(ADTransitionHeightRegExp, ADUtils.px(this.target.size.height))
};
ADClass(ADTransition);
var ADTransaction = {
    transitions: [],
    openTransactions: 0,
    defaults: {},
    defaultsStates: []
};
ADTransaction.begin = function(){
    if (this.openTransactions == 0) {
        this.transitions = [];
        this.defaults = {}
    }
    else {
        this.defaultsStates.push(this.defaults)
    }
    this.openTransactions++
};
ADTransaction.addTransition = function(B){
    for (var A in this.defaults) {
        if (B[A] === null) {
            B[A] = this.defaults[A]
        }
    }
    this.transitions.push(B)
};
ADTransaction.commit = function(){
    if (this.openTransactions == 0) {
        return
    }
    this.openTransactions--;
    if (this.openTransactions != 0) {
        this.defaults = this.defaultsStates.pop();
        return
    }
    var B = this.transitions;
    for (var A = 0; A < B.length; A++) {
        B[A].applyFromState()
    }
    setTimeout(function(){
        for (var C = 0; C < B.length; C++) {
            B[C].applyToState()
        }
    }, 0)
};
ADUtils.setupDisplayNames(ADTransaction, "ADTransaction");
const ADAnimationDidCompleteDelegate = "animationDidComplete";
const ADAnimationDefaults = {
    duration: 1,
    delay: 0,
    removesTargetUponCompletion: false,
    timingFunction: "ease"
};
const ADAnimationStyles = ["-webkit-animation-name", "-webkit-animation-timing-function", "-webkit-animation-duration", "-webkit-animation-iteration-count", "-webkit-animation-direction", "-webkit-animation-delay", "-webkit-animation"];
function ADAnimation(A){
    this.rule = ADAnimation.createRule();
    this.target = null;
    this.duration = null;
    this.delay = null;
    this.keyframes = [];
    this.timingFunction = null;
    this.delegate = null;
    this.removesTargetUponCompletion = null;
    ADUtils.copyPropertiesFromSourceToTarget(A, this);
    this.init()
}

ADAnimation.prototype.init = function(){
    for (var C in ADAnimationDefaults) {
        if (this[C] === null) {
            this[C] = ADAnimationDefaults[C]
        }
    }
    this.archiveAnimationStyles();
    var D = this.target.layer.style;
    for (var C = 0; C < ADAnimationStyles; C++) {
        D.setProperty(ADAnimationStyles[C], "", "")
    }
    for (var C = 0; C < this.keyframes.length; C++) {
        var B = this.keyframes[C];
        var E = (B.offset * 100) + "% {";
        for (var A = 0; A < B.values.length; A += 2) {
            E += this.target.cssPropertyNameForJSProperty(B.values[A]) + ": " + B.values[A + 1] + ";"
        }
        E += "}";
        this.rule.insertRule(E)
    }
};
ADAnimation.prototype.start = function(){
    var A = this.target.layer.style;
    A.webkitAnimationName = this.rule.name;
    A.webkitAnimationDuration = this.duration + "s";
    A.webkitAnimationDelay = this.delay + "s";
    A.webkitAnimationTimingFunction = this.timingFunction;
    this.target.layer.addEventListener("webkitAnimationEnd", this, false)
};
ADAnimation.prototype.archiveAnimationStyles = function(){
    this.archivedStyles = [];
    for (var A = 0; A < ADAnimationStyles.length; A++) {
        this.archivedStyles.push(this.target.layer.style.getPropertyValue(ADAnimationStyles[A]))
    }
};
ADAnimation.prototype.restoreAnimationStyles = function(){
    for (var A = 0; A < ADAnimationStyles.length; A++) {
        this.target.layer.style.setProperty(ADAnimationStyles[A], this.archivedStyles[A], "")
    }
};
ADAnimation.prototype.handleEvent = function(C){
    if (C.currentTarget !== this.target.layer) {
        return
    }
    var A = this.keyframes[this.keyframes.length - 1].values;
    for (var B = 0; B < A.length; B += 2) {
        this.target[A[B]] = A[B + 1]
    }
    if (ADUtils.objectHasMethod(this.delegate, ADAnimationDidCompleteDelegate)) {
        this.delegate[ADAnimationDidCompleteDelegate](this)
    }
    if (this.removesTargetUponCompletion) {
        this.target.removeFromSuperview()
    }
    else {
        this.restoreAnimationStyles()
    }
};
ADClass(ADAnimation);
ADAnimation.counter = 0;
ADAnimation.createRule = function(){
    var C = document.styleSheets[0];
    var B = "AD-Animation-" + this.counter++;
    var A = C.insertRule("@-webkit-keyframes " + B + " { }", C.rules.length);
    return C.rules.item(A)
};
const ADViewTransitionDissolveOut = {
    properties: ["opacity"],
    from: [1],
    to: [0]
};
const ADViewTransitionDissolveIn = {
    properties: ["opacity"],
    from: [0],
    to: [1]
};
const ADViewTransitionZoomIn = {
    properties: ["opacity", "transform"],
    from: [0, "scale(0.2)"],
    to: [1, "scale(1)"]
};
const ADViewTransitionZoomOut = {
    properties: ["opacity", "transform"],
    from: [0, "scale(1.2)"],
    to: [1, "scale(1)"]
};
const ADViewTransitionCrossSpinRight = {
    properties: ["opacity", "transform"],
    from: [0, "rotate(20deg)"],
    to: [1, "rotate(0)"]
};
const ADViewTransitionCrossSpinLeft = {
    properties: ["opacity", "transform"],
    from: [0, "rotate(-20deg)"],
    to: [1, "rotate(0)"]
};
const ADViewTransitionFlipLeftOut = {
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg)"],
    to: ["perspective(800) rotateY(-180deg)"]
};
const ADViewTransitionFlipLeftIn = {
    properties: ["transform"],
    from: ["perspective(800) rotateY(180deg)"],
    to: ["perspective(800) rotateY(0deg)"]
};
const ADViewTransitionFlipRightOut = {
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg)"],
    to: ["perspective(800) rotateY(180deg)"]
};
const ADViewTransitionFlipRightIn = {
    properties: ["transform"],
    from: ["perspective(800) rotateY(-180deg)"],
    to: ["perspective(800) rotateY(0deg)"]
};
const ADViewTransitionCubeLeftOut = {
    base: ["anchorPoint", new ADPoint(1, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg) translateZ(0)"],
    to: ["perspective(800) rotateY(-90deg) translateZ($width)"]
};
const ADViewTransitionCubeLeftIn = {
    base: ["anchorPoint", new ADPoint(0, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(90deg) translateZ($width)"],
    to: ["perspective(800) rotateY(0deg) translateZ(0)"]
};
const ADViewTransitionCubeRightOut = {
    base: ["anchorPoint", new ADPoint(0, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg) translateZ(0)"],
    to: ["perspective(800) rotateY(90deg) translateZ($width)"]
};
const ADViewTransitionCubeRightIn = {
    base: ["anchorPoint", new ADPoint(1, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(-90deg) translateZ($width)"],
    to: ["perspective(800) rotateY(0deg) translateZ(0)"]
};
const ADViewTransitionDoorOpenLeftOut = {
    base: ["anchorPoint", new ADPoint(0, 0.5), "zIndex", 1],
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg)"],
    to: ["perspective(800) rotateY(-90deg)"]
};
const ADViewTransitionDoorCloseLeftIn = {
    base: ["anchorPoint", new ADPoint(0, 0.5), "zIndex", 2],
    properties: ["transform"],
    from: ["perspective(800) rotateY(-90deg)"],
    to: ["perspective(800) rotateY(0deg)"]
};
const ADViewTransitionDoorOpenRightOut = {
    base: ["anchorPoint", new ADPoint(1, 0.5), "zIndex", 1],
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg)"],
    to: ["perspective(800) rotateY(90deg)"]
};
const ADViewTransitionDoorCloseRightIn = {
    base: ["anchorPoint", new ADPoint(1, 0.5), "zIndex", 2],
    properties: ["transform"],
    from: ["perspective(800) rotateY(90deg)"],
    to: ["perspective(800) rotateY(0deg)"]
};
const ADViewTransitionRevolveTowardsLeftOut = {
    base: ["anchorPoint", new ADPoint(0, 0.5)],
    properties: ["transform", "opacity"],
    from: ["perspective(800) rotateY(0deg)", 1],
    to: ["perspective(800) rotateY(-90deg)", 0]
};
const ADViewTransitionRevolveTowardsLeftIn = {
    base: ["anchorPoint", new ADPoint(0, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(90deg)"],
    to: ["perspective(800) rotateY(0deg)"]
};
const ADViewTransitionRevolveAwayLeftOut = {
    base: ["anchorPoint", new ADPoint(0, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg)"],
    to: ["perspective(800) rotateY(90deg)"]
};
const ADViewTransitionRevolveAwayLeftIn = {
    base: ["anchorPoint", new ADPoint(0, 0.5)],
    properties: ["transform", "opacity"],
    from: ["perspective(800) rotateY(-90deg)", 0],
    to: ["perspective(800) rotateY(0deg)", 1]
};
const ADViewTransitionRevolveTowardsRightOut = {
    base: ["anchorPoint", new ADPoint(1, 0.5)],
    properties: ["transform", "opacity"],
    from: ["perspective(800) rotateY(0deg)", 1],
    to: ["perspective(800) rotateY(90deg)", 0]
};
const ADViewTransitionRevolveTowardsRightIn = {
    base: ["anchorPoint", new ADPoint(1, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(-90deg)"],
    to: ["perspective(800) rotateY(0deg)"]
};
const ADViewTransitionRevolveAwayRightOut = {
    base: ["anchorPoint", new ADPoint(1, 0.5)],
    properties: ["transform"],
    from: ["perspective(800) rotateY(0deg)"],
    to: ["perspective(800) rotateY(-90deg)"]
};
const ADViewTransitionRevolveAwayRightIn = {
    base: ["anchorPoint", new ADPoint(1, 0.5)],
    properties: ["transform", "opacity"],
    from: ["perspective(800) rotateY(90deg)", 0],
    to: ["perspective(800) rotateY(0deg)", 1]
};
const ADViewTransitionSpinOut = {
    properties: ["transform", "opacity"],
    from: ["perspective(800) rotate(0)", 1],
    to: ["perspective(800) rotate(-180deg)", 0]
};
const ADViewTransitionSpinIn = {
    base: ["zIndex", 1],
    properties: ["transform", "opacity"],
    from: ["perspective(800) rotate(-180deg)", 0],
    to: ["perspective(800) rotate(0)", 1]
};
const ADViewTransitionScaleIn = {
    base: ["zIndex", 1],
    properties: ["transform"],
    from: ["scale(0.01)"],
    to: ["scale(1)"]
};
const ADViewTransitionScaleOut = {
    base: ["zIndex", 1],
    properties: ["transform"],
    from: ["scale(1)"],
    to: ["scale(0.01)"]
};
function ADViewLayerInsertionNotificationHelper(){
    this.callSuper();
    this.views = [];
    document.addEventListener("DOMSubtreeModified", this, true)
}

ADViewLayerInsertionNotificationHelper.prototype.considerView = function(A){
    if (this.views.indexOf(A) == -1) {
        A._ignoreView = false;
        this.views.push(A)
    }
};
ADViewLayerInsertionNotificationHelper.prototype.handleEvent = function(A){
    this.processViews()
};
ADViewLayerInsertionNotificationHelper.prototype.processViews = function(){
    if (this.views.length < 1) {
        return
    }
    var A;
    for (var C = 0; C < this.views.length; ++C) {
        A = this.views[C];
        for (var B = A.superview; B && !A._ignoreView; B = B.superview) {
            if ("_ignoreView" in B) {
                A._ignoreView = true
            }
        }
    }
    while (this.views.length > 0) {
        A = this.views.pop();
        if (A._ignoreView) {
            delete A._ignoreView;
            continue
        }
        delete A._ignoreView;
        A.dispatchNotificationOfLayerInsertionIntoDocument()
    }
};
ADClass(ADViewLayerInsertionNotificationHelper);
ADView.superclass = ADObject;
ADView.synthesizedProperties = ["id", "position", "size", "transform", "anchorPoint", "doubleSided", "zIndex", "opacity", "clipsToBounds", "transitionsEnabled", "transitionsDuration", "hostingLayer", "userInteractionEnabled"];
ADView.cssClassName = "ad-view";
ADView.collectionAccessor = "views";
ADView.layerInsertionNotificationHelper = new ADViewLayerInsertionNotificationHelper();
function ADView(A){
    this.callSuper();
    if (ADUtils.objectIsString(A)) {
        A = document.querySelector(A)
    }
    this.layer = A;
    this.superview = null;
    this.subviews = [];
    this.tracksAllTouchesOnceTouchesBegan = true;
    this.autoresizesSubviews = true;
    this.autoresizingMask = ADViewAutoresizingNone;
    this.layerIsInDocument = false;
    this._position = new ADPoint();
    this._size = new ADSize();
    this._anchorPoint = new ADPoint(0.5, 0.5);
    this._doubleSided = true;
    this._zIndex = 0;
    this._transform = ADUtils.t(0, 0);
    this._clipsToBounds = false;
    this._transitionsEnabled = false;
    this._transitionsDuration = 0.5;
    this._hostingLayer = null;
    this._userInteractionEnabled = false;
    this.usesDeclarativeBacking = (this.layer instanceof Element);
    if (this.usesDeclarativeBacking) {
        this.setupLayer();
        this.setupCSSClasses();
        this.readPropertiesFromLayerComputedStyle(window.getComputedStyle(this.layer));
        this.readPropertiesFromLayerAttributes(this.layer.attributes);
        this.layerWasInsertedIntoDocument()
    }
    else {
        this.createLayer();
        this.setupCSSClasses()
    }
    this.layer.addEventListener("DOMNodeInsertedIntoDocument", this, true);
    this.layer.addEventListener("DOMNodeRemovedFromDocument", this, true);
    this.layer._view = this
}

ADView.prototype.createLayer = function(){
    this.layer = document.createElement("div");
    this.layerWasCreated()
};
ADView.prototype.setupLayer = function(){
    this.lookupViewLayersInLayer(this.hostingLayer);
    this.layerWasCreated()
};
ADView.prototype.lookupViewLayersInLayer = function(F){
    var E = ADUtils.registeredHTMLViewLoadingClasses;
    var G = F.firstElementChild;
    while (G) {
        var C;
        var B = false;
        for (var D = 0; D < E.length; D++) {
            C = E[D];
            if (G.hasClassName(C.cssClassName)) {
                var A = new C(G);
                A._indexInSuperviewSubviews = this.subviews.push(A) - 1;
                A.willMoveToSuperview(this);
                A.superview = this;
                A.didMoveToSuperview();
                B = true;
                break
            }
        }
        if (!B) {
            this.lookupViewLayersInLayer(G)
        }
        G = G.nextElementSibling
    }
};
ADView.prototype.setupCSSClasses = function(){
    var A = this.constructor;
    while (A.superclass) {
        cssClassName = A.cssClassName;
        if (cssClassName) {
            this.layer.addClassName(cssClassName)
        }
        if (A === ADView) {
            break
        }
        A = A.superclass
    }
};
ADView.prototype.readPropertiesFromLayerComputedStyle = function(A){
    this._size.width = parseInt(A.width);
    this._size.height = parseInt(A.height);
    this._position.x = parseInt(A.left);
    this._position.y = parseInt(A.top);
    this._zIndex = parseInt(A.zIndex);
    this._clipsToBounds = (A.overflow == "hidden");
    this._doubleSided = (A.webkitBackfaceVisibility == "visible");
    this._transform = A.webkitTransform
};
ADView.prototype.readPropertiesFromLayerAttributes = function(A){
    var D, B;
    for (var C = 0; C < A.length; C++) {
        D = A.item(C);
        B = D.name;
        if (B.indexOf("ad-") == 0) {
            this.setValueForAttribute(D.value, B)
        }
    }
};
ADView.prototype.setValueForAttribute = function(B, A){
};
ADView.prototype.toString = function(){
    return [this.constructor.name, "[", this._size.width, "x", this._size.height, "@", this._position.x, ",", this._position.y, "]"].join("")
};
ADView.prototype.getId = function(){
    return this.layer.id
};
ADView.prototype.setId = function(A){
    this.layer.id = A
};
ADView.prototype.setPosition = function(A){
    if (this._position.equals(A)) {
        return
    }
    this._position = A;
    this.updateLayerTransform()
};
ADView.prototype.setSize = function(A){
    if (this._size.equals(A)) {
        return
    }
    var B = this._size.copy();
    this._size = A;
    this.layer.style.width = A.width + "px";
    this.layer.style.height = A.height + "px";
    if (this.autoresizesSubviews && !B.equals(ADSizeZeroSize)) {
        this.resizeSubviewsWithOldSize(B)
    }
};
ADView.prototype.setTransform = function(A){
    this._transform = A;
    this.updateLayerTransform()
};
ADView.prototype.setAnchorPoint = function(A){
    this._anchorPoint = A;
    this.layer.style.webkitTransformOrigin = Math.round(A.x * 100) + "% " + Math.round(A.y * 100) + "% 0"
};
ADView.prototype.setDoubleSided = function(A){
    this._doubleSided = A;
    this.layer.style.webkitBackfaceVisibility = A ? "visible" : "hidden"
};
ADView.prototype.setZIndex = function(A){
    this._zIndex = A;
    this.layer.style.zIndex = A
};
ADView.prototype.updateLayerTransform = function(){
    this.layer.style.webkitTransform = ADUtils.t(this._position.x, this._position.y) + this._transform
};
ADView.prototype.getOpacity = function(){
    return Number(window.getComputedStyle(this.layer).opacity)
};
ADView.prototype.setOpacity = function(A){
    this.layer.style.opacity = A
};
ADView.prototype.setTransitionsEnabled = function(A){
    if (A) {
        this.layer.style.webkitTransitionProperty = "-webkit-transform, opacity";
        this.layer.style.webkitTransitionDuration = this._transitionsDuration + "s"
    }
    else {
        this.layer.style.webkitTransitionDuration = "0s"
    }
    this._transitionsEnabled = A
};
ADView.prototype.setTransitionsDuration = function(A){
    this.layer.style.webkitTransitionDuration = A + "s";
    this._transitionsDuration = A
};
ADView.prototype.setClipsToBounds = function(A){
    this._clipsToBounds = A;
    this.layer.style.overflow = A ? "hidden" : "visible"
};
ADView.prototype.getHostingLayer = function(){
    return (this._hostingLayer != null) ? this._hostingLayer : this.layer
};
ADView.prototype.addSubview = function(A){
    return this.insertSubviewAtIndex(A, this.subviews.length)
};
ADView.prototype.removeFromSuperview = function(){
    if (this.superview == null) {
        return
    }
    this.willMoveToSuperview(null);
    this.superview.willRemoveSubview(this);
    var A = this._indexInSuperviewSubviews;
    this.superview.subviews.splice(A, 1);
    for (var B = A; B < this.superview.subviews.length; B++) {
        this.superview.subviews[B]._indexInSuperviewSubviews = B
    }
    this.layer.parentNode.removeChild(this.layer);
    this.superview = null;
    this.didMoveToSuperview()
};
ADView.prototype.insertSubviewAtIndex = function(D, A){
    if (A > this.subviews.length) {
        return
    }
    if (D.superview === this) {
        A--
    }
    D.removeFromSuperview();
    D.willMoveToSuperview(this);
    this.subviews.splice(A, 0, D);
    D._indexInSuperviewSubviews = A;
    for (var B = A + 1; B < this.subviews.length; B++) {
        this.subviews[B]._indexInSuperviewSubviews = B
    }
    var C = this.hostingLayer;
    if (A == this.subviews.length - 1) {
        C.appendChild(D.layer)
    }
    else {
        C.insertBefore(D.layer, this.subviews[A + 1].layer)
    }
    D.superview = this;
    D.didMoveToSuperview();
    this.didAddSubview(D);
    return D
};
ADView.prototype.insertSubviewAfterSubview = function(B, A){
    if (A.superview !== this) {
        return
    }
    var C = A._indexInSuperviewSubviews + 1;
    if (C < this.subviews.length) {
        this.insertSubviewAtIndex(B, C)
    }
    else {
        this.addSubview(B)
    }
    return B
};
ADView.prototype.insertSubviewBeforeSubview = function(B, A){
    if (A.superview !== this) {
        return
    }
    return this.insertSubviewAtIndex(B, A._indexInSuperviewSubviews)
};
ADView.prototype.exchangeSubviewsAtIndices = function(B, A){
    if (B >= this.subviews.length || A >= this.subviews.length) {
        return
    }
    var D = this.subviews[B];
    var G = this.subviews[A];
    this.subviews[B] = G;
    this.subviews[A] = D;
    D._indexInSuperviewSubviews = A;
    G._indexInSuperviewSubviews = B;
    var H = D.layer;
    var F = G.layer;
    var I = this.hostingLayer;
    var E = H.nextSibling;
    var C = F.nextSibling;
    if (E != null) {
        I.insertBefore(F, E)
    }
    else {
        I.appendChild(F)
    }
    if (C != null) {
        I.insertBefore(H, C)
    }
    else {
        I.appendChild(H)
    }
};
ADView.prototype.isDescendantOfView = function(B){
    var C = false;
    var A = this;
    while (A.superview != null) {
        if (A.superview === B) {
            C = true;
            break
        }
        A = A.superview
    }
    return C
};
ADView.prototype.layerWasCreated = function(){
};
ADView.prototype.willMoveToSuperview = function(A){
};
ADView.prototype.didMoveToSuperview = function(){
};
ADView.prototype.didAddSubview = function(A){
};
ADView.prototype.willRemoveSubview = function(A){
};
ADView.prototype.layerWasInsertedIntoDocument = function(){
    this.layerIsInDocument = true;
    if (this.usesDeclarativeBacking) {
        var A = window.getComputedStyle(this.layer);
        if (isNaN(this._size.width)) {
            this._size.width = parseInt(A.width);
            this._size.height = parseInt(A.height)
        }
        if (isNaN(this._position.x)) {
            this._position.x = parseInt(A.left);
            this._position.y = parseInt(A.top)
        }
    }
};
ADView.prototype.layerWasRemovedFromDocument = function(){
};
ADView.prototype.handleLayerInsertionIntoDocument = function(A){
    if (A.target !== this.layer || this.layer.ownerDocument !== document || this.layerIsInDocument) {
        return
    }
    A.stopPropagation();
    ADView.layerInsertionNotificationHelper.considerView(this)
};
ADView.prototype.dispatchNotificationOfLayerInsertionIntoDocument = function(){
    var C = [];
    var A = [].concat(this.subviews);
    var D = 0;
    while (A.length > 0) {
        var E = A.shift();
        if (typeof(E) === "number") {
            D = E
        }
        else {
            if (C[D] === undefined) {
                C[D] = []
            }
            C[D].push(E);
            A = A.concat(D + 1, E.subviews)
        }
    }
    var B;
    while (C.length > 0) {
        B = C.pop();
        while (B.length > 0) {
            B.pop().layerWasInsertedIntoDocument()
        }
    }
    this.layerWasInsertedIntoDocument()
};
ADView.prototype.handleLayerRemovalFromDocument = function(A){
    if (A.target === this.layer && this.layer.ownerDocument === document) {
        A.stopPropagation();
        this.layerIsInDocument = false;
        this.layerWasRemovedFromDocument()
    }
};
ADView.prototype.setUserInteractionEnabled = function(A){
    if (this._userInteractionEnabled == A) {
        return
    }
    this.layer[(A ? "add" : "remove") + "EventListener"](ADStartEvent, this, false);
    this._userInteractionEnabled = A
};
ADView.prototype.handleEvent = function(A){
    switch (A.type) {
        case ADStartEvent:
            this.touchesBegan(A);
            break;
        case ADMoveEvent:
            this.touchesMoved(A);
            break;
        case ADEndEvent:
            this.touchesEnded(A);
            break;
        case "touchcancel":
            this.touchesCancelled(A);
            break;
        case "DOMNodeInsertedIntoDocument":
            this.handleLayerInsertionIntoDocument(A);
            break;
        case "DOMNodeRemovedFromDocument":
            this.handleLayerRemovalFromDocument(A);
            break
    }
};
ADView.prototype.touchesBegan = function(A){
    if (this.tracksAllTouchesOnceTouchesBegan) {
        window.addEventListener(ADMoveEvent, this, true);
        window.addEventListener(ADEndEvent, this, true);
        window.addEventListener("touchcancel", this, true)
    }
};
ADView.prototype.touchesMoved = function(A){
    A.preventDefault()
};
ADView.prototype.touchesEnded = function(A){
    window.removeEventListener(ADMoveEvent, this, true);
    window.removeEventListener(ADEndEvent, this, true);
    window.removeEventListener("touchcancel", this, true)
};
ADView.prototype.touchesCancelled = function(A){
    window.removeEventListener(ADMoveEvent, this, true);
    window.removeEventListener(ADEndEvent, this, true);
    window.removeEventListener("touchcancel", this, true)
};
ADView.prototype.pointInside = function(A){
    return (A.x >= 0 && A.x <= this.size.width && A.y >= 0 && A.y <= this.size.height)
};
const ADViewAutoresizingNone = 0;
const ADViewAutoresizingFlexibleLeftMargin = 1 << 0;
const ADViewAutoresizingFlexibleWidth = 1 << 1;
const ADViewAutoresizingFlexibleRightMargin = 1 << 2;
const ADViewAutoresizingFlexibleTopMargin = 1 << 3;
const ADViewAutoresizingFlexibleHeight = 1 << 4;
const ADViewAutoresizingFlexibleBottomMargin = 1 << 5;
ADView.prototype.resizeSubviewsWithOldSize = function(B){
    for (var A = 0; A < this.subviews.length; A++) {
        this.subviews[A].resizeWithOldSuperviewSize(B)
    }
};
ADView.prototype.resizeWithOldSuperviewSize = function(F){
    var A = this._position.copy();
    var E = this._size.copy();
    var C = this.autoresizingMask;
    var D = (C & ADViewAutoresizingFlexibleLeftMargin) + (C & ADViewAutoresizingFlexibleWidth) + (C & ADViewAutoresizingFlexibleRightMargin);
    switch (D) {
        case ADViewAutoresizingNone:
            break;
        case ADViewAutoresizingFlexibleLeftMargin:
            A.x += this.superview._size.width - F.width;
            break;
        case ADViewAutoresizingFlexibleWidth:
            E.width = this.superview._size.width - (F.width - this._size.width);
            break;
        case ADViewAutoresizingFlexibleLeftMargin | ADViewAutoresizingFlexibleWidth:
            var H = (F.width - this._size.width - this._position.x);
            A.x = (this._position.x / (F.width - H)) * (this.superview._size.width - H);
            E.width = this.superview._size.width - A.x - H;
            break;
        case ADViewAutoresizingFlexibleRightMargin:
            break;
        case ADViewAutoresizingFlexibleLeftMargin | ADViewAutoresizingFlexibleRightMargin:
            var H = (F.width - this._size.width - this._position.x);
            A.x += (this.superview._size.width - F.width) * (this.position.x / (this.position.x + H));
            break;
        case ADViewAutoresizingFlexibleRightMargin | ADViewAutoresizingFlexibleWidth:
            var H = (F.width - this._size.width - this._position.x);
            scaled_right_margin = (H / (F.width - this._position.x)) * (this.superview._size.width - this._position.x);
            E.width = this.superview._size.width - A.x - scaled_right_margin;
            break;
        case ADViewAutoresizingFlexibleLeftMargin | ADViewAutoresizingFlexibleWidth | ADViewAutoresizingFlexibleRightMargin:
            A.x = (this._position.x / F.width) * this.superview._size.width;
            E.width = (this._size.width / F.width) * this.superview._size.width;
            break
    }
    var B = (C & ADViewAutoresizingFlexibleTopMargin) + (C & ADViewAutoresizingFlexibleHeight) + (C & ADViewAutoresizingFlexibleBottomMargin);
    switch (B) {
        case ADViewAutoresizingNone:
            break;
        case ADViewAutoresizingFlexibleTopMargin:
            A.y += this.superview._size.height - F.height;
            break;
        case ADViewAutoresizingFlexibleHeight:
            E.height = this.superview._size.height - (F.height - this._size.height);
            break;
        case ADViewAutoresizingFlexibleTopMargin | ADViewAutoresizingFlexibleHeight:
            var G = (F.height - this._size.height - this._position.y);
            A.y = (this._position.y / (F.height - G)) * (this.superview._size.height - G);
            E.height = this.superview._size.height - A.y - G;
            break;
        case ADViewAutoresizingFlexibleBottomMargin:
            break;
        case ADViewAutoresizingFlexibleTopMargin | ADViewAutoresizingFlexibleBottomMargin:
            var G = (F.height - this._size.height - this._position.y);
            A.y += (this.superview._size.height - F.height) * (this.position.y / (this.position.y + G));
            break;
        case ADViewAutoresizingFlexibleBottomMargin | ADViewAutoresizingFlexibleHeight:
            var G = (F.height - this._size.height - this._position.y);
            scaled_bottom_margin = (G / (F.height - this._position.y)) * (this.superview._size.height - this._position.y);
            E.height = this.superview._size.height - A.y - scaled_bottom_margin;
            break;
        case ADViewAutoresizingFlexibleTopMargin | ADViewAutoresizingFlexibleHeight | ADViewAutoresizingFlexibleBottomMargin:
            A.y = (this._position.y / F.height) * this.superview._size.height;
            E.height = (this._size.height / F.height) * this.superview._size.height;
            break
    }
    this.position = A;
    this.size = E
};
const ADViewPropertyMapping = {
    opacity: "opacity",
    transform: "-webkit-transform",
    position: "-webkit-transform",
    anchorPoint: "-webkit-transform-origin",
    doubleSided: "-webkit-backface-visibility",
    zIndex: "z-index"
};
ADView.prototype.cssPropertyNameForJSProperty = function(A){
    return ADViewPropertyMapping[A]
};
ADView.prototype.applyTransition = function(B, D){
    if (B === null) {
        return null
    }
    var C = new ADTransition(B);
    C.target = this;
    if (D) {
        var E = C.from;
        C.from = C.to;
        C.to = E
    }
    if (B.base) {
        for (var A = 0; A < B.base.length; A += 2) {
            this[B.base[A]] = B.base[A + 1]
        }
    }
    C.start();
    return C
};
ADView.prototype.descendantViewsOfClass = function(A){
    return ADUtils.viewsForClassAndNode(A, this.layer)
};
ADView.getViewById = function(B){
    var A = document.getElementById(B);
    return (A && !ADUtils.objectIsUndefined(A._view)) ? A._view : null
};
ADView.initialize = function(){
    var A = this;
    if (this.hasOwnProperty("cssClassName")) {
        this.__defineGetter__("views", function(){
            return ADUtils.viewsForClassAndNode(A, document)
        });
        ADUtils.registerClassForHTMLViewLoading(this);
        if (A.hasOwnProperty("collectionAccessor")) {
            ADView.prototype.__defineGetter__(this.collectionAccessor, function(){
                return this.descendantViewsOfClass(A)
            })
        }
    }
};
ADClass(ADView);
ADRootView.superclass = ADView;
ADRootView.synthesizedProperties = ["disablesDefaultScrolling"];
ADRootView.cssClassName = "ad-root-view";
function ADRootView(A){
    this.callSuper(A);
    this.disablesDefaultScrolling = true;
    if (this.layer === document.body) {
        this.size = new ADSize(window.innerWidth, window.innerHeight);
        this.layer.removeClassName("ad-view");
        window.addEventListener("orientationchange", this, false)
    }
}

ADRootView.prototype.setDisablesDefaultScrolling = function(A){
    this.layer[A ? "addEventListener" : "removeEventListener"](ADMoveEvent, ADUtils.preventEventDefault, false);
    this._disablesDefaultScrolling = A
};
ADRootView.prototype.handleEvent = function(A){
    this.callSuper(A);
    if (A.type == "orientationchange") {
        var B = this;
        setTimeout(function(){
            B.size = new ADSize(window.innerWidth, window.innerHeight);
            window.scrollTo(0, 0)
        }, 0)
    }
};
ADRootView._sharedRoot = null;
ADRootView.__defineGetter__("sharedRoot", function(){
    if (ADRootView._sharedRoot === null) {
        ADRootView._sharedRoot = new ADRootView(document.body)
    }
    return ADRootView._sharedRoot
});
ADRootView.__defineSetter__("sharedRoot", function(A){
    ADRootView._sharedRoot = A
});
ADClass(ADRootView);
const ADScrollIndicatorThickness = 7;
const ADScrollIndicatorEndSize = 3;
const ADScrollIndicatorTypeHorizontal = "horizontal";
const ADScrollIndicatorTypeVertical = "vertical";
ADScrollIndicator.superclass = ADView;
ADScrollIndicator.synthesizedProperties = ["visible", "width", "height", "style"];
function ADScrollIndicator(A){
    this.callSuper();
    this.type = A;
    this.layer.addClassName(A);
    this._visible = false;
    this._width = ADScrollIndicatorThickness;
    this._height = ADScrollIndicatorThickness;
    this.position = new ADPoint(-ADScrollIndicatorThickness, -ADScrollIndicatorThickness);
    this.positionBeforeHide = this.position;
    this.lastPositionUpdateInHide = false;
    this._style = ADScrollViewIndicatorStyleDefault;
    this.visible = false
}

ADScrollIndicator.prototype.createLayer = function(){
    this.layer = document.createElement("div");
    this.layer.addClassName("ad-scroll-indicator");
    this.layer.addEventListener("webkitTransitionEnd", this, false);
    this.start = this.layer.appendChild(document.createElement("div"));
    this.middle = this.layer.appendChild(document.createElement("img"));
    this.end = this.layer.appendChild(document.createElement("div"))
};
ADScrollIndicator.prototype.setPosition = function(A){
    A.x = Math.round(A.x);
    A.y = Math.round(A.y);
    this.callSuper(A);
    this.lastPositionUpdateInHide = false
};
ADScrollIndicator.prototype.setSize = function(A){
    this.width = A.width;
    this.height = A.height;
    this._size = A
};
ADScrollIndicator.prototype.setStyle = function(B){
    this._style = B;
    this.layer.removeClassName(this._style);
    this.layer.addClassName(this._style);
    var A = (this.type === ADScrollIndicatorTypeHorizontal) ? "Horizontal" : "Vertical";
    var C = "Default";
    switch (B) {
        case ADScrollViewIndicatorStyleWhite:
            C = "White";
            break;
        case ADScrollViewIndicatorStyleBlack:
            C = "Black";
            break
    }
    this.middle.src = ADUtils.assetsPath + "scrollindicator/UIScrollerIndicator" + C + A + "Middle" + (HiDPI ? "@2x" : "") + ".png"
};
ADScrollIndicator.prototype.setWidth = function(A){
    this.middle.style.webkitTransform = "translate3d(0,0,0) scale(" + (A - ADScrollIndicatorEndSize * 2) + ",1)";
    this.end.style.webkitTransform = "translate3d(" + (A - ADScrollIndicatorEndSize) + "px,0,0)";
    this._width = A
};
ADScrollIndicator.prototype.setHeight = function(A){
    this.middle.style.webkitTransform = "translate3d(0,0,0) scale(1," + (A - ADScrollIndicatorEndSize * 2) + ")";
    this.end.style.webkitTransform = "translate3d(0," + (A - ADScrollIndicatorEndSize) + "px,0)";
    this._height = A
};
ADScrollIndicator.prototype.setVisible = function(A){
    if (A) {
        this.fading = false;
        this.opacity = 1;
        this.position = this.lastPositionUpdateInHide ? this.positionBeforeHide : this.position
    }
    else {
        if (!this.fading) {
            this.fading = true;
            this.opacity = 0;
            this.lastPositionUpdateInHide = true;
            this.positionBeforeHide = this.position
        }
    }
    this._visible = A
};
ADScrollIndicator.prototype.flash = function(){
    this.flashing = true
};
ADScrollIndicator.prototype.handleEvent = function(A){
    if (A.type != "webkitTransitionEnd") {
        return
    }
    this.callSuper(A);
    if (this.flashing) {
        this.flashing = false
    }
    else {
        if (this.fading) {
            this.position = new ADPoint(-ADScrollIndicatorThickness, -ADScrollIndicatorThickness);
            this.fading = false
        }
    }
};
ADClass(ADScrollIndicator);
const ADScrollViewWillBeginDragging = "scrollViewWillBeginDragging";
const ADScrollViewDidEndScrollingAnimation = "scrollViewDidEndScrollingAnimation";
const ADScrollViewDidScroll = "scrollViewDidScroll";
const ADScrollViewDidEndDragging = "scrollViewDidEndDragging";
const ADScrollViewWillBeginDecelerating = "scrollViewWillBeginDecelerating";
const ADScrollViewDidEndDecelerating = "scrollViewDidEndDecelerating";
const ADScrollViewMinimumTrackingForDrag = 5;
const ADScrollViewPagingTransitionDuration = "0.25s";
const ADScrollViewMinIndicatorLength = 34;
const ADScrollViewAcceleration = 15;
const ADScrollViewMaxTimeForTrackingDataPoints = 100;
const ADScrollViewDecelerationFrictionFactor = 0.95;
const ADScrollViewDesiredAnimationFrameRate = 1000 / 60;
const ADScrollViewMinimumVelocity = 0.05;
const ADScrollViewPenetrationDeceleration = 0.08;
const ADScrollViewPenetrationAcceleration = 0.15;
const ADScrollViewMinVelocityForDeceleration = 1;
const ADScrollViewMinVelocityForDecelerationWithPaging = 4;
const ADScrollViewMaxVelocityForBouncingWithPaging = 20;
const ADScrollViewContentTouchesDelay = 150;
const ADScrollViewAutomatedContentSize = -1;
const ADScrollViewIndicatorStyleDefault = "indicator-default";
const ADScrollViewIndicatorStyleBlack = "indicator-black";
const ADScrollViewIndicatorStyleWhite = "indicator-white";
ADScrollView.superclass = ADView;
ADScrollView.synthesizedProperties = ["contentOffset", "contentSize", "indicatorStyle", "scrollEnabled", "scrollIndicatorInsets", "horizontalScrollIndicator", "verticalScrollIndicator", "tracking"];
ADScrollView.cssClassName = "ad-scroll-view";
ADScrollView.collectionAccessor = "scrollViews";
function ADScrollView(A){
    this._contentOffset = new ADPoint();
    this._contentSize = ADScrollViewAutomatedContentSize;
    this.adjustedContentSize = new ADSize();
    this._tracking = false;
    this.dragging = false;
    this.horizontalScrollEnabled = true;
    this.verticalScrollEnabled = true;
    this.decelerating = false;
    this.decelerationTimer = null;
    this._indicatorStyle = "";
    this.showsHorizontalScrollIndicator = true;
    this.showsVerticalScrollIndicator = true;
    this.scrollIndicatorsNeedFlashing = false;
    this._scrollIndicatorInsets = new ADEdgeInsets(0, 0, 0, 0);
    this.pagingEnabled = false;
    this.bounces = true;
    this.delegate = null;
    this.delaysContentTouches = true;
    this.canCancelContentTouches = true;
    this._scrollEnabled = true;
    this._setContentOffsetAnimatedCalledFromSetter = false;
    this.beginTouchesInContentTimer = null;
    this.callSuper(A);
    this.userInteractionEnabled = true;
    this.layer.addEventListener("webkitTransitionEnd", this, false);
    this.hostingLayer.addEventListener("webkitTransitionEnd", this, false);
    this.layer.addEventListener(ADStartEvent, this, true);
    this.layer.addEventListener("focus", this, true);
    this.shouldPreventSelectElementFocus = false;
    this.eventsToIgnoreDueToDispatching = 0
}

ADScrollView.prototype.createLayer = function(){
    this.callSuper();
    this._hostingLayer = this.layer.appendChild(document.createElement("div"));
    this._hostingLayer.className = "hosting-layer";
    this.clipsToBounds = true;
    this.indicatorStyle = ADScrollViewIndicatorStyleDefault
};
ADScrollView.prototype.setupLayer = function(){
    this.callSuper();
    this._hostingLayer = this.layer.querySelector(".hosting-layer");
    var A = new WebKitCSSMatrix(window.getComputedStyle(this._hostingLayer).webkitTransform);
    this._contentOffset.x = -A.e;
    this._contentOffset.y = -A.f;
    this.indicatorStyle = this.layer.hasAttribute("ad-indicator-style") ? this.layer.getAttribute("ad-indicator-style") : ADScrollViewIndicatorStyleDefault
};
ADScrollView.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-delays-content-touches":
            this.delaysContentTouches = !(B == "false");
            break;
        case "ad-can-cancel-content-touches":
            this.canCancelContentTouches = !(B == "false");
            break;
        case "ad-horizontal-scroll-enabled":
            this.horizontalScrollEnabled = !(B == "false");
            break;
        case "ad-vertical-scroll-enabled":
            this.verticalScrollEnabled = !(B == "false");
            break;
        case "ad-shows-horizontal-scroll-indicator":
            this.showsHorizontalScrollIndicator = (B != "false");
            break;
        case "ad-shows-vertical-scroll-indicator":
            this.showsVerticalScrollIndicator = (B != "false");
            break;
        case "ad-bounces":
            this.bounces = (B != "false");
            break;
        case "ad-paging-enabled":
            this.pagingEnabled = (B == "true");
            break;
        case "ad-scroll-indicator-inset-left":
            this._scrollIndicatorInsets.left = parseInt(B);
            break;
        case "ad-scroll-indicator-inset-top":
            this._scrollIndicatorInsets.top = parseInt(B);
            break;
        case "ad-scroll-indicator-inset-right":
            this._scrollIndicatorInsets.right = parseInt(B);
            break;
        case "ad-scroll-indicator-inset-bottom":
            this._scrollIndicatorInsets.bottom = parseInt(B);
            break;
        case "ad-indicator-style":
            this.indicatorStyle = (B == "") ? ADScrollViewIndicatorStyleDefault : B;
            break;
        default:
            this.callSuper(B, A)
    }
};
ADScrollView.prototype.setSize = function(A){
    this.callSuper(A);
    this.adjustContentSize(true)
};
ADScrollView.prototype.setScrollEnabled = function(A){
    this._scrollEnabled = A;
    if (!A) {
        this.interruptTrackingInteraction()
    }
};
ADScrollView.prototype.setContentOffset = function(A){
    this._setContentOffsetAnimatedCalledFromSetter = true;
    this.setContentOffsetAnimated(A, false)
};
ADScrollView.prototype.setContentOffsetAnimated = function(B, A){
    if (B.equals(this._contentOffset)) {
        return
    }
    this._contentOffset = B;
    if (!this.dragging && !this.decelerating) {
        this.adjustContentSize(false);
        this._contentOffset.x = Math.max(Math.min(this.maxPoint.x, this._contentOffset.x), 0);
        this._contentOffset.y = Math.max(Math.min(this.maxPoint.y, this._contentOffset.y), 0)
    }
    this.hostingLayer.style.webkitTransform = ADUtils.t(-this._contentOffset.x, -this._contentOffset.y);
    if (A) {
        this.scrollTransitionsNeedRemoval = true;
        this.hostingLayer.style.webkitTransitionDuration = ADScrollViewPagingTransitionDuration
    }
    else {
        this.didScroll(false)
    }
    if (!A) {
        if (this.horizontalScrollEnabled && this.showsHorizontalScrollIndicator) {
            this.updateHorizontalScrollIndicator()
        }
        if (this.verticalScrollEnabled && this.showsVerticalScrollIndicator) {
            this.updateVerticalScrollIndicator()
        }
    }
    if (!this._setContentOffsetAnimatedCalledFromSetter) {
        this.notifyPropertyChange("contentOffset")
    }
    this._setContentOffsetAnimatedCalledFromSetter = false
};
ADScrollView.prototype.snapContentOffsetToBounds = function(A){
    var C = false;
    var B = new ADPoint();
    if (this.pagingEnabled && A) {
        B.x = Math.round(this._contentOffset.x / this._size.width) * this._size.width;
        B.y = Math.round(this._contentOffset.y / this._size.height) * this._size.height;
        C = true
    }
    else {
        if (this.bounces) {
            B.x = Math.max(Math.min(this.maxPoint.x, this._contentOffset.x), 0);
            B.y = Math.max(Math.min(this.maxPoint.y, this._contentOffset.y), 0);
            C = (B.x != this._contentOffset.x || B.y != this._contentOffset.y)
        }
    }
    if (C) {
        this.setContentOffsetAnimated(B, A)
    }
};
ADScrollView.prototype.getContentSize = function(){
    var B = this._contentSize;
    if (B === ADScrollViewAutomatedContentSize) {
        B = new ADSize(this._hostingLayer.offsetWidth, this._hostingLayer.offsetHeight);
        if (this.subviews.length) {
            for (var A = 0; A < this.subviews.length; A++) {
                var C = this.subviews[A];
                B.width = Math.max(B.width, C.position.x + C.size.width);
                B.height = Math.max(B.height, C.position.y + C.size.height)
            }
        }
    }
    return B
};
ADScrollView.prototype.setContentSize = function(A){
    this._contentSize = A;
    this.adjustContentSize(false)
};
ADScrollView.prototype.adjustContentSize = function(A){
    if (A) {
        var B = new ADPoint();
        if (this.adjustedContentSize.width != 0) {
            B.x = this._contentOffset.x / this.adjustedContentSize.width
        }
        if (this.adjustedContentSize.height != 0) {
            B.y = this._contentOffset.y / this.adjustedContentSize.height
        }
    }
    this.adjustedContentSize.width = Math.max(this._size.width, this.contentSize.width);
    this.adjustedContentSize.height = Math.max(this._size.height, this.contentSize.height);
    this.maxPoint = new ADPoint(this.adjustedContentSize.width - this._size.width, this.adjustedContentSize.height - this._size.height);
    if (A) {
        this.contentOffset = new ADPoint(Math.min(B.x * this.adjustedContentSize.width, this.maxPoint.x), Math.min(B.y * this.adjustedContentSize.height, this.maxPoint.y))
    }
};
ADScrollView.prototype.setIndicatorStyle = function(A){
    this._indicatorStyle = A;
    if (this.hasOwnProperty("_horizontalScrollIndicator")) {
        this.horizontalScrollIndicator.style = A
    }
    if (this.hasOwnProperty("_verticalScrollIndicator")) {
        this.verticalScrollIndicator.style = A
    }
};
ADScrollView.prototype.setScrollIndicatorInsets = function(A){
    this._scrollIndicatorInsets = A;
    if (this.hasOwnProperty("_horizontalScrollIndicator") && this.horizontalScrollIndicator.visible) {
        this.updateHorizontalScrollIndicator()
    }
    if (this.hasOwnProperty("_verticalScrollIndicator") && this.verticalScrollIndicator.visible) {
        this.updateVerticalScrollIndicator()
    }
};
ADScrollView.prototype.createHorizontalScrollIndicator = function(){
    this._horizontalScrollIndicator = new ADScrollIndicator(ADScrollIndicatorTypeHorizontal);
    this.layer.appendChild(this._horizontalScrollIndicator.layer);
    this._horizontalScrollIndicator.style = this._indicatorStyle
};
ADScrollView.prototype.createVerticalScrollIndicator = function(){
    this._verticalScrollIndicator = new ADScrollIndicator(ADScrollIndicatorTypeVertical);
    this.layer.appendChild(this._verticalScrollIndicator.layer);
    this._verticalScrollIndicator.style = this._indicatorStyle
};
ADScrollView.prototype.getHorizontalScrollIndicator = function(){
    if (!this.hasOwnProperty("_horizontalScrollIndicator")) {
        this.createHorizontalScrollIndicator()
    }
    return this._horizontalScrollIndicator
};
ADScrollView.prototype.getVerticalScrollIndicator = function(){
    if (!this.hasOwnProperty("_verticalScrollIndicator")) {
        this.createVerticalScrollIndicator()
    }
    return this._verticalScrollIndicator
};
ADScrollView.prototype.updateHorizontalScrollIndicator = function(){
    var C = (this.verticalScrollEnabled && this.showsVerticalScrollIndicator) ? ADScrollIndicatorEndSize * 2 : 1;
    var E = this._size.width - this._scrollIndicatorInsets.left - this._scrollIndicatorInsets.right - C;
    var B = Math.max(ADScrollViewMinIndicatorLength, Math.round((this._size.width / this.adjustedContentSize.width) * E));
    var A = (this._contentOffset.x / (this.adjustedContentSize.width - this._size.width)) * (E - C - B) + this._scrollIndicatorInsets.left;
    var D = this._size.height - ADScrollIndicatorThickness - 1 - this._scrollIndicatorInsets.bottom;
    if (this._contentOffset.x < 0) {
        B = Math.round(Math.max(B + this._contentOffset.x, ADScrollIndicatorThickness));
        A = 1 + this._scrollIndicatorInsets.left
    }
    else {
        if (this._contentOffset.x > this.maxPoint.x) {
            B = Math.round(Math.max(B + this.adjustedContentSize.width - this._size.width - this._contentOffset.x, ADScrollIndicatorThickness));
            A = this._size.width - B - C - this._scrollIndicatorInsets.right
        }
    }
    this.horizontalScrollIndicator.position = new ADPoint(A, D);
    this.horizontalScrollIndicator.width = B
};
ADScrollView.prototype.updateVerticalScrollIndicator = function(){
    var D = (this.horizontalScrollEnabled && this.showsHorizontalScrollIndicator) ? ADScrollIndicatorEndSize * 2 : 1;
    var C = this._size.height - this._scrollIndicatorInsets.top - this._scrollIndicatorInsets.bottom - D;
    var B = Math.max(ADScrollViewMinIndicatorLength, Math.round((this._size.height / this.adjustedContentSize.height) * C));
    var A = this._size.width - ADScrollIndicatorThickness - 1 - this._scrollIndicatorInsets.right;
    var E = (this._contentOffset.y / (this.adjustedContentSize.height - this._size.height)) * (C - D - B) + this._scrollIndicatorInsets.top;
    if (this._contentOffset.y < 0) {
        B = Math.round(Math.max(B + this._contentOffset.y, ADScrollIndicatorThickness));
        E = 1 + this._scrollIndicatorInsets.top
    }
    else {
        if (this._contentOffset.y > this.maxPoint.y) {
            B = Math.round(Math.max(B + this.adjustedContentSize.height - this._size.height - this._contentOffset.y, ADScrollIndicatorThickness));
            E = this._size.height - B - D - this._scrollIndicatorInsets.bottom
        }
    }
    this.verticalScrollIndicator.position = new ADPoint(A, E);
    this.verticalScrollIndicator.height = B
};
ADScrollView.prototype.flashScrollIndicators = function(A){
    if (A) {
        this.scrollIndicatorsNeedFlashing = true;
        return
    }
    if (this.horizontalScrollEnabled && this.showsHorizontalScrollIndicator && (this.adjustedContentSize.width > this._size.width)) {
        this.updateHorizontalScrollIndicator();
        this.horizontalScrollIndicator.flash()
    }
    if (this.verticalScrollEnabled && this.showsVerticalScrollIndicator && (this.adjustedContentSize.height > this._size.height)) {
        this.updateVerticalScrollIndicator();
        this.verticalScrollIndicator.flash()
    }
};
ADScrollView.prototype.hideScrollIndicators = function(){
    if (this.hasOwnProperty("_horizontalScrollIndicator")) {
        this.horizontalScrollIndicator.visible = false
    }
    if (this.hasOwnProperty("_verticalScrollIndicator")) {
        this.verticalScrollIndicator.visible = false
    }
};
ADScrollView.prototype.showHorizontalScrollIndicator = function(){
    this.horizontalScrollIndicator.visible = true
};
ADScrollView.prototype.showVerticalScrollIndicator = function(){
    this.verticalScrollIndicator.visible = true
};
ADScrollView.prototype.handleEvent = function(A){
    if (A.type == "focus" && this.shouldPreventSelectElementFocus) {
        A.stopPropagation();
        A.preventDefault();
        this.originalTarget.blur();
        return
    }
    if (this.eventsToIgnoreDueToDispatching > 0) {
        this.eventsToIgnoreDueToDispatching--;
        return
    }
    if (A.type == ADStartEvent && A.eventPhase == Event.CAPTURING_PHASE && !A.hasOwnProperty("_synthetic")) {
        this.touchesBeganInCapturePhase(A)
    }
    else {
        if (A.type == "webkitTransitionEnd") {
            this.transitionEnded(A)
        }
        else {
            if (A.type != "touchcancel" || !A.hasOwnProperty("_synthetic")) {
                this.callSuper(A)
            }
        }
    }
};
ADScrollView.prototype.touchesBeganInCapturePhase = function(A){
    if (!this.delaysContentTouches || !this._scrollEnabled || A.hasOwnProperty("_synthetic")) {
        return
    }
    A.stopPropagation();
    this.beginTracking(A)
};
ADScrollView.prototype.touchesBegan = function(A){
    this.beginTracking(A)
};
ADScrollView.prototype.touchesMoved = function(D){
    this.lastKnownTouchPosition = ADPoint.fromEvent(D);
    if (this.contentTouchesCouldNotBeCancelled) {
        return
    }
    this.callSuper(D);
    this.touchesHaveMoved = true;
    var C = ADPoint.fromEventInElement(D, this.layer);
    var F = C.x - this.startTouchPosition.x;
    var E = C.y - this.startTouchPosition.y;
    if (!this.dragging) {
        if ((Math.abs(F) >= ADScrollViewMinimumTrackingForDrag && this.horizontalScrollEnabled) || (Math.abs(E) >= ADScrollViewMinimumTrackingForDrag && this.verticalScrollEnabled)) {
            this.beginDragging(D)
        }
    }
    if (this.dragging) {
        D.stopPropagation();
        var B = this.horizontalScrollEnabled ? (this.startContentOffset.x - F) : this._contentOffset.x;
        var A = this.verticalScrollEnabled ? (this.startContentOffset.y - E) : this._contentOffset.y;
        if (this.bounces) {
            B -= ((B > this.maxPoint.x) ? (B - this.maxPoint.x) : ((B < 0) ? B : 0)) / 2;
            A -= ((A > this.maxPoint.y) ? (A - this.maxPoint.y) : ((A < 0) ? A : 0)) / 2
        }
        else {
            B = Math.max(Math.min(this.maxPoint.x, B), 0);
            A = Math.max(Math.min(this.maxPoint.y, A), 0)
        }
        if (this.firstDrag) {
            this.firstDrag = false;
            this.startTouchPosition = C;
            return
        }
        this.contentOffset = new ADPoint(B, A)
    }
    this.addTrackingDataPoint(D.timeStamp, this._contentOffset.copy())
};
ADScrollView.prototype.touchesEnded = function(A){
    this.stopTrackingTouches();
    if (this.contentTouchesCouldNotBeCancelled) {
        if (this.isOriginalTargetElementAtPoint(this.lastKnownTouchPosition)) {
            this.dispatchClickToContent()
        }
        else {
            if (this.originalTarget.localName == "select") {
                this.shouldPreventSelectElementFocus = true
            }
        }
        return
    }
    if (this.dragging) {
        this.dragging = false;
        A.preventDefault();
        if (this.originalTarget.localName == "select") {
            this.shouldPreventSelectElementFocus = true
        }
        A.stopPropagation();
        this.purgeTrackingDataPointsWithTime(A.timeStamp);
        if (this.trackingDataPoints.length > 1) {
            this._contentOffsetBeforeDeceleration = this._contentOffset.copy();
            this.startDecelerationAnimation()
        }
        if (ADUtils.objectHasMethod(this.delegate, ADScrollViewDidEndDragging)) {
            this.delegate[ADScrollViewDidEndDragging](this)
        }
    }
    else {
        if (this.isOriginalTargetElementAtPoint(this.lastKnownTouchPosition)) {
            this.dispatchTapSequenceToContent();
            this.dispatchClickToContent()
        }
        else {
            if (this.originalTarget.localName == "select") {
                this.shouldPreventSelectElementFocus = true
            }
            else {
                A.preventDefault()
            }
        }
    }
    if (!this.decelerating) {
        this.snapContentOffsetToBounds(true);
        this.hideScrollIndicators()
    }
};
ADScrollView.prototype.touchesCancelled = function(A){
    this.stopTrackingTouches()
};
ADScrollView.prototype.beginTracking = function(A){
    if (this._tracking) {
        return
    }
    this.stopDecelerationAnimation();
    this.lastKnownTouchPosition = ADPoint.fromEvent(A);
    this.originalTarget = ADUtils.elementForNode((ADSupportsTouches ? A.touches[0] : A).target);
    this.originalEvent = A;
    if (this.originalTarget.localName != "select") {
        A.preventDefault()
    }
    this.hostingLayer.style.webkitTransitionDuration = 0;
    this.adjustContentSize(false);
    this.snapContentOffsetToBounds(false);
    this.tracking = true;
    this.dragging = false;
    this.touchesHaveMoved = false;
    this.beginTouchesInContentTimer = null;
    this.touchesInContentBegan = false;
    this.shouldPreventSelectElementFocus = false;
    this.contentTouchesCouldNotBeCancelled = false;
    var B = this._contentOffset.copy();
    this.trackingDataPoints = [];
    this.addTrackingDataPoint(A.timeStamp, B);
    this.startContentOffset = B;
    this.startTouchPosition = ADPoint.fromEventInElement(A, this.layer);
    if (this.delaysContentTouches) {
        this.beginTouchesInContentTimer = this.callMethodNameAfterDelay("beginTouchesInContent", ADScrollViewContentTouchesDelay)
    }
    else {
        this.beginTouchesInContent()
    }
    window.addEventListener(ADMoveEvent, this, true);
    window.addEventListener(ADEndEvent, this, true);
    window.addEventListener("touchcancel", this, true)
};
ADScrollView.prototype.beginDragging = function(){
    this.cancelTouchesInContent(event);
    if (ADUtils.objectHasMethod(this.delegate, ADScrollViewWillBeginDragging)) {
        this.delegate[ADScrollViewWillBeginDragging](this)
    }
    this.dragging = true;
    this.firstDrag = true;
    if (this.horizontalScrollEnabled && this.showsHorizontalScrollIndicator && (this.adjustedContentSize.width > this._size.width)) {
        if (!this.hasOwnProperty("_horizontalScrollIndicator")) {
            this.createHorizontalScrollIndicator();
            this.callMethodNameAfterDelay("showHorizontalScrollIndicator", 0)
        }
        else {
            this.showHorizontalScrollIndicator()
        }
    }
    if (this.verticalScrollEnabled && this.showsVerticalScrollIndicator && (this.adjustedContentSize.height > this._size.height)) {
        if (!this.hasOwnProperty("_verticalScrollIndicator")) {
            this.createVerticalScrollIndicator();
            this.callMethodNameAfterDelay("showVerticalScrollIndicator", 0)
        }
        else {
            this.showVerticalScrollIndicator()
        }
    }
};
ADScrollView.prototype.stopTrackingTouches = function(){
    this.tracking = false;
    window.removeEventListener(ADMoveEvent, this, true);
    window.removeEventListener(ADEndEvent, this, true);
    window.removeEventListener("touchcancel", this, true);
    window.clearTimeout(this.beginTouchesInContentTimer)
};
ADScrollView.prototype.interruptTrackingInteraction = function(A){
    this.contentTouchesCouldNotBeCancelled = A;
    if (this.dragging) {
        this.dragging = false;
        this.snapContentOffsetToBounds(true);
        if (ADUtils.objectHasMethod(this.delegate, ADScrollViewDidEndDragging)) {
            this.delegate[ADScrollViewDidEndDragging](this)
        }
        this.hideScrollIndicators()
    }
};
ADScrollView.prototype.isOriginalTargetElementAtPoint = function(A){
    return (this.originalTarget === document.elementFromPoint(A.x, A.y))
};
ADScrollView.prototype.beginTouchesInContent = function(){
    if (!this.touchesShouldBeginInContentElementAndView(this.originalEvent, this.originalTarget, this.originalTarget.getNearestView())) {
        return
    }
    this.touchesInContentBegan = true;
    var A = ADUtils.createUIEvent(ADStartEvent, this.originalEvent);
    A._synthetic = true;
    this.originalTarget.dispatchEvent(A);
    if (!this.canCancelContentTouches) {
        this.interruptTrackingInteraction(true)
    }
};
ADScrollView.prototype.touchesShouldBeginInContentElementAndView = function(C, B, A){
    return true
};
ADScrollView.prototype.cancelTouchesInContent = function(A){
    if (this.canCancelContentTouches && this.touchesInContentBegan && !this.touchesShouldCancelInContentElementAndView(this.originalTarget, this.originalTarget.getNearestView())) {
        this.interruptTrackingInteraction(true);
        return
    }
    var B = ADUtils.createUIEvent("touchcancel", A);
    B._synthetic = true;
    this.originalTarget.dispatchEvent(B);
    window.clearTimeout(this.beginTouchesInContentTimer)
};
ADScrollView.prototype.touchesShouldCancelInContentElementAndView = function(B, A){
    return !(A instanceof ADControl)
};
ADScrollView.prototype.dispatchTapSequenceToContent = function(){
    this.eventsToIgnoreDueToDispatching = 2;
    var A = ADUtils.createUIEvent(ADStartEvent, this.originalEvent);
    var B = ADUtils.createUIEvent(ADEndEvent, this.originalEvent);
    A._synthetic = true;
    B._synthetic = true;
    this.originalTarget.dispatchEvent(A);
    this.originalTarget.dispatchEvent(B)
};
ADScrollView.prototype.dispatchClickToContent = function(){
    if (!ADSupportsTouches) {
        return
    }
    var A = this.originalEvent.touches[0];
    var B = document.createEvent("MouseEvent");
    B.initMouseEvent("click", true, true, document.defaultView, 0, A.screenX, A.screenY, A.clientX, A.clientY, 0, 0, 0, 0, 0, 0, null);
    B._synthetic = true;
    this.originalTarget.dispatchEvent(B)
};
ADScrollView.prototype.purgeTrackingDataPointsWithTime = function(A){
    while (this.trackingDataPoints.length > 0) {
        if (A - this.trackingDataPoints[0].time <= ADScrollViewMaxTimeForTrackingDataPoints) {
            break
        }
        this.trackingDataPoints.shift()
    }
};
ADScrollView.prototype.addTrackingDataPoint = function(B, A){
    this.purgeTrackingDataPointsWithTime(B);
    this.trackingDataPoints.push({
        time: B,
        contentOffset: A
    })
};
ADScrollView.prototype.transitionEnded = function(A){
    if (this.scrollIndicatorsNeedFlashing && A.currentTarget === this.layer) {
        this.scrollIndicatorsNeedFlashing = false;
        this.flashScrollIndicators()
    }
    if (this.scrollTransitionsNeedRemoval && A.currentTarget === this.hostingLayer) {
        this.scrollTransitionsNeedRemoval = false;
        this.hostingLayer.style.webkitTransitionDuration = 0;
        this.didScroll(true)
    }
};
ADScrollView.prototype.didScroll = function(A){
    if (A && ADUtils.objectHasMethod(this.delegate, ADScrollViewDidEndScrollingAnimation)) {
        this.delegate[ADScrollViewDidEndScrollingAnimation](this)
    }
    if (ADUtils.objectHasMethod(this.delegate, ADScrollViewDidScroll)) {
        this.delegate[ADScrollViewDidScroll](this)
    }
};
ADScrollView.prototype.startDecelerationAnimation = function(){
    if (this.bounces && (this._contentOffset.x > this.maxPoint.x || this._contentOffset.y > this.maxPoint.y || this._contentOffset.x < 0 || this._contentOffset.y < 0)) {
        return
    }
    var C = this.trackingDataPoints[0];
    var E = this.trackingDataPoints[this.trackingDataPoints.length - 1];
    var A = new ADPoint(E.contentOffset.x - C.contentOffset.x, E.contentOffset.y - C.contentOffset.y);
    var D = (E.time - C.time) / ADScrollViewAcceleration;
    this.decelerationVelocity = new ADPoint(A.x / D, A.y / D);
    this.minDecelerationPoint = new ADPoint(0, 0);
    this.maxDecelerationPoint = this.maxPoint.copy();
    if (this.pagingEnabled) {
        this.minDecelerationPoint.x = Math.max(0, Math.floor(this._contentOffsetBeforeDeceleration.x / this._size.width) * this._size.width);
        this.minDecelerationPoint.y = Math.max(0, Math.floor(this._contentOffsetBeforeDeceleration.y / this._size.height) * this._size.height);
        this.maxDecelerationPoint.x = Math.min(this.maxPoint.x, Math.ceil(this._contentOffsetBeforeDeceleration.x / this._size.width) * this._size.width);
        this.maxDecelerationPoint.y = Math.min(this.maxPoint.y, Math.ceil(this._contentOffsetBeforeDeceleration.y / this._size.height) * this._size.height)
    }
    this.penetrationDeceleration = ADScrollViewPenetrationDeceleration;
    this.penetrationAcceleration = ADScrollViewPenetrationAcceleration;
    if (this.pagingEnabled) {
        this.penetrationDeceleration *= 5
    }
    var B = this.pagingEnabled ? ADScrollViewMinVelocityForDecelerationWithPaging : ADScrollViewMinVelocityForDeceleration;
    if (Math.abs(this.decelerationVelocity.x) > B || Math.abs(this.decelerationVelocity.y) > B) {
        this.decelerating = true;
        this.decelerationTimer = this.callMethodNameAfterDelay("stepThroughDecelerationAnimation", ADScrollViewDesiredAnimationFrameRate);
        this.lastFrame = new Date();
        if (ADUtils.objectHasMethod(this.delegate, ADScrollViewWillBeginDecelerating)) {
            this.delegate[ADScrollViewWillBeginDecelerating](this)
        }
    }
};
ADScrollView.prototype.stopDecelerationAnimation = function(){
    this.decelerating = false;
    clearTimeout(this.decelerationTimer)
};
ADScrollView.prototype.stepThroughDecelerationAnimation = function(K){
    if (!this.decelerating) {
        return
    }
    var A = new Date();
    var F = A - this.lastFrame;
    var E = K ? 0 : (Math.round(F / ADScrollViewDesiredAnimationFrameRate) - 1);
    for (var G = 0; G < E; G++) {
        this.stepThroughDecelerationAnimation(true)
    }
    var J = this._contentOffset.x + this.decelerationVelocity.x;
    var I = this._contentOffset.y + this.decelerationVelocity.y;
    if (!this.bounces) {
        var D = Math.max(Math.min(this.maxPoint.x, J), 0);
        if (D != J) {
            J = D;
            this.decelerationVelocity.x = 0
        }
        var B = Math.max(Math.min(this.maxPoint.y, I), 0);
        if (B != I) {
            I = B;
            this.decelerationVelocity.y = 0
        }
    }
    if (K) {
        this._contentOffset.x = J;
        this._contentOffset.y = I
    }
    else {
        this.contentOffset = new ADPoint(J, I)
    }
    if (!this.pagingEnabled) {
        this.decelerationVelocity.x *= ADScrollViewDecelerationFrictionFactor;
        this.decelerationVelocity.y *= ADScrollViewDecelerationFrictionFactor
    }
    var C = Math.abs(this.decelerationVelocity.x);
    var H = Math.abs(this.decelerationVelocity.y);
    if (!K && C <= ADScrollViewMinimumVelocity && H <= ADScrollViewMinimumVelocity) {
        this.hideScrollIndicators();
        this.decelerationAnimationCompleted();
        return
    }
    if (!K) {
        this.decelerationTimer = this.callMethodNameAfterDelay("stepThroughDecelerationAnimation", ADScrollViewDesiredAnimationFrameRate)
    }
    if (this.bounces) {
        var L = new ADPoint(0, 0);
        if (J < this.minDecelerationPoint.x) {
            L.x = this.minDecelerationPoint.x - J
        }
        else {
            if (J > this.maxDecelerationPoint.x) {
                L.x = this.maxDecelerationPoint.x - J
            }
        }
        if (I < this.minDecelerationPoint.y) {
            L.y = this.minDecelerationPoint.y - I
        }
        else {
            if (I > this.maxDecelerationPoint.y) {
                L.y = this.maxDecelerationPoint.y - I
            }
        }
        if (L.x != 0) {
            if (this.pagingEnabled && Math.abs(this.decelerationVelocity.x) >= ADScrollViewMaxVelocityForBouncingWithPaging) {
                this.decelerationAnimationCompleted();
                return
            }
            if (L.x * this.decelerationVelocity.x <= 0) {
                this.decelerationVelocity.x += L.x * this.penetrationDeceleration
            }
            else {
                this.decelerationVelocity.x = L.x * this.penetrationAcceleration
            }
        }
        if (L.y != 0) {
            if (this.pagingEnabled && Math.abs(this.decelerationVelocity.y) >= ADScrollViewMaxVelocityForBouncingWithPaging) {
                this.decelerationAnimationCompleted();
                return
            }
            if (L.y * this.decelerationVelocity.y <= 0) {
                this.decelerationVelocity.y += L.y * this.penetrationDeceleration
            }
            else {
                this.decelerationVelocity.y = L.y * this.penetrationAcceleration
            }
        }
    }
    if (!K) {
        this.lastFrame = A
    }
};
ADScrollView.prototype.decelerationAnimationCompleted = function(){
    this.stopDecelerationAnimation();
    if (this.pagingEnabled) {
        this.setContentOffsetAnimated(new ADPoint(Math.round(this._contentOffset.x / this._size.width) * this._size.width, Math.round(this._contentOffset.y / this._size.height) * this._size.height), false)
    }
    this.snapContentOffsetToBounds(false);
    if (ADUtils.objectHasMethod(this.delegate, ADScrollViewDidEndDecelerating)) {
        this.delegate[ADScrollViewDidEndDecelerating](this)
    }
};
ADClass(ADScrollView);
const ADTableViewCellForRowAtPath = "tableViewCellForRowAtPath";
const ADTableViewNumberOfSectionsInTableView = "numberOfSectionsInTableView";
const ADTableViewNumberOfRowsInSection = "tableViewNumberOfRowsInSection";
const ADTableViewTitleForHeaderInSection = "tableViewTitleForHeaderInSection";
const ADTableViewTitleForFooterInSection = "tableViewTitleForFooterInSection";
const ADTableViewDidSelectRowAtPath = "tableViewDidSelectRowAtPath";
const ADTableViewDidSelectAccessoryForRowAtPath = "tableViewDidSelectAccessoryForRowAtPath";
const ADTableViewStylePlain = "plain";
const ADTableViewStyleCustom = "custom";
const ADTableViewStyleGrouped = "grouped";
ADTableView.superclass = ADScrollView;
ADTableView.synthesizedProperties = ["style", "separatorStyle"];
ADTableView.mixins = [ADPropertyTriage];
ADTableView.cssClassName = "ad-table-view";
ADTableView.collectionAccessor = "tableViews";
function ADTableView(A){
    this._style = ADTableViewStyleCustom;
    this._separatorStyle = ADTableViewCellSeparatorStyleSingleLine;
    this.delegate = null;
    this.dataSource = null;
    this.touchedCell = null;
    this.touchedAccessory = null;
    this.shouldPreventScrolling = false;
    this.numberOfSections = 1;
    this.numberOfRows = [];
    this.sections = [];
    this.headers = [];
    this.sectionMetrics = [];
    this.selectedCell = null;
    this.populated = false;
    this.callSuper(A);
    this.horizontalScrollEnabled = false
}

ADTableView.prototype.setupLayer = function(){
    this.callSuper();
    if (this.layer.hasClassName(ADTableViewStylePlain)) {
        this._style = ADTableViewStylePlain
    }
    else {
        if (this.layer.hasClassName(ADTableViewStyleGrouped)) {
            this._style = ADTableViewStyleGrouped
        }
    }
    if (this.layer.hasClassName(ADTableViewCellSeparatorStyleSingleLineEtched)) {
        this._separatorStyle = ADTableViewCellSeparatorStyleSingleLineEtched
    }
    else {
        if (this.layer.hasClassName(ADTableViewCellSeparatorStyleNone)) {
            this._separatorStyle = ADTableViewCellSeparatorStyleNone
        }
    }
};
ADTableView.prototype.layerWasCreated = function(){
    this.callSuper();
    this.sections = this.layer.querySelectorAll(".hosting-layer > .section");
    this.numberOfSections = this.sections.length;
    this.headers = [];
    this.numberOfRows = [];
    for (var C = 0; C < this.numberOfSections; C++) {
        var D = this.sections[C].querySelectorAll(".ad-table-view-cell");
        var A;
        for (var B = 0; B < D.length; B++) {
            A = D[B]._view;
            A._tableViewDataSourcePath = new ADCellPath(C, B);
            A._table = this
        }
        this.headers[C] = this.layer.querySelector(".hosting-layer > .section:nth-of-type(" + (C + 1) + ") > h1");
        this.numberOfRows[C] = D.length
    }
    this.populated = true
};
ADTableView.prototype.layerWasInsertedIntoDocument = function(){
    this.callSuper();
    this.notifyCellsOfInsertionIntoDocument();
    this.updateSectionMetrics()
};
ADTableView.prototype.setContentOffsetAnimated = function(B, A){
    this.callSuper(B, A);
    this.updateSectionHeaders()
};
ADTableView.prototype.setStyle = function(A){
    this.layer.removeClassName(this._style);
    this.layer.addClassName(A);
    this._style = A
};
ADTableView.prototype.setSeparatorStyle = function(A){
    this.layer.removeClassName(this._separatorStyle);
    this.layer.addClassName(A);
    this._separatorStyle = A
};
ADTableView.prototype.numberOfRowsInSection = function(A){
    if (A > this.numberOfSections - 1) {
        return
    }
    return this.numberOfRows[A]
};
ADTableView.prototype.cellForRowAtPath = function(A){
    if (A.section > this.numberOfSections - 1 || A.row > this.numberOfRows[A.section]) {
        return null
    }
    return this.hostingLayer.querySelector(".section:nth-of-type(" + (A.section + 1) + ") .cells > ." + ADTableViewCell.cssClassName + ":nth-of-type(" + (A.row + 1) + ")")._view
};
ADTableView.prototype.pathForCell = function(A){
    return A._tableViewDataSourcePath
};
ADTableView.prototype.notifyCellsOfInsertionIntoDocument = function(){
    if (!this.layerIsInDocument || !this.populated) {
        return
    }
    var A = this.hostingLayer.querySelectorAll(".ad-table-view-cell");
    for (var B = 0; B < A.length; B++) {
        A[B]._view.layerWasInsertedIntoDocument()
    }
};
ADTableView.prototype.reloadData = function(){
    if (!ADUtils.objectHasMethod(this.dataSource, ADTableViewCellForRowAtPath) || !ADUtils.objectHasMethod(this.dataSource, ADTableViewNumberOfRowsInSection)) {
        console.error("An ADTableView's dataSource must implement all required methods");
        return
    }
    this._hostingLayer.innerText = "";
    this.sections = [];
    this.headers = [];
    this.numberOfSections = 1;
    if (ADUtils.objectHasMethod(this.dataSource, ADTableViewNumberOfSectionsInTableView)) {
        this.numberOfSections = this.dataSource[ADTableViewNumberOfSectionsInTableView](this)
    }
    if (this.numberOfSections < 1) {
        console.error("An ADTableView must have at least one section");
        return
    }
    for (var F = 0; F < this.numberOfSections; F++) {
        var A = document.createElement("div");
        A.className = "section";
        this.sections[F] = A;
        if (ADUtils.objectHasMethod(this.dataSource, ADTableViewTitleForHeaderInSection)) {
            var B = this.dataSource[ADTableViewTitleForHeaderInSection](this, F);
            if (B !== null) {
                var C = A.appendChild(document.createElement("h1"));
                C.innerText = B;
                this.headers[F] = C
            }
        }
        var H = this.dataSource[ADTableViewNumberOfRowsInSection](this, F);
        if (H > 0) {
            var D = A.appendChild(document.createElement("div"));
            D.className = "cells";
            for (var I = 0; I < H; I++) {
                var J = new ADCellPath(F, I);
                var G = this.dataSource[ADTableViewCellForRowAtPath](this, J);
                G._tableViewDataSourcePath = J;
                G._table = this;
                D.appendChild(G.layer)
            }
        }
        if (ADUtils.objectHasMethod(this.dataSource, ADTableViewTitleForFooterInSection)) {
            var E = this.dataSource[ADTableViewTitleForFooterInSection](this, F);
            if (E !== null) {
                A.appendChild(document.createElement("span")).innerText = E
            }
        }
        this.numberOfRows[F] = H;
        this._hostingLayer.appendChild(A)
    }
    this.populated = true;
    this.updateSectionMetrics();
    this.notifyCellsOfInsertionIntoDocument()
};
ADTableView.prototype.updateSectionMetrics = function(){
    if (!this.layerIsInDocument || this._style !== ADTableViewStylePlain || !this.populated) {
        return
    }
    this.sectionMetrics = [];
    for (var A = 0; A < this.sections.length; A++) {
        this.sectionMetrics[A] = {
            y: this.sections[A].offsetTop,
            height: this.sections[A].offsetHeight
        }
    }
};
ADTableView.prototype.touchesBeganInCapturePhase = function(A){
    this.wasDeceleratingWhenTouchesBegan = this.decelerating;
    this.callSuper(A);
    if (this.wasDeceleratingWhenTouchesBegan) {
        return
    }
    this.touchedCell = null;
    var C = A.target;
    var B = C.getNearestView();
    if (B instanceof ADTableViewCell) {
        B.userInteractionEnabled = true;
        this.touchedCell = B
    }
};
ADTableView.prototype.touchesEnded = function(A){
    this.callSuper(A);
    if (this.touchedCell === null) {
        return
    }
    this.touchedCell.userInteractionEnabled = false;
    if (this.touchedCell.selected && this.touchedCell !== this.selectedCell) {
        this.selectRowAtPath(this.touchedCell._tableViewDataSourcePath)
    }
};
ADTableView.prototype.touchesCancelled = function(A){
    this.callSuper(A);
    if (this.touchedCell === null) {
        return
    }
    this.touchedCell.userInteractionEnabled = false
};
ADTableView.prototype.pathForSelectedRow = function(){
    if (this.selectedCell === null) {
        return null
    }
    return this.pathForCell(this.selectedCell)
};
ADTableView.prototype.deselectRowAtPathAnimated = function(C, B){
    if (C === null) {
        return
    }
    var A = this.cellForRowAtPath(C);
    if (A !== null) {
        this.markCellAsSelectedAnimated(A, false, B)
    }
};
ADTableView.prototype.selectRowAtPath = function(B){
    var A = this.cellForRowAtPath(B);
    if (A === null) {
        throw (new Error("No cell at " + B.toString()));
        return
    }
    this.deselectRowAtPathAnimated(this.pathForSelectedRow(), false);
    this.selectedCell = A;
    this.markCellAsSelectedAnimated(this.selectedCell, true, false);
    if (ADUtils.objectHasMethod(this.delegate, ADTableViewDidSelectRowAtPath)) {
        this.delegate[ADTableViewDidSelectRowAtPath](this, B)
    }
};
ADTableView.prototype.markCellAsSelectedAnimated = function(A, B, C){
    if (A instanceof ADTableViewCell) {
        A.setSelectedAnimated(B, C)
    }
    else {
        A[B ? "addClassName" : "removeClassName"](ADControlStateSelectedCSS)
    }
};
ADTableView.prototype.disclosureButtonWasSelectedAtPath = function(B){
    var A = this.cellForRowAtPath(B);
    if (A.accessoryType === ADTableViewCellAccessoryDetailDisclosureButton && ADUtils.objectHasMethod(this.delegate, ADTableViewDidSelectAccessoryForRowAtPath)) {
        this.delegate[ADTableViewDidSelectAccessoryForRowAtPath](this, B)
    }
};
const ADTableViewPlainHeaderHeight = 23;
ADTableView.prototype.updateSectionHeaders = function(){
    if (this.sectionMetrics.length != this.numberOfSections || this.style !== ADTableViewStylePlain) {
        return
    }
    var B = this.contentOffset.y;
    for (var G = 0; G < this.numberOfSections; G++) {
        var H = this.headers[G];
        if (H === undefined || H === null) {
            continue
        }
        var F = this.sectionMetrics[G];
        var E = F.y;
        var D = E + F.height;
        var C = D - B;
        var A = 0;
        if (C > 0 && C < (ADTableViewPlainHeaderHeight - 1)) {
            A = F.height - ADTableViewPlainHeaderHeight
        }
        else {
            if (E <= B && D > B) {
                A = Math.abs(E - B) - 1
            }
        }
        H.style.webkitTransform = ADUtils.t(0, A)
    }
};
ADClass(ADTableView);
function ADCellPath(A, B){
    this.section = A || 0;
    this.row = B || 0
}

ADCellPath.prototype.toString = function(){
    return "ADCellPath with section " + this.section + " and row " + this.row
};
const ADTableViewCellAccessoryNone = "no-accessory";
const ADTableViewCellAccessoryDisclosureIndicator = "disclosure-accessory";
const ADTableViewCellAccessoryDetailDisclosureButton = "detail-accessory";
const ADTableViewCellSelectionStyleNone = "no-selection";
const ADTableViewCellSelectionStyleBlue = "blue-selection";
const ADTableViewCellSelectionStyleGray = "gray-selection";
const ADTableViewCellStyleDefault = "style-default";
const ADTableViewCellStyleValue1 = "style-value-1";
const ADTableViewCellStyleValue2 = "style-value-2";
const ADTableViewCellStyleSubtitle = "style-subtitle";
const ADTableViewCellStyleCustom = "style-custom";
const ADTableViewCellSeparatorStyleNone = "separator-none";
const ADTableViewCellSeparatorStyleSingleLine = "separator-single-line";
const ADTableViewCellSeparatorStyleSingleLineEtched = "separator-single-line-etched";
ADTableViewCell.superclass = ADView;
ADTableViewCell.synthesizedProperties = ["text", "detailedText", "selectionStyle", "accessoryType", "selected"];
ADTableViewCell.cssClassName = "ad-table-view-cell";
ADTableViewCell.collectionAccessor = "tableViewCells";
function ADTableViewCell(A, B){
    this.style = B || ADTableViewCellStyleDefault;
    this._selectionStyle = ADTableViewCellSelectionStyleBlue;
    this._accessoryType = ADTableViewCellAccessoryNone;
    this._selected = false;
    this.callSuper(A)
}

ADTableViewCell.prototype.setupLayer = function(){
    this.callSuper();
    this.createLayerContents();
    if (this.layer.hasClassName(ADTableViewCellStyleValue1)) {
        this.style = ADTableViewCellStyleValue1
    }
    else {
        if (this.layer.hasClassName(ADTableViewCellStyleValue2)) {
            this.style = ADTableViewCellStyleValue2
        }
        else {
            if (this.layer.hasClassName(ADTableViewCellStyleSubtitle)) {
                this.style = ADTableViewCellStyleSubtitle
            }
            else {
                if (this.layer.hasClassName(ADTableViewCellStyleCustom)) {
                    this.style = ADTableViewCellStyleCustom
                }
            }
        }
    }
    if (this.layer.hasClassName(ADTableViewCellAccessoryDisclosureIndicator)) {
        this._accessoryType = ADTableViewCellAccessoryDisclosureIndicator
    }
    else {
        if (this.layer.hasClassName(ADTableViewCellAccessoryDetailDisclosureButton)) {
            this._accessoryType = ADTableViewCellAccessoryDetailDisclosureButton
        }
    }
};
ADTableViewCell.prototype.createLayer = function(){
    this.callSuper();
    this.layer.addClassName(this.style);
    this.createLayerContents()
};
ADTableViewCell.prototype.layerWasCreated = function(){
    this.callSuper();
    if (this.style === ADTableViewCellStyleCustom) {
        this.layer.addClassName(ADTableViewCellStyleCustom)
    }
    this.updateTextLayout()
};
ADTableViewCell.prototype.createLayerContents = function(){
    this.layer.setAttribute("role", "button");
    this.accessory = new ADButton(null, ADButtonTypeDetailDisclosure);
    this.accessory.addEventListener(ADControlTouchUpInsideEvent, this, false);
    this.addSubview(this.accessory);
    this.textLabel = this.layer.appendChild(document.createElement("span"));
    this.textLabel.addClassName("text-label");
    this.detailedTextLabel = this.layer.appendChild(document.createElement("span"));
    this.detailedTextLabel.addClassName("detailed-text-label")
};
ADTableViewCell.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-text":
            this.text = B;
            break;
        case "ad-detailed-text":
            this.detailedText = B;
            break;
        default:
            this.callSuper(B, A)
    }
};
ADTableViewCell.prototype.handleEvent = function(B){
    if (B.currentTarget === this.accessory.layer) {
        var A = this._table;
        var C = this._tableViewDataSourcePath;
        if (A !== undefined && C !== undefined) {
            A.disclosureButtonWasSelectedAtPath(C)
        }
    }
    else {
        this.callSuper(B)
    }
};
ADTableViewCell.prototype.touchesBegan = function(A){
    this.callSuper(A);
    this.selected = true
};
ADTableViewCell.prototype.touchesCancelled = function(A){
    this.callSuper(A);
    this.selected = false
};
ADTableViewCell.prototype.getText = function(){
    return this.textLabel.innerText
};
ADTableViewCell.prototype.setText = function(A){
    this.textLabel.innerText = A;
    this.updateTextLayout()
};
ADTableViewCell.prototype.getDetailedText = function(){
    return this.detailedTextLabel.innerText
};
ADTableViewCell.prototype.setDetailedText = function(A){
    this.detailedTextLabel.innerText = A;
    this.updateTextLayout()
};
ADTableViewCell.prototype.setSelectionStyle = function(A){
    this.layer.removeClassName(this._selectionStyle);
    this.layer.addClassName(A);
    this._selectionStyle = A
};
const ADTableViewCellAccessoryDisclosureIndicatorWidth = 10;
const ADTableViewCellAccessoryDetailDisclosureButtonWidth = 44;
ADTableViewCell.prototype.setAccessoryType = function(A){
    this.layer.removeClassName(this._accessoryType);
    this.layer.addClassName(A);
    this._accessoryType = A
};
ADTableViewCell.prototype.setSelected = function(A){
    this.setSelectedAnimated(A, false)
};
ADTableViewCell.prototype.setSelectedAnimated = function(A, B){
    if (this._selected == A) {
        return
    }
    this._selected = A;
    this.layer[A ? "addClassName" : "removeClassName"](ADControlStateSelectedCSS)
};
ADTableViewCell.prototype.layerWasInsertedIntoDocument = function(){
    this.callSuper();
    this.updateTextLayout()
};
const ADTableViewCellStyleValue1Margin = 10;
ADTableViewCell.prototype.updateTextLayout = function(){
    if (this.style != ADTableViewCellStyleValue1 || !this.layerIsInDocument) {
        return
    }
    var C = this.textLabel.offsetWidth - 2 * ADTableViewCellStyleValue1Margin;
    this.textLabel.style.right = "auto !important";
    this.detailedTextLabel.style.right = "auto !important";
    var B = Math.min(this.textLabel.offsetWidth, C);
    var A = Math.min(this.detailedTextLabel.offsetWidth, C);
    this.textLabel.setAttribute("style", "");
    this.detailedTextLabel.setAttribute("style", "");
    if (B + A > C) {
        var D = Math.floor((B / (B + A)) * C);
        if (B > A) {
            this.textLabel.style.width = ADUtils.px(D);
            this.detailedTextLabel.style.left = ADUtils.px(D + ADTableViewCellStyleValue1Margin * 2)
        }
        else {
            this.textLabel.style.width = ADUtils.px(D + ADTableViewCellStyleValue1Margin);
            this.detailedTextLabel.style.left = ADUtils.px(D + ADTableViewCellStyleValue1Margin * 3)
        }
    }
};
ADClass(ADTableViewCell);
const ADCarouselViewVerticalOrientation = 0;
const ADCarouselViewHorizontalOrientation = 1;
const ADCarouselViewSelectionRotationDuration = 0.5;
const ADCarouselViewSnapRotationDuration = 0.25;
const ADCarouselViewNumberOfCells = "carouselViewNumberOfCells";
const ADCarouselViewCellForIndex = "carouselViewCellForIndex";
const ADCarouselViewWillSelectCellAtIndex = "carouselViewWillSelectCellAtIndex";
const ADCarouselViewDidSelectCellAtIndex = "carouselViewDidSelectCellAtIndex";
const ADCarouselViewCellActiveCSS = "active";
ADCarouselView.superclass = ADView;
ADCarouselView.synthesizedProperties = ["rotation", "snapsToCells"];
ADCarouselView.cssClassName = "ad-carousel-view";
ADCarouselView.collectionAccessor = "carouselViews";
function ADCarouselView(A){
    this.dataSource = null;
    this.delegate = null;
    this.centersSelection = true;
    this.centerSelectionDuration = -1;
    this.orientation = ADCarouselViewVerticalOrientation;
    this.cellSize = new ADSize();
    this.cellPadding = 0;
    this.numberOfCells = 0;
    this.touchedCell = null;
    this.busySelecting = false;
    this.showingHighlight = false;
    this.currentHighlightCell = null;
    this.trackingMoved = false;
    this._rotation = 0;
    this._snapsToCells = false;
    this.trackingPoints = [];
    this.animator = new ADAnimator(2000, this, [0.211196, 0.811224, 0.641221, 0.979592]);
    this.callSuper(A);
    this.cellsContainer.addEventListener("webkitTransitionEnd", this, false);
    this.userInteractionEnabled = true
}

ADCarouselView.prototype.setupLayer = function(){
    this.callSuper();
    this.aligner = this.layer.querySelector(".aligner");
    this.cellsContainer = this.aligner.querySelector(".cells");
    var A = window.getComputedStyle(this.cellsContainer.firstElementChild);
    this.cellSize = new ADSize(parseInt(A.width, 10), parseInt(A.height, 10));
    this.numberOfCells = this.cellsContainer.childElementCount
};
ADCarouselView.prototype.createLayer = function(){
    this.callSuper();
    this.aligner = this.layer.appendChild(document.createElement("div"));
    this.aligner.className = "aligner";
    this.cellsContainer = this.aligner.appendChild(document.createElement("ul"));
    this.cellsContainer.className = "cells"
};
ADCarouselView.prototype.readPropertiesFromLayerComputedStyle = function(A){
    this.callSuper(A)
};
ADCarouselView.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-centers-selection":
            this.centersSelection = !(B == "false");
            break;
        case "ad-center-selection-duration":
            this.centerSelectionDuration = parseFloat(B);
            break;
        case "ad-cell-padding":
            this.cellPadding = parseInt(B, 10);
            break;
        case "ad-rotation":
            this.rotation = parseFloat(B);
            break;
        case "ad-orientation":
            this.orientation = (B == "horizontal") ? ADCarouselViewHorizontalOrientation : ADCarouselViewVerticalOrientation;
            break;
        case "ad-snaps-to-cells":
            this.snapsToCells = !(B == "false");
            break;
        default:
            this.callSuper(B, A)
    }
};
ADCarouselView.prototype.readPropertiesFromLayerAttributes = function(B){
    this.callSuper(B);
    var A = this.cellsContainer.firstElementChild;
    var C = 0;
    while (A) {
        A._index = C;
        A.addEventListener(ADStartEvent, this, false);
        A = A.nextElementSibling;
        C++
    }
    this.updateLayout()
};
ADCarouselView.prototype.setSize = function(A){
    this.callSuper(new ADSize(0, 0))
};
ADCarouselView.prototype.isVertical = function(){
    return (this.orientation == ADCarouselViewVerticalOrientation)
};
ADCarouselView.prototype.reloadData = function(){
    if (!ADUtils.objectHasMethod(this.dataSource, ADCarouselViewNumberOfCells) || !ADUtils.objectHasMethod(this.dataSource, ADCarouselViewCellForIndex)) {
        return
    }
    this.cellsContainer.textContent = "";
    this.numberOfCells = this.dataSource[ADCarouselViewNumberOfCells](this);
    for (var B = 0; B < this.numberOfCells; B++) {
        var A = this.cellsContainer.appendChild(this.dataSource[ADCarouselViewCellForIndex](this, B));
        A.addEventListener(ADStartEvent, this, false);
        A._index = B
    }
    this.updateLayout();
    this.rotation = 0
};
ADCarouselView.prototype.updateLayout = function(){
    var I = this.isVertical();
    this.radius = Math.ceil(this.numberOfCells * ((I ? this.cellSize.height : this.cellSize.width) + this.cellPadding)) / (2 * Math.PI);
    this.aligner.style.webkitTransform = "translateZ(" + (-this.radius) + "px)";
    var B = I ? 1 : 0;
    var A = I ? 0 : 1;
    var D = 360 / this.numberOfCells;
    var E = I ? (-this.cellSize.height / 2) : 0;
    var C = I ? 0 : (-this.cellSize.width / 2);
    var H = this.cellsContainer.firstElementChild;
    while (H) {
        H.style.top = E + "px";
        H.style.left = C + "px";
        H.style.webkitTransform = "rotate3d(" + B + ", " + A + ", 0, " + (-D * H._index) + "deg) translateZ(" + this.radius + "px)";
        H = H.nextElementSibling
    }
    this.cellsContainer.style.top = (I ? this.radius : 0) + "px";
    this.cellsContainer.style.left = (I ? 0 : this.radius) + "px";
    var G = (I ? this.cellSize.width / 2 : this.radius);
    var F = (I ? this.radius : this.cellSize.height / 2);
    this.layer.style.webkitPerspectiveOrigin = G + "px " + F + "px"
};
ADCarouselView.prototype.setRotation = function(B){
    if (isNaN(B)) {
        return
    }
    this._rotation = B % 360;
    var A = this.isVertical();
    var D = A ? 1 : 0;
    var C = A ? 0 : 1;
    this.cellsContainer.style.webkitTransform = "rotate3d(" + D + ", " + C + ", 0, " + this._rotation + "deg)"
};
ADCarouselView.prototype.handleEvent = function(A){
    if (this.busySelecting && A.type != "webkitTransitionEnd") {
        return
    }
    this.callSuper(A);
    if (A.type == "webkitTransitionEnd") {
        this.transitionEnded(A)
    }
};
ADCarouselView.prototype.touchesBegan = function(A){
    if (A.currentTarget === this.layer) {
        return
    }
    this.callSuper(A);
    this.touchedCell = A.currentTarget;
    this.cellsContainer.style.webkitTransitionDuration = 0;
    this.wasStopppedDuringAnimation = this.animator.animating;
    if (this.wasStopppedDuringAnimation) {
        this.stopAnimation()
    }
    else {
        this.highlightCurrentCell()
    }
    this.startRotation = this.rotation;
    this.startTouchPosition = ADPoint.fromEvent(A);
    this.startXAngle = Math.acos((this.startTouchPosition.x - this.position.x - this.radius) / this.radius);
    this.startYAngle = Math.acos((this.startTouchPosition.y - this.position.y - this.radius) / this.radius);
    this.trackingMoved = false;
    this.trackingPoints = [];
    this.storeEventLocation(this.startTouchPosition)
};
ADCarouselView.prototype.touchesMoved = function(B){
    this.callSuper(B);
    this.removeCellHighlight();
    var A = ADPoint.fromEvent(B);
    this.storeEventLocation(A);
    this.trackingMoved = true;
    var C;
    if (this.isVertical()) {
        C = -(this.startYAngle - Math.acos((A.y - this.position.y - this.radius) / this.radius))
    }
    else {
        C = this.startXAngle - Math.acos((A.x - this.position.x - this.radius) / this.radius)
    }
    this.rotation = this.startRotation + ADUtils.radiansToDegrees(C)
};
ADCarouselView.prototype.touchesEnded = function(C){
    this.callSuper(C);
    if (this.touchedCell != null && !this.trackingMoved && !this.wasStopppedDuringAnimation) {
        this.busySelecting = true;
        var B = this.touchedCell._index * (360 / this.numberOfCells);
        var A = (B == this.rotation);
        this.cellIsBeingSelected(A);
        if (A || !this.centersSelection) {
            this.cellWasSelected(A);
            this.busySelecting = false;
            this.removeCellHighlight()
        }
        else {
            var E = Math.abs(B - this.rotation);
            if (E > 90) {
                if (B < this.rotation) {
                    E = B + 360 - this.rotation
                }
                else {
                    E = this.rotation + 360 - B
                }
            }
            var D = this.centerSelectionDuration;
            if (D < 0) {
                D = (Math.min(60, E) / 60 * ADCarouselViewSelectionRotationDuration)
            }
            this.cellsContainer.style.webkitTransitionDuration = Math.max(0.1, D) + "s";
            this.rotation = B
        }
    }
    else {
        this.startAnimating()
    }
    if (!this.animator.animating && !this.busySelecting && this.snapsToCells) {
        this.cellsContainer.style.webkitTransitionDuration = ADCarouselViewSnapRotationDuration + "s";
        this.rotation = Math.round(this.rotation / (360 / this.numberOfCells)) * (360 / this.numberOfCells)
    }
};
ADCarouselView.prototype.transitionEnded = function(A){
    if (!this.busySelecting) {
        return
    }
    this.busySelecting = false;
    this.cellWasSelected(this.touchedCell, false);
    this.removeCellHighlight()
};
ADCarouselView.prototype.storeEventLocation = function(B){
    var A = {
        pos: (this.isVertical() ? B.y : B.x),
        date: new Date()
    };
    this.trackingPoints.push(A);
    if (this.trackingPoints.length > 10) {
        this.trackingPoints.shift()
    }
};
ADCarouselView.prototype.startAnimating = function(){
    var E = -1;
    for (var C = this.trackingPoints.length - 1; C > 0; --C) {
        if (this.trackingPoints[C].pos != 0) {
            E = C - 1;
            break
        }
    }
    if (E < 0) {
        return false
    }
    var A = E + 1;
    var F = this.trackingPoints[A].date - this.trackingPoints[E].date;
    var I = (this.trackingPoints[A].pos - this.trackingPoints[E].pos);
    if (Math.abs(I) < 3 || F > 35) {
        return false
    }
    var D = -Math.atan(I / this.radius);
    var B = Math.abs(D);
    var K;
    if (B < 0.075) {
        K = 360 / 4
    }
    else {
        if (B < 0.15) {
            K = 360 / 2
        }
        else {
            if (B < 0.225) {
                K = 360 * 0.75
            }
            else {
                K = 360
            }
        }
    }
    var G = (D < 0) ? (this.isVertical() ? "top-" : "right-") : (this.isVertical() ? "bottom-" : "left-");
    if (G == "left-" || G == "top-") {
        K = -K
    }
    this.rotationBeforeAnimation = this.rotation;
    this.animationAngle = K;
    if (this.snapsToCells) {
        var J = this.rotation + this.animationAngle;
        var H = J - Math.round(J / (360 / this.numberOfCells)) * (360 / this.numberOfCells);
        this.animationAngle -= H
    }
    this.animator.start();
    return true
};
ADCarouselView.prototype.animationDidIterate = function(A){
    this.rotation = this.rotationBeforeAnimation + A * this.animationAngle
};
ADCarouselView.prototype.stopAnimation = function(){
    this.animator.stop()
};
ADCarouselView.prototype.highlightCurrentCell = function(){
    if (this.touchedCell == null) {
        return
    }
    if (this.currentHighlightCell != null) {
        this.removeCellHighlight()
    }
    this.touchedCell.addClassName(ADCarouselViewCellActiveCSS);
    this.currentHighlightCell = this.touchedCell;
    this.showingHighlight = true
};
ADCarouselView.prototype.removeCellHighlight = function(){
    if (!this.showingHighlight || this.touchedCell == null) {
        return
    }
    this.currentHighlightCell.removeClassName(ADCarouselViewCellActiveCSS);
    this.currentHighlightCell = null;
    this.showingHighlight = false
};
ADCarouselView.prototype.cellIsBeingSelected = function(A){
    if (ADUtils.objectHasMethod(this.delegate, ADCarouselViewWillSelectCellAtIndex)) {
        this.delegate[ADCarouselViewWillSelectCellAtIndex](this, this.touchedCell._index, A)
    }
};
ADCarouselView.prototype.cellWasSelected = function(A){
    if (ADUtils.objectHasMethod(this.delegate, ADCarouselViewDidSelectCellAtIndex)) {
        this.delegate[ADCarouselViewDidSelectCellAtIndex](this, this.touchedCell._index, A)
    }
};
ADClass(ADCarouselView);
const ADNavigationBarStyleDefault = "default";
const ADNavigationBarStyleBlack = "black";
const ADNavigationBarStyleBlackTranslucent = "black-translucent";
const ADNavigationBarButtonMarginLeft = 5;
const ADNavigationBarButtonMarginRight = 8;
const ADNavigationBarHeight = 44;
const ADNavigationBarAnimationDuration = 0.35;
const ADNavigationBarShouldPushItem = "navigationBarShouldPushItem";
const ADNavigationBarDidPushItem = "navigationBarDidPushItem";
const ADNavigationBarShouldPopItem = "navigationBarShouldPopItem";
const ADNavigationBarDidPopItem = "navigationBarDidPopItem";
ADNavigationBar.superclass = ADView;
ADNavigationBar.synthesizedProperties = ["barStyle", "items", "topItem", "backItem"];
ADNavigationBar.cssClassName = "ad-navigation-bar";
ADNavigationBar.collectionAccessor = "navigationBars";
function ADNavigationBar(A){
    this.delegate = null;
    this._barStyle = ADNavigationBarStyleDefault;
    this._items = [];
    this.busy = false;
    this.itemsToSetupAfterAnimatedChange = null;
    this.callSuper(A);
    if (!this.usesDeclarativeBacking) {
        this.barStyle = ADNavigationBarStyleDefault
    }
}

ADNavigationBar.prototype.setupLayer = function(){
    this.callSuper();
    if (this.layer.hasClassName(ADNavigationBarStyleBlack)) {
        this.barStyle = ADNavigationBarStyleBlack
    }
    else {
        if (this.layer.hasClassName(ADNavigationBarStyleBlackTranslucent)) {
            this.barStyle = ADNavigationBarStyleBlackTranslucent
        }
        else {
            this.barStyle = ADNavigationBarStyleDefault
        }
    }
};
ADNavigationBar.prototype.setSize = function(A){
    this.callSuper(new ADSize(A.width, ADNavigationBarHeight));
    this.updateTopItemLayout()
};
ADNavigationBar.prototype.willMoveToSuperview = function(A){
    if (A !== null && !this.usesDeclarativeBacking && this._size.width == 0) {
        this.size = new ADSize(A._size.width, ADNavigationBarHeight)
    }
};
ADNavigationBar.prototype.layerWasInsertedIntoDocument = function(A){
    this.callSuper();
    this.updateTopItemLayout()
};
ADNavigationBar.prototype.setBarStyle = function(A){
    this.layer.removeClassName(this._barStyle);
    this.layer.addClassName(A);
    this._barStyle = A
};
ADNavigationBar.prototype.getTopItem = function(){
    return (this._items.length > 0) ? this._items[this._items.length - 1] : null
};
ADNavigationBar.prototype.getBackItem = function(){
    return (this._items.length > 1) ? this._items[this._items.length - 2] : null
};
ADNavigationBar.prototype.handleEvent = function(A){
    this.callSuper(A);
    if (this.busy && A.type == "webkitTransitionEnd") {
        this.transitionsEnded()
    }
};
ADNavigationBar.prototype.setItems = function(A){
    this.setItemsAnimated(A, false)
};
ADNavigationBar.prototype.setItemsAnimated = function(B, F){
    if (this.busy || B.length == 0) {
        return
    }
    ADTransaction.begin();
    var C = this.topItem;
    var G = (B.length > 1) ? B[B.length - 2] : null;
    var E = B[B.length - 1];
    for (var D = 0; D < this._items.length; D++) {
        this._items[D].navigationBar = null
    }
    for (var D = 0; D < B.length; D++) {
        B[D].navigationBar = this
    }
    if (C === null) {
        if (!this.shouldPushItem(E)) {
            ADTransaction.commit();
            return
        }
        this.addItemViews(E, null);
        E.sizeItemsAndComputePositionsWithBackItem(null);
        E.updateLayout();
        this._items = B;
        if (ADUtils.objectHasMethod(this.delegate, ADNavigationBarDidPushItem)) {
            this.delegate[ADNavigationBarDidPushItem](this, E)
        }
        ADTransaction.commit()
    }
    else {
        if (C === E) {
            this.removeViewsForItem(C);
            while (this.subviews.length) {
                this.subviews[0].removeFromSuperview()
            }
            this.addItemViews(E, G);
            E.sizeItemsAndComputePositionsWithBackItem(G);
            E.updateLayout();
            this._items = B;
            ADTransaction.commit()
        }
        else {
            var A = (this._items.indexOf(E) == -1);
            if ((A && !this.shouldPushItem(E)) || (!A && !this.shouldPopItem(C))) {
                ADTransaction.commit();
                return
            }
            this.addItemViews(E, G);
            E.sizeItemsAndComputePositionsWithBackItem(G);
            this.itemsAfterTransition = B;
            this.transitionToItem(E, C, A, F)
        }
    }
};
ADNavigationBar.prototype.pushNavigationItemAnimated = function(B, A){
    if (this.busy) {
        return
    }
    ADTransaction.begin();
    if (!this.shouldPushItem(B)) {
        ADTransaction.commit();
        return
    }
    this.setItemsAnimated(this._items.concat([B]), A);
    ADTransaction.commit()
};
ADNavigationBar.prototype.popNavigationItemAnimated = function(A){
    if (this.busy || this._items.length < 2) {
        return
    }
    ADTransaction.begin();
    if (!this.shouldPopItem(this.topItem)) {
        ADTransaction.commit();
        return
    }
    this.setItemsAnimated(this._items.slice(0, this._items.length - 1), A);
    ADTransaction.commit()
};
ADNavigationBar.prototype.addItemViews = function(F, D){
    var C = F._leftBarButtonItem || ((D !== null) ? D.backBarButtonItem : null) || null;
    var B = [C, F.rightBarButtonItem, F.titleView];
    for (var E = 0; E < B.length; E++) {
        var F = B[E];
        if (ADUtils.objectIsUndefined(F) || F === null) {
            continue
        }
        var A = F.view;
        if (A.superview === null || A.superview !== this) {
            this.addSubview(A)
        }
    }
};
ADNavigationBar.prototype.transitionToItem = function(F, D, B, E){
    this.busy = E;
    this.previousItem = D;
    this.transitionWentForward = B;
    ADTransaction.defaults.duration = E ? ADNavigationBarAnimationDuration : 0;
    ADTransaction.defaults.properties = ["opacity", "position"];
    if (D._leftBarButtonItem !== null) {
        if (D._leftBarButtonItem !== F._leftBarButtonItem) {
            new ADTransition({
                target: D._leftBarButtonItem.view,
                properties: ["opacity"],
                to: [0]
            }).start()
        }
    }
    else {
        if (D.leftButton !== null) {
            var A = (B) ? (-D.leftButton.view.size.width - ADNavigationItemLeftButtonLeftMargin) : F.positions.title;
            new ADTransition({
                target: D.leftButton.view,
                to: [0, new ADPoint(A, 0)]
            }).start()
        }
    }
    var A = (B) ? ADNavigationItemLeftButtonLeftMargin : this.size.width;
    new ADTransition({
        target: D.titleView.view,
        to: [0, new ADPoint(A, 0)]
    }).start();
    if (D._rightBarButtonItem !== null && D._rightBarButtonItem !== F._rightBarButtonItem) {
        new ADTransition({
            target: D._rightBarButtonItem.view,
            properties: ["opacity"],
            to: [0]
        }).start()
    }
    if (F._leftBarButtonItem !== null) {
        if (F._leftBarButtonItem !== D._leftBarButtonItem) {
            F._leftBarButtonItem.view.position = new ADPoint(F.positions.leftButton, 0);
            new ADTransition({
                target: F._leftBarButtonItem.view,
                properties: ["opacity"],
                from: [0],
                to: [1]
            }).start()
        }
    }
    else {
        if (F.leftButton !== null) {
            var C = (B) ? D.positions.title : (-D.leftButton.view.size.width - ADNavigationItemLeftButtonLeftMargin);
            new ADTransition({
                target: F.leftButton.view,
                from: [0, new ADPoint(C, 0)],
                to: [F.hidesBackButton ? 0 : 1, new ADPoint(F.positions.leftButton, 0)]
            }).start()
        }
    }
    var C = (B) ? this.size.width : ADNavigationItemLeftButtonLeftMargin;
    new ADTransition({
        target: F.titleView.view,
        from: [0, new ADPoint(C, 0)],
        to: [1, new ADPoint(F.positions.title, 0)]
    }).start();
    if (F._rightBarButtonItem !== null && F._rightBarButtonItem !== D._rightBarButtonItem) {
        F._rightBarButtonItem.view.position = new ADPoint(F.positions.rightButton, 0);
        new ADTransition({
            target: F._rightBarButtonItem.view,
            properties: ["opacity"],
            from: [0],
            to: [1]
        }).start()
    }
    if (E) {
        D.titleView.view.layer.addEventListener("webkitTransitionEnd", this, false)
    }
    ADTransaction.commit();
    if (!E) {
        this.transitionsEnded()
    }
};
ADNavigationBar.prototype.transitionsEnded = function(){
    this._items = this.itemsAfterTransition;
    this.busy = false;
    if (this.transitionWentForward) {
        if (ADUtils.objectHasMethod(this.delegate, ADNavigationBarDidPushItem)) {
            this.delegate[ADNavigationBarDidPushItem](this, this.topItem)
        }
    }
    else {
        if (ADUtils.objectHasMethod(this.delegate, ADNavigationBarDidPopItem)) {
            this.delegate[ADNavigationBarDidPopItem](this, this.previousItem)
        }
    }
    this.removeViewsForItem(this.previousItem)
};
ADNavigationBar.prototype.removeViewsForItem = function(A){
    if (A.leftButton !== null && A.leftButton !== this.topItem.leftButton) {
        A.leftButton.view.removeFromSuperview()
    }
    A.titleView.view.removeFromSuperview();
    if (A._rightBarButtonItem !== null && A._rightBarButtonItem !== A._rightBarButtonItem) {
        A._rightBarButtonItem.view.removeFromSuperview()
    }
    if (A.leftButton !== null) {
        A.leftButton.removeEventListener(ADControlTouchUpInsideEvent, this, false)
    }
};
ADNavigationBar.prototype.updateTopItemLayout = function(){
    if (this._items.length > 0) {
        this.topItem.updateLayoutIfTopItem()
    }
};
ADNavigationBar.prototype.shouldPushItem = function(A){
    if (ADUtils.objectHasMethod(this.delegate, ADNavigationBarShouldPushItem)) {
        return this.delegate[ADNavigationBarShouldPushItem](this, A)
    }
    return true
};
ADNavigationBar.prototype.shouldPopItem = function(A){
    if (ADUtils.objectHasMethod(this.delegate, ADNavigationBarShouldPopItem)) {
        return this.delegate[ADNavigationBarShouldPopItem](this, A)
    }
    return true
};
ADClass(ADNavigationBar);
const ADNavigationItemLeftButtonLeftMargin = 5;
const ADNavigationItemLeftButtonRightMargin = 8;
const ADNavigationItemRightButtonLeftMargin = 11;
const ADNavigationItemRightButtonRightMargin = 5;
ADNavigationItem.superclass = ADObject;
ADNavigationItem.synthesizedProperties = ["title", "backBarButtonItem", "leftBarButtonItem", "rightBarButtonItem", "hidesBackButton"];
ADNavigationItem.mixins = [ADEventTriage];
function ADNavigationItem(A){
    this.callSuper();
    this._title = "";
    this._backBarButtonItem = new ADBarButtonItem(ADBarButtonItemTypeBack);
    this._hidesBackButton = false;
    this._leftBarButtonItem = null;
    this._rightBarButtonItem = null;
    this.titleView = new ADBarButtonItem(ADBarButtonItemTypePlain);
    this.titleView.view.layer.setAttribute("role", "header");
    this.buttons = null;
    this.positions = null;
    this.navigationBar = null;
    this.viewController = null;
    this.title = A || "";
    this._backBarButtonItem.addEventListener(ADControlTouchUpInsideEvent, this, false)
}

ADNavigationItem.prototype.handleControlTouchUpInside = function(A){
    if (this._hidesBackButton) {
        return
    }
    if (this.viewController !== null && this.viewController.parentViewController !== null) {
        this.viewController.parentViewController.popViewControllerAnimated(true)
    }
    else {
        if (this.navigationBar !== null) {
            this.navigationBar.popNavigationItemAnimated(true)
        }
    }
};
ADNavigationItem.prototype.setTitle = function(A){
    this._title = A;
    this.updateLayoutIfTopItem()
};
ADNavigationItem.prototype.setBackBarButtonItem = function(A){
    if (this.navigationBar !== null && this.navigationBar.backItem === this) {
        if (this._backBarButtonItem !== null) {
            this._backBarButtonItem.view.removeFromSuperview()
        }
        this._backBarButtonItem = A;
        this.navigationBar.addSubview(this._backBarButtonItem.view);
        this.navigationBar.topItem.updateLayoutIfTopItem()
    }
    else {
        this._backBarButtonItem = A
    }
    if (this._backBarButtonItem !== null) {
        this._backBarButtonItem.addEventListener(ADControlTouchUpInsideEvent, this, false)
    }
};
ADNavigationItem.prototype.setHidesBackButton = function(A){
    this.setHidesBackButtonAnimated(A, false)
};
ADNavigationItem.prototype.setLeftBarButtonItem = function(A){
    if (this.navigationBar !== null && this.navigationBar.topItem === this) {
        var C = this.getDefaultBackButton();
        if (this.leftButton !== null) {
            this.leftButton.view.removeFromSuperview()
        }
        this._leftBarButtonItem = A;
        var B = this._leftBarButtonItem || this.getDefaultBackButton();
        if (B !== null) {
            this.navigationBar.addSubview(B.view);
            if (this._leftBarButtonItem === null && !this.hidesBackButton) {
                B.view.opacity = 1
            }
        }
        this.updateLayoutIfTopItem()
    }
    else {
        this._leftBarButtonItem = A
    }
};
ADNavigationItem.prototype.setRightBarButtonItem = function(A){
    if (this.navigationBar !== null && this.navigationBar.topItem === this) {
        if (this._rightBarButtonItem !== null) {
            this._rightBarButtonItem.view.removeFromSuperview()
        }
        this._rightBarButtonItem = A;
        this.navigationBar.addSubview(this._rightBarButtonItem.view);
        this.updateLayoutIfTopItem()
    }
    else {
        this._rightBarButtonItem = A
    }
};
ADNavigationItem.prototype.setHidesBackButtonAnimated = function(A, B){
    var C = this.getDefaultBackButton();
    if (this._hidesBackButton == A) {
        return
    }
    this._hidesBackButton = A;
    if (C === null) {
        return
    }
    C.view.transitionsEnabled = B;
    C.view.opacity = A ? 0 : 1
};
ADNavigationItem.prototype.setLeftBarButtonItemAnimated = function(B, A){
    if (!A || this.navigationBar === null || this.navigationBar.topItem !== this) {
        this.leftBarButtonItem = B;
        return
    }
    ADTransaction.begin();
    ADTransaction.defaults.duration = 0.5;
    ADTransaction.defaults.properties = ["opacity"];
    var D = this.leftButton;
    if (D !== null) {
        new ADTransition({
            target: D.view,
            to: [0],
            removesTargetUponCompletion: true
        }).start()
    }
    this._leftBarButtonItem = B;
    var C = this._leftBarButtonItem || this.getDefaultBackButton();
    if (C !== null) {
        this.navigationBar.addSubview(C.view);
        if (this._leftBarButtonItem !== null || !this._hidesBackButton) {
            new ADTransition({
                target: C.view,
                from: [0],
                to: [1]
            }).start()
        }
    }
    this.updateLayoutIfTopItem();
    ADTransaction.commit()
};
ADNavigationItem.prototype.setRightBarButtonItemAnimated = function(B, A){
    if (!A || this.navigationBar === null || this.navigationBar.topItem !== this) {
        this.rightBarButtonItem = B;
        return
    }
    ADTransaction.begin();
    ADTransaction.defaults.duration = 0.5;
    ADTransaction.defaults.properties = ["opacity"];
    var C = this._rightBarButtonItem;
    if (C !== null) {
        new ADTransition({
            target: C.view,
            to: [0],
            removesTargetUponCompletion: true
        }).start()
    }
    this._rightBarButtonItem = B;
    if (this._rightBarButtonItem !== null) {
        this.navigationBar.addSubview(this._rightBarButtonItem.view);
        new ADTransition({
            target: this._rightBarButtonItem.view,
            from: [0],
            to: [1]
        }).start()
    }
    this.updateLayoutIfTopItem();
    ADTransaction.commit()
};
ADNavigationItem.prototype.getDefaultBackButton = function(){
    return (this.navigationBar !== null && this.navigationBar.backItem !== null) ? this.navigationBar.backItem.backBarButtonItem : null
};
ADNavigationItem.prototype.sizeItemsAndComputePositionsWithBackItem = function(A){
    if (this.navigationBar === null) {
        return
    }
    var J = this._leftBarButtonItem || ((A !== null) ? A.backBarButtonItem : null);
    var N = (this._rightBarButtonItem !== null) ? this._rightBarButtonItem.view.size.width : 0;
    var E = this.navigationBar.size.width - ADNavigationItemLeftButtonLeftMargin - ADNavigationItemRightButtonRightMargin;
    if (J !== null) {
        E -= ADNavigationItemLeftButtonRightMargin
    }
    if (this._rightBarButtonItem !== null) {
        E -= ADNavigationItemRightButtonLeftMargin + N
    }
    var M = 0;
    if (J !== null) {
        J.maxWidth = this.navigationBar.size.width / 2;
        if (J !== this._leftBarButtonItem && J.title == "" && J.image === null) {
            J.title = A.title
        }
        M = J.view.size.width
    }
    this.titleView.maxWidth = 0;
    this.titleView.title = this._title;
    var L = this.titleView.view.size.width;
    if (L + M > E) {
        if (J !== null) {
            J.maxWidth = Math.min(Math.max(E / 3, E - L), J.maxWidth);
            M = J.view.size.width
        }
        this.titleView.maxWidth = E - M;
        L = this.titleView.view.size.width
    }
    var C = ADNavigationItemLeftButtonLeftMargin;
    var H = this.navigationBar.size.width - ADNavigationItemRightButtonRightMargin - N;
    var I = C + ((J != null) ? M + ADNavigationItemLeftButtonRightMargin : 0);
    var D = H - L - ((N > 0) ? ADNavigationItemRightButtonLeftMargin : 0);
    var G = (this.navigationBar.size.width - L) / 2;
    var K = G;
    if (G > D || G < I) {
        var B = Math.abs(G - I);
        var F = Math.abs(G - D);
        K = (B < F) ? I : D
    }
    this.leftButton = J;
    this.positions = {
        leftButton: C,
        title: K,
        rightButton: H
    }
};
ADNavigationItem.prototype.updateLayout = function(){
    if (this.positions === null || this.button === null) {
        return
    }
    if (this.leftButton != null) {
        this.leftButton.view.position = new ADPoint(this.positions.leftButton, 0)
    }
    if (this._rightBarButtonItem != null) {
        this._rightBarButtonItem.view.position = new ADPoint(this.positions.rightButton, 0)
    }
    this.titleView.view.position = new ADPoint(this.positions.title, 0)
};
ADNavigationItem.prototype.updateLayoutIfTopItem = function(A){
    if (this.navigationBar === null || this.navigationBar.topItem !== this) {
        return
    }
    this.sizeItemsAndComputePositionsWithBackItem(this.navigationBar.backItem);
    this.updateLayout()
};
ADClass(ADNavigationItem);
const ADTabBarHeight = 49;
const ADTabBarCustomizeGridCellSize = 80;
const ADTabBarDidSelectItem = "tabBarDidSelectItem";
const ADTabBarWillBeginCustomizingItems = "tabBarWillBeginCustomizingItems";
const ADTabBarDidBeginCustomizingItems = "tabBarDidBeginCustomizingItems";
const ADTabBarWillEndCustomizingItemsChanged = "tabBarWillEndCustomizingItemsChanged";
const ADTabBarDidEndCustomizingItemsChanged = "tabBarDidEndCustomizingItemsChanged";
ADTabBar.superclass = ADView;
ADTabBar.synthesizedProperties = ["items", "selectedItem"];
ADTabBar.cssClassName = "ad-tab-bar";
ADTabBar.collectionAccessor = "tabBars";
function ADTabBar(A){
    this.delegate = null;
    this.isCustomizing = false;
    this._items = [];
    this._selectedItem = null;
    this.callSuper(A);
    this.layer.addEventListener("webkitTransitionEnd", this, false)
}

ADTabBar.prototype.readPropertiesFromLayerComputedStyle = function(D){
    this.callSuper(D);
    var B = [];
    var E = this.layer.querySelectorAll("." + ADTabBarItemView.cssClassName);
    var A;
    for (var C = 0; C < E.length; C++) {
        A = E[C]._view;
        A.addEventListener(ADControlTouchDownEvent, this, false);
        B.push(new ADTabBarItem(A))
    }
    this.items = B
};
ADTabBar.prototype.setSize = function(A){
    A.height = ADTabBarHeight;
    this.callSuper(A);
    this.updateLayout()
};
ADTabBar.prototype.willMoveToSuperview = function(A){
    if (A === null) {
        return
    }
    if (this._size.width == 0) {
        this.size = new ADSize(A.size.width, ADTabBarHeight)
    }
    if (this._position.y == 0) {
        this.position = new ADPoint(0, A.size.height - ADTabBarHeight)
    }
};
ADTabBar.prototype.setSelectedItem = function(A){
    if (this._selectedItem === A) {
        return
    }
    if (this._selectedItem != null) {
        this._selectedItem.view.selected = false
    }
    A.view.selected = true;
    this._selectedItem = A;
    if (ADUtils.objectHasMethod(this.delegate, ADTabBarDidSelectItem)) {
        this.delegate[ADTabBarDidSelectItem](this, A)
    }
};
ADTabBar.prototype.setItems = function(A){
    this.setItemsAnimated(A, false)
};
ADTabBar.prototype.setItemsAnimated = function(C, F){
    for (var D = 0; D < this._items.length; D++) {
        var E = this._items[D];
        var A = E.view;
        if (C.indexOf(E) == -1) {
            A.transitionsEnabled = F;
            if (!F) {
                A.removeFromSuperview()
            }
            else {
                A.needsRemoval = true;
                A.transform = "scale(0.001)";
                A.opacity = 0
            }
        }
    }
    var B = (this.size.width - 4) / C.length;
    for (var D = 0; D < C.length; D++) {
        var E = C[D];
        var A = E.view;
        A.position = new ADPoint(2 + Math.round(D * B), 0);
        A.size = new ADSize(Math.round(B), ADTabBarItemViewHeight);
        A.transitionsEnabled = F;
        if (A.superview !== this) {
            this.addSubview(A);
            A.addEventListener(ADControlTouchDownEvent, this, false)
        }
    }
    this._items = C;
    if ((this.selectedItem == null || this.selectedItem.view.superview !== this || this.selectedItem.view.needsRemoval) && C.length > 0) {
        this.selectedItem = C[0]
    }
};
ADTabBar.prototype.updateLayout = function(){
    if (this._items.length > 0) {
        this.setItemsAnimated(this._items, false)
    }
};
ADTabBar.prototype.handleEvent = function(A){
    this.callSuper(A);
    switch (A.type) {
        case ADControlTouchDownEvent:
            this.selectedItem = A.control.tabBarItem;
            break;
        case "webkitTransitionEnd":
            this.removeItemViewIfNeeded(A.target._control);
            break
    }
};
ADTabBar.prototype.removeItemViewIfNeeded = function(A){
    if (A.needsRemoval) {
        A.removeFromSuperview();
        A.needsRemoval = false;
        A.transitionsEnabled = false;
        A.transform = "scale(1)";
        A.opacity = 1
    }
};
ADTabBar.prototype.beginCustomizingItems = function(A){
    if (ADUtils.objectHasMethod(this.delegate, ADTabBarWillBeginCustomizingItems)) {
        this.delegate[ADTabBarWillBeginCustomizingItems](this, A)
    }
    this.isCustomizing = true;
    this.itemsPriorToCustomization = this._items;
    this.customizingItems = A;
    if (ADUtils.objectHasMethod(this.delegate, ADTabBarDidBeginCustomizingItems)) {
        this.delegate[ADTabBarDidBeginCustomizingItems](this, A)
    }
};
ADTabBar.prototype.endCustomizingAnimated = function(A){
    var B = true;
    if (ADUtils.objectHasMethod(this.delegate, ADTabBarWillEndCustomizingItemsChanged)) {
        this.delegate[ADTabBarWillEndCustomizingItemsChanged](this, this.customizingItems, B)
    }
    this.isCustomizing = false;
    if (ADUtils.objectHasMethod(this.delegate, ADTabBarDidEndCustomizingItemsChanged)) {
        this.delegate[ADTabBarDidEndCustomizingItemsChanged](this, this.customizingItems, B)
    }
};
ADClass(ADTabBar);
const ADToolbarHeight = 44;
const ADToolbarEdgeMargin = 6;
const ADToolbarItemMargin = 10;
const ADToolbarStyleDefault = "default";
const ADToolbarStyleBlack = "black";
const ADToolbarStyleBlackTranslucent = "black-translucent";
const ADToolbarAnimationDuration = 0.2;
const ADToolbarFadeOutTransition = {
    properties: ["transform", "opacity"],
    to: ["scale(0.01)", 0]
};
ADToolbar.superclass = ADView;
ADToolbar.synthesizedProperties = ["items", "style"];
ADToolbar.cssClassName = "ad-toolbar";
ADToolbar.collectionAccessor = "toolbars";
function ADToolbar(A){
    this._items = [];
    this._style = "";
    this.callSuper(A);
    if (!this.usesDeclarativeBacking) {
        this.style = ADToolbarStyleDefault
    }
}

ADToolbar.prototype.setupLayer = function(){
    this.callSuper();
    if (this.layer.hasClassName(ADToolbarStyleBlack)) {
        this._style = ADToolbarStyleBlack
    }
    else {
        if (this.layer.hasClassName(ADToolbarStyleBlackTranslucent)) {
            this._style = ADToolbarStyleBlackTranslucent
        }
        else {
            this.style = ADToolbarStyleDefault
        }
    }
};
ADToolbar.prototype.layerWasCreated = function(){
    this.callSuper();
    this.glow = this.layer.appendChild(document.createElement("div"));
    this.glow.className = "glow";
    this.layer.addEventListener("webkitTransitionEnd", this, false);
    this.clipsToBounds = true
};
ADToolbar.prototype.readPropertiesFromLayerAttributes = function(C){
    this.callSuper(C);
    var B = [];
    var A;
    for (var D = 0; D < this.subviews.length; D++) {
        A = this.subviews[D];
        A.willMoveToSuperview(this);
        B.push(new ADBarButtonItem(null, A));
        A.didMoveToSuperview()
    }
    this.setItemsAnimated(B, false)
};
ADToolbar.prototype.setPosition = function(A){
    this.callSuper(A);
    if (this.layerIsInDocument) {
        this.callMethodNameAfterDelay("updateBackgroundWithPosition", 0)
    }
};
ADToolbar.prototype.setSize = function(A){
    A.height = ADToolbarHeight;
    this.callSuper(A);
    this.updateLayout()
};
ADToolbar.prototype.willMoveToSuperview = function(A){
    if (A !== null && this._size.width == 0) {
        this.size = new ADSize(A.size.width, ADToolbarHeight)
    }
};
ADToolbar.prototype.layerWasInsertedIntoDocument = function(){
    this.updateBackgroundWithPosition()
};
ADToolbar.prototype.setStyle = function(A){
    this.layer.removeClassName(this._style);
    this.layer.addClassName(A);
    this._style = A
};
ADToolbar.prototype.setItems = function(A){
    this.setItemsAnimated(A, false)
};
ADToolbar.prototype.setItemsAnimated = function(I, D){
    ADTransaction.begin();
    ADTransaction.defaults.duration = D ? ADToolbarAnimationDuration : 0;
    for (var F = 0; F < this._items.length; F++) {
        var L = this._items[F];
        var J = L.view;
        if (I.indexOf(L) == -1) {
            if (!D) {
                J.removeFromSuperview()
            }
            else {
                J.needsRemoval = true;
                J.applyTransition(ADToolbarFadeOutTransition)
            }
        }
    }
    for (var F = 0; F < I.length; F++) {
        L = I[F];
        J = L.view;
        if (J.superview !== this) {
            L._newItem = true;
            this.addSubview(J);
            J.addPropertyObserver("size", this);
            if (L.type == ADBarButtonItemTypePlain) {
                J.addEventListener(ADControlTouchStateChangeEvent, this, false)
            }
        }
    }
    var E = 0;
    var A = 0;
    for (var F = 0; F < I.length; F++) {
        L = I[F];
        if (L.type == ADBarButtonItemTypeFlexibleSpace) {
            E++
        }
        else {
            A += L.view.size.width
        }
    }
    var B = this.size.width - A - ADToolbarItemMargin * (I.length - 1) - ADToolbarEdgeMargin * 2;
    var K = (E > 0) ? (B / E) : 0;
    var H = ADToolbarEdgeMargin;
    var C;
    for (var F = 0; F < I.length; F++) {
        C = ADToolbarItemMargin;
        L = I[F];
        J = L.view;
        if (L.type == ADBarButtonItemTypeFlexibleSpace) {
            H += K
        }
        else {
            if (L.type == ADBarButtonItemTypeFixedSpace) {
                H += J.size.width;
                C = 0
            }
            else {
                var G = new ADPoint(H, (this.size.height - J.size.height) / 2);
                if (L._newItem) {
                    J.position = G;
                    L._newItem = false;
                    if (D) {
                        J.applyTransition(ADViewTransitionDissolveIn)
                    }
                }
                else {
                    J.applyTransition({
                        properties: ["position"],
                        to: [G]
                    })
                }
                H += J.size.width
            }
        }
        H += C
    }
    ADTransaction.commit();
    this._items = I
};
ADToolbar.prototype.updateLayout = function(){
    if (this._items.length > 0) {
        this.setItemsAnimated(this._items, false)
    }
};
ADToolbar.prototype.updateBackgroundWithPosition = function(){
    var A = window.webkitConvertPointFromNodeToPage(this.layer, new WebKitPoint(0, 0));
    this.layer[A.y == 0 ? "addClassName" : "removeClassName"]("top")
};
ADToolbar.prototype.handleEvent = function(A){
    this.callSuper(A);
    if (A.type == "webkitTransitionEnd") {
        if (A.target === this.layer) {
            return
        }
        else {
            if (A.target !== this.glow) {
                this.removeItemViewIfNeeded(A.target._control)
            }
            else {
                if (this.glow.style.opacity == 0) {
                    this.glow.style.display = "none"
                }
            }
        }
    }
    else {
        if (A.type == ADControlTouchStateChangeEvent) {
            var B = A.control;
            this.glow.style.webkitTransform = ADUtils.t(B.position.x + B.size.width / 2 - 50, 0);
            this.glow.style.opacity = B.touchInside ? 1 : 0;
            this.glow.style.display = "block"
        }
    }
};
ADToolbar.prototype.removeItemViewIfNeeded = function(A){
    if (A.needsRemoval) {
        A.removeFromSuperview();
        A.needsRemoval = false;
        A.transitionsEnabled = false;
        A.transform = "scale(1)";
        A.opacity = 1
    }
};
ADToolbar.prototype.handlePropertyChange = function(B, A){
    this.setItemsAnimated(this._items, false)
};
ADClass(ADToolbar);
const ADProgressViewStyleDefault = "default";
const ADProgressViewStyleBar = "bar";
const ADProgressViewDefaultHeight = 9;
const ADProgressViewBarHeight = 11;
ADProgressView.superclass = ADView;
ADProgressView.synthesizedProperties = ["progress", "style", "width"];
ADProgressView.cssClassName = "ad-progress-view";
ADProgressView.collectionAccessor = "progressViews";
function ADProgressView(A, B){
    this._progress = 0;
    this._style = B || ADProgressViewStyleDefault;
    this.callSuper(A)
}

ADProgressView.prototype.setupLayer = function(){
    this.callSuper();
    this.style = this.layer.hasClassName(ADProgressViewStyleBar) ? ADProgressViewStyleBar : ADProgressViewStyleDefault
};
ADProgressView.prototype.createLayer = function(){
    this.callSuper();
    this.layer.addClassName(this._style)
};
ADProgressView.prototype.layerWasCreated = function(){
    this.callSuper();
    this.bar = this.layer.appendChild(document.createElement("div"))
};
ADProgressView.prototype.readPropertiesFromLayerAttributes = function(A){
    this.callSuper(A);
    this.updateBar()
};
ADProgressView.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-progress":
            this.progress = parseFloat(B);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADProgressView.prototype.setSize = function(A){
    A.height = (this._style == ADProgressViewStyleDefault) ? ADProgressViewDefaultHeight : ADProgressViewBarHeight;
    this.callSuper(A);
    this.updateBar()
};
ADProgressView.prototype.willMoveToSuperview = function(A){
    if (A instanceof ADToolbar) {
        this.style = ADProgressViewStyleBar
    }
};
ADProgressView.prototype.getWidth = function(){
    return this.size.width
};
ADProgressView.prototype.setWidth = function(A){
    this.size = new ADSize(A, 0)
};
ADProgressView.prototype.setProgress = function(A){
    A = Math.max(Math.min(A, 1), 0);
    if (A == this._progress) {
        return
    }
    this._progress = A;
    this.updateBar()
};
ADProgressView.prototype.setStyle = function(A){
    if (A == this._style) {
        return
    }
    this.layer.removeClassName(this._style);
    this.layer.addClassName(A);
    this._style = A
};
ADProgressView.prototype.updateBar = function(){
    this.bar.style.width = ADUtils.px(this.size.width * this._progress)
};
ADClass(ADProgressView);
const ADControlTouchDownEvent = "controlTouchDown";
const ADControlTouchDragInsideEvent = "controlTouchDragInside";
const ADControlTouchDragOutsideEvent = "controlTouchDragOutside";
const ADControlTouchDragEnterEvent = "controlTouchDragEnter";
const ADControlTouchDragExitEvent = "controlTouchDragExit";
const ADControlTouchUpInsideEvent = "controlTouchUpInside";
const ADControlTouchUpOutsideEvent = "controlTouchUpOutside";
const ADControlTouchCancelEvent = "controlTouchCancel";
const ADControlValueChangeEvent = "controlValueChange";
const ADControlTouchStateChangeEvent = "controlTouchStateChange";
const ADControlStateNormal = 0;
const ADControlStateNormalCSS = "normal";
const ADControlStateHighlighted = 1 << 0;
const ADControlStateHighlightedCSS = "highlighted";
const ADControlStateDisabled = 1 << 1;
const ADControlStateDisabledCSS = "disabled";
const ADControlStateSelected = 1 << 2;
const ADControlStateSelectedCSS = "selected";
ADControl.superclass = ADView;
ADControl.mixins = [ADEventTarget];
ADControl.synthesizedProperties = ["state", "enabled", "selected", "highlighted", "touchLayer"];
ADControl.cssClassName = "ad-control";
ADControl.collectionAccessor = "controls";
ADControl.synthesizedEvents = [ADControlTouchDownEvent, ADControlTouchDragInsideEvent, ADControlTouchDragOutsideEvent, ADControlTouchDragEnterEvent, ADControlTouchDragExitEvent, ADControlTouchUpInsideEvent, ADControlTouchUpOutsideEvent, ADControlTouchCancelEvent, ADControlValueChangeEvent, ADControlTouchStateChangeEvent];
function ADControl(A){
    this.tag = 0;
    this._enabled = true;
    this._selected = false;
    this._highlighted = false;
    this._touchLayer = null;
    this.callSuper(A);
    this.tracking = false;
    this.touchInside = false;
    this.layer._control = this;
    this.userInteractionEnabled = true
}

ADControl.prototype.setupLayer = function(){
    this.callSuper();
    var B = this.constructor.synthesizedEvents;
    var C, E, D;
    for (var A = 0; A < B.length; A++) {
        C = B[A];
        E = "ad-on" + C.toLowerCase();
        if (this.layer.hasAttribute(E)) {
            this.addEventListener(C, ADUtils.makeEventHandlerWithString(this.layer.getAttribute(E)), false)
        }
    }
};
ADControl.prototype.layerWasCreated = function(){
    this.callSuper();
    this.eventTarget = this.layer
};
ADControl.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-tag":
            this.tag = parseInt(B, 10);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADControl.prototype.setUserInteractionEnabled = function(A){
    if (this._userInteractionEnabled == A) {
        return
    }
    this.touchLayer[(A ? "add" : "remove") + "EventListener"](ADStartEvent, this, false);
    this._userInteractionEnabled = A
};
ADControl.prototype.getState = function(){
    return (ADControlStateNormal | (this._highlighted ? ADControlStateHighlighted : 0) | (this._enabled ? 0 : ADControlStateDisabled) | (this._selected ? ADControlStateSelected : 0))
};
ADControl.prototype.setEnabled = function(A){
    if (A == this._enabled) {
        return
    }
    this.layer[A ? "removeClassName" : "addClassName"](ADControlStateDisabledCSS);
    this._enabled = A;
    this.userInteractionEnabled = A;
    this.notifyPropertyChange("state")
};
ADControl.prototype.setSelected = function(A){
    if (A == this._selected) {
        return
    }
    this.layer[A ? "addClassName" : "removeClassName"](ADControlStateSelectedCSS);
    this._selected = A;
    this.notifyPropertyChange("state")
};
ADControl.prototype.setHighlighted = function(A){
    if (A == this._highlighted) {
        return
    }
    this.layer[A ? "addClassName" : "removeClassName"](ADControlStateHighlightedCSS);
    this._highlighted = A;
    this.notifyPropertyChange("state")
};
ADControl.prototype.getTouchLayer = function(){
    return (this._touchLayer != null) ? this._touchLayer : this.layer
};
ADControl.prototype.touchesBegan = function(A){
    this.callSuper(A);
    if (!this._enabled) {
        return
    }
    A.preventDefault();
    this.touchInside = true;
    this.highlighted = true;
    this.dispatchEvent(this.createUIEvent(ADControlTouchDownEvent, A));
    this.dispatchEvent(this.createEvent(ADControlTouchStateChangeEvent));
    this.lastProcessedEvent = A
};
ADControl.prototype.touchesMoved = function(B){
    this.callSuper(B);
    this.tracking = true;
    var A = this.pointInside(ADPoint.fromEventInElement(B, this.layer));
    var C = A ? ADControlTouchDragInsideEvent : ADControlTouchDragOutsideEvent;
    if (A != this.touchInside) {
        this.touchInside = A;
        this.highlighted = A;
        C = A ? ADControlTouchDragEnterEvent : ADControlTouchDragExitEvent;
        this.dispatchEvent(this.createEvent(ADControlTouchStateChangeEvent))
    }
    this.dispatchEvent(this.createUIEvent(C, B));
    this.lastProcessedEvent = B
};
ADControl.prototype.touchesEnded = function(B){
    this.callSuper(B);
    this.tracking = false;
    this.highlighted = false;
    var A = this.touchInside ? ADControlTouchUpInsideEvent : ADControlTouchUpOutsideEvent;
    this.dispatchEvent(this.createUIEvent(A, this.lastProcessedEvent));
    this.touchInside = false;
    this.dispatchEvent(this.createEvent(ADControlTouchStateChangeEvent))
};
ADControl.prototype.touchesCancelled = function(A){
    this.callSuper(A);
    this.tracking = false;
    this.highlighted = false;
    this.dispatchEvent(this.createUIEvent(ADControlTouchCancelEvent, A))
};
ADControl.prototype.createEvent = function(A){
    var B = document.createEvent("Event");
    B.initEvent(A, true, false);
    B.control = this;
    return B
};
ADControl.prototype.createUIEvent = function(B, C){
    var A = ADUtils.createUIEvent(B, C);
    A.control = this;
    return A
};
ADControl.isNodeInControlHierarchyBoundedByElement = function(B, A){
    while (B.parentNode) {
        if (B.hasOwnProperty("_view") && B._view instanceof ADControl) {
            return true
        }
        if (B === A) {
            return false
        }
        B = B.parentNode
    }
    return false
};
ADControl.initialize = function(){
    if (!this.hasOwnProperty("synthesizedEvents")) {
        this.synthesizedEvents = []
    }
    var A = this;
    while (A.superclass) {
        A = A.superclass;
        if (A.hasOwnProperty("synthesizedEvents")) {
            this.synthesizedEvents = this.synthesizedEvents.concat(A.synthesizedEvents)
        }
    }
};
ADClass(ADControl);
const ADBarItemDisabledCSS = "disabled";
ADBarItem.superclass = ADObject;
ADBarItem.synthesizedProperties = ["enabled", "image", "imageOffset", "title"];
function ADBarItem(){
    this.callSuper();
    this._enabled = true;
    this._image = null;
    this._imageOffset = null;
    this._title = "";
    this.tag = 0
}

ADClass(ADBarItem);
const ADBarButtonHeight = 30;
const ADBarButtonPointyXOffset = 3;
ADBarButton.superclass = ADControl;
ADBarButton.synthesizedProperties = ["maxWidth", "width", "type", "style", "image", "imageOffset", "title"];
ADBarButton.cssClassName = "ad-bar-button";
ADBarButton.collectionAccessor = "barButtons";
function ADBarButton(A, B){
    this._maxWidth = 0;
    this._width = 0;
    this._type = "";
    this._style = "";
    this._image = null;
    this._imageOffset = null;
    this._title = "";
    this.usesAutomaticImageOffset = true;
    this.callSuper(A);
    if (!this.usesDeclarativeBacking) {
        this.type = (B != null) ? B : ADBarButtonItemTypeSquare;
        this.style = ADBarButtonItemStyleDefault
    }
}

ADBarButton.prototype.setupLayer = function(){
    this.callSuper();
    if (this.layer.hasClassName(ADBarButtonItemStyleBlack)) {
        this._style = ADBarButtonItemStyleBlack
    }
    else {
        if (this.layer.hasClassName(ADBarButtonItemStyleDefault)) {
            this._style = ADBarButtonItemStyleDefault
        }
        else {
            if (this.layer.hasClassName(ADBarButtonItemStyleLightBlue)) {
                this._style = ADBarButtonItemStyleLightBlue
            }
        }
    }
    if (this.layer.hasClassName(ADBarButtonItemTypePlain)) {
        this._type = ADBarButtonItemTypePlain
    }
    else {
        if (this.layer.hasClassName(ADBarButtonItemTypeSquare)) {
            this._type = ADBarButtonItemTypeSquare
        }
        else {
            if (this.layer.hasClassName(ADBarButtonItemTypeBack)) {
                this._type = ADBarButtonItemTypeBack
            }
            else {
                if (this.layer.hasClassName(ADBarButtonItemTypeForward)) {
                    this._type = ADBarButtonItemTypeForward
                }
                else {
                    if (this.layer.hasClassName(ADBarButtonItemTypeFlexibleSpace)) {
                        this._type = ADBarButtonItemTypeFlexibleSpace
                    }
                    else {
                        if (this.layer.hasClassName(ADBarButtonItemTypeFixedSpace)) {
                            this._type = ADBarButtonItemTypeFixedSpace
                        }
                    }
                }
            }
        }
    }
    this.width = this.layer.hasAttribute("ad-width") ? parseInt(this.layer.getAttribute("ad-width"), 10) : 0
};
ADBarButton.prototype.layerWasCreated = function(){
    this.callSuper();
    this.layer.setAttribute("role", "button");
    this.background = this.layer.appendChild(document.createElement("div"));
    this.icon = this.layer.appendChild(document.createElement("img"))
};
ADBarButton.prototype.readPropertiesFromLayerComputedStyle = function(A){
    this.callSuper(A);
    var B = parseInt(A.maxWidth, 10);
    this.maxWidth = isNaN(B) ? 0 : B
};
ADBarButton.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-width":
            this.width = parseInt(B, 10);
            break;
        case "ad-title":
            this.title = B;
            break;
        case "ad-image":
            this.image = new ADImage(B);
            break;
        case "ad-image-offset-x":
            this.imageOffset = new ADPoint(parseInt(B, 10), this.imageOffset.y);
            break;
        case "ad-image-offset-y":
            this.imageOffset = new ADPoint(this.imageOffset.x, parseInt(B, 10));
            break;
        default:
            this.callSuper(B, A)
    }
};
ADBarButton.prototype.layerWasInsertedIntoDocument = function(){
    this.callSuper();
    if (this._title != "" && this._width == 0) {
        this.autoSizeTitle()
    }
};
ADBarButton.prototype.getSize = function(){
    var A = (this._maxWidth == 0) ? this._size.width : Math.min(this._maxWidth, this._size.width);
    return new ADSize(A, this._size.height)
};
ADBarButton.prototype.setSize = function(A){
    A.height = ADBarButtonHeight;
    this.callSuper(A)
};
ADBarButton.prototype.touchesBegan = function(A){
    if (this.type == ADBarButtonItemTypeFlexibleSpace || this.type == ADBarButtonItemTypeFixedSpace) {
        A.preventDefault();
        return
    }
    this.callSuper(A)
};
ADBarButton.prototype.setMaxWidth = function(A){
    this.background.style.maxWidth = (A == 0) ? "inherit" : ADUtils.px(A);
    this._maxWidth = A;
    if (this._width == 0) {
        this.autoSizeTitle()
    }
};
ADBarButton.prototype.setWidth = function(A){
    if (A == 0) {
        this.autoSizeTitle();
        this.autoSizeImage();
        this.positionImage()
    }
    else {
        this._width = A;
        this.size = new ADSize(A, ADBarButtonHeight);
        this.positionImage()
    }
};
ADBarButton.prototype.autoSizeTitle = function(){
    if (this._title != "" && this.layerIsInDocument) {
        this.layer.style.width = "auto";
        var A = parseInt(window.getComputedStyle(this.layer).width);
        this.size = new ADSize(A, this._size.height)
    }
};
ADBarButton.prototype.autoSizeImage = function(){
    if (this._image !== null) {
        var B = this.getBorderXOffsets();
        var A = this._image.width + B.left + B.right;
        this.size = new ADSize(A, this._size.height)
    }
};
ADBarButton.prototype.setTitle = function(A){
    this.background.innerText = A;
    this._title = A;
    if (this._width == 0) {
        this.autoSizeTitle()
    }
};
ADBarButton.prototype.setImage = function(A){
    this.icon.src = A.url;
    this._image = A;
    if (A.loaded) {
        this.positionImage()
    }
    else {
        A.addPropertyObserver("loaded", this)
    }
};
ADBarButton.prototype.getImageOffset = function(){
    return new ADPoint(parseInt(this.icon.style.left), parseInt(this.icon.style.top))
};
ADBarButton.prototype.setImageOffset = function(A){
    this.icon.style.left = ADUtils.px(A.x);
    this.icon.style.top = ADUtils.px(A.y);
    this.usesAutomaticImageOffset = false
};
ADBarButton.prototype.positionImage = function(){
    if (this._image === null || !this.usesAutomaticImageOffset) {
        return
    }
    var A = Math.min(this._image.height, this.size.height);
    this.icon.height = A;
    var B = new ADPoint((this._size.width - this._image.width) / 2, (ADBarButtonHeight - this._image.height) / 2);
    if (this._type == ADBarButtonItemTypeBack) {
        B.x += ADBarButtonPointyXOffset
    }
    if (this._type == ADBarButtonItemTypeForward) {
        B.x -= ADBarButtonPointyXOffset
    }
    this.imageOffset = B;
    this.usesAutomaticImageOffset = true
};
ADBarButton.prototype.setType = function(A){
    this.layer.removeClassName(this._type);
    this.layer.addClassName(A);
    this._type = A
};
ADBarButton.prototype.setStyle = function(A){
    this.layer.removeClassName(this._style);
    this.layer.addClassName(A);
    this._style = A
};
ADBarButton.prototype.getBorderXOffsets = function(){
    var B = window.getComputedStyle(this.background);
    var C = B.getPropertyCSSValue("border-left-width");
    var A = B.getPropertyCSSValue("border-right-width");
    return {
        left: (C !== null) ? C.getFloatValue(CSSPrimitiveValue.CSS_PX) : 0,
        right: (A !== null) ? A.getFloatValue(CSSPrimitiveValue.CSS_PX) : 0
    }
};
ADBarButton.prototype.handlePropertyChange = function(B, A){
    if (this._width == 0) {
        this.autoSizeImage()
    }
    this.positionImage()
};
ADBarButton.prototype.dispatchEvent = function(A){
    A.barButtonItem = this.barButtonItem;
    this.callSuper(A)
};
ADClass(ADBarButton);
const ADBarButtonItemTypePlain = "plain";
const ADBarButtonItemTypeSquare = "square";
const ADBarButtonItemTypeBack = "back";
const ADBarButtonItemTypeForward = "forward";
const ADBarButtonItemTypeFlexibleSpace = "flexible-space";
const ADBarButtonItemTypeFixedSpace = "fixed-space";
const ADBarButtonItemStyleBlack = "black";
const ADBarButtonItemStyleDefault = "default";
const ADBarButtonItemStyleLightBlue = "lightblue";
ADBarButtonItem.superclass = ADBarItem;
ADBarButtonItem.mixins = [ADEventTarget];
ADBarButtonItem.synthesizedProperties = ["maxWidth", "customView", "width", "type", "style"];
function ADBarButtonItem(B, A){
    this.callSuper();
    this.view = A || new ADBarButton(null, B);
    this.view.isCustomView = !(this.view instanceof ADBarButton);
    this.view.barButtonItem = this;
    this.eventTarget = this.view
}

ADBarButtonItem.prototype.getEnabled = function(){
    return (!this.view.isCustomView) ? this.view.enabled : this.view.userInteractionEnabled
};
ADBarButtonItem.prototype.setEnabled = function(A){
    if (this.view.isCustomView) {
        this.view.userInteractionEnabled = A
    }
    else {
        this.view.enabled = A
    }
};
ADBarButtonItem.prototype.getMaxWidth = function(){
    return (!this.view.isCustomView) ? this.view.maxWidth : 0
};
ADBarButtonItem.prototype.setMaxWidth = function(A){
    if (!this.view.isCustomView) {
        this.view.maxWidth = A
    }
};
ADBarButtonItem.prototype.getWidth = function(){
    return (!this.view.isCustomView) ? this.view.width : this.view.size.width
};
ADBarButtonItem.prototype.setWidth = function(A){
    if (this.view.isCustomView) {
        this.view.size = new ADSize(A, this.view.size.height)
    }
    else {
        this.view.width = A
    }
};
ADBarButtonItem.prototype.getTitle = function(){
    return (!this.view.isCustomView) ? this.view.title : ""
};
ADBarButtonItem.prototype.setTitle = function(A){
    if (!this.view.isCustomView) {
        this.view.title = A
    }
};
ADBarButtonItem.prototype.getImage = function(){
    return (!this.view.isCustomView) ? this.view.image : null
};
ADBarButtonItem.prototype.setImage = function(A){
    if (!this.view.isCustomView) {
        this.view.image = A
    }
};
ADBarButtonItem.prototype.getImageOffset = function(){
    return (!this.view.isCustomView) ? this.view.imageOffset : null
};
ADBarButtonItem.prototype.setImageOffset = function(A){
    if (!this.view.isCustomView) {
        this.view.imageOffset = A
    }
};
ADBarButtonItem.prototype.getType = function(){
    return (!this.view.isCustomView) ? this.view.type : ""
};
ADBarButtonItem.prototype.setType = function(A){
    if (!this.view.isCustomView) {
        this.view.type = A
    }
};
ADBarButtonItem.prototype.getStyle = function(A){
    return (!this.view.isCustomView) ? this.view.style : ""
};
ADBarButtonItem.prototype.setStyle = function(A){
    if (!this.view.isCustomView) {
        this.view.style = A
    }
};
ADBarButtonItem.prototype.getCustomView = function(){
    return (this.view.isCustomView) ? this.view : null
};
ADBarButtonItem.prototype.setCustomView = function(A){
    if (A === this.view) {
        return
    }
    if (!this.view.isCustomView) {
        this.view = undefined
    }
    A.isCustomView = true;
    A.barButtonItem = this;
    this.view = A
};
ADClass(ADBarButtonItem);
const ADSliderThumbWidth = 23;
const ADSliderHeight = 23;
const ADSliderTouchedCSS = "touched";
ADSlider.superclass = ADControl;
ADSlider.synthesizedProperties = ["minimumValue", "maximumValue", "value"];
ADSlider.cssClassName = "ad-slider";
ADSlider.collectionAccessor = "sliders";
function ADSlider(A){
    this.continuous = true;
    this._minimumValue = 0;
    this._maximumValue = 1;
    this._value = 0;
    this.callSuper(A)
}

ADSlider.prototype.layerWasCreated = function(){
    this.callSuper();
    this.fill = this.layer.appendChild(document.createElement("div"));
    this.fill.className = "ad-slider-fill";
    this.leftFill = this.fill.appendChild(document.createElement("div"));
    this.middleFill = this.fill.appendChild(document.createElement("div"));
    this.rightFill = this.fill.appendChild(document.createElement("div"));
    this.thumb = this.layer.appendChild(document.createElement("div"));
    this.thumb.className = "ad-slider-thumb";
    this._touchLayer = this.thumb
};
ADSlider.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-continuous":
            this.continuous = (B != "false");
            break;
        case "ad-minimum-value":
            this.minimumValue = parseFloat(B);
            break;
        case "ad-maximum-value":
            this.maximumValue = parseFloat(B);
            break;
        case "ad-value":
            this.value = parseFloat(B);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADSlider.prototype.setSize = function(A){
    A.height = ADSliderHeight;
    this.callSuper(A)
};
ADSlider.prototype.setMinimumValue = function(A){
    if (A >= this.maximumValue) {
        return
    }
    this._minimumValue = A;
    if (this.value < A) {
        this.value = A
    }
    else {
        this.updateThumb()
    }
};
ADSlider.prototype.setMaximumValue = function(A){
    if (A <= this.minimumValue) {
        return
    }
    this._maximumValue = A;
    if (this.value > A) {
        this.value = A
    }
    else {
        this.updateThumb()
    }
};
ADSlider.prototype.setValue = function(A){
    this.setValueAnimated(A, false)
};
ADSlider.prototype.setValueAnimated = function(B, A){
    B = Math.max(Math.min(B, this.maximumValue), this.minimumValue);
    if (B == this._value) {
        return
    }
    var C = A ? "0.25s" : "0s";
    this.thumb.style.webkitTransitionDuration = C;
    this.middleFill.style.webkitTransitionDuration = C;
    this.rightFill.style.webkitTransitionDuration = C;
    this._value = B;
    this.updateThumb();
    if (this.continuous) {
        this.notifyValueChanged()
    }
};
ADSlider.prototype.updateThumb = function(A){
    var B = (this.value - this.minimumValue) / (this.maximumValue - this.minimumValue);
    var A = B * (this.size.width + 2 - ADSliderThumbWidth);
    this.updateGutterWithOffset(B);
    this.thumb.style.webkitTransform = ADUtils.t(A, 0)
};
ADSlider.prototype.updateGutterWithOffset = function(B){
    var A = B * (this.size.width - 16);
    this.middleFill.style.webkitTransform = "scale(" + (A + 1) + ", 1)";
    this.rightFill.style.webkitTransform = ADUtils.t(A, 0)
};
ADSlider.prototype.notifyValueChanged = function(){
    this.dispatchEvent(this.createEvent(ADControlValueChangeEvent))
};
ADSlider.prototype.touchesBegan = function(A){
    this.callSuper(A);
    this.maxX = this.size.width - ADSliderThumbWidth;
    this.internalX = ADPoint.fromEventInElement(A, this.touchLayer).x;
    this.startValue = this.value;
    this.valueRange = this.maximumValue - this.minimumValue;
    this.thumb.addClassName(ADSliderTouchedCSS)
};
ADSlider.prototype.touchesMoved = function(B){
    this.callSuper(B);
    var A = ADPoint.fromEventInElement(B, this.layer).x - this.internalX;
    this.value = this.minimumValue + (A / this.maxX) * this.valueRange
};
ADSlider.prototype.touchesEnded = function(A){
    this.callSuper(A);
    if (!this.continuous && this.startValue != this.value) {
        this.notifyValueChanged()
    }
    this.thumb.removeClassName(ADSliderTouchedCSS)
};
ADSlider.prototype.touchesCancelled = function(A){
    this.callSuper(A);
    this.setValue(this.startValue, true);
    this.thumb.removeClassName(ADSliderTouchedCSS)
};
ADClass(ADSlider);
const ADTabBarItemViewHeight = 44;
ADTabBarItemView.superclass = ADControl;
ADTabBarItemView.synthesizedProperties = ["title", "image", "badgeValue"];
ADTabBarItemView.cssClassName = "ad-tab-bar-item";
function ADTabBarItemView(A){
    this._title = "";
    this._image = "";
    this._badgeValue = 0;
    this.callSuper(A)
}

ADTabBarItemView.prototype.layerWasCreated = function(){
    this.callSuper();
    this.canvasContainer = this.layer.appendChild(document.createElement("div"));
    this.defaultCanvas = this.canvasContainer.appendChild(document.createElement("canvas"));
    this.selectedCanvas = this.canvasContainer.appendChild(document.createElement("canvas"));
    this.canvasContainer.className = "image";
    this.label = this.layer.appendChild(document.createElement("div"));
    this.label.className = "title";
    this.badge = this.layer.appendChild(document.createElement("div"));
    this.badge.className = "badge";
    this.badgeContent = this.badge.appendChild(document.createElement("span"))
};
ADTabBarItemView.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-badge-value":
            this.badgeValue = parseInt(B, 10);
            break;
        case "ad-title":
            this.title = B;
            break;
        case "ad-image":
            this.image = new ADImage(B);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADTabBarItemView.prototype.setSize = function(A){
    this.callSuper(A);
    this.badgeContent.style.maxWidth = ADUtils.px(this.size.width - 12);
    this.updateBadgePosition();
    this.updateImagePosition()
};
ADTabBarItemView.prototype.didMoveToSuperview = function(){
    this.callSuper();
    this.callMethodNameAfterDelay("updateBadgePosition", 0)
};
ADTabBarItemView.prototype.setTitle = function(A){
    this.label.textContent = A;
    this._title = A
};
ADTabBarItemView.prototype.setImage = function(A){
    this._image = A;
    if (A.loaded) {
        this.updateCanvasImages()
    }
    else {
        A.addPropertyObserver("loaded", this, "updateCanvasImages")
    }
};
ADTabBarItemView.prototype.setBadgeValue = function(A){
    this._badgeValue = A;
    if (A > 0) {
        this.badge.style.display = "block";
        this.badgeContent.textContent = A;
        this.updateBadgePosition()
    }
    else {
        this.badge.style.display = "none"
    }
};
ADTabBarItemView.prototype.updateBadgePosition = function(){
    if (this.superview == null) {
        return
    }
    if (this.badge.offsetWidth < this.size.width / 2) {
        this.badge.style.left = ADUtils.px(Math.round(this.size.width / 2))
    }
    else {
        this.badge.style.right = ADUtils.px(-4)
    }
};
ADTabBarItemView.prototype.updateImagePosition = function(){
    this.canvasContainer.style.left = ADUtils.px((this._size.width - ADTabBarItemView.selectedMaskImage.width) / 2 - 3)
};
ADTabBarItemView.prototype.updateCanvasImages = function(A){
    if (this._image === null || !this._image.loaded) {
        return
    }
    this.drawImage(this.defaultCanvas, false);
    this.drawImage(this.selectedCanvas, true)
};
ADTabBarItemView.prototype.drawImage = function(C, E){
    var G = ADTabBarItemView.selectedMaskImage;
    var D = G.element.width;
    var A = G.element.height;
    C.width = D;
    C.height = A;
    var B = C.getContext("2d");
    B.clearRect(0, 0, D, A);
    B.globalCompositeOperation = "source-over";
    B.drawImage(this._image.element, (D - this._image.element.width) / 2, (A - this._image.element.height) / 2);
    B.globalCompositeOperation = "source-in";
    if (E) {
        B.drawImage(G.element, 0, 0)
    }
    else {
        var F = B.createLinearGradient(0, 0, 0, A);
        F.addColorStop(0, "rgb(69%, 69%, 69%)");
        F.addColorStop(1, "rgb(31%, 31%, 31%)");
        B.fillStyle = F;
        B.fillRect(0, 0, D, A)
    }
};
ADClass(ADTabBarItemView);
ADTabBarItemView.init = function(){
    ADTabBarItemView.selectedMaskImage = new ADImage(ADUtils.assetsPath + "bar/UITabBarBlueGradient.png", true)
};
window.addEventListener("DOMContentLoaded", ADTabBarItemView.init, false);
ADTabBarItem.superclass = ADBarItem;
ADTabBarItem.synthesizedProperties = ["badgeValue"];
function ADTabBarItem(A){
    this.callSuper();
    this.view = A || new ADTabBarItemView(null);
    this.view.tabBarItem = this
}

ADTabBarItem.initWithTitleImageAndTag = function(D, C, A){
    var B = new ADTabBarItem();
    B.title = D;
    B.image = C;
    B.tag = A;
    return B
};
ADTabBarItem.prototype.getTitle = function(){
    return this.view.title
};
ADTabBarItem.prototype.setTitle = function(A){
    this.view.title = A
};
ADTabBarItem.prototype.getImage = function(){
    return this.view.image
};
ADTabBarItem.prototype.setImage = function(A){
    this.view.image = A
};
ADTabBarItem.prototype.getBadgeValue = function(){
    return this.view.badgeValue
};
ADTabBarItem.prototype.setBadgeValue = function(A){
    this.view.badgeValue = A
};
ADTabBarItem.prototype.getEnabled = function(){
    return this.view.enabled
};
ADTabBarItem.prototype.setEnabled = function(A){
    this.view.enabled = A
};
ADClass(ADTabBarItem);
const ADRatingControlStarWidth = 21;
const ADRatingControlStarHeight = 21;
const ADRatingControlMinValue = 0;
const ADRatingControlMaxValue = 5;
const ADRatingControlMinMargin = 10;
const ADRatingControlFilledCSS = "filled";
ADRatingControl.superclass = ADControl;
ADRatingControl.synthesizedProperties = ["width", "value"];
ADRatingControl.cssClassName = "ad-rating-control";
ADRatingControl.collectionAccessor = "ratingControls";
function ADRatingControl(A){
    this.margin = ADRatingControlMinMargin;
    this.numStars = ADRatingControlMaxValue - ADRatingControlMinValue;
    this.minWidth = this.numStars * ADRatingControlStarWidth + (this.numStars - 1) * ADRatingControlMinMargin;
    this.stars = [];
    this._value = 0;
    this.callSuper(A);
    this.size = new ADSize()
}

ADRatingControl.prototype.layerWasCreated = function(){
    this.callSuper();
    for (var A = 0; A < this.numStars; A++) {
        this.stars.push(this.layer.appendChild(document.createElement("div")))
    }
};
ADRatingControl.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-value":
            this.value = parseInt(B, 10);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADRatingControl.prototype.setSize = function(A){
    A.width = Math.max(this.minWidth, A.width);
    A.height = ADRatingControlStarHeight;
    this.callSuper(A);
    this.margin = (this.size.width - (this.numStars * ADRatingControlStarWidth)) / (this.numStars - 1);
    for (var B = 0; B < this.numStars - 1; B++) {
        this.stars[B].style.marginRight = ADUtils.px(this.margin)
    }
};
ADRatingControl.prototype.getWidth = function(){
    return this.size.width
};
ADRatingControl.prototype.setWidth = function(A){
    this.size = new ADSize(A, 0)
};
ADRatingControl.prototype.setValue = function(B){
    B = Math.max(Math.min(B, ADRatingControlMaxValue), ADRatingControlMinValue);
    if (B == this._value) {
        return
    }
    this._value = B;
    for (var A = 0; A < this.numStars; A++) {
        this.stars[A].className = (A >= B - ADRatingControlMinValue) ? "" : ADRatingControlFilledCSS
    }
    this.dispatchEvent(this.createEvent(ADControlValueChangeEvent))
};
ADRatingControl.prototype.touchesBegan = function(A){
    this.callSuper(A);
    this.startX = ADPoint.fromEventInElement(A, this.layer).x;
    this.startValue = this.value
};
ADRatingControl.prototype.touchesMoved = function(A){
    this.callSuper(A);
    this.setValueFromX(ADPoint.fromEventInElement(A, this.layer).x)
};
ADRatingControl.prototype.touchesEnded = function(A){
    if (!this.tracking) {
        this.setValueFromX(this.startX)
    }
    this.callSuper(A)
};
ADRatingControl.prototype.touchesCancelled = function(A){
    this.callSuper(A);
    this.value = this.startValue
};
ADRatingControl.prototype.setValueFromX = function(A){
    this.value = Math.floor((A + ADRatingControlStarWidth + this.margin + this.margin / 2) / (ADRatingControlStarWidth + this.margin))
};
ADClass(ADRatingControl);
const ADPageControlSize = 6;
const ADPageControlMargin = 10;
const ADPageControlSelectedCSS = "selected";
ADPageControl.superclass = ADControl;
ADPageControl.synthesizedProperties = ["currentPage", "numberOfPages", "hidesForSinglePage"];
ADPageControl.cssClassName = "ad-page-control";
ADPageControl.collectionAccessor = "pageControls";
function ADPageControl(A){
    this.dots = [];
    this.defersCurrentPageDisplay = false;
    this._currentPage = 0;
    this._numberOfPages = 0;
    this._hidesForSinglePage = false;
    this.callSuper(A);
    this.layer.addEventListener(ADControlTouchUpInsideEvent, this, false)
}

ADPageControl.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-number-of-pages":
            this.numberOfPages = parseInt(B, 10);
            break;
        case "ad-hides-for-single-page":
            this.hidesForSinglePage = (B == "true");
            break;
        case "ad-current-page":
            this.currentPage = parseInt(B, 10);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADPageControl.prototype.setSize = function(A){
    A.width = Math.max(A.width, ADPageControlSize);
    A.height = Math.max(A.height, ADPageControlSize);
    this.callSuper(A);
    this.updateLayout()
};
ADPageControl.prototype.setCurrentPage = function(A){
    if (this._currentPage == A || A < 0 || A >= this.numberOfPages) {
        return
    }
    this._currentPage = A;
    if (!this.defersCurrentPageDisplay) {
        this.updateCurrentPageDisplay()
    }
    this.dispatchEvent(this.createEvent(ADControlValueChangeEvent))
};
ADPageControl.prototype.setNumberOfPages = function(A){
    if (this._numberOfPages == A || A < 0) {
        return
    }
    if (this.dots.length > A) {
        while (this.dots.length > A) {
            this.layer.removeChild(this.dots.pop())
        }
    }
    else {
        while (this.dots.length < A) {
            this.dots.push(this.layer.appendChild(document.createElement("div")))
        }
    }
    this._numberOfPages = A;
    this.updateCurrentPageDisplay();
    this.updateLayout();
    this.updateVisibility()
};
ADPageControl.prototype.setHidesForSinglePage = function(A){
    this._hidesForSinglePage = A;
    this.updateVisibility()
};
ADPageControl.prototype.updateCurrentPageDisplay = function(){
    var A = this.layer.querySelector("." + ADPageControlSelectedCSS);
    if (A) {
        A.removeClassName(ADPageControlSelectedCSS)
    }
    if (this.currentPage >= 0 && this.currentPage < this.dots.length) {
        this.dots[this.currentPage].addClassName(ADPageControlSelectedCSS)
    }
};
ADPageControl.prototype.sizeForNumberOfPages = function(A){
    return A * (ADPageControlSize + ADPageControlMargin) - ADPageControlMargin
};
ADPageControl.prototype.updateLayout = function(A){
    this.layer.style.paddingLeft = ADUtils.px((this.size.width - this.sizeForNumberOfPages(this._numberOfPages)) / 2);
    this.layer.style.paddingTop = ADUtils.px((this.size.height - ADPageControlSize) / 2)
};
ADPageControl.prototype.updateVisibility = function(){
    this.opacity = (this.numberOfPages == 1 && this.hidesForSinglePage) ? 0 : 1
};
ADPageControl.prototype.handleEvent = function(C){
    this.callSuper(C);
    if (C.type == ADControlTouchUpInsideEvent) {
        if (this.numberOfPages <= 1) {
            return
        }
        var B = ADPoint.fromEventInElement(C, this.layer).x;
        var A = this.dots[this.currentPage].offsetLeft;
        if (B <= A - ADPageControlMargin / 2) {
            this.currentPage--
        }
        else {
            if (B >= A + ADPageControlSize + ADPageControlMargin / 2) {
                this.currentPage++
            }
        }
    }
};
ADClass(ADPageControl);
const ADSegmentedControlNoSegment = -1;
const ADSegmentedControlStylePlain = "plain";
const ADSegmentedControlStyleBordered = "bordered";
const ADSegmentedControlStyleBar = "bar";
const ADSegmentedControlStyleBarBlack = "bar black";
const ADSegmentedControlSegmentSelectedCSS = "selected";
const ADSegmentedControlSegmentMomentarySelectionTimer = 200;
ADSegmentedControl.superclass = ADControl;
ADSegmentedControl.synthesizedProperties = ["width", "style", "numberOfSegments", "selectedSegmentIndex", "momentary"];
ADSegmentedControl.cssClassName = "ad-segmented-control";
ADSegmentedControl.collectionAccessor = "segmentedControls";
function ADSegmentedControl(B, A){
    this._width = 0;
    this._style = "";
    this._numberOfSegments = 0;
    this._selectedSegmentIndex = ADSegmentedControlNoSegment;
    this._momentary = false;
    this.callSuper(B);
    if (!ADUtils.objectIsUndefined(A) && ADUtils.objectIsArray(A)) {
        this.populateWithItems(A)
    }
}

ADSegmentedControl.prototype.createLayer = function(){
    this.callSuper();
    this.style = ADSegmentedControlStylePlain
};
ADSegmentedControl.prototype.readPropertiesFromLayerComputedStyle = function(A){
    this.callSuper(A);
    if (this.layer.hasClassName(ADSegmentedControlStyleBordered)) {
        this._style = ADSegmentedControlStyleBordered
    }
    else {
        if (this.layer.hasClassName(ADSegmentedControlStyleBar)) {
            this._style = ADSegmentedControlStyleBar
        }
        else {
            this.style = ADSegmentedControlStylePlain
        }
    }
};
ADSegmentedControl.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-selected-segment-index":
            this.selectedSegmentIndex = parseInt(B, 10);
            break;
        case "ad-momentary":
            this.momentary = (B != "false");
            break;
        default:
            this.callSuper(B, A)
    }
};
ADSegmentedControl.prototype.setSize = function(A){
    A.height = (this._style == ADSegmentedControlStyleBar || this._style == ADSegmentedControlStyleBarBlack) ? 30 : 44;
    this.callSuper(A);
    this.updateLayout()
};
ADSegmentedControl.prototype.layerWasInsertedIntoDocument = function(){
    this.updateLayout()
};
ADSegmentedControl.prototype.didAddSubview = function(A){
    this.updateLayout();
    if (this._selectedSegmentIndex != ADSegmentedControlNoSegment) {
        if (A._indexInSuperviewSubviews <= this._selectedSegmentIndex) {
            this.selectedSegmentIndex++
        }
    }
};
ADSegmentedControl.prototype.willMoveToSuperview = function(A){
    if (A instanceof ADToolbar) {
        this.style = (A.style === ADToolbarStyleDefault) ? ADSegmentedControlStyleBar : ADSegmentedControlStyleBarBlack
    }
};
ADSegmentedControl.prototype.getWidth = function(){
    return this.size.width
};
ADSegmentedControl.prototype.setWidth = function(A){
    this.size = new ADSize(A, 0)
};
ADSegmentedControl.prototype.setStyle = function(A){
    this.layer.removeClassName(this._style);
    this.layer.addClassName(A);
    this._style = A;
    this.width = this.width
};
ADSegmentedControl.prototype.getNumberOfSegments = function(){
    return this.subviews.length
};
ADSegmentedControl.prototype.setSelectedSegmentIndex = function(A){
    if (A < -1 || A >= this.subviews.length || A == this._selectedSegmentIndex) {
        return
    }
    if (this._selectedSegmentIndex != ADSegmentedControlNoSegment && this._selectedSegmentIndex >= 0 && this._selectedSegmentIndex < this.subviews.length) {
        this.subviews[this._selectedSegmentIndex].layer.removeClassName(ADSegmentedControlSegmentSelectedCSS)
    }
    if (A != ADSegmentedControlNoSegment) {
        this.subviews[A].layer.addClassName(ADSegmentedControlSegmentSelectedCSS)
    }
    this._selectedSegmentIndex = A;
    if (!this._momentary || A != ADSegmentedControlNoSegment) {
        this.dispatchEvent(this.createEvent(ADControlValueChangeEvent))
    }
};
ADSegmentedControl.prototype.setMomentary = function(A){
    if (this._momentary == A) {
        return
    }
    this._momentary = A;
    this.selectedSegmentIndex = ADSegmentedControlNoSegment
};
ADSegmentedControl.prototype.populateWithItems = function(A){
    for (var B = 0; B < A.length; B++) {
        var C = A[B];
        if (C instanceof ADImage) {
            this.insertSegmentWithImageAtIndexAnimated(C, this.numberOfSegments, false)
        }
        else {
            if (ADUtils.objectIsString(C)) {
                this.insertSegmentWithTitleAtIndexAnimated(C, this.numberOfSegments, false)
            }
        }
    }
    this.updateLayout()
};
ADSegmentedControl.prototype.updateLayout = function(){
    if (this.size.width <= 0) {
        return
    }
    var G = 0;
    var B = 0;
    for (var C = 0; C < this.subviews.length; C++) {
        var F = this.subviews[C];
        if (F.width > 0) {
            G += F.width
        }
        else {
            B++
        }
    }
    var E = Math.round((B > 0) ? (this.size.width - G) / B : 0);
    var A = (this._style == ADSegmentedControlStyleBar || this._style == ADSegmentedControlStyleBarBlack) ? 6 : 10;
    var H = -A;
    for (var C = 0; C < this.subviews.length; C++) {
        var F = this.subviews[C];
        var D = (F.width == 0) ? E : F.width;
        F.layer.style.left = ADUtils.px(H);
        if (C == this.subviews.length - 1) {
            D = this.size.width - H - A
        }
        this.setActualWidthForSegmentAtIndex(D, C);
        H += D
    }
};
ADSegmentedControl.prototype.setImageForSegmentAtIndex = function(B, A){
    A = Math.max(Math.min(A, this.subviews.length - 1), 0);
    this.subviews[A].image = B
};
ADSegmentedControl.prototype.imageForSegmentAtIndex = function(A){
    A = Math.min(A, this.subviews.length - 1);
    return (A >= 0) ? this.subviews[A].image : null
};
ADSegmentedControl.prototype.setTitleForSegmentAtIndex = function(B, A){
    A = Math.max(Math.min(A, this.subviews.length - 1), 0);
    this.subviews[A].title = B
};
ADSegmentedControl.prototype.titleForSegmentAtIndex = function(A){
    A = Math.min(A, this.subviews.length - 1);
    return (A >= 0) ? this.subviews[A].title : null
};
ADSegmentedControl.prototype.insertSegmentWithImageAtIndexAnimated = function(D, A, C){
    A = Math.max(Math.min(A, this.subviews.length), 0);
    var B = new ADSegment();
    this.insertSubviewAtIndex(B, A);
    this.setImageForSegmentAtIndex(D, A)
};
ADSegmentedControl.prototype.insertSegmentWithTitleAtIndexAnimated = function(D, A, C){
    A = Math.max(Math.min(A, this.subviews.length), 0);
    var B = new ADSegment();
    this.insertSubviewAtIndex(B, A);
    this.setTitleForSegmentAtIndex(D, A)
};
ADSegmentedControl.prototype.removeSegmentAtIndexAnimated = function(A, B){
    A = Math.max(Math.min(A, this.subviews.length - 1), 0);
    if (A >= this.subviews.length) {
        return
    }
    this.subviews[A].removeFromSuperview();
    this.updateLayout();
    if (this._selectedSegmentIndex != ADSegmentedControlNoSegment) {
        if (A < this._selectedSegmentIndex) {
            this.selectedSegmentIndex--
        }
        else {
            if (A == this._selectedSegmentIndex) {
                this.selectedSegmentIndex = ADSegmentedControlNoSegment
            }
        }
    }
};
ADSegmentedControl.prototype.removeAllSegments = function(){
    while (this.subviews.length) {
        this.subviews[0].removeFromSuperview()
    }
};
ADSegmentedControl.prototype.setWidthForSegmentAtIndex = function(B, A){
    A = Math.max(Math.min(A, this.subviews.length - 1), 0);
    this.subviews[A].width = B;
    this.setActualWidthForSegmentAtIndex(B, A);
    this.updateLayout()
};
ADSegmentedControl.prototype.widthForSegmentAtIndex = function(A){
    A = Math.max(Math.min(A, this.subviews.length - 1), 0);
    return this.subviews[A].width
};
ADSegmentedControl.prototype.setActualWidthForSegmentAtIndex = function(B, A){
    A = Math.max(Math.min(A, this.subviews.length - 1), 0);
    this.subviews[A].size = new ADSize(B, this.size.height)
};
ADSegmentedControl.prototype.touchesBegan = function(A){
    this.callSuper(A);
    this.selectedSegmentIndex = A.target.getNearestView()._indexInSuperviewSubviews;
    if (this._momentary) {
        var B = this;
        setTimeout(function(){
            B.selectedSegmentIndex = ADSegmentedControlNoSegment
        }, ADSegmentedControlSegmentMomentarySelectionTimer)
    }
};
ADClass(ADSegmentedControl);
ADSegment.superclass = ADView;
ADSegment.synthesizedProperties = ["title", "image"];
ADSegment.cssClassName = "ad-segment";
function ADSegment(A){
    this._title = null;
    this._image = null;
    this.callSuper(A);
    if (this.usesDeclarativeBacking) {
        this.width = this._size.width
    }
}

ADSegment.prototype.createLayer = function(){
    this.callSuper();
    this.width = 0
};
ADSegment.prototype.layerWasCreated = function(){
    this.callSuper();
    this.layer.appendChild(document.createElement("div"));
    this.layer.appendChild(document.createElement("div"));
    this.label = this.layer.appendChild(document.createElement("span"));
    this.icon = this.layer.appendChild(document.createElement("img"))
};
ADSegment.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-title":
            this.title = B;
            break;
        case "ad-image":
            this.image = new ADImage(B);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADSegment.prototype.setSize = function(A){
    this.callSuper(A);
    if (this._image !== null) {
        this.positionImage()
    }
};
ADSegment.prototype.setTitle = function(A){
    this.label.textContent = A;
    this._title = A
};
ADSegment.prototype.setImage = function(A){
    this.icon.src = A.url;
    this._image = A;
    if (A.loaded) {
        this.positionImage()
    }
    else {
        A.addPropertyObserver("loaded", this)
    }
};
ADSegment.prototype.handlePropertyChange = function(B, A){
    this.positionImage()
};
ADSegment.prototype.positionImage = function(){
    this.icon.style.left = ADUtils.px((this.size.width - this._image.width) / 2);
    this.icon.style.top = ADUtils.px((this.size.height - this._image.height) / 2)
};
ADClass(ADSegment);
const ADSwitchOffCSS = "off";
const ADSwitchOnCSS = "on";
const ADSwitchDownCSS = "dragging";
const ADSwitchSnapCSS = "snap";
const ADSwitchWidth = 93;
const ADSwitchHeight = 27;
const ADSwitchDragIdle = 0;
const ADSwitchCanDrag = 1;
const ADSwitchIsDragging = 2;
const ADSwitchSlideDistance = 54;
const ADSwitchButtonWidth = 40;
const ADSwitchDragMax = 70;
const ADSwitchDragMin = 16;
const ADSwitchDragGutter = 5;
const ADSwitchCapWidth = 4;
const ADSwitchLeftCapTrackCSS = "left-cap track-cap";
const ADSwitchLeftCapButtonCSS = "left-cap button-cap";
const ADSwitchRightCapTrackCSS = "right-cap track-cap";
const ADSwitchRightCapButtonCSS = "right-cap button-cap";
ADSwitch.superclass = ADControl;
ADSwitch.synthesizedProperties = ["on"];
ADSwitch.cssClassName = "ad-switch";
ADSwitch.collectionAccessor = "switches";
function ADSwitch(A){
    this.callSuper(A);
    this.dragOffsetX = ADSwitchDragMax;
    if (!this.usesDeclarativeBacking) {
        this.size = new ADSize();
        this.on = false
    }
}

ADSwitch.prototype.layerWasCreated = function(){
    this.callSuper();
    this.leftCap = this.layer.appendChild(document.createElement("div"));
    this.leftCap.className = ADSwitchLeftCapTrackCSS;
    this.rightCap = this.layer.appendChild(document.createElement("div"));
    this.rightCap.className = ADSwitchRightCapButtonCSS;
    this.slideContainer = this.layer.appendChild(document.createElement("div"));
    this.slideContainer.className = "slide-container";
    this.slider = this.slideContainer.appendChild(document.createElement("div"));
    this.slider.className = "slider";
    this.slider.addEventListener("webkitTransitionEnd", this, false);
    this.button = this.slider.appendChild(document.createElement("div"));
    this.button.className = "button";
    this.slider.appendChild(document.createElement("div")).className = "label-off";
    this.slider.appendChild(document.createElement("div")).className = "label-on"
};
ADSwitch.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-on":
            this.on = (B != "false");
            break;
        default:
            this.callSuper(B, A)
    }
};
ADSwitch.prototype.setSize = function(A){
    A.width = ADSwitchWidth;
    A.height = ADSwitchHeight;
    this.callSuper(A)
};
ADSwitch.prototype.setOnAnimated = function(A, B){
    if (B) {
        if (!((A && this.dragOffsetX == ADSwitchDragMax) || (!A && this.dragOffsetX == ADSwitchDragMin))) {
            this.leftCap.className = ADSwitchLeftCapTrackCSS;
            this.rightCap.className = ADSwitchRightCapTrackCSS
        }
        this.slider.addClassName(ADSwitchSnapCSS)
    }
    else {
        if (A) {
            this.leftCap.className = ADSwitchLeftCapTrackCSS;
            this.rightCap.className = ADSwitchRightCapButtonCSS
        }
        else {
            this.leftCap.className = ADSwitchLeftCapButtonCSS;
            this.rightCap.className = ADSwitchRightCapTrackCSS
        }
        this.slider.removeClassName(ADSwitchSnapCSS)
    }
    if (A) {
        this.slider.style.webkitTransform = ADUtils.t(-ADSwitchCapWidth, 0);
        this.dragOffsetX = ADSwitchDragMax
    }
    else {
        this.slider.style.webkitTransform = ADUtils.t(-ADSwitchSlideDistance - ADSwitchCapWidth, 0);
        this.dragOffsetX = ADSwitchDragMin
    }
    this._on = A;
    this.dispatchEvent(this.createEvent(ADControlValueChangeEvent))
};
ADSwitch.prototype.setOn = function(A){
    this.setOnAnimated(A, false)
};
ADSwitch.prototype.handleEvent = function(A){
    this.callSuper(A);
    if (A.type == "webkitTransitionEnd") {
        this.transitionEnded()
    }
};
ADSwitch.prototype.transitionEnded = function(){
    this.slider.removeClassName(ADSwitchSnapCSS);
    if (this._on) {
        this.slider.style.webkitTransform = ADUtils.t(-ADSwitchCapWidth, 0);
        this.rightCap.className = ADSwitchRightCapButtonCSS
    }
    else {
        this.slider.style.webkitTransform = ADUtils.t(-ADSwitchSlideDistance - ADSwitchCapWidth, 0);
        this.leftCap.className = ADSwitchLeftCapButtonCSS
    }
};
ADSwitch.prototype.touchesBegan = function(B){
    this.callSuper(B);
    var A = ADPoint.fromEventInElement(B, this.layer);
    if ((!this._on && A.x < ADSwitchButtonWidth) || (this.on && A.x > ADSwitchSlideDistance)) {
        this.layer.addClassName(ADSwitchDownCSS);
        this.dragState = ADSwitchCanDrag
    }
};
ADSwitch.prototype.touchesMoved = function(C){
    this.callSuper(C);
    if (this.dragState >= ADSwitchCanDrag) {
        this.slider.removeClassName(ADSwitchSnapCSS);
        this.dragState = ADSwitchIsDragging;
        this.rightCap.className = ADSwitchRightCapTrackCSS;
        this.leftCap.className = ADSwitchLeftCapTrackCSS;
        var B = ADPoint.fromEventInElement(C, this.layer);
        var A = ADSwitchButtonWidth / 2;
        var D = ADSwitchWidth - A;
        this.dragOffsetX = B.x;
        if (this.dragOffsetX > ADSwitchDragMax - ADSwitchDragGutter) {
            if (this.dragOffsetX >= ADSwitchDragMax) {
                this.dragOffsetX = ADSwitchDragMax;
                this.rightCap.className = ADSwitchRightCapButtonCSS
            }
            else {
                this.dragOffsetX = ADSwitchDragMax - ADSwitchDragGutter
            }
        }
        else {
            if (this.dragOffsetX < ADSwitchDragMin + ADSwitchDragGutter) {
                if (this.dragOffsetX < ADSwitchDragMin) {
                    this.dragOffsetX = ADSwitchDragMin;
                    this.leftCap.className = ADSwitchLeftCapButtonCSS
                }
                else {
                    this.dragOffsetX = ADSwitchDragMin + ADSwitchDragGutter
                }
            }
        }
        this.slider.style.webkitTransform = ADUtils.t(-ADSwitchSlideDistance - (A - this.dragOffsetX), 0)
    }
};
ADSwitch.prototype.touchesEnded = function(A){
    this.callSuper(A);
    if (this.dragState === ADSwitchIsDragging) {
        if (this.dragOffsetX < (ADSwitchWidth / 2)) {
            this.setOnAnimated(false, true)
        }
        else {
            if (this.dragOffsetX > (ADSwitchWidth / 2)) {
                this.setOnAnimated(true, true)
            }
            else {
                this.setOnAnimated(this.on, true)
            }
        }
    }
    else {
        this.setOnAnimated(!this._on, true)
    }
    this.layer.removeClassName(ADSwitchDownCSS);
    this.dragState = ADSwitchDragIdle
};
ADClass(ADSwitch);
const ADSearchBarHeight = 44;
const ADSearchBarStyleDefault = "default";
const ADSearchBarStyleBlack = "black";
const ADSearchBarStyleBlackTranslucent = "black-translucent";
const ADSearchBarTextDidChange = "searchBarTextDidChange";
const ADSearchBarTextDidBeginEditing = "searchBarTextDidBeginEditing";
const ADSearchBarTextDidEndEditing = "searchBarTextDidEndEditing";
const ADSearchBarCancelButtonClicked = "searchBarCancelButtonClicked";
const ADSearchBarShowsCancelButtonCSS = "shows-cancel-button";
const ADSearchBarDisplaysPlaceholder = "displays-placeholder";
ADSearchBar.superclass = ADView;
ADSearchBar.mixins = [ADEventTriage];
ADSearchBar.synthesizedProperties = ["style", "placeholder", "text", "showsCancelButton", "editing"];
ADSearchBar.cssClassName = "ad-search-bar";
ADSearchBar.collectionAccessor = "searchBars";
function ADSearchBar(A){
    this.delegate = null;
    this._style = ADSearchBarStyleDefault;
    this._placeholder = "";
    this._text = "";
    this._showsCancelButton = false;
    this._editing = false;
    this.hasBeenExplicitelySized = false;
    this.callSuper(A);
    this.field.addEventListener("focus", this, false);
    this.field.addEventListener("blur", this, false);
    this.field.addEventListener("input", this, false);
    this.field.parentNode.addEventListener("submit", this, false);
    this.button.addEventListener(ADControlTouchUpInsideEvent, this, false);
    this.emptyButton.addEventListener(ADControlTouchUpInsideEvent, this, false);
    this.button.addPropertyObserver("size", this, "updateLayout");
    this.autoresizesSubviews = false
}

ADSearchBar.prototype.setupLayer = function(){
    this.callSuper();
    if (this.layer.hasClassName(ADSearchBarStyleBlack)) {
        this._style = ADSearchBarStyleBlack
    }
    else {
        if (this.layer.hasClassName(ADSearchBarStyleBlackTranslucent)) {
            this._style = ADSearchBarStyleBlackTranslucent
        }
    }
};
ADSearchBar.prototype.layerWasCreated = function(){
    this.callSuper();
    var A = this.layer.appendChild(document.createElement("form"));
    this.label = A.appendChild(document.createElement("div"));
    this.field = A.appendChild(document.createElement("input"));
    this.field.type = "text";
    this.button = new ADBarButtonItem();
    this.button.title = "Cancel";
    this.button.view.addPropertyObserver("size", this, "updateLayout");
    this.addSubview(this.button.view);
    this.emptyButton = this.addSubview(new ADButton(null, ADButtonTypeCustom))
};
ADSearchBar.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-text":
            this.text = B;
            break;
        case "ad-placeholder":
            this.placeholder = B;
            break;
        case "ad-shows-cancel-button":
            this.showsCancelButton = (B != "false");
            break;
        default:
            this.callSuper(B, A)
    }
};
ADSearchBar.prototype.setSize = function(A){
    A.height = ADSearchBarHeight;
    this.callSuper(A);
    this.hasBeenExplicitelySized = true;
    this.updateLayout()
};
ADSearchBar.prototype.updateLayout = function(){
    var A = this.showsCancelButton ? (this.button.view.size.width + 5) : 0;
    this.field.parentNode.style.right = ADUtils.px(A + 5);
    this.emptyButton.layer.style.right = ADUtils.px(A + 10)
};
ADSearchBar.prototype.didMoveToSuperview = function(){
    this.callSuper();
    if (this.hasBeenExplicitelySized || this.superview === null || this.usesDeclarativeBacking) {
        return
    }
    this.size = new ADSize(this.superview.size.width, ADSearchBarHeight);
    this.hasBeenExplicitelySized = false
};
ADSearchBar.prototype.setStyle = function(A){
    this.layer.removeClassName(this._style);
    this.layer.addClassName(A);
    this._style = A
};
ADSearchBar.prototype.setPlaceholder = function(A){
    this._placeholder = A;
    this.checkForPlaceholderDisplay()
};
ADSearchBar.prototype.getText = function(A){
    return this.field.value
};
ADSearchBar.prototype.setText = function(A){
    this.label.innerText = A;
    this.field.value = A;
    if (ADUtils.objectHasMethod(this.delegate, ADSearchBarTextDidChange)) {
        this.delegate[ADSearchBarTextDidChange](this, A)
    }
    this.checkForPlaceholderDisplay()
};
ADSearchBar.prototype.setShowsCancelButton = function(A){
    if (this._showsCancelButton == A) {
        return
    }
    this.layer[A ? "addClassName" : "removeClassName"](ADSearchBarShowsCancelButtonCSS);
    this._showsCancelButton = A;
    this.updateLayout()
};
ADSearchBar.prototype.checkForPlaceholderDisplay = function(){
    this.layer[this.text == "" ? "addClassName" : "removeClassName"](ADSearchBarDisplaysPlaceholder);
    if (this.text == "") {
        this.label.innerText = this._placeholder
    }
};
ADSearchBar.prototype.setEditing = function(A){
    this._editing = A;
    this.field[A ? "focus" : "blur"]()
};
ADSearchBar.prototype.handleFocus = function(A){
    if (ADUtils.objectHasMethod(this.delegate, ADSearchBarTextDidBeginEditing)) {
        this.delegate[ADSearchBarTextDidBeginEditing](this)
    }
    this.editing = true
};
ADSearchBar.prototype.handleBlur = function(A){
    if (ADUtils.objectHasMethod(this.delegate, ADSearchBarTextDidEndEditing)) {
        this.delegate[ADSearchBarTextDidEndEditing](this)
    }
    this.label.innerText = this.field.value;
    this.checkForPlaceholderDisplay();
    this.editing = false
};
ADSearchBar.prototype.handleInput = function(A){
    this.checkForPlaceholderDisplay();
    if (ADUtils.objectHasMethod(this.delegate, ADSearchBarTextDidChange)) {
        this.delegate[ADSearchBarTextDidChange](this, this.field.value)
    }
};
ADSearchBar.prototype.handleSubmit = function(A){
    A.preventDefault();
    this.editing = false
};
ADSearchBar.prototype.handleControlTouchUpInside = function(A){
    if (A.control === this.emptyButton) {
        this.text = "";
        this.checkForPlaceholderDisplay()
    }
    else {
        if (ADUtils.objectHasMethod(this.delegate, ADSearchBarCancelButtonClicked)) {
            this.delegate[ADSearchBarCancelButtonClicked](this)
        }
    }
};
ADClass(ADSearchBar);
ADPickerComponent.superclass = ADScrollView;
function ADPickerComponent(A, B){
    this.callSuper();
    this.delegate = this;
    this.index = A;
    this.rows = B;
    this.clipsToBounds = false;
    this.horizontalScrollEnabled = false;
    this.showsVerticalScrollIndicator = false
}

ADPickerComponent.prototype.getSelectedRow = function(){
    var A = (this.contentOffset.y + ADPickerViewComponentTopMargin - ADPickerViewComponentBottomMargin) / ADPickerViewDefaultRowHeight;
    this._selectedRow = Math.min(Math.max(Math.round(A), 0), this.rows - 1);
    return this._selectedRow
};
ADPickerComponent.prototype.startDecelerationAnimation = function(){
    this.callSuper();
    this.expectedContentOffsetY = null;
    if (!this.decelerating) {
        return
    }
    var C = this.contentOffset.y + (this.decelerationVelocity.y / (1 - ADScrollViewDecelerationFrictionFactor));
    var B = (C + ADPickerViewComponentTopMargin - ADPickerViewComponentBottomMargin) / ADPickerViewDefaultRowHeight;
    var A = Math.min(Math.max(Math.round(B), 0), this.rows - 1);
    if (B >= 0 && B <= (this.rows - 1)) {
        this.expectedContentOffsetY = A * ADPickerViewDefaultRowHeight;
        this.decelerationVelocity.y = (1 - ADScrollViewDecelerationFrictionFactor) * (this.expectedContentOffsetY - this.contentOffset.y)
    }
};
ADPickerComponent.prototype.scrollViewDidEndDecelerating = function(A){
    if (this.expectedContentOffsetY !== null) {
        this.contentOffset = new ADPoint(this.contentOffset.x, this.expectedContentOffsetY)
    }
};
ADPickerComponent.prototype.beginTracking = function(A){
    this.callSuper(A);
    var B = Math.floor((ADPoint.fromEventInElement(A, this.hostingLayer).y - ADPickerViewComponentTopMargin) / ADPickerViewDefaultRowHeight);
    this.touchedRow = (B >= 0 && B <= this.rows - 1) ? B : -1
};
ADPickerComponent.prototype.touchesEnded = function(B){
    var A = this.dragging;
    this.callSuper(B);
    if (B.eventPhase == Event.BUBBLING_PHASE || this.decelerating) {
        return
    }
    if (A) {
        this.superview.selectRowInComponentAnimated(this.getSelectedRow(), this.index, true)
    }
    else {
        if (this.touchedRow != -1) {
            this.superview.selectRowInComponentAnimated(this.touchedRow, this.index, true)
        }
    }
};
ADClass(ADPickerComponent);
const ADPickerViewNumberOfComponents = "numberOfComponentsInPickerView";
const ADPickerViewNumberOfRowsInComponent = "pickerViewNumberOfRowsInComponent";
const ADPickerViewRowHeightForComponent = "pickerViewRowHeightForComponent";
const ADPickerViewWidthForComponent = "pickerViewWidthForComponent";
const ADPickerViewTitleForRowForComponent = "pickerViewTitleForRowForComponent";
const ADPickerViewViewForRowForComponent = "pickerViewViewForRowForComponent";
const ADPickerViewDidSelectRowInComponent = "pickerViewDidSelectRowInComponent";
ADPickerViewWidth = 320;
ADPickerViewHeight = 216;
ADPickerViewDefaultRowHeight = 39;
ADPickerViewComponentTopMargin = 89;
ADPickerViewComponentBottomMargin = 88;
ADPickerView.superclass = ADView;
ADPickerView.synthesizedProperties = ["showsSelectionIndicator"];
function ADPickerView(){
    this.callSuper();
    this.numberOfComponents = 0;
    this.delegate = null;
    this.dataSource = null;
    this._showsSelectionIndicator = false;
    this.components = [];
    this._size = new ADSize(ADPickerViewWidth, ADPickerViewHeight);
    this.clipsToBounds = true
}

ADPickerView.prototype.createLayer = function(){
    this.callSuper();
    this.layer.addClassName("ad-picker-view");
    var A = this.layer.appendChild(document.createElement("div"));
    A.className = "frame";
    this.componentsBackground = A.appendChild(document.createElement("div"));
    this.indicatorsBackground = A.appendChild(document.createElement("div"));
    this.hostingLayer = A.appendChild(document.createElement("div"));
    this.shadowOverlay = A.appendChild(document.createElement("div"));
    this.frameOverlay = A.appendChild(document.createElement("div"));
    this.indicatorsOverlay = A.appendChild(document.createElement("div"))
};
ADPickerView.prototype.setSize = function(A){
    A.width = ADPickerViewWidth;
    A.height = ADPickerViewHeight;
    this.callSuper(A)
};
ADPickerView.prototype.setShowsSelectionIndicator = function(A){
    this.layer.toggleClassName("shows-selection-indicator");
    this._showsSelectionIndicator = A
};
ADPickerView.prototype.numberOfRowsInComponent = function(A){
    if (A < 0 || A >= this.numberOfComponents) {
        throw (new Error("ADPickerView.numberOfRowsInComponent - no component " + A))
    }
    return this.components[A].rows
};
ADPickerView.prototype.updateNumberOfComponents = function(){
    if (ADUtils.objectHasMethod(this.dataSource, ADPickerViewNumberOfComponents)) {
        this.numberOfComponents = this.dataSource[ADPickerViewNumberOfComponents](this);
        if (this.numberOfComponents < 1) {
            throw (new Error("ADPickerView must have at least one component"))
        }
    }
    else {
        throw (new Error("the ADPickerView dataSource must implement " + ADPickerViewNumberOfComponents))
    }
};
ADPickerView.prototype.reloadAllComponents = function(){
    this.updateNumberOfComponents();
    for (var B = this.numberOfComponents; B < this.components.length; B++) {
        if (this.components[B] !== undefined) {
            this.components[B].removeFromSuperview();
            this.components[B] = undefined
        }
    }
    for (var A = 0; A < this.numberOfComponents; A++) {
        this.reloadComponent(A)
    }
    this.updateComponentsLayout()
};
ADPickerView.prototype.reloadComponent = function(B){
    if (B > this.numberOfComponents) {
        this.updateNumberOfComponents()
    }
    if (B < 0 || B >= this.numberOfComponents) {
        throw (new Error("ADPickerView.reloadComponent was called with an invalid component : " + B))
    }
    if (ADUtils.objectHasMethod(this.dataSource, ADPickerViewNumberOfRowsInComponent)) {
        var E = this.dataSource[ADPickerViewNumberOfRowsInComponent](this, B)
    }
    else {
        throw (new Error("the ADPickerView dataSource must implement " + ADPickerViewNumberOfRowsInComponent))
    }
    var F = null;
    if (ADUtils.objectHasMethod(this.delegate, ADPickerViewTitleForRowForComponent)) {
        F = this.delegate[ADPickerViewTitleForRowForComponent]
    }
    else {
        if (ADUtils.objectHasMethod(this.delegate, ADPickerViewViewForRowForComponent)) {
            F = this.delegate[ADPickerViewViewForRowForComponent]
        }
        else {
            throw (new Error("the ADPickerView delegate must implement either " + ADPickerViewTitleForRowForComponent + " or " + ADPickerViewViewForRowForComponent))
        }
    }
    if (this.components[B] === undefined) {
        this.components[B] = this.addSubview(new ADPickerComponent(B, E))
    }
    var A = this.components[B];
    A.hostingLayer.innerText = "";
    A.subviews = 0;
    for (var D = 0; D < E; D++) {
        var G = F.call(this.delegate, this, D, B);
        if (G instanceof ADView) {
            A.addSubview(G)
        }
        else {
            var C = document.createElement("div");
            C.className = "title-row";
            C.innerText = G;
            A.hostingLayer.appendChild(C)
        }
    }
};
ADPickerView.prototype.updateComponentsLayout = function(){
    this.componentsBackground.innerText = "";
    this.indicatorsBackground.innerText = "";
    var C = 300 / this.numberOfComponents;
    var B = ADUtils.objectHasMethod(this.delegate, ADPickerViewWidthForComponent);
    var D = 0;
    for (var E = 0; E < this.numberOfComponents; E++) {
        var A = this.components[E];
        var F = B ? this.delegate[ADPickerViewWidthForComponent](this, E) : C;
        A.position = new ADPoint(D, 0);
        A.size = new ADSize(F, ADPickerViewHeight);
        A.contentSize = new ADSize(F, this.components[E].rows * ADPickerViewDefaultRowHeight + ADPickerViewComponentTopMargin + ADPickerViewComponentBottomMargin);
        D += F;
        this.componentsBackground.appendChild(document.createElement("div")).style.width = ADUtils.px(F);
        this.indicatorsBackground.appendChild(document.createElement("div")).style.width = ADUtils.px(F)
    }
    this.frameOverlay.parentNode.style.width = ADUtils.px(D + 20);
    this.frameOverlay.parentNode.style.left = ADUtils.px((320 - D - 20) / 2)
};
ADPickerView.prototype.selectRowInComponentAnimated = function(C, A, B){
    if (A < 0 || A >= this.numberOfComponents) {
        throw (new Error("ADPickerView.selectRowInComponentAnimated - no component " + A))
    }
    if (C < 0 || C >= this.numberOfRowsInComponent(A)) {
        throw (new Error("ADPickerView.selectRowInComponentAnimated - no row " + C + " in component " + A))
    }
    this.components[A].setContentOffsetAnimated(new ADPoint(0, C * ADPickerViewDefaultRowHeight), B);
    if (ADUtils.objectHasMethod(this.delegate, ADPickerViewDidSelectRowInComponent)) {
        this.delegate[ADPickerViewDidSelectRowInComponent](this, C, A)
    }
};
ADPickerView.prototype.selectedRowInComponent = function(A){
    if (A < 0 || A >= this.numberOfComponents) {
        throw (new Error("ADPickerView.selectedRowInComponent - no component " + A))
    }
    return this.components[A].getSelectedRow()
};
ADPickerView.prototype.viewForRowForComponent = function(){
};
ADClass(ADPickerView);
const ADButtonTypeCustom = "custom-type";
const ADButtonTypeRoundedRect = "rounded-rect-type";
const ADButtonTypeDetailDisclosure = "detail-disclosure-type";
const ADButtonTypeInfoLight = "info-light-type";
const ADButtonTypeInfoDark = "info-dark-type";
const ADButtonTypeContactAdd = "contact-add-type";
const ADButtonDefaultHeight = 37;
ADButton.superclass = ADControl;
ADButton.synthesizedProperties = ["currentTitle", "autosized"];
ADButton.cssClassName = "ad-button";
ADButton.collectionAccessor = "buttons";
function ADButton(A, B){
    this.type = B || ADButtonTypeRoundedRect;
    this._autosized = true;
    this.titles = [""];
    this.callSuper(A);
    this.syncTitleToState();
    this.addPropertyObserver("state", this, "syncTitleToState")
}

ADButton.prototype.setupLayer = function(){
    this.callSuper();
    if (this.layer.hasClassName(ADButtonTypeRoundedRect)) {
        this.type = ADButtonTypeRoundedRect
    }
    else {
        if (this.layer.hasClassName(ADButtonTypeCustom)) {
            this.type = ADButtonTypeCustom
        }
    }
    this.layer.addClassName(this.type)
};
ADButton.prototype.createLayer = function(){
    this.callSuper();
    this.layer.addClassName(this.type)
};
ADButton.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-title-for-normal-state":
            this.setTitleForState(B, ADControlStateNormal);
            break;
        case "ad-title-for-highlighted-state":
            this.setTitleForState(B, ADControlStateHighlighted);
            break;
        case "ad-title-for-disabled-state":
            this.setTitleForState(B, ADControlStateDisabled);
            break;
        case "ad-title-for-selected-state":
            this.setTitleForState(B, ADControlStateSelected);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADButton.prototype.getSize = function(){
    var A = window.getComputedStyle(this.layer);
    return new ADSize(parseInt(A.width), parseInt(A.height))
};
ADButton.prototype.setSize = function(A){
    this._autoSized = false;
    this.callSuper(A)
};
ADButton.prototype.getCurrentTitle = function(){
    return this.layer.innerText
};
ADButton.prototype.setAutosized = function(A){
    if (A) {
        this.layer.style.width = "auto";
        this.layer.style.height = ADUtils.px(ADButtonDefaultHeight)
    }
    this._autosized = A
};
ADButton.prototype.titleForState = function(A){
    return this.titles[A] || null
};
ADButton.prototype.setTitleForState = function(B, A){
    this.titles[A] = B;
    if (A == this.state) {
        this.syncTitleToState()
    }
};
ADButton.prototype.syncTitleToState = function(){
    if (!(this.type === ADButtonTypeRoundedRect || this.type === ADButtonTypeCustom)) {
        return
    }
    this.layer.innerText = this.titles[this.state] || this.titles[ADControlStateNormal]
};
ADClass(ADButton);
const ADFlowViewNumberOfCells = "flowViewNumberOfCells";
const ADFlowViewCellAtIndex = "flowViewCellAtIndex";
const ADFlowViewDidSelectCellAtIndex = "flowViewDidSelectCellAtIndex";
const ADFlowViewDidBeginInteraction = "flowViewDidBeginInteraction";
const ADFlowViewDidEndInteraction = "flowViewDidEndInteraction";
const ADFlowViewAcceleration = 8;
const ADFlowViewMaxTrackingTime = 200;
const ADFlowViewSwipeThresholdAngle = ADUtils.degreesToRadians(45);
const ADFlowViewDecelerationFrictionFactor = 0.9;
const ADFlowViewDesiredAnimationFrameRate = 1000 / 60;
const ADFlowViewMinimumVelocity = 0.05;
const ADFlowViewMinVelocityForDeceleration = 1;
const ADFlowViewNumMoveEvents = 3;
const ADFlowViewPenetrationDeceleration = 0.03;
const ADFlowViewPenetrationAcceleration = 0.08;
ADFlowView.superclass = ADView;
ADFlowView.synthesizedProperties = ["frontCellIndex", "sidePadding", "frontZOffset", "sideZOffset", "cellGap", "dragMultiplier", "cellRotation", "flipDuration", "perspective", "priorityOrdering", "delegateIndexNotificationDelay", "trackCamera"];
ADFlowView.cssClassName = "ad-flow-view";
ADFlowView.collectionAccessor = "flowViews";
function ADFlowView(A){
    this.dataSource = null;
    this.delegate = null;
    this._frontCellIndex = 0;
    this._sidePadding = 160;
    this._frontZOffset = 0;
    this._sideZOffset = -100;
    this._cellGap = 25;
    this._cellRotation = 0.8;
    this._dragMultiplier = 1;
    this._flipDuration = 0.5;
    this._perspective = 400;
    this._delegateIndexNotificationDelay = 250;
    this._priorityOrdering = false;
    this._trackCamera = true;
    this._numCells = 0;
    this._cells = [];
    this._cellWrappers = [];
    this._cellRotations = [];
    this._cameraOffset = 0;
    this.timerSet = false;
    this._moveHistory = [];
    this.callSuper(A);
    this.userInteractionEnabled = true
}

ADFlowView.prototype.layerWasCreated = function(){
    this.callSuper();
    this.camera = this.layer.appendChild(document.createElement("div"));
    this.camera.addClassName("ad-flow-view-camera");
    var B = this.layer.querySelectorAll("ul > li");
    this._numCells = B.length;
    if (this._numCells > 0) {
        for (var C = 0; C < this._numCells; C++) {
            var D = this.camera.appendChild(document.createElement("div"));
            D._orderIndex = C;
            D.addClassName("ad-flow-view-cell-wrapper");
            this._cellWrappers.push(D);
            var A = B[C];
            A._orderIndex = C;
            A._layoutIndex = this.layoutIndexForOrderIndex(C);
            A.addClassName("ad-flow-view-cell");
            this._cells.push(A);
            D.appendChild(A);
            this._cellRotations.push(null)
        }
        this.layer.removeChild(this.layer.querySelector("ul"))
    }
};
ADFlowView.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-front-cell-index":
            this.frontCellIndex = parseInt(B, 0);
            break;
        case "ad-side-padding":
            this.sidePadding = parseFloat(B);
            break;
        case "ad-front-z-offset":
            this.frontZOffset = parseFloat(B);
            break;
        case "ad-side-z-offset":
            this.sideZOffset = parseFloat(B);
            break;
        case "ad-cell-gap":
            this.cellGap = parseFloat(B);
            break;
        case "ad-drag-multiplier":
            this.dragMultiplier = parseFloat(B);
            break;
        case "ad-cell-rotation":
            this.cellRotation = parseFloat(B);
            break;
        case "ad-delegate-index-notification-delay":
            this.delegateIndexNotificationDelay = parseFloat(B);
            break;
        case "ad-priority-ordering":
            this.priorityOrdering = !(B == "false");
            break;
        case "ad-track-camera":
            this.trackCamera = !(B == "false");
            break;
        default:
            this.callSuper(B, A)
    }
};
ADFlowView.prototype.layerWasInsertedIntoDocument = function(){
    this.callSuper();
    this.layout()
};
ADFlowView.prototype.setFlipDuration = function(A){
    this._flipDuration = A
};
ADFlowView.prototype.setCellGap = function(A){
    this._cellGap = A;
    this.layout()
};
ADFlowView.prototype.setSidePadding = function(A){
    this._sidePadding = A;
    this.layout()
};
ADFlowView.prototype.setFrontZOffset = function(A){
    this._frontZOffset = A;
    this.layout()
};
ADFlowView.prototype.setSideZOffset = function(A){
    this._sideZOffset = A;
    this.layout()
};
ADFlowView.prototype.setCellRotation = function(A){
    this._cellRotation = A;
    this.layout()
};
ADFlowView.prototype.setPriorityOrdering = function(C){
    this._priorityOrdering = C;
    for (var B = 0; B < this._numCells; B++) {
        var A = this._cells[B];
        A._layoutIndex = this.layoutIndexForOrderIndex(B)
    }
    this.layout()
};
ADFlowView.prototype.setPerspective = function(A){
    this._perspective = A;
    this.layer.style.webkitPerspective = this._perspective
};
ADFlowView.prototype.setFrontCellIndex = function(A){
    if (A >= 0 && A < this._numCells) {
        if (A != this._frontCellIndex) {
            if (ADUtils.objectHasMethod(this.delegate, ADFlowViewDidBeginInteraction)) {
                this.delegate[ADFlowViewDidBeginInteraction](this)
            }
            this.changedTime = new Date();
            if (!this.timerSet) {
                this.timerSet = true;
                this.callMethodNameAfterDelay("testForInteractionDelegate", this._delegateIndexNotificationDelay)
            }
        }
        this._frontCellIndex = A;
        this.layoutCells()
    }
};
ADFlowView.prototype.reloadData = function(){
    if (!this.dataSource || !ADUtils.objectHasMethod(this.dataSource, ADFlowViewNumberOfCells) || !ADUtils.objectHasMethod(this.dataSource, ADFlowViewCellAtIndex)) {
        return
    }
    this._numCells = this.dataSource[ADFlowViewNumberOfCells](this);
    for (var B = 0; B < this._numCells; B++) {
        var A = this.dataSource[ADFlowViewCellAtIndex](this, B);
        A._orderIndex = B;
        A._layoutIndex = this.layoutIndexForOrderIndex(B);
        A.addClassName("ad-flow-view-cell");
        this._cells.push(A);
        var C = document.createElement("div");
        C._orderIndex = B;
        C.addClassName("ad-flow-view-cell-wrapper");
        this._cellWrappers.push(C);
        C.appendChild(A);
        this.camera.appendChild(C);
        this._cellRotations.push(null)
    }
    this.layout()
};
ADFlowView.prototype.layoutIndexForOrderIndex = function(B){
    if (this._priorityOrdering) {
        var A = Math.floor((this._numCells - 1) / 2);
        if (B % 2 == 1) {
            return (A + Math.ceil(B / 2))
        }
        else {
            return (A - Math.floor(B / 2))
        }
    }
    else {
        return B
    }
};
ADFlowView.prototype.orderIndexForLayoutIndex = function(A){
    if (this._priorityOrdering) {
        var B = Math.floor((this._numCells - 1) / 2);
        var C = A - B;
        if (C > 0) {
            return C * 2 - 1
        }
        else {
            return C * -2
        }
    }
    else {
        return A
    }
};
ADFlowView.prototype.testForInteractionDelegate = function(){
    var A = new Date();
    if (A - this.changedTime < this._delegateIndexNotificationDelay) {
        this.callMethodNameAfterDelay("testForInteractionDelegate", this._delegateIndexNotificationDelay - (A - this.changedTime))
    }
    else {
        this.timerSet = false;
        if (ADUtils.objectHasMethod(this.delegate, ADFlowViewDidEndInteraction)) {
            this.delegate[ADFlowViewDidEndInteraction](this)
        }
    }
};
ADFlowView.prototype.layout = function(){
    this.layoutCells();
    this.centerCamera()
};
ADFlowView.prototype.centerCamera = function(){
    this._cameraOffset = this._frontCellIndex * this._cellGap;
    this.layoutCamera()
};
ADFlowView.prototype.layoutCamera = function(){
    this.camera.style.webkitTransform = ADUtils.t(this._cameraOffset * -1, 0)
};
ADFlowView.prototype.layoutCells = function(){
    for (var G = 0; G < this._numCells; G++) {
        var D = this._cells[G]._layoutIndex;
        var F = this._frontCellIndex - D;
        var C = Math.abs(F);
        var A = D * this._cellGap - this.sidePadding;
        var H = this._cellRotation;
        var I = 0.1 * C + this._sideZOffset;
        if (F == 0) {
            A = D * this._cellGap;
            H = 0;
            I = this._frontZOffset
        }
        else {
            if (F < 0) {
                A = this._frontCellIndex * this._cellGap + this.sidePadding + C * this._cellGap;
                H = -this._cellRotation
            }
        }
        this._cellWrappers[G].style.webkitTransitionProperty = "-webkit-transform";
        this._cellWrappers[G].style.webkitTransitionDuration = "1000ms";
        if (this._cellRotations[G] != H) {
            this._cells[G].style.webkitTransitionProperty = "-webkit-transform";
            this._cells[G].style.webkitTransitionDuration = "1000ms"
        }
        else {
            this._cells[G].style.webkitTransitionProperty = "none";
            this._cells[G].style.webkitTransitionDuration = "0s"
        }
        this._cells[G].style.webkitTransitionProperty = "-webkit-transform";
        this._cells[G].style.webkitTransitionDuration = "1000ms";
        this._cellRotations[G] = H;
        var B = ADUtils.t3d(A, 0, I);
        var E = ADUtils.r3d(0, 1, 0, H);
        this._cells[G].style.webkitTransform = E;
        this._cellWrappers[G].style.webkitTransform = B
    }
};
ADFlowView.prototype.cellAtIndex = function(A){
    return this._cells[A]
};
ADFlowView.prototype.indexAtPoint = function(B, C){
    var A = document.elementFromPoint(B, C);
    while (A && A._orderIndex === undefined) {
        A = A.parentNode
    }
    if (A) {
        return A._orderIndex
    }
    else {
        return this._frontCellIndex
    }
};
ADFlowView.prototype.touchesBegan = function(B){
    if (this.tracking || (B.touches && B.touches.length > 1)) {
        return
    }
    this.stopDecelerationAnimation();
    this.downTime = B.timeStamp;
    this.downIndex = this._frontCellIndex;
    this.downOffset = this._cameraOffset;
    this.downTimePosition = this._cameraOffset;
    this.tracking = true;
    this.trackingMoved = false;
    var A = (B.touches && B.touches.length > 0) ? B.touches[0] : B;
    this.downX = A.pageX;
    this.downY = A.pageY;
    if (this._trackCamera) {
        this.layer.addClassName("interactive")
    }
    this.callSuper(B)
};
ADFlowView.prototype.touchesMoved = function(E){
    if (E.touches && E.touches.length > 1) {
        return
    }
    this.lastEventTime = E.timeStamp;
    var C = (E.touches && E.touches.length > 0) ? E.touches[0] : E;
    var B = C.pageX - this.downX;
    var G = C.pageY - this.downY;
    if (!this.trackingMoved) {
        if (Math.abs(B) < 3 && Math.abs(G) < 3) {
            return
        }
        var A = false;
        if (B != 0 && G != 0) {
            var F = Math.abs(Math.atan(G / B));
            A = (F <= ADFlowViewSwipeThresholdAngle)
        }
        else {
            if (B != 0) {
                A = true
            }
        }
        if (!A) {
            this.tracking = false;
            this.touchesCancelled(E);
            return
        }
        this.trackingMoved = true;
        this.downX = C.pageX;
        this.downY = C.pageY;
        return
    }
    if (this.trackingMoved) {
        E.preventDefault();
        this._cameraOffset = this.downOffset - B;
        if (this._cameraOffset < 0) {
            this._cameraOffset /= 2
        }
        else {
            if (this._cameraOffset > ((this._numCells - 1) * this._cellGap)) {
                this._cameraOffset = ((this._numCells - 1) * this._cellGap + this._cameraOffset) / 2
            }
        }
        if (!this._trackCamera) {
            this._cameraOffset = Math.round(this._cameraOffset / this._cellGap) * this._cellGap
        }
        this.layoutCamera();
        var D = this.downIndex - Math.round(B / this._cellGap);
        if (D != this._frontCellIndex) {
            this.frontCellIndex = D
        }
        if (this._moveHistory.push({
            time: E.timeStamp,
            offset: this._cameraOffset
        }) > ADFlowViewNumMoveEvents) {
            this._moveHistory.shift()
        }
        if (this.lastEventTime - this.downTime > ADFlowViewMaxTrackingTime) {
            this.downTime = this.lastEventTime;
            this.downTimePosition = this._cameraOffset
        }
    }
};
ADFlowView.prototype.touchesEnded = function(C){
    C.preventDefault();
    if (C.touches && C.touches.length > 1) {
        return
    }
    this.callSuper(C);
    this.tracking = false;
    var B = C.timeStamp;
    if (!this.trackingMoved && this.frontCellIndex == this.downIndex && (B - this.downTime) < 300) {
        var D = this.indexAtPoint(this.downX, this.downY);
        var A = this._cells[D]._layoutIndex;
        if (A == this._frontCellIndex && ADUtils.objectHasMethod(this.delegate, ADFlowViewDidSelectCellAtIndex)) {
            this.delegate[ADFlowViewDidSelectCellAtIndex](this, D)
        }
        this.frontCellIndex = A;
        this.centerCamera();
        if (this._trackCamera) {
            this.layer.removeClassName("interactive")
        }
    }
    else {
        if (B - this.lastEventTime <= ADFlowViewMaxTrackingTime) {
            this.startDecelerationAnimation()
        }
        if (!this.decelerating) {
            if (this._trackCamera) {
                this.layer.removeClassName("interactive")
            }
            this.centerCamera()
        }
    }
    this._moveHistory = []
};
ADFlowView.prototype.getOffsetVelocity = function(){
    var A = this._moveHistory.length;
    if (A < 2) {
        return 0
    }
    var C = this._moveHistory[A - 1].offset - this._moveHistory[A - 2].offset;
    var B = this._moveHistory[A - 1].time - this._moveHistory[A - 2].time;
    return C / B
};
ADFlowView.prototype.startDecelerationAnimation = function(){
    var B = this._cameraOffset - this.downTimePosition;
    var F = (event.timeStamp - this.downTime) / ADFlowViewAcceleration;
    this.decelerationVelocity = this.getOffsetVelocity();
    this.minDecelerationPoint = 0;
    this.maxDecelerationPoint = (this._numCells - 1) * this._cellGap;
    this.penetrationDeceleration = ADFlowViewPenetrationDeceleration;
    this.penetrationAcceleration = ADFlowViewPenetrationAcceleration;
    if (Math.abs(this.decelerationVelocity) > ADFlowViewMinVelocityForDeceleration) {
        var C = this._cameraOffset + (this.decelerationVelocity / (1 - ADFlowViewDecelerationFrictionFactor));
        var A = Math.round(C / this._cellGap);
        if (A >= 0 && A <= (this._numCells - 1)) {
            var D = A * this._cellGap;
            this.decelerationVelocity = (1 - ADFlowViewDecelerationFrictionFactor) * (D - this._cameraOffset);
            C = this._cameraOffset + (this.decelerationVelocity / (1 - ADFlowViewDecelerationFrictionFactor))
        }
        var E = Math.max(0, Math.min(this._numCells - 1, Math.round(C / this._cellGap)));
        if (E != this._frontCellIndex) {
            this.frontCellIndex = E
        }
        this.decelerating = true;
        this.decelerationTimer = this.callMethodNameAfterDelay("stepThroughDecelerationAnimation", ADFlowViewDesiredAnimationFrameRate);
        this.lastFrame = new Date()
    }
};
ADFlowView.prototype.stopDecelerationAnimation = function(){
    this.decelerating = false;
    clearTimeout(this.decelerationTimer);
    if (this._trackCamera) {
        this.layer.removeClassName("interactive")
    }
};
ADFlowView.prototype.stepThroughDecelerationAnimation = function(A){
    if (!this.decelerating) {
        return
    }
    var D = new Date();
    var G = D - this.lastFrame;
    var H = A ? 0 : (Math.round(G / ADFlowViewDesiredAnimationFrameRate) - 1);
    for (var E = 0; E < H; E++) {
        this.stepThroughDecelerationAnimation(true)
    }
    var F = this._cameraOffset + this.decelerationVelocity;
    this._cameraOffset = F;
    if (!A) {
        this.layoutCamera()
    }
    this.decelerationVelocity *= ADFlowViewDecelerationFrictionFactor;
    var C = Math.abs(this.decelerationVelocity);
    if (!A && C <= ADFlowViewMinimumVelocity) {
        if (this._trackCamera) {
            this.layer.removeClassName("interactive")
        }
        this.decelerating = false;
        return
    }
    if (!A) {
        this.decelerationTimer = this.callMethodNameAfterDelay("stepThroughDecelerationAnimation", ADFlowViewDesiredAnimationFrameRate)
    }
    var B = 0;
    if (F < this.minDecelerationPoint) {
        B = this.minDecelerationPoint - F
    }
    else {
        if (F > this.maxDecelerationPoint) {
            B = this.maxDecelerationPoint - F
        }
    }
    if (B != 0) {
        if (B * this.decelerationVelocity <= 0) {
            this.decelerationVelocity += B * this.penetrationDeceleration
        }
        else {
            this.decelerationVelocity = B * this.penetrationAcceleration
        }
    }
    if (!A) {
        this.lastFrame = D
    }
};
ADClass(ADFlowView);
ADLabel.superclass = ADView;
ADLabel.synthesizedProperties = ["numberOfLines", "text"];
ADLabel.cssClassName = "ad-label";
ADLabel.collectionAccessor = "labels";
function ADLabel(A){
    this._numberOfLines = 1;
    this.callSuper(A)
}

ADLabel.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-number-of-lines":
            this.numberOfLines = parseInt(B);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADLabel.prototype.setText = function(A){
    this.layer.innerText = A
};
ADLabel.prototype.getText = function(A){
    return this.layer.innerText
};
ADLabel.prototype.setNumberOfLines = function(A){
    this._numberOfLines = A;
    if (A == 0) {
        this.layer.style.webkitLineClamp = "none"
    }
    else {
        this.layer.style.webkitLineClamp = A
    }
};
ADClass(ADLabel);
ADImageView.superclass = ADView;
ADImageView.synthesizedProperties = ["autoSized", "image", "highlightedImage", "highlighted"];
ADImageView.cssClassName = "ad-image-view";
ADImageView.collectionAccessor = "imageViews";
function ADImageView(A){
    this._autoSized = true;
    this._highlighted = false;
    this._image = null;
    this._highlightedImage = null;
    this.touchInside = false;
    this.didCheckForAutoSizing = false;
    this.callSuper(A)
}

ADImageView.prototype.setValueForAttribute = function(B, A){
    switch (A) {
        case "ad-image":
            this.image = new ADImage(B);
            break;
        case "ad-highlighted-image":
            this.highlightedImage = new ADImage(B);
            break;
        default:
            this.callSuper(B, A)
    }
};
ADImageView.prototype.setImage = function(A){
    this._image = A;
    this.syncImageToCurrentState()
};
ADImageView.prototype.setHighlightedImage = function(A){
    this.userInteractionEnabled = (A !== null);
    this._highlightedImage = A;
    this.syncImageToCurrentState()
};
ADImageView.prototype.setHighlighted = function(A){
    if (A == this._highlighted) {
        return
    }
    this._highlighted = A;
    this.syncImageToCurrentState()
};
ADImageView.prototype.setAutoSized = function(A){
    this._autoSized = A;
    this.syncImageToCurrentState()
};
ADImageView.prototype.syncImageToCurrentState = function(){
    var A = (this.highlighted) ? this.highlightedImage : this.image;
    if (!A) {
        return
    }
    if (A.loaded) {
        this.layer.style.backgroundImage = "url(" + A.element.src + ")";
        if (this.didCheckForAutoSizing === false) {
            this._autoSized = this.size.equals(ADSizeZeroSize);
            this.didCheckForAutoSizing = true
        }
        if (this.autoSized) {
            this.size = new ADSize(A.width, A.height)
        }
    }
    else {
        A.addPropertyObserver("loaded", this, "syncImageToCurrentState")
    }
};
ADImageView.prototype.touchesBegan = function(A){
    this.callSuper(A);
    this.touchInside = true;
    this.highlighted = true
};
ADImageView.prototype.touchesMoved = function(A){
    this.callSuper(A);
    this.touchInside = this.pointInside(ADPoint.fromEventInElement(A, this.layer));
    this.highlighted = this.touchInside
};
ADImageView.prototype.touchesEnded = function(A){
    this.callSuper(A);
    this.highlighted = false;
    this.touchInside = false
};
ADClass(ADImageView);
const ADViewControllerWillLoadRequiredFiles = "viewControllerWillLoadRequiredFiles";
const ADViewControllerProgressLoadingRequiredFiles = "viewControllerProgressLoadingRequiredFiles";
const ADViewControllerDidLoadRequiredFiles = "viewControllerDidLoadRequiredFiles";
const ADViewControllerDidEnterState = "viewControllerDidEnterState";
const ADViewControllerDidExitState = "viewControllerDidExitState";
const ADViewControllerViewWillAppearState = "ad-view-will-appear";
const ADViewControllerViewDidAppearState = "ad-view-did-appear";
const ADViewControllerViewWillDisappearState = "ad-view-will-disappear";
const ADViewControllerViewDidDisappearState = "ad-view-did-disappear";
const ADViewControllerAppearanceStates = [ADViewControllerViewWillAppearState, ADViewControllerViewDidAppearState, ADViewControllerViewWillDisappearState, ADViewControllerViewDidDisappearState];
const ADViewControllerViewWillAppearEvent = "viewControllerViewWillAppear";
const ADViewControllerViewDidAppearEvent = "viewControllerViewDidAppear";
const ADViewControllerViewWillDisappearEvent = "viewControllerViewWillDisappear";
const ADViewControllerViewDidDisappearEvent = "viewControllerViewDidDisappear";
const ADViewControllerTransitionInFromRight = {
    properties: ["transform"],
    from: ["translateX($width)"],
    to: ["translateX(0)"]
};
const ADViewControllerTransitionInFromLeft = {
    properties: ["transform"],
    from: ["translateX(-$width)"],
    to: ["translateX(0)"]
};
const ADViewControllerTransitionOutToRight = {
    properties: ["transform"],
    from: ["translateX(0)"],
    to: ["translateX($width)"]
};
const ADViewControllerTransitionOutToLeft = {
    properties: ["transform"],
    from: ["translateX(0)"],
    to: ["translateX(-$width)"]
};
ADViewController.superclass = ADObject;
ADViewController.mixins = [ADEventTarget];
ADViewController.synthesizedProperties = ["view", "title", "loading", "viewWasProcessed", "contentView", "stateChangeDelegate"];
ADViewController.instances = {};
function ADViewController(A){
    this.requiredFilesLoadDelegate = null;
    this._stateChangeDelegate = null;
    this._stateChangeDelegateAvailability = {};
    this.callSuper();
    this.configuration = {};
    this.openRequests = [];
    if (ADUtils.objectIsString(A)) {
        this.configuration = {
            id: A
        }
    }
    else {
        if (A !== undefined && A !== null) {
            this.configuration = A
        }
    }
    this._view = null;
    this._contentView = null;
    this._title = "";
    this._tabBarItem = null;
    this._navigationItem = null;
    this._toolbarItems = null;
    this._viewWasProcessed = false;
    this.hidesBottomBarWhenPushed = false;
    this.outlets = {};
    this.eventTarget = document;
    this.modalViewController = null;
    this.parentViewController = null;
    this.modalTransitionStyle = null;
    this.searchDisplayController = null;
    this.wasBackItemTransition = ADViewControllerTransitionInFromLeft;
    this.becomesBackItemTransition = ADViewControllerTransitionOutToLeft;
    this.wasTopItemTransition = ADViewControllerTransitionOutToRight;
    this.becomesTopItemTransition = ADViewControllerTransitionInFromRight;
    this.becomesHiddenTransition = ADViewTransitionDissolveOut;
    this.becomesVisibleTransition = ADViewTransitionDissolveIn;
    if (this.configuration.hasOwnProperty("id")) {
        ADViewController.instances[this.configuration.id] = this
    }
    ADUtils.copyPropertiesFromSourceToTarget(this.configuration.properties, this)
}

ADViewController.prototype.getView = function(){
    if (this._view === null) {
        this.loadView();
        this.viewDidLoad()
    }
    return this._view
};
ADViewController.prototype.setView = function(A){
    if (this._view instanceof ADView) {
        delete this._view._viewController
    }
    A._viewController = this;
    this._view = A;
    this.processView()
};
ADViewController.prototype.setContentView = function(A){
    A.superview = this._view;
    this._view.subviews.push(A);
    this._contentView = A
};
ADViewController.prototype.loadView = function(){
    this.view = new ADView();
    if (this.configuration.hasOwnProperty("requiredFileURIs")) {
        this.processRequiredFiles()
    }
    else {
        this.viewWasProcessed = true
    }
};
ADViewController.prototype.isViewLoaded = function(){
    return (this._view !== null)
};
ADViewController.prototype.viewDidLoad = function(){
};
ADViewController.prototype.contentViewDidLoad = function(){
};
ADViewController.prototype.setTitle = function(A){
    this._title = A;
    if (this.parentViewController instanceof ADTabBarController) {
        this.tabBarItem.title = A
    }
    else {
        if (this.parentViewController instanceof ADNavigationController) {
            this.navigationItem.title = A
        }
    }
};
ADViewController.prototype.setStateChangeDelegate = function(B){
    var A = (B !== undefined && B !== null);
    this._stateChangeDelegateAvailability[ADViewControllerDidEnterState] = (A && ADUtils.objectHasMethod(B, ADViewControllerDidEnterState));
    this._stateChangeDelegateAvailability[ADViewControllerDidExitState] = (A && ADUtils.objectHasMethod(B, ADViewControllerDidExitState));
    this._stateChangeDelegate = B
};
ADViewController.prototype.isInState = function(A){
    return this.view.layer.hasClassName(A)
};
ADViewController.prototype.enterState = function(B){
    var A = this.view.layer.addClassName(B);
    if (A && this._stateChangeDelegateAvailability[ADViewControllerDidEnterState]) {
        this._stateChangeDelegate[ADViewControllerDidEnterState](this, B)
    }
    return A
};
ADViewController.prototype.exitState = function(A){
    var B = this.view.layer.removeClassName(A);
    if (B && this._stateChangeDelegateAvailability[ADViewControllerDidExitState]) {
        this._stateChangeDelegate[ADViewControllerDidExitState](this, A)
    }
    return B
};
ADViewController.prototype.enterExclusiveAppearanceState = function(C){
    var A;
    for (var B = 0; B < ADViewControllerAppearanceStates.length; B++) {
        A = ADViewControllerAppearanceStates[B];
        this[((A === C) ? "enter" : "exit") + "State"](A)
    }
};
ADViewController.prototype.viewWillAppear = function(A){
    this.dispatchEvent(this.createEvent(ADViewControllerViewWillAppearEvent, {
        animated: A
    }));
    this.enterExclusiveAppearanceState(ADViewControllerViewWillAppearState)
};
ADViewController.prototype.viewDidAppear = function(A){
    this.dispatchEvent(this.createEvent(ADViewControllerViewDidAppearEvent, {
        animated: A
    }));
    this.enterExclusiveAppearanceState(ADViewControllerViewDidAppearState)
};
ADViewController.prototype.viewWillDisappear = function(A){
    this.dispatchEvent(this.createEvent(ADViewControllerViewWillDisappearEvent, {
        animated: A
    }));
    this.enterExclusiveAppearanceState(ADViewControllerViewWillDisappearState)
};
ADViewController.prototype.viewDidDisappear = function(A){
    this.dispatchEvent(this.createEvent(ADViewControllerViewDidDisappearEvent, {
        animated: A
    }));
    this.enterExclusiveAppearanceState(ADViewControllerViewDidDisappearState)
};
ADViewController.prototype.presentModalViewControllerAnimated = function(B, A){
    this.modalViewController = B
};
ADViewController.prototype.dismissModalViewControllerAnimated = function(A){
    this.modalViewController = null
};
ADViewController.prototype.parentControllerOfKind = function(C){
    var A = this;
    var B = null;
    while (A.parentViewController !== null) {
        if (A instanceof C) {
            B = A;
            break
        }
        A = A.parentViewController
    }
    return B
};
ADViewController.prototype.getLoading = function(){
    return (this.openRequests.length > 0)
};
ADViewController.prototype.processRequiredFiles = function(){
    if (ADUtils.objectHasMethod(this.requiredFilesLoadDelegate, ADViewControllerWillLoadRequiredFiles)) {
        this.requiredFilesLoadDelegate[ADViewControllerWillLoadRequiredFiles](this)
    }
    this.totalNumberOfRequiredFiles = 0;
    this.numberOfLoadedRequiredFiles = 0;
    if (this.configuration.requiredFileURIs.hasOwnProperty("contentView")) {
        this.processFilesOfType([this.configuration.requiredFileURIs.contentView], "html")
    }
    if (this.configuration.requiredFileURIs.hasOwnProperty("stylesheets")) {
        this.processFilesOfType(this.configuration.requiredFileURIs.stylesheets, "css")
    }
    if (this.configuration.requiredFileURIs.hasOwnProperty("scripts")) {
        this.processFilesOfType(this.configuration.requiredFileURIs.scripts, "js")
    }
    if (this.configuration.requiredFileURIs.hasOwnProperty("images")) {
        this.processFilesOfType(this.configuration.requiredFileURIs.images, "image")
    }
};
ADViewController.prototype.processFilesOfType = function(C, B){
    for (var A = 0; A < C.length; A++) {
        this.openRequest(C[A], B)
    }
};
ADViewController.prototype.openRequest = function(A, B){
    this.totalNumberOfRequiredFiles++;
    var D = new XMLHttpRequest();
    this.openRequests.push(D);
    D._url = A;
    D._type = B;
    D.addEventListener("load", this, false);
    D.addEventListener("error", this, false);
    D.open("GET", A, true);
    try {
        D.send()
    } 
    catch (C) {
        this.requestDidFail(D)
    }
};
ADViewController.prototype.handleEvent = function(D){
    var C = D.type;
    switch (C) {
        case "load":
            this.handleLoadEvent(D);
            break;
        case "error":
            this.requestDidFail(D.target);
            break
    }
    var B;
    for (var A = 0; A < ADViewController.viewProcessors.length; A++) {
        B = ADViewController.viewProcessors[A];
        if (B.hasOwnProperty("handler") && B.hasOwnProperty("eventTypes") && B.eventTypes.indexOf(C) != -1) {
            this[B.handler](D)
        }
    }
};
ADViewController.prototype.handleLoadEvent = function(B){
    var A = B.target;
    switch (A._type) {
        case "css":
            this.stylesheetDidLoad(A);
            break;
        case "js":
            this.scriptDidLoad(A);
            break;
        case "html":
            this.htmlDidLoad(A);
            break
    }
    this.requestDidComplete(A)
};
ADViewController.prototype.requestDidFail = function(A){
    console.warn("ADViewController — could not load required file with URI " + A._url);
    this.requestDidComplete(A)
};
ADViewController.prototype.requestDidComplete = function(A){
    var B = this.openRequests.indexOf(A);
    if (B != -1) {
        this.openRequests.splice(B, 1)
    }
    this.numberOfLoadedRequiredFiles++;
    if (this.totalNumberOfRequiredFiles > 0 && ADUtils.objectHasMethod(this.requiredFilesLoadDelegate, ADViewControllerProgressLoadingRequiredFiles)) {
        this.requiredFilesLoadDelegate[ADViewControllerProgressLoadingRequiredFiles](this, this.numberOfLoadedRequiredFiles / this.totalNumberOfRequiredFiles, A._url)
    }
    if (!this.loading) {
        if (ADUtils.objectHasMethod(this.requiredFilesLoadDelegate, ADViewControllerDidLoadRequiredFiles)) {
            this.requiredFilesLoadDelegate[ADViewControllerDidLoadRequiredFiles](this)
        }
        this.notifyPropertyChange("loading");
        this.setupContentViewFromLayer()
    }
};
ADViewController.prototype.stylesheetDidLoad = function(B){
    var A = document.createElement("style");
    A.innerText = B.responseText;
    document.head.appendChild(A)
};
ADViewController.prototype.scriptDidLoad = function(B){
    var A = document.createElement("script");
    A.type = "text/javascript";
    A.src = B._url;
    document.head.appendChild(A)
};
ADViewController.prototype.htmlDidLoad = function(A){
    this.loadedContentViewLayer = ADUtils.createNodeFromString(A.responseText)
};
ADViewController.prototype.setupContentViewFromLayer = function(){
    var A = this.loadedContentViewLayer;
    this._view.layer.appendChild(A);
    if (!A.hasAttribute("id") && this.configuration.hasOwnProperty("id")) {
        A.id = this.configuration.id
    }
    this.contentView = ADUtils.getViewWithLayer(A);
    this.processView();
    this.contentViewDidLoad()
};
ADViewController.prototype.createEvent = function(A, C){
    var B = document.createEvent("Event");
    B.initEvent(A, true, false);
    B.viewController = this;
    ADUtils.copyPropertiesFromSourceToTarget(C, B);
    return B
};
ADViewController.prototype.processView = function(){
    if (!this._view.layer.hasAttribute("id") && this.configuration.hasOwnProperty("id")) {
        this._view.id = this.configuration.id + "-container"
    }
    for (var A = 0; A < ADViewController.viewProcessors.length; A++) {
        this[ADViewController.viewProcessors[A].processor]()
    }
    this.viewWasProcessed = true
};
ADViewController.prototype.processOutlets = function(){
    var C;
    var B = this.view.layer.querySelectorAll("[ad-outlet]");
    for (var A = 0; A < B.length; A++) {
        C = B[A];
        this.outlets[C.getAttribute("ad-outlet")] = (C.hasOwnProperty("_view")) ? C._view : C
    }
};
ADViewController.prototype.processActions = function(){
    var A;
    var C = this.view.layer.querySelectorAll("[ad-action]");
    for (var B = 0; B < C.length; B++) {
        A = C[B];
        A.addEventListener(ADControlTouchUpInsideEvent, this, false);
        A.addEventListener("click", this, false)
    }
};
ADViewController.prototype.handleActionsAnchorActivation = function(C){
    var B = C.currentTarget;
    if (!B.hasAttribute("ad-action")) {
        return
    }
    if (C.type == "click" && ADControl.isNodeInControlHierarchyBoundedByElement(C.target, B)) {
        return
    }
    var A = B.getAttribute("ad-action");
    if (!ADUtils.objectHasMethod(this, A)) {
        return
    }
    this[A](C)
};
ADClass(ADViewController);
ADViewController.viewProcessors = [{
    processor: "processOutlets"
}, {
    processor: "processActions",
    handler: "handleActionsAnchorActivation",
    eventTypes: [ADControlTouchUpInsideEvent, "click"]
}];
ADViewController.addViewProcessor = function(A){
    ADViewController.viewProcessors.push(A)
};
ADRootViewController.superclass = ADViewController;
function ADRootViewController(){
    this.callSuper({
        id: "root",
        properties: {
            view: ADRootView.sharedRoot
        }
    });
    ADRootViewController.sharedRootViewController = this
}

ADClass(ADRootViewController);
ADRootViewController.__defineGetter__("sharedRootViewController", function(){
    if (!ADRootViewController.hasOwnProperty("_sharedRootViewController")) {
        ADRootViewController.sharedRootViewController = new ADRootViewController()
    }
    return ADRootViewController._sharedRootViewController
});
ADRootViewController.__defineSetter__("sharedRootViewController", function(A){
    ADRootViewController._sharedRootViewController = A
});
const ADTransitionControllerWillMakeViewControllerVisible = "transitionControllerWillMakeViewControllerVisibleAnimated";
const ADTransitionControllerDidMakeViewControllerVisible = "transitionControllerDidMakeViewControllerVisibleAnimated";
const ADTransitionControllerViewIsVisibleState = "ad-transition-controller-visible";
const ADTransitionControllerViewIsHiddenState = "ad-transition-controller-hidden";
const ADTransitionControllerDefaultTransitionDuration = 0.35;
ADTransitionController.superclass = ADViewController;
ADTransitionController.synthesizedProperties = ["visibleViewController", "cachedViewControllers"];
function ADTransitionController(B, A){
    this.callSuper(B);
    this._cachedViewControllers = [];
    this._visibleViewController = null;
    this.delegate = null;
    this.previouslyVisibleViewController = null;
    this.busy = false;
    if (A !== undefined) {
        this.visibleViewController = A
    }
}

ADTransitionController.prototype.loadView = function(){
    this.callSuper();
    this._view.layer.addClassName("ad-transition-controller-view")
};
ADTransitionController.prototype.setCachedViewControllers = function(C){
    var A;
    var D = this._cachedViewControllers;
    for (var B = 0; B < D.length; B++) {
        A = D[B];
        if (A !== this._visibleViewController && C.indexOf(A) == -1) {
            A.view.removeFromSuperview()
        }
    }
    for (var B = 0; B < C.length; B++) {
        A = C[B];
        if (A !== this._visibleViewController && D.indexOf(A) == -1) {
            this.attachViewController(A)
        }
    }
    this._cachedViewControllers = C
};
ADTransitionController.prototype.attachViewController = function(A){
    if (!A.isViewLoaded()) {
        A.loadView();
        A.viewDidLoad()
    }
    A.view.layer.addClassName("waiting-on-display");
    if (A.view.superview !== this) {
        this._view.addSubview(A.view)
    }
};
ADTransitionController.prototype.setVisibleViewController = function(A){
    this.setVisibleViewControllerAnimated(A, false)
};
ADTransitionController.prototype.setVisibleViewControllerAnimated = function(B, A){
    if (this.busy || this._visibleViewController === B) {
        return
    }
    this.previouslyVisibleViewController = this._visibleViewController;
    if (this.previouslyVisibleViewController !== null) {
        this.previouslyVisibleViewController.viewWillDisappear(A);
        this.previouslyVisibleViewController.exitState(ADTransitionControllerViewIsVisibleState);
        this.previouslyVisibleViewController.enterState(ADTransitionControllerViewIsHiddenState)
    }
    if (B === null) {
        this.performTransitionToViewController(B, A);
        return
    }
    this.attachViewController(B);
    B.viewWillAppear(A);
    B.exitState(ADTransitionControllerViewIsHiddenState);
    B.enterState(ADTransitionControllerViewIsVisibleState);
    if (B.loading) {
        this.willUseAnimationToTransitionToLoadingController = A;
        B.addPropertyObserver("viewWasProcessed", this, "viewControllerFinishedProcessingView")
    }
    else {
        this.performTransitionToViewController(B, A)
    }
};
ADTransitionController.prototype.performTransitionToViewController = function(C, B){
    if (C !== null) {
        C.view.layer.removeClassName("waiting-on-display")
    }
    ADTransaction.begin();
    if (ADUtils.objectHasMethod(this.delegate, ADTransitionControllerWillMakeViewControllerVisible)) {
        this.delegate[ADTransitionControllerWillMakeViewControllerVisible](this, C, this.previouslyVisibleViewController, B)
    }
    var D, A = null;
    this.busy = B;
    ADTransaction.defaults.duration = B ? ADTransitionControllerDefaultTransitionDuration : 0;
    if (this.previouslyVisibleViewController !== null) {
        D = this.previouslyVisibleViewController.becomesHiddenTransition;
        if (D !== null) {
            D = this.previouslyVisibleViewController.view.applyTransition(D, false)
        }
    }
    if (C !== null) {
        A = C.becomesVisibleTransition;
        if (A !== null) {
            A = C.view.applyTransition(A, false)
        }
    }
    if (A !== null) {
        A.delegate = this
    }
    else {
        if (D !== null) {
            D.delegate = this
        }
        else {
            B = false
        }
    }
    this._visibleViewController = C;
    ADTransaction.commit();
    if (!B) {
        this.transitionDidComplete()
    }
};
ADTransitionController.prototype.viewControllerFinishedProcessingView = function(B, A){
    B.removePropertyObserver("viewWasProcessed", this);
    this.performTransitionToViewController(B, this.willUseAnimationToTransitionToLoadingController)
};
ADTransitionController.prototype.transitionDidComplete = function(B){
    var A = this.busy;
    if (this.previouslyVisibleViewController !== null) {
        if (this._cachedViewControllers.indexOf(this.previouslyVisibleViewController) == -1) {
            this.previouslyVisibleViewController.view.removeFromSuperview()
        }
        else {
            this.previouslyVisibleViewController.view.layer.addClassName("waiting-on-display")
        }
        this.previouslyVisibleViewController.viewDidDisappear(A)
    }
    if (this._visibleViewController !== null) {
        this._visibleViewController.viewDidAppear(A)
    }
    this.busy = false;
    if (ADUtils.objectHasMethod(this.delegate, ADTransitionControllerDidMakeViewControllerVisible)) {
        this.delegate[ADTransitionControllerDidMakeViewControllerVisible](this, this._visibleViewController, this.previouslyVisibleViewController, A)
    }
};
ADClass(ADTransitionController);
ADViewController.prototype.getTransitionController = function(){
    return this.parentControllerOfKind(ADTransitionController)
};
ADViewController.prototype.processTransitionAnchors = function(){
    var A;
    var C = this.view.layer.querySelectorAll("[ad-transitions-to]");
    for (var B = 0; B < C.length; B++) {
        A = C[B];
        A.addEventListener(ADControlTouchUpInsideEvent, this, false);
        A.addEventListener("click", this, false)
    }
};
ADViewController.prototype.handleTransitionAnchorActivation = function(D){
    var C = D.currentTarget;
    if (!C.hasAttribute("ad-transitions-to")) {
        return
    }
    if (D.type == "click" && ADControl.isNodeInControlHierarchyBoundedByElement(D.target, C)) {
        return
    }
    var E = C.getAttribute("ad-transitions-to");
    if (!ADViewController.instances.hasOwnProperty(E)) {
        return
    }
    var B = ADRootViewController.sharedRootViewController.transitionController;
    var A = ADViewController.instances[E];
    B.setVisibleViewControllerAnimated(A, true)
};
ADViewController.addViewProcessor({
    processor: "processTransitionAnchors",
    handler: "handleTransitionAnchorActivation",
    eventTypes: [ADControlTouchUpInsideEvent, "click"]
});
ADClass.synthesizeProperties(ADViewController, ["transitionController"]);
ADClass.processMethods(ADViewController, ["processTransitionAnchors", "handleTransitionAnchorActivation"]);
ADRootViewController.prototype.getTransitionController = function(){
    if (!this.hasOwnProperty("_transitionController")) {
        var B = ADRootView.sharedRoot;
        var A = new ADTransitionController();
        A.view.size = B.size.copy();
        A.view.autoresizingMask = ADViewAutoresizingFlexibleWidth & ADViewAutoresizingFlexibleHeight;
        A.delegate = this;
        B.addSubview(A.view, 0);
        this._transitionController = A
    }
    return this._transitionController
};
ADClass.synthesizeProperties(ADRootViewController, ["transitionController"]);
const ADNavigationControllerWillShowViewController = "navigationControllerWillShowViewControllerAnimated";
const ADNavigationControllerDidShowViewController = "navigationControllerDidShowViewControllerAnimated";
const ADNavigationControllerHideShowBarDuration = 0.2;
ADNavigationController.superclass = ADViewController;
ADNavigationController.synthesizedProperties = ["viewControllers", "topViewController", "visibleViewController", "navigationBarHidden", "toolbarHidden"];
function ADNavigationController(B, A){
    this.callSuper(B);
    this.delegate = null;
    this._viewControllers = [];
    this._navigationBarHidden = false;
    this._toolbarHidden = true;
    this.navigationBar = new ADNavigationBar();
    this.toolbar = null;
    this.requiresDeferredHostViewSizeUpdate = false;
    this.previousController = null;
    this.backingTransitionController = new ADTransitionController();
    this.backingTransitionController.delegate = this;
    if (A !== undefined) {
        this.viewControllers = [A]
    }
}

ADNavigationController.prototype.loadView = function(){
    this._view = new ADNavigationView(this);
    this._view.layer.addClassName("ad-navigation-controller-view");
    this._view.clipsToBounds = true;
    this._view.addSubview(this.navigationBar);
    this.navigationBar.autoresizingMask = ADViewAutoresizingFlexibleWidth;
    this.navigationBar.size = new ADSize(window.innerWidth, ADNavigationBarHeight);
    this.hostView = this._view.addSubview(this.backingTransitionController.view);
    this.hostView.layer.addClassName("ad-navigation-controller-host-view");
    this.toolbar = this._view.addSubview(new ADToolbar());
    this.toolbar.autoresizingMask = ADViewAutoresizingFlexibleWidth;
    this.toolbar.size = new ADSize(window.innerWidth, ADToolbarHeight);
    this._view.addPropertyObserver("size", this, "sizeChanged");
    this._view.size = new ADSize(window.innerWidth, window.innerHeight);
    this._view.autoresizingMask = ADViewAutoresizingFlexibleWidth | ADViewAutoresizingFlexibleHeight
};
ADNavigationController.prototype.viewMovedToNewSuperview = function(){
    var A = this.navigationBar.topItem;
    if (A !== null) {
        A.updateLayoutIfTopItem()
    }
};
ADNavigationController.prototype.sizeChanged = function(){
    var B = -ADNavigationBarHeight;
    var A = 0;
    var C = this._view.size.height;
    if (!this._navigationBarHidden) {
        B = 0;
        A += ADNavigationBarHeight
    }
    if (!this._toolbarHidden) {
        C -= ADToolbarHeight
    }
    this.navigationBar.position = new ADPoint(0, B);
    this.toolbar.position = new ADPoint(0, C);
    this.hostView.position = new ADPoint(0, A);
    this.updateHostViewSize()
};
ADNavigationController.prototype.updateHostViewSize = function(){
    var A = this._view.size.height;
    if (!this._navigationBarHidden) {
        A -= ADNavigationBarHeight
    }
    if (!this._toolbarHidden) {
        A -= ADToolbarHeight
    }
    this.hostView.size = new ADSize(this._view.size.width, A)
};
ADNavigationController.prototype.getTopViewController = function(){
    return (this._viewControllers.length > 0) ? this._viewControllers[this._viewControllers.length - 1] : null
};
ADNavigationController.prototype.getVisibleViewController = function(){
    var A = this.topViewController;
    return A.modalViewController || A
};
ADNavigationController.prototype.setViewControllers = function(A){
    this.setViewControllersAnimated(A, false)
};
ADNavigationController.prototype.setViewControllersAnimated = function(G, D){
    if (this.backingTransitionController.busy || G.length == 0) {
        return
    }
    ADTransaction.begin();
    if (!this.isViewLoaded()) {
        this.loadView()
    }
    var F = this.topViewController;
    var B = G[G.length - 1];
    var H = (this._viewControllers.indexOf(B) != -1);
    if (ADUtils.objectHasMethod(this.delegate, ADNavigationControllerWillShowViewController)) {
        this.delegate[ADNavigationControllerWillShowViewController](this, B, D)
    }
    for (var C = 0; C < this._viewControllers.length; C++) {
        this._viewControllers[C].parentViewController = null
    }
    for (var C = 0; C < G.length; C++) {
        G[C].parentViewController = this
    }
    B.view.size = this.hostView.size.copy();
    B.view.autoresizingMask = ADViewAutoresizingFlexibleWidth | ADViewAutoresizingFlexibleHeight;
    if (F === null) {
        B.becomesVisibleTransition = B.becomesTopItemTransition;
        this.backingTransitionController.visibleViewController = B
    }
    else {
        if (F !== B) {
            F.becomesHiddenTransition = H ? F.wasTopItemTransition : F.becomesBackItemTransition;
            B.becomesVisibleTransition = H ? B.wasBackItemTransition : B.becomesTopItemTransition;
            this.backingTransitionController.setVisibleViewControllerAnimated(B, D)
        }
    }
    this._viewControllers = G;
    var A = [];
    for (var C = 0; C < G.length; C++) {
        A.push(G[C].navigationItem)
    }
    this.navigationBar.setItemsAnimated(A, D);
    var E = B.toolbarItems;
    if (E !== null) {
        this.toolbar.setItemsAnimated(E, D)
    }
    ADTransaction.commit()
};
ADNavigationController.prototype.pushViewControllerAnimated = function(A, B){
    this.setViewControllersAnimated(this._viewControllers.concat([A]), B)
};
ADNavigationController.prototype.popViewControllerAnimated = function(B){
    if (this._viewControllers.length > 1 && !this.backingTransitionController.busy) {
        var A = this.topViewController;
        this.setViewControllersAnimated(this._viewControllers.slice(0, this._viewControllers.length - 1), B);
        return A
    }
    return null
};
ADNavigationController.prototype.popToRootViewControllerAnimated = function(A){
    return this.popToViewControllerAnimated(this._viewControllers[0], A)
};
ADNavigationController.prototype.popToViewControllerAnimated = function(A, C){
    var D = this._viewControllers.indexOf(A);
    if (D < 0 || D >= this._viewControllers.length - 1 || this.backingTransitionController.busy) {
        return []
    }
    var B = this._viewControllers.slice(D + 1);
    this.setViewControllersAnimated(this._viewControllers.slice(0, D + 1), C);
    return B
};
ADNavigationController.prototype.setNavigationBarHidden = function(A){
    this.setNavigationBarHiddenAnimated(A, false)
};
ADNavigationController.prototype.setNavigationBarHiddenAnimated = function(B, A){
    if (this._navigationBarHidden == B) {
        return
    }
    this._navigationBarHidden = B;
    if (!this.isViewLoaded()) {
        return
    }
    ADTransaction.begin();
    ADTransaction.defaults.duration = A ? ADNavigationControllerHideShowBarDuration : 0;
    ADTransaction.defaults.properties = ["position"];
    new ADTransition({
        target: this.navigationBar,
        to: [new ADPoint(0, B ? -ADNavigationBarHeight : 0)]
    }).start();
    new ADTransition({
        target: this.hostView,
        to: [new ADPoint(0, B ? 0 : ADNavigationBarHeight)],
        delegate: this
    }).start();
    ADTransaction.commit();
    if (!A || B) {
        this.updateHostViewSize()
    }
    else {
        this.requiresDeferredHostViewSizeUpdate = true
    }
};
ADNavigationController.prototype.transitionDidComplete = function(A){
    if (this.requiresDeferredHostViewSizeUpdate) {
        this.requiresDeferredHostViewSizeUpdate = false;
        this.updateHostViewSize()
    }
};
ADNavigationController.prototype.setToolbarHidden = function(A){
    this.setToolbarHiddenAnimated(A, false)
};
ADNavigationController.prototype.setToolbarHiddenAnimated = function(B, A){
    if (this._toolbarHidden == B) {
        return
    }
    this._toolbarHidden = B;
    if (!this.isViewLoaded()) {
        return
    }
    new ADTransition({
        target: this.toolbar,
        properties: ["position"],
        to: [new ADPoint(0, this._view.size.height - (B ? 0 : ADNavigationBarHeight))],
        duration: A ? ADNavigationControllerHideShowBarDuration : 0,
        delegate: this
    }).start();
    if (!A || B) {
        this.updateHostViewSize()
    }
    else {
        this.requiresDeferredHostViewSizeUpdate = true
    }
};
ADNavigationController.prototype.transitionControllerDidMakeViewControllerVisibleAnimated = function(B, D, A, C){
    if (ADUtils.objectHasMethod(this.delegate, ADNavigationControllerDidShowViewController)) {
        this.delegate[ADNavigationControllerDidShowViewController](this, D, C)
    }
};
ADClass(ADNavigationController);
ADNavigationView.superclass = ADView;
function ADNavigationView(A){
    this.callSuper();
    this.viewController = A
}

ADNavigationView.prototype.didMoveToSuperview = function(A){
    this.callSuper(A);
    if (A !== null) {
        this.viewController.viewMovedToNewSuperview()
    }
};
ADClass(ADNavigationView);
ADViewController.prototype.getNavigationController = function(){
    return this.parentControllerOfKind(ADNavigationController)
};
ADViewController.prototype.getNavigationItem = function(){
    if (this._navigationItem === null) {
        this._navigationItem = new ADNavigationItem(this.title);
        this._navigationItem.viewController = this
    }
    return this._navigationItem
};
ADViewController.prototype.setToolbarItems = function(A){
    this.setToolbarItemsAnimated(A, false)
};
ADViewController.prototype.setToolbarItemsAnimated = function(B, C){
    this._toolbarItems = B;
    var A = this.parentViewController;
    if (A !== null && A instanceof ADNavigationController) {
        A.toolbar.setItemsAnimated(B, C)
    }
};
ADClass.synthesizeProperties(ADViewController, ["navigationController", "navigationItem", "toolbarItems"]);
ADClass.processMethods(ADViewController, ["setToolbarItemsAnimated"]);
const ADTabBarControllerShouldSelectViewController = "tabBarControllerShouldSelectViewController";
const ADTabBarControllerDidSelectViewController = "tabBarControllerDidSelectViewController";
const ADTabBarControllerMaxItems = 5;
ADTabBarController.superclass = ADViewController;
ADTabBarController.synthesizedProperties = ["viewControllers", "selectedViewController", "selectedIndex"];
function ADTabBarController(A){
    this.callSuper(A);
    this.delegate = null;
    this.tabBar = new ADTabBar();
    this._viewControllers = [];
    this.customizableViewControllers = [];
    this.moreNavigationController = null;
    this.tabBar.delegate = this
}

ADTabBarController.prototype.loadView = function(){
    if (this.isViewLoaded()) {
        return
    }
    this._view = new ADView(this);
    this._view.layer.addClassName("ad-tab-bar-controller-view");
    this._view.size = new ADSize(window.innerWidth, window.innerHeight);
    this._view.autoresizingMask = ADViewAutoresizingFlexibleWidth | ADViewAutoresizingFlexibleHeight;
    this.hostView = this._view.addSubview(new ADView());
    this.hostView.layer.addClassName("ad-tab-bar-controller-host-view");
    this.hostView.size = new ADSize(this._view.size.width, this._view.size.height - ADTabBarHeight);
    this.hostView.autoresizingMask = ADViewAutoresizingFlexibleWidth | ADViewAutoresizingFlexibleHeight;
    this._view.addSubview(this.tabBar);
    this.tabBar.autoresizingMask = ADViewAutoresizingFlexibleWidth | ADViewAutoresizingFlexibleTopMargin
};
ADTabBarController.prototype.tabBarDidSelectItem = function(B, A){
    while (this.hostView.subviews.length) {
        this.hostView.subviews[0].removeFromSuperview()
    }
    var D = this.selectedViewController;
    var C = D.view;
    D.viewWillAppear(false);
    C.size = this.hostView.size.copy();
    C.autoresizingMask = ADViewAutoresizingFlexibleWidth | ADViewAutoresizingFlexibleHeight;
    this.hostView.addSubview(C);
    if (ADUtils.objectHasMethod(this.delegate, ADTabBarControllerDidSelectViewController)) {
        this.delegate[ADTabBarControllerDidSelectViewController](this, D)
    }
    D.viewDidAppear(false)
};
ADTabBarController.prototype.setViewControllers = function(A){
    this.setViewControllersAnimated(A, false)
};
ADTabBarController.prototype.setViewControllersAnimated = function(D, C){
    if (D.length > ADTabBarControllerMaxItems) {
    }
    this._viewControllers = D;
    var A = [];
    for (var B = 0; B < D.length; B++) {
        A.push(D[B].tabBarItem)
    }
    this.tabBar.setItemsAnimated(A, C)
};
ADTabBarController.prototype.getSelectedViewController = function(){
    var B = null;
    var A = this.selectedIndex;
    if (A >= 0 && A < this._viewControllers.length) {
        B = this._viewControllers[A]
    }
    return B
};
ADTabBarController.prototype.setSelectedViewController = function(A){
    if (this._viewControllers.indexOf(A) != -1) {
        this.tabBar.selectedItem = A.tabBarItem
    }
};
ADTabBarController.prototype.getSelectedIndex = function(){
    return this.tabBar.items.indexOf(this.tabBar.selectedItem)
};
ADTabBarController.prototype.setSelectedIndex = function(A){
    if (A >= 0 && A < this._viewControllers.length) {
        this.tabBar.selectedItem = this._viewControllers[A]
    }
};
ADClass(ADTabBarController);
ADViewController.prototype.getTabBarController = function(){
    return this.parentControllerOfKind(ADTabBarController)
};
ADViewController.prototype.getTabBarItem = function(){
    if (this._tabBarItem === null) {
        this._tabBarItem = new ADTabBarItem();
        this._tabBarItem.title = this.title;
        this._tabBarItem.viewController = this
    }
    return this._tabBarItem
};
ADClass.synthesizeProperties(ADViewController, ["tabBarController", "tabBarItem"]);
