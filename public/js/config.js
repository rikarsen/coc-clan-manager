'use strict';

var app = angular.module('app')
    .config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', function ($controllerProvider, $compileProvider, $filterProvider, $provide) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
    }])
    .config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'language/',
            suffix: '.json'
        });

        $translateProvider.useSanitizeValueStrategy(null);

        $translateProvider.preferredLanguage('en');
        $translateProvider.useLocalStorage();
    }])
    .config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }])
    .config(['tooltipsConfProvider', function (tooltipsConfProvider) {
        tooltipsConfProvider.configure({
            'side': 'right',
            'size': 'small',
            'speed': 'fast'
        });
    }]);