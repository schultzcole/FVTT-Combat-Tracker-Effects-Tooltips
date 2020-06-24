Hooks.on("renderCombatTracker", (app, html, user) => {
    const effectIcons = html.find(".token-effect");
    effectIcons.each(function (i) {
        const path = stripQueryStringFromUrl(this.getAttribute("src"));
        if (game.cub?.enhancedConditions) {
            const conditions = game.settings.get("combat-utility-belt", "activeConditionMap");
            const condition = conditions.find(cond => cond.icon === path);
            if (condition !== undefined) {
                this.title = condition.name;
                return;
            }
        }

        const name = getFilenameFromUrl(path);
        this.title = toTitleCase(name);
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
