const notifier = require('node-notifier');
const axios = require('axios');
const path = require('path');

/**
 * This function is used for getting chuck jokes from their api.
 * @returns It returns the response from the api.
 */
const getJoke = async () => {
    const { data } = await axios.get('https://api.chucknorris.io/jokes/random')
    return data;
}

/**
 * This function is used to show notification on the device.
 * @param {String} value  It contains the the joke.
 */
const notify = async ({ value }) => {
    notifier.notify({
        title: 'New joke',
        message: value,
        icon: path.join(__dirname, 'chuck-joke-icon.png'),
        sound: true,
    })
}

/**
 * Root function everything starts from here. 
 * Here is an interval of five minutes. A new joke will appear on every five minutes. 
 */
const main = () => {
    getJoke()
        .then(res => notify(res))
        .catch(err => console.error(err.message))
    setInterval(() => {
        getJoke()
            .then(res => notify(res))
            .catch(err => console.error(err.message))
    }, 300000)
}
main();