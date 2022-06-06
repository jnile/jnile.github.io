let onDisplay = [] /* Stores the displayed info */
let buffer; /* Will store sorted array of information to display*/
let data = {};
let currPageNo = 1;

async function loadData() {
    await getData();

    setOnDisplay();

    displayOptions();
}

async function getData() {
    console.log("getData called");
    let url = new URL(document.location.href);

    await fetch(url.origin + `/archivetest/Archives/content.json`)
    .then(res => res.json())
    .then(json => {
    //json vaiable contains object with data
    //Filter data for abstraction
    let maxDocs = json.storage.length;
    data.storage = [];
    for(let i = 0; i < maxDocs; i++) {
        data.storage.push(json.storage[i]);
    }
    console.log("Data fetched");
    });
}

function setOnDisplay() {
    console.log("onDisplay array called.");
    let maxDocs = data.storage.length;
    if(maxDocs < 11) {
        currPageNo = 1;
        for(let i = 0; i < maxDocs; i++) {
            onDisplay.push(data.storage[i]);
        }
    }
    console.log("onDisplay array set");
}

function displayOptions() {
    let display = ""
    for(let x = 0; x < onDisplay.length; x++) {
        display += createProjectListing(onDisplay[x]);
    }

    document.getElementById("project-listing").innerHTML = display;
}

function createProjectListing(data) {
    let template = `<li><a href="../Template/template.html?docNo=${data.docNo}"><div class="item">
                        <h2>${data.title}</h2>
                        <table class="tag-wrapper">
                            <tr>
                                <td>Tags:</td>
                                <td>
                                    <ul class="tag">
                                        ${addTags(data.tags)}
                                    </ul>
                                </td>
                            </tr>
                        </table>
                        <p>${data.short_desc}</p>
                    </div></a></li>`;

    return template;
}

function addTags(tags) {
    let tagstemp = ""
    for(let k = 0; k < tags.length; k++) {
        tagstemp += createTag(tags[k]);
    }
    return tagstemp;
}

function createTag(tagName) {
    let template = `<li class="${tagName}"><img src="../Images/${tagName}.png">${tagName.toUpperCase()}</li>`
    return template;
}