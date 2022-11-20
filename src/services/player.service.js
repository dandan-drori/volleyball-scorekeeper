export function countSelectedPlayers(players) {
    return players.reduce((acc, player) => {
        if (player.isSelected) {
            return acc + 1;
        }
        return acc;
    }, 0)
}

export function getSeasonYear() {
    const month = new Date().getMonth();
    const increment = month > 9 ? 1 : 0;
    return new Date().getFullYear() + increment;
}