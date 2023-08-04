#! /usr/bin/env node

/*
 * @Author       : 魏威 <1209562577@qq.com>
 * @Date         : 2023-07-20 15:02 周4
 * @Description  :
 */
import inquirer from "inquirer";
import inquirerPrompt from "inquirer-autocomplete-prompt";

import dedent from "dedent";
import { SimpleGit, SimpleGitOptions, simpleGit } from "simple-git";
import { intersection } from "lodash-es";

inquirer.registerPrompt("autocomplete", inquirerPrompt);

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

async function showGitStatus() {
  const gitInstance = new GitMananger().getInstance();
  const statusInfo = await gitInstance.status();
  const { staged, created, modified, deleted } = statusInfo;
  // prettier-ignore
  console.log(dedent`
    ============ git info ============
    当前分支: ${statusInfo.current} ahead: ${statusInfo.ahead} behind: ${statusInfo.behind}
    A: ${intersection(staged, created).length}
    M: ${intersection(staged, modified).length}
    D: ${intersection(staged, deleted).length}
    =================================
  `);
  const promptResult = await inquirer.prompt({
    name: "promptResult",
    type: "confirm",
    message: "提交基本信息如上，是否继续提交?"
  });
  if (!promptResult.promptResult) {
    return Promise.reject("终止提交");
  }
}

enum DetailType {
  OneLine,
  MutiLine
}

async function confirmCommitMsg() {
  const promptValues = await inquirer.prompt([
    {
      name: "detailType",
      type: "list",
      message: "请选择提交msg的格式",
      choices: [
        { name: "单行", value: DetailType.OneLine },
        { name: "多行", value: DetailType.MutiLine }
      ]
    },
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
      name: "scope",
      type: "input",
      message: "请填写作用范围（scope）"
    },
    {
      name: "detail",
      type: "input",
      message: "请填写详细信息（detail）",
      when: (answer) => {
        return answer.detailType === DetailType.OneLine;
      }
    },
    {
      name: "detail",
      type: "editor",
      message: "请填写详细信息（detail）",
      when: (answer) => {
        return answer.detailType === DetailType.MutiLine;
      }
    }
  ]);

  const typeInfo = TypeInfoList.find((t) => t.type === promptValues.type);

  /** 根据不同类型生产不同的msg
   ************************************************/
  let commitMsg: string;
  switch (promptValues.detailType as DetailType) {
    case DetailType.OneLine:
      commitMsg =
        `${typeInfo.emoji} ${typeInfo.type}` +
        (promptValues.scope ? ` <${promptValues.scope}>` : "") +
        (promptValues.detail ? ` ${promptValues.detail}` : "");
      break;
    case DetailType.MutiLine:
      commitMsg =
        `${typeInfo.emoji} ${typeInfo.type}` +
        (promptValues.scope ? ` <${promptValues.scope}>` : "") +
        (promptValues.detail ? `\n${promptValues.detail}` : "");
      break;
  }
  commitMsg = commitMsg.trimEnd();
  console.log("\n");
  console.log(commitMsg);
  console.log("\n");
  const comfirmCommit = await inquirer.prompt({
    name: "sureToCommit",
    type: "confirm",
    message: "提交msg如上，是否继续提交?"
  });
  if (!comfirmCommit.sureToCommit) {
    return;
  }
  try {
    const gitInstance = new GitMananger().getInstance();
    await gitInstance.commit(commitMsg);
    console.log("✔️ git commit 提交成功!");
  } catch (error) {
    console.log("❌ git commit 提交失败!");
    console.log(error);
  }
}

async function main() {
  try {
    await showGitStatus();
    await confirmCommitMsg();
  } catch (error) {
    console.log(error);
    return;
  }
}

main();
