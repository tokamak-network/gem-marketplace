import { formatUnits } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import MarketplaceABI from "@/abi/marketplace.json";
import RandomPackABI from "@/abi/randomPack.json";
import GemFactoryABI from "@/abi/gemfactory.json";

export function trimAddress(args: {
  address: string | `0x${string}` | undefined;
  firstChar?: number;
  lastChar?: number;
  dots?: string;
}): string {
  if (args?.address === undefined) {
    return "";
  }
  const { address, firstChar, lastChar, dots } = args;
  const firstChatAt = address.substring(0, firstChar ?? 6);
  const lastCharAt = address.substring(address.length - (lastChar ?? 4));
  return `${firstChatAt}${dots ?? "..."}${lastCharAt}`;
}

export function forgeGemsColor(pair1: number[], pair2: number[]) {
  const results = new Set<string>();
  const [a1, a2] = pair1;
  const [b1, b2] = pair2;

  if (a1 === a2 && b1 === b2) {
    // Two same solids
    if (a1 === b1) {
      results.add(JSON.stringify([a1, a1]));
    } else {
      results.add(JSON.stringify([a1, b1]));
    }
  } else if (a1 === a2 || b1 === b2) {
    // One solid and one gradient
    const solid = a1 === a2 ? a1 : b1;
    const gradient = a1 === a2 ? [b1, b2] : [a1, a2];

    if (gradient.includes(solid)) {
      results.add(JSON.stringify(gradient));
    } else {
      results.add(JSON.stringify([solid, gradient[0]]));
      results.add(JSON.stringify([solid, gradient[1]]));
    }
  } else if ((a1 === b1 && a2 === b2) || (a1 === b2 && a2 === b1)) {
    // Two same gradients
    results.add(JSON.stringify([a1, a2]));
  } else {
    // Two different gradients
    results.add(JSON.stringify([a1, b1]));
    results.add(JSON.stringify([a1, b2]));
    results.add(JSON.stringify([a2, b1]));
    results.add(JSON.stringify([a2, b2]));
  }

  // Convert results from JSON strings back to arrays
  return Array.from(results).map(pair => JSON.parse(pair) as number[]);

}

export function bnToNumber(value: bigint, decimals: number = 18) {
  if (!value) return "0";
  return formatUnits(value, decimals);
}

export function arraysEqual(arr1: number[], arr2: number[]) {
  if (arr1.length !== arr2.length) return false; // Arrays must have the same length
  return arr1.every((value, index) => value === arr2[index]); // Compare each element
}

export const getStakingIndex = async (contractAddress: `0x${string}`) => {
  const result = await readContract(config, {
    abi: MarketplaceABI,
    address: contractAddress,
    functionName: "getStakingIndex",
  });
  return result;
};

export const getRandomPackFee = async (contractAddress: `0x${string}`) => {
  const result: any = await readContract(config, {
    abi: RandomPackABI,
    address: contractAddress,
    functionName: "getRandomPackFees",
  });

  return result;
};

export const getTonFeesRate = async (contractAddress: `0x${string}`) => {
  const result: any = await readContract(config, {
    abi: MarketplaceABI,
    address: contractAddress,
    functionName: "getTonFeesRate",
  });

  return result;
};

export const getValueOfRarity = async (contractAddress: `0x${string}`, rarity: number) => {
  const result: any = await readContract(config, {
    abi: GemFactoryABI,
    address: contractAddress,
    functionName: "getValueBasedOnRarity",
    args: [rarity]
  });

  return result;
};

export function groupAndSortByDate(data: any) {
  if (data && data?.length > 0) {
    // Step 1: Group by date in 'YYYY-MM-DD' format
    const grouped = data?.reduce((acc: any, obj: any) => {
      const date = new Date(obj.date * 1000).toISOString().split("T")[0]; // Convert timestamp to 'YYYY-MM-DD'
      if (!acc[date]) acc[date] = [];
      acc[date].push(obj);
      return acc;
    }, {});

    // Step 2: Sort dates in descending order
    const sortedDates = Object.keys(grouped).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    // Step 3: Build final sorted array of groups
    return sortedDates.map((date) => ({
      date,
      items: grouped[date],
    }));
  }
  return null;
}
