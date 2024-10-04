import dotenv from 'dotenv'

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/portal-dev?retryWrites=true&w=majority&appName=revantage',
  port: process.env.PORT || 5050
}

dotenv.config()
