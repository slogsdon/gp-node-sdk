import {
  IAuthable,
  IBalanceable,
  ICardData,
  IChargable,
  IEditable,
  IEncryptable,
  IPaymentMethod,
  IPinProtected,
  IPrePayable,
  IRefundable,
  IReversable,
  ITokenizable,
  ITrackData,
  IVerifyable,
  IVoidable,
  PaymentMethodType,
} from "../";

export abstract class PaymentMethod implements IPaymentMethod {
  public paymentMethodType: PaymentMethodType;

  get isAuthable() {
    return ((this as Object) as IAuthable).authorize !== undefined;
  }

  get isBalanceable() {
    return ((this as Object) as IBalanceable).balanceInquiry !== undefined;
  }

  get isCardData() {
    return (this.isTokenizable
        && ((this as Object) as ITokenizable).token !== undefined
        || ((this as Object) as ICardData).number !== undefined)
      && this.paymentMethodType !== PaymentMethodType.Gift;
  }

  get isChargable() {
    return ((this as Object) as IChargable).charge !== undefined;
  }

  get isEditable() {
    return ((this as Object) as IEditable).edit !== undefined;
  }

  get isEncryptable() {
    return ((this as Object) as IEncryptable).encryptionData !== undefined;
  }

  get isPinProtected() {
    return ((this as Object) as IPinProtected).pinBlock !== undefined;
  }

  get isPrePayable() {
    return ((this as Object) as IPrePayable).addValue !== undefined;
  }

  get isRefundable() {
    return ((this as Object) as IRefundable).refund !== undefined;
  }

  get isReversable() {
    return ((this as Object) as IReversable).reverse !== undefined;
  }

  get isTokenizable() {
    return ((this as Object) as ITokenizable).tokenize !== undefined;
  }

  get isTrackData() {
    return ((this as Object) as ITrackData).value !== undefined
      && (((this as Object) as ITrackData).entryMethod !== undefined
        || ((this as Object) as IPinProtected).pinBlock !== undefined);
  }

  get isVerifyable() {
    return ((this as Object) as IVerifyable).verify !== undefined;
  }

  get isVoidable() {
    return ((this as Object) as IVoidable).void !== undefined;
  }
}
