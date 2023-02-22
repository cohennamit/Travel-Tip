export const locService = {
    getLocs,
    getPlaceLoc,
    addLocation
}


const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function getPlaceLoc(place) {
    console.log('place from getPlaceLoc', place)
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=AIzaSyC45Z2iI9Bf5QITHqbU7podhUah5rk5EEA`)
        .then(res => res.data.results[0].geometry.location)
}

function addLocation(location) {
    locs.push(location)
}

