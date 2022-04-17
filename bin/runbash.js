#!/usr/bin/env node

import { exec } from "child_process";

console.log("hello there , how are you doing?");

exec("ls -la", (err, out, serr) => {
  if (err) {
    throw new Error("THIS IS THE ERROR==>", err);
  } else {
    console.log(out);
  }
});
