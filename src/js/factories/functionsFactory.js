app.factory('FunctionsFactory', [function () {
    return {
        setRatio: function (donations, donationsReceived) {
            var min, max,
                percent,
                ratio = [],
                donater = donations > donationsReceived;

            if(donater) {
                min = donationsReceived;
                max = donations;
            } else {
                min = donations;
                max = donationsReceived;
            }

            percent = min * 100 / (min + max);

            ratio.push({
                value: donations || 0,
                percent: donater ? 100 - percent : percent,
                type: !donations ? 'warning' : 'success'
            });

            ratio.push({
                value: donationsReceived || 0,
                percent: donater ? percent : 100 - percent,
                type: 'danger'
            });

            return {ratio: ratio, percent: Math.ceil(donater ? 100 - percent : percent || (donater ? 100 : -donationsReceived))};
        }
    };
}]);