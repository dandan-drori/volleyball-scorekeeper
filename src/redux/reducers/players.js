import { createReducer } from "@reduxjs/toolkit";
import { SET_PLAYERS_STATUS } from "../actions";

export const playersReducer = createReducer([], (builder) => {
    builder
        .addCase(SET_PLAYERS_STATUS, (state, {payload}) => {
            const { playersStatus } = payload;
            state = playersStatus;
        })
});
