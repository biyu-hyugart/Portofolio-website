/* =====================================================================
   script.js — Vanilla JavaScript
   Fitur:
   1. Preloader
   2. Navbar + hamburger
   3. Hero text reveal
   4. Scroll reveal
   5. Parallax blob
   6. Dark / Light mode
   7. Indonesia / English
   8. Tools random fade + random position
   9. Link placeholder
   10. Contact validation
   11. Back to top
===================================================================== */


/* ---------------------------------------------------------------------
   1. PRELOADER
--------------------------------------------------------------------- */

const preloader = document.getElementById('preloader');
const preloaderFill = document.getElementById('preloaderFill');
const preloaderPercent = document.getElementById('preloaderPercent');

let fakeProgress = 0;

const progressTimer = setInterval(() => {
  fakeProgress += (90 - fakeProgress) * 0.1 + 0.5;

  if (fakeProgress > 90) {
    fakeProgress = 90;
  }

  preloaderFill.style.width = `${fakeProgress}%`;
  preloaderPercent.textContent = `${Math.round(fakeProgress)}%`;
}, 100);

document.body.style.overflow = 'hidden';

window.addEventListener('load', () => {
  clearInterval(progressTimer);

  preloaderFill.style.width = '100%';
  preloaderPercent.textContent = '100%';

  setTimeout(() => {
    preloader.classList.add('loaded');
    document.body.style.overflow = '';
  }, 350);
});


/* ---------------------------------------------------------------------
   2. NAVBAR + HAMBURGER
--------------------------------------------------------------------- */

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {

  navbar.classList.toggle(
    'scrolled',
    window.scrollY > 40
  );

  backToTop.classList.toggle(
    'show',
    window.scrollY > 500
  );

});


/* Tombol hamburger */

hamburger.addEventListener('click', () => {

  const isOpen =
    navLinks.classList.toggle('active');

  hamburger.classList.toggle(
    'active',
    isOpen
  );

  hamburger.setAttribute(
    'aria-expanded',
    String(isOpen)
  );

});


/* Menutup menu setelah link navbar diklik */

document
  .querySelectorAll('.nav-link')
  .forEach((link) => {

    link.addEventListener('click', () => {

      navLinks.classList.remove('active');

      hamburger.classList.remove('active');

      hamburger.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });



/* ---------------------------------------------------------------------
   3. HERO TEXT REVEAL
--------------------------------------------------------------------- */

const heroName =
  document.getElementById('heroName');

const nameWords =
  heroName
    .getAttribute('data-text')
    .split(' ');


/* Membuat nama menjadi animasi per kata */

nameWords.forEach((word, index) => {

  const mask =
    document.createElement('span');

  mask.className = 'word-mask';


  const inner =
    document.createElement('span');

  inner.textContent = word;


  /* Delay tiap kata dibuat sedikit berbeda */

  inner.style.setProperty(
    '--delay',
    `${0.25 + index * 0.12}s`
  );


  mask.appendChild(inner);

  heroName.appendChild(mask);

});



/* ---------------------------------------------------------------------
   4. SCROLL REVEAL
--------------------------------------------------------------------- */

const revealTargets =
  document.querySelectorAll(
    '[data-animation], .reveal-line'
  );


const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'in-view'
          );


          /* Tidak perlu diamati lagi setelah tampil */

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.15
    }

  );


revealTargets.forEach((element) => {

  revealObserver.observe(element);

});



/* ---------------------------------------------------------------------
   5. PARALLAX BLOB
--------------------------------------------------------------------- */

const parallaxEls =
  document.querySelectorAll(
    '[data-parallax]'
  );

let parallaxTicking = false;


function updateParallax() {

  const scrollY =
    window.scrollY;


  parallaxEls.forEach((element) => {

    const factor =
      parseFloat(
        element.getAttribute(
          'data-parallax'
        )
      );


    element.style.transform =
      `translateY(${scrollY * factor}px)`;

  });


  parallaxTicking = false;

}


window.addEventListener('scroll', () => {

  if (!parallaxTicking) {

    requestAnimationFrame(
      updateParallax
    );

    parallaxTicking = true;

  }

});



/* ---------------------------------------------------------------------
   6. DARK / LIGHT MODE
--------------------------------------------------------------------- */

const themeToggle =
  document.getElementById(
    'themeToggle'
  );


const themeIcon =
  document.getElementById(
    'themeIcon'
  );


const themeLabel =
  document.getElementById(
    'themeLabel'
  );



/*
   Mengubah tulisan/icon pada tombol tema
*/

