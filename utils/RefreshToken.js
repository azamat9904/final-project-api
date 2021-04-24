class RefreshToken {

    constructor() {
        if (!RefreshToken.instance) {
            this.refreshTokens = {};
            RefreshToken.instance = this;
        }

        return RefreshToken.instance;
    }

    getRefreshToken(refreshToken) {
        return this.refreshTokens[refreshToken];
    }

    setRefreshToken(refreshToken, email) {
        this.refreshTokens[refreshToken] = email;
    }

    get() {
        return this.refreshTokens;
    }
}

module.exports = RefreshToken;