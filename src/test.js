import inquirer from "inquirer";

inquirer
  .prompt({
    name: 'type',
    message: "which type you want to commit?",
    type: "list",
    choices: ["feat", "fix", "docs"]
  })
  .then((value) => {
    console.log(
      "%c 🥓 value",
      "font-size:16px;color:#ffffff;background:#7551B8",
      value
    );
  });
