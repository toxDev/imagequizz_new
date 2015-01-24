angular.module('imagequizz').factory('StatDataLocal',
    function () {

        var service = {
            findAll: function () {
                var stats = localStorage.getItem('statistic');
                if(!stats){
                    stats = [];
                    localStorage.setItem('statistic', JSON.stringify(stats));
                } else {
                    stats = JSON.parse(stats);
                }
                return stats;
            },
            findById: function (id) {
                //return this.findAll().$getRecord(id);
                var stats = this.findAll();
                for(var i = 0; i < stats.length; i++){
                    if(stats[i].id == id){
                        return stats[i];
                    }
                }
            },
            delete: function (id) {
                //this.findAll().$remove(this.findById(id));
                var stats = this.findAll();
                for(var i = 0; i < stats.length; i++){
                    if(stats[i].id == id){
                        stats.splice(i,1);
                    }
                }
                localStorage.setItem('statistic',JSON.stringify(stats));
            },
            persist: function (stat) {
                //this.findAll().$add(stat);
                var stats = this.findAll();
                stats.push(stat);
                localStorage.setItem('statistic',JSON.stringify(stats));
            },
            update: function (stat) {
                //this.findAll().$save(stat);
                var stats = this.findAll();
                for (var i = 0; i < stats.length; i++){
                    if(stats[i].id == stat.id){
                        stats[i] = stat;
                        break;
                    }
                }
                localStorage.setItem('statistic',JSON.stringify(stats));
            }
        };
        return service;
    });