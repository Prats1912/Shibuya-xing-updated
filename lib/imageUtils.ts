/**
 * Placeholder color utilities for image optimization
 * These provide fast, visually appropriate placeholders while images load
 */

export const imagePlaceholders: Record<string, string> = {
  // Dishes - warm tones
  "dish-ramen": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23533428'/%3E%3C/svg%3E",
  "dish-yakitori": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23664433'/%3E%3C/svg%3E",
  "dish-sushi": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23442211'/%3E%3C/svg%3E",
  "dish-curry": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%235c3d1f'/%3E%3C/svg%3E",
  // Gallery - neutral dark tones
  default: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='%23141414'/%3E%3C/svg%3E",
};

export function getPlaceholder(imagePath: string): string {
  // Extract image name from path
  const imageName = imagePath
    .split("/")
    .pop()
    ?.replace(/\.[^/.]+$/, "");
  return imagePlaceholders[imageName || ""] || imagePlaceholders.default;
}
