'use strict';

angular.module('bahmni.clinical')
    .controller('TreatmentController', ['$scope', 'clinicalAppConfigService', 'treatmentConfig', '$stateParams', '$rootScope',
        function ($scope, clinicalAppConfigService, treatmentConfig, $stateParams, $rootScope) {
            var init = function () {
                var drugOrderHistoryConfig = treatmentConfig.drugOrderHistoryConfig || {};
                $scope.drugOrderHistoryView = drugOrderHistoryConfig.view || 'default';
                $scope.tabConfigName = $stateParams.tabConfigName || 'default';
                console.log($rootScope._openVisit);
                $scope.visitUuid = $rootScope._openVisit.uuid;
                $scope.sectionForNotes = {
                    "type": "observation",
                    "treatmentNoteTitle": "Treatment Notes",
                    "config": {
                        "conceptNames": [
                            "Consultation Note"
                        ],
                        "showDetailsButton": true,
                        "showGroupDateTime": true
                    }
                };

                var initializeTreatments = function () {
                    $scope.consultation.newlyAddedTabTreatments = $scope.consultation.newlyAddedTabTreatments || {};
                    $scope.consultation.newlyAddedTabTreatments[$scope.tabConfigName] = $scope.consultation.newlyAddedTabTreatments[$scope.tabConfigName] || {treatments: [], orderSetTreatments: [], newOrderSet: {}};
                    $scope.treatments = $scope.consultation.newlyAddedTabTreatments[$scope.tabConfigName].treatments;
                    $scope.orderSetTreatments = $scope.consultation.newlyAddedTabTreatments[$scope.tabConfigName].orderSetTreatments;
                    $scope.newOrderSet = $scope.consultation.newlyAddedTabTreatments[$scope.tabConfigName].newOrderSet;
                };

                $scope.$watch('consultation.newlyAddedTabTreatments', initializeTreatments);

                $scope.enrollment = $stateParams.enrollment;
                $scope.treatmentConfig = treatmentConfig;
            };
            init();
        }]);
