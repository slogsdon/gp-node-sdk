import {
  TransactionModifier,
  TransactionType,
} from "../../";
import { ValidationTarget } from "./ValidationTarget";

export interface IRuleSet {
  [key: number]: ValidationTarget[];
}

export class Validations {
  public rules: IRuleSet;

  public constructor() {
    this.rules = {};
  }

  public of(
    type: TransactionType,
    modifier = TransactionModifier.None,
  ): ValidationTarget {
    if (!this.rules.hasOwnProperty(type.toString())) {
      this.rules[type] = [];
    }

    const target = new ValidationTarget(this, type, modifier);
    this.rules[type].push(target);
    return target;
  }
}
