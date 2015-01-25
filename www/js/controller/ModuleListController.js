/**
 * Der ModuleListController kümmert sich um die Anzeige und das Löschen der Kategorien, die man importiert hat.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
"use strict";
angular.module('imagequizz').controller('ModuleListController',
    function ($scope, $state, QuestionData, StatData) {
        //Productive Code
        $scope.questions = QuestionData.findAll();

        //Wenn die Modulliste aufgerufen wird, werden die Daten neu geladen
        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if(toState.url == "/modules"){
                    $scope.questions = QuestionData.findAll();
                }
            });

        //Code für das Löschen von Modulen
        this.deleteCategory = function (category) {
            $scope.stats = StatData.findAll();
            for (var i = 0; i < $scope.questions.length; i++) {
                if($scope.questions[i].category === category){
                    QuestionData.delete($scope.questions[i].id);
                    for (var j = 0; j <  $scope.stats.length; j++) {
                        if($scope.questions[i].id ==  $scope.stats[j].questionID){
                            StatData.delete($scope.stats[j].questionID);
                        }
                    }
                }
            }
            $state.reload();
        };

        //Ende Code für Löschen von Modulen

        //Wechselt zum Settings Tab
        this.goToSettings = function () {
            $state.go('tabs.settings');
        };
        //Code für die Suche nach Modulen
        $scope.searchActive = false;
        this.searchQuery = '';
        if (localStorage.getItem('saveQuery')) {
            this.searchActive = true;
            this.searchQuery = JSON.parse(localStorage.getItem('saveQuery'));
            localStorage.removeItem('saveQuery');
        }
        ;
        this.toggleSearch = function () {
            if (this.searchActive) {
                this.searchQuery = '';
            }
            this.searchActive = !this.searchActive;
        };
        //Ende der suche
    });