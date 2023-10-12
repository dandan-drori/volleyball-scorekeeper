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
    const updatedRotation = {};
    for (const key in currentRotation) {
        if (key === '6') {
            updatedRotation[key] = firstPosition;
        } else {
            updatedRotation[key] = currentRotation[`${+key + 1}`];
        }
    }
    return updatedRotation;
}

export function getWonSetsByEachTeam(sets) {
    return sets.reduce((acc, set) => {
        acc[set.winner] += 1;
        return acc;
    }, {homeTeam: 0, awayTeam: 0});
}

export function getGameWinner(sets) {
    const {homeTeam, awayTeam} = getWonSetsByEachTeam(sets);
    if (homeTeam === 3) return 'homeTeam';
    if (awayTeam === 3) return 'awayTeam';
    return '';
}

export function getMatchSummary(sets) {
    sets.forEach((set, index) => {
        const setWinner = getSetWinner({ score: set.homeTeam.score, name: set.homeTeam.name }, { score: set.awayTeam.score, name: set.awayTeam.name }, index === 4);
        console.log(setWinner);
        const setScore = getSetScore(set.homeTeam.score, set.awayTeam.score);
        console.log(setScore);
        const setTimeouts = getSetTimeouts(set.homeTeam.timeouts, set.awayTeam.timeouts);
        console.log(set);
    })
    return sets;
}

export function getSetScore(homeTeamScore, awayTeamScore) {
    return `${homeTeamScore} : ${awayTeamScore}`;
}

export function getSetTimeouts(homeTeamTimeouts, awayTeamTimeouts) {
    return `${homeTeamTimeouts.length} : ${awayTeamTimeouts.length}`;
}

export function getCurrentTime() {
    return `${padToTwoDigits(new Date().getHours())}:${padToTwoDigits(new Date().getMinutes())}`;
}

export function padToTwoDigits(num) {
    return (num + '').padStart(2, '0');
}
