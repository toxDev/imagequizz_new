angular.module('imagequizz').controller('QuizzController',
    function (QuestionData, StatData, $ionicNavBarDelegate, $scope, $document, $ionicPopup) {
        //Frage für die Anzeige Vorbereiten
        $scope.questions = QuestionData.findAll();
        $scope.stats = StatData.findAll();
        $scope.questionList = [];
        for (var i = 0; i < $scope.questions.length; i++) {
            for (var j = 0; j < $scope.stats.length; j++) {
                if($scope.stats[j].questionID == $scope.questions[i].id){
                    if($scope.stats[j].actRightSeries < 6){
                        $scope.questionList.push($scope.questions[i]);
                    }
                }
            }
        }
        console.log($scope.stats);
        console.log($scope.questions);
        console.log($scope.questionList);

        $scope.cur = 0;
        //$scope.questionList = this.removeFullyRememberedQuestions(QuestionData.findAllQuestionsByCategory($stateParams.id));
        $scope.correctAnswersCount = 0;
        $scope.wrongAnswerCount = 0;
        $scope.workedQuestionCount = 0;
        $scope.learnedQuestionCount = 0;
        $scope.rightAnswer = "";
        $scope.wrongAnswer = "";

        //Zeigt zu einer Frage für 2500ms den in der Frage hinterlegten Infotext an
        this.toggleInfo = function () {
            var popup = $ionicPopup.alert({
                title: 'Information',
                template: $scope.question.infoText
            });
            $timeout(function () {
                popup.close();
            }, 2500);
        };


        //Ermittelt die aktuelle höhe des Dokuemnts für den View
        $scope.actHeight = $document.innerHeight;
        //Setzten des Titels (aktuelle Frage/gesammt Fragen)
        //$ionicNavBarDelegate.setTitle($scope.act + "/" + $scope.complete);

        $scope.nextQuestion = function () {
            if($scope.cur < $scope.questionList.length){
                $scope.question = $scope.questionList[$scope.cur++];
                //$ionicNavBarDelegate.setTitle($scope.cur + "/" + $scope.complete);
            } else {
                var categoryCompletePopup = $ionicPopup.alert({
                    title: 'Rundenstatistik',
                    template: 'Bearbeitete Fragen: '+$scope.workedQuestionCount +'<br><hr>Korrekt beantwortet: '+$scope.correctAnswersCount+'<br>Falsch beantwortet: '+$scope.wrongAnswerCount+'<hr>Gelernte Karten: '+$scope.learnedQuestionCount
                });
                categoryCompletePopup.then(function(res) {
                    // $ionicNavBarDelegate.back();
                })
            }

        };
        $scope.testAnswer = function (answer) {
            $scope.nextQuestion();
        }



    }
);
