import { gql } from "@apollo/client";

export const GET_ALL_MARKET_GEMS = gql`
  query GetAllMarketGems($user: String!) {
    nfts(where: { owner_not: $user, isForSale: true }) {
      tokenID
      color
      gemCooldownPeriod
      gemCooldownInitTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
    }
  }
`;

export const GET_MARKET_GEMS = gql`
  query GetAllMarketGems {
    nfts {
      tokenID
      color
      gemCooldownPeriod
      gemCooldownInitTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
    }
  }
`;

export const GET_USER_GEMS = gql`
    query GetUserGems($offset: Int, $limit: Int) {
      nfts (offset: $offset, limit: $limit,  where: {owner: $user}) {
        tokenID
        color
        gemCooldownPeriod
        gemCooldownInitTime
        isForSale
        isMining
        miningPeriod
        owner
        quadrants
        rarity
        tokenID
        value
      }
    }
  `;

export const GET_USER_MINE_GEMS = gql`
  query GetUserGems($user: String!) {
    nfts(where: { owner: $user, isForSale_not: true, rarity_not: 0 }) {
      tokenID
      color
      gemCooldownPeriod
      gemCooldownInitTime
      isMining
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

export const GET_MARKET_PRICE = gql`
  query GetTokenMarketData($tokenName: String!) @api(contextKey: "apiName") {
    getTokenMarketData(tokenName: $tokenName) {
      current_price
    }
  }
`;
