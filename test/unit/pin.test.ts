import { Template } from "@scalable.software/component";

import {
  Pin,
  Tag,
  CSS,
  Attributes,
  Status,
  Event as PinEvent
} from "@callmehuyv/pin-button";

// Configuration
configuration(Configuration.TAG, () => {
  and("Pin imported", () => {
    then("Pin is defined", () => {
      expect(Pin).toBeDefined();
    });

    and("Pin is defined", () => {
      then("Pin.Tag static getter is defined", () => {
        expect(Pin.Tag).toBeDefined();
      });

      and("Pin.Tag static getter is defined", () => {
        then("Pin.Tag is Tag", () => {
          expect(Pin.Tag).toBe(Tag);
        });
      });
    });
  });
});

configuration(Configuration.ATTRIBUTES, () => {
  and("Pin imported", () => {
    then("Pin.Attributes is Attributes", () => {
      expect(Pin.Attributes).toBe(Attributes);
    });

    then("Pin.observedAttributes contains 'status'", () => {
      expect(Pin.observedAttributes).toContain(Attributes.STATUS);
    });
  });
});

// Utilities
utility(Utilities.TEMPLATE, () => {
  then("Pin.Template static property is defined", () => {
    expect(Pin.Template).toBeDefined();
  });

  and("Pin.Template static property is defined", () => {
    then("Pin.Template is a Template", () => {
      expect(Pin.Template).toBeInstanceOf(Template);
    });
  });
});

// Compositions
composition(Composition.TEMPLATE, () => {
  given("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      define(Pin.Tag, Pin);
    });

    and("HTML Template is added to DOM", () => {
      let template: HTMLTemplateElement;
      beforeEach(async () => {
        template = (await Pin.Template.load(
          "pin.template.html"
        )) as HTMLTemplateElement;
      });
      afterEach(() => {
        remove(Pin.Tag);
      });

      then("template is defined", () => {
        expect(template).toBeDefined();
      });

      and("a new pin-button is added to DOM", () => {
        let component: Pin;
        beforeEach(() => {
          component = add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          component.remove();
        });

        then("component.root contents contains template contents", () => {
          expect(component.root.innerHTML).toContain(template.innerHTML);
        });

        then("component.root contains the icon container", () => {
          expect(component.root.querySelector("div.icon")).not.toBeNull();
        });
      });
    });
  });
});

composition(Composition.CSS, () => {
  given("Pin is defined in custom element registry", () => {
    beforeEach(() => {
      define(Pin.Tag, Pin);
    });
    and("HTML Template is added to DOM", () => {
      beforeEach(async () => {
        await Pin.Template.load("pin.template.html");
      });
      afterEach(() => {
        remove(Pin.Tag);
      });

      and("a new pin-button is added to DOM", () => {
        let component: Pin;
        beforeEach(() => {
          component = add<Pin>(Pin.Tag);
        });
        afterEach(() => {
          component.remove();
        });

        then("component.root contents contains a link to stylesheet", () => {
          expect(component.root.innerHTML).toContain("stylesheet");
        });

        then("the stylesheet file's name is correct", () => {
          expect(component.root.innerHTML).toContain(CSS);
        });
      });
    });
  });
});

// State
state("status", () => {
  given("Pin is defined and template loaded", () => {
    beforeEach(async () => {
      define(Pin.Tag, Pin);
      await Pin.Template.load("pin.template.html");
    });
    afterEach(() => {
      remove(Pin.Tag);
    });

    and("a pin-button is added with no attributes", () => {
      let component: Pin;
      beforeEach(() => {
        component = add<Pin>(Pin.Tag);
      });
      afterEach(() => {
        component.remove();
      });

      then("status defaults to UNPINNED", () => {
        expect(component.status).toBe(Status.UNPINNED);
      });

      then("the status attribute is materialized on the host", () => {
        expect(component.getAttribute(Attributes.STATUS)).toBe(
          Status.UNPINNED
        );
      });
    });

    and("status is set to PINNED imperatively", () => {
      let component: Pin;
      beforeEach(() => {
        component = add<Pin>(Pin.Tag);
        component.status = Status.PINNED;
      });
      afterEach(() => {
        component.remove();
      });

      then("status reads PINNED", () => {
        expect(component.status).toBe(Status.PINNED);
      });

      then("the status attribute reflects PINNED", () => {
        expect(component.getAttribute(Attributes.STATUS)).toBe(Status.PINNED);
      });
    });
  });
});

// Operation
operation("toggle", () => {
  given("Pin is defined, template loaded, instance added", () => {
    let component: Pin;
    beforeEach(async () => {
      define(Pin.Tag, Pin);
      await Pin.Template.load("pin.template.html");
      component = add<Pin>(Pin.Tag);
    });
    afterEach(() => {
      component.remove();
      remove(Pin.Tag);
    });

    when("toggle is called from UNPINNED", () => {
      then("status becomes PINNED", () => {
        component.toggle();
        expect(component.status).toBe(Status.PINNED);
      });
    });

    when("toggle is called twice", () => {
      then("status returns to UNPINNED", () => {
        component.toggle();
        component.toggle();
        expect(component.status).toBe(Status.UNPINNED);
      });
    });
  });
});

// Event
events("onpin", () => {
  given("Pin is defined, template loaded, instance added", () => {
    let component: Pin;
    beforeEach(async () => {
      define(Pin.Tag, Pin);
      await Pin.Template.load("pin.template.html");
      component = add<Pin>(Pin.Tag);
    });
    afterEach(() => {
      component.remove();
      remove(Pin.Tag);
    });

    then("onpin is a writable setter", () => {
      expect(hasSetter(component, PinEvent.ON_PIN)).toBe(true);
    });

    when("status transitions UNPINNED → PINNED", () => {
      then("onpin handler fires synchronously with detail.status = 'pinned'", () => {
        let captured: string | null = null;
        component.onpin = (evt) => {
          captured = (evt as CustomEvent).detail.status;
        };
        component.status = Status.PINNED;
        expect(captured).toBe(Status.PINNED);
      });
    });

    when("status is reassigned to same value", () => {
      then("onpin handler does not fire", () => {
        component.status = Status.PINNED;
        let calls = 0;
        component.onpin = () => {
          calls++;
        };
        component.status = Status.PINNED;
        expect(calls).toBe(0);
      });
    });
  });
});

events("onunpin", () => {
  given("Pin is defined, template loaded, pinned instance added", () => {
    let component: Pin;
    beforeEach(async () => {
      define(Pin.Tag, Pin);
      await Pin.Template.load("pin.template.html");
      component = add<Pin>(Pin.Tag, { status: Status.PINNED });
    });
    afterEach(() => {
      component.remove();
      remove(Pin.Tag);
    });

    when("status transitions PINNED → UNPINNED", () => {
      then("onunpin handler fires synchronously with detail.status = 'unpinned'", () => {
        let captured: string | null = null;
        component.onunpin = (evt) => {
          captured = (evt as CustomEvent).detail.status;
        };
        component.status = Status.UNPINNED;
        expect(captured).toBe(Status.UNPINNED);
      });
    });
  });
});
