import { Faker, en, generateMersenne32Randomizer } from "@faker-js/faker";
import { settingsManager } from "./settings";
import type { ObjectValue } from "./util";

const nameMap = new Map<string, string>();
let faker: Faker | undefined = undefined;

function generateHash(s: string): number {
  let hash = settingsManager.seed;
  for (const char of s) {
    hash = (hash << 5) - hash + char.charCodeAt(0);
    hash |= 0; // Constrain to 32bit integer
  }
  return hash;
}

export async function patchAvatar(original: ObjectValue): Promise<ObjectValue> {
  if (typeof original !== "string") {
    return original;
  }
  console.debug(`patching avatar ${original}`);
  return `https://api.dicebear.com/9.x/${
    settingsManager.avatarStyle
  }/svg?seed=${generateHash(original).toString()}`;
}

function getFaker(): Faker {
  if (!faker) {
    const randomizer = generateMersenne32Randomizer(settingsManager.seed);
    faker = new Faker({
      locale: en,
      randomizer: randomizer,
    });
  }
  return faker;
}

function pickByHash<T>(hashKey: string, array?: T[]): T {
  if (!array || array.length === 0) {
    throw new Error("Array cannot be null, undefined or empty");
  }
  const hash = Math.abs(generateHash(hashKey));
  const index = hash % array.length;
  return array[index];
}

export async function patchDisplayName(
  original: ObjectValue
): Promise<ObjectValue> {
  if (typeof original !== "string") {
    return original;
  }
  const stored = nameMap.get(original);
  if (typeof stored === "string") {
    return stored;
  }

  const firstName = pickByHash(
    original,
    getFaker().definitions.person.first_name.generic
  );
  const lastName = pickByHash(
    original,
    getFaker().definitions.person.last_name.generic
  );

  const name = `${firstName} ${lastName}`;
  nameMap.set(original, name);
  return name;
}
