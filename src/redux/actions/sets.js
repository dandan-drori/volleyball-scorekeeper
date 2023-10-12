import {
    ADD_EVENT,
    ADD_SET,
    CHANGE_SCORE,
    EDIT_EVENT,
    REMOVE_EVENT,
    ROTATE_PLAYERS, SET_TIMESTAMP, SET_WINNER,
    TOGGLE_SERVING,
    SET_SCORE_SERVING_PLAYERS,
} from "./actionConstants";

export function addSet(set) {
    return { type: ADD_SET, payload: { set } };
}

export function changeScore(team, diff) {
    return { type: CHANGE_SCORE, payload: { team, diff } };
}

export function toggleServing(serving) {
    return { type: TOGGLE_SERVING, payload: { serving } };
}

export function rotatePlayersAction(team, updatedRotation) {
    return { type: ROTATE_PLAYERS, payload: { team, updatedRotation } };
}

export function addEvent(team, eventName, event) {
    return { type: ADD_EVENT, payload: { team, eventName, event } };
}

export function removeEvent(team, eventName, eventId) {
    return { type: REMOVE_EVENT, payload: { team, eventName, eventId } };
}

export function editEvent(team, eventName, event) {
    return { type: EDIT_EVENT, payload: { team, eventName, event } };
}

export function setTimestamp(timestampType) {
    return { type: SET_TIMESTAMP, payload: { timestampType } };
}

export function setWinner(winner) {
    return { type: SET_WINNER, payload: { winner } };
}

export function updateScoreServingPlayers(team, currentServingPlayer) {
    return { type: SET_SCORE_SERVING_PLAYERS, payload: { team, currentServingPlayer } };
}
