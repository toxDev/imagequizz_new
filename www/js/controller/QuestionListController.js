angular.module('imagequizz').controller('QuestionListController',
    function ($scope, $state, $stateParams, $rootScope, QuestionData) {
        //Kategorie für die Anzeige Vorbereiten
        $scope.questions = QuestionData.findAll();
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
            /* for (var i = 0; i < $scope.questionList.length; i++) {
             if (StatData.findStatByQuestionId($scope.questionList[i].id).actRightSeries < 6 && (!($scope.questionList.length == 0)) && $scope.questionList) {
             $state.go('question_view_quizz', {id: $stateParams.id});
             return;
             }
             }
             var popup = $ionicPopup.confirm({
             title: 'Du hast alle Fragen gelernt!',
             template: 'Soll der Lern-Zähler zurückgesetzt werden?',
             cancelText: 'Nein',
             okText: 'Ja'
             });
             popup.then(function (res) {
             if (res) {
             $scope.questionList.forEach(function (question) {
             StatData.updateStat(question.id, StatData.findStatByQuestionId(question.id).countRight,
             StatData.findStatByQuestionId(question.id).countWrong, 0);
             });
             $state.go('question_view_quizz', {id: $stateParams.id});

             }
             });*/
            $state.go('question_view_quizz', {id: $stateParams.id});
        };
    } );
