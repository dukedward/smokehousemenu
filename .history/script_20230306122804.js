// Collecting DOM Elements
const bottom = document.querySelector('.bottom');
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

document.body.onload = addSection;

function addSection() {
    // create a new div element
    const lineBreak = document.createElement("hr");
    const newDiv = document.createElement("div");
    newDiv.className = "sect";

    // and give it some content
    const newSectTitle = document.createElement("h3");
    newSectTitle.innerHTML = categories[0].name;

    const newDesc = document.createElement("div");
    newDesc.className = "desc";
    const newDescText = document.createElement("p");
    newDescText.innerHTML = categories[0].description[0].text;
    newDesc.appendChild(newDescText);

    const newSubSect = document.createElement("div");
    newSubSect.className = "sub-sect";

    const newSubSectTitle = document.createElement("h4");
    newSubSectTitle.innerHTML = subCategories[0].name;

    const newSubSectDesc = document.createElement('div');
    newSubSectDesc.className = "desc";
    const newSubSectDescText = document.createElement("p");
    newSubSectDescText.innerHTML = subCategories[0].description[0].text;
    newSubSectDesc.appendChild(newSubSectDescText);


    const newSubSectList = document.createElement('ul');
    const newSubSectListItem = document.createElement('li');
    newSubSectListItem.innerHTML = products[0].name
    newSubSectList.appendChild(newSubSectListItem)

    newSubSect.appendChild(newSubSectTitle)
    newSubSect.appendChild(newSubSectDesc)
    newSubSect.appendChild(newSubSectList)

    // add to the newly created div
    newDiv.appendChild(newSectTitle);
    newDiv.appendChild(newDesc);
    newDiv.appendChild(newSubSect)
    
    // add the newly created element and its content into the DOM
    document.body.insertBefore(lineBreak, bottom)
    document.body.insertBefore(newDiv, bottom)
}