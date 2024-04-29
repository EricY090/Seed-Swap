let approvalForms = document.querySelectorAll('.approval-form');

// event listener to all aprroval forms. done with forEach
approvalForms.forEach(form => {
    form.addEventListener('submit', function(event) {
        //https://stackoverflow.com/questions/15148659/how-can-i-use-queryselector-on-to-pick-an-input-element-by-name
        const action = this.querySelector('[name="action"]').value;
        if(action !== 'approve' && action !== 'decline') {
            event.preventDefault();
            const errorText = document.createElement('p');
            errorText.textContent = 'Nice try... you can only send approve or decline. nothing else.';
            this.appendChild(errorText);
            return;
        }
        event.preventDefault();
    });
});