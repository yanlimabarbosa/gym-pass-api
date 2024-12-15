export class LateCheckInValidationError extends Error {
  constructor() {
    super(
      'The check-in can only be validated up to 20 minutes of its creation.',
    )
  }
}
