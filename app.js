
var data;
$.getJSON("data.json",function(ndata){
    console.log(ndata);
    data = ndata;
    for(var i=0;i<data.length;i++){
        $("#classes").append("<option>"+data[i].Class+"</option>");
    }
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
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
}
