const genericAddress = {
  line1: "123 Test Road",
  line2: "orannge county",
  zip: "92630",
  city: "Aliso Viejo",
  state: "CA",
  stateFull: "California",
  country: "USA",
};

export class User {
  //types of users

  Generic = {
    FirstName: "AAATestUserAAA",
    LastName: "AAATestUserAAA",
    address: genericAddress,
    tel: "555-555-5555",
    password: "doNotLook1",
    email: "AAATestUserAAA@aacn.test",
    birthday: "3/1/1986",
  };

  Member = {
    ...this.Generic,
    FirstName: "Alice",
    LastName: "Test",
    email: "alicetest@aacn.test",
  };

  constructor({ entropy = 15 }) {
    this.Random = {};
    //generate random user string
    this.Random.FirstName = "AAAA" + User.createRandomString(entropy);
    this.Random.LastName = "AAAA" + User.createRandomString(entropy);
    this.Random.tel = User.createRandomInteger(10000000000);
    this.Random.email = this.Random.FirstName + "@aacn.test";
  }
  static createRandomString(entropy = 10) {
    const randomSelection =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let randomString = "";

    for (let i = 0; i < entropy; i++) {
      randomString = randomString.concat(
        randomSelection[Math.round(Math.random() * 51)]
      );
    }

    return randomString;
  }

  static createRandomInteger(entropy = 10) {
    return Math.floor(entropy * Math.random());
  }
  /**
   * Documentation
   * @typedef {Object} creditCard - access AACN test credit card info
   * @param {number} Num - this is our standard test number
   * @param {number} CCV - a number property of SpecialType
   * @param {string} Month - choose between number, an abbreviated month name or full Month name
   * @param {number} Year - Will return the current year plus three
   */

  creditCard = {
    Num: 4111111111111111,
    CCV: 123,
    Month: { number: 1, abbrev: "Jan", full: "January" },
    Year: new Date(Date.now()).getFullYear() + 10,
  };
}
