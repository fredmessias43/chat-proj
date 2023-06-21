import { message } from './message/message'
import { message } from './message/message'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(message)
  app.configure(message)
  // All services will be registered here
}
