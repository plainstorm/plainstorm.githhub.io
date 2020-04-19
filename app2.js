var blocks = [];
var texts = [];

for (let i = 0; i < document.getElementsByClassName('description').length; i++) {
    texts[i] = document.getElementsByClassName('description').item(i);
}

// First block element starts half down the page
//others are half a page height, will scroll half speed

const init = () => {
    const container = document.querySelector('.container');
    /* const inspector = document.createElement('div');
    inspector.setAttribute('style', `
        position: absolute;
        height: ${container.offsetHeight}px;
        width: ${container.offsetWidth}px;
        left: ${container.offsetLeft}px;
        top: ${container.offsetTop}px;
        background: rgba(58, 250, 8, .5);
    `);
    document.body.appendChild(inspector); */

    const styles = window.getComputedStyle(container);
    const rows = styles.getPropertyValue('grid-template-rows');
    const columns = styles.getPropertyValue('grid-template-columns');
    const rowGap = styles.getPropertyValue('grid-row-gap');
    const columnGap = styles.getPropertyValue('grid-column-gap');
    const spaceAbove = container.offsetTop;
    console.log(spaceAbove);

    //first block at row / 2;
    //next block row / 4 after
    let firstBlock = parseFloat(rows.split(' ')[0].slice(0, -2));
    /* console.log(firstBlock); */

    for (let i = 0; i < document.getElementsByClassName('block').length; i++) {
        blocks[i] = document.querySelector(`.block${i+1}`);
        blocks[i].setAttribute('style', `
            left: 18%;
            top: ${(spaceAbove / 2) + (firstBlock / 2 + (firstBlock / 2) * (i))}px;
            transform: translateY(-50%);
        `)

        let textPositions = texts.slice();
        textPositions.sort((a,b) => {
            if (Math.abs(a.getBoundingClientRect().top - blocks[i].getBoundingClientRect().top) <
            Math.abs(b.getBoundingClientRect().top - blocks[i].getBoundingClientRect().top)) {
                return -1;
            } else {
                return 1;
            }
        });

        let distanceBetween = Math.abs((textPositions[0].getBoundingClientRect().top + textPositions[0].offsetHeight / 2) - (blocks[i].getBoundingClientRect().top + blocks[i].offsetHeight / 2));
        blocks[i].style.opacity =  distanceBetween > 50 ? 0 : 1 - (distanceBetween / 30);
    }

}


const scrollBlocks = () => {
    const scrollPos = document.scrollingElement.scrollTop;
    let scrollConstant;

    let sortedTexts;
    let textInView;
    let sortedBlocks;
    let blockInView;
    for (let i = 0; i < blocks.length; i++) {
        if (texts[0].getBoundingClientRect().top > window.innerHeight) {
            blocks[i].style.transform = `translateY(-50%) translate(0, ${-scrollPos}px)`
            scrollConstant = scrollPos;
            console.log(`block top: ${blocks[0].getBoundingClientRect().top}`);
            console.log(`text top: ${texts[0].getBoundingClientRect().top}`);
        } else {
            blocks[i].style.transform = `translateY(-50%) translate(0, ${(-scrollPos / 2)}px)`;
        }

        /* let blockPos = 1 - (Math.abs(window.innerHeight / 2 - blocks[i].getBoundingClientRect().top)) / window.innerHeight;
        blockPos = Math.abs(Math.pow(blockPos, 8));
        blocks[i].style.opacity = `${blockPos}`; */

        
        //get text in view
        sortedTexts = texts.slice();
        sortedTexts.sort((a,b) => {
            if (Math.abs(a.getBoundingClientRect().top - (window.innerHeight - a.getBoundingClientRect().bottom)) <=
                Math.abs(b.getBoundingClientRect().top - (window.innerHeight - b.getBoundingClientRect().bottom))) {
                    return -1;
                } else return 1;
        } );
        textInView = sortedTexts[0];

        //get block in view
        sortedBlocks = blocks.slice();
        sortedBlocks.sort((a,b) => {
            if (Math.abs(a.getBoundingClientRect().top - (window.innerHeight - a.getBoundingClientRect().bottom)) <=
                Math.abs(b.getBoundingClientRect().top - (window.innerHeight - b.getBoundingClientRect().bottom))) {
                    return -1;
                } else return 1;
        } );
        blockInView = sortedBlocks[0];

        let textPositions = texts.slice();
        textPositions.sort((a,b) => {
            if (Math.abs(a.getBoundingClientRect().top - blocks[i].getBoundingClientRect().top) <
            Math.abs(b.getBoundingClientRect().top - blocks[i].getBoundingClientRect().top)) {
                return -1;
            } else {
                return 1;
            }
        });

        let distanceBetween = Math.abs((textPositions[0].getBoundingClientRect().top + textPositions[0].offsetHeight / 2) - (blocks[i].getBoundingClientRect().top + blocks[i].offsetHeight / 2));
        blocks[i].style.opacity =  distanceBetween > 50 ? 0 : 1 - (distanceBetween / 30);


    }

}

window.addEventListener('scroll', scrollBlocks);