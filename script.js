(function() {
    var toInject = 
       // Hurr durr javascript
'(' + function() {
    function setGetSet(obj, propertyName, getFunc, setFunc) {
        try {
            Object.defineProperty(obj, propertyName, { set: setFunc, get: getFunc });
        } catch (exception) {
            console.log("Failed to override getter " + exception);
        }
    }

    function addStyleString(str) {
        var node = document.createElement('style');
        node.innerHTML = str;
        document.body.appendChild(node);
    }

    // Neuter the dumb confidential shit, I like to select the text I read
    if (window.location.hostname.indexOf("mail.google.com") != -1) { // lgtm [js/incomplete-url-substring-sanitization]
        setGetSet(window, 'getSelection', () => function() { console.log("tried window getselection"); }, () => function() { });
        setGetSet(document, 'getSelection', () => function() { console.log("tried document getselection"); }, () => function() { });

        // Just in case they try more in the future, we can try this
        //delete window.selection;
        //setGetSet(window, 'onselectionchange', () => function() { console.log("onselectionchange"); }, () => function() {});
        //setGetSet(document, 'onselectstart', () => function() { console.log("tried onselectstart"); }, () => function() {});
        //setGetSet(document, 'createRange', () => function() { console.log("tried to create selection range"); }, () => function() { });

        setTimeout(function() {
            addStyleString(".div { user-select: auto !important; }");
            addStyleString(".p { user-select: auto !important; }");
            addStyleString(".an { user-select: auto !important; }");
        }, 100);
    }
} + ')();' ;


// Create temporary element
var element = document.createElement('script');
element.textContent = toInject
element.async = false


// Inject and then delete
document.documentElement.insertBefore(element, document.documentElement.firstElement)
if (element.parentNode) {
    element.parentNode.removeChild(element);
}
})();
