import { gql } from "@apollo/client";

export const GET_STATIONS = gql`
  query {
    metroStations {
      edges {
        node {
          id
          name
          coordinates {
            latitude
            longitude
          }
        }
      }
    }
  }
`;
