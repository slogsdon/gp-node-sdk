export enum AccountType {
  Checking,
  Savings,
}

export enum AliasAction {
  Create,
  Add,
  Delete,
}

export enum CheckType {
  Personal,
  Business,
  Payroll,
}

export enum CvnPresenceIndicator {
  Present = 1,
  Illegible = 2,
  NotOnCard = 3,
  NotRequested = 4,
}

export enum EntryMethod {
  Swipe,
  Proximity,
  Manual,
}

export enum ExceptionCodes {
  // general codes
  AuthenticationError,
  InvalidConfiguration,

  // input codes
  InvalidAmount,
  MissingCurrency,
  InvalidCurrency,
  InvalidDate,
  MissingCheckName,
  InvalidPhoneNumber,
  InvalidZipCode,
  InvalidEmailAddress,
  InvalidInputLength,

  // gateway codes
  UnknownGatewayError,
  InvalidOriginalTransaction,
  NoOpenBatch,
  InvalidCpcData,
  InvalidCardData,
  InvalidNumber,
  GatewayTimeout,
  UnexpectedGatewayResponse,
  GatewayTimeoutReversalError,
  GatewayError,
  UnexpectedGatewayError,

  // credit issuer codes
  IncorrectNumber,
  ExpiredCard,
  InvalidPin,
  PinEntriesExceeded,
  InvalidExpiry,
  PinVerification,
  IssuerTimeout,
  IncorrectCvc,
  CardDeclined,
  ProcessingError,
  IssuerTimeoutReversalError,
  UnknownCreditError,
  PossibleFraudDetected,

  // gift codes
  UnknownGiftError,
  PartialApproval,
}

export enum InquiryType {
  Standard,
  Foodstamp,
  Cash,
  Points,
}

export enum PaymentMethodType {
  Reference,
  Credit,
  Debit,
  EBT,
  Cash,
  ACH,
  Gift,
  Recurring,
}

export enum SecCode {
  PPD,
  CCD,
  POP,
  WEB,
  TEL,
  EBronze,
}

export enum TaxType {
  NotUsed,
  SalesTax,
  TaxExempt,
}

export enum TransactionModifier {
  None,
  Incremental,
  Additional,
  Offline,
  LevelII,
  FraudDecline,
  ChipDecline,
  CashBack,
  Voucher,
}

export enum TransactionType {
  Decline = 1 << 0,
  Verify = 1 << 1,
  Capture = 1 << 2,
  Auth = 1 << 3,
  Refund = 1 << 4,
  Reversal = 1 << 5,
  Sale = 1 << 6,
  Edit = 1 << 7,
  Void = 1 << 8,
  AddValue = 1 << 9,
  Balance = 1 << 10,
  Activate = 1 << 11,
  Alias = 1 << 12,
  Replace = 1 << 13,
  Reward = 1 << 14,
  Deactivate = 1 << 15,
  BatchClose = 1 << 16,
}
