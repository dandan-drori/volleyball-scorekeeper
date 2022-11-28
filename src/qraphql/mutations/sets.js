import { gql } from "@apollo/client";

export const START_GAME = gql`
    mutation StartGame($homeTeamId: String!, $guestTeamId: String!) {
        startGame(homeTeamId: $homeTeamId, guestTeamId: $guestTeamId) {
            id
        }
    }
`;

export const GIVE_POINT_BY_TEAM_NAME = gql`
    mutation GivePoint($gameSetId: String!, $teamId: String!) {
        givePoint(gameSetId: $gameSetId, teamId: $teamId) {
            homeTeam {
                score
            }
        }
    } 
`;