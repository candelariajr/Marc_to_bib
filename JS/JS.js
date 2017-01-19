function processNumbers(){
    var oclcContainer = $("#oclcNumbers");
    var oclcArray = oclcContainer.val().split("\n");
    numberRemaining = oclcArray.length;
    var numberRemainingContainer = $('#remaining');
    numberRemainingContainer.text(numberRemaining);
    numberRemainingContainer.show();
    $("#conversionButton").hide();
    oclcContainer.hide(200);
    var table = $('<table>');
    var thead = $('<thead>');
    thead.html('<tr><th class="col-xs-2">OCLC #</th><th class="col-xs-2">Bib #</th></tr>');
    table.addClass("table table-striped");
    table.attr('id', 'outputTable');
    table.append(thead);
    var tbody = $('<tbody>');
    tbody.attr('id', 'outputBody');
    table.append(tbody);
    $('#outputPanel').append(table);
    for (var i = 0; i < oclcArray.length;i++){
        createEntry(oclcArray[i]);
    }
    setInterval(function(){
        if(jQuery.active == 0) {
            beginRecon();
        }
    }, 5000);
}

function createEntry(oclcNumber){
    var newRow = $('<tr>');
    $('#outputBody').append(newRow);
    getBib(oclcNumber, newRow);
}

function getBib(oclcNumber, recepient){
    $.ajax({
        url: "query.php?oclcNumber=" + oclcNumber,
        success: function(result){
        //$("#testArea").html(result);
            console.log(result);
            if(result.substring(0,6) == "<br />"){
                recepient.html('<td>' + oclcNumber + '</td><td>' + "TO" + '</td>');
            }else{
                recepient.html('<td>' + oclcNumber + '</td><td>' + result + '</td>');
            }
        }
    });
}

function beginRecon(){
    console.log("Recon Started");
    var eligibleReconElements = [];
    $("td").each(function(){
        if($(this).html() == "TO"){
            eligibleReconElements.push($(this));
            //console.log($(this).prev().text());
        }
    });
    for(var i = 0; i < eligibleReconElements.length; i++){
        replaceBib(eligibleReconElements[i]);
    }
}

function replaceBib(element){
    bib = (element.prev().text());
    $.ajax({
        url: "query.php?oclcNumber=" + element.prev().text(),
        success: function(result){
            if(result.substring(0,6) == "<br />"){
                element.text("TO");
            }else{
                element.text(result);
            }
        }
    });
}
