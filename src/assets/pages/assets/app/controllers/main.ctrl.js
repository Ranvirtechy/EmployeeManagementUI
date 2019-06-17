(function (angular) {
    angular.module(getModuleName()).controller("MainController", ["$scope", "$http" ,"auth", function ($scope, $http, auth) {
        var self = this;
        self.me = {};
        self.services = [];

        auth.api.me().then(function (response) {
            console.log("Me", response);
            self.me = response;
            $scope.$apply();
        });
        auth.api.services().then(function (response) {
            console.log("Services", response);
            response.forEach(function (item) {
                self.services.push(item);
            });
            $scope.$apply();
        });

        self.onItemClicked = function (item) {
            console.log("Item", item);
            window.location.href = item.uri;
            //switch (item.status) {
            //    case "Locked":
            //        self.modalMessage = "Bu ürünü açmak için lütfen sistem yöneticiniz iletişime geçiniz.";
            //        $('#product-modal').modal('show');
            //        return;
            //    case "Coming Soon":
            //        self.modalMessage = "Yakında Yayında!";
            //        $('#product-modal').modal('show');
            //        return;
            //    case "Open":
            //        if (item.urls) {
            //            var exp = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
            //            var regex = new RegExp(exp);
            //            if (regex.test(item.urls.app)) {
            //                window.location.href = items.urls.app;
            //            }
            //            else {
            //                $location.path(item.urls.app);
            //            }
            //        }
            //        return;
            //}
        };

        self.itemHelpers = {};
        self.itemHelpers.getCustomClasses = function (item) {
            if (item.properties && item.properties.classes)
                return item.properties.classes.reduce(function (x, y) { return x + " " + y });
            return "";
        };

        //self.itemHelpers.getUserCount = function (item) {
        //    if (item.count && item.count.user)
        //        return item.count.user;
        //    return 0;
        //};

        //self.itemHelpers.getClassByStatus = function (item) {
        //    return item.status === "Open" || item.status === "Coming Soon" ? "hide" : "";
        //};

        //self.itemHelpers.getClassByUserCount = function (item) {
        //    return item.count.user <= 0 ? "hide" : "";
        //};

        //self.itemHelpers.getClassByNotification = function (item) {
        //    return item.notificationCount <= 0 ? "hide" : "";
        //};

        //self.items = [
        //    {
        //        logo: "Content/img/app-fatura-icon.png",
        //        name: "Fatura Sistemi",
        //        status: "Open",
        //        notificationCount: 0,
        //        urls: {
        //            app: "/billing",
        //            buy: "/",
        //        },
        //        count: {
        //            user: 10
        //        },
        //        custom: {
        //            classes: ["color-1"]
        //        }
        //    },
        //    {
        //        logo: "Content/img/app-cv-icon.png",
        //        name: "CV Havuzu",
        //        status: "Open",
        //        notificationCount: 0,
        //        urls: {
        //            app: "/cv-havuzu",
        //            buy: "/",
        //        },
        //        count: {
        //            user: 0
        //        },
        //        custom: {
        //            classes: ["color-2"]
        //        }
        //    },
        //    {
        //        logo: "Content/img/app-csp-icon.png",
        //        name: "CSP Portal",
        //        status: "Open",
        //        notificationCount: 2,
        //        urls: {
        //            app: "/csp",
        //            buy: "/",
        //        },
        //        count: {
        //            user: 0
        //        },
        //        custom: {
        //            classes: ["color-2"]
        //        }
        //    },
        //    {
        //        logo: "Content/img/app-peakbot-icon.png",
        //        name: "PeakBot Yönetimi",
        //        status: "Open",
        //        notificationCount: 0,
        //        urls: {
        //            app: "/peakbot",
        //            buy: "/",
        //        },
        //        count: {
        //            user: 0
        //        },
        //        custom: {
        //            classes: ["color-2"]
        //        }
        //    },
        //    {
        //        logo: "Content/img/app-hodoor-icon.png",
        //        name: "Hodoor",
        //        status: "Open",
        //        notificationCount: 0,
        //        urls: {
        //            app: "http://hodoor.peakup.org/",
        //            buy: "/",
        //        },
        //        count: {
        //            user: 0
        //        },
        //        custom: {
        //            classes: ["color-2"]
        //        }
        //    },
        //    {
        //        logo: "Content/img/app-masraf-icon.png",
        //        name: "Masraf Yönetimi",
        //        status: "Locked",
        //        notificationCount: 0,
        //        urls: {
        //            app: "/",
        //            buy: "/",
        //        },
        //        count: {
        //            user: 0
        //        },
        //        custom: {
        //            classes: ["color-2"]
        //        }
        //    },
        //    {
        //        logo: "Content/img/app-fatura-icon.png",
        //        name: "Kapalı Sistem",
        //        status: "Locked",
        //        urls: {
        //            app: "/billing",
        //            buy: "/",
        //        },
        //        count: {
        //            user: 0
        //        },
        //        custom: {
        //            classes: ["color-2"]
        //        }
        //    }
        //];

        self.modalMessage = "";
        console.log("DashboardController", self);

        self.logout = function () {
            auth.logout();
        };

        return self;
    }]);
})(angular);