/**
 *
 * QuestionImport holt sich alle Kategorien vom Server und stellt diese im Service Objekt zur Verfügung.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
angular.module('imagequizz').factory('QuestionImport',
    function ($http) {

        //var url = 'https://www.googledrive.com/host/0B4eFE6Byab8JVVZCSFU4bGFwemc';
        var url = 'https://www.googledrive.com/host/0B0qhk0Zibw_FWE5HS0xGWlEzeDA';
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