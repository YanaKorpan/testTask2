let btn = document.querySelector('button');

function getTagCount() {
    const counter = document.querySelector('#counter');
    let value = document.querySelector('#tag-name').value;

    chrome.runtime.onMessage.addListener(function(request, sender) {
        if (request.action == "getSource") {
            counter.innerText = request.source;
        }
    });

    chrome.tabs.executeScript(null, {
        code: `function DOMtoString(document_root) {
                    return document_root.getElementsByTagName("${value}").length;
                }
                chrome.runtime.sendMessage({
                    action: "getSource",
                    source: DOMtoString(document)
                });`
    });
}

btn.onclick = getTagCount;

