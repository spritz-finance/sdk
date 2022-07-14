export class UnsupportedNetworkError extends Error {
  constructor(message = 'Spritz does not yet support this network') {
    super(message)
    this.name = 'UnsupportedNetworkError'
  }
}

export class UnsupportedPaymentTokenError extends Error {
  constructor(message = 'Spritz does not yet support token for payments') {
    super(message)
    this.name = 'UnsupportedPaymentTokenError'
  }
}
