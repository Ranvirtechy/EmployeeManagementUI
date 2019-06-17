(function (angular) {
    angular.module(getModuleName()).factory("auth", ["$http", function ($http) {
        function Meta(name,content){
            var content = (content==null)?'content':content;
            return document.querySelector("meta[name='"+name+"']").getAttribute(content);
        }
        var auth = new PeakAuth(Meta("peak-service") || "suite", location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "") + "/");
        $http.defaults.headers.common.Authorization = 'Bearer ' + auth.token.get();
        return auth;
    }]);
})(angular);