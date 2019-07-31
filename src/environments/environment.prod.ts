export const environment = {
    production: true,
    hmr: false,
    JWT: {
        whitelistedDomains: ['http://sumr.evomedia.pro'],
        blacklistedRoutes: ['http://sumr.evomedia.pro/auth']
    },
    API: {
        URL: 'https://51.145.98.38/api/',
        LOGIN: 'https://51.145.98.38/api/Account/Login',
        REFRESH_TOKEN: 'https://51.145.98.38/api/Account/RefreshToken'
    }
};
