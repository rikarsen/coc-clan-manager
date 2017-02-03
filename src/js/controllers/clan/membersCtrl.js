app.controller('MembersCtrl', ['$scope', 'ClanFactory', 'FunctionsFactory', '$uibModal', function ($scope, ClanFactory, FunctionsFactory, $uibModal) {
    $scope.clanFactory = ClanFactory;
    $scope.functionsFactory = FunctionsFactory;

    $scope.members = [];
    $scope.displayMembers = [];

    $scope.syncing = false;

    $scope.selectedName = '';

    $scope.getMembers = function (update) {
        $scope.clanFactory.getMembers(update).then(function (members) {
            $scope.members = members;

            angular.forEach($scope.members, function (member) {
                var ratioPercent = $scope.functionsFactory.setRatio(member.donations, member.donationsReceived);

                member.ratio = ratioPercent.ratio;
                member.percent = ratioPercent.percent;

                // var percent = 0;
                //
                // if(member.donations > member.donationsReceived) {
                //     percent = member.donationsReceived * 100 / (member.donationsReceived + member.donations);
                //
                //     member.ratio.push({
                //         value: member.donationsReceived,
                //         percent: percent,
                //         type: 'success'
                //     });
                //
                //     member.ratio.push({
                //         value: member.donations,
                //         percent: 100 - percent,
                //         type: 'danger'
                //     });
                // } else {
                //     percent = member.donations * 100 / (member.donationsReceived + member.donations);
                //
                //     member.ratio.push({
                //         value: member.donations,
                //         percent: percent,
                //         type: 'success'
                //     });
                //
                //     member.ratio.push({
                //         value: member.donationsReceived,
                //         percent: 100 - percent,
                //         type: 'danger'
                //     });
                // }
            });

            $scope.displayMembers = [].concat($scope.members);

            // console.log('Members:: ', $scope.members);
        }, function (error) {
            console.log('error', error)
        });
    };

    $scope.getMembers();

    $scope.syncMembers = function (syncMembers) {
        $scope.syncing = true;

        $scope.clanFactory.syncMembers(syncMembers).then(function () {
            $scope.getMembers(true);

            $scope.toaster.pop('success', 'Members', 'Members synced');

            $scope.syncing = false;
        });
    };

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.openSyncMembersModal = function (size) {
        var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-sync-members',
            ariaDescribedBy: 'modal-body-sync-members',
            templateUrl: 'syncMembersModal.html',
            controller: function ($scope, $uibModalInstance, members, membersApi) {
                $scope.members = members;
                $scope.membersApi = membersApi;

                $scope.newMembers = [];
                $scope.oldMembers = angular.copy($scope.members);

                angular.forEach($scope.membersApi, function (member) {
                    if(!_.findWhere($scope.members, {tag: member.tag})) {
                        member.adding = true;

                        $scope.newMembers.push(member);
                    } else {
                        $scope.oldMembers = _.without($scope.oldMembers, _.findWhere($scope.oldMembers, {
                            tag: member.tag
                        }));
                    }
                });

                $scope.ok = function () {
                    $uibModalInstance.close({
                        newMembers: $scope.newMembers,
                        oldMembers: $scope.oldMembers
                    });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            size: size,
            resolve: {
                members: function () {
                    return $scope.members;
                },
                membersApi: function () {
                    return $scope.clanFactory.getMembersApi().then(function (members) {
                        return members;
                    }, function (error) {
                        console.log('error', error)
                    });
                }
            }
        });

        modal.result.then(function (syncMembers) {
            $scope.syncMembers(syncMembers);
        }, function () {
            console.log('Modal dismissed at: ' + new Date())
        });
    };

    $scope.openEditMemberModal = function (member, size) {
        $scope.memberIndex = _.indexOf($scope.members, {tag: member.tag}) + 1;

        var modal = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title-edit-member',
            ariaDescribedBy: 'modal-body-edit-member',
            templateUrl: 'editMemberModal.html',
            controller: function ($scope, $uibModalInstance, member, memberIndex, members) {
                $scope.member = member;
                $scope.memberIndex = memberIndex;
                $scope.members = members;

                $scope.max = 5;

                $scope.hoveringOver = function(value) {
                    $scope.overStar = value;
                    $scope.percent = 100 * (value / $scope.max);
                };

                $scope.ratingStates = [
                    {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
                    {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
                    {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
                    {stateOn: 'glyphicon-heart'},
                    {stateOff: 'glyphicon-off'}
                ];

                $scope.totalItems = 64;
                $scope.currentPage = 4;

                console.log(member)

                $scope.$watch('memberIndex', function (newMember, oldMember) {
                    console.log(newMember, oldMember)

                    //noinspection JSValidateTypes
                    if(newMember != oldMember) {
                        $scope.member = $scope.members[$scope.memberIndex - 1];
                    }
                }, true);

                $scope.ok = function () {
                    console.log($scope.member)

                    // $uibModalInstance.close({
                    //     newMembers: $scope.newMembers,
                    //     oldMembers: $scope.oldMembers
                    // });
                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
            },
            size: size,
            resolve: {
                member: function () {
                    return member;
                },
                memberIndex: function () {
                    return $scope.memberIndex;
                },
                members: function () {
                    return $scope.members;
                }
            }
        });

        modal.result.then(function (syncMembers) {
            $scope.syncMembers(syncMembers);
        }, function () {
            console.log('Modal dismissed at: ' + new Date())
        });
    };
}]);