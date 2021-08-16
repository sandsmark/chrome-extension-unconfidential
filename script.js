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
        const orig_getSelection = window.getSelection;
        setGetSet(window, 'getSelection',
            () => function() {
                var sel = orig_getSelection();
                if (!sel.anchorNode) {
                    return sel;
                }
                if (sel.anchorNode.parentElement.contentEditable) {
                    return sel;
                }

                console.log("tried window getselection");
                //console.trace();
                return {
                    'addRange': function() {},
                    'anchorNode': null,
                    'anchorOffset': 0,
                    'baseNode': null,
                    'baseOffset': 0,
                    'extentNode': null,
                    'extentOffset': 0,
                    'focusNode': null,
                    'focusOffset': 0,
                    'isCollapsed': true,
                    'rangeCount': 0,
                    'type': "None"
                };
            },
            () => function() { }
        );
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

            //const messages = document.querySelectorAll("[data-legacy-message-id]");
            //for (var i=0; i<messages.length; i++) {
            //    if (messages[i].innerText.indexOf('You do not have the option to forward, copy, print, or download this email') === -1) {
            //        continue;
            //    }
            //    chrome.runtime.sendMessage({content: messages[i].innerHTML}, function(response) {
            //}
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
