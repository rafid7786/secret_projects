import 'bootstrap/dist/css/bootstrap.min.css'
import './src/style.css'

const journeyData = [
  {
    id: 1,
    image: 'https://images.pexels.com/photos/1420701/pexels-photo-1420701.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Awal Perjalanan',
    description: 'Dimulai dari langkah pertama yang penuh harapan dan semangat untuk menjalani petualangan baru ini.'
  },
  {
    id: 2,
    image: 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Momen Berharga',
    description: 'Setiap detik adalah kenangan indah yang terpatri dalam hati dan tak akan terlupakan.'
  },
  {
    id: 3,
    image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Petualangan Bersama',
    description: 'Bersama melewati setiap tantangan dan kebahagiaan yang membuat perjalanan ini semakin bermakna.'
  },
  {
    id: 4,
    image: 'https://images.pexels.com/photos/1590549/pexels-photo-1590549.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Keindahan Perjalanan',
    description: 'Menemukan keindahan di setiap sudut dan menikmati setiap momen yang ada.'
  },
  {
    id: 5,
    image: 'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: 'Cerita Yang Terukir',
    description: 'Setiap cerita memiliki maknanya sendiri yang membentuk siapa kita hari ini.'
  }
];

function createJourneySection(data, index) {
  const isEven = index % 2 === 0;

  return `
    <div class="journey-item" data-index="${index}">
      <div class="container">
        <div class="row align-items-center ${isEven ? '' : 'flex-row-reverse'}">
          <div class="col-md-6 image-col">
            <div class="image-wrapper">
              <div class="image-overlay"></div>
              <img src="${data.image}" alt="${data.title}" class="journey-image">
              <div class="image-particles">
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
              </div>
            </div>
          </div>
          <div class="col-md-6 content-col">
            <div class="journey-content">
              <div class="content-number">${String(index + 1).padStart(2, '0')}</div>
              <h2 class="journey-title">${data.title}</h2>
              <p class="journey-description">${data.description}</p>
              <div class="content-line"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

document.querySelector('#app').innerHTML = `
  <div class="page-loader">
    <div class="loader-content">
      <div class="loader-spinner"></div>
      <p class="loader-text">Memuat Kenangan...</p>
    </div>
  </div>

  <div class="music-player" id="musicPlayer">
    <button class="music-toggle" id="musicToggle">
      <svg class="music-icon play-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
      <svg class="music-icon pause-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" style="display: none;">
        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
      </svg>
    </button>
    <div class="music-info">
      <div class="music-title">Romantic Music</div>
      <div class="music-waves">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>

  <div class="journey-container">
    <header class="journey-header">
      <div class="header-bg"></div>
      <div class="container text-center">
        <div class="header-content">
          <div class="title-wrapper">
            <h1 class="main-title">Perjalanan Selama Ini</h1>
            <div class="title-underline"></div>
          </div>
          <p class="main-subtitle">Setiap langkah adalah cerita, setiap cerita adalah kenangan</p>
          <div class="scroll-indicator">
            <div class="scroll-mouse">
              <div class="scroll-wheel"></div>
            </div>
            <p>Scroll untuk melihat</p>
          </div>
        </div>
      </div>
    </header>

    <main class="journey-main">
      ${journeyData.map((data, index) => createJourneySection(data, index)).join('')}
    </main>

    <footer class="journey-footer">
      <div class="footer-bg"></div>
      <div class="container text-center">
        <div class="footer-content">
          <p class="footer-subtitle">Masih banyak cerita yang menanti...</p>
          <button class="btn-next" id="nextButton">
            <span>Lanjut ke Halaman Berikutnya</span>
            <div class="btn-shine"></div>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </footer>
  </div>

  <audio id="bgMusic" loop>
    <source src="/lagu-1.mp3" type="audio/mpeg">
  </audio>
`;

setTimeout(() => {
  document.querySelector('.page-loader').classList.add('fade-out');
}, 1500);

const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.journey-item').forEach(item => {
  observer.observe(item);
});

const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const musicPlayer = document.getElementById('musicPlayer');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    playIcon.style.display = 'block';
    pauseIcon.style.display = 'none';
    musicPlayer.classList.remove('playing');
  } else {
    bgMusic.play();
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
    musicPlayer.classList.add('playing');
  }
  isPlaying = !isPlaying;
});

document.getElementById('nextButton').addEventListener('click', () => {
  alert('Silakan ganti dengan URL website berikutnya');
});

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.journey-header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.transform = 'translateY(-20px)';
      header.style.opacity = '0.95';
    } else {
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
    }

    lastScroll = currentScroll;
  });
});