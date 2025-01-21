import { gql } from "@apollo/client";

export const GET_LINES = gql`
  query {
    metroLines {
      edges {
        node {
          id
          name
          color
          originStation {
            id
            name
            coordinates {
              latitude
              longitude
            }
          }
          endingStation {
            id
            name
            coordinates {
              latitude
              longitude
            }
          }
          stations {
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
      }
    }
  }
`;

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
          lines
        }
      }
    }
  }
`;
