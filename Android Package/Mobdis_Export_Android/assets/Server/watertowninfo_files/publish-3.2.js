var facebookCount = "horizontal", fbshowfacestext = $("#fbshowfacestext").clone(), localpage = window.location.href, fblocalpage = localpage.substring(0, localpage.length - 1);
var specialZoom=1;
var jgestures;
var originalW, originalH;

var myscrollview;
var lastX,lastY;
function publishWidgetfb(a){
    $("#fbsharebutton", a).css("display") != "none" && $(".socialImagesShare").css("display", "block");
    var b = a.childNodes[0].childNodes[1], c = a.childNodes[0].childNodes[2];
    b.getAttribute("send");
    var d = b.getAttribute("showfaces"), g = b.getAttribute("action"), f = b.getAttribute("colorscheme"), j = b.getAttribute("layout"), m = b.getAttribute("display"), k = b.getAttribute("theurl"), l = b.getAttribute("src");
    if (k == "local") 
        l = window.location.href;
    var k = $(a).css("width"), n = document.createElement("iframe");
    $("#fbsharebutton", a).attr("href", "http://www.facebook.com/sharer.php?u=" + l);
    k >= 400 && (k = 399);
    n.setAttribute("src", src = "http://www.facebook.com/plugins/like.php?href=" + l + "&send=false&layout=" + j + "&amp;width=" + k + "&amp;&height=auto&show_faces=" + d + "&action=" + g + "&colorscheme=" + f + "&font&height=21");
    n.setAttribute("frameborder", "0");
    n.setAttribute("scrolling", "no");
    $(c).css("display", "none");
    $(b).css("display", "none");
    $(n).css("display", m);
    $(n).css("width", k);
    a.childNodes[0].appendChild(n);
    $("#widgetOverlay", a).remove()
}

function initializeWidgetfb(a){
    $("#fbsharebutton", a).css("display") == "none" && $(".socialImagesLike", a).css("display", "block");
    $(".socialImagesShare", a).css("display", "block")
}

function loadCustomEventsfb(){
}

function loadWidgetChildCustomEventsfb(){
}

function initializeWidgetformWidget(){
}

function publishWidgetformWidget(a){
    var b = $(a.firstChild).attr("data-fieldType").match(/submit|coupon|dropdown/), b = b == null ? "" : b[0];
    switch (b) {
        case "dropdown":
            loadDropDownList(a);
            break;
        case "coupon":
        case "submit":
            $(a.firstChild).tap(function(){
                eventSubmitForm(this)
            })
    }
}

function loadDropDownList(a){
    var b = $(a.firstChild).hasClass("hasOthOption"), c = $(a.firstChild).find("option[value='others'], option[value='others'], option[value='Other'], option[value='Others']");
    b == !0 &&
    (c.length == 0 ? $(a.firstChild).append('<option value="Others" data-value="Others">Others</option>') : $(c).attr("data-value", "Others"), $(a.firstChild).change(function(){
        var a = "", b = $(this).find("option[data-value='Others']");
        if ($(this).val().toLowerCase().match(/others|other/) != null) {
            for (; a.trim() == "";) {
                a = prompt("Please specify others (compulsory): ");
                if (a == null) 
                    break;
                a.toLowerCase().match(/others|other/) != null && (a = "")
            }
            a != null ? (a = a.trim(), b.val("Others - " + a).html(a)) : $(this).attr("selectedIndex", 0)
        }
        else 
            b.val().toLowerCase().match(/others|other/) != null && b.val("Others").html("Others")
    }))
}

function loadCustomEventsformWidget(){
}

function loadWidgetChildCustomEventsformWidget(){
}

function verify_date(a, b){
    var c = new Date, a = new Date(a), b = new Date(b), d = !1, g = "";
    a > c ? g = "The coupon perioid has not started yet." : b < c ? g = "The coupon perioid has expired." : d = !0;
    return {
        valid: d,
        message: g
    }
}

function validateThis(a, b){
    var c = !1;
    switch (a) {
        case "email":
            c = b.match(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/) != null;
            break;
        case "number":
            c = b.match(/^\d{0,}$/) != null
    }
    return c
}

var form_validation_obj = {
    required: [],
    email: [],
    number: []
};
function validateformfields(a){
    $(a).attr("required") && $(a).val().trim() == "" && form_validation_obj.required.push($(a).attr("id"));
    $(a).hasClass("email") && $(a).val().trim() != "" && (validateThis("email", $(a).val()) || form_validation_obj.email.push($(a).attr("id")));
    $(a).hasClass("number") && (validateThis("number", $(a).val()) || form_validation_obj.number.push($(a).attr("id")))
}

function showValidateErrorMsg(){
    var a = !1;
    if (form_validation_obj.number.length > 0 || form_validation_obj.email.length > 0 || form_validation_obj.required.length > 0) {
        for (i in form_validation_obj.required) 
            $("#" + currentPageId + " #" + form_validation_obj.required[i]).attr("placeHolder", "Required").css("background", "#ffd4e6").val("");
        for (i in form_validation_obj.email) 
            $("#" + currentPageId + " #" + form_validation_obj.email[i]).attr("placeHolder", "Email is not valid.").css("background", "#ffd4e6").val("");
        for (i in form_validation_obj.number) 
            $("#" +
            currentPageId +
            " #" +
            form_validation_obj.number[i]).attr("placeHolder", "Please provide number only.").css("background", "#ffd4e6").val("");
        alert("Form submission is not successful. Please check the fields.");
        a = !0
    }
    resetValidateData();
    return a
}

function resetValidateData(){
    form_validation_obj = {
        required: [],
        email: [],
        number: []
    }
}

function eventSubmitForm(a){
    var b = $(a).attr("data-fieldType"), c = $(a).attr("data-method"), d = $("#" + currentPageId + " ." + a.parentNode.id + "_SubmitField"), g = a.parentNode, f = $(a).attr("data-address"), j, m = "Form was successfully submitted.";
    if (!(d.length == 0 && b != "coupon")) 
        if ($(a).attr("disabled", "disabled"), c == "post") {
            var k = document.createElement("form");
            for (i = 0; i < d.length; i++) {
                var l = $(d[i]).clone();
                $(l).val($(d[i]).val());
                $(l).attr("name", $(l).attr("title"));
                k.appendChild(l[0]);
                validateformfields(l[0])
            }
            showValidateErrorMsg() ? $(a).removeAttr("disabled") : (k.setAttribute("method", "post"), k.setAttribute("action", f), k.submit())
        }
        else {
            var k = [], l = [], n = window.location.href;
            preview_mode = n.indexOf(root + "preview/") < 0 ? 0 : 1;
            var o = o = $("#" + currentPageId + " input[title=email], #" + currentPageId + " input[title=Email]").filter("." + a.parentNode.id + "_SubmitField"), p = $("#divAutho").attr("class").replace("autho_", ""), q = $("#divLV").length == 0 ? "lite" : "paid";
            for (i = 0; i < d.length; i++) {
                var r = d[i];
                k.push($(r).attr("title"));
                l.push($(r).val());
                validateformfields(r)
            }
            if (showValidateErrorMsg()) 
                $(a).removeAttr("disabled");
            else {
                if (root == "" || root.match(/designer.mobdis.biz|pro-staging.heroku.com|mobdis-test.heroku.com|mobdis.co|localhost:\d{4}/g) == null) 
                    root = "http://designer.mobdis.biz/";
                if (c == "email") 
                    n = n + "#" + a.id, d = o.length > 0 ? $(o).val().trim() : "", j = {
                        email: f,
                        "names[]": k,
                        "values[]": l,
                        title: "Form submission - " + $(a).attr("data-formTitle"),
                        url: n,
                        visitorEmail: d,
                        version: q,
                        user_id: p
                    }, f = root + "sent_email_to";
                else 
                    if (b == "coupon") {
                        d = "";
                        if (o.length > 0) 
                            d = $(o).val().trim();
                        else 
                            for (; d == "" || d == null;) 
                                d = prompt("Please enter Your email address."), is_valid = validateThis("email", d), is_invalid || (d = "");
                        valid_date = verify_date($(a).attr("data-startdate"), $(a).attr("data-enddate"));
                        if (d == "" || d == null) {
                            alert("Please provide email address.");
                            $(a).removeAttr("disabled");
                            return
                        }
                        if (!valid_date.valid) {
                            alert("Coupon could not be created. " + valid_date.message);
                            $(a).removeAttr("disabled");
                            return
                        }
                        j = {
                            email: d,
                            user_email: f,
                            "names[]": k,
                            "values[]": l,
                            title: "You have a new e-Coupon - " + $(a).attr("data-formTitle"),
                            preview_mode: preview_mode,
                            project_id: $(a).attr("data-id")
                        };
                        f = root + "coupon/generate_coupon";
                        m = "Your coupon has been sent to " + d + ". Check your email for the coupon code."
                    }
                showProgressBarInfinite();
                d = jQuery.param(j, !0);
                $.ajax({
                    type: "POST",
                    url: f,
                    data: d,
                    datatype: "html",
                    success: function(b){
                        b != "error" ? (alert(m), $(g).trigger("submitSuccess")) : (alert("Request fail. Please try again later."), $(a).removeAttr("disabled"))
                    },
                    error: function(b){
                        b.status == 0 || b.status == 200 ? (alert(m), $(g).trigger("submitSuccess")) : (b.responseText == "redeemed" ? alert("Request fail. This email has been used for this coupon.") : alert("Request fail. Please try again later."), $(a).removeAttr("disabled"))
                    },
                    complete: function(){
                        stopProgressBar()
                    }
                })
            }
        }
}

var galleryViews = [], orient = !1, deviceType = window.navigator.appVersion, areGalleryImagesLoaded = !1, imageLoaderInterval, loaderIntervalCounter = 0, pageSelector;
function simpleGalleryLoadImages(a){
    var b = !0, c = $(a).find("img.gallery-cell");
    $.each(c, function(a, c){
        c.complete || (b = !1)
    });
    loaderIntervalCounter += 1;
    if (b || loaderIntervalCounter >= 20) 
        window.clearInterval(imageLoaderInterval), console.log("NO Red Flag raised, Timer cleared!"), areGalleryImagesLoaded = !0, $("#galleryOverlay", a).hide(), loaderIntervalCounter = 0
}

function publishWidgetsimpleGallery(a){
    console.warn("publishWidgetsimpleGallery has been called");
    var b = $("#galleryOverlay").length > 0, c;
    c = b ? $("#galleryOverlay") : $(document.createElement("div"));
    b ||
    ($(a).append(c), console.warn("Gallery Loader is not present, hence adding!"), c.attr("id", "galleryOverlay"), c.css({
        "background-color": "rgba(26,26,26,0.7)",
        position: "absolute",
        "z-index": "99",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        "background-image": "url('../pro_images/app_loader.gif')",
        "background-position": "50% 50%",
        "background-repeat": "no-repeat",
        display: "none"
    }));
    areGalleryImagesLoaded ? (b = $(a).find("img.gallery-cell"), $.each(b, function(a, b){
        $(b).attr("src", $(b).attr("data-source"))
    }), c.hide()) : (c.show(), imageLoaderInterval = window.setInterval(function(){
        simpleGalleryLoadImages(a)
    }, 850));
    pageSelector = a.parentNode.id == "area" ? "#area" : ".area";
    a.childNodes[0].getAttribute("on_start") == "none" &&
    setTimeout(function(){
        $("[data-scroll='x']", a).each(function(){
            var b = $(".gallery-cell", a), c = parseInt($(".gallery-cell", a).css("width")), f = parseInt($(".gallery-cell", a).css("padding-left")), j = parseInt($(".gallery-cell", a).css("padding-right")), c = c + f + j;
            c *= b.length;
            $(".gallery-inner", this).css("width", c + "px");
            b = $(this);
            if (b.hasClass("ui-scrolllistview")) 
                b.scrolllistview();
            else {
                (c = b.jqmData("scroll") + "") && c.search(/^[xy]p$/);
                f = c && c.search(/^[xy]/) != -1 ? c.charAt(0) : null;
                c = {};
                if (f) 
                    c.direction = f;
                c.pagingEnabled = !0;
                if (f = b.jqmData("scroll-method")) 
                    c.scrollMethod = f;
                b.scrollview(c)
            }
        })
    }, 500);
    a.childNodes[0].getAttribute("on_start") == "grid" &&
    (setTimeout(function(){
        $("[data-scroll='y']", a).each(function(){
            var a = $(this);
            if (a.hasClass("ui-scrolllistview")) 
                a.scrolllistview();
            else {
                var b = a.jqmData("scroll") + "";
                b && b.search(/^[xy]p$/);
                var c = b && b.search(/^[xy]/) != -1 ? b.charAt(0) : null, b = {};
                if (c) 
                    b.direction = c;
                b.pagingEnabled = !0;
                if (c = a.jqmData("scroll-method")) 
                    b.scrollMethod = c;
                a.scrollview(b)
            }
        })
    }, 500), setTimeout(function(){
        $(".gallery-cell", a).bind("click", function(){
            var a = this.parentNode.parentNode.parentNode;
            parseInt($(a).css("width"));
            var b = $(".gallery-cell", this.parentNode), c = document.createElement("div");
            c.className = "gallery-inner";
            $(c).css("left", "0px");
            var j = this.id.substr(this.id.length - 2, this.id.length);
            isNaN(parseInt(j)) && (j = this.id.substr(this.id.length - 1, this.id.length));
            var j = parseInt(j), m, k;
            orient = typeof orientation == "undefined" ? 0 : Math.abs(orientation);
            if (deviceType.match(/iPad|iPhone|iPod/) == null && $("head meta[name=viewport]").attr("content").match(/scale/) == null) {
                var l = parseInt($("#" + currentPageId).children(":first").css("height")), n = parseInt($("#" + currentPageId).children(":first").css("width")), l = window.innerHeight < l ? window.innerHeight : l;
                m = window.innerWidth < n ? window.innerWidth : n;
                k = l
            }
            else 
                m = parseInt(window.innerWidth), k = parseInt(window.innerHeight);
            for (n = 0; n < b.length; n++) 
                l = document.createElement("img"), l.src = $(b[n]).attr("src"), $(l).attr("class", "gallery-cell widgetChildObject"), l.id = "gallery-cell" + n, c.appendChild(l), $(l).load(function(){
                    var a = parseInt($(this).css("width")), b = parseInt($(this).css("height"));
                    a > b ? ($(this).css("padding", "0px"), $(this).css("width", m + "px"), $(this).css("position", "relative"), $(this).css("height", "auto")) : ($(this).css("padding", "0px"), $(this).css("height", k + "px"), $(this).css("position", "relative"), $(this).css("width", "auto"));
                    b = parseInt($(this).css("width"));
                    a = parseInt($(this).css("height"));
                    if (b < m) {
                        var d = m - b;
                        d /= 2;
                        $(this).css("padding-left", Math.round(d) + "px");
                        $(this).css("padding-right", d + "px")
                    }
                    b > m &&
                    ($(this).css("padding", "0px"), $(this).css("width", m + "px"), $(this).css("position", "relative"), $(this).css("height", "auto"), a = parseInt($(this).css("height")), parseInt($(this).css("width")), a < k && (b = k - a, b /= 2, $(this).css("padding-top", b + "px"), $(this).css("padding-bottom", b + "px")));
                    a < k && (b = k - a, b /= 2, $(this).css("padding-top", b + "px"), $(this).css("padding-bottom", b + "px"));
                    a > k && ($(this).css("padding", "0px"), $(this).css("height", k + "px"), $(this).css("position", "relative"), $(this).css("width", "auto"), parseInt($(this).css("height")), b = parseInt($(this).css("width")), b < m && (d = m - b, d /= 2, $(this).css("padding-left", Math.round(d) + "px"), $(this).css("padding-right", d + "px")))
                });
            n = $(pageSelector, "#" + currentPageId);
            l = parseInt($(n).css("height"));
            parseInt($(n).css("width"));
            $(n).offset();
            $(this).offset();
            b = document.createElement("div");
            b.id = "galleryClose";
            b.setAttribute("widId", a.id);
            $(b).css("width", "100%");
            $(b).css("height", "100%");
            $(b).css("background-color", "black");
            b.setAttribute("data-scroll", "x");
            b.setAttribute("firsttime", !0);
            $(b).append(c);
            c = $("<img>").attr({
                src: root + "pro_images/closebox.png",
                id: "imageClose"
            }).css({
                position: "absolute",
                right: "2px",
                top: "2px",
                "z-index": getTopZindex(currentPageId) + 1,
                opacity: 0
            }).bind("click", function(){
                var a = parseInt($(this.parentNode).css("height"));
                $("#galleryClose").animate({
                    top: a + "px"
                }, 600, function(){
                    $("#galleryClose").remove()
                });
                $(this).animate({
                    top: a + "px"
                }, 600, function(){
                    $(this).remove()
                })
            });
            a = this.parentNode.parentNode.parentNode;
            $(b).css("top", l + "px");
            $("#galleryClose", n).remove();
            $("#imageClose", n).remove();
            document.createElement("div");
            $(pageSelector, "#" + currentPageId).append(b);
            a = getTopZindex(currentPageId);
            $(b).css("z-index", a);
            $(pageSelector, "#" + currentPageId).append(c);
            $("[data-scroll='x']", n).each(function(){
                var a = $(".gallery-cell", this), a = parseInt($(this.parentNode).css("width")) * a.length;
                $(".gallery-inner", this).css("width", a + "px");
                $(".gallery-inner", this).css("height", "100%");
                a = $(this);
                if (a.hasClass("ui-scrolllistview")) 
                    a.scrolllistview();
                else {
                    var b = a.jqmData("scroll") + "";
                    b && b.search(/^[xy]p$/);
                    var b = {
                        direction: "x",
                        pagingEnabled: !0
                    }, d = a.jqmData("scroll-method");
                    if (d) 
                        b.scrollMethod = d;
                    a.scrollview(b)
                }
            });
            a = parseInt($(pageSelector, "#" + currentPageId).css("width"));
            a *= j;
            $(".gallery-inner", b).css("left", "-" + a + "px");
            $(b).animate({
                top: "0px"
            }, 600, function(){
                $("#imageClose").animate({
                    opacity: 0.5
                }, 800, function(){
                })
            })
        })
    }, 1500), setTimeout(function(){
        $(".ui-scrollbar-y", a).css("display", "none ! important")
    }, 2E3));
    galleryViews.push(a.childNodes[0]);
    $("#widgetOverlay", a).remove()
}

