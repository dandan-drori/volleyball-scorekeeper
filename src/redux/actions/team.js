import { SET_TEAM_NAME } from "./actionConstants";

export function setTeamName(team, name) {
    return { type: SET_TEAM_NAME, payload: { team, name } };
}