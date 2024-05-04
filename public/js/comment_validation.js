// let commentForm = document.getElementById("comment-form");
// let errorbox = document.getElementById("errorbox");

// if(commentForm) {
//     commentForm.addEventListener("submit", function(event) {
//         let comment = this.querySelector('[name="comment"]').value;
//         // alert(comment);
//         if(comment.trim().length <= 4) {
//             let errorText = document.createElement('p');
//             errorText.textContent = 'try again with a comment longer than 4 characters';
//             errorbox.appendChild(errorText);
//             event.preventDefault();
//             return;
//         }
//     });
// }

(function ($) {

    let commentForm = $('#comment-form');
    let errorbox = $('#errorbox');
    let comment = $('#comment');
    let userName = $('#Users_Name');
    let usercomList = $('#User_Comment_List');
    //console.log(userName[0].innerHTML);
    if(commentForm){
        commentForm.submit((event) => {
            event.preventDefault();
            errorbox.empty();
            if(comment.val().trim().length <= 4) {
                let errorText = $('<p></p>').text('try again with a comment longer than 4 characters');
                errorbox.append(errorText);
                event.preventDefault();
                return;
            }
            url = `/user/${userName[0].innerHTML}/comment`;
            $.ajax({
                method: 'POST',
                url: url,
                data: {
                    comment: comment.val()
                }
            }).then((responseMessage) => {
                //print out the response message and do nothing with the page, keep it on the get /user/:username page
                //console.log(responseMessage);
                let commentinfo = responseMessage.profileComments[responseMessage.profileComments.length - 1];

                let div = $('<div></div>').addClass('card');
                let div2 = $('<div></div>').addClass('card-body');
                let a = $('<a></a>').attr('href', `/user/${commentinfo.commenterUsername}`).attr('tabindex', 0);
                let h4 = $('<h4></h4>').text(commentinfo.commenterUsername);
                let p = $('<p></p>').text(commentinfo.text);
                a.append(h4);
                div2.append(a);
                div2.append(p);
                div.append(div2);
                usercomList.append(div);
                
                comment.val('');
                $.ajax({
                    method: 'GET',
                    url: "/user/" + userName[0].innerHTML,
                }).then((responseMessage) => { 
                });
            });
        });
    }

})(window.jQuery);