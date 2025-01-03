import { gql } from "@apollo/client";

export const GET_STATIONS = gql`
  query {
    metroLines {
      edges {
        node {
          id
          name
          color
          originStation {
            id
          }
          endingStation {
            id
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
