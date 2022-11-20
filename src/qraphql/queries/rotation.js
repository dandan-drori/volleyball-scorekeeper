const { gql } = require("@apollo/client");

export const GET_TEAMS = gql`
  query GetTeams {
    teams {
      name
    }
  }
`;

export const GET_GAMES = gql`
  query GetGames {
    games {
      id
    }
  }
`;

export const GET_SETS_BY_GAME_ID = gql`
    query GetSetsById($id: String!) {
        games(id: $id) {
            gameSetsIds
        }
    }
`;


export const GET_SET_ID = gql`
    query GetSetId($id: String!) {
        gamesSets(id: $id) {
            id
        }
    }
`;

export const GET_TEAMS_SCORE_BY_SET_ID = gql`
    query GetSetById($id: String!, $isHomeTeam: Boolean!) {
        gamesSets(id: $id) {
            homeTeam @include(if: $isHomeTeam) {
                score
            }
            guestTeam @skip(if: $isHomeTeam) {
                score
            }
        }
    }
`;

export const GET_TEAMS_NAMES = gql`
    query GetTeams {
        teams {
            name
        }
    }
`;