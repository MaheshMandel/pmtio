// UTM + referral parameter capture — stored as root-domain cookies
(function () {
    var params = new URLSearchParams(window.location.search);
    var utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    var captured = {};

    utmKeys.forEach(function (key) {
        var val = params.get(key);
        if (val) captured[key] = val;
    });

    var host = window.location.hostname;
    var isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(host);
    var isLocal = host === 'localhost';

    // Referral code — read by app.pickmytrade.io from the shared root-domain cookie
    var referral = params.get('referral');
    if (referral && /^[\w-]{1,64}$/.test(referral)) {
        var refExpires = new Date();
        refExpires.setDate(refExpires.getDate() + 30);
        var refParts = [
            'referral=' + encodeURIComponent(referral),
            'expires=' + refExpires.toUTCString(),
            'path=/'
        ];
        if (!isIp && !isLocal) {
            var rp = host.split('.');
            refParts.push('domain=' + (rp.length >= 2 ? '.' + rp.slice(-2).join('.') : host));
        }
        refParts.push('SameSite=Lax');
        document.cookie = refParts.join('; ');
    }

    if (!captured.utm_source) {
        if (document.cookie.indexOf('pmt_utm=') !== -1) {
            var clearParts = ['pmt_utm=', 'expires=Thu, 01 Jan 1970 00:00:00 GMT', 'path=/'];
            if (!isIp && !isLocal) {
                var hp = host.split('.');
                clearParts.push('domain=' + (hp.length >= 2 ? '.' + hp.slice(-2).join('.') : host));
            }
            clearParts.push('SameSite=Lax');
            document.cookie = clearParts.join('; ');
        }
        return;
    }

    var expires = new Date();
    expires.setDate(expires.getDate() + 30);

    var cookieParts = [
        'pmt_utm=' + encodeURIComponent(JSON.stringify(captured)),
        'expires=' + expires.toUTCString(),
        'path=/'
    ];

    if (!isIp && !isLocal) {
        var parts = host.split('.');
        var rootDomain = parts.length >= 2 ? '.' + parts.slice(-2).join('.') : host;
        cookieParts.push('domain=' + rootDomain);
    }

    cookieParts.push('SameSite=Lax');
    document.cookie = cookieParts.join('; ');
})();
