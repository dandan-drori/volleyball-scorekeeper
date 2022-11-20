import { gql } from "@apollo/client";

export const GET_ALL_LEAGUES = gql`
  query GetAllLeagues($year: Int!) {
    allLeagues(year: $year) {
      id
      name
    }
  }
`

export const GET_ALL_TEAMS = gql`
  query GetAllTeams($leagueId: String!, $year: Int!) {
    allTeams(leagueId: $leagueId, year: $year) {
      id
      name
      playersIds
    }
  }
`;

export const GET_ALL_PLAYERS = gql`
  query GetAllPlayers($teamId: String!, $year: Int!) {
    allPlayers(teamId: $teamId, year: $year) {
      id
      name
      number
      picture
    }
  }
`;

