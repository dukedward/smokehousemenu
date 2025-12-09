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
  newDiv.className = 'sect'
  
  // and give it some content
  const newTitle = document.createElement("h3");
  newTitle.innerHTML = categories[0].name
  
  const newDesc = document.createElement("div");
  newDesc.className = 'desc'
  const newText = document.createElement('p')
  newText.innerHTML = categories[0].description[0].text
  newDesc.appendChild(newText)

  // add the text node to the newly created div
  newDiv.appendChild(newTitle);
  newDiv.appendChild(newDesc);

  // add the newly created element and its content into the DOM
  const currentDiv = document.querySelector(".sections");
  document.body.insertBefore(newDiv, currentDiv);
}