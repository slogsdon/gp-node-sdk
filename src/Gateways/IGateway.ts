import {
  AuthorizationBuilder,
  ManagementBuilder,
  ReportBuilder,
} from "../Builders";
import { Transaction } from "../Entities";

export interface IGateway {
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
     * @param ManagementBuilder $builder The transaction's builder
     *
     * @return Transaction
     */
    manageTransaction(builder: ManagementBuilder): Promise<Transaction>;

    /**
     * Serializes and executes report transactions
     *
     * @param ReportBuilder $builder The transaction's builder
     *
     * @return Transaction
     */
    processReport<T>(builder: ReportBuilder<T>): Promise<T>;
}
