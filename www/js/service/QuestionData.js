angular.module('imagequizz').factory('QuestionData',
    function (QuestionDataPersist, QuestionDataLocal) {

        var sync = localStorage.getItem('sync');

        //Setzten des default Verhaltens wenn sync nicht im localstorage abgelegt ist.
        if(!sync){
            localStorage.setItem('sync', 0);
            sync = 0;
        }

        localStorage.getItem('userid')

        var service = {
            findAll: function () {
                if(sync == 1){
                    return QuestionDataPersist.findAll();
                } else {
                    return QuestionDataLocal.findAll();
                }
            },
            findById: function (id) {
                if(sync == 1){
                    QuestionDataPersist.findById(id);
                } else {
                    QuestionDataLocal.findById(id);
                }
            },
            delete: function (id) {
                if(sync == 1){
                    QuestionDataPersist.delete(id);
                } else {
                    QuestionDataLocal.delete(id);
                }
            },
            persist: function (question) {
                if(sync == 1){
                    QuestionDataPersist.persist(question);
                } else {
                    QuestionDataLocal.persist(question);
                }
            },
            update: function (question) {
                 if(sync == 1){
                     QuestionDataPersist.update(question);
                 } else {
                     QuestionDataLocal.update(question);
                 }
            },
            setSync: function (set, userid) {
                if (set == 1) {
                    QuestionDataPersist.setUID(userid);
                    sync = 1;
                } else {
                    sync = 0;
                 }
            }
        };
        return service;
    });