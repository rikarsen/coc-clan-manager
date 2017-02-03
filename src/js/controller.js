'use strict';

angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 'toaster', 'ClanFactory', function ($scope, $translate, $localStorage, $window, toaster, ClanFactory) {
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');

        $scope.toaster = toaster;

        $scope.app = {
            name: 'Clan Manager',
            version: '1.0.0',
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',
                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black',
                navbarCollapseColor: 'bg-white-only',
                asideColor: 'bg-black',
                headerFixed: true,
                asideFixed: false,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        };

        $scope.clanFactory = ClanFactory;

        // save settings to local storage
        // if (angular.isDefined($localStorage.settings)) {
        //     $scope.app.settings = $localStorage.settings;
        // } else {
        //     $localStorage.settings = $scope.app.settings;
        // }
        // $scope.$watch('app.settings', function () {
        //     if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
        //         // aside dock and fixed must set the header fixed.
        //         $scope.app.settings.headerFixed = true;
        //     }
        //     // save to local storage
        //     $localStorage.settings = $scope.app.settings;
        // }, true);

        $scope.lang = {isopen: false};
        $scope.langs = {en: 'English', hy: 'Հայերեն'};
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || 'English';
        $scope.setLang = function (langKey) {
            $scope.selectLang = $scope.langs[langKey];
            $translate.use(langKey);
            $scope.lang.isopen = !$scope.lang.isopen;
        };

        function isSmartDevice($window) {
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }
    }]);
