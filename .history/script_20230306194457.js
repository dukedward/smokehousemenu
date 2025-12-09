// Collecting DOM Elements
const bottom = document.querySelector('.bottom');
const sections = document.querySelector('.sections');

// API Data 
// let data = []
// async function fetchJSON(path) {
//     const res = await fetch(path);
//     const json = await res.json();
//     for ( let el of json) {
//         data.push(el)
//     }
//     return data
// }
// const categories = fetchJSON('../testData/categories.json')
// const products = fetchJSON('../testData/products.json')
// const subCategories = fetchJSON('../testData/subCategories.json')
// console.log();

let categories = [];
let subCategories = [];
let products = [];



document.body.onload = addSection;

function addSection() {
    let catName, subCatName, prodName = '';
    fetch('http://10.0.0.154:5000/api/products')
    .then(function(res){
        return res.json()
    })
    .then(function (data) { 
        products = data.products
    })
    fetch('http://10.0.0.154:5000/api/categories')
    .then(function(res){
        return res.json()
    })
    .then(function (data) { 
        categories = data.categories
    })
    fetch('http://10.0.0.154:5000/api/subCategories')
    .then(function(res){
        return res.json()
    })
    .then(function (data) { 
        subCategories = data.subCategories
    })
    for(i=0; i < categories.length; i++) {
        catName = categories[i].name;
        // create a new div element
        const lineBreak = document.createElement("hr");
        const newDiv = document.createElement("div");
        newDiv.className = "sect";

        // and give it some content
        // Section Title
        const newSectTitle = document.createElement("h3");
        newSectTitle.innerHTML = catName;

        // Section Description
        console.log(categories[i].description.length);
        const newDesc = document.createElement("div");
        newDesc.className = "desc";
        for(e=0; e < categories[i].description.length; e++ ) {
            const newDescText = document.createElement("p");
            newDescText.innerHTML = categories[i].description[i].text;
            // console.log(categories[i].description[i].text);
            newDesc.appendChild(newDescText);
        }

        if(categories[i].hasSubSection === true) {
            for (s=0; s < subCategories.length; s++) {
                subCatName = subCategories[s].category.name
                if (catName === subCatName) {
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
                        
                    }
                    
                        // Sub Section List
                        const newSubSectList = document.createElement('ul');
                        for (p=0; p < products.length; p++) {
                            prodName = products[p].category.name
                            if (catName === prodName) {
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