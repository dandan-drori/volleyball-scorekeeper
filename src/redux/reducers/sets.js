import { createReducer } from "@reduxjs/toolkit";
import { SET } from "../../config/constants";
import {
    ADD_EVENT,
    ADD_SET,
    CHANGE_SCORE,
    EDIT_EVENT,
    REMOVE_EVENT,
    ROTATE_PLAYERS,
    SET_TIMESTAMP,
    SET_WINNER,
    TOGGLE_SERVING
} from "../actions";

export const setsReducer = createReducer([SET], (builder) => {
    builder
        .addCase(ADD_SET, (state, {payload}) => {
            const {set} = payload;
            state.push(set);
        })
        .addCase(CHANGE_SCORE, (state, {payload}) => {
            const {diff, team} = payload;
            const endDiff = diff ?? 1;
            state[state.length - 1][team].score += endDiff;
        })
        .addCase(TOGGLE_SERVING, (state, {payload}) => {
            const {serving} = payload;
            const notServing = serving === 'homeTeam' ? 'awayTeam' : 'homeTeam';
            state[state.length - 1][serving].isServing = true;
            state[state.length - 1][notServing].isServing = false;
        })
        .addCase(ROTATE_PLAYERS, (state, {payload}) => {
            const { team, updatedRotation } = payload;
            state[state.length - 1][team].currentRotation = updatedRotation;
        })
        .addCase(ADD_EVENT, (state, {payload}) => {
            const {eventName, team, event} = payload;
            const eventPluralName = `${eventName}s`;
            state[state.length - 1][team][eventPluralName].push(event);
        })
        .addCase(REMOVE_EVENT, (state, {payload}) => {
            const {team, eventName, eventId} = payload;
            const eventPluralName = `${eventName}s`;
            const index = state[state.length - 1][team][eventPluralName].findIndex((event) => event.id === eventId);
            state[state.length - 1][team][eventPluralName].splice(index, 1);
        })
        .addCase(EDIT_EVENT, (state, {payload}) => {
            const {team, eventName, event} = payload;
            const eventPluralName = `${eventName}s`;
            const index = state[state.length - 1][team][eventPluralName].findIndex((e) => e.id === event.id);
            state[state.length - 1][team][eventPluralName][index] = event;
        })
        .addCase(SET_TIMESTAMP, (state, {payload}) => {
            const { timestampType } = payload;
            state[state.length - 1].timestamps[timestampType] = Date.now();
        })
        .addCase(SET_WINNER, (state, {payload}) => {
            const { winner } = payload;
            state[state.length - 1].winner = winner;
        })
});
