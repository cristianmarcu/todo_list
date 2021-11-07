/**
 * @ref https://create-react-app.dev/docs/adding-custom-environment-variables/
 */

export const getEnv = (key) => {
  return process.env[`REACT_APP_${key}`];
};
