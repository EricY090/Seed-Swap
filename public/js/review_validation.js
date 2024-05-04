let reviewForm = document.getElementById('reviewForm');

if(reviewForm){
    reviewForm.addEventListener('submit', function (event) {
        let shippingSpeed = document.getElementById('shippingSpeed').value;
        let packaging = document.getElementById('packaging').value;
        let overallExp = document.getElementById('overallExp').value;
        alert(shippingSpeed + " " + packaging + " " + overallExp)
        event.preventDefault();
        if(!shippingSpeed || !packaging || !overallExp){
            event.preventDefault();
            alert("Please fill out all fields");
        }
        if(shippingSpeed.trim().length === 0 || packaging.trim().length === 0 || overallExp.trim().length === 0){
            event.preventDefault();
            alert("Please fill out all fields");
        }
        if(shippingSpeed.includes(".") || packaging.includes(".") || overallExp.includes(".")){
            event.preventDefault();
            alert("Please enter whole numbers for ratings");
        }

        shippingSpeed = parseFloat(shippingSpeed);
        packaging = parseFloat(packaging);
        overallExp = parseFloat(overallExp);
        if(isNaN(shippingSpeed) || isNaN(packaging) || isNaN(overallExp)){
            event.preventDefault();
            alert("Please enter whole numbers for ratings");
        }
        if(shippingSpeed < 1 || shippingSpeed > 5 || packaging < 1 || packaging > 5 || overallExp < 1 || overallExp > 5){
            event.preventDefault();
            alert("Invalid rating");
        }
        if (!Number.isInteger(shippingSpeed) || !Number.isInteger(packaging) || !Number.isInteger(overallExp)) {
            event.preventDefault();
            alert("Please enter whole numbers for ratings");
        }
    })
}