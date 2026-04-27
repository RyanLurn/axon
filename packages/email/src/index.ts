import type { Email } from "@/types";

import { sendWithEthereal } from "@/adapters/ethereal/send";

export async function sendEmail({ email }: { email: Email }) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Email sending not yet implemented for production");
  }

  await sendWithEthereal({ email });
}
