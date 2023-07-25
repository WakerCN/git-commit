/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-20 15:59 周4
 * @Description  :
 */
import { defineConfig } from "rollup";
import ts from "@rollup/plugin-typescript";

export default defineConfig({
  input: ["src/index.ts"],
  external: ["inquirer", "typescript", "simple-git"],
  output: [
    {
      dir: "dist",
      format: "esm"
    }
  ],
  plugins: [ts()]
});
