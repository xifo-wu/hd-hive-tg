export function delay(microsecond: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, microsecond);
  });
}

export function getResolutionNumber(resolution: string) {
  if (resolution.toLocaleLowerCase() === '4k') {
    return 3840;
  }

  if (resolution.toLocaleLowerCase() === '2k') {
    return 2048;
  }

  return parseInt(resolution, 10);
}
