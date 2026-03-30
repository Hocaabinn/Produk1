import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
<<<<<<< HEAD
=======
    "check_db.js",
    "check_db2.js",
    "fetch_openapi.js",
>>>>>>> 59078d26e018fb5fe874e988daee85ba0518157d
  ]),
]);

export default eslintConfig;
