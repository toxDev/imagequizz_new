/**
 * QuestionDataPersist ist zuständig für die Speicherung aller importierten Fragen auf Firebase. Zu dem kümmert sich
 * der Service auch noch um das löschen und upaten dieser Fragen.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
angular.module('imagequizz').factory('QuestionDataPersist',
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);

        if(!localStorage.getItem('userid')){
            localStorage.setItem('userid', rootRef.push().key());
        }

        var statRefAngular = $firebase(rootRef.child(localStorage.getItem('userid')).child('questions'));

        var service = {
            findAll: function () {
                return statRefAngular.$asArray();
            },
            findById: function (id) {
                return this.findAll().$getRecord(id);
            },
            delete: function (id) {
                var questions = this.findAll();
                for (var i = 0; i < questions.length; i++) {
                    if(questions[i].id == id){
                        questions.$remove(this.findById(questions[i].$id));
                    }
                }
            },
            persist: function (question) {
                this.findAll().$add(question);
            },
            update: function (question) {
                this.findAll().$save(question);
            },
            setUID: function (userid) {
                statRefAngular = $firebase(rootRef.child(userid).child('questions'));
            }
        };
        return service;
    });