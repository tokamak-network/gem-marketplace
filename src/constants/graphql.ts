import { gql } from "@apollo/client";

export const GET_ALL_MARKET_GEMS = gql`
  query GetAllMarketGems {
    nfts(where: { isForSale: true }) {
      tokenID
      color
      cooldownDueDate
      gemCooldownInitTime
      miningStartTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
      miningPeriod
      miningTry
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
      miningStartTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
      miningTry
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
      miningStartTime
      isForSale
      isMining
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
      miningTry
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
      miningStartTime
      isMining
      isForSale
      miningPeriod
      owner
      quadrants
      rarity
      tokenID
      value
      price
      miningTry
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

export const GET_COOLDOWN_PERIODS = gql`
  query GetCooldownPeriods {
    gemCooldowns {
      UniqueGemsCooldownPeriod
      RareGemsCooldownPeriod
      MythicGemsCooldownPeriod
      LegendaryGemsCooldownPeriod
      EpicGemsCooldownPeriod
    }
  }
`;

export const GET_TX_HISTORY = gql`
  query GetTxHistory($user: String!) {
    tradeHistories(where: {or:[{trader: $user}, {payer: $user}]}) {
      gemIds
      newId
      payer
      tradeType
      trader
      value
      date
    }
  }
`;
