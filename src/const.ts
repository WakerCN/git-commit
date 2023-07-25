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
