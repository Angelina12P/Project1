// Start the met image random
// onLoad check local storage for user preference object, then if object exists, use that, if not use default. 
// light/dark mode checkbox. function writes change to local storage user setting = dark.light 

// function that runs when page loads "init" - checks settings then calls function to startapp ()metCulture || metCountry || metArtistName || metDate || metTitle

let metOutputResult = document.getElementById("metOutput");
let searchButton = document.getElementById("searchButton");
var metTitle = ""
var metCulture = ""
var metCountry = ""
var metDate = ""
var metArtistName = ""
var objectURL = ""

function randomImage(){
  fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
  .then(response => response.json())
  .then(data => {
    let art = data.objectIDs;  
    let randomArt = art[Math.floor(Math.random() * art.length)];
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArt}`)
      .then(response => response.json())
      .then(artData => {
        console.log(artData)

          let objectURL = artData.objectURL ;
          let metImage = artData.primaryImage;
          metTitle = artData.title ;
          metCulture = artData.culture ;
          metArtistName = artData.artistDisplayName;
          console.log(metArtistName)
          metDate = artData.objectDate ;
          metCountry = artData.country;
          objectURL = artData.objectURL;          ;

           renderMetOutput(metImage, metArtistName, metCulture, metDate, metCountry, metTitle,objectURL)
          })})}

randomImage()

function renderMetOutput( metImage = `https://suitabletech.com/images/HelpCenter/errors/Lenovo-Camera-Error.JPG`, metArtistName, metCulture, metDate , metCountry , metTitle, objectURL ){
  metOutputResult.innerHTML =
  `<div class="metOutputDiv" >
  <img src="${metImage}" class="rounded mx-auto d-block" onerror="this.onerror=null;this.src='./assets/images/image_not_available.jpg';"/> 
  <h2> Title - ${metTitle || "unknown title"}</h2> 
  <p> Artist Name - ${metArtistName || "unknown artist"}</p> 
  <p>Culture - ${metCulture || "unknown culture"} </p>
  <p>Date - ${metDate || "unknown date"} </p>
  <p>Country - ${metCountry || " unknown country "}</p>
  <p><a href="${objectURL}"> More info </a> <p>
  </div>`
}




let button = document.getElementById('searchButton')
button.addEventListener('click', function(){
let  queryTerm = metCulture || metCountry || metArtistName || metDate || metTitle;
  // let metTitle = document.querySelector('#metOutputResult h2');
console.log(metTitle)
console.log(queryTerm)

  fetch (`https://openlibrary.org/search.json?q=${queryTerm}`)
  .then (response => response.json())
  .then (bookData => {
  console.log(bookData)
  let isThereData = bookData.docs[0];
  if (!isThereData){
    bookOutput.innerHTML = "Hmm, no book data for this one, please try again" 
  }
  let bookTitle = "None Found"
  if (bookData.docs[0]?.title ){
    bookTitle = bookData.docs[0].title
  }
  console.log(bookTitle)
  let bookAuthor = bookData.docs[0]?.author_name 
  let bookID = bookData.docs[0]?.isbn?.[1] || "None Found"
  // console.log(bookID)

  let bookImage = `https://suitabletech.com/images/HelpCenter/errors/Lenovo-Camera-Error.JPG`;
  if (bookID !== "None Found"){
    bookImage = `https://covers.openlibrary.org/b/olid/${bookID}-M.jpg?default=false`
  }

  
  
  
  bookOutput.innerHTML = 
`<div class="bookOutputDiv">
<h2> Title - ${bookTitle}</h2> 
<p> Author - ${bookAuthor}</p>
<img src="${bookImage}" class="rounded mx-auto d-block" onerror="this.onerror=null;this.src='https://suitabletech.com/images/HelpCenter/errors/Lenovo-Camera-Error.JPG';"
</div>`;
console.log(bookImage)
})


})

//For light and dark mode and storing the preference in local storage

const modeBtn = document.getElementById('mode');
modeBtn.onchange = (e) => {
  if (modeBtn.checked === true) {
    document.documentElement.classList.remove("light")
    document.documentElement.classList.add("dark")
    window.localStorage.setItem('mode', 'dark');
  } else {
    document.documentElement.classList.remove("dark")
    document.documentElement.classList.add("light")
    window.localStorage.setItem('mode', 'light');
  }
}

const mode = window.localStorage.getItem('mode');
if (mode == 'dark') {
  modeBtn.checked = true;
  document.documentElement.classList.remove("light")
  document.documentElement.classList.add("dark")
}

if (mode == 'light') {
  modeBtn.checked = false;
  document.documentElement.classList.remove("dark")
  document.documentElement.classList.add("light")
}


// Then use these, and pick what we want to show from these 

// objectID ---> int Identifying number for each artwork (unique, can be used as key field)

// objectData.objectEndDate; ---> whe it was made
// Highlight         --->boolean When "true" indicates a popular and important artwork in the collection
// isPublicDomain    --->boolean When "true" indicates an artwork in the Public Domain
// department string --->Indicates The Met's curatorial department responsible for the artwork eg 'egyptian artwork'
// objectName string --->Describes the physical type of the object
// period            --->string  Time or time period when an object was created  "Ming dynasty (1368-1644)", "Middle Bronze Age"
// portfolio         --->string  A set of works created as a group or published as a series. "Birds of America", "The Hudson River Portfolio", "Speculum Romanae Magnificentiae"
// artistBeginDate   --->string  Year the artist was born  "1840"
// artistEndDate     --->string  Year the artist died  "1926"
// medium            --->string  Refers to the materials that were used to create the artwork  "Oil on canvas", "Watercolor", "Gold"
// city              --->string  City where the artwork was created  "New York", "Paris", "Tokyo"
// tags              --->array An array of subject keyword tags associated with the object and their respective AAT URL  [{"term": "Abstraction","AAT_URL": "http://vocab.getty.edu/page/aat/300056508","Wikidata_URL": "https://www.wikidata.org/wiki/Q162150"}]
// objectWikidata_URL --->string  Wikidata URL for the object "https://www.wikidata.org/wiki/Q432253"
// artistWikidata_URL --->string  Wikidata URL for the artist "https://www.wikidata.org/wiki/Q694774"



// Then add to the container bit 
// <plus other bits we want>

// Then call it 

// Then button event listener to go to next api 

// Then give it something we pick from above onClick/enter button? Which then gives book/(s?)

// Then attach the result to the book bit 

// Need book params we want 