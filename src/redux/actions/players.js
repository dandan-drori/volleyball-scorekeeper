import { SET_PLAYERS_STATUS } from "./actionConstants";

export function setPlayersStatus(playersStatus) {
    return { type: SET_PLAYERS_STATUS, payload: { playersStatus } };
}
