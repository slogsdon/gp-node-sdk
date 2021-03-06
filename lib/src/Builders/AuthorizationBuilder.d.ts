import { Address, AddressType, AliasAction, EcommerceInfo, GiftCard, HostedPaymentData, InquiryType, IPaymentMethod, RecurringSequence, RecurringType, Transaction } from "../";
import { TransactionBuilder } from "./TransactionBuilder";
export declare class AuthorizationBuilder extends TransactionBuilder<Transaction> {
    alias: string;
    aliasAction: AliasAction;
    allowDuplicates: boolean;
    allowPartialAuth: boolean;
    amount: string | number;
    authAmount: string | number;
    balanceInquiryType: InquiryType;
    billingAddress: Address;
    cashBackAmount: string | number;
    clientTransactionId: string;
    currency: string;
    customerId: string;
    customerIpAddress: string;
    cvn: string;
    description: string;
    dynamicDescriptor: string;
    ecommerceInfo: EcommerceInfo;
    gratuity: string | number;
    convenienceAmt: string | number;
    shippingAmt: string | number;
    hostedPaymentData: HostedPaymentData;
    invoiceNumber: string;
    level2Request: boolean;
    offlineAuthCode: string;
    oneTimePayment: boolean;
    orderId: string;
    productId: string;
    recurringSequence: RecurringSequence;
    recurringType: RecurringType;
    requestMultiUseToken: boolean;
    replacementCard: GiftCard;
    scheduleId: string;
    shippingAddress: Address;
    timestamp: string;
    constructor(type: number, paymentMethod?: IPaymentMethod);
    /**
     * Executes the authorization builder against the gateway.
     *
     * @returns Promise<Transaction>
     */
    execute(): Promise<Transaction>;
    /**
     * Serializes an authorization builder for hosted payment page requests.
     *
     * Requires the gateway and account support hosted payment pages.
     *
     * @throws UnsupportedTransactionError Thrown when gateway doesn't support hosted payments
     * @returns string
     */
    serialize(): string;
    protected setupValidations(): void;
    /**
     * Sets an address value; where applicable.
     *
     * Currently supports billing and shipping addresses.
     *
     * @param address The desired address information
     * @param addressType The desired address type
     * @returns AuthorizationBuilder
     */
    withAddress(address?: Address, addressType?: AddressType): this;
    withAlias(aliasAction: AliasAction, alias?: string): this;
    /**
     * Allows duplicate transactions by skipping the
     * gateway's duplicate checking.
     *
     * @param allowDuplicates The duplicate skip flag
     * @returns AuthorizationBuilder
     */
    withAllowDuplicates(allowDuplicates?: boolean): this;
    /**
     * Allows partial authorizations to occur.
     *
     *
     * @param allowPartialAuth The allow partial flag
     * @returns AuthorizationBuilder
     */
    withAllowPartialAuth(allowPartialAuth?: boolean): this;
    /**
     * Sets the transaction's amount
     *
     * @param amount The amount
     * @returns AuthorizationBuilder
     */
    withAmount(amount?: string | number): this;
    /**
     * Sets the transaction's authorization amount; where applicable.
     *
     * This is a specialized field. In most cases,
     * `Authorization.withAmount` should be used.
     *
     * @param authAmount The authorization amount
     * @returns AuthorizationBuilder
     */
    withAuthAmount(authAmount?: string | number): this;
    withBalanceInquiryType(inquiry?: InquiryType): this;
    /**
     * Sets the cash back amount.
     *
     * This is a specialized field for debit or EBT transactions.
     *
     * @param amount The desired cash back amount
     * @returns AuthorizationBuilder
     */
    withCashBack(amount?: string | number): this;
    /**
     * Sets the client transaction ID.
     *
     * This is an application derived value that can be used to identify a
     * transaction in case a gateway transaction ID is not returned, e.g.
     * in cases of timeouts.
     *
     * The supplied value should be unique to the configured merchant or
     * terminal account.
     *
     * @param clientTransactionId The client transaction ID
     * @returns AuthorizationBuilder
     */
    withClientTransactionId(clientTransactionId?: string): this;
    /**
     * Sets the transaction's currency; where applicable.
     *
     * The formatting for the supplied value will currently depend on
     * the configured gateway's requirements.
     *
     * @param currency The currency
     * @returns AuthorizationBuilder
     */
    withCurrency(currency?: string): this;
    /**
     * Sets the customer ID; where applicable.
     *
     * This is an application/merchant generated value.
     *
     * @param customerId The customer ID
     * @returns AuthorizationBuilder
     */
    withCustomerId(customerId?: string): this;
    /**
     * Sets the customer's IP address; where applicable.
     *
     * This value should be obtained during the payment process.
     *
     * @param customerIpAddress The customer's IP address
     * @returns AuthorizationBuilder
     */
    withCustomerIpAddress(customerIpAddress?: string): this;
    /**
     * Sets the CVN value for recurring payments; where applicable.
     *
     * @param cvn CVN value to use in the request
     * @returns AuthorizationBuilder
     */
    withCvn(cvn?: string): this;
    /**
     * Sets the transaction's description.
     *
     * This value is not guaranteed to be sent in the authorization
     * or settlement process.
     *
     * @param description The description
     * @returns AuthorizationBuilder
     */
    withDescription(description?: string): this;
    /**
     * Sets the transaction's dynamic descriptor.
     *
     * This value is sent during the authorization process and is displayed
     * in the consumer's account.
     *
     * @param dynamicDescriptor The dynamic descriptor
     * @returns AuthorizationBuilder
     */
    withDynamicDescriptor(dynamicDescriptor?: string): this;
    /**
     * Sets eCommerce specific data; where applicable.
     *
     * This can include:
     *
     *   - Consumer authentication (3DSecure) data
     *   - Direct market data
     *
     * @param ecommerceInfo The eCommerce data
     * @returns AuthorizationBuilder
     */
    withEcommerceInfo(ecommerceInfo?: EcommerceInfo): this;
    /**
     * Sets the gratuity amount; where applicable.
     *
     * This value is information only and does not affect
     * the authorization amount.
     *
     * @param gratuity The gratuity amount
     * @returns AuthorizationBuilder
     */
    withGratuity(gratuity?: string | number): this;
    /**
     * Sets the Convenience amount; where applicable.
     *
     * @param convenienceAmt The Convenience amount
     * @returns AuthorizationBuilder
     */
    withConvenienceAmt(convenienceAmt?: string | number): this;
    /**
     * Sets the Shipping amount; where applicable.
     *
     * @param shippingAmt The Shipping amount
     * @returns AuthorizationBuilder
     */
    withShippingAmt(shippingAmt?: string | number): this;
    /**
     * Additional hosted payment specific information for Realex HPP implementation.
     *
     * @param hostedPaymentData The hosted payment data
     * @returns AuthorizationBuilder
     */
    withHostedPaymentData(hostedPaymentData?: HostedPaymentData): this;
    /**
     * Sets the invoice number; where applicable.
     *
     * @param invoiceNumber The invoice number
     * @returns AuthorizationBuilder
     */
    withInvoiceNumber(invoiceNumber?: string): this;
    /**
     * Sets the commercial request flag; where applicable.
     *
     * This flag indicates commercial purchase cards are accepted/expected.
     * The application should inspect the transaction response and pass the
     * appropriate Level II data when necessary.
     *
     * @param level2Request The commercial request flag
     * @returns AuthorizationBuilder
     */
    withCommercialRequest(level2Request?: boolean): this;
    /**
     * Sets the offline authorization code; where applicable.
     *
     * The merchant is required to supply this value as obtained when
     * calling the issuing bank for the authorization.
     *
     * @param offlineAuthCode The offline authorization code
     * @returns AuthorizationBuilder
     */
    withOfflineAuthCode(offlineAuthCode?: string): this;
    /**
     * Sets the one-time payment flag; where applicable.
     *
     * This is only useful when using recurring payment profiles for
     * one-time payments that are not a part of a recurring schedule.
     *
     * @param oneTimePayment The one-time flag
     * @returns AuthorizationBuilder
     */
    withOneTimePayment(oneTimePayment?: boolean): this;
    /**
     * Sets the transaction's order ID; where applicable.
     *
     * @param orderId The order ID
     * @returns AuthorizationBuilder
     */
    withOrderId(orderId?: string): this;
    /**
     * Sets the transaction's product ID; where applicable.
     *
     * @param productId The product ID
     * @returns AuthorizationBuilder
     */
    withProductId(productId?: string): this;
    /**
     * Sets the Recurring Info for Realex based recurring payments;
     * where applicable.
     *
     * @param type The value can be 'fixed' or 'variable' depending on whether
     *             the amount will change for each transaction.
     * @param sequence  Indicates where in the recurring sequence the transaction
     *                  occurs. Must be 'first' for the first transaction for this
     *                  card, 'subsequent' for transactions after that, and 'last'
     *                  for the final transaction of the set.
     * @returns AuthorizationBuilder
     */
    withRecurringInfo(type?: RecurringType, sequence?: RecurringSequence): this;
    /**
     * Requests multi-use tokenization / card storage.
     *
     * This will depend on a successful transaction. If there was a failure
     * or decline, the multi-use tokenization / card storage will not be
     * successful.
     *
     * @param requestMultiUseToken The request flag
     * @returns AuthorizationBuilder
     */
    withRequestMultiUseToken(requestMultiUseToken?: boolean): this;
    withReplacementCard(replacementCard?: GiftCard): this;
    /**
     * Sets the schedule ID associated with the transaction; where applicable.
     *
     * This is specific to transactions against recurring profiles that are
     * a part of a recurring schedule.
     *
     * @param scheduleId The schedule ID
     * @returns AuthorizationBuilder
     */
    withScheduleId(scheduleId?: string): this;
    /**
     * Sets the related gateway transaction ID; where applicable.
     *
     * This value is used to associated a previous transaction with the
     * current transaction.
     *
     * @param transactionId The gateway transaction ID
     * @returns AuthorizationBuilder
     */
    withTransactionId(transactionId?: string): this;
    withTimestamp(timestamp?: string): this;
}
