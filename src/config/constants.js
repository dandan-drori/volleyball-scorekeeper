export const INITIAL_SET = {
    homeTeam: {
        name: 'homeTeam',
        score: 0,
        color: 'rgba(255,10,20,0.8)',
        isServing: true,
        currentRotation: {1: 5, 2: 3, 3: 6, 4: 2, 5: 16, 6: 19},
        timeouts: [],
        substitutions: [],
        fouls: [],
    },
    awayTeam: {
        name: 'awayTeam',
        score: 0,
        color: 'rgba(20,10,255,0.8)',
        isServing: false,
        currentRotation: {1: 7, 2: 2, 3: 1, 4: 13, 5: 14, 6: 10},
        timeouts: [],
        substitutions: [],
        fouls: [],
    },
    winner: '',
}
