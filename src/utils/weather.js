const request = require('request')

const weather = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4dc42f9a2967202ee14c10d25dd4cffe&query=' + encodeURIComponent(longitude) + ' ' + encodeURIComponent(latitude) + ''

    request({ url, json: true }, (error, response) => {

        const { weather_descriptions: outlook, temperature, precip: precipitation, feelslike, error: responseError } = response.body.current

        if (error) {
            callback('Cannot connect to the WEATHER SERVICES', undefined)
        } else if (responseError) {
            callback('CANNOT CONNECT TO THE SERVER', undefined)
        } else {

            callback(undefined, {
                outlook,
                temperature,
                precipitation,
                feelslike
            })
        }
    })
}

module.exports = weather