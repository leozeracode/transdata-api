import { bodyParser, cors, contentType } from '@/main/middlewares'
import { INestApplication } from '@nestjs/common'

export default (app: INestApplication): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
