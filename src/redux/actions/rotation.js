import { ADD_PLAYER, SET_AVAILABLE_PLAYERS } from "./actionConstants";

export function addPlayer(team, number, position) {
    return { type: ADD_PLAYER, payload: { team, number, position } };
}

export function setAvailablePlayers(team, availablePlayers) {
    return { type: SET_AVAILABLE_PLAYERS, payload: { team, availablePlayers } };
}