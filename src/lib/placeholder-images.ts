import placeholderData from './placeholder-images.json';

type PlaceholderKey = keyof typeof placeholderData;

export function getPlaceholderImage(key: PlaceholderKey) {
  return placeholderData[key];
}
