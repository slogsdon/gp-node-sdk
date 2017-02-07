import {
    AuthorizationBuilder,
    InquiryType,
} from "../";

export interface IAuthable {
    authorize(amount?: string): AuthorizationBuilder;
}

export interface IBalanceable {
    balanceInquiry(inquiry?: InquiryType): AuthorizationBuilder;
}

export interface ICardData {
}

export interface IChargable {
    charge(amount?: string): AuthorizationBuilder;
}

export interface IEditable {
    edit(amount?: string): AuthorizationBuilder;
}

export interface IEncryptable {
}

export interface IPaymentMethod {
}

export interface IPinProtected {
}

export interface IPrePayable {
    addValue(amount?: string): AuthorizationBuilder;
}

export interface IRefundable {
    refund(amount?: string): AuthorizationBuilder;
}

export interface IReversable {
    reverse(amount?: string): AuthorizationBuilder;
}

export interface ITokenizable {
    tokenize(): AuthorizationBuilder;
}

export interface ITrackData {
}

export interface IVerifyable {
    verify(): AuthorizationBuilder;
}

export interface IVoidable {
}
