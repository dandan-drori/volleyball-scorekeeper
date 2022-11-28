import { createReducer } from "@reduxjs/toolkit";
import { SET_GAME_ID } from "../actions";

export const gameReducer = createReducer({}, (builder) => {
    builder
        .addCase(SET_GAME_ID, (state, {payload}) => {
            const { gameId } = payload;
            state.id = gameId;
        })
});
