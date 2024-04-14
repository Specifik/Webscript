//Starting point for JQuery init
$(document).ready(function () {
    $("#searchResult").hide();
    $("#btn_Search").click(function (e) {
        loaddata($("#seachfield").val());
    });

});

$(document).ready(function() {
    $('#btn_Add').click(function() {
        $.get('../frontend/pages/addAppointment.html', function(data) {
            $('#container').html(data);
        });
    });
});



function loaddata(searchterm) {

    $.ajax({
        type: "GET",
        url: "../serviceHandler.php",
        cache: false,
        data: {method: "queryPersonByName", param: searchterm},
        dataType: "json",
        success: function (response) {
            
            $("#noOfentries").val(response.length);
            $("#searchResult").show(1000).delay(1000).hide(1000);
        }
        
    });
}
