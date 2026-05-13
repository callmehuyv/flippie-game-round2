/**
 * @module Pin
 */

/**
 * Canonical custom-element tag for the component.
 * @category Configuration
 */
export const Tag = "pin-button" as const;

/**
 * Stylesheet file name loaded by the framework template mechanism.
 * @category Configuration
 */
export const CSS = "pin.style.css" as const;

/**
 * DOM attributes observed by the component. Compulsory, attribute-backed state.
 * @category Metadata
 * @enum
 */
export const Attributes = {
  STATUS: "status"
} as const;
/**
 * @category Metadata
 */
export type Attributes = typeof Attributes;

/**
 * All state keys known to the component. Includes every attribute-backed key.
 * @category Metadata
 * @enum
 */
export const State = {
  ...Attributes
} as const;
/**
 * @category Metadata
 */
export type State = (typeof State)[keyof typeof State];

/**
 * Allowed runtime values for the `status` state.
 * @category Metadata
 * @enum
 */
export const Status = {
  PINNED: "pinned",
  UNPINNED: "unpinned"
} as const;
/**
 * @category Metadata
 */
export type Status = (typeof Status)[keyof typeof Status];

/**
 * Public imperative operations exposed by the component.
 * @category Metadata
 * @enum
 */
export const Operation = {
  PIN: "pin",
  UNPIN: "unpin",
  TOGGLE: "toggle"
} as const;
/**
 * @category Metadata
 */
export type Operation = (typeof Operation)[keyof typeof Operation];

/**
 * Public semantic events emitted by the component.
 * @category Metadata
 * @enum
 */
export const Event = {
  ON_PIN: "onpin",
  ON_UNPIN: "onunpin"
} as const;
/**
 * @category Metadata
 */
export type Event = (typeof Event)[keyof typeof Event];

/**
 * Interaction inputs recognized by the component.
 * @category Metadata
 * @enum
 */
export const Gesture = {
  CLICK: "click",
  HOVER: "hover",
  FOCUS: "focus"
} as const;
/**
 * @category Metadata
 */
export type Gesture = (typeof Gesture)[keyof typeof Gesture];
