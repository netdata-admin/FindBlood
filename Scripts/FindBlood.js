var apiKey = "*IoT Apikeyini giriniz*";
var name = "not_set";
var lang = "tr-TR"; //en-US
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}
function connect() {
    name = guid();
    connecttoNetdataSocketIO(apiKey, name);
}
function onConnect() {

}
function onDisconnect() {

}
function onSocketDisconnected(socketName) {

}
function onSocketConnected(socketName) {

}
function onError(errorMessage) {
    console.log(errorMessage);
}
function onData(data) {
    var recivedData = JSON.parse(data);
    console.log(JSON.stringify(data));
    if (recivedData["dc_isAccept"] == "False") {
        $("#recipientGroup").text(data["dc_Recipient"]);
        $("#" + recivedData["dc_Donor"] + "Area").text(recivedData["dc_Message"]);
        $("#" + recivedData["dc_Donor"] + "button").show();
        $("#" + recivedData["dc_Donor"] + "Area").show();
    }
    else {
        if ($("#SendedArea").html().trim() == "") {
            $("#SendedArea").html(recivedData["dc_Message"]);
        }
        else {
            $("#SendedArea").html($("#SendedArea").html() + "<br/>" + recivedData["dc_Message"]);
        }
    }
}
function sendBloodRequest(recipient, message, donor, isaccept) {
    var columns = ["dc_Recipient", "dc_Donor", "dc_Message", "dc_isAccept"];
    var data = [recipient, donor, message, isaccept];
    createAndSendData(columns, data, name);
}
function findBlood() {
    clearAreas(function () {
        $('html, body').animate({ scrollTop: $('#donorArea').offset().top }, 'slow');
        var array = bloodTransfer($("#selectBlood").val());
        for (i = 0; i < array.length; i++) {
            if (lang == "tr-TR") {
                sendBloodRequest($("#selectBlood").val(), returnGroupName($("#selectBlood").val()) + " Kan aranıyor", array[i], "False");
                if ($("#SendedArea").html().trim() == "") {
                    $("#SendedArea").html($("#SendedArea").html() + "" + returnGroupName(array[i]) + " e sahip donörlere Gönderildi");
                }
                else {
                    $("#SendedArea").html($("#SendedArea").html() + "<br/>" + returnGroupName(array[i]) + " e sahip donörlere Gönderildi");
                }

            }
            else if (lang == "en-US") {
                sendBloodRequest($("#selectBlood").val(), returnGroupName($("#selectBlood").val()) + " Group Blood is Wanted", array[i], "False");
                if ($("#SendedArea").html().trim() == "") {
                    $("#SendedArea").html($("#SendedArea").html() + "<br/> Sended to have got " + returnGroupName(array[i]) + " group donors");
                }
                else {
                    $("#SendedArea").html($("#SendedArea").html() + "<br/> Sended to have got " + returnGroupName(array[i]) + " group donors");
                }

            }

            $("#SendedArea").animate({ scrollTop: $('#SendedArea')[0].scrollHeight }, 1000);
        }
    });
}
function bloodTransfer(group) {
    var array = [];
    if (group == "Group1") {
        array.push("Group8");
        array.push("Group7");
        array.push("Group2");
        array.push("Group1");
    }
    else if (group == "Group2") {
        array.push("Group8");
        array.push("Group2");
    }
    else if (group == "Group3") {
        array.push("Group8");
        array.push("Group7");
        array.push("Group4");
        array.push("Group3");
    }
    else if (group == "Group4") {
        array.push("Group8");
        array.push("Group4");
    }
    else if (group == "Group5") {
        array.push("Group1");
        array.push("Group2");
        array.push("Group3");
        array.push("Group4");
        array.push("Group5");
        array.push("Group6");
        array.push("Group7");
        array.push("Group8");
    }
    else if (group == "Group6") {
        array.push("Group8");
        array.push("Group2");
        array.push("Group4");
        array.push("Group6");
    }
    else if (group == "Group7") {
        array.push("Group8");
        array.push("Group7");
    }
    else if (group == "Group8") {
        array.push("Group8");
    }
    return array;
}
function returnGroupName(group) {
    if (group == "Group1") {
        return "Arh+";
    }
    else if (group == "Group2") {
        return "Arh-";
    }
    else if (group == "Group3") {
        return "Brh+";
    }
    else if (group == "Group4") {
        return "Brh-";
    }
    else if (group == "Group5") {
        return "ABrh+";
    }
    else if (group == "Group6") {
        return "ABrh-";
    }
    else if (group == "Group7") {
        return "0rh+";
    }
    else if (group == "Group8") {
        return "0rh-";
    }
}
function clearAreas(callback) {
    $("#Group1Area").text('');
    $("#Group2Area").text('');
    $("#Group3Area").text('');
    $("#Group4Area").text('');
    $("#Group5Area").text('');
    $("#Group6Area").text('');
    $("#Group7Area").text('');
    $("#Group8Area").text('');
    $("#Group1button").hide();
    $("#Group2button").hide();
    $("#Group3button").hide();
    $("#Group4button").hide();
    $("#Group5button").hide();
    $("#Group6button").hide();
    $("#Group7button").hide();
    $("#Group8button").hide();
    $("#Group1Area").hide('');
    $("#Group2Area").hide('');
    $("#Group3Area").hide('');
    $("#Group4Area").hide('');
    $("#Group5Area").hide('');
    $("#Group6Area").hide('');
    $("#Group7Area").hide('');
    $("#Group8Area").hide('', function () {
        if (typeof callback != 'undefined') {
            callback();
        }
    });
}
function Accept(group) {
    $('html, body').animate({ scrollTop: $('#SendedArea').offset().top - 60 }, 'slow');
    $("#" + group + "Area").hide();
    $("#" + group + "button").hide();
    if (lang == "tr-TR") {
        sendBloodRequest($("#recipientGroup").text(), returnGroupName(group) + " donor yola çıktı", group, "True");
        setTimeout(function () {
            sendBloodRequest($("#recipientGroup").text(), returnGroupName(group) + " donor Hastaneye Ulaştı", group, "True");
        }, 5000);
    }
    else {
        sendBloodRequest($("#recipientGroup").text(), "has got " + returnGroupName(group) + " group donor is coming", group, "True");
        setTimeout(function () {
            sendBloodRequest($("#recipientGroup").text(), returnGroupName(group) + " has arrived to hospital", group, "True");
        }, 5000);
    }
}
function ChangeLang(LangCode) {
    lang = LangCode;
    GetMessages();
}
function GetMessages() {
    if (lang == "tr-TR") {
        $.getScript('Scripts/tr-TR.js', function () {
            GetLabels();
        });
    }
    else {
        $.getScript('Scripts/en-US.js', function () {
            GetLabels();
        });
    }

}
