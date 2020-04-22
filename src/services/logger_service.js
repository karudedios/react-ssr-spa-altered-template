import { canUseDOM } from 'exenv';

let serverLog;
let clientLog;

if (process.env.RUNTIME_ENV !== 'browser') {
  serverLog = require('../server/services/logger_service'); // eslint-disable-line global-require
} else {
  clientLog = require('../client/services/logger_service'); // eslint-disable-line global-require
}

const log = canUseDOM ? clientLog : serverLog;

export default log;
