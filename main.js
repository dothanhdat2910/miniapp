document.addEventListener('DOMContentLoaded', () => {
  const giftBox = document.getElementById('giftBox');
  const birthdayMessage = document.getElementById('birthdayMessage');
  const canvas = document.getElementById('fireworksCanvas');
  const typewriter = document.getElementById('typewriter');
  const fullText = typewriter.getAttribute('data-text');
  const wishForm = document.getElementById('wishForm');
  const bgMusic = document.getElementById('bgMusic');

function playTypewriterEffect(text, element, delay = 45, callback) {
  let chars = Array.from(text);
  let index = 0;
  let buffer = []; // lưu từng ký tự sẽ hiển thị
  element.textContent = '';
  
  const interval = setInterval(() => {
    buffer.push(chars[index]);
    element.textContent = buffer.join('');
    index++;
    if (index >= chars.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, delay);
}


  giftBox.addEventListener('click', () => {
    giftBox.classList.add('hidden');
    birthdayMessage.classList.remove('hidden');
    bgMusic.play();

    const fireworks = new Fireworks.default(canvas, {
      hue: { min: 0, max: 360 },
      delay: { min: 15, max: 30 },
      rocketsPoint: 50,
      speed: 2,
      acceleration: 1.05,
      friction: 0.95,
      gravity: 1.5,
      particles: 80,
      trace: 3,
      explosion: 6
    });

    fireworks.start();
    setTimeout(() => fireworks.stop(), 10000);

    playTypewriterEffect(fullText, typewriter, 45, () => {
      wishForm.classList.remove('hidden');
    });
  });
});
