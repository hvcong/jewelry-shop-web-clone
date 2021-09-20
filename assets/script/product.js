const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



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


    //mobile+tablet nav click item
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

function handleCategories() {
    let categoriesBar = $('.sm-filter__select-bar')
    let categoriesWrap = $('.sm-categories')
    let categories = $('.categories');

    //on - off categories
    categoriesBar.addEventListener('click', () => {
        categoriesWrap.classList.remove('hide-on-tablet-mobile')
        categories.style.animation = 'categoriesFadeIn 0.3s ease-out forwards'
        document.body.classList.add('scrollHide')
    })

    categoriesWrap.addEventListener('click', e => {
        if(e.target.matches('.sm-categories') || e.target.closest('.sm-categories-close')) {
            categoriesWrap.classList.add('hide-on-tablet-mobile')
            document.body.classList.remove('scrollHide')
        }
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
    handleHeader()
    //event mobile + tablet
    handleBackToTopBtn()
    handleCategories()

}

start();
