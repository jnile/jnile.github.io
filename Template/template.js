var docNo;

/* ASYNC Function to fetch data of document
*/
async function loadingData() {
  let url = new URL(document.location.href);
  let params = new URLSearchParams(url.search);
  
  docNo = params.get("docNo");

  fetch(url.origin + `/archivetest/Archives/Documents/${docNo}/info.json`)
  .then(res => res.json())
  .then(json => {
    //json vaiable contains object with data
    console.log(json);
    displayInfo(json);
  });
}

/* Function to display document information onto screen
*/
function displayInfo(data) {
  document.getElementById("info-title").innerHTML = data.title;
  document.getElementById("info-date-created").innerHTML = data.date_started;
  document.getElementById("info-date-updated").innerHTML = data.date_updated;
  document.getElementById("info-short-desc").innerHTML = data.short_desc;
  document.getElementById("info-long-desc").innerHTML = data.long_desc;
  createTags(data.tags);
  addImages(data.images);
}
/**
 * Create a Tag for each languaage that is added
 */

function createTags(tags) {
  let listOfTags = "";

  for(let i = 0; i < tags.length; i++) {
    let currTag = tags[i];
    listOfTags += `<li class="${currTag}"><img src="../Images/${currTag}.png"><p class="li-tag-name">${currTag.toUpperCase()}</p></li>`
  }

  document.getElementById("info-tags").innerHTML = listOfTags;
}

function addImages(imageArr) {
  
  let listOfImages = "";

  for(let i = 0; i < imageArr.length; i++) {
    let nameOfFile = imageArr[i];

    listOfImages += `<li class="info-image"><img src="../Archives/Documents/${docNo}/${nameOfFile}" onclick="openImage(this);"></li>`;
  }

  document.getElementById("info-image-list").innerHTML = listOfImages;
}

function openImage(img) {
  window.open(img.src);
}