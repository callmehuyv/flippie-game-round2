/**
 * @module Pin
 */

import { Status } from "./pin.meta.js";

/**
 * Runtime enforcement of the value domains declared in {@link ./pin.meta.ts}.
 * Public writable mutation paths call validation before mutation proceeds.
 * @category Validation
 */
export class Validate {
  public static status = (value: string): Status => {
    const valid = Object.values(Status).includes(value as Status);
    if (!valid) {
      throw new Error(`Invalid status value: ${value}`);
    }
    return value as Status;
  };
}
