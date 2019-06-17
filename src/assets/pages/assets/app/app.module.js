function getModuleName() {
    return document.getElementsByTagName("html")[0].getAttribute("ng-app") || "peakup-suite";
}

(function (angular) {
    angular.module(getModuleName(), []);
})(angular);