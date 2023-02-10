let metOutputResult = document.getElementById("metOutput");
let searchButton = document.getElementById("searchButton");
var metTitle = ""
var metCulture = ""
var metCountry = ""
var metDate = ""
var metArtistName = ""
var objectURL = ""

//Function to get response from metmuseum api 
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

//Function to display the response from the metmuseum api
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

//Button listener to fetch book details from openlibrary api based on the information from metmuseum api
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
  let bookTitle = "Book not found"
  if (bookData.docs[0]?.title ){
    bookTitle = bookData.docs[0].title
  }
  console.log(bookTitle)
  let bookAuthor = bookData.docs[0]?.author_name || "Unavailable"
  let bookID = bookData.docs[0]?.isbn?.[1] || "None Found"
  // console.log(bookID)

  let bookImage = `./assets/images/no-book-cover-available.jpg`;
  if (bookID !== "None Found"){
    bookImage = `https://covers.openlibrary.org/b/olid/${bookID}-M.jpg?default=false`
  }
  
  bookOutput.innerHTML = 
    `<div class="bookOutputDiv">
    <h2> Title - ${bookTitle}</h2> 
    <p> Author - ${bookAuthor}</p>
    <img src="${bookImage}" class="rounded mx-auto d-block" onerror="this.onerror=null;this.src='./assets/images/no-book-cover-available.jpg';"
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

//To reload the page when reset button is clicked

let refreshBut = document.getElementById("refresh");
refreshBut.addEventListener('click',function(){
  window.location.reload();
})