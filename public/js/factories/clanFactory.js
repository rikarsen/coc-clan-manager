app.factory('ClanFactory', ['$http', '$q', function ($http, $q) {
    return {
        members: '',
        getMembers: function (update) {
            var deferred = $q.defer();

            if(!this.members || update) {
                $http.get('/members')
                    .then(function (res) {
                        deferred.resolve(res.data);
                    });

                this.members = deferred.promise;
            }

            return this.members;
        },
        getMembersApi: function () {
            return $http.get('/membersApi')
                .then(function (res) {
                    return res.data;
                });
        },
        syncMembers: function (syncMembers) {
            return $http.post('/syncMembers', syncMembers);
        },
        aaaa: function () {
            return $http.get('/aaaa')
                .then(function (res) {
                    return res.data;
                });
        },
        bbbb: function (tag) {
            return $http.post('/bbbb', tag)
                .then(function (res) {
                    return res.data;
                });
        },
        cccc: function (tag) {
            return $http.post('/cccc', tag)
                .then(function (res) {
                    return res.data;
                });
        },
        dddd: function () {
            return $http.get('/dddd')
                .then(function (res) {
                    return res.data;
                });
        },
    };
}]);