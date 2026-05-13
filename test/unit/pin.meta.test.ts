import {
  Tag,
  Attributes,
  State,
  Status,
  Operation,
  Event as PinEvent,
  Gesture
} from "@callmehuyv/pin-button";

// Tag
metadata(Metadata.TAG, () => {
  when("Tag imported", () => {
    then("Tag is defined", () => {
      expect(Tag).toBeDefined();
    });

    then("Tag is the canonical pin-button tag", () => {
      expect(Tag).toBe("pin-button");
    });
  });
});

// Attributes
metadata(Metadata.ATTRIBUTES, () => {
  and("Attributes imported", () => {
    then("Attributes is defined", () => {
      expect(Attributes).toBeDefined();
    });

    when("Attributes is defined", () => {
      then("Attributes is an object", () => {
        expect(typeof Attributes).toBe("object");
      });

      then("Attributes contains STATUS", () => {
        expect(Attributes.STATUS).toBe("status");
      });
    });
  });
});

// State
metadata(Metadata.STATE, () => {
  and("State imported", () => {
    then("State is defined", () => {
      expect(State).toBeDefined();
    });

    when("State is defined", () => {
      then("State is an object", () => {
        expect(typeof State).toBe("object");
      });

      then("State contains STATUS from Attributes", () => {
        expect(State.STATUS).toBe("status");
      });
    });
  });
});

// Status value domain
metadata("status-domain", () => {
  and("Status imported", () => {
    then("Status is defined", () => {
      expect(Status).toBeDefined();
    });

    then("Status contains PINNED and UNPINNED", () => {
      expect(Status.PINNED).toBe("pinned");
      expect(Status.UNPINNED).toBe("unpinned");
    });
  });
});

// Operation
metadata(Metadata.OPERATION, () => {
  and("Operation imported", () => {
    then("Operation is defined", () => {
      expect(Operation).toBeDefined();
    });

    when("Operation is defined", () => {
      then("Operation is an object", () => {
        expect(typeof Operation).toBe("object");
      });

      then("Operation contains PIN, UNPIN, TOGGLE", () => {
        expect(Operation.PIN).toBe("pin");
        expect(Operation.UNPIN).toBe("unpin");
        expect(Operation.TOGGLE).toBe("toggle");
      });
    });
  });
});

// Event
metadata(Metadata.EVENT, () => {
  and("Event imported", () => {
    then("Event is defined", () => {
      expect(PinEvent).toBeDefined();
    });

    when("Event is defined", () => {
      then("Event is an object", () => {
        expect(typeof PinEvent).toBe("object");
      });

      then("Event contains ON_PIN and ON_UNPIN", () => {
        expect(PinEvent.ON_PIN).toBe("onpin");
        expect(PinEvent.ON_UNPIN).toBe("onunpin");
      });
    });
  });
});

// Gesture
metadata(Metadata.GESTURE, () => {
  and("Gesture imported", () => {
    then("Gesture is defined", () => {
      expect(Gesture).toBeDefined();
    });

    when("Gesture is defined", () => {
      then("Gesture is an object", () => {
        expect(typeof Gesture).toBe("object");
      });

      then("Gesture contains CLICK, HOVER, FOCUS", () => {
        expect(Gesture.CLICK).toBe("click");
        expect(Gesture.HOVER).toBe("hover");
        expect(Gesture.FOCUS).toBe("focus");
      });
    });
  });
});
