// ==UserScript==
// @name Hol's Redirector Instances - TikTok and Twitter
// @author Lucas Holanda
// @namespace http://github.com/lucasvhol
// ==/UserScript==

(function() {
    'use strict';

    const DEBUG_MODE = false;
    const HTTPS = 'https://';
    const LOGS_TITLE = 'REDIRECTOR LOGS\n';

    // Redirect instances
    const instances = {
        nitter: 'nitter.snopyta.org',
        proxitok: 'proxitok.pussthecat.org'
    };

    // Data mapping domains to redirect functions
    const data = [
        [['twitter.com'], () => redirect(instances.nitter)],
        [['tiktok.com'], () => redirect(instances.proxitok)]
    ];

    // Main redirection logic
    function mainRedirect() {
        const { host } = location;
        for (let [domains, redirectFn] of data) {
            if (domains.some(domain => host.includes(domain))) {
                logDebug(`Redirecting ${host}`);
                return redirectFn();
            }
        }
    }

    // Redirect to the specified domain
    function redirect(domain, pathname = location.pathname, search = location.search) {
        const redirectUrl = `${HTTPS}${domain}${pathname}${search}`;
        if (DEBUG_MODE) {
            logDebug(`URL: ${redirectUrl}`);
        } else {
            location.replace(redirectUrl);
        }
    }

    // Utility for debug logging
    function logDebug(message) {
        console.log(`${LOGS_TITLE}${message}`);
    }

    mainRedirect();
})();
