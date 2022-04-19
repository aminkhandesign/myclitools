import chalk from "chalk";
import { POM } from "./pom_base.js";

/**
 * This is a class that will give automate
 * the login process.
 * Use goto() to go to the login page
 * Use loginNetforum() to login to netforum
 * you will have to specify your credentials in the URL you pass in
 * Use isUserLoggedIn() to see if the user is logged in
 *
 */
export class LoginPage extends POM {
  path = "/membership/signin";

  /**
   * This takes an object so encolse the
   * parameters in {}
   * then assign 'page' to the page instance in your test.eg {page:page}
   * page should NOT be a URL.
   * assign baseUrl to the baseURL, or type in a URL.
   * assign the context of your test to the browserContext
   *
   */
  constructor({ page, baseUrl, browserContext }) {
    super({ page, baseUrl, browserContext });
  }

  async login(email, password) {
    await this.page.goto(this.path);
    await this.page
      .locator('[placeholder="Email\\ Address\\/Customer\\ ID"]')
      .fill(email);
    await this.page.locator('[placeholder="Password"]').fill(password);
    //await this.page.screenshot({ path: "fillinpassword.png" });
    // await Promise.all([
    //   // await expect(this.page.locator("#formresult")).toBeEmpty({
    //   //   timeout: 3000,
    //   await this.page.waitForNavigation({ timeout: 180000 }),
    //   // }),
    //   await this.page.locator('input:has-text("Sign In")').click(),
    // ]);
    await this.page.waitForSelector("#login-submit-sc");
    await this.page.click("#login-submit-sc");
    //await expect(this.page).toHaveURL(this.BaseUrl + '/membership/myaacn')
    console.log(`logging in done, page now at ${this.page.url()}`);
    await this.page.screenshot({ path: "loggedinBefore.png" });
    let message;
    // await Promise.all([
    //   await this.page.waitForNavigation({ timeout: 180000 }),
    //   await this.page.screenshot({ path: "loggedin.png" }),
    // ]);
    if (new URL(this.page.url()).pathname === "/membership/myaacn") {
      message = `Page successfully redirected to "/membership/myaccn" `;
    } else {
      message = `Unsuccessful in redirction, page is sent to ${this.page.url()}\n NOT "/membership/myaacn"`;
    }

    console.log(message);
    return this.page;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * the function returns the logged-in page
   * Credentials are saved in storage-states/temp/<protected_url>.json
   * @param protected_url should be in the format "http(s)://username:password\@\<domain>"
   * @returns an instance of a page logged into netforum
   */

  // static async loginNetforum(protected_url: string) {

  //   const browser = await chromium.launch();

  //   const browserContext = await browser.newContext({ baseURL: protected_url })

  //   LoginPage.nfPage = await browserContext.newPage()

  //   await LoginPage.nfPage.context().storageState({ path: `storage-states/temp/netforumLogin.json` })

  //   await LoginPage.nfPage.goto(protected_url)

  //   return LoginPage.nfPage
  // }

  /**
   *
   * @param param0 an object containing userName and page value.
   * @returns - an instance of the past in page which will be on the homescreen
   */
  static async isUserLoggedIn({ userName, page }) {
    await page.goto("/");

    let name = await page
      .locator(
        ".nav-utility > .nav__list > .nav__item > .item__label > .js-topmenu-username"
      )
      .allInnerTexts();

    console.log(`Logged in as ${name ? name : "couldnt find user"} `);

    return page;
  }
}
