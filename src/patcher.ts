import { faker } from "@faker-js/faker/locale/en";
import type { ObjectValue } from "./util";

let nameMap = new Map();

function generateHash(s: string) {
  let hash = 0;
  for (const char of s) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  return hash.toString();
}

export async function patchAvatar(original: ObjectValue): Promise<ObjectValue> {
  if (typeof original !== "string") {
    return original;
  }
  console.debug(`patching avatar ${original}`);
  return `https://api.dicebear.com/9.x/big-smile/svg?seed=${generateHash(
    original
  )}`;
}

export async function patchDisplayName(
  original: ObjectValue
): Promise<ObjectValue> {
  if (typeof original !== "string") {
    return original;
  }
  if (nameMap.has(original)) {
    return nameMap.get(original);
  }

  nameMap.set(original, faker.internet.displayName());
  return nameMap.get(original);
}
