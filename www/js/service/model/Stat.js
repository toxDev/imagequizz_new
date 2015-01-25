/**
 * Das Model Stat repräsentiert alle Eigenschaftern einer Statistik.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
'use strict';
angular.module('imagequizz').factory('Stat',
    function () {
        var Stat = function (questionID, countRight, countWrong, actRightSeries) {
            this.countRight = countRight;
            this.countWrong = countWrong;
            this.actRightSeries = actRightSeries;
            this.questionID = questionID;
        };
        return Stat;
    }
);