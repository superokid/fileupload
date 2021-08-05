export const bytesToSize = (bytes: number | undefined): string => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0 || bytes === undefined) return '0 B';
  let i = Math.floor(Math.log(bytes) / Math.log(1000));
  if (i > 4) {
    i = 4;
  }
  return Math.round(bytes / Math.pow(1000, i)) + ' ' + sizes[i];
};
