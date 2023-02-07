// Start the met image random

// Html need an image container div for the met api stuff, a button, and a div where the book stuff goes 

function randomImage(){
  fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
  .then(response => response.json())
  .then(data => {
    let art = data.objectIDs;
    let randomArt = art[Math.floor(Math.random() * art.length)];
    fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomArt}`)
      .then(response => response.json())
      .then(artData => {

        // etcetcetc, see below:
  

    })})}
randomImage()

// Then use these, and pick what we want to show from these 

// objectID ---> int Identifying number for each artwork (unique, can be used as key field)

// objectData.primaryImage; ---> image
// objectData.objectEndDate; ---> whe it was made
// objectData.title         ---> title
// Highlight         --->boolean When "true" indicates a popular and important artwork in the collection
// isPublicDomain    --->boolean When "true" indicates an artwork in the Public Domain
// department string --->Indicates The Met's curatorial department responsible for the artwork eg 'egyptian artwork'
// objectName string --->Describes the physical type of the object
// culture           --->string  Information about the culture, or people from which an object was created "Afghan", "British", "North African"
// period            --->string  Time or time period when an object was created  "Ming dynasty (1368-1644)", "Middle Bronze Age"
// portfolio         --->string  A set of works created as a group or published as a series. "Birds of America", "The Hudson River Portfolio", "Speculum Romanae Magnificentiae"
// artistDisplayName ---> string  Artist name in the correct order for display  "Vincent van Gogh"
// artistBeginDate   --->string  Year the artist was born  "1840"
// artistEndDate     --->string  Year the artist died  "1926"
// objectDate        --->string  Year, a span of years, or a phrase that describes the specific or approximate date when an artwork was designed or created  "1865–67", "19th century", "ca. 1796"
// medium            --->string  Refers to the materials that were used to create the artwork  "Oil on canvas", "Watercolor", "Gold"
// city              --->string  City where the artwork was created  "New York", "Paris", "Tokyo"
// country           --->string  Country where the artwork was created or found  "China", "France", "India"
// tags              --->array An array of subject keyword tags associated with the object and their respective AAT URL  [{"term": "Abstraction","AAT_URL": "http://vocab.getty.edu/page/aat/300056508","Wikidata_URL": "https://www.wikidata.org/wiki/Q162150"}]
// objectWikidata_URL --->string  Wikidata URL for the object "https://www.wikidata.org/wiki/Q432253"
// artistWikidata_URL --->string  Wikidata URL for the artist "https://www.wikidata.org/wiki/Q694774"



// <plus other bits we want>

// Then call it 

// Then button event listener to go to next api 

// Then give it something we pick from above onClick/enter button? Which then gives book/(s?)

// Then attach the result to the book bit 

// Need book params we want 