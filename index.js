// Error message for empty text
const emptyInputMsg = 'Please provide a valid text to comment';

// All HTML Elements
const bodyElements = Object.freeze({
    input: 'comment-input',
    button: 'send-btn',
    main: 'main-app'
});

// Style for a comment component
const commentStyle = Object.freeze({
    maxWidth: '30rem',
    margin: '2rem auto',
    borderRadius: '7px',
    backgroundColor: 'rgb(217, 217, 219)',
    boxSizing: 'border-box',
    padding: '1rem',
    display: 'block',
});

// Style for link component
const linkStyle = Object.freeze({
    textDecoration: 'none',
    color: 'white',
    fontWeight: 600,
    textShadow: '0 2px 3px grey',
})

// String / Array empty validation
const isEmpty = txt => txt.length === 0;

/******************************/
/* Elements Creation Factory */
/************************** */

// Create Simple element
const createElement = element => document.createElement(element);

// Add text to exist element
const addTextToElement = (text, element) => {
    element.appendChild(document.createTextNode(text));
    return element;
}

// Add Style to exist element
const addStyleToElement = (element, style) => {
    Object.entries(style).forEach(([name, value]) => element.style[name] = value);
    return element;
}

// Pipe returns a new function to create elements
const elementBuilder = (fn1, fn2, f3) => (element, text, style) => f3(fn2(text, fn1(element)), style);

// Creating complete element with text and style
const createFullElement = elementBuilder(createElement, addTextToElement, addStyleToElement);

/*********************/ 
/*******End...*******/
/***************** */


// Increase number every time it calls - for ID
const numberIncreaser = () => {
    let number = 1;
    return () => number++;
}
// ID - Always increase by one when its called
const idGenerator = numberIncreaser();


/***
 * Create new fixed comment
 */
const createComment = text => {

    // Creating all inside elements
    const commentWrapper = createFullElement('div', '', commentStyle);
    const comment = createFullElement('p', text, {});
    const link = createFullElement('a', 'Like', linkStyle);
    const likesCount = createFullElement('span', '', { margin: '0 0.5rem', color: 'blue' });
    link.classList.add('like');

    // mix them together
    commentWrapper.appendChild(comment);
    commentWrapper.appendChild(link);
    commentWrapper.appendChild(likesCount);

    // creating id for the likes component
    const id = text.slice(0, 3) + idGenerator();
    likesCount.id = id;

    // Add event listener while clicking the like button
    link.addEventListener('click', () => {
        const likes = document.getElementById(id);
        let likesNumber = likes.innerText === '' ? 0
            : Number(likes.innerText);

        likesNumber++;

        likes.innerText = likesNumber;
    });

    // return the new component
    return commentWrapper;
}

// Handler for the send button - new comment
const sendHandler = () => {
    const inputText = document.getElementById(bodyElements.input).value;
    if (isEmpty(inputText)) {
        alert(emptyInputMsg);
        return;
    }

    const comment = createComment(inputText);
    document.getElementById(bodyElements.main).appendChild(comment);

}
