import nextConnect from 'src/lib/utils/nextConnect'
import authentication from './authentication'

export default () => nextConnect().use(authentication)
