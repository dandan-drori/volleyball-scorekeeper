import {INITIAL_MATCH_SUMMARY} from "../config/constants";

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
    const matchSummary = INITIAL_MATCH_SUMMARY;
    const setsSummaries = [];
    sets.forEach((set) => {
        matchSummary[set.winner].setsWon += 1;
        const { homeTeam, awayTeam } = set;
        matchSummary.homeTeam.score += homeTeam.score;
        matchSummary.awayTeam.score += awayTeam.score;
        matchSummary.homeTeam.timeouts += homeTeam.timeouts.length;
        matchSummary.awayTeam.timeouts += awayTeam.timeouts.length;
        matchSummary.homeTeam.substitutions += homeTeam.substitutions.length;
        matchSummary.awayTeam.substitutions += awayTeam.substitutions.length;
        matchSummary.homeTeam.fouls += homeTeam.fouls.length;
        matchSummary.awayTeam.fouls += awayTeam.fouls.length;

        const setSummary = getSetSummary(set);
        setsSummaries.push(setSummary);
    });

    const { matchStart, matchEnd, matchDuration } = getMatchTime(sets);
    matchSummary.matchStart = matchStart;
    matchSummary.matchEnd = matchEnd;
    matchSummary.matchDuration = matchDuration;

    return { setsSummaries, matchSummary };
}

export function getSetSummary(set) {
    const { homeTeam, awayTeam, timestamps, winner } = set;
    return {
        homeTeam: { timeouts: homeTeam.timeouts.length, substitutions: homeTeam.substitutions.length, fouls: homeTeam.fouls.length, score: homeTeam.score },
        awayTeam: { timeouts: awayTeam.timeouts.length, substitutions: awayTeam.substitutions.length, fouls: awayTeam.fouls.length, score: awayTeam.score },
        duration: getSetDuration(timestamps),
        winner,
    }
}

export function getMatchTime(sets) {
    const matchStartDate = new Date(sets[0].timestamps.start);
    const matchEndDate = new Date(sets[sets.length - 1].timestamps.end);
    const matchStart = getFormattedTime(matchStartDate.getHours(), matchStartDate.getMinutes());
    const matchEnd = getFormattedTime(matchEndDate.getHours(), matchEndDate.getMinutes());
    const matchDuration = convertToHoursAndMinutes(matchEndDate.getTime() - matchStartDate.getTime());
    return { matchStart, matchEnd, matchDuration };
}

export function getSetDuration(timestamps) {
    const { start, end } = timestamps;
    return Math.floor((end - start) / 1000 / 60);
}

export function getCurrentTime() {
    return `${padToTwoDigits(new Date().getHours())}:${padToTwoDigits(new Date().getMinutes())}`;
}

export function getFormattedTime(hours, minutes) {
    return `${padToTwoDigits(hours)}:${padToTwoDigits(minutes)}`;
}

export function convertToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${padToTwoDigits(hours)}:${padToTwoDigits(remainingMinutes)}`;
}

export function padToTwoDigits(num) {
    return (num + '').padStart(2, '0');
}