function reloadGalleryDetail(){
    var a = $("img", "#galleryClose"), b, c;
    orient = typeof orientation == "undefined" ? 0 : Math.abs(orientation);
    if (deviceType.match(/iPad|iPhone|iPod/) == null) {
        b = parseInt($("#" + currentPageId).children(":first").css("height"));
        c = parseInt($("#" + currentPageId).children(":first").css("width"));
        b = window.innerHeight < b ? window.innerHeight : b;
        var d = window.innerWidth < c ? window.innerWidth : c;
        $("head meta[name=viewport]").attr("content").match(/\d{1,}/)[0] < 323 || orient != 90 ? c = d : (c = b, b = d - 100)
    }
    else 
        b = window.innerHeight, c = window.innerWidth;
    deviceType.match("iPhone") != null && orientation == 0 && (b += 100);
    $("#galleryClose").height(b);
    $("#galleryClose").width(c);
    for (d = 0; d < a.length; d++) {
        var g = parseInt($(a[d]).css("width")), f = parseInt($(a[d]).css("height"));
        g > f ? ($(a[d]).css("padding", "0px"), $(a[d]).css("width", c + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("height", "auto")) : ($(a[d]).css("padding", "0px"), $(a[d]).css("height", b + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("width", "auto"));
        f = parseInt($(a[d]).css("width"));
        g = parseInt($(a[d]).css("height"));
        if (f < c) {
            var j = c - f;
            j /= 2;
            $(a[d]).css("padding-left", Math.round(j) + "px");
            $(a[d]).css("padding-right", j + "px")
        }
        f > c && ($(a[d]).css("padding", "0px"), $(a[d]).css("width", c + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("height", "auto"), g = parseInt($(a[d]).css("height")), parseInt($(a[d]).css("width")), g < b && (f = b - g, f /= 2, $(a[d]).css("padding-top", f + "px"), $(a[d]).css("padding-bottom", f + "px")));
        g < b &&
        (f = b - g, f /= 2, $(a[d]).css("padding-top", f + "px"), $(a[d]).css("padding-bottom", f + "px"));
        g > b && ($(a[d]).css("padding", "0px"), $(a[d]).css("height", b + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("width", "auto"), parseInt($(a[d]).css("height")), f = parseInt($(a[d]).css("width")), f < c && (j = c - f, j /= 2, $(a[d]).css("padding-left", Math.round(j) + "px"), $(a[d]).css("padding-right", j + "px")))
    }
    scrollTo(0, 0)
}

function initializeWidgetsimpleGallery(a){
    var b = $("[data-scroll='x']", a);
    b.length == 0 && (b = $("[data-scroll='y']", a));
    galleryViews.push(b[0])
}

function initializeWidgetgridGallery(a){
    a.getAttribute("data-content");
    var b = a.getElementsByClassName("grid-cell");
    loadNewGridGallery(a, !1, b.length)
}

function galleryWHRule(a, b, c, d){
    w = parseInt(a);
    h = parseInt(b);
    a = {
        "max-width": "",
        "max-height": "",
        "margin-left": "",
        "margin-top": ""
    };
    b = c / d;
    w <= h ? d >= h && b < 1 ? (a.width = "auto", a.height = h, a["max-width"] = w) : (a.width = "100%", a.height = "auto") : c >= w && b > 1 ? (a.width = w, a.height = "auto", a["max-height"] = h) : (a.width = "auto", a.height = "100%");
    return a
}

function loadNewGallery(){
}

function enlargeGridCell(a, b){
    if (locked) 
        setTimeout("locked=false;", 3E3);
    else 
        if (locked = !0, currentPageId = a.layer.parentNode.parentNode.parentNode.id, $("#previewWindow").css("display") != "none") {
            displayImg = document.createElement("img");
            displayImg.className = "viewing";
            var c = document.getElementById("previewCanvas");
            c == void 0 && (c = document.getElementById(currentPageId));
            for (var d = a.idName, g = document.getElementById(currentPageId).getElementsByClassName("drsElement"), f, j = 0; j < g.length; j++) 
                if (g[j].getAttribute("data-content").toLowerCase().indexOf("gallery") >= 0 &&
                (g[j].childNodes[0].getAttribute("idName") == d || g[j].childNodes[0].getAttribute("idName") == d + "x")) 
                    f = g[j];
            var d = $(".gallery-cell", f), m = $("#" + currentPageId).height(), k = $("#" + currentPageId).width();
            $("#" + currentPageId).css("top");
            $("#" + currentPageId).css("left");
            $("#" + currentPageId).css("position");
            var b = b == "0x" ? 0 : parseInt(b), g = $("<img>").attr("src", $(".gallery-cell img", f)[b].src), j = g.height, l = g.width, n = k / l, o = m / j, g = getTopZindex(currentPageId);
            $(d[b]).css("z-index", 2E4);
            var p = $(d[b]).offset(), q = $("#" +
            currentPageId).offset(), r = q.left + k / 2 - (p.left + l / 2), t = q.top + m / 2 - (p.top + j / 2);
            d[b].childNodes[0].id = "tempImg";
            var v;
            v = Math.abs(t - (j * n - j) / 2);
            var u, k = parseInt(k), m = parseInt(m), j = parseInt(j), l = parseInt(l);
            k < m ? (u = n, v = t + Math.abs(q.top - p.top) - (j * n - j) / 2, heightLen = j * u, heightLen > m ? (heightLen = m, v = 0) : o = n, widthLen = k) : (u = n, Math.abs(q.left - p.left), v = 0, heightLen = m, widthLen = l * u, widthLen > k ? widthLen = k : n = o);
            $(d[b].childNodes[0]).css("top", p.top + t + "px");
            $(d[b].childNodes[0]).css("left", p.left + r + "px");
            j = p.top - q.top;
            p = p.left -
            q.left;
            $(displayImg).css({
                height: $(".gallery-cell", f).css("height"),
                width: $(".gallery-cell", f).css("width"),
                top: j,
                left: p,
                position: "absolute",
                "z-index": g + 4,
                "-webkit-box-sizing": "border-box"
            });
            displayImg.id = "closeUpImage";
            displayImg.src = d[b].childNodes[0].src;
            var s = document.createElement("div"), j = $(a.layer.parentNode).css("background-color");
            $(s).css({
                width: k,
                height: m,
                position: "absolute",
                "z-index": g + 2,
                "background-color": j
            });
            s.appendChild(displayImg);
            c.appendChild(s);
            $("#tempImg").css("opacity", 0);
            var x = $("<img>").attr({
                src: root + "pro_images/closebox.png",
                id: "imageClose"
            }).css({
                position: "absolute",
                right: "2px",
                top: "2px",
                opacity: 0,
                "z-index": g + 15,
                opacity: 0
            }).bind("click", function(){
                a.verticalScrollEnabled = !0;
                var b = document.getElementById("tempImg");
                b.style.opacity = 1;
                b.id = "";
                $("#closeUpImage,#imageClose").add(s).remove();
                $(f).show()
            }), c = galleryAfterCellEnlarged({
                width: k,
                height: m,
                offsetIndex: b,
                closeBtn: x
            }, a);
            s.appendChild(x[0]);
            $(c.layer).css({
                opacity: 0,
                "z-index": g + 6
            });
            s.appendChild(c.layer);
            var y = window.getComputedStyle($(".ad-scroll-view img", s)[b]).height.replace("px", ""), z = window.getComputedStyle($(".ad-scroll-view img", s)[b]).width.replace("px", ""), g = $(".gallery-cell", f)[b], c = $(g).css("height"), j = $(g).css("width"), c = c.replace("px", ""), j = j.replace("px", ""), g = $("#" + currentPageId).css("height"), p = $("#" + currentPageId).css("width"), g = g.replace("px", ""), p = p.replace("px", ""), j = p / 2 - j / 2, c = g / 2 - c / 2;
            $(displayImg).animate({
                left: j + "px",
                top: c + "px"
            }, 150, function(){
                var b = (k - z) / 2 + a.gPadding, d = (m - y) / 2;
                $(displayImg).animate({
                    left: b,
                    top: d,
                    width: z -
                    a.gPadding *
                    2,
                    height: y
                }, 150, function(){
                    locked = !1;
                    $(".ad-scroll-view", s).css("opacity", 1);
                    $(f).hide();
                    $(x).css({
                        opacity: 0.5,
                        top: d,
                        right: b
                    });
                    window.setTimeout(function(){
                        $(displayImg).remove()
                    }, 100)
                })
            });
            d[b].setAttribute("viewing", "yes")
        }
}

function galleryAfterCellEnlarged(a, b){
    var c = new ADScrollView;
    $(b.layer);
    for (var d = $(".gallery-cell img", b.layer), g = a.width, f = a.height, j = a.offsetIndex, m = g * d.length, k = $("<ul>").addClass("gallery-view").css({
        width: m
    }), l = 0; l < d.length; l++) {
        var n = d[l].getAttribute("src"), o = $("<img>").attr("src", n)[0], o = galleryWHRule(g, f, o.width, o.height), n = $("<li>").addClass("gallery-cell").css({
            width: g,
            height: f,
            "line-height": f + "px",
            margin: "0px",
            "text-align": "auto"
        }).append($("<img>").addClass("galleryImage").attr("src", n).css({
            width: o.width,
            height: o.height,
            "max-width": g,
            "max-height": f,
            "vertical-align": "middle",
            padding: "0px " + b.gPadding + "px"
        }));
        k.append(n)
    }
    c.closeBtn = a.closeBtn;
    c.verticalScrollEnabled = !1;
    c.horizontalScrollEnabled = !0;
    c.showsHorizontalScrollIndicator = !1;
    c.pagingEnabled = !0;
    c.delegate = this;
    c.size = new ADSize(g, f);
    c.contentSize = new ADSize(m, f);
    c.hostingLayer.appendChild(k[0]);
    c.setContentOffset(new ADPoint(g * j, 0));
    return c
}

function loadNewGridGallery(){
}

function loadCustomEventssimpleGallery(){
}

function loadWidgetChildCustomEventssimpleGallery(){
}

galleryViews = [];
orient = !1;
deviceType = window.navigator.appVersion;
areGalleryImagesLoaded = !1;
loaderIntervalCounter = 0;
function simpleGalleryLoadImages(a){
    var b = !0, c = $(a).find("img.gallery-cell");
    $.each(c, function(a, c){
        c.complete || (b = !1)
    });
    loaderIntervalCounter += 1;
    if (b || loaderIntervalCounter >= 20) 
        window.clearInterval(imageLoaderInterval), areGalleryImagesLoaded = !0, $("#galleryOverlay", a).hide(), loaderIntervalCounter = 0
}

function publishWidgetsimpleGallery(a){
    var b = $("#galleryOverlay").length > 0, c;
    c = b ? $("#galleryOverlay") : $(document.createElement("div"));
    $(a).append(c);
    b || (console.warn("Gallery Loader is not present, hence adding!"), c.attr("id", "galleryOverlay"), c.css({
        "background-color": "rgba(26,26,26,0.7)",
        position: "absolute",
        "z-index": "99",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        "background-image": "url('../pro_images/app_loader.gif')",
        "background-position": "50% 50%",
        "background-repeat": "no-repeat",
        display: "none"
    }));
    areGalleryImagesLoaded ? (b = $(a).find("img.gallery-cell"), $.each(b, function(a, b){
        $(b).attr("src", $(b).attr("data-source"))
    }), c.hide()) : (c.show(), imageLoaderInterval = window.setInterval(function(){
        simpleGalleryLoadImages(a)
    }, 850));
    pageSelector = a.parentNode.id == "area" ? "#area" : ".area";
    a.childNodes[0].getAttribute("on_start") == "none" &&
    setTimeout(function(){
        $("[data-scroll='x']", a).each(function(){
            var b = $(".gallery-cell", a), c = parseInt($(".gallery-cell", a).css("width")), f = parseInt($(".gallery-cell", a).css("padding-left")), j = parseInt($(".gallery-cell", a).css("padding-right")), c = c + f + j;
            c *= b.length;
            $(".gallery-inner", this).css("width", c + "px");
            b = $(this);
            if (b.hasClass("ui-scrolllistview")) 
                b.scrolllistview();
            else {
                (c = b.jqmData("scroll") + "") && c.search(/^[xy]p$/);
                f = c && c.search(/^[xy]/) != -1 ? c.charAt(0) : null;
                c = {};
                if (f) 
                    c.direction = f;
                c.pagingEnabled = !0;
                if (f = b.jqmData("scroll-method")) 
                    c.scrollMethod = f;
                b.scrollview(c)
            }
        })
    }, 500);
    a.childNodes[0].getAttribute("on_start") == "grid" &&
    (setTimeout(function(){
        $("[data-scroll='y']", a).each(function(){
            var a = $(this);
            if (a.hasClass("ui-scrolllistview")) 
                a.scrolllistview();
            else {
                var b = a.jqmData("scroll") + "";
                b && b.search(/^[xy]p$/);
                var c = b && b.search(/^[xy]/) != -1 ? b.charAt(0) : null, b = {};
                if (c) 
                    b.direction = c;
                b.pagingEnabled = !0;
                if (c = a.jqmData("scroll-method")) 
                    b.scrollMethod = c;
                a.scrollview(b)
            }
        })
    }, 500), setTimeout(function(){
        $(".gallery-cell", a).bind("click", function(){
            var a = this.parentNode.parentNode.parentNode;
            parseInt($(a).css("width"));
            var b = $(".gallery-cell", this.parentNode), c = document.createElement("div");
            c.className = "gallery-inner";
            $(c).css("left", "0px");
            var j = this.id.substr(this.id.length - 2, this.id.length);
            isNaN(parseInt(j)) && (j = this.id.substr(this.id.length - 1, this.id.length));
            var j = parseInt(j), m, k;
            orient = typeof orientation == "undefined" ? 0 : Math.abs(orientation);
            if (deviceType.match(/iPad|iPhone|iPod/) == null && $("head meta[name=viewport]").attr("content").match(/scale/) == null) {
                var l = parseInt($("#" + currentPageId).children(":first").css("height")), n = parseInt($("#" + currentPageId).children(":first").css("width")), l = window.innerHeight < l ? window.innerHeight : l;
                m = window.innerWidth < n ? window.innerWidth : n;
                k = l
            }
            else 
                m = parseInt(window.innerWidth), k = parseInt(window.innerHeight);
            for (n = 0; n < b.length; n++) 
                l = document.createElement("img"), l.src = $(b[n]).attr("src"), $(l).attr("class", "gallery-cell widgetChildObject"), l.id = "gallery-cell" + n, c.appendChild(l), $(l).load(function(){
                    var a = parseInt($(this).css("width")), b = parseInt($(this).css("height"));
                    a > b ? ($(this).css("padding", "0px"), $(this).css("width", m + "px"), $(this).css("position", "relative"), $(this).css("height", "auto")) : ($(this).css("padding", "0px"), $(this).css("height", k + "px"), $(this).css("position", "relative"), $(this).css("width", "auto"));
                    b = parseInt($(this).css("width"));
                    a = parseInt($(this).css("height"));
                    if (b < m) {
                        var c = m - b;
                        c /= 2;
                        $(this).css("padding-left", Math.round(c) + "px");
                        $(this).css("padding-right", c + "px")
                    }
                    b > m &&
                    ($(this).css("padding", "0px"), $(this).css("width", m + "px"), $(this).css("position", "relative"), $(this).css("height", "auto"), a = parseInt($(this).css("height")), parseInt($(this).css("width")), a < k && (b = k - a, b /= 2, $(this).css("padding-top", b + "px"), $(this).css("padding-bottom", b + "px")));
                    a < k && (b = k - a, b /= 2, $(this).css("padding-top", b + "px"), $(this).css("padding-bottom", b + "px"));
                    a > k && ($(this).css("padding", "0px"), $(this).css("height", k + "px"), $(this).css("position", "relative"), $(this).css("width", "auto"), parseInt($(this).css("height")), b = parseInt($(this).css("width")), b < m && (c = m - b, c /= 2, $(this).css("padding-left", Math.round(c) + "px"), $(this).css("padding-right", c + "px")))
                });
            n = $(pageSelector, "#" + currentPageId);
            l = parseInt($(n).css("height"));
            parseInt($(n).css("width"));
            $(n).offset();
            $(this).offset();
            b = document.createElement("div");
            b.id = "galleryClose";
            b.setAttribute("widId", a.id);
            $(b).css("width", "100%");
            $(b).css("height", "100%");
            $(b).css("background-color", "black");
            b.setAttribute("data-scroll", "x");
            b.setAttribute("firsttime", !0);
            $(b).append(c);
            c = $("<img>").attr({
                src: root + "pro_images/closebox.png",
                id: "imageClose"
            }).css({
                position: "absolute",
                right: "2px",
                top: "2px",
                "z-index": getTopZindex(currentPageId) + 1,
                opacity: 0
            }).bind("click", function(){
                var a = parseInt($(this.parentNode).css("height"));
                $("#galleryClose").animate({
                    top: a + "px"
                }, 600, function(){
                    $("#galleryClose").remove()
                });
                $(this).animate({
                    top: a + "px"
                }, 600, function(){
                    $(this).remove()
                })
            });
            a = this.parentNode.parentNode.parentNode;
            $(b).css("top", l + "px");
            $("#galleryClose", n).remove();
            $("#imageClose", n).remove();
            document.createElement("div");
            $(pageSelector, "#" + currentPageId).append(b);
            a = getTopZindex(currentPageId);
            $(b).css("z-index", a);
            $(pageSelector, "#" + currentPageId).append(c);
            $("[data-scroll='x']", n).each(function(){
                var a = $(".gallery-cell", this), a = parseInt($(this.parentNode).css("width")) * a.length;
                $(".gallery-inner", this).css("width", a + "px");
                $(".gallery-inner", this).css("height", "100%");
                a = $(this);
                if (a.hasClass("ui-scrolllistview")) 
                    a.scrolllistview();
                else {
                    var b = a.jqmData("scroll") + "";
                    b && b.search(/^[xy]p$/);
                    var b = {
                        direction: "x",
                        pagingEnabled: !0
                    }, c = a.jqmData("scroll-method");
                    if (c) 
                        b.scrollMethod = c;
                    a.scrollview(b)
                }
            });
            a = parseInt($(pageSelector, "#" + currentPageId).css("width"));
            a *= j;
            $(".gallery-inner", b).css("left", "-" + a + "px");
            $(b).animate({
                top: "0px"
            }, 600, function(){
                $("#imageClose").animate({
                    opacity: 0.5
                }, 800, function(){
                })
            })
        })
    }, 1500), setTimeout(function(){
        $(".ui-scrollbar-y", a).css("display", "none ! important")
    }, 2E3));
    galleryViews.push(a.childNodes[0]);
    $("#widgetOverlay", a).remove()
}

function reloadGalleryDetail(){
    var a = $("img", "#galleryClose"), b, c;
    orient = typeof orientation == "undefined" ? 0 : Math.abs(orientation);
    if (deviceType.match(/iPad|iPhone|iPod/) == null) {
        b = parseInt($("#" + currentPageId).children(":first").css("height"));
        c = parseInt($("#" + currentPageId).children(":first").css("width"));
        b = window.innerHeight < b ? window.innerHeight : b;
        var d = window.innerWidth < c ? window.innerWidth : c;
        $("head meta[name=viewport]").attr("content").match(/\d{1,}/)[0] < 323 || orient != 90 ? c = d : (c = b, b = d - 100)
    }
    else 
        b = window.innerHeight, c = window.innerWidth;
    deviceType.match("iPhone") != null && orientation == 0 && (b += 100);
    $("#galleryClose").height(b);
    $("#galleryClose").width(c);
    for (d = 0; d < a.length; d++) {
        var g = parseInt($(a[d]).css("width")), f = parseInt($(a[d]).css("height"));
        g > f ? ($(a[d]).css("padding", "0px"), $(a[d]).css("width", c + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("height", "auto")) : ($(a[d]).css("padding", "0px"), $(a[d]).css("height", b + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("width", "auto"));
        f = parseInt($(a[d]).css("width"));
        g = parseInt($(a[d]).css("height"));
        if (f < c) {
            var j = c - f;
            j /= 2;
            $(a[d]).css("padding-left", Math.round(j) + "px");
            $(a[d]).css("padding-right", j + "px")
        }
        f > c && ($(a[d]).css("padding", "0px"), $(a[d]).css("width", c + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("height", "auto"), g = parseInt($(a[d]).css("height")), parseInt($(a[d]).css("width")), g < b && (f = b - g, f /= 2, $(a[d]).css("padding-top", f + "px"), $(a[d]).css("padding-bottom", f + "px")));
        g < b &&
        (f = b - g, f /= 2, $(a[d]).css("padding-top", f + "px"), $(a[d]).css("padding-bottom", f + "px"));
        g > b && ($(a[d]).css("padding", "0px"), $(a[d]).css("height", b + "px"), $(a[d]).css("position", "relative"), $(a[d]).css("width", "auto"), parseInt($(a[d]).css("height")), f = parseInt($(a[d]).css("width")), f < c && (j = c - f, j /= 2, $(a[d]).css("padding-left", Math.round(j) + "px"), $(a[d]).css("padding-right", j + "px")))
    }
    scrollTo(0, 0)
}

function initializeWidgetsimpleGallery(a){
    var b = $("[data-scroll='x']", a);
    b.length == 0 && (b = $("[data-scroll='y']", a));
    galleryViews.push(b[0])
}

function initializeWidgetgridGallery(a){
    a.getAttribute("data-content");
    var b = a.getElementsByClassName("grid-cell");
    loadNewGridGallery(a, !1, b.length)
}

function galleryWHRule(a, b, c, d){
    w = parseInt(a);
    h = parseInt(b);
    a = {
        "max-width": "",
        "max-height": "",
        "margin-left": "",
        "margin-top": ""
    };
    b = c / d;
    w <= h ? d >= h && b < 1 ? (a.width = "auto", a.height = h, a["max-width"] = w) : (a.width = "100%", a.height = "auto") : c >= w && b > 1 ? (a.width = w, a.height = "auto", a["max-height"] = h) : (a.width = "auto", a.height = "100%");
    return a
}

function loadNewGallery(){
}

function enlargeGridCell(a, b){
    if (locked) 
        setTimeout("locked=false;", 3E3);
    else 
        if (locked = !0, currentPageId = a.layer.parentNode.parentNode.parentNode.id, $("#previewWindow").css("display") != "none") {
            displayImg = document.createElement("img");
            displayImg.className = "viewing";
            var c = document.getElementById("previewCanvas");
            c == void 0 && (c = document.getElementById(currentPageId));
            for (var d = a.idName, g = document.getElementById(currentPageId).getElementsByClassName("drsElement"), f, j = 0; j < g.length; j++) 
                if (g[j].getAttribute("data-content").toLowerCase().indexOf("gallery") >= 0 &&
                (g[j].childNodes[0].getAttribute("idName") == d || g[j].childNodes[0].getAttribute("idName") == d + "x")) 
                    f = g[j];
            var d = $(".gallery-cell", f), m = $("#" + currentPageId).height(), k = $("#" + currentPageId).width();
            $("#" + currentPageId).css("top");
            $("#" + currentPageId).css("left");
            $("#" + currentPageId).css("position");
            var b = b == "0x" ? 0 : parseInt(b), g = $("<img>").attr("src", $(".gallery-cell img", f)[b].src), j = g.height, l = g.width, n = k / l, o = m / j, g = getTopZindex(currentPageId);
            $(d[b]).css("z-index", 2E4);
            var p = $(d[b]).offset(), q = $("#" +
            currentPageId).offset(), r = q.left + k / 2 - (p.left + l / 2), t = q.top + m / 2 - (p.top + j / 2);
            d[b].childNodes[0].id = "tempImg";
            var v;
            v = Math.abs(t - (j * n - j) / 2);
            var u, k = parseInt(k), m = parseInt(m), j = parseInt(j), l = parseInt(l);
            k < m ? (u = n, v = t + Math.abs(q.top - p.top) - (j * n - j) / 2, heightLen = j * u, heightLen > m ? (heightLen = m, v = 0) : o = n, widthLen = k) : (u = n, Math.abs(q.left - p.left), v = 0, heightLen = m, widthLen = l * u, widthLen > k ? widthLen = k : n = o);
            $(d[b].childNodes[0]).css("top", p.top + t + "px");
            $(d[b].childNodes[0]).css("left", p.left + r + "px");
            j = p.top - q.top;
            p = p.left -
            q.left;
            $(displayImg).css({
                height: $(".gallery-cell", f).css("height"),
                width: $(".gallery-cell", f).css("width"),
                top: j,
                left: p,
                position: "absolute",
                "z-index": g + 4,
                "-webkit-box-sizing": "border-box"
            });
            displayImg.id = "closeUpImage";
            displayImg.src = d[b].childNodes[0].src;
            var s = document.createElement("div"), j = $(a.layer.parentNode).css("background-color");
            $(s).css({
                width: k,
                height: m,
                position: "absolute",
                "z-index": g + 2,
                "background-color": j
            });
            s.appendChild(displayImg);
            c.appendChild(s);
            $("#tempImg").css("opacity", 0);
            var x = $("<img>").attr({
                src: root + "pro_images/closebox.png",
                id: "imageClose"
            }).css({
                position: "absolute",
                right: "2px",
                top: "2px",
                opacity: 0,
                "z-index": g + 15,
                opacity: 0
            }).bind("click", function(){
                a.verticalScrollEnabled = !0;
                var b = document.getElementById("tempImg");
                b.style.opacity = 1;
                b.id = "";
                $("#closeUpImage,#imageClose").add(s).remove();
                $(f).show()
            }), c = galleryAfterCellEnlarged({
                width: k,
                height: m,
                offsetIndex: b,
                closeBtn: x
            }, a);
            s.appendChild(x[0]);
            $(c.layer).css({
                opacity: 0,
                "z-index": g + 6
            });
            s.appendChild(c.layer);
            var y = window.getComputedStyle($(".ad-scroll-view img", s)[b]).height.replace("px", ""), z = window.getComputedStyle($(".ad-scroll-view img", s)[b]).width.replace("px", ""), g = $(".gallery-cell", f)[b], c = $(g).css("height"), j = $(g).css("width"), c = c.replace("px", ""), j = j.replace("px", ""), g = $("#" + currentPageId).css("height"), p = $("#" + currentPageId).css("width"), g = g.replace("px", ""), p = p.replace("px", ""), j = p / 2 - j / 2, c = g / 2 - c / 2;
            $(displayImg).animate({
                left: j + "px",
                top: c + "px"
            }, 150, function(){
                var b = (k - z) / 2 + a.gPadding, c = (m - y) / 2;
                $(displayImg).animate({
                    left: b,
                    top: c,
                    width: z -
                    a.gPadding *
                    2,
                    height: y
                }, 150, function(){
                    locked = !1;
                    $(".ad-scroll-view", s).css("opacity", 1);
                    $(f).hide();
                    $(x).css({
                        opacity: 0.5,
                        top: c,
                        right: b
                    });
                    window.setTimeout(function(){
                        $(displayImg).remove()
                    }, 100)
                })
            });
            d[b].setAttribute("viewing", "yes")
        }
}

function galleryAfterCellEnlarged(a, b){
    var c = new ADScrollView;
    $(b.layer);
    for (var d = $(".gallery-cell img", b.layer), g = a.width, f = a.height, j = a.offsetIndex, m = g * d.length, k = $("<ul>").addClass("gallery-view").css({
        width: m
    }), l = 0; l < d.length; l++) {
        var n = d[l].getAttribute("src"), o = $("<img>").attr("src", n)[0], o = galleryWHRule(g, f, o.width, o.height), n = $("<li>").addClass("gallery-cell").css({
            width: g,
            height: f,
            "line-height": f + "px",
            margin: "0px",
            "text-align": "auto"
        }).append($("<img>").addClass("galleryImage").attr("src", n).css({
            width: o.width,
            height: o.height,
            "max-width": g,
            "max-height": f,
            "vertical-align": "middle",
            padding: "0px " + b.gPadding + "px"
        }));
        k.append(n)
    }
    c.closeBtn = a.closeBtn;
    c.verticalScrollEnabled = !1;
    c.horizontalScrollEnabled = !0;
    c.showsHorizontalScrollIndicator = !1;
    c.pagingEnabled = !0;
    c.delegate = this;
    c.size = new ADSize(g, f);
    c.contentSize = new ADSize(m, f);
    c.hostingLayer.appendChild(k[0]);
    c.setContentOffset(new ADPoint(g * j, 0));
    return c
}

function loadNewGridGallery(){
}

function loadCustomEventssimpleGallery(){
}

function loadWidgetChildCustomEventssimpleGallery(){
}

galleryViews = [];
function publishWidgetsimpleGalleryRSS(a){
    var b = a.getElementsByClassName("gallery-cell");
    loadNewGalleryRSS(a, !1, b.length);
    $("#widgetOverlay", a).remove()
}

function initializeWidgetsimpleGalleryRSS(a){
    var b = a.getElementsByClassName("gallery-cell");
    loadNewGalleryRSS(a, !1, b.length)
}

function initializeWidgetgridGalleryRSS(a){
    a.getAttribute("data-content");
    var b = a.getElementsByClassName("grid-cell");
    loadNewGridGallery(a, !1, b.length)
}

function loadNewGalleryRSS(a, b, c){
    var d = new ADScrollView;
    d.idName = $(a.childNodes[0]).attr("idName");
    d.parentId = a.parentNode.id;
    var g = $(".ad-scroll-view", a), f = $(".gallery-view", a), j = void 0, m = "", k = f.attr("on_start"), l = b && k != "grid" ? $(cellArray[0]).css("width").replace("px", "") : $(".ad-scroll-view", a).width(), n = $(".ad-scroll-view", a).height(), o = l * c, p = d.serial = f.attr("serial");
    d.widgetWidth = l;
    d.widgetHeight = n;
    d.scrollWidth = o;
    d.gPadding = parseInt(f.attr("gPadding"));
    d.gMargin = parseInt(f.attr("gMargin"));
    d.cPadding = parseInt(f.attr("cPadding"));
    d.cMargin = parseInt(f.attr("cMargin"));
    d.cellWidth = parseInt(f.attr("cell-width"));
    d.cellHeight = parseInt(f.attr("cell-height"));
    o = d.cellHeight + d.cMargin * 2;
    o *= Math.ceil(c / Math.floor(l / (d.cellWidth + d.cMargin * 2)));
    d.scrollHeight = o;
    if (b) {
        n = f.attr("mode");
        n == "rss" && (j = f.attr("feedurl"), m = f.attr("newfeedurl"));
        o = l * c;
        f = $("<ul>").addClass("gallery-view").css({
            width: o
        }).attr({
            gMargin: d.gMargin,
            gPadding: d.gPadding,
            cMargin: d.cMargin,
            cPadding: d.cPadding,
            "cell-width": d.cellWidth,
            "cell-height": d.cellHeight,
            cellnum: c,
            serial: p,
            "active-cell": 0,
            mode: n,
            feedurl: j,
            on_start: k
        });
        for (j = 0; j < c; j++) 
            f.append(cellArray[j])
    }
    else 
        $(".galleryImageBorder", f).removeClass("galleryImageBorder");
    d.hostingLayer.appendChild(f.clone()[0]);
    f.attr("mode") == "rss" &&
    ((feed = m) || (feed = f.attr("feedurl")), f.removeAttr("newfeedurl"), loadRSSFeeds(feed, function(a){
        if (a) {
            $(".gallery-view", d.hostingLayer).attr("feedURL", feed);
            var c = $('[nodeName="media:content"]', a);
            $("img", d.hostingLayer).each(function(b, d){
                if (b <
                c.length) {
                    var g = $('[nodeName="media:content"]', a)[b].getAttribute("url");
                    d.setAttribute("src", g);
                    d.setAttribute("isempty", !1);
                    $(d).parents(".gallery-cell").attr("data-src", g)
                }
                else 
                    d.setAttribute("src", ""), d.setAttribute("isempty", !0), $(d).parents(".gallery-cell").attr("data-src", "empty")
            });
            b && (processingScreen_Show(0), $("#property_galleryView1").val(feed));
            isBuilder && processingScreen_Show(0)
        }
    }));
    k == "grid" ? (toGrid(d), imgWidth = $("li", d.layer).css("width").replace("px", ""), mleft = $("li", d.layer).css("margin-left").replace("px", ""), mright = $("li", d.layer).css("margin-right").replace("px", ""), imgWidth = parseInt(imgWidth) + parseInt(mleft) + parseInt(mright), imgHeight = $("li", d.layer).css("height").replace("px", ""), mtop = $("li", d.layer).css("margin-top").replace("px", ""), mbottom = $("li", d.layer).css("margin-bottom").replace("px", ""), imgHeight = parseInt(imgHeight) + parseInt(mtop) + parseInt(mbottom), widWidth = $(a.childNodes[0]).css("width").replace("px", ""), widHeight = $(a.childNodes[0]).css("height").replace("px", ""), perRow = parseInt(Math.abs(widWidth /
    imgWidth)), lis = $("li", d.layer).length, numrows = Math.ceil(lis / perRow), contentHeight = numrows * imgHeight, d.contentSize = new ADSize(widWidth, contentHeight)) : toGallery(d);
    d.hostingLayer.style.webkitTransitionDuration = ".5s";
    d.delegate = this;
    d.parentId == "canvas" && replaceOldWidget(d, "galleryViews");
    g.replaceWith(d.layer)
}

this.scrollViewWillBeginDragging = function(a){
    switch (a.layer.parentNode.parentNode.getAttribute("data-content")) {
        case "simpleGallery":
        case "simpleGalleryRSS":
            typeof GoogleAnalytics != "undefined" && GoogleAnalytics.trackGalleryTouched(a.layer.parentNode.parentNode.id)
    }
    a.closeBtn && a.closeBtn.hide()
};
this.scrollViewDidEndDragging = function(){
};
this.scrollViewDidEndScrollingAnimation = function(a){
    this.scrollViewDidEndDecelerating(a)
};
this.scrollViewDidEndDecelerating = function(a){
    if (a.closeBtn) {
        var b = a.closeBtn;
        window.setTimeout(function(){
            var c = a.getContentOffset(), c = Math.floor(c.x / a.size.width), c = $(".galleryImage", a.hostingLayer)[c], d = $("#previewCanvas");
            d.length == 0 && (d = $(".area", ".current"));
            var g = d.height(), f = d.width();
            if (d.length == 0) 
                d = a.layer.parentNode.parentNode, g = parseInt(d.style.height.replace("px", "")), f = parseInt(d.style.width.replace("px", ""));
            b.css({
                top: (g - c.height) / 2 + 2 + "px",
                right: (f - c.width) / 2 + "px"
            });
            b.fadeIn(200)
        }, 100)
    }
};
function loadNewGridGallery(a, b, c){
    var d = new ADScrollView;
    d.idName = $(a.childNodes[0]).attr("idName");
    d.parentId = a.parentNode.id;
    var b = $(".ad-scroll-view", a), g = b.find(".grid-container"), f = $(".grid-cell", a), j = g.attr("mode"), m = parseInt(g.attr("margin")), k = parseInt(b.css("width").replace("px", "")), l = parseInt(b.css("height").replace("px", "")), n = parseInt(f.css("width").replace("px", "")), o = parseInt(f.css("height").replace("px", "")), f = root + "pro_images/emptyImage.png", p = Math.ceil(c / Math.floor(k / (n + m * 2))) *
    (o + m * 2), q = k * c, r = $("<ul>").addClass("grid").css({}).attr("view-type", "cell");
    d.gridCellCSS = {
        width: n + "px",
        height: o + "px",
        margin: m + "px"
    };
    d.fullScnCss = {
        width: k,
        height: l,
        margin: "0px"
    };
    d.gridScrollContentSize = new ADSize(k, p);
    d.fullScnScrollContentSize = new ADSize(q, l);
    cellArray = [];
    n = a.getElementsByClassName("gridImage");
    for (a = 0; a < c; a++) 
        o = a + 1, cellArray[a] = $("<li>").addClass("ui-state-default").addClass("grid-cell").attr({
            id: d.idName + "cell" + a,
            "data-name": "galleryImage-" + o,
            "data-pageid": "",
            "data-pageurl": "",
            "data-exlink": "",
            "data-transition": "",
            "data-content": "widgetChild",
            "data-src": f
        }).css(d.gridCellCSS).append($("<img>").addClass("gridImage").attr("src", a < n.length ? n[a].src : f).bind("mousedown", function(a){
            var b, a = a.target.parentElement.getAttribute("id").replace(RegExp(/gridGallery\d*cell/), "");
            console.log("cell index : " + a);
            r.attr("view-type") == "cell" ? (b = d.fullScnCss, r.css("width", q + "px"), r.attr("view-type", "full-scn"), r.attr("prev-offset-y", d.getContentOffset().y), d.verticalScrollEnabled = !1, d.horizontalScrollEnabled = !0, d.showsHorizontalScrollIndicator = !1, d.pagingEnabled = !0, d.contentSize = d.fullScnScrollContentSize, d.setContentOffset(new ADPoint(k * a, 0))) : (b = d.gridCellCSS, r.attr("view-type", "cell"), r.css("width", k + "px"), d.horizontalScrollEnabled = !1, d.verticalScrollEnabled = !0, d.showsVerticalScrollIndicator = !1, d.pagingEnabled = !1, d.contentSize = d.gridScrollContentSize, d.setContentOffset(new ADPoint(0, r.attr("prev-offset-y"))));
            $(".grid-cell", r).each(function(a, c){
                $(c).css(b)
            })
        }));
    m = $("<div>").addClass("grid-container").css({
        width: k,
        height: l,
        "-webkit-transform": "rotate(0deg)"
    }).attr({
        margin: m,
        cellnum: c,
        "active-cell": 0,
        mode: j
    }).append(r);
    for (a = 0; a < c; a++) 
        r.append(cellArray[a]);
    if (j == "rss") {
        var t = g.attr("feedURL", t);
        m.attr("feedurl", t);
        fetchRSSFeeds(t, function(a){
            var b = $('[nodeName="media:content"]', a);
            $(".gridImage", r).each(function(a, c){
                if (a < b.length) {
                    var d = b[a].getAttribute("url");
                    console.log("prev img  >>>" + c.getAttribute("src"));
                    console.log("coming in <<<" + d);
                    c.setAttribute("src", d);
                    c.parentElement.setAttribute("data-src", d)
                }
            })
        })
    }
    d.horizontalScrollEnabled = !1;
    d.verticalScrollEnabled = !0;
    d.showsVerticalScrollIndicator = !1;
    d.size = new ADSize(k, l);
    d.contentSize = d.gridScrollContentSize;
    d.hostingLayer.appendChild(m[0]);
    d.hostingLayer.style.webkitTransitionDuration = ".5s";
    d.delegate = this;
    d.parentId == "canvas" && replaceOldWidget(d, "gridGalleryViews");
    b.replaceWith(d.layer)
}

function loadCustomEventssimpleGalleryRSS(){
}

function loadWidgetChildCustomEventssimpleGalleryRSS(){
}

function toGallery(a){
    a.setAttribute("data-scroll", "x");
    a.setAttribute("on_start", "none");
    var b = $(".gallery-inner", a), c = $(".gallery-cell", a), d = parseInt($(activeObject).css("width")) * c.length;
    $(b).css("width", d + "px");
    for (b = 0; b < c.length; b++) {
        var g = parseInt($(activeObject).css("height")), d = parseInt($(activeObject).css("width"));
        console.log("activeObjectH", g);
        console.log("activeObjectW", d);
        var f = parseInt($(c[b]).css("height")), j = parseInt($(c[b]).css("width"));
        f >= j ? ($(c[b]).css("padding", "0px"), $(c[b]).css("height", g + "px"), $(c[b]).css("position", "relative"), $(c[b]).css("width", "auto")) : ($(c[b]).css("padding", "0px"), $(c[b]).css("width", d + "px"), $(c[b]).css("position", "relative"), $(c[b]).css("height", "auto"));
        g = parseInt($(c[b]).css("width"));
        g < d && (d -= g, d /= 2, $(c[b]).css("padding-left", d + "px"), $(c[b]).css("padding-right", d + "px"))
    }
    $("[data-scroll='x']", a).each(function(){
        var b = $(".gallery-cell", a), c = parseInt($(".gallery-cell", a).css("width")), d = parseInt($(".gallery-cell", a).css("padding-left")), g = parseInt($(".gallery-cell", a).css("padding-right")), c = c + d + g;
        c *= b.length;
        $(".gallery-inner", this).css("width", c + "px");
        console.log("this width", $(this).css("width"));
        b = $(this);
        if (b.hasClass("ui-scrolllistview")) 
            b.scrolllistview();
        else {
            (c = b.jqmData("scroll") + "") && c.search(/^[xy]p$/);
            d = c && c.search(/^[xy]/) != -1 ? c.charAt(0) : null;
            c = {};
            if (d) 
                c.direction = d;
            c.pagingEnabled = !0;
            if (d = b.jqmData("scroll-method")) 
                c.scrollMethod = d;
            b.scrollview(c)
        }
    })
}

function toGrid(a){
    var b = parseInt(a.getAttribute("gridW")), c = parseInt(a.getAttribute("gridH"));
    $(".gallery-cell", a).css("width", b + "px");
    $(".gallery-cell", a).css("height", c + "px");
    $(".gallery-cell", a).css("padding", "0px");
    $(".gallery-cell", a).css("margin", "2px");
    $(".gallery-inner", a).css("width", $(activeObject).css("width"));
    $(".gallery-inner", a).css("height", "auto");
    $(".gallery-inner", a).css("left", "0px");
    a.setAttribute("data-scroll", "y");
    $("[data-scroll='y']", a).each(function(){
        var a = $(".gallery-cell", widgetObject), b = parseInt($(".gallery-cell", widgetObject).css("width")), c = parseInt($(".gallery-cell", widgetObject).css("padding-left")), j = parseInt($(".gallery-cell", widgetObject).css("padding-right")), b = b + c + j;
        b *= a.length;
        $(".gallery-inner", this).css("width", b + "px");
        console.log("this width", $(this).css("width"));
        a = $(this);
        if (a.hasClass("ui-scrolllistview")) 
            a.scrolllistview();
        else {
            (b = a.jqmData("scroll") + "") && b.search(/^[xy]p$/);
            c = b && b.search(/^[xy]/) != -1 ? b.charAt(0) : null;
            b = {};
            if (c) 
                b.direction = c;
            b.pagingEnabled = !0;
            if (c = a.jqmData("scroll-method")) 
                b.scrollMethod = c;
            a.scrollview(b)
        }
    })
}

function gridWHRule(a, b, c, d){
    w = parseInt(a);
    h = parseInt(b);
    c >= d ? (a = h * (c / d), a > w ? c = {
        width: "auto",
        height: "100%",
        "max-width": a,
        "max-height": h,
        "margin-left": 0 - (a - w) / 2,
        "margin-top": ""
    } : (a = w / (c / d), c = {
        width: "100%",
        height: "auto",
        "max-width": w,
        "max-height": a,
        "margin-left": "",
        "margin-top": 0 - (a - h) / 2
    })) : (a = w / (c / d), a > h ? c = {
        width: "100%",
        height: "auto",
        "max-width": w,
        "max-height": a,
        "margin-top": 0 - (a - h) / 2,
        "margin-left": ""
    } : (a = h * (c / d), c = {
        width: "auto",
        height: "100%",
        "max-width": a,
        "max-height": h,
        "margin-top": "",
        "margin-left": 0 -
        (a - w) / 2
    }));
    return c
}

function galleryWHRule(a, b, c, d){
    w = parseInt(a);
    h = parseInt(b);
    a = {
        "max-width": "",
        "max-height": "",
        "margin-left": "",
        "margin-top": ""
    };
    b = c / d;
    w <= h ? d >= h && b < 1 ? (a.width = "auto", a.height = h, a["max-width"] = w) : (a.width = "100%", a.height = "auto") : c >= w && b > 1 ? (a.width = w, a.height = "auto", a["max-height"] = h) : (a.width = "auto", a.height = "100%");
    return a
}

var geoCoder;
function publishWidgetmap(a){
    var b = setInterval(function(){
        if (googleJSLoaded == !0) 
            mapElemId = a.id, $(a).css("overflow", "hidden"), loadMarkers(a, !0), clearInterval(b)
    }, 100)
}

function initializeWidgetmap(){
}

function showResults(a){
    if (a) 
        if (markers = Array(a.length), markers.length > 0) 
            for (; 0 < markers.length;) {
                $("#map_marker_latlng").val(a[0].geometry.location.lat() + "," + a[0].geometry.location.lng());
                break
            }
        else 
            $("#map_marker_latlng").val("No location found");
    else 
        alertBox_show("Error", "Geocoder was not able to find a valid location for the address string. Location not added.");
    isCanvas && processingScreen_Show(0)
}

function getGeoCode(){
    isCanvas && processingScreen_Show("infinite");
    geoCoder || (geoCoder = new google.maps.Geocoder);
    $("#map_marker_latlng").val("Loading...");
    geoCoder.geocode({
        address: $("#map_marker_address").val() + "," + $("#map_marker_country").val()
    }, showResults)
}

function loadMarkers(a, b){
    var c = [];
    $(a).children(":first-child").children(".mapMarkers").children().each(function(){
        var a = document.createElement("item"), b = document.createElement("title");
        b.innerText = $(this).html();
        a.appendChild(b);
        b = document.createElement("description");
        b.innerHTML = ($(this).attr("marker-address") ? $(this).attr("marker-address") + ", " : "") + $(this).attr("marker-country");
        a.appendChild(b);
        b = document.createElement("georss:point");
        b.innerText = $(this).attr("marker-latitude") + " " + $(this).attr("marker-longitude");
        a.appendChild(b);
        b = document.createElement("id");
        b.innerText = $(this).attr("id");
        a.appendChild(b);
        c.push(a)
    });
    getMapsFeed(a.id, c, b)
}

function loadCustomEventsmap(){
}

function initializeWidgetmap(){
}

function loadWidgetChildCustomEventsmap(){
}

getMapsFeed = function(a, b){
    function c(a){
        google.maps.OverlayView.call(this);
        this.latlng_ = a.latlng;
        this.map_ = a.map;
        this.offsetVertical_ = -92;
        this.offsetHorizontal_ = -111;
        this.height_ = 52;
        this.width_ = 223;
        this.title = a.title;
        this.description = a.description;
        this.domId = a.domId;
        var b = this;
        this.boundsChangedListener_ = google.maps.event.addListener(this.map_, "bounds_changed", function(){
            return b.panMap.apply(b)
        });
        this.setMap(this.map_)
    }
    c.prototype = new google.maps.OverlayView;
    c.prototype.remove = function(){
        if (this.div_) 
            this.div_.parentNode.removeChild(this.div_), this.div_ = null
    };
    c.prototype.draw = function(){
        this.createElement();
        if (this.div_) {
            var a = this.getProjection().fromLatLngToDivPixel(this.latlng_);
            if (a) 
                this.div_.style.width = this.width_ + "px", this.div_.style.left = a.x + this.offsetHorizontal_ + "px", this.div_.style.height = this.height_ + "px", this.div_.style.top = a.y + this.offsetVertical_ + "px", this.div_.style.display = "block"
        }
    };
    c.prototype.createElement = function(){
        var a = this.getPanes(), b = this.div_, c = this.domId;
        if (b) 
            b.parentNode != a.floatPane &&
            (b.parentNode.removeChild(b), a.floatPane.appendChild(b));
        else {
            b = this.div_ = document.createElement("div");
            $(b).attr("class", "mapOverlay");
            var d = document.createElement("div");
            $(d).attr("class", "mapOverlayTop");
            b.appendChild(d);
            d = document.createElement("div");
            $(d).attr("class", "mapOverlayMiddle");
            if (AnimationManager.hasAnimation(c, "tapChild")) {
                var f = document.createElement("img");
                f.src = root + "pro_images/map/button.png";
                d.appendChild(f)
            }
            f = document.createElement("h1");
            $(f).html(this.title);
            d.appendChild(f);
            f = document.createElement("h2");
            $(f).html(this.description);
            d.appendChild(f);
            b.appendChild(d);
            d = document.createElement("div");
            $(d).css("height", "29px").css("background", "url(" + root + "pro_images/map/bottom.png)");
            b.appendChild(d);
            google.maps.event.addDomListener(b, "click", function(a){
                AnimationManager.hasAnimation(c, "tapChild") ? startAnimationList(AnimationManager.getAnimationList(c, "tapChild")) : console.log(c + " has got nothing on it!");
                a.preventDefault()
            });
            b.style.display = "none";
            a.floatPane.appendChild(b);
            this.panMap()
        }
    };
    c.prototype.panMap = function(){
        var a = this.map_, b = a.getBounds();
        if (b) {
            var c = this.latlng_, d = this.width_, f = this.height_, g = this.offsetHorizontal_, j = this.offsetVertical_, k = a.getDiv(), l = k.offsetWidth, k = k.offsetHeight, m = b.toSpan(), n = m.lng(), o = m.lat(), m = n / l;
            o /= k;
            var k = b.getSouthWest().lng(), n = b.getNorthEast().lng(), l = b.getNorthEast().lat(), b = b.getSouthWest().lat(), p = c.lng() + (g - 40) * m, g = c.lng() + (g + d + 40) * m, d = c.lat() - (j - 40) * o, c = c.lat() - (j + f + 40) * o, f = (p < k ? k - p : 0) + (g > n ? n - g : 0), c = (d > l ? l - d : 0) + (c < b ? b - c : 0), j = a.getCenter(), f = j.lng() - f, c = j.lat() - c;
            a.setCenter(new google.maps.LatLng(c, f));
            google.maps.event.removeListener(this.boundsChangedListener_);
            this.boundsChangedListener_ = null
        }
    };
    markerArray = [];
    var d, g, f, j;
    g = document.getElementById("previewCanvas");
    g == null && (document.getElementById(a), g = document.getElementById(currentPageId));
    g = g.getElementsByClassName("drsElement");
    for (f = 0; f < g.length; f++) 
        if (g[f].id == a || g[f].id == a + "x") {
            d = g[f];
            a = g[f].id;
            break
        }
    g = parseInt($(d).children(":first-child").attr("map-mode"));
    f = parseInt($(d).children(":first-child").attr("map-level"));
    j = $(d).children(":first-child").attr("map-center");
    $contentWrapper = $(d).children(":first-child");
    var m = parseInt($contentWrapper.css("width")) - parseInt($contentWrapper.css("border-left-width")) - parseInt($contentWrapper.css("border-right-width")), k = parseInt($contentWrapper.css("height")) - parseInt($contentWrapper.css("border-top-width")) - parseInt($contentWrapper.css("border-bottom-width"));
    document.getElementById("previewCanvas") != null &&
    (m += parseInt($contentWrapper.css("border-left-width")) + parseInt($contentWrapper.css("border-right-width")), k += parseInt($contentWrapper.css("border-top-width")) + parseInt($contentWrapper.css("border-bottom-width")));
    $contentWrapper.children().css("width", m + "px");
    $contentWrapper.children().css("height", k + "px");
    k = document.createElement("div");
    k.className = "mapImage";
    $(k).css("height", $contentWrapper.css("height"));
    $(k).css("width", $contentWrapper.css("width"));
    $(k).css("overflow", "hidden !important");
    $(k).css("background", "grey url(" + root + "pro_images/loading.jpg) !important");
    $(d).children(":first-child").children("img").remove();
    $(d).children(":first-child").prepend(k);
    $(d).css("overflow", "hidden");
    var l = {
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: !1,
        streetViewControl: !1,
        zoomControl: !1
    }, m = 0;
    if (g == 0) 
        j == 0 && (j = "1.277398,103.843696"), j = j.split(","), l.zoom = f, l.center = new google.maps.LatLng(j[0], j[1]);
    else {
        j == 0 && (j = "1.277398,103.843696".split(","));
        var n = [];
        $(d).children(":first-child").children(".mapMarkers").children().each(function(){
            n.push(new google.maps.LatLng($(this).attr("marker-latitude"), $(this).attr("marker-longitude")))
        });
        var o = new google.maps.LatLngBounds;
        f = 0;
        for (d = n.length; f < d; f++) 
            o.extend(n[f]), m++;
        n.length == 0 && (o.extend(new google.maps.LatLng(j[0], j[1])), m++)
    }
    d = new google.maps.Map(k, l);
    g == 1 && (m > 1 ? d.fitBounds(o) : d.setZoom(15), d.setCenter(o.getCenter()));
    for (o = 0; o < b.length; o++) {
        var p, q, r, t;
        for (g = 0; g < b[o].childNodes.length; g++) {
            if (b[o].childNodes[g].nodeName == "GEORSS:POINT" && b[o].childNodes[g].childNodes.length > 0) 
                p = b[o].childNodes[g].childNodes[0].nodeValue;
            if ((b[o].childNodes[g].nodeName == "description" ||
            b[o].childNodes[g].nodeName ==
            "DESCRIPTION") &&
            b[o].childNodes[g].childNodes.length > 0) 
                q = b[o].childNodes[g].childNodes[0].nodeValue;
            if ((b[o].childNodes[g].nodeName == "title" || b[o].childNodes[g].nodeName == "TITLE") && b[o].childNodes[g].childNodes.length > 0) 
                r = b[o].childNodes[g].childNodes[0].nodeValue;
            if ((b[o].childNodes[g].nodeName == "id" || b[o].childNodes[g].nodeName == "ID") && b[o].childNodes[g].childNodes.length > 0) 
                t = b[o].childNodes[g].childNodes[0].nodeValue
        }
        if (p != void 0) {
            /[0-9|.|-]+/.exec(p);
            g = p.trim(" ").split(" ");
            var v = root + "pro_images/pin.png";
            g = new google.maps.LatLng(g[0], g[1]);
            v = new google.maps.Marker({
                position: g,
                title: r,
                map: d,
                icon: v,
                draggable: !1,
                clickable: !0
            });
            v.description = q;
            v.domId = t;
            var u = null;
            google.maps.event.addListener(d, "click", function(){
                u != null && (u.setMap(null), u = null)
            });
            google.maps.event.addListener(v, "click", function(){
                var a = this.getMap();
                u != null && (u.setMap(null), u = null);
                u = new c({
                    latlng: this.getPosition(),
                    map: a,
                    title: this.title,
                    description: this.description,
                    domId: this.domId
                })
            })
        }
        markerArray.push(v)
    }
    d.markerArray = markerArray
};
var twitterCount = "horizontal";
function changeCount(){
    twitterCount = $("#countvertical:checked").val() !== void 0 ? "vertical" : $("#counthori:checked").val() !== void 0 ? "horizontal" : "none"
}

function publishWidgettwitter(a){
    var b = a.childNodes[0].childNodes[0].childNodes[0], c = a.childNodes[0].childNodes[1].childNodes[0];
    b.getAttribute("theurl") == "local" && b.setAttribute("data-url", window.location);
    $(b).css("display") !== "none" && b.setAttribute("class", "twitter-share-button");
    $(c).css("display") !== "none" && c.setAttribute("class", "twitter-follow-button");
    $("#widgetOverlay", a).remove();
    $.getScript("http://platform.twitter.com/widgets.js")
}

function initializeWidgettwitter(a){
    $("#followmechild", a).css("display") != "none" ? $(".socialImagesFollow", a).css("display", "block") : $(".socialImagesTweet", a).css("display", "block")
}

function loadCustomEventstwitter(){
}

function loadWidgetChildCustomEventstwitter(){
}

var currentPageId, isCanvas, firstPublish = !0, locked = !1, isBuilder = !1, flowViews = [], widgetDataContents = "simpleGallery,map,formWidget,youtube,fb,twitter".split(","), newWidgetDataContent, rssData, prevPubActiveObjectRSS, prevPubActiveObjectCoverflow;
$(document).ready(function(){
    var a = document.URL;
    a.indexOf("/developer?") > 0 && (isBuilder = !0);
    a.indexOf("/builder?") > 0 && (isBuilder = !0)
});
function publishWidgets(a){
	
    if (a) {
        firstPublish && (firstPublish = !1, loadPublishData());
        currentPageId = a.id;
        for (var a = a.getElementsByClassName("drsElement"), b, c = 0; c < a.length; c++) {
            b = a[c].getAttribute("data-content");
            for (var d = 0; d < widgetDataContents.length; d++) 
                if (b == widgetDataContents[d]) {
                    b = "publishWidget" + b;
                    window[b](a[c]);
                    break
                }
        }
    }
}

function loadPublishData(){
    for (var a, b = 0; b < widgetDataContents.length; b++) 
        a = "loadCustomEvents" + widgetDataContents[b], a = window[a](), a != void 0 && $.each(a, function(a, b){
            eventsStr = eventsStr + " " + b.value;
            AnimationManager.WIDGET_EVENTS[a.toUpperCase()] = b
        })
}

function loadWidgets(){
    $(".socialImagesLike").css("display", "block");
    $(".socialImagesShare").css("display", "block");
    console.log("load widgets");
    for (var a, b = 0; b < widgetDataContent.length; b++) 
        a = "loadWidget" + widgetDataContents[b], window[a]()
}

function initializeWidgets(a, b){
    var c = a.getAttribute("data-content"), d;
    for (d = 0; d < widgetDataContents.length; d++) 
        if (c == widgetDataContents[d]) {
            d = "initializeWidget" + c;
            window["objCount_" + c] = b;
            window[d](a);
            break
        }
}

loadRSSFeeds = function(a, b, c){
    server_url = root + "builder/get_rss";
    var d = {
        url: a
    };
    console.log("rssfeeds URL", a);
    a = jQuery.param(d, !0);
    rssData = null;
    $.ajax({
        type: "GET",
        url: server_url,
        data: a,
        datatype: "xml",
        async: !0,
        success: function(a){
            rssData = a;
            if (activeObject && checkMediaImg(a) == !1) 
                resetFeedsLink(), isCanvas && processingScreen_Show(0);
            else 
                if (typeof b === "string") 
                    window[b](c);
                else 
                    typeof b === "function" && b(a)
        },
        error: function(){
            isBuilder ? alertBox_show("Error", "There was an error in fetching the RSS feed. Please check your internet connection.") : alert("Error: There was an error in fetching the RSS feed. Please check your internet connection.");
            isCanvas && processingScreen_Show(0);
            activeObject && resetFeedsLink()
        }
    })
};
function isWidget(a){
    if (!a) 
        return !1;
    if (a = $(a).data("content") == void 0 ? !1 : $(a).data("content")) 
        for (var b = widgetDataContents.length, c = 0; c < b; c++) {
            if (a == widgetDataContents[c]) 
                return !0
        }
    else 
        return !1
}

function loadWidgetCustomEvents(a){
    if ($(a).attr("data-content")) 
        for (var b = a.getAttribute("data-content"), c = 0; c < widgetDataContents.length; c++) 
            if (b == widgetDataContents[c]) {
                functionName = "loadCustomEvents" + b;
                (a = window[functionName](a)) || (a = {});
                $.each(a, function(a, b){
                    eventsStr = eventsStr + " " + b.value;
                    AnimationManager.WIDGET_EVENTS[a.toUpperCase()] = b
                });
                break
            }
}

function loadWidgetChildCustomEvents(a){
    if ($(a).attr("data-content")) 
        for (var b = a.getAttribute("data-content"), c = 0; c < widgetDataContents.length; c++) 
            if (b == widgetDataContents[c]) {
                functionName = "loadWidgetChildCustomEvents" + b;
                (a = window[functionName](a)) || (a = {});
                $.each(a, function(a, b){
                    eventsStr = eventsStr + " " + b.value;
                    AnimationManager.WIDGET_CHILD_EVENTS[a.toUpperCase()] = b
                });
                break
            }
}

function checkMediaImg(a){
    return activeObject.getAttribute("data-content").match(/simpleGalleryRSS|coverflowRSS|carouselRSS/) ? $('[nodeName="media:content"]', a)[0] ? !0 : (alertBox_show("Alert", "The link does not have images.Try using the RSS News Reader widget with this feed."), !1) : !0
}

function getTopZindex(a){
    for (var a = document.getElementById(a).getElementsByClassName("drsElement"), b, c, d = 0, d = 0; d < a.length; d++) 
        if (a[d].style != void 0 && (c = parseInt(a[d].style.zIndex), b == void 0 || c >= b)) 
            b = c;
    return b
}

function youtubeIdHelper(a){
    var b = /youtu.be\/([^\?]+)/i.exec(a);
    if (b != null) 
        return b[1];
    b = /youtube.com\/watch\?v=([^&]+)/i.exec(a);
    if (b != null) 
        return b[1]
}

function publishWidgetyoutube(a){
    var b = youtubeIdHelper($(a).children(":first-child").attr("data-link"));
    $(a).children(":first-child").children().remove();
    $(a).children(":first-child").prepend('<iframe class="youtubeFrame" width="100%" height="100%" src="http://www.youtube.com/embed/' + b + '?wmode=opaque" frameborder="0" ></iframe>')
}

function loadCustomEventsyoutube(){
}

function loadWidgetChildCustomEventsyoutube(){
}

Function.prototype.Inherits = function(a){
    this.prototype = new a;
    this.prototype.constructor = this;
    this.superClass = a.prototype
};
var pagePreviewMode = !1, INPUTS = [], bDebug = !1, elementsWithFadeOrSlideIn = [], timers = [], canLoop = !0, publishContext = "#area", Animations = {
    Slide: 0,
    ZoomXY: 4,
    SkewXY: 7,
    LoopBack: 9,
    RotateXYZ: 10,
    Fade_In: 12,
    Fade_Out: 13,
    Slide_In: 14,
    Slide_Out: 15,
    Prev_Page: 20,
    Show_Page: 21,
    Ext_Link: 22,
    SMS: 23,
    Call: 24,
    Email: 25,
    Map: 26
}, AnimationProperties = {
    Id: 0,
    Delay: 1,
    Duration: 2,
    Repetitions: 3,
    Opacity: 4,
    Up: 5,
    Down: 6,
    Degree: 7,
    Ratio: 8,
    Pieces: 9,
    Direction: 10,
    Rotation: 11,
    DegreeX: 12,
    DegreeY: 13,
    DegreeZ: 14,
    SlideType: 15,
    Target: 16,
    Number: 17,
    Page: 18,
    Transition: 19,
    URL: 20,
    Text: 21,
    Subject: 22,
    mailto: 23,
    SlideFrom: 24,
    SlideTo: 25,
    PlayType: 26,
    Left: 27,
    Right: 28,
    Context: 29
}, animationProperties = "id,delay,duration,Repetitions,opacity,up,down,degree,ratio,pieces,direction,rotation,degreeX,degreeY,degreeZ,SlideType,target,number,page,transition,URL,text,subject,Mailto,SlideFrom,SlideTo,PlayType,left,right,Context".split(","), animationNumberToName = {
    0: "Slide_By",
    4: "ZoomXY",
    7: "SkewXY",
    9: "Restart_Animations",
    10: "RotateXYZ",
    12: "Fade_In",
    13: "Fade_Out",
    14: "Slide_In",
    15: "Slide_Out",
    20: "Prev_Page",
    21: "Show_Page",
    22: "Ext_Link",
    23: "SMS",
    24: "Call",
    25: "Email",
    26: "Map"
}, animationNames = ["Fade In", "Fade Out", "Slide In", "Slide Out"], animationNumbers = [12, 13, 14, 15];
function getAvailableAnimationNumbers(){
    return animationNumbers
}

function getAllAvailableAnimations(){
    return animationNames
}

function fromNameToID(a){
    if (Animations[a] != void 0) 
        return Animations[a]
}

function fromIDToName(a){
    if (animationNumberToName[a] != void 0) 
        return animationNumberToName[a]
}

var animationDirectionNumberToName = {
    0: "Left",
    1: "Top",
    2: "Right",
    3: "Bottom",
    4: "Top Left",
    5: "Top Right",
    6: "Bottom Right",
    7: "Bottom Left"
}, PlayTypeNumberToName = {
    0: "With Previous",
    1: "After Previous"
}, transitionNames = "Slide Left,Slide Right,Slide Up,Slide Down,Pop,Fade,Flip".split(","), transitionIDs = [0, 6, 1, 2, 3, 4, 5], jqmTransitionNames = "slide,slideright,slideup,slidedown,pop,fade,flip".split(",");
function Animation(a){
    this.id = a
}

Animation.prototype.start = function(){
};
Animation.prototype.equals = function(a){
    return a != null && this.toString() == a.toString()
};
Animation.prototype.toString = function(){
    return this.id + ""
};
Animation.prototype.display = function(){
    return fromIDToName(this.id)
};
Animation.getProperties = function(){
    return [AnimationProperties.Id]
};
Animation.prototype.getProperties = function(){
    return Animation.getProperties.call(this)
};
Animation.prototype.getPropertyValue = function(a){
    switch (a) {
        case AnimationProperties.Id:
            a = this.id;
            break;
        case AnimationProperties.Delay:
            a = this.delay;
            break;
        case AnimationProperties.PlayType:
            a = this.PlayType;
            break;
        case AnimationProperties.Duration:
            a = this.duration;
            break;
        case AnimationProperties.Repetitions:
            a = this.Repetitions;
            break;
        case AnimationProperties.Opacity:
            a = this.opacity;
            break;
        case AnimationProperties.Up:
            a = this.up;
            break;
        case AnimationProperties.Down:
            a = this.down;
            break;
        case AnimationProperties.Left:
            a = this.left;
            break;
        case AnimationProperties.Right:
            a = this.right;
            break;
        case AnimationProperties.Degree:
            a = this.degree;
            break;
        case AnimationProperties.Ratio:
            a = this.ratio;
            break;
        case AnimationProperties.Pieces:
            a = this.pieces;
            break;
        case AnimationProperties.Direction:
            a = this.direction;
            break;
        case AnimationProperties.DegreeX:
            a = this.degreeX;
            break;
        case AnimationProperties.DegreeY:
            a = this.degreeY;
            break;
        case AnimationProperties.DegreeZ:
            a = this.degreeZ;
            break;
        case AnimationProperties.SlideType:
            a = this.SlideType;
            break;
        case AnimationProperties.SlideFrom:
            a = this.SlideFrom;
            break;
        case AnimationProperties.SlideTo:
            a = this.SlideTo;
            break;
        case AnimationProperties.Target:
            a = this.target;
            break;
        case AnimationProperties.Number:
            a = this.number;
            break;
        case AnimationProperties.Page:
            a = this.page;
            break;
        case AnimationProperties.Transition:
            a = this.transition;
            break;
        case AnimationProperties.URL:
            a = this.url;
            break;
        case AnimationProperties.Text:
            a = this.text;
            break;
        case AnimationProperties.Subject:
            a = this.subject;
            break;
        case AnimationProperties.mailto:
            a = this.mailto;
            break;
        case AnimationProperties.Context:
            a = this.Context;
            break;
        default:
            a = null
    }
    return a
};
Animation.prototype.setPropertyValue = function(a, b){
    a = a == "url" ? "URL" : a.charAt(0).toUpperCase() + a.slice(1);
    switch (parseInt(AnimationProperties[a])) {
        case AnimationProperties.Id:
            this.id = b;
            break;
        case AnimationProperties.Delay:
            this.delay = b;
            break;
        case AnimationProperties.PlayType:
            this.PlayType = b;
            break;
        case AnimationProperties.Duration:
            this.duration = b;
            break;
        case AnimationProperties.Repetitions:
            this.Repetitions = b;
            break;
        case AnimationProperties.Opacity:
            this.opacity = b;
            break;
        case AnimationProperties.Up:
            this.up = b;
            break;
        case AnimationProperties.Down:
            this.down = b;
            break;
        case AnimationProperties.Left:
            this.left = b;
            break;
        case AnimationProperties.Right:
            this.right = b;
            break;
        case AnimationProperties.Degree:
            this.degree = b;
            break;
        case AnimationProperties.Ratio:
            this.ratio = b;
            break;
        case AnimationProperties.Pieces:
            this.pieces = b;
            break;
        case AnimationProperties.Direction:
            this.direction = b;
            break;
        case AnimationProperties.DegreeX:
            this.degreeX = b;
            break;
        case AnimationProperties.DegreeY:
            this.degreeY = b;
            break;
        case AnimationProperties.DegreeZ:
            this.degreeZ = b;
            break;
        case AnimationProperties.SlideType:
            this.SlideType = b;
            break;
        case AnimationProperties.SlideFrom:
            this.SlideFrom = b;
            break;
        case AnimationProperties.SlideTo:
            this.SlideTo = b;
            break;
        case AnimationProperties.Target:
            this.target = b;
            break;
        case AnimationProperties.Number:
            this.number = b;
            break;
        case AnimationProperties.Page:
            this.page = b;
            break;
        case AnimationProperties.Transition:
            this.transition = b;
            break;
        case AnimationProperties.URL:
            this.url = b;
            break;
        case AnimationProperties.Text:
            this.text = b;
            break;
        case AnimationProperties.Subject:
            this.subject = b;
            break;
        case AnimationProperties.mailto:
            this.mailto = b;
            break;
        case AnimationProperties.Context:
            this.Context = b
    }
};
Prev_Page.Inherits(Animation);
function Prev_Page(a, b){
    Animation.call(this, Animations.Prev_Page);
    this.transition = a;
    this.target = b
}

Prev_Page.prototype.start = function(){
    if (!pagePreviewMode) {
        var a = parseInt(this.transition);
        ormmaMode = !1;
        $.mobile.customBackPageTransition = jqmTransitionNames[a];
        $.mobile.goingBackCustom = !0;
        $(publishContext + " #backPacker").trigger("click")
    }
};
Prev_Page.prototype.toString = function(){
    return Prev_Page.superClass.toString.call(this) + "|" + this.transition
};
Prev_Page.prototype.display = function(){
    return transitionNames[this.transition] + " to Previous Page"
};
Prev_Page.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.Transition);
    return a
};
Prev_Page.prototype.getProperties = function(){
    return Prev_Page.getProperties.call(this)
};
Show_Page.Inherits(Animation);
function Show_Page(a, b, c){
    Animation.call(this, Animations.Show_Page);
    this.page = a;
    this.transition = b;
    this.target = c
}

Show_Page.prototype.start = function(){
    if (!pagePreviewMode) {
        var a = this.page, b = a.split("|")[1], a = a.split("|")[0], c = parseInt(this.transition);
        if (b == "-1" && a == "previousUnderShowPage") {
            b = getCorrespondingAnimation([20, 1, 2, 3, 4, 5, 6, 7]);
            if (b != null) 
                b.transition = this.transition, b.target = this.target, b.start.call(b, null);
            return !1
        }
        $("div[data-id='" + b + "']").length <= 0 && (b = $.mobile.firstPage.data("id"));
        ormmaMode = !1;
        $.mobile.changePage("#page_" + b, {
            transition: jqmTransitionNames[c],
            changeHash: !ormmaMode
        });
        c = a.replace(/\s/g, "_");
        a = $("div.ui-page-active :first").attr("id") == "area";
        c = $("#" + c + " :first").attr("id") == "area";
        ormmaMode && (a && !c ? ormmaExpand() : !a && c && ormmaClose());
        a = document.title;
        a = a.split("/")[0];
        document.title = a + "/" + $("div[data-id=" + b + "]").attr("id")
    }
};
Show_Page.prototype.toString = function(){
    return Show_Page.superClass.toString.call(this) + "|" + this.page + "|" + this.transition
};
Show_Page.prototype.display = function(){
    var a = this.page.split("|")[1], a = $("#actionPageList option[value=" + a + "]").html();
    return $("#actionPageTransitions option[value=" + this.transition + "]").text() + " : " + a
};
Show_Page.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.Page, AnimationProperties.Transition);
    return a
};
Show_Page.prototype.getProperties = function(){
    return Show_Page.getProperties.call(this)
};
Ext_Link.Inherits(Animation);
function Ext_Link(a){
    Animation.call(this, Animations.Ext_Link);
    this.url = a
}

Ext_Link.prototype.start = function(){
    if (!pagePreviewMode) {
        var a = this.url;
        a.indexOf("http://") !== 0 && a.indexOf("https://") !== 0 && (a = "http://" + a);
        clearAllTimers();
        ormmaMode ? ormmaOpen(a) : window.location = a
    }
};
Ext_Link.prototype.toString = function(){
    return Ext_Link.superClass.toString.call(this) + "|" + this.url
};
Ext_Link.prototype.display = function(){
    return "Go To: " + this.url
};
Ext_Link.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.URL);
    return a
};
Ext_Link.prototype.getProperties = function(){
    return Ext_Link.getProperties.call(this)
};
SMS.Inherits(Animation);
function SMS(a){
    Animation.call(this, Animations.SMS);
    this.number = a
}

SMS.prototype.start = function(){
    if (!pagePreviewMode) {
        var a = this.number, a = a.replace(/\'/g, ""), b = "sms:" + a;
        clearAllTimers();
        ormmaMode ? ormmaSMS(a, " ") : window.location = b
    }
};
SMS.prototype.toString = function(){
    return SMS.superClass.toString.call(this) + "|" + this.number
};
SMS.prototype.display = function(){
    return "Text to: " + this.number
};
SMS.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.Number);
    return a
};
SMS.prototype.getProperties = function(){
    return SMS.getProperties.call(this)
};
Call.Inherits(Animation);
function Call(a){
    Animation.call(this, Animations.Call);
    this.number = a
}

