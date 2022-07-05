export type KeyMap = {
  [key: string]: number;
};

export interface Keys {
  readonly __keys__?: KeyMap;
}

export function hasKeys(obj: Keys): obj is Required<Keys> {
  return (
    typeof obj.__keys__ == "object" && Object.keys(obj.__keys__).length > 0
  );
}

export function setKeys(obj: Keys, keys: KeyMap): void {
  Object.assign(obj.__keys__ as KeyMap, keys);
}
