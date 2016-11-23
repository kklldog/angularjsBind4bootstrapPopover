var app = angular.module('app',['ngSanitize']);

app.directive('aPopover',function($sce,$compile){
    var htmlTemplate ='  <a href="javascript:void(0);" tabindex="0" class="" data-html="true" data-content="{{popHtml}}" '+
    'data-toggle="popover" data-trigger="click" data-placement="right" >{{text}}</a>';
    var popoverTemplate="<div class='popover' role='tooltip'><div class='arrow'></div><h3 class='popover-title'></h3>"+
    "<div class='popover-content' id='popContentDiv' style='background-color:red' ></div></div>";
    return {
        restrict: 'EA', //E = element（元素）, A = attribute（属性）, C = class, M = comment         
                scope: {
                       list:'=',
                       text:'@'       
                    },
                template: htmlTemplate,
                link: function (scope,element, attrs) { 
                   var html='<div ng-bind="text"></div>';
                   scope.popHtml = $sce.trustAsHtml(html);
                    // $scope.popHtml = html;
                   scope.popoverTemplate = popoverTemplate;
                   var a =  $(element).find('a');
                   a.popover({template:scope.popoverTemplate});
                   a.on('shown.bs.popover',function(){
                       var popoverContent = $('#popContentDiv');
                       popoverContent.html('');
                        var newScope = scope.$new(true);
                        newScope.text = '12345';
                       var link = $compile(html)(newScope);
                       popoverContent.append(link); 
                   });
                } 
    }
});

app.controller('demoCtrl',function($scope){
    $scope.dataList=[{id:1,name:'aaaaa'},{id:2,name:'bbbbb'}];
    $scope.text="fuck";
});