function updateThemeButton(theme) {

  const isLight =
    theme === 'light';

  const isEnglish =
    document.documentElement.lang === 'en';


  /* Icon */

  themeIcon.textContent =
    isLight
      ? '☀'
      : '☾';


  /* Label */

  themeLabel.textContent =
    isLight
      ? 'Light'
      : 'Dark';


  /* Accessibility */

  themeToggle.setAttribute(

    'aria-label',

    isEnglish

      ? (
          isLight
            ? 'Switch to dark mode'
            : 'Switch to light mode'
        )

      : (
          isLight
            ? 'Ubah ke dark mode'
            : 'Ubah ke light mode'
        )

  );

}



/*
   Menerapkan tema
*/

function applyTheme(theme) {

  document.body.classList.toggle(

    'light-mode',

    theme === 'light'

  );


  updateThemeButton(theme);


  /* Simpan pilihan tema */

  localStorage.setItem(
    'portfolio-theme',
    theme
  );

}



/*
   Ambil tema yang pernah dipilih sebelumnya
*/

const savedTheme =
  localStorage.getItem(
    'portfolio-theme'
  );


/*
   Default adalah dark mode
*/

applyTheme(

  savedTheme === 'light'
    ? 'light'
    : 'dark'

);


/*
   Tombol ganti mode
*/

themeToggle.addEventListener(
  'click',
  () => {

    const nextTheme =

      document.body.classList.contains(
        'light-mode'
      )

        ? 'dark'

        : 'light';


    applyTheme(nextTheme);

  }
);



/* ---------------------------------------------------------------------
   7. INDONESIA / ENGLISH
--------------------------------------------------------------------- */

const languageToggle =
  document.getElementById(
    'languageToggle'
  );


const languageLabel =
  document.getElementById(
    'languageLabel'
  );



/*
   Mengubah bahasa halaman
*/

function applyLanguage(language) {

  const isEnglish =
    language === 'en';


  /* Bahasa pada tag HTML */

  document.documentElement.lang =
    isEnglish
      ? 'en'
      : 'id';


  /* Label tombol */

  languageLabel.textContent =
    isEnglish
      ? 'EN'
      : 'ID';



  /* ---------------------------------------------------------------
     TEKS BIASA
  ---------------------------------------------------------------- */

  document
    .querySelectorAll(
      '[data-id][data-en]'
    )
    .forEach((element) => {

      element.textContent =

        isEnglish

          ? element.dataset.en

          : element.dataset.id;

    });



  /* ---------------------------------------------------------------
     TEKS YANG MENGANDUNG HTML
  ---------------------------------------------------------------- */

  document
    .querySelectorAll(
      '[data-html-id][data-html-en]'
    )
    .forEach((element) => {

      element.innerHTML =

        isEnglish

          ? element.dataset.htmlEn

          : element.dataset.htmlId;

    });



  /* ---------------------------------------------------------------
     PLACEHOLDER INPUT
  ---------------------------------------------------------------- */

  document
    .querySelectorAll(
      '[data-placeholder-id][data-placeholder-en]'
    )
    .forEach((element) => {

      element.placeholder =

        isEnglish

          ? element.dataset.placeholderEn

          : element.dataset.placeholderId;

    });



  /* Update tombol tema */

  updateThemeButton(

    document.body.classList.contains(
      'light-mode'
    )

      ? 'light'

      : 'dark'

  );


  /* Update hamburger */

  hamburger.setAttribute(

    'aria-label',

    isEnglish
      ? 'Open menu'
      : 'Buka menu'

  );


  /* Update language button */

  languageToggle.setAttribute(

    'aria-label',

    isEnglish
      ? 'Change language'
      : 'Ubah bahasa'

  );


  /* Update tombol kembali ke atas */

  backToTop.setAttribute(

    'aria-label',

    isEnglish
      ? 'Back to top'
      : 'Kembali ke atas'

  );


  /* Simpan bahasa */

  localStorage.setItem(
    'portfolio-language',
    language
  );

}



/*
   Ambil bahasa yang tersimpan
*/

const savedLanguage =
  localStorage.getItem(
    'portfolio-language'
  );


/*
   Default adalah Bahasa Indonesia
*/

applyLanguage(

  savedLanguage === 'en'
    ? 'en'
    : 'id'

);



/*
   Tombol ganti bahasa
*/

languageToggle.addEventListener(
  'click',
  () => {

    const nextLanguage =

      document.documentElement.lang === 'id'

        ? 'en'

        : 'id';


    applyLanguage(
      nextLanguage
    );

  }
);



/* ---------------------------------------------------------------------
   8. TOOLS
   RANDOM FADE + RANDOM POSITION
--------------------------------------------------------------------- */

/*
   Efek Tools mengikuti referensi:

   - Tulisan muncul secara redup
   - Tulisan menghilang
   - Ketika muncul lagi posisinya berbeda
   - Tidak bergerak/geser dari satu posisi ke posisi lain
   - Posisi baru dipilih secara acak
*/

