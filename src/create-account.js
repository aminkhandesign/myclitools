import { POM } from "./pom_base.js";
import { User } from "./user.js";

export class CreateAccountPage extends POM {
  path = "/membership/create-account";

  constructor({ page, baseUrl, browserContext }) {
    super({ page, baseUrl, browserContext });

    console.log("CREATE ACCOUNT >>", this.path, this.BaseUrl);
  }

  async createMemberAccount(userDetails) {
    let newUser = new User({ entropy: 10 });

    let my_user_firstname = userDetails.FirstName ?? newUser.Member.FirstName;
    let my_user_lastname = userDetails.LastName ?? newUser.Member.LastName;
    let my_user_email = userDetails.email ?? newUser.Member.email;
    let my_user_password = userDetails.password ?? newUser.Member.password;
    let my_user_address1 =
      userDetails.Address?.line1 ?? newUser.Member.address.line1;
    let my_user_address2 =
      userDetails.Address?.line2 ?? newUser.Member.address.line2;
    let my_user_address_city =
      userDetails.Address?.city ?? newUser.Member.address.city;
    let my_user_address_state =
      userDetails.Address?.state ?? newUser.Member.address.state;
    let my_user_address_country =
      userDetails.Address?.country ?? newUser.Member.address.country;
    let my_user_address_zip =
      userDetails.Address?.zip ?? newUser.Member.address.zip;
    let my_user_birthday = userDetails.birthday ?? newUser.Member.birthday;

    // actions
    await this.page.goto(this.BaseUrl + this.path);
    console.log("PAGE NOW AT ", this.page.url());
    // Click [placeholder="First\ Name"]
    await this.page
      .locator('[placeholder="First\\ Name"]', { timeout: 180000 })
      .click();

    // Fill [placeholder="First\ Name"]
    await this.page
      .locator('[placeholder="First\\ Name"]')
      .fill(my_user_firstname);

    // Fill [placeholder="Last\ Name"]
    await this.page
      .locator('[placeholder="Last\\ Name"]')
      .fill(my_user_lastname);

    // Fill [placeholder="Email"]
    await this.page.locator('[placeholder="Email"]').fill(my_user_email);

    // Fill [placeholder="Password"]
    await this.page.locator('[placeholder="Password"]').fill(my_user_password);

    // Fill [placeholder="Password\ Confirm"]
    await this.page
      .locator('[placeholder="Password\\ Confirm"]')
      .fill(my_user_password);

    // Click text=Create eccount
    await this.page.locator("text=Create Account").click();


    
    // Go to https://scqa.aacn.org/membership/membership-options
    //await this.page.waitForNavigation()

    //Might need to enclose a wait for navigation with the click
    //  await Promise.all( [page.waitForNavigation(),

    // Click input[name="af3557a2-cc20-46f1-aa8a-97b1b37dde77-submit"]

    
    await this.page
      .locator('input[name="af3557a2-cc20-46f1-aa8a-97b1b37dde77-submit"]')
      .click();
    // ])

    // Fill #Female

    await this.page.click(
      ".gender > .form-custom-radio:nth-child(2) .radio-bg"
    );

    // Click .form-input div:nth-child(2) label .radio-bg >> nth=0
    //await this.page.locator('.form-input div:nth-child(2) label .radio-bg').first().click();

    // Click [placeholder="Phone\ Number"]
    await this.page.locator('[placeholder="Phone\\ Number"]').click();

    // Fill [placeholder="Phone\ Number"]
    await this.page
      .locator('[placeholder="Phone\\ Number"]')
      .fill("5555555555");

    // Click [placeholder="Address\ 1"]
    await this.page.locator('[placeholder="Address\\ 1"]').click();

    // Fill [placeholder="Address\ 1"]
    await this.page
      .locator('[placeholder="Address\\ 1"]')
      .fill(my_user_address1);

    // Click [placeholder="Address\ 2"]
    await this.page.locator('[placeholder="Address\\ 2"]').click();

    // Fill [placeholder="Address\ 2"]
    await this.page
      .locator('[placeholder="Address\\ 2"]')
      .fill(my_user_address2);

    // Click [placeholder="City"]
    await this.page.locator('[placeholder="City"]').click();

    // Fill [placeholder="City"]
    await this.page.locator('[placeholder="City"]').fill(my_user_address_city);

    // Select CA
    await this.page
      .locator('select[name="IndividualAddress\\.State"]')
      .selectOption(my_user_address_state);

    // Click [placeholder="Zip"]
    await this.page.locator('[placeholder="Zip"]').click();

    // Fill [placeholder="Zip"]
    await this.page.locator('[placeholder="Zip"]').fill(my_user_address_zip);

    // Select DECLINE
    await this.page
      .locator('select[name="YearsOfExperience"]')
      .selectOption("DECLINE");

    // Select DECLINE
    await this.page
      .locator('select[name="PrimaryAreaEmployed"]')
      .selectOption("DECLINE");

    // Select DECLINE
    await this.page
      .locator('select[name="PrimaryPositionHeld"]')
      .selectOption("DECLINE");

    // Select Other
    await this.page.locator('select[name="ReasonTo"]').selectOption("Other");

    // Click text=Birth Date * Minimum age: 18 years old. >> span >> nth=2
    await this.page.fill("#BirthDate", my_user_birthday);

    // Click td:nth-child(7) >> nth=0
    await this.page.click(
      ".auto-renew__input > .form-custom-radio:nth-child(1) .radio-bg"
    );

    // Click text=Submit
    await this.page.locator("text=Submit").click();

    //await this.page.waitForNavigation();
    // Click text=Checkout
    await this.page.locator("text=Checkout").click();

    console.log("PAGE NOW AT ", this.page.url());

    // Select bf8a1b5f-5775-47ca-af46-ff0c6ed93293
    //await this.page.locator('text=Select an address123 Test Road Select an address >> select[name="AddressId"]').click()
    // await this.page.click('.form-input:nth-child(1) #AddressId');

    // // Fill "5e84bb55-a775-4643-98e2-2c1c8dee1f0c" on <select> .form-input:nth-child(1) #AddressId
    // // 		const option = await this.page.$(my_user_address1);
    // // await page.selectOption('select#colors', option);
    // await this.page.selectOption('.form-input:nth-child(1) text', my_user_address1);
    //const val = await this.page.$eval(`text=${my_user_address1}`, el => el.value)
    //await this.page.locator(`text=Select an address${my_user_address1} Select an address >> select[name="AddressId"]`).selectOption(val);
    await this.page
      .locator('select[name="AddressId"]')
      .first()
      .selectOption({ label: my_user_address1 });

    //await this.page.locator(`text=${my_user_address1}`).first().click()
    //await this.page.selectOption('id="AddressId"', my_user_address1)
    // Click text=Save and Continue
    await this.page.locator("text=Save and Continue").click();

    // Click [placeholder="Card\ Holder\ Name"]
    await this.page.locator('[placeholder="Card\\ Holder\\ Name"]').click();

    // Fill [placeholder="Card\ Holder\ Name"]
    await this.page
      .locator('[placeholder="Card\\ Holder\\ Name"]')
      .fill(my_user_firstname + " " + my_user_lastname);

    // Click [placeholder="Card\ Number"]
    await this.page.locator('[placeholder="Card\\ Number"]').click();

    // Fill [placeholder="Card\ Number"]
    await this.page
      .locator('[placeholder="Card\\ Number"]')
      .fill(String(newUser.creditCard.Num));

    // Click [placeholder="CVV"]
    await this.page.locator('[placeholder="CVV"]').click();

    // Fill [placeholder="CVV"]
    await this.page.locator('[placeholder="CVV"]').fill("123");

    // Click input:has-text("Place Order")
    await this.page.locator('input:has-text("Place Order")').click();

    await this.page.waitForNavigation();

    // Go to https://scqa.aacn.org/store/receipt
    await this.page.goto(this.BaseUrl + "/store/receipt");

    console.log("PAGE NOW AT ", this.page.url());

    await this.page.goto(this.BaseUrl);

    return this.page;
  }
}
