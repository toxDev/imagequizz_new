angular.module('imagequizz').controller('QuestionController',
    function ($ionicPopup, $scope, QuestionData, $stateParams, $document, $timeout, $ionicNavBarDelegate, $state) {
        $scope.actHight = $document.innerHeight;
        //Frage für die Anzeige Vorbereiten
        $scope.questions = QuestionData.findAll();
        $scope.question = null;
        for (var i = 0; i < $scope.questions.length; i++) {
            if($scope.questions[i].id == $stateParams.id){
                $scope.question = $scope.questions[i];
                break;
            }
        }
        //Informationstext zur angezeigten Frage
        this.toggleInfo = function () {
            var popup = $ionicPopup.alert({
                title: 'Information',
                template: $scope.question.infoText
            });
            $timeout(function () {
                popup.close();
            }, 2500);
        };
        //Prüft die gegebene Antwort auf Korrektheit
        this.testAnswer = function (answer) {
            var correctAnswer;
            var count = 0;
            var result;

            $scope.question.options.forEach(function (option) {
                if (option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });

            if (answer === correctAnswer) {
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.rightAnswer = option['option'];
                        return;
                    }
                });
                result = 'Korrekte Antwort';
            } else {
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.wrongAnswer = answer;
                    }
                    if (option['answer'] == true) {
                        $scope.rightAnswer = option['option'];
                    }
                });
                result = 'Leider Falsch';
            }
            $timeout(function () {
                //$state.go('question_lists');
            }, 2000)
        };
    }
);
