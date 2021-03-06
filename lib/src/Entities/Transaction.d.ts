import { AuthorizationBuilder, GiftCard, ManagementBuilder, PaymentMethodType, TransactionReference } from "../";
export declare class Transaction {
    authorizedAmount: string;
    balanceAmount: string;
    pointsBalanceAmount: string;
    commercialIndicator: string;
    responseCode: string;
    responseMessage: string;
    transactionDescriptor: string;
    referenceNumber: string;
    recurringDataCode: string;
    cvnResponseMessage: string;
    cvnResponseCode: string;
    cavvResponseCode: string;
    cardLast4: string;
    cardType: string;
    avsResponseMessage: string;
    avsResponseCode: string;
    availableBalance: string;
    transactionReference: TransactionReference;
    token: string;
    giftCard: GiftCard;
    clientTransactionId: string;
    timestamp: string;
    readonly transactionId: string;
    static fromId(transactionId: string, orderId?: string | PaymentMethodType, paymentMethodType?: PaymentMethodType): Transaction;
    /**
     * Allows for a follow-up request to add an additional authorization
     *
     * @param string|number amount Amount to authorize
     *
     * @return AuthorizationBuilder
     */
    additionalAuth(amount?: string | number): AuthorizationBuilder;
    /**
     * Allows for a follow-up request to add the transaction to an open batch
     *
     * @param string|number amount Amount to capture
     *
     * @return ManagementBuilder
     */
    capture(amount?: string | number): ManagementBuilder;
    /**
     * Allows for a follow-up request to edit the transaction
     *
     * @return ManagementBuilder
     */
    edit(): ManagementBuilder;
    hold(): ManagementBuilder;
    /**
     * Allows for a follow-up request to refund the transaction
     *
     * @param string|number amount Amount to refund
     *
     * @return ManagementBuilder
     */
    refund(amount?: string | number): ManagementBuilder;
    release(): ManagementBuilder;
    /**
     * Allows for a follow-up request to reverse the transaction
     *
     * @param string|number amount Amount to reverse
     *
     * @return ManagementBuilder
     */
    reverse(amount?: string | number): ManagementBuilder;
    /**
     * Allows for a follow-up request to void the transaction
     *
     * @return ManagementBuilder
     */
    void(): ManagementBuilder;
}
