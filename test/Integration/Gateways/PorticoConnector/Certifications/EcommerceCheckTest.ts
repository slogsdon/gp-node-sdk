import ava from "ava";
import {
  AccountType,
  Address,
  BatchService,
  CheckType,
  SecCode,
  ServicesConfig,
  ServicesContainer,
} from "../../../../../src/";
import {
  TestChecks,
} from "../../../../Data/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTyMAQBiHVEAewvIzXVFcmUd2UcyBge_eCpaASUp0A";
config.serviceUrl = "https://cert.api2.heartlandportico.com";

const BATCH_NOT_OPEN = "Transaction was rejected because it requires a batch to be open.";
const BATCH_EMPTY = "Batch close was rejected because no transactions are associated with the currently open batch";
const runSerially = false;
const test = runSerially ? ava.serial : ava;

const address = new Address();
address.streetAddress1 = "123 Main St.";
address.city = "Downtown";
address.province = "NJ";
address.postalCode = "12345";

ava.before((_t) => {
  ServicesContainer.configure(config);
});

test.before("000 - close batch", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch((e: Error) => {
        if (e.message.indexOf(BATCH_NOT_OPEN) !== -1
          || e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          t.pass();
          resolve();
          return;
        }
        reject(e);
      });
  });
});

/// ACH Debit - Consumer

test("001 - consumer personal checking", (t) => {
  t.plan(4);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(11.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        // test case 25
        response.void()
          .execute()
          .then((voidResponse) => {
            t.truthy(voidResponse);
            t.is(voidResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("002 - consumer business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(12.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("003 - consumer personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(13.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("004 - consumer business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.PPD,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(14.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("005 - corporate personal checking", (t) => {
  t.plan(4);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Personal,
    AccountType.Checking,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check.charge(15.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        return response;
      })
      .then((response) => {
        // test case 26
        response.void()
          .execute()
          .then((voidResponse) => {
            t.truthy(voidResponse);
            t.is(voidResponse.responseCode, "00");
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
});

test("006 - corporate business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Business,
    AccountType.Checking,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check.charge(16.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("007 - corporate personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Personal,
    AccountType.Savings,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check.charge(17.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("008 - corporate business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.CCD,
    CheckType.Business,
    AccountType.Savings,
    "Heartland Pays",
  );

  return new Promise((resolve, reject) => {
    check.charge(18.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("009 - egold personal checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(11.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("010 - egold business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(12.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("011 - egold personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(13.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("012 - egold business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(14.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("013 - esilver personal checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(15.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("014 - esilver business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(16.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("015 - esilver personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(17.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("016 - esilver business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.POP,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(18.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("017 - ebronze personal checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(19.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("018 - ebronze business checking", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(20.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("019 - ebronze personal savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(21.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("020 - ebronze business savings", (t) => {
  t.plan(2);

  const check = TestChecks.certification(
    SecCode.EBronze,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(22.00)
      .withCurrency("USD")
      .withAddress(address)
      .withAllowDuplicates(true)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        reject();
      })
      .catch((error) => {
        t.plan(1);
        t.true(-1 !== error.message.indexOf("Processor Configuration error"));
        resolve();
      });
  });
});

test("021 - web personal checking", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Personal,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(23.00)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("022 - web business checking", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Business,
    AccountType.Checking,
  );

  return new Promise((resolve, reject) => {
    check.charge(24.00)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("023 - web personal savings", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Personal,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(25.00)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test("024 - web business savings", (t) => {
  const check = TestChecks.certification(
    SecCode.WEB,
    CheckType.Business,
    AccountType.Savings,
  );

  return new Promise((resolve, reject) => {
    check.charge(5.00)
      .withCurrency("USD")
      .withAddress(address)
      .execute()
      .then((response) => {
        t.truthy(response);
        t.is(response.responseCode, "00");
        resolve();
      })
      .catch(reject);
  });
});

test.after("999 - close batch", (t) => {
  t.plan(1);

  return new Promise((resolve, reject) => {
    BatchService.closeBatch()
      .then((response) => {
        t.truthy(response);
        resolve();
      })
      .catch((e: Error) => {
        if (e.message.indexOf(BATCH_NOT_OPEN) !== -1
          || e.message.indexOf(BATCH_EMPTY) !== -1
        ) {
          t.pass();
          resolve();
          return;
        }
        reject(e);
      });
  });
});
