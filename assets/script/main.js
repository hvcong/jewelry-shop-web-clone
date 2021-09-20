
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
let viewWidth = window.innerWidth
let viewHeight = window.innerHeight

//when document resize
window.addEventListener('resize', e => {
    viewWidth = e.target.innerWidth
    viewHeight = e.target.innerHeight
    handleSlide()
})


//add event slide 
function handleSlide() {

    // when drag slide
    let slide = $('.header__banner')
    let innerSlide = $('.header__banner-slide-wrap')
    let filters = Array.from($$('.header__filter-item'))

    let slideCurrent = 1
    let slideTotal = $$('.header__banner-item').length
    let xCurrent = -(slideCurrent - 1) * viewWidth // translateX(xCurrent)
    let startX = 0
    let dragX = 0;
    let isStarted = false
    switchSlide()

    function switchSlide() {
        xCurrent = -(slideCurrent - 1) * viewWidth

        filters.forEach(filter => {
            filter.classList.remove('active')
        })

        filters[slideCurrent - 1].classList.add('active')
        innerSlide.style.transition = 'transform 0.6s ease'
        innerSlide.style.transform = `translateX(${xCurrent}px)`
    }

    slide.addEventListener('mousedown', e => {
        innerSlide.style.transition = 'unset'
        isStarted = true;
        startX = e.clientX;
        innerSlide.style.cursor = 'grabbing'
    })

    slide.addEventListener('mouseup', e => {
        innerSlide.style.cursor = 'grab'
        isStarted = false;

        if (dragX > viewWidth / 2.5) {
            if (slideCurrent > 1) {
                slideCurrent--;
            }
        } else if (dragX < -viewWidth / 2.5) {
            if (slideCurrent < 2) {
                slideCurrent++;
            }
        }
        switchSlide()
    })

    slide.addEventListener('mousemove', e => {
        if (isStarted) {
            dragX = e.clientX - startX

            if (xCurrent + dragX < 0 && xCurrent + dragX > (- (slideTotal - 1) * viewWidth)) {
                innerSlide.style.transform = `translateX(${(xCurrent + dragX)}px)`

            }
        }
    })

    //when click btn next or prev
    let prevBtn = $('.header__slide-btn-left')
    let nextBtn = $('.header__slide-btn-right')

    prevBtn.addEventListener('click', function () {
        if (slideCurrent === 1) return
        slideCurrent--
        switchSlide()
    })

    nextBtn.addEventListener('click', function () {
        if (slideCurrent === slideTotal) return
        slideCurrent++
        switchSlide()
    })

    //when click filter
    filters.forEach((filter, index) => {
        filter.addEventListener('click', () => {
            slideCurrent = index + 1;
            switchSlide()
        })
    })
}

function handleHeader() {
    //header pc
    document.addEventListener('scroll', function (e) {
        let headerTop = $('.header__top')
        let scrollY = window.scrollY;
        if (scrollY > headerTop.clientHeight) {
            headerTop.style.position = 'fixed'
            headerTop.style.animation = 'fadeInHeader 0.4s ease-out'
        }
        if (scrollY < headerTop.clientHeight) {
            headerTop.style.position = 'absolute'
            headerTop.style.animation = 'unset'
        }
    })

    //  nav : mobile + tablet 
    let nav = $('.sm-header__nav-wrap')
    let navBtn = $('.sm-header__nav-icon')
    let navItems = Array.from($$('.sm-header__nav-item'))

    navBtn.onclick = function () {
        nav.classList.remove('hide')
    }

    nav.onclick = function (e) {
        if (e.target.matches('.sm-header__nav-wrap') || e.target.matches('.sm-header__nav-close-icon')) {
            this.classList.add('hide')
        }
    }

    // on - off cart side
    let cartWrap = $('.sm-header__cart-wrap')
    let cartBtn = $('.sm-header__top-cart')
    let cart = $('.sm-header__cart')

    cartBtn.addEventListener('click', (e) => {
        cartWrap.classList.remove('hide')
        cart.style.animation = 'cartSideFadeIn 0.3s ease-out forwards'
        document.body.classList.add('scrollHide')
    })

    cartWrap.addEventListener('click', (e) => {
        if (e.target.matches('.sm-header__cart-wrap') || e.target.matches('.sm-header__nav-close-icon')) {
            cartWrap.classList.add('hide')
            document.body.classList.remove('scrollHide')
        }
    })


    //click item
    navItems.forEach((item, index, arr) => {
        item.addEventListener('click', function () {
            item.classList.toggle('active')
            if (item.querySelector('.sm-header__subnav-list')) {
                item.querySelector('.sm-header__subnav-list').style.animation = 'subNavFadeIn 0.2s ease-out forwards'
            }
            arr.forEach(navItem => {
                if (navItem !== item) {
                    navItem.classList.remove('active')
                }
            })
        })
    })
}

function handleBackToTopBtn() {
    let btn = $('.back-to-top-btn')
    document.addEventListener('scroll', function (e) {
        if (window.scrollY > viewHeight) {
            btn.classList.remove('hide')
        } else {
            btn.classList.add('hide')
        }
    })
}

function start() {
    // event of all devices
    handleSlide()
    handleHeader()
    //event mobile + tablet
    handleBackToTopBtn()

}

start();
