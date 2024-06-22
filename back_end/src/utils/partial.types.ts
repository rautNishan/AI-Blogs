export type CustomPartialType<T> = {
  [P in keyof T]?: T[P];
};

