import js from "@eslint/js"
import globals from "globals"
import { defineConfig } from "eslint/config"
export default defineConfig([
    {
        files: ["**/*.js"],
        plugins: { 
            js
        }, 
        extends: ["js/recommended"], 
        languageOptions: { 
            globals: globals.browser,
        },
        rules: {
            "semi": [2, "never"],
            "indent": [2, 4, { SwitchCase: 1 }],
            "quotes": [2, "double"],
            "no-multiple-empty-lines": [2, { max: 1 }],
	    "no-undef" : [0],
	    "no-unused-vars" : [0]
        }
    },
    { 
        files: ["**/*.js"], 
        languageOptions: { sourceType: "commonjs" } 
    },
])
