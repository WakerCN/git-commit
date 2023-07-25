/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-20 15:02 周4
 * @Description  :
 */
import iq from "inquirer";
import { TypeInfoList } from "./const.ts";
import {
  simpleGit,
  CleanOptions,
  SimpleGit,
  SimpleGitOptions
} from "simple-git";

export class GitMananger {
  public constructor() {}

  private static sgInstance: SimpleGit;

  public getInstance(): SimpleGit {
    if (!GitMananger.sgInstance) {
      const options: Partial<SimpleGitOptions> = {
        baseDir: process.cwd(),
        binary: "git",
        maxConcurrentProcesses: 6,
        trimmed: false
      };
      GitMananger.sgInstance = simpleGit(options);
    }
    return GitMananger.sgInstance;
  }

  public commit(msg: string) {
    GitMananger.sgInstance.commit(msg);
  }
}

async function main() {
  const value = await iq.prompt({
    name: "type",
    message: "选择提交类型",
    type: "list",
    default: "feat",
    choices: TypeInfoList.map((info) => ({
      name: `${info.emoji} ${info.type}`,
      value: info.type
    }))
  });
  const gitManager = new GitMananger().getInstance();
  gitManager.commit(value);
}

export default main();
