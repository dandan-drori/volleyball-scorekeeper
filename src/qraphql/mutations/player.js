import { gql } from "@apollo/client";

export const SET_TEAMS = gql`
    mutation SetTeam($homeTeamId: String!, $guestTeamId: String! $homeTeamPlayersIds: [String]!, $guestTeamPlayersIds: [String]!) {
        setTeam(homeTeamId: $homeTeamId, guestTeamId: $guestTeamId, homeTeamPlayersIds: $homeTeamPlayersIds, guestTeamPlayersIds: $guestTeamPlayersIds) {
            id
        }
    }
`;