import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "en-US",
  title: "SAF Advanced InSpec Profile Developer Course",
  description: "The MITRE Security Automation Framework Team's Advanced InSpec profile development course",

  base: process.env.GITHUB_DEPLOY === "true" ? "/inspec-advanced-developer/" : "/",
  theme,
});
