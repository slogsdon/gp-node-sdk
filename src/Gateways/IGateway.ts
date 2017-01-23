import {
  AuthorizationBuilder,
  ManageTransactionBuilder,
} from "../Builders";
import { Transaction } from "../Entities";

export interface IGateway {
    // common
    timeout: number;
    serviceUrl: string;

    // portico
    siteId?: string;
    licenseId?: string;
    deviceId?: string;
    username?: string;
    password?: string;
    secretApiKey?: string;
    developerId?: string;
    versionNumber?: string;

    // realex
    merchantId?: string;
    accountId?: string;
    sharedSecret?: string;
    channel?: string;

    /**
     * Serializes and executes authorization transactions
     *
     * @param AuthorizationBuilder $builder The transaction's builder
     *
     * @return Transaction
     */
    processAuthorization(builder: AuthorizationBuilder): Promise<Transaction>;

    /**
     * Serializes and executes follow up transactions
     *
     * @param ManageTransactionBuilder $builder The transaction's builder
     *
     * @return Transaction
     */
    manageTransaction(builder: ManageTransactionBuilder): Promise<Transaction>;
}
