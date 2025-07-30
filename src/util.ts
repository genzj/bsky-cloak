/* eslint-disable @typescript-eslint/no-explicit-any */
export type Patcher<V> = (original: V) => Promise<V>;
export type ObjectValue =
  | number
  | string
  | null
  | boolean
  | Record<string, any>
  | ObjectValue[];
export type ObjectValuePatcher = Patcher<ObjectValue>;

export async function deepMapOnKey(
  obj: ObjectValue,
  key: string,
  fn: ObjectValuePatcher
): Promise<ObjectValue> {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return await Promise.all(
      obj.map(async (ele) => await deepMapOnKey(ele as ObjectValue[], key, fn))
    );
  }

  const mapped: Record<string, ObjectValue> = {};
  for (const k in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      mapped[k] =
        k === key
          ? await fn(obj[k] as ObjectValue)
          : await deepMapOnKey(obj[k] as ObjectValue, key, fn);
    }
  }
  return mapped;
}
