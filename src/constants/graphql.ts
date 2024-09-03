import { gql } from "@apollo/client";

export const GET_ALL_MARGET_GEMS = gql`
  query GetAllMargetGems {
    nfts {
      tokenID
      color
      gemCooldownPeriod
      isForSale
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
    }
  }
`;
