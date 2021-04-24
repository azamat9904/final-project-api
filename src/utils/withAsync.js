const withAsync = async (fn, ...args) => {
    try {
        const object = await fn(...args);

        return {
            object,
            error: null
        };
    } catch (error) {
        return {
            object: null,
            error
        };
    }
};

module.exports = withAsync;
