'use strict';
angular.module('imagequizz').factory('Question',
    function () {
        var Question = function (id, category, imageLink, imageOwner, infoText, options) {
            this.id = id;
            this.category = category;
            this.imageLink = imageLink;
            this.imageOwner = imageOwner;
            this.infoText = infoText;
            this.options = options
        };
        return Question;
    }
)