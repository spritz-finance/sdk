export class UnsupportedChainError extends Error {
  constructor(message = 'Spritz does not yet support this chain') {
    super(message)
    this.name = 'UnsupportedChainError'
  }
}
