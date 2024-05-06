let grow_form = document.getElementById('grow-form');
let textPortion = document.getElementById('textPortion');
let filename = document.getElementById('Filenames');

if (grow_form) {
    grow_form.addEventListener("submit", (event)=>{
      let errors = [];
      //Check length of textPortion
      if (textPortion.value.trim().length <10 || textPortion.value.length > 1500){      // #Character including head/tail spaces < 1500
        errors.push("Text needs to be at least 10 characters and 1500 maximum");
      };
      //Check image size, image file extension
      if (filename.files[0]){
        let file_size = filename.files[0].size / 1024 /1024;
        if (file_size > 2){
          errors.push("The maximum image size is 2 MB");
        };
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif|\.jfif)$/i;
        if (!allowedExtensions.exec(filename.value)){
          errors.push("The image can only be in .jpg, .jpeg, .png, .gif, .jfif");
        };
      };

      let error_div = document.getElementById('grow-error');
      if (errors.length > 0){
          event.preventDefault();
          error_div.hidden = false;
          error_div.replaceChildren();
          for (let i of errors){
              let errorp = document.createElement('p');
              errorp.innerHTML = i;
              error_div.appendChild(errorp);
          };
      }else{
          error_div.hidden = true;
      };
})}