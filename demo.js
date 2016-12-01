var app = angular.module('app',[]);

app.directive('aPopover',function($compile){
    var htmlTemplate ="  <a href='javascript:void(0);' tabindex='0'  data-html='true' " +
    " data-toggle='popover' data-trigger='click' data-placement='right' >{{text}}</a>";
    var popoverTemplate="<div class='popover' role='tooltip'><div class='arrow'></div><h3 class='popover-title'></h3>"+
    "<div class='popover-content' id='popContentDiv' ></div></div>";
    var popoverContentTemplate='<div><h6 ng-repeat="item in list">id:{{item.id}} name:{{item.name}}</h6></div>';
    var linkFn =$compile(popoverContentTemplate);
    return {
        restrict: 'EA', //E = element（元素）, A = attribute（属性）, C = class, M = comment         
                scope: {
                       list:'=',
                       text:'@'       
                    },
                template: htmlTemplate,
                link: function (scope,element, attrs) { 
                  var node = linkFn(scope);
                   var a =  $(element).find('a');
                   a.popover({template:popoverTemplate,
                                content:node
                            });
               
                } 
    }
});

app.controller('demoCtrl',function($scope,$compile){

    $scope.dataList=[{id:1,name:'aaaaa'},{id:2,name:'bbbbb'}];

});