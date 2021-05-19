const utils = function () {
    this.isIn = function(value, key, defaultValue) {
        value = value.includes(key) ? `${value.split(key)[1]}` : defaultValue;
        return value;
    }
    this.getBuildInfo = function () {
        return new Promise((resolve) => {
            let argv = process.env.npm_config_argv;
            if (!argv) {
                resolve(null);
                return false;
            }
            argv = JSON.parse(argv);
    
            let runId = argv.original.indexOf('run');
            const buildType = argv.original[runId + 1];
            let envType = argv.original[runId + 2];
            envType = envType ? this.isIn(envType, 'env=', 'uat') : 'uat';
            let type = argv.original[runId + 3];
            type = type ? this.isIn(type, 'type=', 'aiplat') : 'aiplat';
            resolve({
                runId,
                buildType,
                envType,
                type,
            });
        });
    }
    return this;
}

module.exports = utils();