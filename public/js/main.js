console.log("Js Loaded");

function controlVideo(vidFunc) {
  var iframe = document.getElementsByTagName("iframe")[0].contentWindow;
  iframe.postMessage(
    '{"event":"command","func":"' + vidFunc + '","args":""}',
    "*"
  );
}


// Modal
const modalWrap = document.querySelector('.modal-wrap');
const modalContent = document.querySelector('.modal-content');
const modalBtn = document.querySelector('.modal-btn');
const modalCancel = document.querySelector('.cancel');
const modalVideo = document.querySelector('.video');

modalBtn.addEventListener('click', () => {
  modalContent.classList.remove("slide-out");
  modalWrap.classList.toggle("display-none");
  controlVideo('playVideo');
});

modalCancel.addEventListener('click', () => {
  modalContent.classList.add("slide-out");
  controlVideo('stopVideo');
  modalVideo.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
  setTimeout(() => {
    modalWrap.classList.toggle("display-none");
  }, 650)
});

/* Open the sidenav */
function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
}

/* Close/hide the sidenav */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

// IntersectionObserver for animations
const faders = document.querySelectorAll('.observer-fade-in');
const sliders = document.querySelectorAll('.slide-in');


const appearOptions = {
  threshold: .5
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add('appear');
      appearOnScroll.unobserve(entry.target);
    }
  })
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
  appearOnScroll.observe(slider);
});