Call.prototype.start = function(){
    if (!pagePreviewMode) {
        var a = this.number, a = a.replace(/\'/g, ""), b = "tel:" + a;
        clearAllTimers();
        ormmaMode ? ormmaCall(a) : window.location = b
    }
};
Call.prototype.toString = function(){
    return Call.superClass.toString.call(this) + "|" + this.number
};
Call.prototype.display = function(){
    return "Call: " + this.number
};
Call.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.Number);
    return a
};
Call.prototype.getProperties = function(){
    return Call.getProperties.call(this)
};
Email.Inherits(Animation);
function Email(a, b, c){
    Animation.call(this, Animations.Email);
    this.mailto = a;
    this.subject = b;
    this.text = c
}

Email.prototype.start = function(){
    if (!pagePreviewMode) {
        var a = this.mailto, b = this.subject, c = this.text, d = "mailto:" + a + "?&subject=" + escape(b) + "&body=" + escape(c);
        clearAllTimers();
        ormmaMode ? ormmaMail(a, b, c) : window.location = d
    }
};
Email.prototype.toString = function(){
    return Email.superClass.toString.call(this) + "|" + this.mailto + "|" + this.subject + "|" + this.text
};
Email.prototype.display = function(){
    return "Email: " + this.mailto + " " + this.subject + " " + this.text
};
Email.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.mailto, AnimationProperties.Subject, AnimationProperties.Text);
    return a
};
Email.prototype.getProperties = function(){
    return Email.getProperties.call(this)
};
Map.Inherits(Animation);
function Map(a){
    Animation.call(this, Animations.Map);
    this.url = a
}

