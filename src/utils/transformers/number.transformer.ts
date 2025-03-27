import Decimal from 'decimal.js';
import { ValueTransformer } from 'typeorm';

export class NumberToStringTransformer implements ValueTransformer {
  to(value: number): number {
    return value; // Nessuna trasformazione necessaria verso il database
  }

  from(value: number | string): string {
    return value !== null && value !== undefined ? value.toString() : value;
  }
}

export class NumberToDecimalTransformer implements ValueTransformer {
  to(value: number): number {
    return value; // Nessuna trasformazione necessaria verso il database
  }

  from(value: number): number {
    return value !== null && value !== undefined ? new Decimal(value.toString()).toNumber() : value;
  }
}
