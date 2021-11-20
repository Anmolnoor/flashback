"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTimestamp = () => {
    return new Date().toISOString();
};
const info = (namespace, message, object) => {
    if (object) {
        console.info(`${getTimestamp()} [${namespace}] [INFO] ${message} `, object);
    }
    else {
        console.info(`${getTimestamp()} [${namespace}] [INFO] ${message}`);
    }
};
const warn = (namespace, message, object) => {
    if (object) {
        console.warn(`${getTimestamp()} [${namespace}] [WARN] ${message} `, object);
    }
    else {
        console.warn(`${getTimestamp()} [${namespace}] [WARN] ${message}`);
    }
};
const error = (namespace, message, object) => {
    if (object) {
        console.error(`${getTimestamp()} [${namespace}] [ERROR] ${message} `, object);
    }
    else {
        console.error(`${getTimestamp()} [${namespace}] [ERROR] ${message}`);
    }
};
const debug = (namespace, message, object) => {
    if (object) {
        console.debug(`${getTimestamp()} [${namespace}] [DEBUG] ${message} `, object);
    }
    else {
        console.debug(`${getTimestamp()} [${namespace}] [DEBUG] ${message}`);
    }
};
exports.default = {
    info,
    warn,
    error,
    debug,
};
