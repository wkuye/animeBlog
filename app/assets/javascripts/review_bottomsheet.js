document.addEventListener( "DOMContentLoaded",()=>{
    const review_btn= document.querySelector(".review-btn");
    const bottom_sheet=document.querySelector(".review-bottomsheet");
    const sheet= bottom_sheet.getAttribute("sheet-bool")
    const closeBtn = document.querySelector('.modal .close');
    if (sheet) {     
 bottom_sheet.classList.add('active');
    }
    review_btn.addEventListener("click",()=>{
 bottom_sheet.classList.add('active');
    })
    closeBtn.addEventListener('click', () => {
        bottom_sheet.classList.remove('active');
     
      });
})

