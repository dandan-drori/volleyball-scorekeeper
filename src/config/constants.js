export const SET = {
    homeTeam: {
        name: 'homeTeam',
        score: 0,
        color: 'rgba(255,10,20,0.8)',
        isServing: true,
        currentRotation: {1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6},
        timeouts: [],
        substitutions: [],
        fouls: [],
        scoreServingPlayers: [],
    },
    awayTeam: {
        name: 'awayTeam',
        score: 0,
        color: 'rgba(20,10,255,0.8)',
        isServing: false,
        currentRotation: {1: 7, 2: 8, 3: 9, 4: 10, 5: 11, 6: 12},
        timeouts: [],
        substitutions: [],
        fouls: [],
        scoreServingPlayers: [],
    },
    winner: '',
    timestamps: {start: null, end: null},
    teams: [
        {
            name: 'homeTeam',
            color: 'rgba(255,10,20,0.8)',
        },
        {
            name: 'awayTeam',
            color: 'rgba(20,10,255,0.8)',
        }
    ],
}

export const DIALOGS_STATE = {
    substitution: {
        isOpen: false,
        team: '',
    },
    foul: {
        isOpen: false,
        team: '',
    },
    nextSet: {
        isOpen: false,
    }
}

export const FOUL_TYPES = {
    a: 'אזהרה',
    b: 'נזיפה',
    c: 'הרחקה',
}

export const DRAG_TYPES = {
    POSITION: 'position',
}

export const MINIMUM_REQUIRED_PLAYERS = 6;

export const INITIAL_MATCH_SUMMARY = {
    homeTeam: {
        timeouts: 0,
            substitutions: 0,
            fouls: 0,
            score: 0,
            setsWon: 0,
    },
    awayTeam: {
        timeouts: 0,
            substitutions: 0,
            fouls: 0,
            score: 0,
            setsWon: 0,
    },
    matchStart: '',
        matchEnd: '',
        matchDuration: '',
};