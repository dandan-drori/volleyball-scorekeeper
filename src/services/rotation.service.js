export function isPositionsFull(rotation) {
    const { homeTeam, awayTeam } = rotation;
    let homeTeamNotFull;
    Object.keys(homeTeam).forEach((position) => {
        if (!homeTeam[position]) {
            homeTeamNotFull = true;
        }
    });
    if (homeTeamNotFull) return false;
    let awayTeamNotFull;
    Object.keys(awayTeam).forEach((position) => {
        if (!awayTeam[position]) {
            awayTeamNotFull = true;
        }
    });
    if (awayTeamNotFull) return false;
    return true;
}
