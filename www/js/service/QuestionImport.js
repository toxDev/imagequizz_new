/**
 * TODO: comment
 */
angular.module('imagequizz').factory('QuestionImport',
    function ($http) {

        var url = 'https://www.googledrive.com/host/0B0qhk0Zibw_FWE5HS0xGWlEzeDA';
        var modules = [];
        var promise = $http.get(url);

        //Daten vom Server holen und auf dessen Erfolg warten
        promise.success(function (data, status) {
            // status 200 == ok new data
            if (status == 200 && angular.isArray(data)) {
                localStorage.setItem('question_import', JSON.stringify(data));
                return status;
            }
        }).error(function (data, status) {
            return status
        });


        var service = {
            /**
             * Holt die zu importierenden Module aus dem LocalStorage und gibt diese zurück
             * @returns {*} array der zu importierenden Module
             */
            findAll: function () {
                return JSON.parse(localStorage.getItem('question_import'));
            }
        };
        return service;
    });