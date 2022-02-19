const getEnvValueBy = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env value for given key: ${key}`);
  }
  return value;
};

export default getEnvValueBy;
