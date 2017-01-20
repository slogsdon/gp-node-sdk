import test from "ava";
import {
  CreditCard,
  ServicesConfig,
  ServicesContainer,
} from "../../../../src/";

const config = new ServicesConfig();
config.secretApiKey = "skapi_cert_MTeSAQAfG1UA9qQDrzl-kz4toXvARyieptFwSKP24w";
config.serviceUrl = "https://cert.api2.heartlandportico.com/Hps.Exchange.PosGateway/PosGatewayService.asmx";

test.before((_t) => {
  ServicesContainer.configure(config);
});

test("credit authorization", (t) => {
  t.plan(4);

  const card = new CreditCard();
  card.number = "4111111111111111";
  card.expMonth = "12";
  card.expYear = "2025";
  card.cvn = "123";
  card.cardHolderName = "Joe Smith";

  return new Promise((resolve, reject) => {
    card.authorize("14")
      .withCurrency("USD")
      .withAllowDuplicates(true)
      .execute()
      .then((authorization) => {
        t.truthy(authorization);
        t.is(authorization.responseCode, "00");
        return authorization;
      })
      .then((authorization) => {
        authorization.capture("16")
          .withGratuity("2")
          .execute()
          .then((capture) => {
            t.truthy(capture);
            t.is(capture.responseCode, "00");
            resolve();
          });
      })
      .catch(reject);
  });
});
