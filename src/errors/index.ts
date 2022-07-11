export class UnsupportedChainError extends Error {
  constructor(message = 'Spritz does not yet support this chain') {
    super(message)
    this.name = 'UnsupportedChainError'
  }
}

export class UnsupportedPaymentTokenError extends Error {
  constructor(message = 'Spritz does not yet support token for payments') {
    super(message)
    this.name = 'UnsupportedPaymentTokenError'
  }
}
