angular.module('imagequizz').factory('StatData',
    function (StatDataPersist,StatDataLocal) {

        var sync = localStorage.getItem('sync');
        /*if(!sync){
            localStorage.setItem('sync', 1);
            sync = 1;
         }*/

        var service = {
            findAll: function () {
                if(sync){
                    return StatDataPersist.findAll();
                } else {
                    return StatDataLocal.findAll();
                }
            },/*,
             findById: function (id) {
             return this.findAll().$getRecord(id);
             },*/
            delete: function (id) {
                if(sync){
                    StatDataPersist.delete(id);
                } else {
                    StatDataLocal.delete(id);
                }
            },
            persist: function (question) {
                if(sync){
                    StatDataPersist.persist(question);
                } else {
                    StatDataLocal.persist(question);
                }
            },
             update: function (stat) {
                 if(sync){
                     StatDataPersist.update(stat);
                 } else {
                    StatDataLocal.update(stat);
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