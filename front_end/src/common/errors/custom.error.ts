export class CustomError {
  public readonly _error: TypeError;
  constructor(error: TypeError) {
    this._error = error;
  }
}

export interface TypeError {
  message: string;
}
