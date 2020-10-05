import { UserCredentials } from "../types";

const fnlnRegex = /^(?<firstchar>(?=[A-Za-z]))((?<alphachars>[A-Za-z])|(?<specialchars>[A-Za-z]['-](?=[A-Za-z]))|(?<spaces> (?=[A-Za-z])))*$/;

export const isString = (name: any): name is string =>
  typeof name === "string" || name instanceof String;

export const isRealName = (name: any) => isString(name) && fnlnRegex.test(name);

export const parseString = (str: any): string => {
  if (!str || !isString(str)) {
    throw new Error(`${str} is not a string`);
  }

  return str;
};

export const parseUserCredentials = (user: {
  username: any;
  password: any;
}): UserCredentials => ({
  username: parseString(user.username),
  password: parseString(user.password),
});
