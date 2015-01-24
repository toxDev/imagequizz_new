angular.module('imagequizz').factory('StatData',
    function (StatDataPersist) {

        var sync = localStorage.getItem('sync');
        if(!sync){
            localStorage.setItem('sync', 1);
            sync = 1;
        }

        var service = {
            findAll: function () {
                if(sync){
                    return StatDataPersist.findAll();
                } else {

                }
            },/*,
             findById: function (id) {
             return this.findAll().$getRecord(id);
             },*/
            delete: function (id) {
                if(sync){
                    StatDataPersist.delete(id);
                } else {

                }
            },
            persist: function (question) {
                if(sync){
                    StatDataPersist.persist(question);
                } else {

                }
            },
             update: function (stat) {
                 if(sync){
                     StatDataPersist.update(stat);
                 } else {

                 }
             }
        };
        return service;
    });