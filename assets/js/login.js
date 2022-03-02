const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

const sign_up_username = document.getElementById("sign_up_username");
const sign_up_email = document.getElementById("sign_up_email");
const sign_up_password = document.getElementById("sign_up_password");
const sign_up_btn_main = document.getElementById("sign_up_btn_main");

const sign_in_username = document.getElementById("sign_in_username");
const sign_in_password = document.getElementById("sign_in_password");
const sign_in_btn_main = document.getElementById("sign_in_btn_main");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

sign_up_btn_main.addEventListener("click", () => {
  if (sign_up_username.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Username cannot be empty',
    })
  }

  else if (sign_up_password.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Password cannot be empty',
    })
  }

  else if (sign_up_password.value.length <= 6) {
    Swal.fire({
      icon: 'error',
      title: 'Password must be at least 6 characters long',
    })
  }

  else if (sign_up_username.value.length <= 3) {
    Swal.fire({
      icon: 'error',
      title: 'Username must be at least 3 characters long',
    })
  }

  else {
    database.ref('users/' + sign_up_username.value).once("value", snapshot => {
      if (snapshot.exists()) {
        Swal.fire({
          icon: 'error',
          title: 'Username already Exists',
        })
      }
      else {

        var uniqueID = new Date().getMilliseconds() + Math.random().toString(16).slice(2);

        database.ref("users/" + sign_up_username.value + '/').set({
          username: sign_up_username.value,
          email: sign_up_email.value,
          password: sign_up_password.value,
          uniqueID: uniqueID,
        });

        Swal.fire({
          icon: 'success',
          title: 'Signed Up successfully. Please Sign In',
          footer: '<span>Your ID: '+ uniqueID+'</span>'
        })
      }
    });
  }
});

sign_in_btn_main.addEventListener("click", () => {
  if (sign_in_username.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Username cannot be empty',
    })
  }

  else if (sign_in_password.value === "") {
    Swal.fire({
      icon: 'error',
      title: 'Password cannot be empty',
    })
  }

  else if (sign_in_password.value.length <= 6) {
    Swal.fire({
      icon: 'error',
      title: 'Password must be at least 6 characters long',
    })
  }

  else if (sign_in_username.value.length <= 3) {
    Swal.fire({
      icon: 'error',
      title: 'Username must be at least 3 characters long',
    })
  }

  else {
    database.ref('users/' + sign_in_username.value).once("value", snapshot => {
      if (snapshot.exists()) {
        var data = snapshot.val();
        if (data.password === sign_in_password.value) {
          Swal.fire({
            icon: 'success',
            title: 'Signed In successfully. Please wait!',
          })

          sessionStorage.setItem("Signed_in", "true");

          setTimeout(() => {
            window.location = "Create/createManhunt.html"
        }, 1000);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: 'Wrong Password',
          })
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Username Does not Exist',
        })
      }
    });
  }
});