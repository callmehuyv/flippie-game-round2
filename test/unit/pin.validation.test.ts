import { Validate, Status } from "@callmehuyv/pin-button";

validation("status", () => {
  and("Validate imported", () => {
    then("Validate.status is defined", () => {
      expect(Validate.status).toBeDefined();
    });

    when("a valid Status value is provided", () => {
      then("Validate.status returns the narrowed value", () => {
        expect(Validate.status(Status.PINNED)).toBe(Status.PINNED);
        expect(Validate.status(Status.UNPINNED)).toBe(Status.UNPINNED);
      });
    });

    when("an invalid value is provided", () => {
      then("Validate.status throws", () => {
        expect(() => Validate.status("nope")).toThrowError(
          /Invalid status value: nope/
        );
      });
    });
  });
});
