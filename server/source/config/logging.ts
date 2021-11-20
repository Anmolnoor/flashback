const getTimestamp = () => {
  return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.info(`${getTimestamp()} [${namespace}] [INFO] ${message} `, object);
  } else {
    console.info(`${getTimestamp()} [${namespace}] [INFO] ${message}`);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(`${getTimestamp()} [${namespace}] [WARN] ${message} `, object);
  } else {
    console.warn(`${getTimestamp()} [${namespace}] [WARN] ${message}`);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(
      `${getTimestamp()} [${namespace}] [ERROR] ${message} `,
      object
    );
  } else {
    console.error(`${getTimestamp()} [${namespace}] [ERROR] ${message}`);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(
      `${getTimestamp()} [${namespace}] [DEBUG] ${message} `,
      object
    );
  } else {
    console.debug(`${getTimestamp()} [${namespace}] [DEBUG] ${message}`);
  }
};

export default {
  info,
  warn,
  error,
  debug,
};
