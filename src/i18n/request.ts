import { getRequestConfig } from "next-intl/server";

import { enMessages, viMessages } from "@/messages/index";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as "en" | "vi")) {
    locale = routing.defaultLocale;
  }

  let messages;
  switch (locale) {
    case "vi":
      messages = viMessages;
      break;
    case "en":
      messages = enMessages;
      break;
    default:
      messages = viMessages;
  }

  return {
    locale,
    messages,
  };
});
