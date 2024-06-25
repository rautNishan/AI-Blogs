export function globalTransformer(typeToTransform: any, type: any) {
  console.log("");
}

export type GlobalTransformer<T> = {
  [P in keyof T]: T[P];
};
