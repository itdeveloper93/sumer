export const environment = {
    production: false,
    hmr: true,
    JWT: {
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/auth']
    },
    API: {
        URL: 'https://51.145.98.38/api/',
        LOGIN: 'https://51.145.98.38/api/Account/Login',
        REFRESH_TOKEN: 'https://51.145.98.38/api/Account/RefreshToken'
    }
};
