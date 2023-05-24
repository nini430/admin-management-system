import logger from 'pino';
import config from 'config'
import dayjs from 'dayjs';

const level=config.get<string>('logLevel');

const log=logger({
    base:{
        pid:false
    },
    transport:{
        target:'pino-pretty'
    },
    level,
    timestamp:()=>`, "time":"${dayjs().format()}"`
})

export default log;  