Map.prototype.start = function(){
    if (!pagePreviewMode) {
        var a = this.url;
        clearAllTimers();
        ormmaMode ? ormmaOpen(a) : window.location = a
    }
};
Map.prototype.toString = function(){
    return Map.superClass.toString.call(this) + "|" + this.url
};
Map.prototype.display = function(){
    return "Open Map at: " + this.url
};
Map.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.URL);
    return a
};
Map.prototype.getProperties = function(){
    return Map.getProperties.call(this)
};
Fade_In.Inherits(Animation);
function Fade_In(a, b, c, d, g){
    Animation.call(this, Animations.Fade_In);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = g
}

Fade_In.prototype.start = function(){
    parseInt(this.delay);
    var a = parseInt(this.Repetitions), b = parseInt(this.duration), c = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], d = $(c), g = !0, f = 0;
    for (c.style.opacity = 0; a >= 1;) 
        timers.push(window.setTimeout(function(){
            d.css({
                "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                "-webkit-transition-property": "all",
                "-webkit-transition-duration": b + "ms"
            }).show();
            c.style.opacity = g ? 10 : 0;
            g = !g
        }, f + 10)), f += b, a -= 0.5
};
Fade_In.prototype.toString = function(){
    return Fade_In.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target
};
Fade_In.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " Fade In " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
Fade_In.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions);
    return a
};
Fade_In.prototype.getProperties = function(){
    return Fade_In.getProperties.call(this)
};
Fade_Out.Inherits(Animation);
function Fade_Out(a, b, c, d, g){
    Animation.call(this, Animations.Fade_Out);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = g
}

