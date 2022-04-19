/**
 * Base for constructing POM Files
 * that reside in the 'models' folder
 * Not to be used in test files
 *
 */
export class POM {
  page;

  BaseUrl;

  path;

  context;

  constructor({ page, baseUrl, browserContext }) {
    this.page = page;
    this.BaseUrl = baseUrl;
    if (browserContext) {
      this.context = browserContext;
    }
  }

  /**
   * This will goto the ${this.name} page , optional params can be added
   * @param {string} params optional query params that you may want to add
   */

  async goto(params = "") {
    await this.page.goto(this.path + params);
    await expect(this.page).toHaveURL(this.BaseUrl + this.path + params);
  }
}
