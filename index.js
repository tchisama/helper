#!/home/tchisama/nodejs/bin/node

import OpenAI from "openai";
import fs from "fs";
import { exec } from "child_process";
import chalk from "chalk";

const openai = new OpenAI({
  apiKey: "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",
});

const args = process.argv.slice(2);
let question;

if (args[0] === "x") {
  question = args.slice(1).join(" ");
} else {
  question = args.join(" ");
}

console.log(chalk.blue("(•ᴗ•) Hhmmm.."));

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content:
        "you are a pro linux user (ubuntu) and you will get provided with a question and your work is to return an direct command (prefer to be in one line just the command) to do what you get asked \n",
    },
    {
      role: "user",
      content: "how to remove a non empty folder",
    },
    {
      role: "assistant",
      content: "rm -r folder_name",
    },
    {
      role: "user",
      content:
        "how to make list of files and each file created after 2 sec of the other one",
    },
    {
      role: "assistant",
      content: "for i in {1..10}; do touch file_$i; sleep 2; done",
    },
    {
      role: "user",
      content: "how to get ipv4",
    },
    {
      role: "assistant",
      content: "ip addr show | grep inet | grep -v inet6 | awk '{print $2}'",
    },
    {
      role: "user",
      content: question,
    },
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

const answer = response.choices[0].message.content;

fs.appendFile(
  "hestory.txt",
  `

---------------
---------------

question:
    ${question}
answer:  
    ${answer}

`,
  function (err) {
    if (err) throw err;
  },
);

console.log(chalk.blue("use : "));
console.log(chalk.black.bgBlue(answer));

if (args[0] == "x") {
  exec(answer, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`${stdout}`);
  });
}
