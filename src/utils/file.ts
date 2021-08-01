export const bytesToSize = (bytes: number): string => {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  if (bytes === 0) return '0 B';
  let i = Math.floor(Math.log(bytes) / Math.log(1024));
  if (i > 4) {
    i = 4;
  }
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
};
