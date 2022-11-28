import { createReducer } from "@reduxjs/toolkit";
import { ADD_PLAYER, SET_AVAILABLE_PLAYERS } from "../actions";

export const rotationReducer = createReducer({
    availablePlayers: {
        homeTeam: [],
        awayTeam: [],
    },
    rotation: {
        homeTeam: [null, null, null, null, null, null],
        awayTeam: [null, null, null, null, null, null],
    },
}, (builder) => {
    builder
        .addCase(ADD_PLAYER, (state, {payload}) => {
            const { team, number, position } = payload;
            const receivedNumberIndex = state.availablePlayers[team].findIndex(playerNumber => playerNumber === number);
            state.availablePlayers[team] = state.availablePlayers[team].filter(playerNumber => playerNumber !== number);
            if (!!state.rotation[team][position - 1]) {
                state.availablePlayers[team] = [
                    ...state.availablePlayers[team].slice(0, receivedNumberIndex),
                    state.rotation[team][position - 1],
                    ...state.availablePlayers[team].slice(receivedNumberIndex)
                ];
            }
            state.rotation[team][position - 1] = number;
        })
        .addCase(SET_AVAILABLE_PLAYERS, (state, {payload}) => {
            const { team, availablePlayers } = payload;
            state.availablePlayers[team] = availablePlayers;
        })
});
