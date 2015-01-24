angular.module('imagequizz').controller('QuizzController',
    function (QuestionData, StatData, $ionicNavBarDelegate, $scope, $document, $ionicPopup, $timeout, $stateParams, $ionicHistory) {
        //Ermittelt die aktuelle höhe des Dokuemnts für den View
        $scope.actHeight = $document.innerHeight;

        //Variablen im Scope für Anzeige der aktuellen Frage
        $scope.act = 0;

        //Variablen für die Rundenstatistik
        $scope.cur = 0;
        $scope.correctAnswersCount = 0;
        $scope.wrongAnswerCount = 0;
        $scope.workedQuestionCount = 0;
        $scope.learnedQuestionCount = 0;
        $scope.rightAnswer = "";
        $scope.wrongAnswer = "";

        //Holen der Daten Fragen + Statistiken
        this.stats = StatData.findAll();
        $scope.questions = QuestionData.findAll();

        //Nicht gelernte Fragen
        $scope.questionList = [];

        //Suche nach den zu lernenden Fragen
        this.stats.forEach(function (stat) {
            $scope.questions.forEach(function (question) {
                // Wenn passende Statistik gefunden ist, die Kategorie übereinstimmt und Frage nicht gelernt ist.
                if(stat.questionID === question.id && question.category === $stateParams.id && stat.actRightSeries < 6){
                   // $scope.complete++;
                    $scope.questionList.push(question);
                }
            });
        });

        //Setzten des Titels (aktuelle Frage/gesammt Fragen)
        $timeout(function () {
            $ionicNavBarDelegate.title($scope.act+1 + "/" + $scope.questionList.length);
        }, 750);

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

        //Holen der nächsten Frage
        $scope.nextQuestion = function () {
            if($scope.cur < $scope.questionList.length){
                $scope.question = $scope.questionList[$scope.cur++];
                $ionicNavBarDelegate.title($scope.cur + "/" + $scope.questionList.length);
            } else {
                var categoryCompletePopup = $ionicPopup.alert({
                    title: 'Rundenstatistik',
                    template: 'Bearbeitete Fragen: '+$scope.workedQuestionCount +'<br><hr>Korrekt beantwortet: '+$scope.correctAnswersCount+'<br>Falsch beantwortet: '+$scope.wrongAnswerCount+'<hr>Gelernte Karten: '+$scope.learnedQuestionCount
                });
                categoryCompletePopup.then(function() {
                    $ionicHistory.goBack();
                })
            }
        };

        //Holen der ersten Frage. (Mindestens eine Frage verfügbar(sichergestellt durch QuestionListController)
        $scope.nextQuestion();


        this.testAnswer = function (answer) {
            //Stat zur aktuellen Frage suchen
            var correctAnswer = '';
            var currentStat = {};
            this.stats.forEach(function (stat) {
               if(stat.questionID == $scope.question.id){
                   currentStat = stat;
               }
            });
            //Korrekte Antwort suchen
            $scope.question.options.forEach(function (option) {
                if (option['answer'] == true) {
                    correctAnswer = option['option'];
                }
            });
            //Antwort Prüfen
            if (answer === correctAnswer) {
                //Anzeige in GUI
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.rightAnswer = option['option'];
                    }
                });
                //Ende Anzeige in GUI
                //Aktionen wenn Antwort richtig war
                $scope.correctAnswersCount++;
                if(currentStat.actRightSeries+1 == 6){
                    $scope.learnedQuestionCount++;
                }
                currentStat.actRightSeries++;
                currentStat.countRight++;
                StatData.update(currentStat);

            } else {
                //Anzeige in GUI
                $scope.question.options.forEach(function (option) {
                    if (option['option'] == answer) {
                        $scope.wrongAnswer = answer;
                    }
                    if (option['answer'] == true) {
                        $scope.rightAnswer = option['option'];
                    }
                });
                //Ende Anzeige in GUI
                //Aktionen wenn Antwort falsch war
                $scope.wrongAnswerCount++;
                currentStat.actRightSeries = 0;
                currentStat.countWrong++;
                StatData.update(currentStat);
            }
            //Bearbeitet Fragen Counter erhöhen
            $scope.workedQuestionCount++;
            //Resultat anzeigen und nächste Frage holen.
            $timeout(function () {
                $scope.wrongAnswer = "";
                $scope.rightAnswer = "";
                $scope.nextQuestion();
            }, 1000);
        }
    }
);
