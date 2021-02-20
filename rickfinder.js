const redirectLink = "https://sullycb.github.io/RickrollGuard.html";
let blacklistedLinks = [];
let opening = false;

const checkUpdates = async() => {
    const response = await (await fetch("https://raw.githubusercontent.com/SullyCB/sullycb.github.io/master/blacklistedWebsites.json")).json();


    console.log("Rickguard checked for updates!");
    return blacklistedLinks = response.blacklisted;
};

checkUpdates();

chrome.alarms.create("UpdateCheck", {
    periodInMinutes: 10
});

chrome.alarms.onAlarm.addListener(alarm => {
    checkUpdates();
    console.log("Checked for Rickroll Link Updates!");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { //Check if url name matches a rickroll link.
    if (blacklistedLinks.includes(tab.url)) {
        if (opening) return;

        opening = true;
        chrome.tabs.remove(tabId);
        chrome.tabs.create({
            url: redirectLink
        }, tab => {
            setTimeout(() => {
                opening = false;
            }, 100)
        });
    };
});