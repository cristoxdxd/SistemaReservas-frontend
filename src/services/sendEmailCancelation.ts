import { email } from "../models/email.interface";

export async function sendEmailCancelation(email: email) {
  const response = await fetch("/api/send-email/cancelation/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...email }),
  });

  const data = await response.json();
  console.log(data);
  return data;
}