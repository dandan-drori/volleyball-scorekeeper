import { createReducer } from "@reduxjs/toolkit";
import { SET_TEAM_NAME } from "../actions";

export const teamReducer = createReducer(['homeTeam', 'awayTeam'], (builder) => {
    builder
        .addCase(SET_TEAM_NAME, (state, {payload}) => {
            const { team, name } = payload;
            const index = team === 'homeTeam' ? 0 : 1;
            state[index] = name;
        })
});
