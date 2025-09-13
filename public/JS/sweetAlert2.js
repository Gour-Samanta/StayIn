// //SweetAlert for delete btn

//  let delBtns = document.querySelectorAll(".del-btn");

// for (let delBtn of delBtns) {
//   delBtn.addEventListener("click",  async function (e) {
//     e.preventDefault();
//     const imgId = this.getAttribute("data-id"); // 'this' refers to the button

//     await Swal.fire({
//       title: "Are you sure?",
//       text: "Do you want to Delete?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "No",
//     })
    
//     //   .then((result) => {
//     //   if (result.isConfirmed) {
//     //     fetch(`/listings/${imgId}`, { method: "delete" }).then(() => {
//     //       Swal.fire({
//     //         title: "Successful!",
//     //         icon: "success",
//     //         timer: 1000,
//     //         showConfirmButton: false
//     //       })
//     //       .then(()=>{
//     //         window.location.href = "/listings";
//     //       })

          
//     //     });
//     //   }
//     // });
//   });
// }

// //sweetalert for Successfully submit

// const form = document.querySelector(".after-submit");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();

//    if (!form.checkValidity()) {
//     form.reportValidity(); // show browser validation messages
//     return; // stop execution if invalid
//   }

//   const formData = new FormData(form);
//   const searchParams = new URLSearchParams();

//   for (const pair of formData) {
//     searchParams.append(pair[0], pair[1]);
//   }

//   fetch(form.action, {
//     method: form.method,
//     body: searchParams,
//     headers: { "Content-Type": "application/x-www-form-urlencoded" }
//   }).then(() => {
//     Swal.fire({
//       title: "Submitted!",
//       icon: "success",
//       timer: 1000,
//       showConfirmButton: false,
//     }).then(() => {
//       window.location.href = `${form.action}`;
//     });
//   })
//   .catch(err => console.log(err));
// });
