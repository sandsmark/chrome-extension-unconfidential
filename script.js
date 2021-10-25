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

    // Force-enable right click menu
    function Mutation (callback) {
        this.isCalled = false;
        this.isUnbound = false;
        this.callback = callback;
        this.events = ['DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved', 'DOMCharacterDataModified', 'DOMSubtreeModified'];
        this.bind();
    }
    Mutation.prototype.bind = function () {
        this.events.forEach(function (name) {
            document.addEventListener(name, this, true);
        }.bind(this));
    };
    Mutation.prototype.handleEvent = function () {
        this.isCalled = true;
        this.unbind();
    };
    Mutation.prototype.unbind = function () {
        if (this.isUnbound) {
            return;
        }
        this.events.forEach(function (name) {
            document.removeEventListener(name, this, true);
        }.bind(this));
        this.isUnbound = true;
    };

    function Synchronizetion () {
        this._setTimeout = window.setTimeout;
        this._requestAnimationFrame = window.requestAnimationFrame;
        this._Promise = window.Promise;
        this.isRestoration = false;
        this.calledPromise = false;
        window.requestAnimationFrame = window.setTimeout = function (callback) {
            callback();
        };
        window.Promise = function () {
            this._Promise.apply(this, arguments);
            this.calledPromise = true;
            window.Promise = this._Promise;
        };
    }
    Synchronizetion.prototype.restore = function () {
        if (this.isRestoration) {
            return;
        }
        window.setTimeout = this._setTimeout;
        window.requestAnimationFrame = this._requestAnimationFrame;
        if (!this.calledPromise) {
            window.Promise = this._Promise;
        }
        this.isRestoration = true;
    };

    function EventHandler (event) {
        this.event = event;
        this.contextmenuEvent = this.createEvent(this.event.type);
        this.mouseupEvent = this.createEvent('mouseup');
        this.isCanceled = this.contextmenuEvent.defaultPrevented;
    }
    EventHandler.prototype.createEvent = function (type) {
        var target = this.event.target;
        var event = target.ownerDocument.createEvent('MouseEvents');
        event.initMouseEvent(type, this.event.bubbles, this.event.cancelable,
            target.ownerDocument.defaultView, this.event.detail,
            this.event.screenX, this.event.screenY, this.event.clientX, this.event.clientY,
            this.event.ctrlKey, this.event.altKey, this.event.shiftKey, this.event.metaKey,
            this.event.button, this.event.relatedTarget
        );
        return event;
    };
    EventHandler.prototype.fire = function () {
        var target = this.event.target;
        var contextmenuHandler = function (event) {
            this.isCanceled = event.defaultPrevented;
            //event.preventDefault();
        }.bind(this);
        window.addEventListener(this.event.type, contextmenuHandler, false);
        target.dispatchEvent(this.contextmenuEvent);
        window.removeEventListener(this.event.type, contextmenuHandler, false);
        this.isCanceled = this.contextmenuEvent.defaultPrevented;
        target.dispatchEvent(this.mouseupEvent);
    };

    window.addEventListener('contextmenu', handleEvent, true);
    function handleEvent (event) {
        event.stopPropagation();
        event.stopImmediatePropagation();
        var handler = new EventHandler(event);

        window.removeEventListener(event.type, handleEvent, true);
        var sync = new Synchronizetion();
        var mutation = new Mutation(function () {
            sync.restore();
        });

        var _alert = window.alert;
        window.alert = function () {};
        handler.fire();
        window.alert = _alert;

        sync.restore();
        mutation.unbind();
        window.addEventListener(event.type, handleEvent, true);
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
