function submitCheck(e) {
    // var contactForm;
    var firstName = $('input[name=first_name]').val();
    var lastName = $('input[name=last_name]').val();
    var zipCode = $('input[name=zip]').val();
    var phone = $('input[name=phone]').val();
    var email = $('input[name=email]').val();

    let messageName = [];
    let messageLast = [];
    let messagePhone = [];

    if (firstName === "" || firstName === null) {
        messageName.push("* Required");
    } else if (firstName.length < 2 || firstName === null) {
        messageName.push("* Required");
    } 

    if (lastName === "" || lastName === null) {
        messageLast.push("* Required");
    } else if (lastName.length < 2 || lastName === null) {
        messageLast.push("* Required");
    } 

    if (phone.length < 14 || phone === null) {
        messagePhone.push("* Required");
    }

    if (
        messageName.length ||
        messageLast.length ||
        messagePhone.length > 0
    ) {
        e.preventDefault();
        $('[data-id=error]').text(messageName);
        $('[data-id=lastNameError]').text(messageLast);
        $('[data-id=phoneNumberError]').text(messagePhone);
    } else {
        submitform();
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
    }).always(function(data) {
        console.log(data);
        // document.location.replace('https://www.seekmedicare.com/s/thank-you');
        // var message = "We're sorry, an internal error occurred. Please try to resubmit or call {0} for help.";
        window.open('https://www.seekmedicare.com/s/thank-you', "_self");
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

// function submitForm() {
//     // var phoneMask = IMask($('input[name=phone]').val()), {
//     //     mask: "(000) 000-0000"
//     // });
//     createLeadStaging({
//         firstName: this.firstName.value,
//         lastName: this.lastName.value,
//         zipCode: this.zipCode.value,
//         phone: phoneMask.unmaskedValue,
//         email: this.email.value,
//         leadSource: 'Website'
//     })
//     .then(() => {
//         window.open(window.location.origin + basePath + "/thank-you", "_self");
//     })
//     .catch((error) => {
//         const event = new ShowToastEvent({
//             mode: "sticky",
//             variant: "error",
//             message: "We're sorry, an internal error occurred. Please try to resubmit or call {0} for help.",
//             messageData: [{
//                label: "1-844-955-3690",
//                url: "tel:+18449553690"
//             }]
//         });
//         this.dispatchEvent(event);
//     });
// }