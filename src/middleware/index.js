import nextConnect from 'src/middleware'
import authentication from './authentication'

export default () => nextConnect().use(authentication)
