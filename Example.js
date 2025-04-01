export default class AbstractSource {
  name = 'Missing name'
  description = 'No description provided'
  /** @type {import('./type-definitions').Accuracy} */
  accuracy = 'Low'
  /** @type {import('./type-definitions').Config} */
  config = {}

  single (options) {
    throw new Error('Source doesn\'t implement single')
  }

  batch (options) {
    throw new Error('Source doesn\'t implement batch')
  }

  movie (options) {
    throw new Error('Source doesn\'t implement movie')
  }
}
