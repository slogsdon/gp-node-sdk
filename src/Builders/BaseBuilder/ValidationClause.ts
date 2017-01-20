import { BaseBuilder } from "../";
import { Validations } from "./Validations";
import { ValidationTarget } from "./ValidationTarget";

export class ValidationClause {
  public parent: Validations;
  public target: ValidationTarget;
  public callback: Function;
  public message: string;

  public constructor(parent: Validations, target: ValidationTarget) {
    this.parent = parent;
    this.target = target;
  }

  public isNotNull(message?: string): ValidationTarget {
    this.callback = (builder: BaseBuilder) => null !== builder[this.target.property];
    this.message = message
      ? message
      : `${this.target.property} cannot be null for this transaction type.`;
    return this.parent.of(this.target.type);
  }
}
