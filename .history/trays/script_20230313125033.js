// Select all buttons
const btns = document.querySelectorAll('.btnReal');
const sections = document.querySelector('.sections')

// Event listener
btns.forEach(btn => {
    btn.addEventListener('click', e => {
        btns.forEach(btn => {
            btn.classList.remove('button-clicked');
            btn.firstElementChild.classList.remove('icon-clicked')
        })
        let btnName = btn.id
        console.log(btn.id);
        // console.log(btnName);
        btn.classList.add('button-clicked');
        btn.firstElementChild.classList.add('icon-clicked')
        removeAllChildNodes(sections)
        fetch(`https://backend4theforkofit.herokuapp.com/api/categories/name/${btnName}`)
        .then(function(res){
            return res.json()
        })
        .then(function (data) { 
            category = data
            // console.log(category);
            const catID = category._id;
            // console.log(catID);
            // create a new div element
            const lineBreak = document.createElement("hr");
            const newDiv = document.createElement("div");
            newDiv.className = "sect";
            // and give it some content
            // Section Title
            const newSectTitle = document.createElement("h2");
            // console.log(category.name);
            newSectTitle.innerHTML = category.name;
            // Section Description
            const catDesc = category.description
            // console.log(catDesc.length);
            const newDesc = document.createElement("div");
            newDesc.className = "desc";
            catDesc.forEach( des => {
                const newDescText = document.createElement("p");
                newDescText.innerHTML = des.text;
                // console.log(des.text);
                newDesc.appendChild(newDescText);
            })
            newDiv.appendChild(newSectTitle)
            newDiv.appendChild(newDesc)
            // console.log(category.hasSubSection);
            if (category.hasSubSection === true && category.isTray === true) {
                fetch(`https://backend4theforkofit.herokuapp.com/api/subCategories/category/${catID}`)
                .then( res => res.json())
                .then( data => {
                    subCategories = data
                    // console.log(subCategories);
                    subCategories.forEach( subCat => {
                        const subCatID = subCat._id
                        // console.log(subCatID);
                        // Sub Section
                        const newSubSect = document.createElement('div');
                        newSubSect.className = 'sub-sect';
                        // Sub Section Title
                        const newSubSectTitle = document.createElement('h4');
                        newSubSectTitle.innerHTML = subCat.name;
                        // Sub Section Description
                        const newSubSectDesc = document.createElement('div');
                        newSubSectDesc.className = 'desc';
                        const subCatDes = subCat.description
                        subCatDes.forEach( subDes => {
                            const newSubSectDescText = document.createElement('p')
                            newSubSectDescText.innerHTML = subDes.text
                            newSubSectDesc.appendChild(newSubSectDescText);
                        })
                        // Sub Section List
                        const newSubSectList = document.createElement('ul')
                        fetch(`https://backend4theforkofit.herokuapp.com/api/products/subCategory/${subCatID}`)
                        .then( res => res.json() )
                        .then( data => {
                            products = data
                            // console.log(products);
                            products.forEach( product => {
                                const newSubSectListItem = document.createElement('li');
                                // console.log(product.name);
                                if (product.price > 0 && product.price % 1 != 0) {
                                    newSubSectListItem.innerHTML = `${product.name} - $${product.price.toFixed(2)}`;
                                    newSubSectList.appendChild(newSubSectListItem);
                                } else if (product.price > 0){
                                    newSubSectListItem.innerHTML = `${product.name} - $${product.price}`;
                                    newSubSectList.appendChild(newSubSectListItem);
                                } else {
                                    newSubSectListItem.innerHTML = product.name;
                                    newSubSectList.appendChild(newSubSectListItem);
                                }
                            })
                        })
                        newSubSect.appendChild(newSubSectTitle)
                        newSubSect.appendChild(newSubSectDesc)
                        newSubSect.appendChild(newSubSectList)
                        newDiv.appendChild(newSubSect)
                    })
                })
            } else {
                const newSectList = document.createElement('ul')
                fetch(`https://backend4theforkofit.herokuapp.com/api/products/category/${catID}`)
                .then( res => res.json() )
                .then( data => {
                    products = data
                    // console.log(products);
                    products.forEach( product => {
                        const newSectListItem = document.createElement('li');
                        // console.log(product.name);
                        // console.log(product.price);
                        if (product.price > 0 && product.price % 1 != 0) {
                            newSectListItem.innerHTML = `${product.name} - $${product.price.toFixed(2)}`;
                            newSectList.appendChild(newSectListItem);
                        } else if (product.price > 0){
                            newSectListItem.innerHTML = `${product.name} - $${product.price}`;
                            newSectList.appendChild(newSectListItem);
                        } else {
                            newSectListItem.innerHTML = product.name;
                            newSectList.appendChild(newSectListItem);
                        }
                    })
                })
                newDiv.appendChild(newSectList)
            }
            sections.appendChild(lineBreak);
            sections.appendChild(newDiv);
        });
    })
});

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}