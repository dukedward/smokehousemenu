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
    },{
        name: 'Sides',
        hasSubSection: false,
        description: [
            {
                text: 'Small - $4'
            },
            {
                text: 'Large - $6'
            }
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
            for(e=0; e < categories[i].description.length; e++ ) {
                const newDescText = document.createElement("p");
                newDescText.innerHTML = categories[i].description[i].text;
                newDesc.appendChild(newDescText);
            }

            if(categories[i].hasSubSection === true) {
                for (s=0; s < subCategories.length; s++) {
                    // Sub Section
                    const newSubSect = document.createElement("div");
                    newSubSect.className = "sub-sect";

                    // Sub Section Title
                    const newSubSectTitle = document.createElement("h4");
                    newSubSectTitle.innerHTML = subCategories[s].name;

                    // Sub Section Description
                    const newSubSectDesc = document.createElement('div');
                    newSubSectDesc.className = "desc";
                    for (d=0; d < subCategories[s].description.length; d++) {
                        const newSubSectDescText = document.createElement("p");
                        newSubSectDescText.innerHTML = subCategories[s].description[d].text;
                        newSubSectDesc.appendChild(newSubSectDescText);

                        // Sub Section List
                        const newSubSectList = document.createElement('ul');
                        for (p=0; p < products.length; p++) {
                            const newSubSectListItem = document.createElement('li');
                            newSubSectListItem.innerHTML = products[p].name
                            newSubSectList.appendChild(newSubSectListItem)
                            
                        }
                        // Appending all elements to Sub Section
                        newSubSect.appendChild(newSubSectTitle)
                        newSubSect.appendChild(newSubSectDesc)
                        newSubSect.appendChild(newSubSectList)
    
                        // Appending all elements to Parent Div
                        newDiv.appendChild(newSectTitle);
                        newDiv.appendChild(newDesc);
                        newDiv.appendChild(newSubSect)
                    }
                }
            } else {
                //  Section List
                const newSectList = document.createElement('ul');
                for (p=0; p < products.length; p++) {
                    const newSectListItem = document.createElement('li');
                    newSectListItem.innerHTML = products[p].name
                    newSectList.appendChild(newSectListItem)
                }

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