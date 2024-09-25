import { EnvVariable } from "../types/env";

const getEnvVariable = (name: EnvVariable): string => {
    const variable = process.env[name];
    if (!variable) throw new Error(`${name} is not defined`);
    return variable;
};

export const BASE_URL = getEnvVariable("VITE_BASE_URL");
export const BOOKING_URL = getEnvVariable("VITE_BOOKING_URL");
export const CONTACT_URL = getEnvVariable("VITE_CONTACT_URL");
export const STRAPI_URL = getEnvVariable("VITE_STRAPI_URL");
export const STRAPI_API_TOKEN = getEnvVariable("VITE_STRAPI_API_TOKEN");
