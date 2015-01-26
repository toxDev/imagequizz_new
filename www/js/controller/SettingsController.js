/**
 * Der SettingsController ist zuständig für den SettingsView der App. Er kümmert sich zum Beispiel um die Abhandlung
 * der beiden Modale und ihrer Funktionen. Desweiteren kann man mit diesm Controller weitere Kategorien(Module) hinzufügen,
 * die Statistiken zurücksetzen und die Benutzerdaten über ein Firebase backend sichern.
 *
 * @author Andreas Ebner, <andreas.ebner@mni.thm.de>
 * @author Florian Kolb, <florian.kolb@mni.thm.de>
 * @author Julian Schmitt, <julian.schmitt.mni.thm.de>
 *
 */
angular.module('imagequizz').controller('SettingsController',
    function ($scope, $state, $ionicModal, QuestionImport, QuestionData, StatData, Stat, $ionicPopup) {

        //beim Aufruf des Controllers/Views wird geprüft ob sync an oder aus ist
        if (localStorage.getItem('sync') == 1) {
            $scope.syncModel = {checked: true};
        } else {
            $scope.syncModel = {checked: false};
        }

        /**
         * Funktion für das hinzufügen der neuen Module
         */
        this.addCategorys = function () {
            $scope.importModules = [];
            var importQuestions = QuestionImport.findAll();
            var questions = QuestionData.findAll();
            //Kategorien die bereits importiert sind entfernen
            for (var i = 0; i < importQuestions.length; i++) {
                var notIn = true
                for (var j = 0; j < questions.length; j++) {
                    if (questions[j].category === importQuestions[i].category) {
                        notIn = false;
                        break;
                    }
                }
                if (notIn) {
                    $scope.importModules.push({'category': importQuestions[i].category, 'status': false});
                    notIn = true;
                }
            }
            $scope.questionImportModal.show();
        };

        /**
         * Import Modal
         */
        $ionicModal.fromTemplateUrl('templates/ImportModulesModal.html', {
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.questionImportModal = modal;
        });

        $scope.closeQuestionImportModal = function () {
            $scope.questionImportModal.hide();
        };

        /**
         * Funktion zum Importieren neuer Module.
         */
        this.importModules = function () {
            var importQuestions = QuestionImport.findAll();
            for (var i = 0; i < $scope.importModules.length; i++) {
                if ($scope.importModules[i].status) {
                    for (var j = 0; j < importQuestions.length; j++) {
                        if (($scope.importModules[i].category === importQuestions[j].category)) {
                            QuestionData.persist(importQuestions[j]);
                            StatData.persist(new Stat(importQuestions[j].id, 0, 0, 0));
                        }
                    }
                }
            }
            $scope.closeQuestionImportModal();
            $state.go('tabs.home');
        };
        //Ende Code für Modulimport

        //Code zum Zurücksetzen der Kategorien (gelernte Karten)
        this.stats = StatData.findAll();
        $scope.questionList = QuestionData.findAll();

        /**
         * Funktion zum überprüfen, welche Statistiken zurückgesetzt werden sollen.
         */
        this.resetStats = function () {
            this.stats = StatData.findAll();
            $scope.modules = [];
            this.stats.forEach(function (stat) {
                $scope.questionList.forEach(function (question) {
                    if (stat.questionID === question.id && stat.actRightSeries > 5) {
                        question.status = false;
                        $scope.modules.push(question);
                    }
                })
            });
            $scope.resetStatModal.show();
        };

        /**
         * QuestionReset Modal
         */
        $ionicModal.fromTemplateUrl('templates/DeleteQuestionStatsModal.html', {
            scope: $scope,
            backdropClickToClose: false,
            animation: 'slide-in-up',
            focusFirstInput: true
        }).then(function (modal) {
            $scope.resetStatModal = modal;
        });

        $scope.closeResetStatModal = function () {
            $scope.resetStatModal.hide();
        };

        /**
         * Funktion zum zurücksetzen der gelernten Statistiken.
         */
        this.resetLearnedCards = function () {
            for (var i = 0; i < $scope.modules.length; i++) {
                if ($scope.modules[i].status) {
                    this.stats.forEach(function (stat) {
                        $scope.questionList.forEach(function (question) {
                            if (stat.questionID === question.id && question.category == $scope.modules[i].category && stat.actRightSeries > 5) {
                                stat.actRightSeries = 0;
                                StatData.update(stat);
                            }
                        })
                    });
                }
            }
            $scope.closeResetStatModal();
        };
        //Ende Code Zurücksetzten der Kategorien

        /**
         * Holt sich die aktuelle User ID aus dem lokal storage und gibt diese zurück
         * @returns {*} die gesetzte user ID
         */
        $scope.getUID = function () {
            return localStorage.getItem('sync');
        };

        //Code zum an und ausschalten der Firebase integration
        $scope.userID = localStorage.getItem('userid') || '-';

        /**
         * Die Funktion syncDataChange prüft den aktuellen Stand des Toggle-Buttons in der SettingsView und agiert je
         * nach Stellung dieses Buttons.
         */
        this.syncDataChange = function () {
            if ($scope.syncModel.checked === true) {

                $scope.data = {};
                var myPopup = $ionicPopup.show({
                    template: '<input type="text" ng-model="data.uid" placeholder="{{userID}}">',
                    title: 'Cloud aktivieren',
                    subTitle: 'Wenn Sie bereits eine NutzerID haben geben Sie diese ein. Ansonsten wählen Sie weiter.<hr>Die offline Daten stehen im Onlinemodus nicht zur Verfügung!',
                    scope: $scope,
                    buttons: [
                        {
                            text: 'Abbrechen',
                            onTap: function () {
                                $scope.syncModel.checked = !$scope.syncModel.checked;
                            }
                        },
                        {
                            text: 'Weiter',
                            type: 'button-positive',
                            onTap: function () {
                                if ($scope.data.uid == undefined) {
                                    $scope.data.uid = $scope.userID;
                                } else {
                                    $scope.userID = $scope.data.uid;
                                }
                                localStorage.setItem('userid', $scope.data.uid)
                                localStorage.setItem('sync', 1);
                                QuestionData.setSync(1, $scope.data.uid);
                                StatData.setSync(1, $scope.data.uid);
                            }
                        }
                    ]
                });
            } else {
                var confirmPopup = $ionicPopup.confirm({
                    title: 'Cloud deaktivieren',
                    template: 'Möchten Sie die Synchronisation beenden und offline arbeiten?<hr>Die Clouddaten stehen offline nicht zur Verfügung!'
                    //TO-DO Button an deutsches Layout anpassen
                    /*                        buttons: [
                     {text: 'Nein'},
                     {text: 'Ja',type: 'button-positive'},
                     ]*/
                });
                confirmPopup.then(function (res) {
                    if (res) {
                        localStorage.setItem('sync', 0);
                        QuestionData.setSync(0);
                        StatData.setSync(0);
                    } else {
                        $scope.syncModel.checked = !$scope.syncModel.checked;
                    }
                });
            }
        };
        //Ende backup Code
    });
