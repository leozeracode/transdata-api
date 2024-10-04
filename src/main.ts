import { MongooseHelper } from './infra/db/mongodb/helpers'
import env from './main/config/env'

async function bootstrap (): Promise<void> {
  MongooseHelper.connect(env.mongoUrl)
    .then(async () => {
      const { setupApp } = await import('./main/config/app')
      const app = await setupApp()
      app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
    .catch(console.error)
}
bootstrap()
