function commafy(
  num: number | string | undefined | null,
  decilamPoint?: number,
  removeComma?: boolean,
  defaultValue?: string
) {
  const defaultDecilamPoint = decilamPoint ?? 100;
  if (num === undefined || num === null) {
    // if (defaultValueIsUndefined) return undefined;
    return defaultValue ?? "-";
  }
  //@ts-ignore
  if (isNaN(num)) {
    // if (defaultValueIsUndefined) return undefined;
    return defaultValue ?? "-";
  }
  if (num === 0 || num === "0") {
    if (defaultDecilamPoint === 0) {
      return defaultValue ?? "0";
    }
    if (defaultDecilamPoint) {
      return `0.${"0".repeat(defaultDecilamPoint)}`;
    }
    return defaultValue ?? "0.00";
  }
  let str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 2) {
    str[1] = str[1].slice(0, defaultDecilamPoint);
  }
  if (str[1] === undefined) {
    str[1] = `${"0".repeat(defaultDecilamPoint)}`;
  }
  if (str[1] === "") {
    return str[0];
  }
  const result = str.join(".").replaceAll(" ", "");
  return removeComma ? result.replaceAll(",", "") : result;
}

export function commafyWithUndefined(
  num: number | string | undefined | null,
  decilamPoint?: number,
  removeComma?: boolean,
  defaultValueIsUndefined?: boolean
) {
  const defaultDecilamPoint = decilamPoint ?? 2;
  if (num === undefined || num === null) {
    if (defaultValueIsUndefined) return undefined;
    return "-";
  }
  //@ts-ignore
  if (isNaN(num)) {
    if (defaultValueIsUndefined) return undefined;
    return "-";
  }
  if (num === 0 || num === "0") {
    if (defaultDecilamPoint === 0) {
      return "0";
    }
    if (defaultDecilamPoint) {
      return `0.${"0".repeat(defaultDecilamPoint)}`;
    }
    return "0.00";
  }
  let str = num.toString().split(".");
  if (str[0].length >= 4) {
    str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  }
  if (str[1] && str[1].length >= 2) {
    str[1] = str[1].slice(0, defaultDecilamPoint);
  }
  if (str[1] === undefined) {
    str[1] = `${"0".repeat(defaultDecilamPoint)}`;
  }
  if (str[1] === "") {
    return str[0];
  }
  const result = str.join(".").replaceAll(" ", "");
  return removeComma ? result.replaceAll(",", "") : result;
}

export default commafy;
