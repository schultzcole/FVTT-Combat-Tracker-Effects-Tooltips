Hooks.on("renderCombatTracker", (app, html, user) => {
    const effectIcons = html.find(".token-effect");
    effectIcons.each(function (i) {
        const rawPath = this.getAttribute("src");

        const tokenId = $(this).closest(".combatant").data("tokenId");
        const effect = canvas.tokens.get(tokenId)?.actor?.data?.effects?.find(e => e.icon === rawPath);
        if (effect) {
            // Active effects based effect label
            this.title = effect.label;
        } else {
            // Legacy filename based effect name
            const strippedPath = stripQueryStringFromUrl(rawPath);
            const name = getFilenameFromUrl(strippedPath);
            this.title = toTitleCase(name);
        }
    });
});

function stripQueryStringFromUrl(url) {
    return url.split('#')[0].split('?')[0];
}

// url must not have query strings!
function getFilenameFromUrl(url) {
    return url.split('/').pop().split('.').splice(0, 1).join(' ');
}

function toTitleCase(str) {
    const words = str.toLowerCase().split(/ |-|_|\./);
    const uppercased = words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    return uppercased;
}
