import { APP_NAME } from "../config/app";
import { getTransporter } from "../config/mail";
import { hbsToHtml, isEmptyStr } from "./dataFormat";

export async function sendOtp(
  userId: string,
  otp: string,
  idType: string,
  userName: string
) {
  try {
    if (idType === "mobile") {
      await messageOtp(userId, otp, userName);
    } else if (idType === "email") {
      await mailOtp(userId, otp, userName);
    }
  } catch (error) {
    console.log("OTP not sent");
    console.log(error);
  }
}

async function messageOtp(userId: string, otp: string, userName: string) {
  console.log(`Sending OTP to ${userName} on mobile is not supported yet.`);
  console.log("Please consider setting up mailing OTP as an alternative.");
}

async function mailOtp(userId: string, otp: string, userName: string) {
  try {
    // Generate the HTML email template using hbsToHtml function
    const emailHTML = await hbsToHtml("registration_otp.hbs", {
      name: userName,
      otp
    });

    // Send the email using the sendMail function
    await sendMail(
      [userId],
      isEmptyStr(APP_NAME)
        ? `Verification Code for ${APP_NAME}`
        : "Verification Code",
      emailHTML // Send the compiled HTML as email body
    );
  } catch (error) {
    console.log("Error sending mail OTP", error);
  }
}

export async function sendMail(
  recipients: string[],
  subject: string,
  html: string
) {
  try {
    const results = await Promise.all(
      recipients.map(async (recipient) => {
        try {
          const transporter = getTransporter();
          await transporter.sendMail({
            to: recipient,
            subject: subject,
            html: html
          });
          return { recipient: recipient, sent: true };
        } catch (error: any) {
          console.log(error);
          return { recipient: recipient, sent: false, error: error.message };
        }
      })
    );
    return results;
  } catch (error) {
    throw new Error("Failed to send emails");
  }
}
