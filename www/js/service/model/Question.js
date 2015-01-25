/**
 * Das Model Question repräsentiert alle Eigenschaften einer Frage.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
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