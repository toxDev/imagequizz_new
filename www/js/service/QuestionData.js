angular.module('imagequizz').factory('QuestionData',
    function (QuestionDataPersist) {

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
            }/*,
            findById: function (id) {
                return this.findAll().$getRecord(id);
            },
            delete: function (id) {
                this.findAll().$remove(this.findById(id));
            },
            persist: function (question) {
                this.findAll().$add(question);
            },
            update: function (question) {
                this.findAll().$save(question);
            }*/
        };
        return service;
    });