
document.addEventListener("DOMContentLoaded", () => {
    const wrapper         = document.querySelector('.collection-wrapper');
    const panel           = wrapper.querySelector('.collection-animation');
    const firstDot        = wrapper.querySelector('.first-dot');
    const secondDot       = wrapper.querySelector('.second-dot');
    const userCollections = wrapper.querySelector('.user-collections');
  
    if (!wrapper || !panel) return;
  
    wrapper.addEventListener('mouseenter', () => {
      panel.style.opacity         = '1';
      panel.style.transform       = 'translateY(0) scale(1)';
      panel.style.pointerEvents   = 'auto';
      panel.style.transitionDelay = '0s'
      firstDot.style.opacity      = '1';
      firstDot.style.transform    = 'translateY(0) scale(1)';
      firstDot.style.transitionDelay = '0.1s'
      secondDot.style.opacity     = '1';
      secondDot.style.transform   = 'translateY(0) scale(1)';
      secondDot.style.transitionDelay = '0.3s'
      userCollections.style.opacity       = '1';
      userCollections.style.transform     = 'translateY(0) scale(1)';
      userCollections.style.transitionDelay = '0.5s'
   
    });
  
    wrapper.addEventListener('mouseleave', () => {
      panel.style.opacity         = '0';
      panel.style.transform       = 'translateY(-10px) scale(0.5)';
      panel.style.transitionDelay='2.5s'
      firstDot.style.opacity      = '0';
      firstDot.style.transform    = 'translateY(-10px) scale(0.5)';
       firstDot.style.transitionDelay='0.8s'
      secondDot.style.opacity     = '0';
      secondDot.style.transform   = 'translateY(-10px) scale(0.5)';
      secondDot.style.transitionDelay='1.5s'
      userCollections.style.opacity       = '0';
      userCollections.style.transform     = 'translateY(-10px) scale(0.5)';
       userCollections.style.transitionDelay='2s'

    });
    panel.addEventListener('mouseover', () => {
        console.log("Mouse entered .collection-animation");
    
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
        panel.style.transitionDelay = '0s';
        panel.style.pointerEvents = 'auto';
    
        firstDot.style.opacity = '1';
        firstDot.style.transform = 'scale(1) translateY(0)';
        firstDot.style.transitionDelay = '0.1s';
    
       secondDot.style.opacity = '1';
       secondDot.style.transform = 'scale(1) translateY(0)';
       secondDot.style.transitionDelay = '0.3s';
    
        userCollections.style.opacity = '1';
        userCollections.style.transform = 'scale(1) translateY(0)';
        userCollections.style.transitionDelay = '0.5s';
      });
    
      panel.addEventListener('mouseleave', () => {
        console.log("Mouse left .collection-animation");
    
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(-10px)';
        panel.style.pointerEvents='none';
        panel.style.transitionDelay='2.5s'
    
        firstDot.style.opacity = '0';
        firstDot.style.transform = 'scale(0.5) translateY(-10px)';
        firstDot.style.transitionDelay='0.8s'
    
       secondDot.style.opacity = '0';
       secondDot.style.transform = 'scale(0.5) translateY(-10px)';
       secondDot.style.transitionDelay='1.5s'
    
        userCollections.style.opacity = '0';
        userCollections.style.transform = 'scale(0.5) translateY(-10px)';
        userCollections.style.transitionDelay='2s'
      });
  });
  

