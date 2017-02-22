import { Validations } from "./BaseBuilder/Validations";

export abstract class BaseBuilder<T> {
  protected validations: Validations;
  protected executed: boolean;
  public allowDuplicates: boolean;
  [key: string]: any;

  public constructor() {
    this.validations = new Validations();
    this.setupValidations();
  }

  public execute(): Promise<T | undefined> {
    this.validations.validate(this);
    return Promise.resolve(undefined);
  }

  public withAllowDuplicates(allowDuplicates?: boolean) {
    if (allowDuplicates !== undefined) {
      this.allowDuplicates = allowDuplicates;
    }
    return this;
  }

  protected abstract setupValidations(): void;
}
