/**
 *
 * Der StatisticController ist für die Anzeige und die aktualisierung der Statistiken dar. Im Controller wird auch ein
 * Loadingscreen inistallisiert, der den Benutzer anzeigt das die Daten geladen werden.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
angular.module('imagequizz').controller('StatisticController',
    function ($scope, StatData, QuestionData, $ionicLoading, $timeout) {

        /**
         * Wenn die Modulliste aufgerufen wird, werden die Daten neu geladen
         */
        $scope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams){
                if(toState.url == "/stats"){
                    $scope.questions = QuestionData.findAll();
                    $scope.stats = StatData.findAll();
                    $scope.loadStatistic();
                }
            });

        //Alle Daten holen
        $scope.questions = QuestionData.findAll();
        $scope.stats = StatData.findAll();

        /**
         * Lade bildschirm um den Benutzer am schnellen umschalten zu hindern
         */
        $scope.loadingIndicator = $ionicLoading.show({
            template: 'Lade Statistik<br><i class="icon ion-loading-a"></i>',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: 500
        });
        /**
         * Funktion zum laden der Statistiken. Wenn diese fertig geladen sind, dann blendet sich der Loadingscreen aus.
         */
        $scope.loadStatistic = function () {
        //Timeout um zu warten bis die Daten vorhanden sind.
        $timeout(function () {
            $scope.hideLoadingIndicator = function () {
                $ionicLoading.hide();
            };

            var sum_right = 0, sum_false = 0, undone_questions = 0;

            for (var i = 0; i < $scope.stats.length; i++) {
                if ($scope.stats[i].countRight === 0 && $scope.stats[i].countWrong === 0) {
                    undone_questions++;
                } else {
                    sum_right += $scope.stats[i].countRight;
                    sum_false += $scope.stats[i].countWrong;
                }
            }

            /*        //Statistik Daten abrufen (PieChart)
             var categorys = QuestionData.findAllCategorys();
             var chartRows = [];
             for (var i = 0; i < categorys.length; i++) {
             var questions = QuestionData.findAllQuestionsByCategory(categorys[i]);
             var category_right = 0;
             var category_wrong = 0;
             for (var j = 0; j < questions.length; j++) {
             var stat = StatData.findStatByQuestionId(questions[j].id);
             if (stat.actRightSeries >= 6) {
             category_right++;
             } else {
             category_wrong++;
             }
             }
             chartRows.push({c: [{v: categorys[i]}, {v: category_right}, {v: category_wrong}]})
             }*/

            //Statistik Daten abrufen (BarChart)
            var categorys = [];
            $scope.questions.forEach(function (question) {
                if (categorys.indexOf(question.category) == -1) {
                    categorys.push(question.category);
                }
            });
            var chartRows = [];
            for (var i = 0; i < categorys.length; i++) {
                var questions = [];
                $scope.questions.forEach(function (question) {
                   if(question.category == categorys[i]){
                       questions.push(question);
                   }
                });
                var category_right = 0;
                var category_wrong = 0;
                var stat = {};
                for (var j = 0; j < questions.length; j++) {
                    $scope.stats.forEach(function (actStat) {
                        if(actStat.questionID == questions[j].id){
                            stat = actStat;
                        }
                    });
                    if (stat.actRightSeries >= 6) {
                        category_right++;
                    } else {
                        category_wrong++;
                    }
                }
                chartRows.push({c: [{v: categorys[i]}, {v: category_right}, {v: category_wrong}]})
            }

            //Anfang des PieChart zur graphischen Anzeige der Statistiken
            $scope.chartObject = {};
            $scope.chartObject = {"type": "PieChart"}
            $scope.chartObject.data = {
                "cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "Slices", type: "number"}
                ], "rows": [
                    {
                        c: [
                            {v: "korrekt beantwortet"},
                            {v: sum_right}
                        ]
                    },
                    {
                        c: [
                            {v: "falsch beantwortet"},
                            {v: sum_false}
                        ]
                    },
                    {
                        c: [
                            {v: "unbearbeitete Fragen"},
                            {v: undone_questions}
                        ]
                    }
                ]
            };

            $scope.chartObject.options = {
                'title': 'Insgesamt beantwortetet Fragen'

            }

            $scope.chartObject.cssStyle = "height:300px; width:100%;";

            //BarChart
            $scope.chartObjectColumn = {};
            $scope.chartObjectColumn = {"type": "BarChart"}
            $scope.chartObjectColumn.data = {
                "cols": [
                    {id: "t", label: "Topping", type: "string"},
                    {id: "s", label: "gelernt", type: "number"},
                    {id: "s", label: "offen", type: "number"}
                ], "rows": chartRows
            };
            $scope.chartObjectColumn.options = {
                'title': 'Gespiele Fragen nach Kategorie',
                'isStacked': 'true',
                'legend': {position: 'bottom', textStyle: {color: 'black', fontSize: 16}}
            }
            //Ende der graphischen Anzeige
            $scope.chartObjectColumn.cssStyle = "height:400px; width:100%;";

        }, 1000);}
        $scope.loadStatistic();
}
);
