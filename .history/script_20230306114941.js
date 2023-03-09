// Collecting DOM Elements
const sections = document.querySelector('.sections');
// const x = document.querySelector('');
// const x = document.querySelector('');
// const x = document.querySelector('');
// const x = document.querySelector('');
// const x = document.querySelector('');
// const x = document.querySelector('');

// API Data 
const categories = [
    {
        name: 'Jumbo Wings',
        description: [
            {
                text: 'Includes a choice of ranch or blue cheese',
            },
        ],
    },
];
const products = [
    {
        name: 'Greg\'s Spicy BBQ (Sweet & Spicy) 🌶️',
        image: '',
        price: 0,
        category: '640533ab345c72c36a197c35'
    },
];
const subCategories = [
    {
        name: 'Choose Sauces',
        description: [
            {
                text: '🌶️ - Spicy Items',
            },
        ],
        category: {
            _id: '640533ab345c72c36a197c35',
        },
    },
];

document.body.onload = addElement;

function addElement() {
  // create a new div element
  const newDiv = document.createElement("div");

  // and give it some content
  const newContent = document.createTextNode("Hi there and greetings!");

  // add the text node to the newly created div
  newDiv.appendChild(newContent);

  // add the newly created element and its content into the DOM
  const currentDiv = document.getElementById("sections");
  document.body.insertBefore(newDiv, currentDiv);
}