import { TransactionType } from "../../Entities";
import { ValidationTarget } from "./ValidationTarget";

export interface IRuleSet {
  [key: number]: ValidationTarget[];
}

export class Validations {
  public rules: IRuleSet;

  public constructor() {
    this.rules = {};
  }

  public of(type: TransactionType): ValidationTarget {
    if (!this.rules.hasOwnProperty(type.toString())) {
      this.rules[type] = [];
    }

    const target = new ValidationTarget(this, type);
    this.rules[type].push(target);
    return target;
  }
}
