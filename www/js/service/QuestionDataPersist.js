angular.module('imagequizz').factory('QuestionDataPersist',
    function ($firebase, FIREBASE_URL) {

        var rootRef = new Firebase(FIREBASE_URL);
        var statRef = rootRef.child('questions');
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
                var questions = this.findAll();
                for (var i = 0; i < questions.length; i++) {
                    if(questions[i].id == id){
                        questions.$remove(this.findById(questions[i].$id));
                    }
                }
                //this.findAll().$remove(this.findById(id));
            },
            persist: function (question) {
                this.findAll().$add(question);
            },
            update: function (question) {
                this.findAll().$save(question);
            }
        };
        return service;
    });