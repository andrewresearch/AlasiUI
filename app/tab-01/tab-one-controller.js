/**
 * Created by andrew on 10/01/15.
 */

function tabOneCtrl($scope, $http, $sce) {
    //Console.log("tabOneCtrl running...")
    $scope.tabOneData;
    //var reflection = { reflection: "This is a test"}; //$scope.reflectiveText};
    $scope.analysis;
    $scope.reflection = {
        source:"",
        url:"#",
        text:""
    };
    $scope.analysed = false;

    $scope.loadTabOneData = function() {
        var httpRequest = $http({
            method: 'GET',
            url: fullUrl('hello'),
            data: null

        }).success(function(data, status) {
            $scope.tabOneData = data;
        });

    };

    $scope.analyseReflection = function() {
        //$scope.analysed = false;
        var httpRequest = $http({
            method: 'POST',
            url: fullUrl('reflection'),
            data: $scope.reflection.text
        });
        httpRequest.success(function(data, status) {
            $scope.analysis = data;
            $scope.analysed = true;

        });
        httpRequest.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
        //$scope.$apply();
    }

    $scope.reset = function() {
        $scope.analysed = false;
        $scope.analysis = "";
    }

    $scope.addText = function(type) {
        //$scope.reflection.text = "Here is some personal text";
        var httpRequest = $http({
            method: 'GET',
            url: 'data/'+type+'.json',
            data: null
        });
        httpRequest.success(function(data, status) {
            $scope.reflection.text = data.text;
            $scope.reflection.url = data.url;
            $scope.reflection.source = data.source;
        });
        httpRequest.error(function(data, status, headers, config) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    }

    $scope.clearText = function() {
        $scope.reflection.text = "";
        $scope.reflection.url = "";
        $scope.reflection.source = "";
    }

    $scope.markupSentence = function(tag) {
        //console.log("tag: "+JSON.stringify(tag));
        var phrases = tag.phrases;
        var markedUp = tag.sentence;
        for (phrase in phrases) {
            var phraseParts = phrases[phrase].split('[');
            //console.log("phraseParts: "+phraseParts.toString());
            var phraseText = phraseParts[0];
            var phraseType = phraseParts[1].split(',')[0];
            //console.log("phrase: "+phraseText+", phraseType: "+phraseType);
            markedUp = markedUp.replace(new RegExp(phraseText,"ig"),"<span class=\""+phraseType+"\">"+phraseText+"</span>");
        }
        return $sce.trustAsHtml(markedUp);
    }
};

angular
    .module(mainAppName)
    .controller('tabOneCtrl', tabOneCtrl);