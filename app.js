var data;
var scope;
var result;
angular.module("app", [])
.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}])
.controller("maincontrol",function($scope, $http){
    scope = $scope;

    $scope.results = [];
    $scope.result = [];

    $http.get('data.json').then(function(data, status, headers, config) {
           $scope.classes = data.data;
       }).catch(function(data, status, headers, config) {
           console.log(data);
       });
    $scope.calculate = function(){
        console.log($scope.current);
        var c = $scope.classes[$scope.current];
        var result = {};
        result.Class = c.Class;
        result.Grade = 0.0;
        var weight = 0.0;
        for(var i=0;i<c.ias.length;i++){
            result.Grade = $scope.result[i]/parseInt(c.ias[i].marks)*parseInt(c.ias[i].weight);
            weight += c.ias[i].weight;
        }
        var g = result.Grade/weight*100;
        result.Grade = Math.round(g*100.0)/100 + "%";
        var w =  parseInt(c.Percentage);
        result.Weight = Math.round(w*100.0)/100 + "%";
        for(var i=1;i<=7;i++){
            var a = (parseInt(c[i])-(g*(1-w/100.0)))/(w/100.0);
            var b = Math.round(a*100.0)/100;
            if(b<0)b=0;
            if(b>100){
                b="impossible";
            }else{
                b=b+"%";
            }
            result[i]=b;
        }
        $scope.results.push(result);
        return false;

    }
});

/*
$.getJSON("data.json",function(ndata){
    console.log(ndata);
    data = ndata;
    for(var i=0;i<data.length;i++){
        $("#classes").append("<option>"+data[i].Class+"</option>");
    }
});
$("table").on("click", "#delete", function(e){
   $(this).closest("tr").remove()
});
function calculate(){
    var c = $("#classes").val();
    var ib = $("#grade").val();
    var classdata;
    console.log(c);
    for(var i=0;i<data.length;i++){
        if(data[i].Class == c){
            console.log(data[i]);
            classdata = data[i];
            break;
        }
    }
    var h = "<tr>";
    h=h+"<td>"+classdata.Class+"</td>";
    h=h+"<td>"+ib+"%</td>"
    var p = parseInt(classdata.Percentage);
    h=h+"<td>"+p+"%</td>"
    for(var i=1;i<=7;i++){
        var s = parseInt(classdata[i]);
        console.log(s+" "+ib+" "+p);

        var a = (s-(ib*(1-p/100.0)))/(p/100.0);
        var b = Math.round(a*100.0)/100;
        if(b<0)b=0;
        if(b>100){
            b="impossible";
        }else{
            b=b+"%";
        }
        h=h+"<td>"+b+"</td>";
    }
    h=h+"<td><a id='delete' class='text-danger'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a></td>";

    h=h+"</tr>";
    $("#results").append(h);
    return false;
}*/
