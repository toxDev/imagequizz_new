/**
 * Created by Andreas on 22.01.2015.
 */
"use strict";
angular.module('imagequizz').controller('ModuleListController',
    function ($scope, StatDataPersist, QuestionDataPersist, Stat, Question) {

        //Productive Code
        $scope.questions = QuestionDataPersist.findAll();




        var stat = new Stat(1,4,99,0);
        StatDataPersist.update(stat);
        //QuestionDataPersist.persist({'frage':'hallo?','anwort':'moin!'});
        /*QuestionDataPersist.persist(new Question(99, "Häuser", "http://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Erithacus_rubecula_%28Marek_Szczepanek%29.jpg/640px-Erithacus_rubecula_%28Marek_Szczepanek%29.jpg", "@FlickrLickr", "Lateinischer Name: Erithacus rubecula",
            [{
                "option": "Meise",
                "answer": true
            },
                {
                    "option": "Rotkehlchen",
                    "answer": true
                },
                {
                    "option": "Buntspecht",
                    "answer": false
                },
                {
                    "option": "Lerche",
                    "answer": false
                }]
        ))*/

        $scope.modules = QuestionDataPersist.findAll();

        //StatDataPersist.persist(new Stat(4,3,3,2));
        var stats = StatDataPersist.findAll();


        stats.$loaded().then(function () {
            var temp = {};
            for (var i = 0; i < stats.length; i++) {
                temp = stats[i];
            }
            temp.actRightSeries = 100;
            StatDataPersist.update(temp);

        })

        console.log(StatDataPersist.findAll());
});