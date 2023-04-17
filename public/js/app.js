console.log('Client Side Javascript is LOADING...')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()

    const seachLocation = searchElement.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    if (seachLocation) {

        fetch('http://localhost:3000/weather?address=' + seachLocation).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                    messageTwo.textContent = ''
                } else {
                    messageOne.textContent = data.Location
                    messageTwo.textContent = data.outlook + ' | ' + data.temperature + ' Degrees Celcius'
                }
            })
        })
    }

})