Fade_Out.prototype.start = function(){
    parseInt(this.delay);
    for (var a = parseInt(this.Repetitions), b = parseInt(this.duration), c = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], d = $(c), g = 0, f = !0; a >= 1;) 
        timers.push(window.setTimeout(function(){
            d.css({
                "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                "-webkit-transition-property": "all",
                "-webkit-transition-duration": b + "ms"
            });
            c.style.opacity = f ? 0 : 10;
            f = !f
        }, g + 20)), g += b, a -= 0.5;
    timers.push(window.setTimeout(function(){
        d.css("display", "none")
    }, g + 20))
};
Fade_Out.prototype.toString = function(){
    return Fade_Out.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target
};
Fade_Out.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " Fade Out " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
Fade_Out.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions);
    return a
};
Fade_Out.prototype.getProperties = function(){
    return Fade_Out.getProperties.call(this)
};
Slide.Inherits(Animation);
function Slide(a, b, c, d, g, f, j, m, k){
    Animation.call(this, Animations.Slide);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = k;
    this.up = g;
    this.down = f;
    this.left = j;
    this.right = m
}

Slide.prototype.start = function(){
    parseInt(this.delay);
    var a = parseInt(this.duration), b = parseInt(this.Repetitions), c = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], d = $(c), g = 0, f = !0, j = parseInt(this.right) - parseInt(this.left), m = parseInt(this.down) - parseInt(this.up), k = Modernizr.csstransforms3d, l = k ? "translate3d(" + j + "px," + m + "px,0px)" : "translate(" + j + "px," + m + "px)";
    if (k) 
        for (var j = window.getComputedStyle(c).webkitTransform, j = j.replace(/\d.\d{0,6}e\-\d{1,6}/g, "0"), n = j == "none" ? new WebKitCSSMatrix("translate3d(0px,0px,0px) rotateZ(0deg)") : new WebKitCSSMatrix(j), o = new WebKitCSSMatrix(l), o = o.multiply(n); b >= 1;) 
            timers.push(window.setTimeout(function(){
                d.css({
                    "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                    "-webkit-transition-property": "all",
                    "-webkit-transition-duration": a + "ms"
                }).show();
                c.style.webkitTransform = f ? o : n;
                f = !f
            }, g + "ms")), g += a + 20, b -= 0.5;
    else {
        oldTransformString = c.style.webkitTransform;
        for (l = oldTransformString +
        " " +
        l; b >= 1;) 
            timers.push(window.setTimeout(function(){
                d.css({
                    "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                    "-webkit-transition-property": "all",
                    "-webkit-transition-duration": a + "ms"
                });
                c.style.webkitTransform = f ? l : oldTransformString;
                f = !f
            }, g + 20)), g = g + a + 20, b -= 0.5
    }
};
Slide.prototype.toString = function(){
    return Slide.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target + "|" + this.up + "|" + this.down + "|" + this.left + "|" + this.right
};
Slide.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " Slide  up " + this.up + "px, down " + this.down + "px, left " + this.left + "px, right " + this.right + "px " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
Slide.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions, AnimationProperties.Up, AnimationProperties.Down, AnimationProperties.Left, AnimationProperties.Right);
    return a
};
Slide.prototype.getProperties = function(){
    return Slide.getProperties.call(this)
};
Slide_In.Inherits(Animation);
function Slide_In(a, b, c, d, g, f){
    Animation.call(this, Animations.Slide_In);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = f;
    this.SlideFrom = g
}

