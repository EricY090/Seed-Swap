let commentForm = document.getElementById("comment-form");
let errorbox = document.getElementById("errorbox");

if(commentForm) {
    commentForm.addEventListener("submit", function(event) {
        let comment = this.querySelector('[name="comment"]').value;
        // alert(comment);
        if(comment.trim().length <= 4) {
            let errorText = document.createElement('p');
            errorText.textContent = 'try again with a comment longer than 4 characters';
            errorbox.appendChild(errorText);
            event.preventDefault();
            return;
        }
    });
}