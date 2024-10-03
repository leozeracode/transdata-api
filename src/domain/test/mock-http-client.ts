import { HttpRequest } from '@/service/protocols'
import {faker} from '@faker-js/faker'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  body: {},
  method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
  headers: {},
})
