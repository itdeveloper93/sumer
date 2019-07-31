export const environment = {
    production: true,
    JWT: {
        whitelistedDomains: ['http://sumr.evomedia.pro'],
        blacklistedRoutes: ['http://sumr.evomedia.pro/auth']
    },
    API: {
        URL: 'https://51.145.98.38/api/'
    },
    hmr: false
};
