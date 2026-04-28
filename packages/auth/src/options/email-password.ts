import type { BetterAuthOptions } from "better-auth";
import type { Email } from "@repo/email/types";

import { sendEmail } from "@repo/email";

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  NOREPLY_EMAIL,
} from "@/constants";

export const emailPasswordOptions = {
  emailAndPassword: {
    onExistingUserSignUp: async ({ user }) => {
      const warningEmail: Email = {
        html: `<p>Someone is trying to sign up with your email: ${user.email}. If this was you, try signing in instead. If not, you can safely ignore this email.</p>`,
        text: `Someone is trying to sign up with your email: ${user.email}. If this was you, try signing in instead. If not, you can safely ignore this email.`,
        subject: "Sign-up attempt with your email",
        from: NOREPLY_EMAIL,
        to: user.email,
      };

      if (process.env.NODE_ENV === "production") {
        // Avoid awaiting the email sending in production to prevent timing attacks.
        void sendEmail({ email: warningEmail });
      } else {
        await sendEmail({ email: warningEmail });
      }
    },
    sendResetPassword: async ({ user, url }) => {
      const resetPasswordEmail: Email = {
        html: `<p>Click this link to reset your password: <a href="${url}">${url}</a></p>`,
        text: `Click this link to reset your password: ${url}`,
        subject: "Reset password",
        from: NOREPLY_EMAIL,
        to: user.email,
      };

      if (process.env.NODE_ENV === "production") {
        // Avoid awaiting the email sending in production to prevent timing attacks.
        void sendEmail({ email: resetPasswordEmail });
      } else {
        await sendEmail({ email: resetPasswordEmail });
      }
    },
    maxPasswordLength: MAX_PASSWORD_LENGTH,
    minPasswordLength: MIN_PASSWORD_LENGTH,
    revokeSessionsOnPasswordReset: true,
    requireEmailVerification: true,
    enabled: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      const verificationEmail: Email = {
        html: `<p>Click this link to verify your email address: <a href="${url}">${url}</a></p>`,
        text: `Click this link to verify your email address: ${url}`,
        subject: "Verify your email",
        from: NOREPLY_EMAIL,
        to: user.email,
      };

      if (process.env.NODE_ENV === "production") {
        // Avoid awaiting the email sending in production to prevent timing attacks.
        void sendEmail({ email: verificationEmail });
      } else {
        await sendEmail({ email: verificationEmail });
      }
    },
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
  },
} satisfies BetterAuthOptions;
