var PeakAuth = function (service, redirectUri) {
    var self = {};
    if (!($ && $.ajax)) return self; // jQuery is required.

    function QueryString(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function RemoveQueryString(parameter, url) {
        if (!url) url = window.location.href;
        var urlparts = url.split('?');
        if (urlparts.length >= 2) {

            var prefix = encodeURIComponent(parameter) + '=';
            var pars = urlparts[1].split(/[&;]/g);
            for (var i = pars.length; i-- > 0;) {
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
            return url;
        } else {
            return url;
        }
    }

    function Meta(name, content) {
        var content = (content == null) ? 'content' : content;
        var item = document.querySelector("meta[name='" + name + "']");
        if (item)
            return item.getAttribute(content);
        else
            return null;
    }

    function GetSiteUrl() {
        return (location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + "/");
    }

    self.baseUri = "http://auth.peakup.org/";

    self.defaults = {
        service: service || Meta("peak:service") || "suite",
        redirectUri: redirectUri || Meta("peak:uri") || GetSiteUrl()
    };

    self.queries = {
        service: QueryString("service"),
        code: QueryString("code"),
        redirectUri: QueryString("redirect_uri"),
        loginHint: QueryString("login_hint"),
        status: QueryString("status")
    };

    self.settings = {
        handle: function () { return "peak." + (self.isAuthService() ? "auth" : service || self.defaults.service) + ".settings"; },
        get: function (service) { return JSON.parse(localStorage.getItem(this.handle(service))) || {}; },
        set: function (settings, service) { localStorage.setItem(this.handle(service), JSON.stringify(settings)); },
        clear: function (service) { localStorage.removeItem(this.handle(service)); }
    };

    self.token = {
        handle: function (service) { return "peak." + (self.isAuthService() ? "auth" : service || self.defaults.service) + ".token"; },
        get: function (service) { return localStorage.getItem(this.handle(service)); },
        set: function (token, service) { localStorage.setItem(this.handle(service), token); },
        clear: function (service) { localStorage.removeItem(this.handle(service)); }
    };

    self.resolver = {
        providers: {
            defaults: self.defaults,
            queries: self.queries,
            settings: self.settings,
            token: self.token
        },
        service: function (service) { return service || this.providers.queries.service || this.providers.defaults.service || "default"; },
        code: function (code) { return code || this.providers.queries.code || this.providers.token.get(); },
        redirectUri: function (redirectUri) { return redirectUri || this.providers.queries.redirectUri || this.providers.defaults.redirectUri; },
        loginHint: function (loginHint) { return loginHint || this.providers.queries.loginHint || this.providers.settings.get().loginHint; }
    };

    self.getBaseUri = function (service, redirect_uri) {
        return self.baseUri + "?service=" + self.resolver.service(service) + "&redirect_uri=" + encodeURIComponent(self.resolver.redirectUri(redirect_uri));
    };

    self.isAuthService = function () {
        return Meta("peak:auth") === "true";
    };

    self.manager = {
        redirect: function (url) {
            window.location.href = url;
        },
        reauth: function () {
            self.token.clear();
            if (!self.isAuthService()) {
                self.manager.redirect(self.getBaseUri());
            }
        }
    };



    self.request = function (type, path, data, auth) {
        return $.ajax({
            type: type,
            url: self.baseUri + path,
            data: data,
            beforeSend: function (xhr) {
                var token = self.token.get();
                if (token) {
                    xhr.setRequestHeader("Authorization", "Bearer " + token);
                }
            }
        });
    };

    self.get = function (path, data) {
        return self.request("GET", path, data);
    };

    self.post = function (path, data, auth) {
        return self.request("POST", path, data);
    };

    self.verify = function (token, service, redirect_uri) {
        self.get("verify", {
            code: self.resolver.code(token),
            service: self.resolver.service(service),
            redirect_uri: self.resolver.redirectUri(redirect_uri)
        }).then(function (response) {
            console.log("Verified", response);
            if (self.isAuthService() && response.result) {
                self.manager.redirect(self.resolver.redirectUri() + "?code=" + self.resolver.code());
            }
            else if (!response.result) {
                self.manager.reauth();
            }

        }).fail(function (response) {
            console.log("Failed", response);
            self.manager.reauth();
        });
    };

    if (self.isAuthService() && self.queries.status === "completed" && self.queries.code && self.queries.redirectUri) {
        self.token.set(self.queries.code);
        self.manager.redirect(self.queries.redirectUri + "?code=" + self.queries.code);
        return self;
    }

    if (self.queries.code) {
        self.token.set(self.queries.code);
        self.manager.redirect(RemoveQueryString("code"));
        return self;
    }

    if (self.resolver.code()) { self.verify(); }
    else { self.manager.reauth(); }

    self.api = {
        me: function () { return self.get("api/me").fail(self.manager.reauth); },
        services: function () { return self.get("api/services").fail(self.manager.reauth); }
    };

    self.with = {
        azuread: function (login_hint, service, redirect_uri) {
            if (self.isAuthService()) {
                self.get("with/azuread", {
                    login_hint: self.resolver.loginHint(login_hint),
                    service: self.resolver.service(service),
                    redirect_uri: self.resolver.redirectUri(redirect_uri)
                }).then(function (response) {
                    if (response.result) {
                        self.token.set(response.code);
                        self.manager.redirect(response.completeUri);
                    }
                    else {
                        self.token.clear();
                    }
                });
            }
            else {
                self.manager.reauth();
            }
        },
        native: function (username, password, service, redirect_uri) {
            if (self.isAuthService()) {
                self.get("with/native", {
                    username: username,
                    password: password,
                    service: self.resolver.service(service),
                    redirect_uri: self.resolver.redirectUri(redirect_uri)
                }).then(function (response) {
                    if (response.result) {
                        self.token.set(response.code);
                        self.manager.redirect(response.completeUri);
                    }
                    else {
                        self.token.clear();
                    }
                });
            }
            else {
                self.manager.reauth();
            }
        }
    };

    self.logout = function () {
        self.post("api/logout").then(function (response) {
            if (response.result) {
                self.token.clear();
                self.manager.reauth();
            }
        })
    };

    return self;
};