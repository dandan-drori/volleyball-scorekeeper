export function getSetWinner(team, otherTeam, isLastSet) {
    const WINNING_SCORE = isLastSet ? 15 : 25;
    const SCORE_DIFF_TO_WIN = 2;
    if (team.score >= WINNING_SCORE || otherTeam.score >= WINNING_SCORE) {
        if (team.score - otherTeam.score >= SCORE_DIFF_TO_WIN) {
            return team.name;
        }
        if (otherTeam.score - team.score >= SCORE_DIFF_TO_WIN) {
            return otherTeam.name;
        }
    }
    return '';
}

export function getServingPlayer(currentSet) {
    const servingTeam = currentSet.homeTeam.isServing ? 'homeTeam' : 'awayTeam';
    return currentSet[servingTeam].currentRotation['1'];
}

export function rotatePlayers(currentRotation) {
    const firstPosition = currentRotation['1'];
    for (const key in currentRotation) {
        if (key === '6') {
            currentRotation[key] = firstPosition;
        } else {
            currentRotation[key] = currentRotation[`${+key + 1}`];
        }
    }
    return currentRotation;
}

export function getWonSetsByEachTeam(sets) {
    return sets.reduce((acc, set) => {
        acc[set.winner] += 1;
        return acc;
    }, {homeTeam: 0, awayTeam: 0});
}

export function getUpdatedSets(sets, currentSetIdx, team, newTeam, otherTeam, newOtherTeam, winner) {
    return sets.map((set, idx) => {
        if (idx === currentSetIdx) {
            return {[team]: newTeam, [otherTeam]: newOtherTeam, winner};
        }
        return set;
    })
}

export function getGameWinner(sets) {
    const {homeTeam, awayTeam} = getWonSetsByEachTeam(sets);
    if (homeTeam === 3) return 'homeTeam';
    if (awayTeam === 3) return 'awayTeam';
    return '';
}
