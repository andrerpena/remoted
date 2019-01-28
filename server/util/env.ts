/**
 * Returns an environment variable. If the variable does not exist, returns the
 * default value. If the default value is not set, throws an exception
 * @param name
 * @param defaultValue
 * @throws aaa
 */
export function readEnvVariable(name: string, defaultValue?: string) {
  const result = process.env[name] || defaultValue;
  if (!result)
    throw new Error(`Cannot read environment variable. Variable name: ${name}`);
  return result;
}
