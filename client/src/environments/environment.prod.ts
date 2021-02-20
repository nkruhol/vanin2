import { ProdFirebaseConfig, ProdRecaptchaKey } from "src/config";

export const environment = {
  production: true,
  api: "https://us-central1-vanin2.cloudfunctions.net",
  firebase: ProdFirebaseConfig,
  isRecapthaUsed: true,
  recaptchaKey: ProdRecaptchaKey,
};
