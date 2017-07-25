const express = require('express');
const path = require('path')
const app = express();
const bodyParser = require('body-parser');

// Imports the Google Cloud client library
const Language = require('@google-cloud/language');
// Your Google Cloud Platform project ID
const projectId = 'summer-flux-170815';
// Instantiates a client
const language = Language({
    projectId: projectId
});


//----------------------------------------------------------------------------------------------------
//body-parsing
app.use('/', bodyParser.json());
app.use('/', bodyParser.urlencoded({ extended: true }));

//serves up static files
app.use(express.static(path.join(__dirname, '../public')))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public'))
})

//-----------------------------natural language api POST----------------------------------------

app.post('/api/text', (req, res, next) => {
    // The text to analyze
    const text = req.body.content;
    // Detects the sentiment of the text
    return language.detectSentiment(text)
        .then((results) => {
            const document = language.document({ content: text });
            document.detectEntities(text)
                .then((result) => {
                    const entities = result[1].entities;
                    const sentiment = results[0]
                    res.send({ sentiment: sentiment, entities: entities })
                })
        })
        .catch((err) => {
            console.error('ERROR:', err);
        });
})


//----------------------------------------------------------------------------------------------------

app.listen(3000, () => console.log('Listening on port 3000'))

module.exports = app;
