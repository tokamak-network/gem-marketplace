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

export function forgeGemsColor(gem1: string[], gem2: string[]) {
  // Helper function to check if an array contains an element
  function contains(array: string[], element: string) {
      return array.indexOf(element) !== -1;
  }

  // Check if both gems are solid (i.e., arrays with one element)
  if (gem1.length === 1 && gem2.length === 1) {
      if (gem1[0] === gem2[0]) {
          return [gem1]; // Same Solid -> Same Solid
      } else {
          return [gem1, gem2]; // Different Solid -> Gradient
      }
  }

  // Check if one gem is a gradient and the other is solid
  if (gem1.length === 2 && gem2.length === 1) {
      if (contains(gem1, gem2[0])) {
          return [gem1]; // One Gradient + One Solid (exists in Gradient) -> Same Gradient
      } else {
          return [[gem1[0], gem2[0]], [gem1[1], gem2[0]]]; // One Gradient + One Solid (not exist in Gradient) -> 2 Gradient
      }
  }
  if (gem1.length === 1 && gem2.length === 2) {
      if (contains(gem2, gem1[0])) {
          return [gem2]; // One Gradient + One Solid (exists in Gradient) -> Same Gradient
      } else {
          return [[gem2[0], gem1[0]], [gem2[1], gem1[0]]]; // One Gradient + One Solid (not exist in Gradient) -> 2 Gradient
      }
  }

  // Check if both gems are gradients (i.e., arrays with two elements)
  if (gem1.length === 2 && gem2.length === 2) {
      if (gem1[0] === gem2[0] && gem1[1] === gem2[1]) {
          return [gem1]; // Same Gradient -> Same Gradient
      } else if (contains(gem1, gem2[0]) || contains(gem1, gem2[1])) {
          let newGradients = [];
          newGradients.push([gem1[0], gem2[0]]);
          newGradients.push([gem1[0], gem2[1]]);
          newGradients.push([gem1[1], gem2[0]]);
          newGradients.push([gem1[1], gem2[1]]);
          return newGradients; // Two Same Gradient but 1 Colour Repetition -> 3 Gradient
      } else {
          let newGradients = [];
          newGradients.push([gem1[0], gem2[0]]);
          newGradients.push([gem1[0], gem2[1]]);
          newGradients.push([gem1[1], gem2[0]]);
          newGradients.push([gem1[1], gem2[1]]);
          return newGradients; // Two Different Gradient -> 4 Gradient
      }
  }
}
