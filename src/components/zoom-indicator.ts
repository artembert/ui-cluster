export const setZoomIndicator: (
  component: HTMLElement | null,
  zoomLevel: number
) => void = (component, zoomLevel) => {
  if (component) {
    component.innerText = "Zoom: " + zoomLevel.toFixed(3);
  }
};
