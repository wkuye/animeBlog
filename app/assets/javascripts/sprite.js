document.addEventListener('DOMContentLoaded', () => {
    const sprite = document.getElementById('luffy-sprite');
  
    sprite.addEventListener('click', () => {
      sprite.style.animation = 'attack 1s steps(8)';
      setTimeout(() => {
        sprite.style.animation = 'walk 1s steps(12) infinite';
      }, 1000);
    });
  });
  