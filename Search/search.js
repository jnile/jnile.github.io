let onDisplay = [] /* Stores the displayed info */
let buffer; /* Will store sorted array of information to display*/
let data; /* Data loaded into website */
let currPageNo = 1; /* Page number of stuff loaded */
let tagInfo = {allTags:[], tagsCount:[], totalTags: 0} /* Stores data about tags */

async function loadData() {
    await getData();

    setOnDisplay();

    displayOptions();

    generateStats();

    displayStats();

    displayFilter();
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
    data = json;

    buffer = data.storage;
    console.log("Data fetched");
    });
}

/**
 * Populates the onDisplay array for data listings to be seen
 */
function setOnDisplay() {
    console.log("onDisplay array called.");

    onDisplay = [];
    let filteredBuffer = filterBuffer();
    let maxDocs = filteredBuffer.length;
    if(maxDocs < 11) {
        currPageNo = 1;
        for(let i = 0; i < maxDocs; i++) {
            onDisplay.push(filteredBuffer[i]);
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
 * Display filter settings
 */
function displayFilter() {
    document.getElementById("filter-tags").innerHTML = createFilterTags();
}

/**
 *  Buffer Array is filtered from the Filter Section
 * 
 * @returns Filtered array from the filter section
 */
function filterBuffer() {
    let cbs = document.getElementsByClassName("filter-tag-cb");
    let tagsToFilterOut = [];
    let filteredArray = [];

    /* Get filter tags */
    for(let x = 0; x < cbs.length; x++) {
        if(cbs[x].checked) {
            tagsToFilterOut.push(cbs[x].value);
        }
    }

    /* Filter out the options */
    for(let x = 0; x < buffer.length; x++) {
        let tagsInList = buffer[x].tags;
        if (tagsToFilterOut.some(item => tagsInList.includes(item)) == false) {
            filteredArray.push(buffer[x]);
        }
    }

    return filteredArray;
}

/**
 * Update Display with new values
 */
function updateDisplay () {
    setOnDisplay();
    displayOptions();
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

/**
 * Create li elements for tags filter
 */
function createFilterTags() {
    let temp = "";

    for(let x = 0; x < tagInfo.allTags.length; x++) {
        temp += createFilterTagListing(tagInfo.allTags[x]);
    }

    return temp;
}

/**
 * Create a li element for a specific tag
 * 
 * @param tag name of the tag
 */
function createFilterTagListing(tag) {
    let temp = `<li>
                    <input type="checkbox" value="${tag}" class="filter-tag-cb">
                    <label>${capitaliseFirstLetter(tag)}</label>
                </li>`;
    return temp;
}