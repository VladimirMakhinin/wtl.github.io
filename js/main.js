function submitCheck(e) {
    $('.response-error').text('');
    let messageName = [];
    let messageLast = [];
    let messagePhone = [];
    var firstName = $('input[name=first_name]').val();
    var lastName = $('input[name=last_name]').val();
    var phone = $('input[name=phone]').val();

    if (firstName === "" || firstName === null) {
        messageName.push("* Required");
    } else if (firstName.length < 1 || firstName === null) {
        messageName.push("* Required");
    } 

    if (lastName === "" || lastName === null) {
        messageLast.push("* Required");
    } else if (lastName.length < 1 || lastName === null) {
        messageLast.push("* Required");
    } 

    if (phone.length < 10 || phone === null) {
        messagePhone.push("* Required");
    }

    if (
        messageName.length ||
        messageLast.length ||
        messagePhone.length > 0
    ) {
        // e.preventDefault();
        $('[data-id=error]').text(messageName);
        $('[data-id=lastNameError]').text(messageLast);
        $('[data-id=phoneNumberError]').text(messagePhone);
    }
}

function submitform(){
    $('#contact__button').prop('disabled', true);
    $.ajax({
        type: "POST",
        url: "https://epamdev-seekinsuranceservices.cs165.force.com/services/apexrest/SeekWTL",
        dataType: "json",
        contentType : "application/json",
        data: JSON.stringify(prepareRequestData()),
        success: function(data){
            console.log(data);
            window.open('https://www.seekmedicare.com/s/thank-you', "_self");
        }
    }).fail(function(data) {
        $('#contact__button').prop('disabled', false);
        $('.response-error').text("We\'re sorry, an internal error occurred. Please try to resubmit or call 123-456-7890 for help.");
    });
}

function prepareRequestData() {
    var formData = getFormValues();
    var urlParams = getUrlParams();
    if (urlParams) {
        formData.utm_campaign = urlParams.utm_campaign ? urlParams.utm_campaign : '';
        formData.utm_content = urlParams.utm_content ? urlParams.utm_content : '';
        formData.utm_medium = urlParams.utm_medium ? urlParams.utm_medium : '';
        formData.utm_source = urlParams.utm_source ? urlParams.utm_source : '';
    }
    return formData;
}

function getFormValues() {
    var elements = document.getElementById("leadForm").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        if (!item.name) continue;
        obj[item.name] = item.value;
    }
    return obj;
}

function getUrlParams() {
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        params[key] = value;
    });
    return params;
}