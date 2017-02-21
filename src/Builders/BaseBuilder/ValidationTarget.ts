import { TransactionModifier } from "../../";
import { ValidationClause } from "./ValidationClause";
import { Validations } from "./Validations";

export class ValidationTarget {
  public parent: Validations;
  public type: number;
  public modifier: TransactionModifier;
  public property: string;
  public clause: ValidationClause;

  public constructor(
    parent: Validations,
    type: number,
    modifier: TransactionModifier,
  ) {
    this.parent = parent;
    this.type = type;
    this.modifier = modifier;
  }

  public with(modifier: TransactionModifier) {
    this.modifier = modifier;
    return this;
  }

  public check(targetProperty: string): ValidationClause {
    this.property = targetProperty;
    this.clause = new ValidationClause(this.parent, this);
    return this.clause;
  }
}
