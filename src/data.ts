import { SITE_EMAIL_NAME } from "astro:env/server";

const name = "Stef Korporaal";
const siteDomain = new URL(import.meta.env.SITE).hostname;

export const SITE_DATA = {
    name,
    description: `Personal website of ${name}`,
    url: siteDomain,
    email: `${SITE_EMAIL_NAME}@${siteDomain}`,
    github: "https://github.com/Hellrespawn",
    linkedin: "https://www.linkedin.com/in/stef-korporaal-52b412168/",
    builtAt: new Date(),
};
