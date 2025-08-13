export const formatTitleToPath = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};

export const formatName = (name: string) => {
  return name.replace(/([a-z])([A-Z])/g, '$1 $2');
};
