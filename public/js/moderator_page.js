
(function ($) {
    console.log("moderator_page.js loaded")
    let modForm = $('#moderator-form'),
        pepperID = $('#pepperID'),
        approve = $('#Approve'),
        disapprove = $('#Disapprove');

    if(modForm){
        console.log("moderator form found")
        modForm.submit((event) => {
            event.preventDefault();
            console.log("submitting form");
        });
    }



})(window.jQuery);;

