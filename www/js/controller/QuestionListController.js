angular.module('imagequizz').controller('QuestionListController',
    function ($scope, $state, $stateParams, $rootScope, $ionicPopup, QuestionData, StatData) {
        //Kategorie für die Anzeige Vorbereiten
        $scope.questions = QuestionData.findAll();
        /*Statistiken vorher holen oder mit einer warte Methode versehen*/
        this.stats = StatData.findAll();
        $scope.questionList = [];
        for (var i = 0; i < $scope.questions.length; i++) {
            if($scope.questions[i].category == $stateParams.id){
                $scope.questionList.push($scope.questions[i]);
            }
        }

        //$rootScope.$viewHistory.backView = null;
        this.goToModuleList = function () {
            $state.go('tabs.home');
        };

        //Startet das Quizz und prüft ob noch nicht gelernte Karten vorhanden sind.
        this.startQuizzMode = function () {
            var learnedQuestionCounter = 0;
            this.stats.forEach(function (stat) {
                $scope.questionList.forEach(function (question) {
                    if(stat.questionID === question.id){
                        if(stat.actRightSeries >= 6){
                            learnedQuestionCounter++;
                        }
                    } 
                })
            });
            if(learnedQuestionCounter === $scope.questionList.length){
                var popup = $ionicPopup.confirm({
                    title: 'Du hast alle Fragen gelernt!',
                    template: 'Soll der Lern-Zähler zurückgesetzt werden?',
                    cancelText: 'Nein',
                    okText: 'Ja'
                });
                popup.then(function (res) {
                    if (res) {
                        this.resetStat();
                        $state.go('question_view_quizz', {id: $stateParams.id});
                    }
                });
            } else {
                $state.go('question_view_quizz', {id: $stateParams.id});
            }
        };
        //Zurücksetzten der Statistik (aktuell serie-richtig = 0)
        this.resetStat = function () {
            this.stats.forEach(function (stat) {
                $scope.questionList.forEach(function (question) {
                    if(stat.questionID === question.id){
                        stat.actRightSeries = 0;
                        StatData.update(stat);
                    }
                })
            });
        }
    } );
