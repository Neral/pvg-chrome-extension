chrome.runtime.onInstalled.addListener(() => {
    chrome.webNavigation.onCompleted.addListener(() => {
        console.log('User is on google maps page, we can send notification to check those places in our extension.');
    }, { url: [{ urlMatches: 'google.com/maps' }] });
});
