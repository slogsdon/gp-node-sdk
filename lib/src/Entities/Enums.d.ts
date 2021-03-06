export declare enum AccountType {
    Checking = "CHECKING",
    Savings = "SAVINGS",
}
export declare enum AddressType {
    Billing = 0,
    Shipping = 1,
}
export declare enum AliasAction {
    Create = "CREATE",
    Add = "ADD",
    Delete = "DELETE",
}
export declare enum CheckType {
    Personal = "PERSONAL",
    Business = "BUSINESS",
    Payroll = "PAYROLL",
}
export declare enum CurrencyType {
    CURRENCY = 0,
    POINTS = 1,
}
export declare enum CvnPresenceIndicator {
    Present = 1,
    Illegible = 2,
    NotOnCard = 3,
    NotRequested = 4,
}
export declare enum EcommerceChannel {
    Ecom = "ECOM",
    Moto = "MOTO",
}
export declare enum EmailReceipt {
    Never = "Never",
    All = "All",
    Approvals = "Approvals",
    Declines = "Declines",
}
export declare enum EntryMethod {
    Swipe = "SWIPE",
    Proximity = "PROXIMITY",
    Manual = "MANUAL",
}
export declare enum ExceptionCodes {
    AuthenticationError = 0,
    InvalidConfiguration = 1,
    InvalidAmount = 2,
    MissingCurrency = 3,
    InvalidCurrency = 4,
    InvalidDate = 5,
    MissingCheckName = 6,
    InvalidPhoneNumber = 7,
    InvalidZipCode = 8,
    InvalidEmailAddress = 9,
    InvalidInputLength = 10,
    UnknownGatewayError = 11,
    InvalidOriginalTransaction = 12,
    NoOpenBatch = 13,
    InvalidCpcData = 14,
    InvalidCardData = 15,
    InvalidNumber = 16,
    GatewayTimeout = 17,
    UnexpectedGatewayResponse = 18,
    GatewayTimeoutReversalError = 19,
    GatewayError = 20,
    UnexpectedGatewayError = 21,
    IncorrectNumber = 22,
    ExpiredCard = 23,
    InvalidPin = 24,
    PinEntriesExceeded = 25,
    InvalidExpiry = 26,
    PinVerification = 27,
    IssuerTimeout = 28,
    IncorrectCvc = 29,
    CardDeclined = 30,
    ProcessingError = 31,
    IssuerTimeoutReversalError = 32,
    UnknownCreditError = 33,
    PossibleFraudDetected = 34,
    UnknownGiftError = 35,
    PartialApproval = 36,
}
export declare enum FraudFilterMode {
    None = "NONE",
    Off = "OFF",
    Active = "ACTIVE",
    Passive = "PASSIVE",
}
export declare enum GiftEntryMethod {
    Swipe = 0,
    Alias = 1,
    Manual = 2,
}
export declare enum HppVersion {
    Version1 = "1",
    Version2 = "2",
}
export declare enum InquiryType {
    Standard = "STANDARD",
    Foodstamp = "FOODSTAMP",
    Cash = "CASH",
    Points = "POINTS",
}
export declare enum PaymentMethodType {
    Reference = 1,
    Credit = 2,
    Debit = 4,
    EBT = 8,
    Cash = 16,
    ACH = 32,
    Gift = 64,
    Recurring = 128,
}
export declare enum PaymentSchedule {
    Dynamic = 0,
    FirstDayOfTheMonth = 1,
    LastDayOfTheMonth = 2,
}
export declare enum ReasonCode {
    Fraud = "FRAUD",
    FalsePositive = "FALSEPOSITIVE",
    OutOfStock = "OUTOFSTOCK",
    InStock = "INSTOCK",
    Other = "OTHER",
    NotGiven = "NOTGIVEN",
}
export declare enum RecurringSequence {
    First = 0,
    Subsequent = 1,
    Last = 2,
}
export declare enum RecurringType {
    Fixed = 0,
    Variable = 1,
}
export declare enum ReportType {
    FindTransactions = 1,
    Activity = 2,
    BatchDetail = 4,
    BatchHistory = 8,
    BatchSummary = 16,
    OpenAuths = 32,
    Search = 64,
    TransactionDetail = 128,
}
export declare enum ScheduleFrequency {
    Weekly = "Weekly",
    BiWeekly = "Bi-Weekly",
    BiMonthly = "Bi-Monthly",
    SemiMonthly = "Semi-Monthly",
    Monthly = "Monthly",
    Quarterly = "Quarterly",
    SemiAnnually = "Semi-Annually",
    Annually = "Annually",
}
export declare enum SecCode {
    PPD = "PPD",
    CCD = "CCD",
    POP = "POP",
    WEB = "WEB",
    TEL = "TEL",
    EBronze = "EBronze",
}
export declare enum TaxType {
    NotUsed = 0,
    SalesTax = 1,
    TaxExempt = 2,
}
export declare enum TimeZoneConversion {
    UTC = 0,
    Merchant = 1,
    Datacenter = 2,
}
export declare enum TransactionModifier {
    None = 1,
    Incremental = 2,
    Additional = 4,
    Offline = 8,
    LevelII = 16,
    FraudDecline = 32,
    ChipDecline = 64,
    CashBack = 128,
    Voucher = 256,
    Secure3D = 512,
    HostedRequest = 1024,
    Recurring = 2048,
    EncryptedMobile = 4096,
}
export declare enum TransactionType {
    Decline = 1,
    Verify = 2,
    Capture = 4,
    Auth = 8,
    Refund = 16,
    Reversal = 32,
    Sale = 64,
    Edit = 128,
    Void = 256,
    AddValue = 512,
    Balance = 1024,
    Activate = 2048,
    Alias = 4096,
    Replace = 8192,
    Reward = 16384,
    Deactivate = 32768,
    BatchClose = 65536,
    Create = 131072,
    Delete = 262144,
    BenefitWithDrawal = 524288,
    Fetch = 1048576,
    Search = 2097152,
    Hold = 4194304,
    Release = 8388608,
}