const floatingSkills =
  document.querySelectorAll(
    '.floating-skill'
  );



/*
   Menentukan posisi baru secara acak
*/

function placeFloatingSkill(skill) {

  let x =
    12 + Math.random() * 76;


  let y =
    10 + Math.random() * 80;



  /*
     Hindari area tengah,
     supaya tidak terlalu menutupi logo tools utama.
  */

  const tooCloseToCenter =

    Math.abs(x - 50) < 23 &&

    Math.abs(y - 50) < 29;



  if (tooCloseToCenter) {

    x =

      Math.random() < 0.5

        ? 8 + Math.random() * 23

        : 69 + Math.random() * 23;


    y =
      12 + Math.random() * 76;

  }



  /*
     Ukuran acak
  */

  const scale =
    0.72 + Math.random() * 0.68;


  /*
     Tingkat transparansi acak
  */

  const opacity =
    0.30 + Math.random() * 0.38;


  /*
     Ukuran font acak
  */

  const size =
    0.75 + Math.random() * 0.55;



  /* Simpan posisi */

  skill.style.setProperty(
    '--skill-x',
    `${x}%`
  );


  skill.style.setProperty(
    '--skill-y',
    `${y}%`
  );


  skill.style.setProperty(
    '--skill-scale',
    scale.toFixed(2)
  );


  skill.style.setProperty(
    '--skill-opacity',
    opacity.toFixed(2)
  );


  skill.style.setProperty(
    '--skill-size',
    `${size}rem`
  );



  /*
     Variasi warna tulisan
  */

  const colorPool = [

    'rgba(46,230,214,0.32)',

    'rgba(162,89,255,0.30)',

    'rgba(255,79,216,0.26)',

    'rgba(146,156,181,0.30)'

  ];



  const randomColor =

    colorPool[
      Math.floor(
        Math.random() *
        colorPool.length
      )
    ];



  skill.style.setProperty(
    '--skill-color',
    randomColor
  );

}



/*
   Membuat satu skill memiliki siklus:

   muncul
   ↓
   terlihat beberapa detik
   ↓
   hilang
   ↓
   posisi berubah
   ↓
   muncul kembali
*/

function cycleFloatingSkill(
  skill,
  index
) {

  /*
     Supaya semua tulisan tidak muncul
     bersamaan pada posisi awal.
  */

  const firstDelay =

    index * 420 +

    Math.random() * 700;



  setTimeout(() => {

    const showSkill = () => {

      /*
         Pastikan elemen dihapus
         dari kondisi terlihat.
      */

      skill.classList.remove(
        'is-visible'
      );


      /*
         Waktu menghilang
      */

      const hideDuration =

        650 +

        Math.random() * 750;



      setTimeout(() => {

        /*
           Tentukan posisi baru
           sebelum tampil.
        */

        placeFloatingSkill(skill);


        /*
           Tampilkan skill
        */

        skill.classList.add(
          'is-visible'
        );



        /*
           Berapa lama tulisan
           akan terlihat.
        */

        const visibleDuration =

          1700 +

          Math.random() * 2400;



        setTimeout(() => {

          /*
             Hilangkan skill
          */

          skill.classList.remove(
            'is-visible'
          );


          /*
             Setelah hilang,
             ulangi dengan posisi baru.
          */

          setTimeout(
            showSkill,
            hideDuration
          );


        }, visibleDuration);


      }, hideDuration);

    };


    showSkill();

  }, firstDelay);

}



/*
   Jalankan animasi untuk semua skill
*/

floatingSkills.forEach(
  (skill, index) => {

    cycleFloatingSkill(
      skill,
      index
    );

  }
);



/* ---------------------------------------------------------------------
   9. LINK PLACEHOLDER
--------------------------------------------------------------------- */

/*
   Link yang masih "#"
   tidak akan membawa user ke halaman lain.
*/

document
  .querySelectorAll(
    '[data-placeholder-link]'
  )
  .forEach((link) => {

    link.addEventListener(
      'click',
      (event) => {

        if (
          link.getAttribute(
            'href'
          ) === '#'
        ) {

          event.preventDefault();

        }

      }
    );

  });



/* ---------------------------------------------------------------------
   10. CONTACT FORM VALIDATION
--------------------------------------------------------------------- */

const contactForm =
  document.getElementById(
    'contactForm'
  );


const formSuccess =
  document.getElementById(
    'formSuccess'
  );


const nameInput =
  document.getElementById(
    'name'
  );


const emailInput =
  document.getElementById(
    'email'
  );


const messageInput =
  document.getElementById(
    'message'
  );


const errorName =
  document.getElementById(
    'errorName'
  );


const errorEmail =
  document.getElementById(
    'errorEmail'
  );