Slide_In.prototype.start = function(){
    var a = parseInt(this.duration);
    parseInt(this.delay);
    var b = parseInt(this.Repetitions), c = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], d = $(c), g = parseInt(this.SlideFrom), f = c.parentNode, j = !1;
    c.style.display = "block";
    var m = parseInt(c.style.left), k = parseInt(c.style.top), l = d.position().left, n = d.position().top, o = c.offsetWidth, p = c.offsetHeight, p = o = Math.round(Math.sqrt(o * o + p * p)), q = f.offsetWidth, r = f.offsetHeight, t = f = 0, v = 0, u = 0;
    switch (g) {
        case 0:
            startleft = o * -1;
            starttop = k;
            break;
        case 1:
            startleft = m;
            starttop = p * -1;
            break;
        case 2:
            startleft = q;
            starttop = k;
            break;
        case 3:
            startleft = m;
            starttop = r;
            break;
        case 4:
            startleft = o * -1;
            starttop = p * -1;
            break;
        case 5:
            startleft = q;
            starttop = p * -1;
            break;
        case 6:
            startleft = q;
            starttop = r;
            break;
        case 7:
            startleft = o * -1;
            starttop = r;
            break;
        default:
            j = !0
    }
    if (!j) {
        t = startleft - l;
        u = starttop - n;
        f = -1 * (startleft - m) + (m != l && l > 0 && l < q ? l - m : 0);
        v = -1 * (starttop - k) + (k != n && n > 0 && n < r ? n - k : 0);
        d.show();
        g = c.style.visibility ==
        "" ? "visible" : c.style.visibility;
        c.style.visibility = "hidden";
        var s = (j = Modernizr.csstransforms3d) ? "translate3d(" + t.toString() + "px," + u.toString() + "px,0px)" : "translate(" + t.toString() + "px," + u.toString() + "px)", x = j ? "translate3d(" + f.toString() + "px," + v.toString() + "px,0px)" : "translate(" + f.toString() + "px," + v.toString() + "px)";
        if (j) {
            f = window.getComputedStyle(c).webkitTransform;
            f = f.replace(/\d.\d{0,6}e\-\d{1,6}/g, "0");
            f == "none" && (f = "translate(1px)");
            var f = new WebKitCSSMatrix(f), y = new WebKitCSSMatrix(s);
            c.style.webkitTransform = y.multiply(f);
            var z = y.multiply(f), f = 0, A = !0;
            c.style.visibility = g;
            c.style.display = "block";
            for (y = new WebKitCSSMatrix(x); b >= 1;) 
                timers.push(window.setTimeout(function(){
                    d.css({
                        "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                        "-webkit-transition-property": "all",
                        "-webkit-transition-duration": a + "ms"
                    });
                    c.style.webkitTransform = A ? y.multiply(z) : z;
                    A = !A
                }, f + 20)), f = f + a + 20, b -= 0.5
        }
        else {
            f = 0;
            A = !0;
            x = c.style.webkitTransform;
            c.style.webkitTransform = s;
            c.style.visibility = g;
            for (c.style.display = "block"; b >= 1;) 
                timers.push(window.setTimeout(function(){
                    d.css({
                        "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                        "-webkit-transition-property": "all",
                        "-webkit-transition-duration": a + "ms"
                    });
                    c.style.webkitTransform = A ? x : s;
                    A = !A
                }, f + 20)), f = f + a + 20, b -= 0.5
        }
    }
};
Slide_In.prototype.toString = function(){
    return Slide.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target + "|" + this.SlideFrom
};
Slide_In.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " Slide In From " + animationDirectionNumberToName[this.SlideFrom + ""] + " " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
Slide_In.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions, AnimationProperties.SlideFrom);
    return a
};
Slide_In.prototype.getProperties = function(){
    return Slide_In.getProperties.call(this)
};
Slide_Out.Inherits(Animation);
function Slide_Out(a, b, c, d, g, f){
    Animation.call(this, Animations.Slide_Out);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = f;
    this.SlideTo = g
}

Slide_Out.prototype.start = function(){
    var a = parseInt(this.duration);
    parseInt(this.delay);
    var b = parseInt(this.Repetitions), c = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], d = $(c), g = c.parentNode, f = parseInt(this.SlideTo);
    parseInt(c.style.left);
    parseInt(c.style.top);
    var j = d.position().left, m = d.position().top, k = c.offsetWidth, l = c.offsetHeight, l = k = Math.round(Math.sqrt(k * k + l * l)), n = g.offsetWidth, o = g.offsetHeight, p = g = 0, q = 0, q = 0, r = !1;
    switch (f) {
        case 0:
            q = k * -1;
            q = m;
            g = -1 * (k + j);
            p = 0;
            break;
        case 1:
            q = j;
            q = l * -1;
            g = 0;
            p = -1 * (l + m);
            break;
        case 2:
            q = m;
            g = n - j;
            p = 0;
            break;
        case 3:
            q = j;
            g = 0;
            p = o - m;
            break;
        case 4:
            q = k * -1;
            q = l * -1;
            g = -1 * (k + j);
            p = -1 * (l + m);
            break;
        case 5:
            q = l * -1;
            g = n - j;
            p = -1 * (l + m);
            break;
        case 6:
            g = n - j;
            p = o - m;
            break;
        case 7:
            q = k * -1;
            g = -1 * (k + j);
            p = o - m;
            break;
        default:
            r = !0
    }
    if (!r) {
        var f = 20, t = !0;
        d.show();
        var v = (j = Modernizr.csstransforms3d) ? "translate3d(" + g.toString() + "px," + p.toString() + "px,0px)" : "translate(" + g.toString() + "px," + p.toString() + "px)";
        if (j) 
            for (var g = window.getComputedStyle(c).webkitTransform, g = g.replace(/\d.\d{0,6}e\-\d{1,6}/g, "0"), u = g == "none" ? new WebKitCSSMatrix("translate3d(0px,0px,0px) rotateZ(0deg)") : new WebKitCSSMatrix(g), s = new WebKitCSSMatrix(v); b >= 1;) 
                timers.push(window.setTimeout(function(){
                    d.css({
                        "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                        "-webkit-transition-property": "all",
                        "-webkit-transition-duration": a + "ms"
                    }).show();
                    c.style.webkitTransform = t ? s.multiply(u) : u;
                    t = !t
                }, f + "ms")), f += a + 20, b -= 0.5;
        else 
            for (oldTransformString = c.style.webkitTransform; b >= 1;) 
                timers.push(window.setTimeout(function(){
                    d.css({
                        "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                        "-webkit-transition-property": "all",
                        "-webkit-transition-duration": a + "ms"
                    });
                    c.style.webkitTransform = t ? v : oldTransformString;
                    t = !t
                }, f + 20)), f = f + a + 20, b -= 0.5
    }
};
Slide_Out.prototype.toString = function(){
    return Slide.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target + "|" + this.SlideTo
};
Slide_Out.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " Slide Out To " + animationDirectionNumberToName[this.SlideTo + ""] + " " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
Slide_Out.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions, AnimationProperties.SlideTo);
    return a
};
Slide_Out.prototype.getProperties = function(){
    return Slide_Out.getProperties.call(this)
};
RotateXYZ.Inherits(Animation);
function RotateXYZ(a, b, c, d, g, f, j, m){
    Animation.call(this, Animations.RotateXYZ);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = m;
    this.degreeX = g;
    this.degreeY = f;
    this.degreeZ = j
}

RotateXYZ.prototype.start = function(){
    for (var a = this.duration, b = parseInt(this.Repetitions), c = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], d = $(c), g = parseInt(this.degreeX), f = parseInt(this.degreeY), j = parseInt(this.degreeZ), m = 0, k = !0, l = window.getComputedStyle(c).webkitTransform, l = l.replace(/\d.\d{0,6}e\-\d{1,6}/g, "0"), n = l == "none" ? new WebKitCSSMatrix("rotateX(0deg) rotateY(0deg) rotateZ(0deg)") : new WebKitCSSMatrix(l), o = new WebKitCSSMatrix("rotateX(" + g + "deg) rotateY(" + f + "deg) rotateZ(" + j + "deg)"); b >= 1;) 
        timers.push(window.setTimeout(function(){
            d.css({
                "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                "-webkit-transition-property": "all",
                "-webkit-transform-origin": "center",
                "-webkit-transition-duration": a + "ms"
            });
            c.style.webkitTransform = k ? o.multiply(n) : n;
            k = !k
        }, m + 20)), m = m + a + 10, b -= 0.5
};
RotateXYZ.prototype.toString = function(){
    return RotateXYZ.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target + "|" + this.degreeX + "|" + this.degreeY + "|" + this.degreeZ
};
RotateXYZ.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " RotateXYZ " + roundNumber(this.degreeX, 1) + "&deg; " + roundNumber(this.degreeY, 1) + "&deg; " + roundNumber(this.degreeZ, 1) + "&deg; " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
RotateXYZ.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions, AnimationProperties.DegreeX, AnimationProperties.DegreeY, AnimationProperties.DegreeZ);
    return a
};
RotateXYZ.prototype.getProperties = function(){
    return RotateXYZ.getProperties.call(this)
};
ZoomXY.Inherits(Animation);
function ZoomXY(a, b, c, d, g, f){
    Animation.call(this, Animations.ZoomXY);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = f;
    this.ratio = g
}

ZoomXY.prototype.start = function(){
    var a = this.duration, b = parseInt(this.Repetitions), c = parseFloat(this.ratio), d = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], g = $(d), f = 0, j = !0;
    g.show();
    for (var m = window.getComputedStyle(d).webkitTransform, m = m.replace(/\d.\d{0,6}e\-\d{1,6}/g, "0"), k = m == "none" ? new WebKitCSSMatrix("scale(1,1)") : new WebKitCSSMatrix(m), l = new WebKitCSSMatrix("scale(" + c + "," + c + ")"); b >= 1;) 
        timers.push(window.setTimeout(function(){
            g.css({
                "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                "-webkit-transition-property": "all",
                "-webkit-transition-duration": a + "ms"
            });
            d.style.webkitTransform = j ? l.multiply(k) : k;
            j = !j
        }, f + 20)), f = f + a + 20, b -= 0.5
};
ZoomXY.prototype.toString = function(){
    return ZoomXY.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target + "|" + this.ratio
};
ZoomXY.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " ZoomXY to " + this.ratio + " " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
ZoomXY.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions, AnimationProperties.Ratio);
    return a
};
ZoomXY.prototype.getProperties = function(){
    return ZoomXY.getProperties.call(this)
};
SkewXY.Inherits(Animation);
function SkewXY(a, b, c, d, g, f, j){
    Animation.call(this, Animations.SkewXY);
    this.delay = b;
    this.PlayType = a;
    this.duration = c;
    this.Repetitions = d;
    this.target = j;
    this.degreeX = g;
    this.degreeY = f
}

