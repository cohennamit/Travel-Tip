import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/util.service.js'

export const controller = {
    onCopyUrl,
}

let gElInputSearch
let gElLocationSpan = document.querySelector('.location-span')
window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearch = onSearch

function onSearch(ev) {
    ev.preventDefault()
    gElInputSearch = document.querySelector('input[name=search]').value
    gElLocationSpan.innerText = gElInputSearch
    console.log(gElInputSearch);
    locService.getPlaceLoc(gElInputSearch).then(onPanTo)
    locService.getPlaceLoc(gElInputSearch).then(onAddMarker)
    locService.getPlaceLoc(gElInputSearch).then(onCreateLoc)

}

function onCreateLoc(loc) {
    let location = {
        name: gElInputSearch,
        lat: loc.lat,
        lng: loc.lng
    }
    locService.addLocation(location)
}

function onInit() {
    mapService.initMap()
        .then(() => {
            renderByQueryStringParams()
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker({ lat = 32.0749831, lng = 34.9120554 }) {
    console.log('Adding a marker')
    mapService.addMarker({ lat, lng })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            onPanTo(pos.coords.latitude, pos.coords.longitude)
            onAddMarker({ lat: pos.coords.latitude, lng: pos.coords.longitude })
            console.log('User position is:', pos.coords.latitude, pos.coords.longitude)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            gElLocationSpan.innerText = 'Your current location.'
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
    utilService.setQueryStringParams(lat, lng)
}

function renderByQueryStringParams() {
    // Retrieve data from the current query-params
    const queryStringParams = new URLSearchParams(window.location.search)

    const pos = {
        lat: +queryStringParams.get('lat') || 0,
        lng: +queryStringParams.get('lng') || 0,
    }

    // return if no pos on the queries
    if (!pos.lat && !pos.lng) return

    console.log('Hi')
    onPanTo(pos)
}

function onCopyUrl() {
    const url = window.location.href
    navigator.clipboard.writeText(url)
}