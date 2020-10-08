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
    $.ajax({
        type: "POST",
        url: "https://epamdev-seekinsuranceservices.cs165.force.com/services/apexrest/SeekWTL",
        data: JSON.stringify(prepareRequestData()),
        success: function(){},
        dataType: "json",
        contentType : "application/json"
    }).done(function(data) {
        console.log(data);
        window.open('https://www.seekmedicare.com/s/thank-you', "_self");
    }).fail(function(data) {
        console.log(data);
        $('.response-error').text("We\'re sorry, an internal error occurred. Please try to resubmit or call 123-456-7890 for help.");
    });
}

function prepareRequestData() {
    var formData = getFormValues();
    var urlParams = getUrlParams();
    if (urlParams) {
        console.log('urlParams.utm_campaign: ' + urlParams.utm_campaign);
        formData.utm_campaign = urlParams.utm_campaign ? urlParams.utm_campaign : '';
        formData.utm_content = urlParams.utm_content ? urlParams.utm_content : '';
        formData.utm_medium = urlParams.utm_medium ? urlParams.utm_medium : '';
        formData.utm_source = urlParams.utm_source ? urlParams.utm_source : '';
    }
    console.log(formData);
    return formData;
}

function getFormValues() {
    var elements = document.getElementById("leadForm").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    console.log(obj);
    return obj;
}

function getUrlParams() {
    var params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        params[key] = value;
    });
    console.log(params);
    return params;
}