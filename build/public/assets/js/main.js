"use strict";

/**
* Template Name: Impact
* Updated: Mar 10 2023 with Bootstrap v5.2.3
* Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";
  /**
   * Preloader
   */

  var preloader = document.querySelector('#preloader');

  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
  /**
   * Sticky Header on Scroll
   */


  var selectHeader = document.querySelector('#header');

  if (selectHeader) {
    var headerOffset = selectHeader.offsetTop;
    var nextElement = selectHeader.nextElementSibling;

    var headerFixed = () => {
      if (headerOffset - window.scrollY <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    };

    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }
  /**
   * Navbar links active state on scroll
   */


  var navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      var section = document.querySelector(navbarlink.hash);
      if (!section) return;
      var position = window.scrollY + 200;

      if (position >= section.offsetTop && position <= section.offsetTop + section.offsetHeight) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);
  /**
   * Mobile nav toggle
   */

  var mobileNavShow = document.querySelector('.mobile-nav-show');
  var mobileNavHide = document.querySelector('.mobile-nav-hide');
  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    });
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }
  /**
   * Hide mobile nav on same-page/hash links
   */


  document.querySelectorAll('#navbar a').forEach(navbarlink => {
    if (!navbarlink.hash) return;
    var section = document.querySelector(navbarlink.hash);
    if (!section) return;
    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });
  /**
   * Toggle mobile nav dropdowns
   */

  var navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');
        var dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    });
  });
  /**
   * Initiate glightbox
   */

  var glightbox = GLightbox({
    selector: '.glightbox'
  });
  /**
   * Scroll top button
   */

  var scrollTop = document.querySelector('.scroll-top');

  if (scrollTop) {
    var togglescrollTop = function togglescrollTop() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    };

    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }
  /**
   * Initiate Pure Counter
   */


  new PureCounter();
  /**
   * Clients Slider
   */

  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });
  /**
   * Init swiper slider with 1 slide at once in desktop view
   */

  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  });
  /**
   * Init swiper slider with 3 slides at once in desktop view
   */

  new Swiper('.slides-3', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },
      1200: {
        slidesPerView: 3
      }
    }
  });
  /**
   * Porfolio isotope and filter
   */

  var portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {
    var portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    var portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    var portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';
    window.addEventListener('load', () => {
      var portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });
      var menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function (el) {
        el.addEventListener('click', function () {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });

          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });
    });
  }
  /**
   * Animation on scroll function and init
   */


  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  window.addEventListener('load', () => {
    aos_init();
  });
});