import { formatUnits } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import MarketplaceABI from "@/abi/marketplace.json";

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

export function forgeGemsColor(gem1: number[], gem2: number[]) {
  // Helper function to check if an array contains an element
  function contains(array: number[], element: number) {
    return array.indexOf(element) !== -1;
  }

  // Helper function to check if an array has both elements the same (i.e., [color, color])
  function isRepeatedColorGradient(gem: number[]) {
    return gem.length === 2 && gem[0] === gem[1];
  }

  // Treat [color, color] as [color] (i.e., as a solid color)
  if (isRepeatedColorGradient(gem1)) {
    gem1 = [gem1[0]];
  }
  if (isRepeatedColorGradient(gem2)) {
    gem2 = [gem2[0]];
  }

  // Check if both gems are solid (i.e., arrays with one element)
  if (gem1.length === 1 && gem2.length === 1) {
    if (gem1[0] === gem2[0]) {
      return [[gem1, gem1]]; // Same Solid -> Same Solid
    } else {
      return [
        [gem1, gem1],
        [gem2, gem2],
      ]; // Different Solid -> Gradient
    }
  }

  // Check if one gem is a gradient and the other is solid
  if (gem1.length === 2 && gem2.length === 1) {
    if (contains(gem1, gem2[0])) {
      return [gem1]; // One Gradient + One Solid (exists in Gradient) -> Same Gradient
    } else {
      return [
        [gem1[0], gem2[0]],
        [gem1[1], gem2[0]],
      ]; // One Gradient + One Solid (not exist in Gradient) -> 2 Gradient
    }
  }
  if (gem1.length === 1 && gem2.length === 2) {
    if (contains(gem2, gem1[0])) {
      return [gem2]; // One Gradient + One Solid (exists in Gradient) -> Same Gradient
    } else {
      return [
        [gem2[0], gem1[0]],
        [gem2[1], gem1[0]],
      ]; // One Gradient + One Solid (not exist in Gradient) -> 2 Gradient
    }
  }

  // Check if both gems are gradients (i.e., arrays with two elements)
  if (gem1.length === 2 && gem2.length === 2) {
    const newGradients: number[][] = [];

    // Handle case where one or both gems are repeated elements like [0, 0]
    const combinations = [
      [gem1[0], gem2[0]],
      [gem1[0], gem2[1]],
      [gem1[1], gem2[0]],
      [gem1[1], gem2[1]],
    ];

    // Filter out duplicates by sorting each gradient before adding it
    combinations.forEach((gradient) => {
      const sortedGradient = gradient.sort(); // Sort to treat [0,1] and [1,0] as the same
      if (
        !newGradients.some(
          (existing) =>
            existing[0] === sortedGradient[0] &&
            existing[1] === sortedGradient[1]
        )
      ) {
        newGradients.push(sortedGradient);
      }
    });

    return newGradients; // Return the unique gradients
  }
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
