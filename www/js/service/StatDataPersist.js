angular.module('imagequizz').factory('StatDataPersist',
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);
        var statRef = rootRef.child('statistic');
        //Angular Fire wrapper
        var statRefAngular = $firebase(statRef);

        var service = {
            findAll: function () {
                return statRefAngular.$asArray();
            },
            findById: function (id) {
                return this.findAll().$getRecord(id);
            },
            delete: function (id) {
                this.findAll().$remove(this.findById(id));
            },
            persist: function (stat) {
                this.findAll().$add(stat);
            },
            update: function (stat) {
                this.findAll().$save(stat);
            }
         };
        return service;
    });