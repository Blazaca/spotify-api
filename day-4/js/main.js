// Global variables that may be used by many functions
let playSong;
let song;
// Storing Spotify Creds

const clientID = '0a3f927e6a0d4eed9f638fa84929d63f'
const clientSecret = 'e51b3a9b9fd6467a9b91b1f73b37c33d'

//function to go and get our API token
const getToken = async () => {
    let result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`)
        },
        body: 'grant_type=client_credentials'
    });
    let data = await result.json()
    console.log(data.access_token)
    return data.access_token
};

const testApi = async() =>{
    // testing to see if I can query the API for a test song
    let token = await getToken()
    let track = '7 Rings'
    let result = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: {
            'Content-Type': 'applications/json',
            'Authorization': `Bearer ${token}`
        }
    });
    let response = await result.json();
    console.log(response)
};

const clickedEvent = async(img_index, item_index) =>{
    // testing to see if I can query the API for a test song
    let token = await getToken();
    let track = document.getElementsByTagName('img')[img_index].alt;
    let result = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`, {
        method: 'GET',
        headers: {
            'Content-Type': 'applications/json',
            'Authorization': `Bearer ${token}`
        }
    });
    let response = await result.json();
    console.log(response)
    let song = response.tracks.items[item_index].preview_url
    console.log(song)

    // Todo play this song functionality
    if(playSong){
        stopSnippet()
    }
    songSnippet(song)
};

/** 
 * @param id
 * @param event
 * 
 * id = image id from the image gallery {html}
 * event = Mouse event given by the action of the user
 * 
 * Function produces songs from the clickedEvent based on the index
 * of our image on the page
*/

const getSong = (id, event) =>{
    switch(id){
        case 'fig1': {
            event.stopPropagation()
            clickedEvent(0,3)
            break
        }
        case 'fig2': {
            event.stopPropagation()
            clickedEvent(1,0)
            break
        }
        case 'fig3': {
            event.stopPropagation()
            clickedEvent(2,3)
            break
        }
        case 'fig4': {
            event.stopPropagation()
            clickedEvent(3,1)
            break
        }        
        case 'fig5': {
            event.stopPropagation()
            clickedEvent(4,0)
            break
        }
        case 'fig6': {
            event.stopPropagation()
            clickedEvent(5,5)
            break
        }
    }
};

const songSnippet = (url) =>{
    playSong = new Audio(url);
    return playSong.play()
};

const stopSnippet = () => {
    return playSong.pause()
}