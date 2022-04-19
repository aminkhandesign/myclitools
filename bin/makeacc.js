#!/usr/bin/env node
import Chalk, { chalkStderr } from "chalk";
import fs from "fs";

import { chromium } from "playwright";
import { exit } from "process";

import { User } from "../src/user.js";
import { LoginPage } from "../src/login-page.js";
import { CreateAccountPage } from "../src/create-account.js";

let baseURL = process.env.BASE_URL || "https://scdev.aacn.org";
console.log(baseURL);
console.log(
  Chalk.bold.bgGray(" AACN SCRIPT UTILS "),
  Chalk.bgBlue("MAKE AN ACCOUNT \n")
);

let myUserInstance = new User(10);
let myRandomUser = myUserInstance.Random;

console.table(myRandomUser);

async function runBrowser() {
  const timeout = 180000;
  const browser = await chromium.launch();
  const createAccPage = await browser.newPage({
    acceptDownloads: true,
    baseURL,
    bypassCSP: true,
  });
  const loginAccPage = await browser.newPage({
    acceptDownloads: true,
    baseURL,
    bypassCSP: true,
  });

  console.log(Chalk.bold.blue("PAGE"), createAccPage.url());

  let createdAccount = new CreateAccountPage({
    page: createAccPage,
    baseUrl: baseURL,
    browserContext: browser,
  });

  // console.log(Chalk.bold.redBright("PAGE"), createdAccount);
  let accountpage = await createdAccount.createMemberAccount({
    ...myRandomUser,
  });

  console.log(`Begin Logging in as ${myRandomUser.FirstName}....`);

  let loginpage = new LoginPage({ page: loginAccPage, baseUrl: baseURL });

  let loggedInPage = await loginpage.login(
    myRandomUser.email,
    myUserInstance.Generic.password
  );

  console.log("Check if log in was successful....");

  await LoginPage.isUserLoggedIn({
    userName: myRandomUser.FirstName,
    page: loggedInPage,
  });

  await browser.close();
}
await runBrowser();
