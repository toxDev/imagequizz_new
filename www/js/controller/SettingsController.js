angular.module('imagequizz').controller('SettingsController',
    function ($scope, $state, $ionicModal, QuestionImport, QuestionData, StatData, Stat) {
        //Code für das Importieren von Modulen
        this.addCategorys = function(){
            $scope.importModules = [];
            var importQuestions = QuestionImport.findAll();
            var questions = QuestionData.findAll();
            //Kategorien die bereits importiert sind entfernen
            for (var i = 0; i < importQuestions.length; i++) {
                var notIn = true
                for (var j = 0; j < questions.length; j++) {
                    if(questions[j].category === importQuestions[i].category){
                        notIn = false;
                        break;
                    }
                }
                if(notIn){
                    $scope.importModules.push({'category':importQuestions[i].category, 'status': false});
                    notIn = true;
                }
            }
            $scope.questionImportModal.show();
        };

        $ionicModal.fromTemplateUrl('templates/ImportModulesModal.html', {
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.questionImportModal = modal;
        });

        $scope.closeQuestionImportModal = function() {
            $scope.questionImportModal.hide();
        };

        this.importModules = function() {
            var importQuestions = QuestionImport.findAll();
            for (var i = 0; i < $scope.importModules.length; i++) {
                if($scope.importModules[i].status){
                    for (var j = 0; j < importQuestions.length; j++) {
                        if(($scope.importModules[i].category === importQuestions[j].category)){
                            QuestionData.persist(importQuestions[j]);
                            StatData.persist(new Stat(importQuestions[j].id, 0, 0, 0));
                        }
                    }
                }
            }
            $scope.closeQuestionImportModal();
            $state.go('tabs.home');
        };
        //Ende Code für Modulimport

        //Code zum Zurücksetzten der Kategorien (gelernte Karten)
        this.stats = StatData.findAll();
        $scope.questionList = QuestionData.findAll();

        this.resetStats = function () {
            $scope.modules = [];
            this.stats.forEach(function (stat) {
                $scope.questionList.forEach(function (question) {
                    if(stat.questionID === question.id  && stat.actRightSeries > 5){
                        question.status = false;
                        $scope.modules.push(question);
                    }
                })
            });
          $scope.resetStatModal.show();
        };

        $ionicModal.fromTemplateUrl('templates/DeleteQuestionStatsModal.html', {
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.resetStatModal = modal;
        });

        $scope.closeResetStatModal = function() {
            $scope.resetStatModal.hide();
        };

        this.resetLearnedCards = function(){
            for (var i = 0; i < $scope.modules.length; i++) {
                if($scope.modules[i].status){
                    this.stats.forEach(function (stat) {
                        $scope.questionList.forEach(function (question) {
                            if (stat.questionID === question.id && question.category == $scope.modules[i].category && stat.actRightSeries > 5) {
                                stat.actRightSeries = 0;
                                StatData.update(stat);
                            }
                        })
                    });
                }
            }
            $scope.closeResetStatModal();
        };
        //Ende Code Zurücksetzten der Kategorien

    });
