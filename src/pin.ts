/**
 * @module Pin
 */

import { Component, Template } from "@scalable.software/component";
import { type Configuration } from "@scalable.software/component";

import {
  Tag,
  CSS,
  Attributes,
  Status,
  Event,
  Gesture
} from "./pin.meta.js";
import { Validate } from "./pin.validation.js";

/**
 * Component configuration: tag-bound template + co-located stylesheet.
 * @category Configuration
 */
export const configuration: Configuration = {
  url: import.meta.url,
  template: {
    id: Tag
  },
  css: {
    name: CSS
  }
} as const;

/**
 * Pin — a two-state pinned/unpinned button component.
 * @category Component
 */
export class Pin extends Component {
  /**
   * The canonical custom-element tag for the component.
   * @category Configuration
   */
  public static get Tag() {
    return Tag;
  }

  /**
   * Observed DOM attributes (derived from {@link Attributes}).
   * @category State
   */
  public static get Attributes(): Attributes {
    return Attributes;
  }

  /**
   * Framework template loader for `pin.template.html`.
   * @category Utility
   */
  public static Template = new Template(import.meta.url);

  /**
   * Cached runtime references for composition parts declared with `cached: true`.
   * @category State
   * @hidden
   */
  protected elements: { icon: HTMLDivElement | null } = { icon: null };

  /**
   * @hidden
   */
  constructor() {
    super(configuration);
  }

  /**
   * Canonical, internally owned status. The DOM attribute always mirrors this value.
   * @hidden
   */
  private _status: Status = Status.UNPINNED;

  /**
   * Current status of the component.
   * @category State
   */
  public get status(): Status {
    return this._status;
  }

  /**
   * Set the status. Validates, guards no-ops, reflects to the DOM attribute,
   * and dispatches the corresponding semantic event after the transition is accepted.
   * @category State
   */
  public set status(status: Status) {
    // Validate
    status = Validate.status(status);

    // Guard
    if (this._status === status) return;

    // Mutate
    this._status = status;
    this.setAttribute(Attributes.STATUS, status);

    // Dispatch
    const event = { detail: { status } };
    status === Status.PINNED && this._dispatchEvent(Event.ON_PIN, event);
    status === Status.UNPINNED && this._dispatchEvent(Event.ON_UNPIN, event);
  }

  /**
   * Route observed attribute changes through the public mutation path.
   * @hidden
   */
  protected _attributeHandlers = {
    [Attributes.STATUS]: (value: Status) => (this.status = value)
  };

  /**
   * Materialize the compulsory `status` attribute when missing at parse time.
   * @hidden
   */
  protected _initialize = () => {
    !this.hasAttribute(Attributes.STATUS) &&
      this.setAttribute(Attributes.STATUS, this._status);
  };

  /**
   * Cache runtime element references after the template has been rendered.
   * @hidden
   */
  protected _cache = () => {
    this.elements.icon = this.root.querySelector("div.icon");
  };

  // -------- Operations --------

  /**
   * Set status to {@link Status.PINNED}.
   * @category Operation
   */
  public pin = () => (this.status = Status.PINNED);

  /**
   * Set status to {@link Status.UNPINNED}.
   * @category Operation
   */
  public unpin = () => (this.status = Status.UNPINNED);

  /**
   * Toggle the status between {@link Status.PINNED} and {@link Status.UNPINNED}.
   * @category Operation
   */
  public toggle = () =>
    (this.status =
      this.status === Status.PINNED ? Status.UNPINNED : Status.PINNED);

  // -------- Event subscription properties --------

  /**
   * @hidden
   */
  private _onpin: EventListener | null = null;

  /**
   * Subscription property for the `onpin` event.
   * @category Event
   */
  public set onpin(handler: EventListener | null) {
    this._onpin && this.removeEventListener(Event.ON_PIN, this._onpin);
    this._onpin = handler;
    this._onpin && this.addEventListener(Event.ON_PIN, this._onpin);
  }

  /**
   * @hidden
   */
  private _onunpin: EventListener | null = null;

  /**
   * Subscription property for the `onunpin` event.
   * @category Event
   */
  public set onunpin(handler: EventListener | null) {
    this._onunpin && this.removeEventListener(Event.ON_UNPIN, this._onunpin);
    this._onunpin = handler;
    this._onunpin && this.addEventListener(Event.ON_UNPIN, this._onunpin);
  }

  // -------- Gesture wiring --------

  /**
   * @hidden
   */
  private _onClick: EventListener = () => this.toggle();

  /**
   * @hidden
   */
  protected _addEventListeners = () => {
    this.elements.icon?.addEventListener(Gesture.CLICK, this._onClick);
  };

  /**
   * @hidden
   */
  protected _removeEventListeners = () => {
    this.elements.icon?.removeEventListener(Gesture.CLICK, this._onClick);
  };
}
