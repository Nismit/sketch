import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export const boxObject = () => {
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  const box = new Mesh(geometry, material);
  return box;
};