SkewXY.prototype.start = function(){
    var a = parseInt(this.Repetitions), b = this.duration, c = parseInt(this.degreeX), d = parseInt(this.degreeY), g = pagePreviewMode ? document.querySelector("#previewCanvas #" + this.target) : document.querySelectorAll(publishContext + " #" + this.target)[0], f = $(g), j = 0, m = !0, j = 0;
    f.show();
    for (var k = window.getComputedStyle(g).webkitTransform, k = k.replace(/\d.\d{0,6}e\-\d{1,6}/g, "0"), l = k == "none" ? new WebKitCSSMatrix("skewX(0deg) skewY(0deg)") : new WebKitCSSMatrix(k), n = new WebKitCSSMatrix("skewX(" +
    c +
    "deg) skewY(" +
    d +
    "deg)"); a >= 1;) 
        timers.push(window.setTimeout(function(){
            f.css({
                "-webkit-transition-timing-function": "cubic-bezier(0,0,1,1)",
                "-webkit-transition-property": "all",
                "-webkit-transition-duration": b + "ms"
            });
            g.style.webkitTransform = m ? n.multiply(l) : l;
            m = !m
        }, j + 20)), j = j + b + 20, a -= 0.5
};
SkewXY.prototype.toString = function(){
    return SkewXY.superClass.toString.call(this) + "|" + this.delay + "|" + this.duration + "|" + this.Repetitions + "|" + this.Target + "|" + this.degreeX + "|" + this.degreeY
};
SkewXY.prototype.display = function(){
    return document.getElementById(this.target).getAttribute("data-name") + " SkewXY " + roundNumber(this.degreeX, 1) + "&deg; " + roundNumber(this.degreeY, 1) + "&deg; " + this.delay / 1E3 + "s " + PlayTypeNumberToName[this.PlayType + ""] + " For " + this.duration / 1E3 + "s"
};
SkewXY.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.PlayType, AnimationProperties.Delay, AnimationProperties.Duration, AnimationProperties.Repetitions, AnimationProperties.DegreeX, AnimationProperties.DegreeY);
    return a
};
SkewXY.prototype.getProperties = function(){
    return SkewXY.getProperties.call(this)
};
LoopBack.Inherits(Animation);
function LoopBack(a, b){
    Animation.call(this, Animations.LoopBack);
    this.event = a;
    this.target = b
}

LoopBack.prototype.start = function(){
    canLoop && startAnimationList(AnimationManager.getAnimationList(this.target, this.event), !0)
};
LoopBack.prototype.toString = function(){
    return this.id + "|" + this.event + "|" + this.target
};
LoopBack.prototype.display = function(){
    return "Replay All Above for " + (this.target == "page-id" ? "this page" : this.target) + " on " + this.event
};
LoopBack.getProperties = function(){
    var a = Animation.getProperties();
    a.push(AnimationProperties.Target);
    return a
};
LoopBack.prototype.getProperties = function(){
    return LoopBack.getProperties.call(this)
};
function copyAnimationForPreview(a){
    a = jQuery.extend(!0, {}, a);
    a.target += "x";
    return a
}

function copyDataToPreview(a, b, c){
    var d = $(a).attr("id"), g = d + "x";
    $(b).attr("id", g);
    AnimationManager.removeAnimationsOfObject(g);
    $.each(c, function(a, b){
        var c = AnimationManager.getAnimationList(d, b.value);
        if (c) 
            for (var k = 0; k < c.length; k++) {
                var l = copyAnimationForPreview(c[k]);
                AnimationManager.addAnimationWithEventValue(l, g, b.value)
            }
    })
}

function copyPageAnimationForPreview(){
    var a = AnimationManager.PAGEID, b = a + "x";
    AnimationManager.removeAnimationsOfObject(b);
    $.each(AnimationManager.PAGE_EVENTS, function(c, d){
        var g = AnimationManager.getAnimationList(a, d.value);
        if (g) 
            for (var f = 0; f < g.length; f++) {
                var j = copyAnimationForPreview(g[f]);
                AnimationManager.addAnimationWithEventValue(j, b, d.value);
                (j.id == Animations.Slide_In || j.id == Animations.Fade_In) && elementsWithFadeOrSlideIn.push(j.target)
            }
    });
    return b
}

function loadAllAnimationsFromAttributes(a, b){
    var c = $(a).find("#ANIM_DATA").get(0);
    c ? AnimationManager.fromJSON(c.innerHTML, a) : AnimationManager.fromJSON("{}");
    if (typeof isCanvas === "undefined" && typeof b === "undefined") 
        for (i = 0; i < elementsWithFadeOrSlideIn.length; i++) 
            $(a).find("#" + elementsWithFadeOrSlideIn[i]).css("display", "none");
    canLoop = !0;
    elementsWithFadeOrSlideIn = []
}

