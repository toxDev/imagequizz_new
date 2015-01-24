angular.module('imagequizz').factory('QuestionData',
    function (QuestionDataPersist, QuestionDataLocal) {

        var sync = localStorage.getItem('sync');
        /*if(!sync){
            localStorage.setItem('sync', 1);
            sync = 1;
         }*/

        var service = {
            findAll: function () {
                console.log(sync);
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
            },
            update: function (question) {
                 if(sync){
                     QuestionDataPersist.update(question);
                 } else {
                     QuestionDataLocal.update(question);
                 }
            },
            setSync: function (set) {
                if (set === 1) {
                    localStorage.setItem('sync', 1);
                    sync = 1;
                } else {
                    localStorage.setItem('sync', 0);
                    sync = 0;
                }
            }
        };
        return service;
    });