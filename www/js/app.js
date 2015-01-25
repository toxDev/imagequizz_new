/**
 * Die App.js ist zuständig für die korrekte Konfiguration der App.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
"use strict";
angular.module('imagequizz', ['ionic', 'firebase', 'angular.filter', 'googlechart'])
    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $stateProvider
            .state('tabs', {
                url: "/tab",
                abstract: true,
                templateUrl: "templates/TabsView.html"
            })
            .state('tabs.home', {
                url: "/modules",
                views: {
                    'module-tab': {
                        templateUrl: "templates/ModuleListView.html",
                        controller: 'ModuleListController as mlCtrl'
                    }
                }
            })
            .state('tabs.stats', {
                url: '/stats',
                views: {
                    'stats-tab': {
                        templateUrl: "templates/StatView.html",
                        controller: "StatisticController as statsCtrl"
                    }
                }
            })
            .state('tabs.settings', {
                url: '/settings',
                views: {
                    'settings-tab': {
                        templateUrl: "templates/SettingView.html",
                        controller: "SettingsController as stCtrl"
                    }
                }
            })
            .state('question_list', {
                url: '/questionlist/:id',
                templateUrl: 'templates/QuestionListView.html',
                controller: 'QuestionListController as qlCtrl'
            })
            .state('question_view', {
                url: '/questionview/:id',
                templateUrl: 'templates/QuestionView.html',
                controller: 'QuestionController as qCtrl'
            })
            .state('question_view_quizz', {
                url: '/questionview/quizz/:id',
                templateUrl: 'templates/QuestionView.html',
                controller: 'QuizzController as qCtrl'
            });
        $urlRouterProvider.otherwise("/tab/modules");

        //Ionic Beta 14 - Fix Back Button Text (no text but icon)
        $ionicConfigProvider.backButton.text('').icon('ion-arrow-left-c').previousTitleText(false);
        //der ConfigProvider wird benötigt um die Tab Bar am unteren Rand zu fixieren
        $ionicConfigProvider.tabs.position('bottom');
    })
    .constant('FIREBASE_URL', 'https://imagequizz.firebaseio.com')
    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    });
