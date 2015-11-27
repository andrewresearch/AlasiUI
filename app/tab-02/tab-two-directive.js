/*
 * Copyright 2015 Andrew Gibson
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/**
 * Created by andrew on 6/01/15.
 */

function tabTwo () {
    //Console.log("tabOne directive called")
    return {
        restrict: "E",
        replace: true,
        templateUrl: 'tab-02/tab-two.html'
        //template: "<p>hello</p>"
    }; 
};

// Add directive to the app
angular 
    .module(mainAppName)
    .directive("tabTwo",tabTwo);