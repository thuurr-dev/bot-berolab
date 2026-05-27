export function getPuppeteerConfig() {
    const config = {
        executablePath: '/usr/bin/chromium-browser',
        headless: true,
        timeout: 60 * 1000,
    };
    
    return config;
}