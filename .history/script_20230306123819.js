// Collecting DOM Elements
const bottom = document.querySelector('.bottom');
const sections = document.querySelector('.sections');

// API Data 
const categories = [
    {
        name: 'Jumbo Wings',
        hasSubSection: true,
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
    for(i=0; i < categories.length; i++) {
            // create a new div element
            const lineBreak = document.createElement("hr");
            const newDiv = document.createElement("div");
            newDiv.className = "sect";

            // and give it some content
            // Section Title
            const newSectTitle = document.createElement("h3");
            newSectTitle.innerHTML = categories[i].name;

            // Section Description
            const newDesc = document.createElement("div");
            newDesc.className = "desc";
            const newDescText = document.createElement("p");
            newDescText.innerHTML = categories[i].description[0].text;
            newDesc.appendChild(newDescText);

            if(categories[0].hasSubSection === true) {
                // Sub Section
                const newSubSect = document.createElement("div");
                newSubSect.className = "sub-sect";

                // Sub Section Title
                const newSubSectTitle = document.createElement("h4");
                newSubSectTitle.innerHTML = subCategories[0].name;

                // Sub Section Description
                const newSubSectDesc = document.createElement('div');
                newSubSectDesc.className = "desc";
                const newSubSectDescText = document.createElement("p");
                newSubSectDescText.innerHTML = subCategories[0].description[0].text;
                newSubSectDesc.appendChild(newSubSectDescText);

                // Sub Section List
                const newSubSectList = document.createElement('ul');
                const newSubSectListItem = document.createElement('li');
                newSubSectListItem.innerHTML = products[0].name
                newSubSectList.appendChild(newSubSectListItem)

                // Appending all elements to Sub Section
                newSubSect.appendChild(newSubSectTitle)
                newSubSect.appendChild(newSubSectDesc)
                newSubSect.appendChild(newSubSectList)

                // Appending all elements to Parent Div
                newDiv.appendChild(newSectTitle);
                newDiv.appendChild(newDesc);
                newDiv.appendChild(newSubSect)
            } else {
                //  Section List
                const newSectList = document.createElement('ul');
                const newSectListItem = document.createElement('li');
                newSectListItem.innerHTML = products[0].name
                newSectList.appendChild(newSectListItem)

                // Appending all elements to Parent Div
                newDiv.appendChild(newSectTitle);
                newDiv.appendChild(newDesc);
                newDiv.appendChild(newSectList)
            }
            
            // add the newly created element and its content into the DOM
            document.body.insertBefore(lineBreak, bottom)
            document.body.insertBefore(newDiv, bottom)
            }
}