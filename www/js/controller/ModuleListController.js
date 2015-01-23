/**
 * Created by Andreas on 22.01.2015.
 */
"use strict";
angular.module('imagequizz').controller('ModuleListController',
    function ($scope, $state, QuestionData, StatData) {
        //Productive Code
        $scope.questions = QuestionData.findAll();

        //Code für das Importieren von Modulen
        this.deleteCategory = function (category) {
            $scope.stats = StatData.findAll();
            for (var i = 0; i < $scope.questions.length; i++) {
                if($scope.questions[i].category === category){
                    QuestionData.delete($scope.questions[i].$id);
                    for (var j = 0; j <  $scope.stats.length; j++) {
                        if($scope.questions[i].id ==  $scope.stats[j].questionID){
                            StatData.delete($scope.stats[j].$id);
                        }
                    }
                }
            }
        }

        //Ende Code für Löschen von Modulen

        //Wechselt zum Settings Tab
        this.goToSettings = function () {
            $state.go('tabs.settings');
        }

    });