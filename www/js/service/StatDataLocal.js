angular.module('imagequizz').factory('StatDataLocal',
    function () {

        var service = {
/*            findAll: function () {
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
            }*/
        };
        return service;
    });