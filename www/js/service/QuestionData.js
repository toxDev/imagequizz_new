/**
 * TODO: comment
 */
angular.module('imagequizz').factory('QuestionData',
    function (QuestionDataPersist, QuestionDataLocal) {

        var sync = localStorage.getItem('sync');
        /*if(!sync){
            localStorage.setItem('sync', 1);
            sync = 1;
         }*/

        /**
         * TODO: comment
         * @type {{findAll: Function, findById: Function, delete: Function, persist: Function, update: Function, setSync: Function}}
         */
        var service = {
            findAll: function () {
                console.log(sync);
                if(sync){
                    console.log('ich bin im persist');
                    return QuestionDataPersist.findAll();
                } else {
                    console.log('ich bin lokal');
                    return QuestionDataLocal.findAll();
                }
            },
            findById: function (id) {
                if (sync === 1) {
                    QuestionDataPersist.findById(id);
                } else {
                    QuestionDataLocal.findById(id);
                }
            },
            delete: function (id) {
                if (sync === 1) {
                    QuestionDataPersist.delete(id);
                } else {
                    QuestionDataLocal.delete(id);
                }
            },
            persist: function (question) {
                if (sync === 1) {
                    QuestionDataPersist.persist(question);
                } else {
                    QuestionDataLocal.persist(question);
                }
            },
            update: function (question) {
                if (sync === 1) {
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