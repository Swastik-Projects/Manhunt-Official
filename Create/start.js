var uniqueID = document.getElementById("uniqueID");
var start = document.getElementById("start");

start.addEventListener("click", function () {
    Swal.fire("Success", "Your Server will start in a few minutes if it exists", "success").then((result) => {
        if (result.isConfirmed) {
            window.location = '../index.html';
        } else if (result.isDenied) {
            window.location = '../index.html';
        }
    });


})
