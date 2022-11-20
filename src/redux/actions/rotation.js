import { SET_AVAILABLE_PLAYERS } from "./actionConstants";

export function setAvailablePlayers(team, number, position) {
    return { type: SET_AVAILABLE_PLAYERS, payload: { team, number, position } };
}
