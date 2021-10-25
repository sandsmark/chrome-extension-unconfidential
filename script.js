(function() {
    var toInject = 
       // Hurr durr javascript
'(' + function() {
    if (window.location.hostname.indexOf("mail.google.com") == -1) { // lgtm [js/incomplete-url-substring-sanitization]
        return;
    }
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
    AnalyserNode.prototype.getByteTimeDomainData = function() {
    }

    // Neuter the dumb confidential shit, I like to select the text I read
    if (window.location.hostname.indexOf("mail.google.com") != -1) { // lgtm [js/incomplete-url-substring-sanitization]
        const origSelection = document.getSelection;
        setGetSet(document, 'getSelection', () => function() { console.log("tried document getselection"); }, () => function() { });

        // Just in case they try more in the future, we can try this
        //delete window.selection;
        setGetSet(window, 'onselectionchange', () => function() { console.log("onselectionchange"); }, () => function() {});
        setGetSet(document, 'onselectstart', () => function() { console.log("tried onselectstart"); }, () => function() {});
        setGetSet(document, 'createRange', () => function() { console.log("tried to create selection range"); }, () => function() { });

        var found = false;
        function findMail(parent) {
            const messages = parent.querySelectorAll("[data-legacy-message-id]");
            for (var i=0; i<messages.length; i++) {
                if (messages[i].innerText.indexOf('You do not have the option to forward') === -1) {
                    continue;
                }
                console.log('message: ' + messages[i].innerText);
                //chrome.runtime.sendMessage({content: messages[i].innerHTML}, function(response) {
                found = true;
                return;
            }
        }

        setTimeout(function() {
            addStyleString(".div { user-select: auto !important; }");
            addStyleString(".p { user-select: auto !important; }");
            addStyleString(".an { user-select: auto !important; }");
            findMail(document);

        }, 100);

        function doCopy(event) {
            const selection = origSelection.apply(document);
            event.clipboardData.setData('text/plain', selection.toString());
            event.preventDefault();
        }

        var observer = new MutationObserver(function(mutationList) {
            for (var mutation of mutationList) {
                switch(mutation.type) {
                    case "attributes":
                        mutation.target.oncopy = doCopy;
                        break;
                }
                for (var child of mutation.addedNodes) {
                    child.oncopy = doCopy;

                    if (!found && child.getAttribute && child.getAttribute('cellpadding')) {
                        findMail(child);
                    }
                }
            }
        });
        observer.observe(document, {childList: true, subtree: true, attributes: true, attributeFilter: ['oncopy', 'cellpadding', 'dataset', 'data-message-id', 'message-id']});//, 'tabindex']});
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
