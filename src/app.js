const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve static pages
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP',
        fName: 'Khotsos'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        fName: 'Didiza'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is a sample HELP message!',
        title: 'Help',
        fName: 'Tokalas'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'Please provide search terms'
        })
    }

    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please provide address'
        })
    }

    const loktion = req.query.address

    geocode(loktion, (error, { latitude, longitude, nearestPlace } = {}) => {

        if (error) {
            res.send({
                error
            })
        } else {

            weather(longitude, latitude, (error, { temperature, precipitation, feelslike, outlook } = {}) => {
                if (error) {
                    res.send({
                        error
                    })
                } else {
                    res.send({
                        Location: nearestPlace,
                        outlook,
                        temperature,
                        precipitation,
                        feelslike,
                        latitude,
                        longitude
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'PAGE NOT FOUND',
        emsg: 'Sorry, HELP ARTICLE Page Not Found!',
        fName: 'Toka Le Lintle'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'PAGE NOT FOUND',
        emsg: 'Sorry, Page Not Found!',
        fName: 'Khotsos'
    })
})


app.listen(port, () => {
    console.log('Server Started on port: ' + port)
})