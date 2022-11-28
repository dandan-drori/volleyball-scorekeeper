import { SET_GAME_ID } from "./actionConstants";

export function setGameId(gameId) {
    return { type: SET_GAME_ID, payload: { gameId } };
}