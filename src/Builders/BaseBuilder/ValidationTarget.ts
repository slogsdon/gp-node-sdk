import { ValidationClause } from "./ValidationClause";
import { Validations } from "./Validations";

export class ValidationTarget {
  public parent: Validations;
  public type: number;
  public property: string;
  public clause: ValidationClause;

  public constructor(parent: Validations, type: number) {
    this.parent = parent;
    this.type = type;
  }

  public check(targetProperty: string): ValidationClause {
    this.property = targetProperty;
    this.clause = new ValidationClause(this.parent, this);
    return this.clause;
  }
}
