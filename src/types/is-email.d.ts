declare module "is-email" {
  const isEmail: (value: string) => boolean;

  // biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
  export default isEmail;
}
