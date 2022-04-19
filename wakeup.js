#!/usr/bin/env node

import Chalk, { chalkStderr } from "chalk";
import fs from "fs";

import { chromium } from "playwright";
import { exit } from "process";

let username = process.env.username;

let baseURL = process.env.BASE_URL || "https://scdev.aacn.org";

console.log(
  Chalk.bold.bgGray(" AACN SCRIPT UTILS "),
  Chalk.bgBlue(" WAKEUP SITES \n")
);

let arrOfPaths = [
  "/",
  "/education",
  "/nursing-excellence",
  "/certification",
  "/certification/get-certified",
  "/conferences-and-events",
  "/clinical-resources",
  "/store",
  "/store/cart",
];
async function wakePage(page, path, timeout) {
  console.log(
    Chalk.bold.blueBright(`fetching ${Chalk.cyan(baseURL + path)} ....`)
  );
  let start = performance.now();
  let totalTime;
  await page
    .goto(path, { timeout })
    .then(async (response) => {
      await response.finished();
      let address = await response.serverAddr();
      console.log("Response Status", response.statusText());
      if (response.ok()) {
        let timeTaken = performance.now() - start;
        totalTime = Math.round(timeTaken);
        console.log(Chalk.green(`Successfull wakeup of ${response.url()} !!!`));
        console.log(`On Server ${address.ipAddress}`);
        console.log(
          ` ${response.url()}` +
            " took " +
            Chalk.bgMagenta(`${Math.floor(timeTaken)}s`) +
            " to respond \n"
        );
      } else {
        console.log(
          Chalk.magentaBright(
            `The server responded with a ${response.status()} \n`
          )
        );
        console.log(Chalk.magenta(`${response.statusText()}`));
      }
    })
    .catch((err) => {
      console.log(
        Chalk.redBright(
          `ERROR trying to connect with ${baseURL + path}: \n`,
          Chalk.redBright(err)
        )
      );
    });
  return totalTime;
}

async function runBrowser(paths) {
  const timeout = 180000;
  const browser = await chromium.launch();
  const thispage = await browser.newPage({
    acceptDownloads: true,
    baseURL,
    bypassCSP: true,
  });

  let table = [];
  for (let mypath of paths) {
    console.log(Chalk.bgMagenta(" PATH:   ", mypath + " "));
    let timeTaken = await wakePage(thispage, mypath, timeout);
    table = [...table, { path: mypath, seconds: Math.round(timeTaken / 1000) }];
  }

  await browser.close();
  return table;
}

runBrowser(arrOfPaths)
  .then((res) => {
    console.log(Chalk.green("ALL PATHS VISITED SUCCESSFULLY!!"));
    console.table(res);
    process.exit(0);
  })
  .catch((err) => {
    console.log("THIS SCRIPT ERRORED!! =>", err);
    process.exit(1);
  });
