export const setLayerIndicator: (
  component: HTMLElement | null,
  layer: string
) => void = (component, layer) => {
  if (component) {
    component.innerText = "Layer: " + layer;
  }
};
