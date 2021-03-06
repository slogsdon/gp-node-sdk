"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountType;
(function (AccountType) {
    AccountType["Checking"] = "CHECKING";
    AccountType["Savings"] = "SAVINGS";
})(AccountType = exports.AccountType || (exports.AccountType = {}));
var AddressType;
(function (AddressType) {
    AddressType[AddressType["Billing"] = 0] = "Billing";
    AddressType[AddressType["Shipping"] = 1] = "Shipping";
})(AddressType = exports.AddressType || (exports.AddressType = {}));
var AliasAction;
(function (AliasAction) {
    AliasAction["Create"] = "CREATE";
    AliasAction["Add"] = "ADD";
    AliasAction["Delete"] = "DELETE";
})(AliasAction = exports.AliasAction || (exports.AliasAction = {}));
var CheckType;
(function (CheckType) {
    CheckType["Personal"] = "PERSONAL";
    CheckType["Business"] = "BUSINESS";
    CheckType["Payroll"] = "PAYROLL";
})(CheckType = exports.CheckType || (exports.CheckType = {}));
var CurrencyType;
(function (CurrencyType) {
    CurrencyType[CurrencyType["CURRENCY"] = 0] = "CURRENCY";
    CurrencyType[CurrencyType["POINTS"] = 1] = "POINTS";
})(CurrencyType = exports.CurrencyType || (exports.CurrencyType = {}));
var CvnPresenceIndicator;
(function (CvnPresenceIndicator) {
    CvnPresenceIndicator[CvnPresenceIndicator["Present"] = 1] = "Present";
    CvnPresenceIndicator[CvnPresenceIndicator["Illegible"] = 2] = "Illegible";
    CvnPresenceIndicator[CvnPresenceIndicator["NotOnCard"] = 3] = "NotOnCard";
    CvnPresenceIndicator[CvnPresenceIndicator["NotRequested"] = 4] = "NotRequested";
})(CvnPresenceIndicator = exports.CvnPresenceIndicator || (exports.CvnPresenceIndicator = {}));
var EcommerceChannel;
(function (EcommerceChannel) {
    EcommerceChannel["Ecom"] = "ECOM";
    EcommerceChannel["Moto"] = "MOTO";
})(EcommerceChannel = exports.EcommerceChannel || (exports.EcommerceChannel = {}));
var EmailReceipt;
(function (EmailReceipt) {
    EmailReceipt["Never"] = "Never";
    EmailReceipt["All"] = "All";
    EmailReceipt["Approvals"] = "Approvals";
    EmailReceipt["Declines"] = "Declines";
})(EmailReceipt = exports.EmailReceipt || (exports.EmailReceipt = {}));
var EntryMethod;
(function (EntryMethod) {
    EntryMethod["Swipe"] = "SWIPE";
    EntryMethod["Proximity"] = "PROXIMITY";
    EntryMethod["Manual"] = "MANUAL";
})(EntryMethod = exports.EntryMethod || (exports.EntryMethod = {}));
var ExceptionCodes;
(function (ExceptionCodes) {
    // general codes
    ExceptionCodes[ExceptionCodes["AuthenticationError"] = 0] = "AuthenticationError";
    ExceptionCodes[ExceptionCodes["InvalidConfiguration"] = 1] = "InvalidConfiguration";
    // input codes
    ExceptionCodes[ExceptionCodes["InvalidAmount"] = 2] = "InvalidAmount";
    ExceptionCodes[ExceptionCodes["MissingCurrency"] = 3] = "MissingCurrency";
    ExceptionCodes[ExceptionCodes["InvalidCurrency"] = 4] = "InvalidCurrency";
    ExceptionCodes[ExceptionCodes["InvalidDate"] = 5] = "InvalidDate";
    ExceptionCodes[ExceptionCodes["MissingCheckName"] = 6] = "MissingCheckName";
    ExceptionCodes[ExceptionCodes["InvalidPhoneNumber"] = 7] = "InvalidPhoneNumber";
    ExceptionCodes[ExceptionCodes["InvalidZipCode"] = 8] = "InvalidZipCode";
    ExceptionCodes[ExceptionCodes["InvalidEmailAddress"] = 9] = "InvalidEmailAddress";
    ExceptionCodes[ExceptionCodes["InvalidInputLength"] = 10] = "InvalidInputLength";
    // gateway codes
    ExceptionCodes[ExceptionCodes["UnknownGatewayError"] = 11] = "UnknownGatewayError";
    ExceptionCodes[ExceptionCodes["InvalidOriginalTransaction"] = 12] = "InvalidOriginalTransaction";
    ExceptionCodes[ExceptionCodes["NoOpenBatch"] = 13] = "NoOpenBatch";
    ExceptionCodes[ExceptionCodes["InvalidCpcData"] = 14] = "InvalidCpcData";
    ExceptionCodes[ExceptionCodes["InvalidCardData"] = 15] = "InvalidCardData";
    ExceptionCodes[ExceptionCodes["InvalidNumber"] = 16] = "InvalidNumber";
    ExceptionCodes[ExceptionCodes["GatewayTimeout"] = 17] = "GatewayTimeout";
    ExceptionCodes[ExceptionCodes["UnexpectedGatewayResponse"] = 18] = "UnexpectedGatewayResponse";
    ExceptionCodes[ExceptionCodes["GatewayTimeoutReversalError"] = 19] = "GatewayTimeoutReversalError";
    ExceptionCodes[ExceptionCodes["GatewayError"] = 20] = "GatewayError";
    ExceptionCodes[ExceptionCodes["UnexpectedGatewayError"] = 21] = "UnexpectedGatewayError";
    // credit issuer codes
    ExceptionCodes[ExceptionCodes["IncorrectNumber"] = 22] = "IncorrectNumber";
    ExceptionCodes[ExceptionCodes["ExpiredCard"] = 23] = "ExpiredCard";
    ExceptionCodes[ExceptionCodes["InvalidPin"] = 24] = "InvalidPin";
    ExceptionCodes[ExceptionCodes["PinEntriesExceeded"] = 25] = "PinEntriesExceeded";
    ExceptionCodes[ExceptionCodes["InvalidExpiry"] = 26] = "InvalidExpiry";
    ExceptionCodes[ExceptionCodes["PinVerification"] = 27] = "PinVerification";
    ExceptionCodes[ExceptionCodes["IssuerTimeout"] = 28] = "IssuerTimeout";
    ExceptionCodes[ExceptionCodes["IncorrectCvc"] = 29] = "IncorrectCvc";
    ExceptionCodes[ExceptionCodes["CardDeclined"] = 30] = "CardDeclined";
    ExceptionCodes[ExceptionCodes["ProcessingError"] = 31] = "ProcessingError";
    ExceptionCodes[ExceptionCodes["IssuerTimeoutReversalError"] = 32] = "IssuerTimeoutReversalError";
    ExceptionCodes[ExceptionCodes["UnknownCreditError"] = 33] = "UnknownCreditError";
    ExceptionCodes[ExceptionCodes["PossibleFraudDetected"] = 34] = "PossibleFraudDetected";
    // gift codes
    ExceptionCodes[ExceptionCodes["UnknownGiftError"] = 35] = "UnknownGiftError";
    ExceptionCodes[ExceptionCodes["PartialApproval"] = 36] = "PartialApproval";
})(ExceptionCodes = exports.ExceptionCodes || (exports.ExceptionCodes = {}));
var FraudFilterMode;
(function (FraudFilterMode) {
    FraudFilterMode["None"] = "NONE";
    FraudFilterMode["Off"] = "OFF";
    FraudFilterMode["Active"] = "ACTIVE";
    FraudFilterMode["Passive"] = "PASSIVE";
})(FraudFilterMode = exports.FraudFilterMode || (exports.FraudFilterMode = {}));
var GiftEntryMethod;
(function (GiftEntryMethod) {
    GiftEntryMethod[GiftEntryMethod["Swipe"] = 0] = "Swipe";
    GiftEntryMethod[GiftEntryMethod["Alias"] = 1] = "Alias";
    GiftEntryMethod[GiftEntryMethod["Manual"] = 2] = "Manual";
})(GiftEntryMethod = exports.GiftEntryMethod || (exports.GiftEntryMethod = {}));
var HppVersion;
(function (HppVersion) {
    HppVersion["Version1"] = "1";
    HppVersion["Version2"] = "2";
})(HppVersion = exports.HppVersion || (exports.HppVersion = {}));
var InquiryType;
(function (InquiryType) {
    InquiryType["Standard"] = "STANDARD";
    InquiryType["Foodstamp"] = "FOODSTAMP";
    InquiryType["Cash"] = "CASH";
    InquiryType["Points"] = "POINTS";
})(InquiryType = exports.InquiryType || (exports.InquiryType = {}));
var PaymentMethodType;
(function (PaymentMethodType) {
    PaymentMethodType[PaymentMethodType["Reference"] = 1] = "Reference";
    PaymentMethodType[PaymentMethodType["Credit"] = 2] = "Credit";
    PaymentMethodType[PaymentMethodType["Debit"] = 4] = "Debit";
    PaymentMethodType[PaymentMethodType["EBT"] = 8] = "EBT";
    PaymentMethodType[PaymentMethodType["Cash"] = 16] = "Cash";
    PaymentMethodType[PaymentMethodType["ACH"] = 32] = "ACH";
    PaymentMethodType[PaymentMethodType["Gift"] = 64] = "Gift";
    PaymentMethodType[PaymentMethodType["Recurring"] = 128] = "Recurring";
})(PaymentMethodType = exports.PaymentMethodType || (exports.PaymentMethodType = {}));
var PaymentSchedule;
(function (PaymentSchedule) {
    PaymentSchedule[PaymentSchedule["Dynamic"] = 0] = "Dynamic";
    PaymentSchedule[PaymentSchedule["FirstDayOfTheMonth"] = 1] = "FirstDayOfTheMonth";
    PaymentSchedule[PaymentSchedule["LastDayOfTheMonth"] = 2] = "LastDayOfTheMonth";
})(PaymentSchedule = exports.PaymentSchedule || (exports.PaymentSchedule = {}));
var ReasonCode;
(function (ReasonCode) {
    ReasonCode["Fraud"] = "FRAUD";
    ReasonCode["FalsePositive"] = "FALSEPOSITIVE";
    ReasonCode["OutOfStock"] = "OUTOFSTOCK";
    ReasonCode["InStock"] = "INSTOCK";
    ReasonCode["Other"] = "OTHER";
    ReasonCode["NotGiven"] = "NOTGIVEN";
})(ReasonCode = exports.ReasonCode || (exports.ReasonCode = {}));
var RecurringSequence;
(function (RecurringSequence) {
    RecurringSequence[RecurringSequence["First"] = 0] = "First";
    RecurringSequence[RecurringSequence["Subsequent"] = 1] = "Subsequent";
    RecurringSequence[RecurringSequence["Last"] = 2] = "Last";
})(RecurringSequence = exports.RecurringSequence || (exports.RecurringSequence = {}));
var RecurringType;
(function (RecurringType) {
    RecurringType[RecurringType["Fixed"] = 0] = "Fixed";
    RecurringType[RecurringType["Variable"] = 1] = "Variable";
})(RecurringType = exports.RecurringType || (exports.RecurringType = {}));
var ReportType;
(function (ReportType) {
    ReportType[ReportType["FindTransactions"] = 1] = "FindTransactions";
    ReportType[ReportType["Activity"] = 2] = "Activity";
    ReportType[ReportType["BatchDetail"] = 4] = "BatchDetail";
    ReportType[ReportType["BatchHistory"] = 8] = "BatchHistory";
    ReportType[ReportType["BatchSummary"] = 16] = "BatchSummary";
    ReportType[ReportType["OpenAuths"] = 32] = "OpenAuths";
    ReportType[ReportType["Search"] = 64] = "Search";
    ReportType[ReportType["TransactionDetail"] = 128] = "TransactionDetail";
})(ReportType = exports.ReportType || (exports.ReportType = {}));
var ScheduleFrequency;
(function (ScheduleFrequency) {
    ScheduleFrequency["Weekly"] = "Weekly";
    ScheduleFrequency["BiWeekly"] = "Bi-Weekly";
    ScheduleFrequency["BiMonthly"] = "Bi-Monthly";
    ScheduleFrequency["SemiMonthly"] = "Semi-Monthly";
    ScheduleFrequency["Monthly"] = "Monthly";
    ScheduleFrequency["Quarterly"] = "Quarterly";
    ScheduleFrequency["SemiAnnually"] = "Semi-Annually";
    ScheduleFrequency["Annually"] = "Annually";
})(ScheduleFrequency = exports.ScheduleFrequency || (exports.ScheduleFrequency = {}));
var SecCode;
(function (SecCode) {
    SecCode["PPD"] = "PPD";
    SecCode["CCD"] = "CCD";
    SecCode["POP"] = "POP";
    SecCode["WEB"] = "WEB";
    SecCode["TEL"] = "TEL";
    SecCode["EBronze"] = "EBronze";
})(SecCode = exports.SecCode || (exports.SecCode = {}));
var TaxType;
(function (TaxType) {
    TaxType[TaxType["NotUsed"] = 0] = "NotUsed";
    TaxType[TaxType["SalesTax"] = 1] = "SalesTax";
    TaxType[TaxType["TaxExempt"] = 2] = "TaxExempt";
})(TaxType = exports.TaxType || (exports.TaxType = {}));
var TimeZoneConversion;
(function (TimeZoneConversion) {
    TimeZoneConversion[TimeZoneConversion["UTC"] = 0] = "UTC";
    TimeZoneConversion[TimeZoneConversion["Merchant"] = 1] = "Merchant";
    TimeZoneConversion[TimeZoneConversion["Datacenter"] = 2] = "Datacenter";
})(TimeZoneConversion = exports.TimeZoneConversion || (exports.TimeZoneConversion = {}));
var TransactionModifier;
(function (TransactionModifier) {
    TransactionModifier[TransactionModifier["None"] = 1] = "None";
    TransactionModifier[TransactionModifier["Incremental"] = 2] = "Incremental";
    TransactionModifier[TransactionModifier["Additional"] = 4] = "Additional";
    TransactionModifier[TransactionModifier["Offline"] = 8] = "Offline";
    TransactionModifier[TransactionModifier["LevelII"] = 16] = "LevelII";
    TransactionModifier[TransactionModifier["FraudDecline"] = 32] = "FraudDecline";
    TransactionModifier[TransactionModifier["ChipDecline"] = 64] = "ChipDecline";
    TransactionModifier[TransactionModifier["CashBack"] = 128] = "CashBack";
    TransactionModifier[TransactionModifier["Voucher"] = 256] = "Voucher";
    TransactionModifier[TransactionModifier["Secure3D"] = 512] = "Secure3D";
    TransactionModifier[TransactionModifier["HostedRequest"] = 1024] = "HostedRequest";
    TransactionModifier[TransactionModifier["Recurring"] = 2048] = "Recurring";
    TransactionModifier[TransactionModifier["EncryptedMobile"] = 4096] = "EncryptedMobile";
})(TransactionModifier = exports.TransactionModifier || (exports.TransactionModifier = {}));
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["Decline"] = 1] = "Decline";
    TransactionType[TransactionType["Verify"] = 2] = "Verify";
    TransactionType[TransactionType["Capture"] = 4] = "Capture";
    TransactionType[TransactionType["Auth"] = 8] = "Auth";
    TransactionType[TransactionType["Refund"] = 16] = "Refund";
    TransactionType[TransactionType["Reversal"] = 32] = "Reversal";
    TransactionType[TransactionType["Sale"] = 64] = "Sale";
    TransactionType[TransactionType["Edit"] = 128] = "Edit";
    TransactionType[TransactionType["Void"] = 256] = "Void";
    TransactionType[TransactionType["AddValue"] = 512] = "AddValue";
    TransactionType[TransactionType["Balance"] = 1024] = "Balance";
    TransactionType[TransactionType["Activate"] = 2048] = "Activate";
    TransactionType[TransactionType["Alias"] = 4096] = "Alias";
    TransactionType[TransactionType["Replace"] = 8192] = "Replace";
    TransactionType[TransactionType["Reward"] = 16384] = "Reward";
    TransactionType[TransactionType["Deactivate"] = 32768] = "Deactivate";
    TransactionType[TransactionType["BatchClose"] = 65536] = "BatchClose";
    TransactionType[TransactionType["Create"] = 131072] = "Create";
    TransactionType[TransactionType["Delete"] = 262144] = "Delete";
    TransactionType[TransactionType["BenefitWithDrawal"] = 524288] = "BenefitWithDrawal";
    TransactionType[TransactionType["Fetch"] = 1048576] = "Fetch";
    TransactionType[TransactionType["Search"] = 2097152] = "Search";
    TransactionType[TransactionType["Hold"] = 4194304] = "Hold";
    TransactionType[TransactionType["Release"] = 8388608] = "Release";
})(TransactionType = exports.TransactionType || (exports.TransactionType = {}));