function getCorrespondingAnimation(a){
    switch (a[0]) {
        case Animations.Slide:
            a = new Slide(a[1], a[2], a[3], a[4], a[5], a[6]);
            break;
        case Animations.SkewXY:
            a = new SkewXY(a[1], a[2], a[3], a[4], a[5], a[6]);
            break;
        case Animations.ZoomXY:
            a = new ZoomXY(a[1], a[2], a[3], a[4], a[5]);
            break;
        case Animations.LoopBack:
            a = new LoopBack(a[1]);
            break;
        case Animations.RotateXYZ:
            a = new RotateXYZ(a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
            break;
        case Animations.Fade_In:
            a = new Fade_In(a[1], a[2], a[3], a[4]);
            break;
        case Animations.Fade_Out:
            a = new Fade_Out(a[1], a[2], a[3], a[4]);
            break;
        case Animations.Slide_In:
            a = new Slide_In(a[1], a[2], a[3], a[4], a[5]);
            break;
        case Animations.Slide_Out:
            a = new Slide_Out(a[1], a[2], a[3], a[4], a[5]);
            break;
        case Animations.Prev_Page:
            a = new Prev_Page(a[1]);
            break;
        case Animations.Show_Page:
            a = new Show_Page(a[1], a[2]);
            break;
        case Animations.Ext_Link:
            a = new Ext_Link(a[1]);
            break;
        case Animations.SMS:
            a = new SMS(a[1]);
            break;
        case Animations.Call:
            a = new Call(a[1]);
            break;
        case Animations.Email:
            a = new Email(a[1], a[2], a[3]);
            break;
        case Animations.Map:
            a = new Map(a[1]);
            break;
        default:
            a = null
    }
    return a
}

function startAllAnimations(a, b){
    for (var c = a.querySelectorAll("div.drsElement"), d = c.length, g = 0; g < d; g++) 
        $(c[g]).data("data-initialState", $(c[g]).attr("style"));
    b ? startAnimationList(AnimationManager.getAnimationList(AnimationManager.PAGEID + "x", AnimationManager.PAGE_EVENTS.PAGE_LOAD.value)) : startAnimationList(AnimationManager.getAnimationList(AnimationManager.PAGEID, AnimationManager.PAGE_EVENTS.PAGE_LOAD.value))
}

function startAnimationList(a, b){
    if (a && a.length != 0) 
        for (var c = 0, d = 0, g = 0, f = 0, j = 0, m = 0, k = 1, k = !1, l = 0; l < a.length; l++) {
            f = (k = a[l].id != Animations.LoopBack && a[l].id < 20) ? parseInt(a[l].delay) : 0;
            j = k ? parseInt(a[l].PlayType) : 1;
            m = k ? parseInt(a[l].duration) : 0;
            k = k ? parseInt(a[l].Repetitions) : 1;
            f == "NaN" || typeof f == "undefined" ? f = 0 : a[l].id === Animations.LoopBack && (f = 50);
            j == 1 ? g = c = c + 15 + d : j == 0 && (c = g);
            var n = a[l].id >= 20;
            n && (c = c + d + 50);
            a[l].id == Animations.Ext_Link || a[l].id == Animations.SMS || a[l].id == Animations.Call || a[l].id == Animations.Map ? a[l].start.call(a[l], null) : timers.push(window.setTimeout(function(c){
                b && a[c].id != Animations.LoopBack && (stopAnimations(document.getElementById(a[c].target)), b = !1);
                a[c].start.call(a[c], null)
            }, c + f, l));
            bDebug && console.warn("Context for this animationLOL!", publishContext);
            j == 1 || a[l].id == Animations.LoopBack ? d = n ? 100 : parseInt(f + (parseInt(m) * parseInt(k) * 2 - parseInt(m))) : j == 0 && (f = parseInt(f + (parseInt(m) * parseInt(k) * 2 - parseInt(m))), f > d && (d = f))
        }
}

function stopAllAnimations(a){
    for (var a = a.querySelectorAll("div.drsElement"), b = a.length, c = 0; c < b; c++) 
        stopAnimations(a[c])
}

function clearAllTimers(){
    timers.push(window.setTimeout(""));
    for (key in timers) 
        window.clearTimeout(timers[key]);
    timers = [];
    canLoop = !1
}

function stopAnimations(a){
    $(a).attr("style", $(a).data("data-initialState"))
}

function roundNumber(a, b){
    return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
}

var AnimationManager = function(){
    var a = {};
    return {
        PAGEID: "page-id",
        OBJ_EVENTS: {
            TAP: {
                value: "tap",
                name: "On Tap"
            },
            TAPHOLD: {
                value: "taphold",
                name: "On Tap & Hold"
            },
            SWIPELEFT: {
                value: "swipeleft",
                name: "On Swipe Left"
            },
            SWIPERIGHT: {
                value: "swiperight",
                name: "On Swipe Right"
            }
        },
        BTN_EVENTS: {
            ONSUCCESS: {
                value: "submitSuccess",
                name: "On Submit Success"
            },
            TAP: {
                value: "tap",
                name: "On Tap"
            },
            TAPHOLD: {
                value: "taphold",
                name: "On Tap & Hold"
            },
            SWIPELEFT: {
                value: "swipeleft",
                name: "On Swipe Left"
            },
            SWIPERIGHT: {
                value: "swiperight",
                name: "On Swipe Right"
            }
        },
        WIDGET_EVENTS: {
            TAP: {
                value: "tap",
                name: "On Tap"
            },
            TAPHOLD: {
                value: "taphold",
                name: "On Tap & Hold"
            },
            SWIPELEFT: {
                value: "swipeleft",
                name: "On Swipe Left"
            },
            SWIPERIGHT: {
                value: "swiperight",
                name: "On Swipe Right"
            }
        },
        WIDGET_CHILD_EVENTS: {
            TAP_CHILD: {
                value: "tapChild",
                name: "On Tap Child"
            },
            TAPHOLD_CHILD: {
                value: "tapholdChild",
                name: "On Tap & Hold Child"
            },
            SWIPELEFT_CHILD: {
                value: "swipeleftChild",
                name: "On Swipe Left Child"
            },
            SWIPERIGHT_CHILD: {
                value: "swiperightChild",
                name: "On Swipe Right Child"
            }
        },
        PAGE_EVENTS: {
            PAGE_LOAD: {
                value: "pageload",
                name: "On Page Load"
            }
        },
        getEventList: function(a){
            return a == this.PAGEID ? this.PAGE_EVENTS : isButtonObj(document.getElementById(a)) ? this.BTN_EVENTS : isWidget(document.getElementById(a)) ? this.WIDGET_EVENTS : isWidgetChild(document.getElementById(a)) ? this.WIDGET_CHILD_EVENTS : this.OBJ_EVENTS
        },
        addAnimationWithEventValue: function(b, c, d, g){
            var f;
            a[c] || (a[c] = {});
            a[c][d] || (a[c][d] = []);
            a[c][d].push(b);
            f = a[c][d].length - 1;
            document.getElementById("MobDisBuilderHeaderContainer") != null && undoManager.redoing == !1 &&
            undoManager.undoing ==
            !1 &&
            g == !0 &&
            undoManager.storeEventAction("createEvent", b, c, d, f)
        },
        restoreAnimation: function(b){
            var c = jQuery.extend(!0, {}, b.animation);
            if (a[b.objectId][b.eventValue].length - 1 >= b.index) 
                for (var d = a[b.objectId][b.eventValue].length - 1; d >= b.index; d--) 
                    a[b.objectId][b.eventValue][d + 1] = a[b.objectId][b.eventValue][d];
            a[b.objectId][b.eventValue][b.index] = b.animation;
            b.animation = c;
            EventPane.populateEventsForObject(b.objectId)
        },
        updateAnimation: function(b, c){
            a[b.objectId][b.eventValue][b.index] = c ? b.afterAnimation : b.beforeAnimation;
            EventPane.populateEventsForObject(b.objectId)
        },
        restoreAnimations: function(b, c){
            a[b] = c
        },
        removeAnimation: function(b, c, d){
            if (!a[c] || !a[c][d]) 
                return !1;
            for (var g = 0; g < a[c][d].length; g++) 
                if (a[c][d][g] == b) 
                    return a[c][d].splice(g, 1), !0;
            return !1
        },
        removeAnimationByIndex: function(b, c, d){
            if (!a[b] || !a[b][c] || a[b][c].length <= d) 
                return !1;
            undoManager.redoing == !1 && undoManager.undoing == !1 && undoManager.storeEventAction("deleteEvent", a[b][c][d], b, c, d);
            a[b][c].splice(d, 1);
            return !0
        },
        getAnimationByIndex: function(b, c, d){
            return !a[b] || !a[b][c] || a[b][c].length <= d ? null : a[b][c][d]
        },
        removeAnimationsOfObject: function(b){
            delete a[b]
        },
        removeAnimationsWithTarget: function(b){
            for (src in a) 
                for (event in a[src]) 
                    for (var c = a[src][event].length - 1; c >= 0; c--) 
                        a[src][event][c].target == b && a[src][event].splice(c, 1)
        },
        getAnimationList: function(b, c){
            return !a[b] || !a[b][c] ? [] : a[b][c]
        },
        getAnimations: function(b){
            return !a[b] ? [] : a[b]
        },
        hasAnimation: function(a, c){
            return AnimationManager.getAnimationList(a, c).length > 0
        },
        checkBrokenPageLink: function(a){
            var c = document.getElementById("scroller");
            if (c == null || typeof c == void 0) 
                return !0;
            a = a.page.split("|");
            if (a.length > 1) 
                for (var d = 0; d < c.childNodes.length; d++) 
                    if ($($("li", c.childNodes[d]).context).attr("data-reference_id") == a[1]) 
                        return !1;
            return a[1] !== "-1" ? !0 : !1
        },
        toJSON: function(){
            return JSON.stringify(a)
        },
        fromJSON: function(b, c){
            var d;
            try {
                d = jQuery.parseJSON(b)
            } 
            catch (g) {
                return
            }
            a = {};
            var f = !1, j = {
                tap: !0,
                taphold: !0,
                tapChild: !0,
                tapholdChild: !0
            }, m;
            for (m in d) {
                var k = d[m], l;
                for (l in k) {
                    var n = k[l], o;
                    for (o in n) {
                        var p = n[o], q = getCorrespondingAnimation([p.id, 1, 2, 3, 4, 5, 6, 7]);
                        if (q != null) {
                            for (var r in p) 
                                q[r] = p[r];
                            j[l + ""] && $(c).find("#" + m).css({
                                "-webkit-tap-highlight-color": "rgba(26,26,26,0.5) !important",
                                "-webkit-tap-ring-color": "rgba(26,26,26,0.5) !important"
                            });
                            (q.id == Animations.Slide_In || q.id == Animations.Fade_In) && l == "pageload" && elementsWithFadeOrSlideIn.push(q.target);
                            AnimationManager.addAnimationWithEventValue(q, m, l)
                        }
                        else 
                            f = !0
                    }
                }
            }
            f && alertBox_show("Some of the now defunct Effects data has been removed or modified to make your site work in the current version. Thank you!")
        }
    }
}();
function prepareAndStartAllAnimations(a){
    clearAllTimers();
    publishContext = "#" + a.id;
    publishWidgets(a);
    loadAllAnimationsFromAttributes(a);
    loadVideo(a);
    registerTouches(a);
	
	var child = a.childNodes;
	
	if(a.id=='Punggolmap'){
		for (var i = 0; i < child.length; i++) {
		if(child[i].attributes != null){
			if (child[i].getAttribute('class') == 'area ui-content') {
			
				var scrollView = document.createElement('div');
				scrollView.setAttribute('data-scroll', 'xy');
				$(scrollView).css('background-color', 'white');
				var innerDiv = document.createElement('div');
				innerDiv.className = 'scroll-inner';
				$(innerDiv).css('background-color', 'black');
				$(innerDiv).css('width', '320px');
				$(innerDiv).css('height', '417px');
				$(scrollView).css('width', '320px');
				$(scrollView).css('height', '417px');
				
				var innerImg = document.createElement('img');
				innerImg.src = './watertowninfo_files/waterfront.jpg';
				innerImg.id = 'pinchListener';
				$(innerImg).css('width', '320px');
				$(innerImg).css('height', 'auto');
				innerDiv.appendChild(innerImg);
				scrollView.appendChild(innerDiv);
				var img1 = document.getElementById('image-8');
				img1.replaceChild(scrollView, img1.firstChild);
				$('#area_Punggolmap').css('background-color','white');
				
				$(innerImg).bind('dblclick', function(){
				
					specialZoom = specialZoom + 1;
					
					this.style.zoom = specialZoom;
					
					var newH = 1200 * specialZoom;
					var newW = 1692 * specialZoom;
					$(this.parentNode).css('width', newW + 'px');
					$(this.parentNode).css('height', newH + 'px');
					
					setTimeout(function(){
					
						$("[data-scroll='xy']", '#image-8').each(function(){
						
							var $this = $(this);
							if ($this.hasClass("ui-scrolllistview")) 
								$this.scrolllistview();
							else {
								var st = $this.jqmData("scroll") + "";
								var paging = st && st.search(/^[xy]p$/) != -1;
								var dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null;
								
								var opts = {};
								if (dir) 
									opts.direction = st;
								//if (paging) 
								opts.pagingEnabled = false;
								
								var method = $this.jqmData("scroll-method");
								if (method) 
									opts.scrollMethod = method;
								
								$this.scrollview(opts);
								var temp = specialZoom - 1;
								
								var nx = (lastX / temp) * specialZoom;
								var ny = (lastY / temp) * specialZoom;
								myscrollview._setScrollPosition(nx, ny);
								
								
							}
						});
						
						
					}, 500);
					
					
				});
				
				setTimeout(function(){
				
					$("[data-scroll='xy']", '#image-8').each(function(){
					
						originalW = parseInt($('#pinchListener').css('width'));
						originalH = parseInt($('#pinchListener').css('height'));
						var top = (417 - originalH) / 2;
						$("[data-scroll='xy']", '#image-8').css('top', top + 'px');
						$('.scroll-inner', '#image-8').css('width', $('#pinchListener').css('width'));
						$('.scroll-inner', '#image-8').css('height', $('#pinchListener').css('height'));
						
						var $this = $(this);
						if ($this.hasClass("ui-scrolllistview")) 
							$this.scrolllistview();
						else {
							var st = $this.jqmData("scroll") + "";
							var paging = st && st.search(/^[xy]p$/) != -1;
							var dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null;
							
							var opts = {};
							if (dir) 
								opts.direction = st;
							//if (paging) 
							opts.pagingEnabled = true;
							
							var method = $this.jqmData("scroll-method");
							if (method) 
								opts.scrollMethod = method;
							
							$this.scrollview(opts);
						}
					});
					
					
					
				}, 500);
				
				
				
				jgestures = document.createElement('script');
				jgestures.id = 'jgestures';
				jgestures.type = 'text/javascript';
				jgestures.src = './watertowninfo_files/jgestures.min.js';
				setTimeout("$('#scriptImports').append(jgestures);", 1000);
				
				setTimeout('loadEventLister();', 2000);
				
			}
		}
	
		
	}
		
	}
}

function resetAnimationHandling(a){
    clearAllTimers();
    publishContext = "#" + a.id;
    loadAllAnimationsFromAttributes(a, !0);
    loadVideo(a);
    registerTouches(a);
    publishWidgets(a)
}

function showAnimationPaneWhenTabInFocus(){
    document.querySelector("li.ui-state-active").querySelector("a").getAttribute("href") == "#eventAndEffect" && AnimationAdder.showWithSelectableEvent()
}

var eventsStr = "tap taphold swiperight swipeleft submitSuccess", onLoadAnimationPagesPlayed = {}, prevTransition = "", messageArea = !1;
function logit(a){
    $(".messageArea").html(a.join(" "))
}

function registerTouches(a){
    if (messageArea) {
        var b = document.createElement("div");
        b.className = "messageArea";
        $(b).css({
            position: "fixed",
            top: "10px",
            left: "auto",
            "margin-left": "1%",
            "z-index": "99",
            width: "300px",
            height: "100px",
            "font-family": "veramono",
            "font-size": "20px",
            "background-color": "#FFEEDD",
            color: "#00CC00"
        });
        $(a).append(b);
        logit(["Hello!", b.className, a.id, "has been appended to page, lol!"])
    }
    a.parentNode.tagName.toUpperCase();
    var b = a.id, c = $("div[data-role='content']", a).children("div"), d = onLoadAnimationPagesPlayed[b];
    $.each(c, function(a, b){
        b.firstChild.className.indexOf("threeDModel") < 0 &&
        ($(b).css({
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "text",
            "-webkit-user-drag": "none"
        }).attr("data-initialState", $(b).attr("style")).unbind(), $(b.firstChild).css({
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "text",
            "-webkit-user-drag": "none"
        }), $(b).bind(eventsStr, function(a){
            isWidget(b) && GoogleAnalytics.trackWidgetTouched(a);
            AnimationManager.hasAnimation(b.id, a.type) ? startAnimationList(AnimationManager.getAnimationList(b.id, a.type)) : console.log(b.id + " has got nothing on it!");
            b.getAttribute("data-content") != "fb" && a.preventDefault()
        }), $(b).bind("webkitTransitionEnd transitionend", function(){
            $(b).css("-webkit-transition-property", "left").show()
        }))
    });
    c = $(".widgetChildObject");
    $.each(c, function(a, b){
        $(b).css({
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "text",
            "-webkit-user-drag": "none"
        }).unbind();
        $(b.firstChild).css({
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "text",
            "-webkit-user-drag": "none"
        });
        $(b).bind(eventsStr, function(a){
            a.type.indexOf("Child") < 0 ? AnimationManager.hasAnimation(b.id, a.type + "Child") ? startAnimationList(AnimationManager.getAnimationList(b.id, a.type + "Child")) : console.log(b.id + " has got nothing on it!") : AnimationManager.hasAnimation(b.id, a.type) ? startAnimationList(AnimationManager.getAnimationList(b.id, a.type)) : console.log(b.id + " has got nothing on it!");
            a.preventDefault();
			
        })
    });
    if (!d) 
        startAnimationList(AnimationManager.getAnimationList(AnimationManager.PAGEID, AnimationManager.PAGE_EVENTS.PAGE_LOAD.value)), onLoadAnimationPagesPlayed[b] = !0, b = document.createElement("a"), b.id = "backPacker", $(b).attr({
            href: "",
            "data-rel": "back"
        }), a.appendChild(b)
}

function eventHandler2(){
}

function hideMyTarget(a){
    a.style.opacity = 0.5
}

$.extend($.fn.disableTextSelect = function(){
    return this.each(function(){
        $.browser.mozilla ? $(this).css("MozUserSelect", "none") : $.browser.msie ? $(this).bind("selectstart", function(){
            return !1
        }) : $(this).mousedown(function(){
            return !1
        })
    })
});
$(".unselectable").disableTextSelect();
function dismissUnsupportedBrowser(){
    $("#divBrowserAlert").remove()
}

var ua = navigator.userAgent.toLowerCase(), isAndroid = ua.indexOf("android") > -1;
function showProgressBar(a){
    var b = document.getElementById("processingScreen");
    $(b).css({
        display: "block",
        width: "100%",
        height: "100%",
        "z-index": "15"
    });
    setTimeout(function(){
        b.style.display = "none";
        if (typeof undoManager != "undefined") 
            undoManager.disabled = !1
    }, a);
    if (typeof undoManager != "undefined") 
        undoManager.disabled = !0
}

function showProgressBarWithOneParam(a, b, c){
    var d = document.getElementById("processingScreen");
    d.style.display = "block";
    setTimeout(function(){
        d.style.display = "none";
        b(c)
    }, a)
}

function deleteProgressBar(){
    var a = document.getElementById("processingScreen");
    if (a) 
        a.style.display = "none"
}

function showProgressBarInfinite(a){
    processingID = a ? a : "processingScreen";
    if (a = document.getElementById(processingID)) 
        a.style.display = "block"
}

function stopProgressBar(a){
    processingID = a ? a : "processingScreen";
    if (a = document.getElementById(processingID)) 
        a.style.display = "none"
}

function loadVideo(a){
    $(a).find("video").each(function(){
        var a = $(this).attr("data-src");
        isAndroid ? $(this).bind("click", function(c){
            GoogleAnalytics.trackWidgetTouched(c);
            window.open(a)
        }) : ($(this).bind("play", function(){
            GoogleAnalytics.trackWidgetTouched(e)
        }), $(this).attr({
            controls: "controls",
            preload: "auto",
            src: a
        }), $(this).children("source:first").attr("src", a))
    })
}

function stopVideo(a){
    $(a).find("video").each(function(){
        document.getElementById($(this).attr("id")).pause()
    });
    $(a).find("iframe").each(function(){
        var a = $(this).attr("src");
        a.match("youtube") && $(this).attr("src", a)
    })
}

window.Modernizr = function(a, b, c){
    function d(){
        j.input = function(a){
            for (var b = 0, c = a.length; b < c; b++) 
                t[a[b]] = a[b] in n;
            return t
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "));
        j.inputtypes = function(a){
            for (var d = 0, f, g, j, k = a.length; d < k; d++) 
                n.setAttribute("type", g = a[d]), f = n.type !== "text", f &&
                (n.value = o, n.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(g) && n.style.WebkitAppearance !== c ? (m.appendChild(n), j = b.defaultView, f = j.getComputedStyle &&
                j.getComputedStyle(n, null).WebkitAppearance !==
                "textfield" &&
                n.offsetHeight !== 0, m.removeChild(n)) : /^(search|tel)$/.test(g) || (/^(url|email)$/.test(g) ? f = n.checkValidity && n.checkValidity() === !1 : /^color$/.test(g) ? (m.appendChild(n), f = n.value != o, m.removeChild(n)) : f = n.value != o)), r[a[d]] = !!f;
            return r
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    function g(a, b){
        var c = a.charAt(0).toUpperCase() + a.substr(1), c = (a + " " + q.join(c + " ") + c).split(" ");
        return f(c, b)
    }
    function f(a, b){
        for (var d in a) 
            if (l[a[d]] !==
            c) 
                return b == "pfx" ? a[d] : !0;
        return !1
    }
    var j = {}, m = b.documentElement;
    b.head || b.getElementsByTagName("head");
    var k = b.createElement("modernizr"), l = k.style, n = b.createElement("input"), o = ":)", p = " -webkit- -moz- -o- -ms- -khtml- ".split(" "), q = "Webkit Moz O ms Khtml".split(" "), k = {}, r = {}, t = {}, v = [], u = function(a, c, d, f){
        var g, j, k = b.createElement("div");
        if (parseInt(d, 10)) 
            for (; d--;) 
                j = b.createElement("div"), j.id = f ? f[d] : "modernizr" + (d + 1), k.appendChild(j);
        g = ["&shy;<style>", a, "</style>"].join("");
        k.id = "modernizr";
        k.innerHTML += g;
        m.appendChild(k);
        a = c(k, a);
        k.parentNode.removeChild(k);
        return !!a
    }, s, x = {}.hasOwnProperty, y;
    typeof x !== c && typeof x.call !== c ? y = function(a, b){
        return x.call(a, b)
    }
 : y = function(a, b){
        return b in a && typeof a.constructor.prototype[b] === c
    };
    (function(b, c){
        var d = b.join(""), f = c.length;
        u(d, function(b){
            for (var b = b.childNodes, c = {}; f--;) 
                c[b[f].id] = b[f];
            j.touch = "ontouchstart" in a || c.touch.offsetTop === 9;
            j.csstransforms3d = c.csstransforms3d.offsetLeft === 9;
            j.generatedcontent = c.generatedcontent.offsetHeight >= 1
        }, f, c)
    })([, ["@media (", p.join("touch-enabled),("), "modernizr){#touch{top:9px;position:absolute}}"].join(""), ["@media (", p.join("transform-3d),("), "modernizr){#csstransforms3d{left:9px;position:absolute}}"].join(""), ['#generatedcontent:after{content:"', o, '";visibility:hidden}'].join("")], [, "touch", "csstransforms3d", "generatedcontent"]);
    k.touch = function(){
        return j.touch
    };
    k.cssanimations = function(){
        return g("animationName")
    };
    k.csscolumns = function(){
        return g("columnCount")
    };
    k.cssgradients = function(){
        var a = ("background-image:" +
        p.join("gradient(linear,left top,right bottom,from(#9f9),to(white));background-image:") +
        p.join("linear-gradient(left top,#9f9, white);background-image:")).slice(0, -17);
        l.cssText = a;
        return !!~ ("" + l.backgroundImage).indexOf("gradient")
    };
    k.cssreflections = function(){
        return g("boxReflect")
    };
    k.csstransforms = function(){
        return !!f(["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])
    };
    k.csstransforms3d = function(){
        var a = !!f(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]);
        a && "webkitPerspective" in m.style && (a = j.csstransforms3d);
        return a
    };
    k.csstransitions = function(){
        return g("transitionProperty")
    };
    k.generatedcontent = function(){
        return j.generatedcontent
    };
    k.webworkers = function(){
        return !!a.Worker
    };
    for (var z in k) 
        y(k, z) && (s = z.toLowerCase(), j[s] = k[z](), v.push((j[s] ? "" : "no-") + s));
    j.input || d();
    l.cssText = "";
    k = n = null;
    j._version = "2.0.6";
    j._prefixes = p;
    j._domPrefixes = q;
    j.testProp = function(a){
        return f([a])
    };
    j.testAllProps = g;
    j.testStyles = u;
    return j
}(this, this.document);


function loadEventLister(){

$('#pinchListener').bind('pinchopen',function(){
		
		if(specialZoom>=8){
			return;
		}
  	
		specialZoom = specialZoom +2;
		
		this.style.zoom = specialZoom;
		
		var newH = originalH * specialZoom;
		var newW = originalW * specialZoom;
		$(this.parentNode).css('width',newW+'px');
		$(this.parentNode).css('height',newH+'px');
		if(newH>=417){
			$(this.parentNode.parentNode).css('top','0px');
		}
		else{
			var top = (417-newH)/2;
			$(this.parentNode.parentNode).css('top',top+'px');
			
		}
		setTimeout(function(){
        
            $("[data-scroll='xy']", '#image-8').each(function(){
            
               var $this = $(this);
                if ($this.hasClass("ui-scrolllistview")) 
                    $this.scrolllistview();
                else {
                    var st = $this.jqmData("scroll") + "";
                    var paging = st && st.search(/^[xy]p$/) != -1;
                    var dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null;
                    
                    var opts = {};
                    if (dir) 
                        opts.direction = st;
                    //if (paging) 
                    opts.pagingEnabled = false;
                    
                    var method = $this.jqmData("scroll-method");
                    if (method) 
                        opts.scrollMethod = method;
                    
                    $this.scrollview(opts);
					var temp = specialZoom-2;
					
					var nx = (lastX/temp)*specialZoom;
					var ny = (lastY/temp)*specialZoom;
					myscrollview._setScrollPosition(nx,ny);
					console.log('set scrolling to x:'+nx+' y:'+ny);
                }
            });
			
			
        }, 500);
	
	});
	$('#pinchListener').bind('pinchclose',function(){
		
		
  		if(specialZoom<=1){return;}
		specialZoom = specialZoom - 2;
	
		this.style.zoom = specialZoom;
		var newH = originalH * specialZoom;
		var newW = originalW * specialZoom;
		$(this.parentNode).css('width',newW+'px');
		$(this.parentNode).css('height',newH+'px');
		if(newH>=417){
			$(this.parentNode.parentNode).css('top','0px');
			$(this.parentNode.parentNode).css('left','0px ! important');
		}
		else{
			var top = (417-newH)/2;
			$(this.parentNode.parentNode).css('top',top+'px');
			$(this.parentNode.parentNode).css('left','0px ! important');
			
		}
		setTimeout(function(){
        
            $("[data-scroll='xy']", '#image-8').each(function(){
            
               var $this = $(this);
                if ($this.hasClass("ui-scrolllistview")) 
                    $this.scrolllistview();
                else {
                    var st = $this.jqmData("scroll") + "";
                    var paging = st && st.search(/^[xy]p$/) != -1;
                    var dir = st && st.search(/^[xy]/) != -1 ? st.charAt(0) : null;
                    
                    var opts = {};
                    if (dir) 
                        opts.direction = st;
                    //if (paging) 
                    opts.pagingEnabled = false;
                    
                    var method = $this.jqmData("scroll-method");
                    if (method) 
                        opts.scrollMethod = method;
                    
                    $this.scrollview(opts);
					var temp = specialZoom+2;
					
					var nx = (lastX/temp)*specialZoom;
					var ny = (lastY/temp)*specialZoom;
					myscrollview._setScrollPosition(nx,ny);
					console.log('set scrolling to x:'+nx+' y:'+ny);
                }
            });
			
			
        }, 500);
		
	
	});

	
	
	
}

function triggerBackButton(){
	switch(currentPageId){
		case 'listcommunity':
		$("#image-30","#listcommunity").trigger('tap');
		break;
		case 'rivervaleplaza':
		$("#image-5","#rivervaleplaza").trigger('tap');
		break;
		case 'punggolpromenade':
		$("#image-5","#punggolpromenade").trigger('tap');
		break;
		case 'sengkangsrc':
		$("#image-5","#sengkangsrc").trigger('tap');
		break;
		case 'punggolwaterway':
		$("#image-5","#punggolwaterway").trigger('tap');
		break;
		case 'Lorong_Halus_Wetland':
		$("#image-5","#Lorong_Halus_Wetland").trigger('tap');
		break;
		case 'Sengkang_Riverside_Park':
		$("#image-5","#Sengkang_Riverside_Park").trigger('tap');
		break;
		case 'Golf_Driving_Range':
		$("#image-3","#Golf_Driving_Range").trigger('tap');
		break;
		case 'listtransport':
		$("#image-18","#listtransport").trigger('tap');
		break;
		case 'listshopping':
		$("#image-33","#listshopping").trigger('tap');
		break;
		case 'listschool':
		$("#image-19","#listschool").trigger('tap');
		break;
		case 'listpark':
		$("#image-30","#listpark").trigger('tap');
		break;
		case 'listhospitals':
		$("#image-18","#listhospitals").trigger('tap');
		break;
		case 'Horse_Riding_Centre':
		$("#image-3","#Horse_Riding_Centre").trigger('tap');
		break;
		case 'Punggol_Point':
		$("#image-5","#Punggol_Point").trigger('tap');
		break;
		case 'Punggol_Park':
		$("#image-3","#Punggol_Park").trigger('tap');
		break;
		case 'Waterway_Point':
		$("#image-3","#Waterway_Point").trigger('tap');
		break;
		case 'Coney_Island':
		$("#image-5","#Coney_Island").trigger('tap');
		break;
		case 'punggolcc':
		$("#image-5","#punggolcc").trigger('tap');
		break;
		case 'Punggolmap':
		$("#image-10","#Punggolmap").trigger('tap');
		break;
		case 'listview':
		$("#image-16","#listview").trigger('tap');
		break;
	}
	
}
