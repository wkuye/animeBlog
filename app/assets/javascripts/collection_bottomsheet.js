document.addEventListener("DOMContentLoaded", () => {
    const review_btn= document.querySelector(".new-btn");
    const bottom_sheet=document.querySelector(".collection-bottomsheet");

    const closeBtn = document.querySelector('.cmodal .collectionclose');
 
    review_btn.addEventListener("click",()=>{
 bottom_sheet.classList.add('active');
    })
    closeBtn.addEventListener('click', () => {
        bottom_sheet.classList.remove('active');
     
      });
})

