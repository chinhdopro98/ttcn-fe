const imageModules = import.meta.glob("/src/assets/image/**/*", {
  eager: true,
  import: "default",
}) as Record<string, string>;

export const getImageUrl = (relativePath: string): string => {
  return imageModules[`/src/assets/image/${relativePath}`] || "";
};
