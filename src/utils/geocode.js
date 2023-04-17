const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia2hvdHNvcyIsImEiOiJjbGdkd2FwcXEwOGNxM2xwbGxmc2V5MmV4In0.jxuUN9B9rpJkI1EYvrCIqQ&limit=1'

    request({ url, json: true }, (error, response) => {

        if (error) {
            callback('Cannot connect to the Geocode Service', undefined)
        } else if (response.body.features.length === 0) {
            callback('CANNOT FIND LOCATION!', undefined)
        } else {

            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const nearestPlace = response.body.features[0].place_name

            callback(undefined, {
                latitude,
                longitude,
                nearestPlace
            })
        }
    })
}

module.exports = geocode