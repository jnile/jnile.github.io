let onDisplay = [] /* Stores the displayed info */
let buffer; /* Will store sorted array of information to display*/
let data = {}; /* Data loaded into website */
let currPageNo = 1; /* Page number of stuff loaded */
let tagInfo = {allTags:[], tagsCount:[], totalTags: 0} /* Stores data about tags */

async function loadData() {
    await getData();

    setOnDisplay();

    displayOptions();

    generateStats();

    displayStats();
}

/**
 * Fetches data from storage
 */
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

/**
 * Populates the onDisplay array for data listings to be seen
 */
function setOnDisplay() {
    console.log("onDisplay array called.");
    let maxDocs = data.storage.length;
    if(maxDocs < 11) {
        currPageNo = 1;
        for(let i = 0; i < maxDocs; i++) {
            onDisplay.push(data.storage[i]);
        }
    }
    console.log("Display array set");
}

/**
 * Displays the onDisplay array listings
 */
function displayOptions() {
    console.log("display options started");
    let display = ""
    for(let x = 0; x < onDisplay.length; x++) {
        display += createProjectListing(onDisplay[x]);
    }

    document.getElementById("project-listing").innerHTML = display;
    console.log("Display options finished");
}

/**
 * Generates alls the html elements for all the tags
 * 
 * @param tags Array of all the tags to be shown in the listing
 * @returns Html code of all the tags for the listing
 */
function addTags(tags) {
    let tagstemp = ""
    for(let k = 0; k < tags.length; k++) {
        tagstemp += createTag(tags[k]);
    }
    return tagstemp;
}

/**
 * Populates the tagInfo object
 */
function generateStats() {
    console.log("generateStats begun");

    for(let x = 0; x < data.storage.length; x++) {
        for(let k = 0; k < data.storage[x].tags.length; k++) {
            if(tagInfo.allTags.includes(data.storage[x].tags[k]) == false){
                tagInfo.allTags.push(data.storage[x].tags[k]);
                tagInfo.tagsCount.push(1);
            }
            else {
                tagInfo.tagsCount[tagInfo.allTags.indexOf(data.storage[x].tags[k])]++;
            }
            tagInfo.totalTags++;
        }
    }

    console.log(tagInfo);
    console.log("generateStats finished");
}

/**
 * Displays the stats panel
 */
function displayStats() {
    let temp = "";

    for(let x = 0; x < tagInfo.allTags.length; x++) {
        temp += createStatsListing(tagInfo.allTags[x],tagInfo.tagsCount[x]);
    }

    document.getElementById("stats-listing").innerHTML = temp;
}







/**
 * Create HTML Functions
 */

/**
 * Creates a html li element of the tag
 * 
 * @param tagName name of the tag to be created
 * @returns the li element of the tag
 */
 function createTag(tagName) {
    let template = `<li class="${tagName}"><img src="../Images/${tagName}.png">${tagName.toUpperCase()}</li>`
    return template;
}

/**
 * Creates a html li element for a listing
 * 
 * @param data The data of the listing to be shown
 * @returns The li element of the listing
 */
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

/**
 * Create li element for stats
 */
function createStatsListing(lang,val) {
    let template = `<h4>${capitaliseFirstLetter(lang)}</h4>
    <div class="progress-bar">
        <div class="progress-fill" style="width:${(val/tagInfo.totalTags * 100)}%"></div>
    </div>`;
    return template;
}