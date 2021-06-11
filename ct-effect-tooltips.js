Hooks.on("renderCombatTracker", (app, html, user) => {
    const effectIcons = html.find(".token-effect");
    effectIcons.each(function (i) {
        const rawPath = this.getAttribute("src");

        const combatantId = $(this).closest(".combatant").data("combatant-id");
        const combatant = game.combat?.combatants?.get(combatantId);
        const effect = combatant?.actor?.data?.effects?.find(e => e.data.icon === rawPath);
        if (effect) {
            // Active effects based effect label
            this.title = effect.data.label;
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
    const words = str.toLowerCase().split(/[ \-_.]/);
    return words
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}
