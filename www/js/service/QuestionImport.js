angular.module('imagequizz').factory('QuestionImport',
    function ($http) {

        var url = 'https://www.googledrive.com/host/0B4eFE6Byab8JVVZCSFU4bGFwemc';

        var modules = [];
        var promise = $http.get(url);

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
            findAll: function () {
                return JSON.parse(localStorage.getItem('question_import'));
            }
        };
        return service;
    });