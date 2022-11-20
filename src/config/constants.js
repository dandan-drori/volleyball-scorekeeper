export const SET = {
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