const errorMessage =
  document.getElementById(
    'errorMessage'
  );



/*
   Pola sederhana untuk mengecek email
*/

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



/*
   Fungsi menampilkan error
*/

function setFieldError(
  inputEl,
  errorEl,
  message
) {

  if (message) {

    inputEl.classList.add(
      'input-error'
    );

    errorEl.textContent =
      message;

  }

  else {

    inputEl.classList.remove(
      'input-error'
    );

    errorEl.textContent =
      '';

  }

}



/* ---------------------------------------------------------------------
   VALIDASI FORM
--------------------------------------------------------------------- */

function validateForm() {

  let isValid =
    true;


  const isEnglish =
    document.documentElement.lang === 'en';



  /* =========================
     NAMA
  ========================= */

  if (
    nameInput.value.trim() === ''
  ) {

    setFieldError(

      nameInput,

      errorName,

      isEnglish

        ? 'Name is required.'

        : 'Nama wajib diisi.'

    );


    isValid =
      false;

  }

  else {

    setFieldError(
      nameInput,
      errorName,
      ''
    );

  }



  /* =========================
     EMAIL
  ========================= */

  if (
    emailInput.value.trim() === ''
  ) {

    setFieldError(

      emailInput,

      errorEmail,

      isEnglish

        ? 'Email is required.'

        : 'Email wajib diisi.'

    );


    isValid =
      false;

  }

  else if (

    !EMAIL_REGEX.test(

      emailInput.value.trim()

    )

  ) {

    setFieldError(

      emailInput,

      errorEmail,

      isEnglish

        ? 'Invalid email format.'

        : 'Format email tidak valid.'

    );


    isValid =
      false;

  }

  else {

    setFieldError(
      emailInput,
      errorEmail,
      ''
    );

  }



  /* =========================
     PESAN
  ========================= */

  if (
    messageInput.value.trim() === ''
  ) {

    setFieldError(

      messageInput,

      errorMessage,

      isEnglish

        ? 'Message cannot be empty.'

        : 'Pesan tidak boleh kosong.'

    );


    isValid =
      false;

  }

  else {

    setFieldError(

      messageInput,

      errorMessage,

      ''

    );

  }



  return isValid;

}



/* ---------------------------------------------------------------------
   SUBMIT FORM
--------------------------------------------------------------------- */

contactForm.addEventListener(
  'submit',
  (event) => {

    /*
       Mencegah halaman reload
    */

    event.preventDefault();


    /*
       Hapus pesan sukses sebelumnya
    */

    formSuccess.classList.remove(
      'show'
    );



    /*
       Periksa validasi
    */

    if (
      validateForm()
    ) {

      /*
         Pesan berhasil
      */

      formSuccess.textContent =

        document.documentElement.lang === 'en'

          ? '✓ Message sent. Thank you for reaching out!'

          : '✓ Pesan terkirim. Terima kasih sudah menghubungi saya!';



      formSuccess.classList.add(
        'show'
      );


      /*
         Kosongkan input
      */

      contactForm.reset();



      /*
         Sembunyikan pesan setelah 5 detik
      */

      setTimeout(() => {

        formSuccess.classList.remove(
          'show'
        );

      }, 5000);

    }


    else {

      /*
         Form tidak valid
      */

      contactForm.classList.remove(
        'shake'
      );


      /*
         Reflow supaya animasi
         bisa dijalankan ulang
      */

      void contactForm.offsetWidth;


      contactForm.classList.add(
        'shake'
      );

    }

  }
);



/* ---------------------------------------------------------------------
   HAPUS ANIMASI SHAKE
--------------------------------------------------------------------- */

contactForm.addEventListener(
  'animationend',
  (event) => {

    if (
      event.animationName === 'shake'
    ) {

      contactForm.classList.remove(
        'shake'
      );

    }

  }
);



/* ---------------------------------------------------------------------
   HILANGKAN ERROR SAAT USER MULAI MENGETIK
--------------------------------------------------------------------- */

[
  nameInput,
  emailInput,
  messageInput

].forEach((input) => {

  input.addEventListener(
    'input',
    () => {

      input.classList.remove(
        'input-error'
      );


      const errorEl =
        input.parentElement.querySelector(
          '.error-msg'
        );


      if (errorEl) {

        errorEl.textContent =
          '';

      }

    }
  );

});



/* ---------------------------------------------------------------------
   11. BACK TO TOP
--------------------------------------------------------------------- */

backToTop.addEventListener(
  'click',
  () => {

    window.scrollTo({

      top: 0,

      behavior: 'smooth'

    });

  }
);



/* ---------------------------------------------------------------------
   TAHUN FOOTER
--------------------------------------------------------------------- */

document.getElementById(
  'year'
).textContent =
  new Date().getFullYear();