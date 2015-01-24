angular.module('imagequizz').factory('QuestionData',
    function (QuestionDataPersist, QuestionDataLocal) {

        var sync = localStorage.getItem('sync');
        if(!sync){
            localStorage.setItem('sync', 1);
            sync = 1;
        }

        var service = {
            findAll: function () {
                if(sync){
                    return QuestionDataPersist.findAll();
                } else {
                    return QuestionDataLocal.findAll();
                }
            },
            findById: function (id) {
                if(sync){
                    QuestionDataPersist.findById(id);
                } else {
                    QuestionDataLocal.findById(id);
                }
            },
            delete: function (id) {
                if(sync){
                    QuestionDataPersist.delete(id);
                } else {
                    QuestionDataLocal.delete(id);
                }
            },
            persist: function (question) {
                if(sync){
                    QuestionDataPersist.persist(question);
                } else {
                    QuestionDataLocal.persist(question);
                }
            }/*,
             update: function (question) {
             this.findAll().$save(question);
             }*/
        };
        return service;
    });