export enum TransactionType {
  CreditSale = 1 << 0,
  CreditAuth = 1 << 1,
  CreditAddToBatch = 1 << 2,
  CreditCpcEdit = 1 << 3,
  CreditReturn = 1 << 4,
  CreditReversal = 1 << 5,
  CreditAccountVerify = 1 << 6,
  CreditTxnEdit = 1 << 7,
  CreditVoid = 1 << 8,
  CreditAdditionalAuth = 1 << 9,
  CreditOfflineAuth = 1 << 10,
  CreditOfflineSale = 1 << 11,
}
