import axios from 'axios'

export default axios.create({ baseURL: process.env.NEXT_PLUBIC_SERVER_URL })
