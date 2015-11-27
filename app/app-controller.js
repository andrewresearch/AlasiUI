/**
 * Created by andrew on 6/01/15.
 */

function MainCtrl ($scope) { 
    $scope.title = "ALASI 2015 - Reflective Writing Workshop";
} 

function MainTabs ($scope, $window,$sce) {
    //var content = $sce.trustAsHtml("<verb-detection />")
    $scope.tabs =[
        { title:'Tab1 Title', content:'<tab-one></tab-one>' },
        { title:'Tab2 Title', content:'<tab-one />' }
    //{ title:'Verb Detection', content: '<verb-detection />'}
  ] ;
}

// Add controllers to the app
angular 
    .module(mainAppName) 
    .controller('MainCtrl', MainCtrl)
    .controller('MainTabs', MainTabs);
