import { gql } from "@apollo/client";

export const GET_ALL_MARKET_GEMS = gql`
  query GetAllMarketGems($user: String!) {
    nfts(where: { owner_not: $user, isForSale: true }) {
      tokenID
      color
      cooldownDueDate
      gemCooldownInitTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
    }
  }
`;

export const GET_MARKET_GEMS = gql`
  query GetAllMarketGems {
    nfts {
      tokenID
      color
      cooldownDueDate
      gemCooldownInitTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
    }
  }
`;

export const GET_USER_GEMS = gql`
  query GetUserGems($skip: Int, $first: Int, $user: String) {
    nfts(skip: $skip, first: $first, where: { owner: $user }) {
      tokenID
      color
      cooldownDueDate
      gemCooldownInitTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
    }
  }
`;

export const GET_USER_MINE_GEMS = gql`
  query GetUserGems($user: String!) {
    nfts(where: { owner: $user, isForSale_not: true, rarity_not: 0 }) {
      tokenID
      color
      cooldownDueDate
      gemCooldownInitTime
      isMining
      isForSale
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
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
