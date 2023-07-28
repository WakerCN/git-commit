/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-20 15:02 周4
 * @Description  :
 */
import iq from "inquirer";
// import { TypeInfoList } from "./const";


import {
  simpleGit,
  CleanOptions,
  SimpleGit,
  SimpleGitOptions
} from "simple-git";


/** 提交类型包含的信息 */
export interface CommitTypeInfo {
  /** 类型 */
  type: string;
  /** 类型对应表情 */
  emoji: string;
  /** 详情 */
  detail: string;
}

/** Commmit type全量信息 */
export const TypeInfoList: CommitTypeInfo[] = [
  /** 主要type
  -------------------------------------- */
  { type: "feat", emoji: "✨", detail: "增加新功能" },
  { type: "fix", emoji: "🐞", detail: "修复bug" },

  /** 特殊
  -------------------------------------- */
  { type: "docs", emoji: "📃", detail: "文档相关的内容" },
  { type: "style", emoji: "💄", detail: "代码格式改动，不改变语义" },
  { type: "build", emoji: "📦", detail: "构造工具改动，例如webpack，npm" },
  { type: "refactor", emoji: "🔨", detail: "代码重构" },

  /** 其他
  -------------------------------------- */
  { type: "test", emoji: "🧪", detail: "添加测试或者修改现有测试" },
  { type: "perf", emoji: "⚡", detail: "提高性能" },
  { type: "ci", emoji: "💻", detail: "与CI（持续集成服务）有关的改动" },
  { type: "chore", emoji: "🔧", detail: "构建过程或辅助工具的变动" }
];

/** type list */
export const typeList = TypeInfoList.map((info) => info.type);
export const typeWhithEmojiList = TypeInfoList.map(
  (info) => info.emoji + " " + info.type
);


export class GitMananger {
  public constructor() { }

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
  const promptValues = await iq.prompt([
    {
      name: "type",
      message: "选择提交类型",
      type: "list",
      default: "feat",
      pageSize: 12,
      choices: TypeInfoList.map((info) => ({
        name: `${info.emoji} ${info.type}`,
        value: info.type
      }))
    },
    {
      name: 'scope',
      type: 'input',
      message: "请填写作用范围（scope）",
    },
    {
      name: 'detail',
      type: 'input',
      message: "请填写详细信息（detail）",
    }
  ]);
  const gitManager = new GitMananger().getInstance();
  const typeInfo = TypeInfoList.find((t) => t.type === promptValues.type)
  const commitMsg = `${typeInfo.emoji} ${typeInfo.type} <${promptValues.scope}>\n${promptValues.detail}`
  console.log(commitMsg)
  await gitManager.commit(`${typeInfo.emoji} ${typeInfo.type} <${promptValues.scope}>\n${promptValues.detail}`);
}

export default main();
