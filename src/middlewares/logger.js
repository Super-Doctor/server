'use strict';

//analyzing the data in the logs, we could resolve bugs much quicker, and detect problems early as they happen. 
module.exports = (req, res, next) => {
    console.log('Request LOGER:', req.method, req.path);
    next();
}