export const setClustersCounter: (
  count: number,
  counter: HTMLElement | null
) => void = (count, counter) => {
  if (!counter) {
    return;
  }
  const res = count.toString(10).padStart(3);
  counter.innerText = "Clusters: " + res;
};
