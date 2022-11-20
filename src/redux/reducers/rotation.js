import { createReducer } from "@reduxjs/toolkit";
import { SET_AVAILABLE_PLAYERS } from "../actions/actionConstants";

export const rotationReducer = createReducer({
    availablePlayers: {
        homeTeam: [17,8,6,3,2,1,5,9],
        awayTeam: [22,7,4,10,11,12,13],
    },
    rotation: {
        homeTeam: [null, null, null, null, null, null],
        awayTeam: [null, null, null, null, null, null],
    },
}, (builder) => {
    builder
        .addCase(SET_AVAILABLE_PLAYERS, (state, {payload}) => {
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
});
