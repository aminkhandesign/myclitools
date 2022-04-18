#!/usr/bin/env node

import fs from "fs";

import { chromium } from "playwright";
import { exit } from "process";

let username = process.env.username;

let baseURL = process.env.BASE_URL || "https://scdev2.aacn.org";

console.log(`AACN welcomes you, ${username} !!!`);

/* paths to wake up...
   /education
   /nursing-excellence
   /certification
   /certification/get-certified
   /conferences-and-events
   /clinical-resources
   /store
   /store/cart
  */

async function runBrowser() {
  const browser = await chromium.launch();

  const page = await browser.newPage({
    acceptDownloads: true,
    baseURL,
    bypassCSP: true,
  });

  let start = performance.now();

  await page
    .goto("/")
    .then((response) => {
      let timeTaken = performance.now() - start;

      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("ERROR=>", err);
      process.exit(1);
    });
  start = performance.now();
  await page
    .goto("/education")
    .then((response) => {
      // console.log(response);
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
    });

  await page
    .goto("/nursing-excellence")
    .then((response) => {
      // console.log(response);
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
    });

  await page
    .goto("/certification")
    .then((response) => {
      // console.log(response);
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
    });

  await page
    .goto("/certification/get-certified")
    .then((response) => {
      // console.log(response);
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
      start = timeTaken;
    });

  await page
    .goto("/conferences-and-events")
    .then((response) => {
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
    });
  await page
    .goto("/clinical-resources")
    .then((response) => {
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
    });

  await page
    .goto("/store")
    .then((response) => {
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
    });

  await page
    .goto("/store/cart")
    .then((response) => {
      let timeTaken = performance.now() - start;
      console.log(`Successfull wakeup of ${response.url()} !!!`);
      console.log(` ${response.url()} took ${timeTaken} to respond \n`);
      start = timeTaken;
    })
    .catch((err) => {
      console.log("UhOh!!", err);
      process.exit(1);
    });
  return { browser, totaltime: start };
}
runBrowser()
  .then((res) => {
    res.browser.close();
    console.log(`TOTAL TIME: ${res.totaltime}`);
    process.exit(0);
  })
  .catch((err) => {
    console.log("THIS SCRIPT ERRORED!! =>", err);
  });
