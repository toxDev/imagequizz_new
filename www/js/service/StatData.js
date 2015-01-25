/**
 * Der Service statData kümmert sich um die korrekte Abhandlung der Daten im Hintergrund. Je nachdem was im
 * Einstellungsfenster ausgewählt wurde, spricht er entweder die lokalen oder die cloud daten an.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
angular.module('imagequizz').factory('StatData',
    function (StatDataPersist,StatDataLocal) {

        var sync = localStorage.getItem('sync');

        //Setzten des default Verhaltens wenn sync nicht im localstorage abgelegt ist.
        if(!sync){
            localStorage.setItem('sync', 0);
            sync = 0;
        }

        var service = {
            findAll: function () {
                if (sync === 1) {
                    return StatDataPersist.findAll();
                } else {
                    return StatDataLocal.findAll();
                }
            },/*,
             findById: function (id) {
             return this.findAll().$getRecord(id);
             },*/
            delete: function (id) {
                if (sync === 1) {
                    StatDataPersist.delete(id);
                } else {
                    StatDataLocal.delete(id);
                }
            },
            persist: function (question) {
                if (sync === 1) {
                    StatDataPersist.persist(question);
                } else {
                    StatDataLocal.persist(question);
                }
            },
             update: function (stat) {
                 if (sync === 1) {
                     StatDataPersist.update(stat);
                 } else {
                    StatDataLocal.update(stat);
                 }
             },
            setSync: function (set, userid) {
                if (set === 1) {
                    StatDataPersist.setUID(userid);
                    sync = 1;
                } else {
                    sync = 0;
                }
            }
        };
        return service;
    });