angular.module('imagequizz').controller('QuestionListController',
    function ($state, $rootScope, QuestionData) {
        $scope.questionList = QuestionData.findAll();
        //$rootScope.$viewHistory.backView = null;
        this.goToModuleList = function () {
            $state.go('tabs.home');
        }
} );
