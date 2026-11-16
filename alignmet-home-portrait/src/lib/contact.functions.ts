import { createServerFn } from "@tanstack/react-start";
import { contactSchema, forwardContact } from "./contact-schema";

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => forwardContact(data, process.env['ALIGNMET_INBOX_SECRET']));