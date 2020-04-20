var texts = document.querySelectorAll('.description');
var blocks = document.querySelectorAll('.block');

const container = document.querySelector('.container');
const wholePage = document.querySelector('html');
const intro = document.querySelector('.introduction');
const images = document.querySelectorAll('.img');

const bgColorConst = 'f5efef';  //constant (lighter) shade
const bgColor1 = 'feada6';      //colour before transition
const bgColor2 = 'aef9f3';      //colour after scroll transition

let a1 = parseInt(bgColor1.slice(0,2), 16),
    a2 = parseInt(bgColor1.slice(2,4), 16),
    a3 = parseInt(bgColor1.slice(4), 16),
    b1 = parseInt(bgColor2.slice(0,2), 16),
    b2 = parseInt(bgColor2.slice(2,4), 16),
    b3 = parseInt(bgColor2.slice(4), 16);

let r1 = b1 - a1,
    r2 = b2 - a2,
    r3 = b3 - a3;

const init = () => {
    wholePage.style.background = `linear-gradient(to right, #${bgColorConst} 0%, #${(a1 | 0).toString(16)}${(a2 | 0).toString(16)}${(a3 | 0).toString(16)} 100%)`;

    const styles = window.getComputedStyle(container);
    const rows = styles.getPropertyValue('grid-template-rows');
    const spaceAbove = container.offsetTop;

    //Initialise blocks starting half way down screen
    let firstBlock = parseFloat(rows.split(' ')[0].slice(0, -2));

    for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
        blocks[i] = document.querySelector(`.block${i+1}`);
        //if blocks will scroll at a different speed, change the 4 here
        blocks[i].setAttribute('style', `
            left: 5%;
            top: ${window.innerHeight / 2 + (firstBlock / 4) * i}px;
            transform: translateY(-50%);
            filter: blur(0.3rem);
        `);

        //blocks are more opaque when near to the relevent text
        let distanceBetween = Math.abs((texts[i].getBoundingClientRect().top + texts[i].offsetHeight / 2) - (blocks[i].getBoundingClientRect().top + blocks[i].offsetHeight / 2));
        blocks[i].style.opacity =  distanceBetween > 50 ? 0.2 : (1 - (distanceBetween / 50)) + 0.2;

        if (blocks[i].getBoundingClientRect().bottom < intro.getBoundingClientRect().bottom) {
            blocks[i].style.opacity = 0;
        }
    } 
}

const scrollFunc = () => {
    const scrollPos = texts[0].getBoundingClientRect().top - window.innerHeight / 2;

    const spaceAbove = container.offsetTop;
  
    for (let i = 0; i < blocks.length; i++) {
        if (texts[0].getBoundingClientRect().top > window.innerHeight / 2) {
            blocks[i].style.transform = `translateY(-50%)`;
        } else {
            //scrolling speed of blocks
            blocks[i].style.transform = `translateY(-50%) translate(0, ${(scrollPos / 4)}px)`;
        }

        let distanceBetween = Math.abs((texts[i].getBoundingClientRect().top + texts[i].offsetHeight / 2) - (blocks[i].getBoundingClientRect().top + blocks[i].offsetHeight / 2));

        blocks[i].style.opacity =  distanceBetween > 50 ? 0.2 : (1 - (distanceBetween / 50)) + 0.2;

        if (blocks[i].getBoundingClientRect().bottom < intro.getBoundingClientRect().bottom) {
            blocks[i].style.opacity = 0;
        }

        blocks[i].style.filter =  distanceBetween > 50 ? `blur(0.3rem)` : `blur(${(distanceBetween / 200)}rem)`;
    }

    //scroll colour change of bg
    wholePage.style.background = texts[5].getBoundingClientRect().top > window.innerHeight ?
                                `linear-gradient(to right, #${bgColorConst} 0%, #${bgColor1} 100%)` :
                                texts[5].getBoundingClientRect().top < window.innerHeight / 2 ?
                                `linear-gradient(to right, #${bgColorConst} 0%, #${bgColor2} 100%)` :
                                `linear-gradient(to right, #${bgColorConst} 0%, #${((a1 + (window.innerHeight - texts[5].getBoundingClientRect().top) / (window.innerHeight / 2) * r1) | 0).toString(16)}${(a2 + (window.innerHeight - texts[5].getBoundingClientRect().top) / (window.innerHeight / 2) * r2 | 0).toString(16)}${(a3 + (window.innerHeight - texts[5].getBoundingClientRect().top) / (window.innerHeight / 2) * r3| 0).toString(16)} 100%)`;
}

window.addEventListener('scroll', scrollFunc);

