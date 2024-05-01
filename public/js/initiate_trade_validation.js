let initiateForm = document.querySelector('.initiate-trade-form');
let initiateTradeError = document.querySelector('.initiate-trade-error');

if(initiateForm){
    initiateForm.addEventListener('submit', function(event) {
        event.preventDefault();
        initiateTradeError.innerHTML = '';
        let initiatorSending = Array.from(document.querySelectorAll(('input[name="initiatorSending"]:checked')))
        .map(checkbox => checkbox.value);
        console.log(initiatorSending);
        let receiverSending = Array.from(document.querySelectorAll(('input[name="receiverSending"]:checked')))
        .map(checkbox => checkbox.value);
        if (initiatorSending.length === 0 || receiverSending.length === 0) {
            initiateTradeError.innerHTML = '<p>Please select at least one item to send and one item to receive.</p>';
            event.preventDefault();
            return; // Prevent form submission if validation fails
        }
    });
}