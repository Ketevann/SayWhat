
import React, { PropTypes, Component } from 'react'
import SpeechRecognition from 'react-speech-recognition'
import { fetchText, buttonClick } from './reducers'
import { connect } from 'react-redux'



const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}

class Dictaphone extends Component {
    constructor(props) {
        super(props)
        this.clickHandler = this.clickHandler.bind(this)

    }
    clickHandler(sentence) {
        console.log(sentence)
        const text = {
            content: sentence.transcript   //transcribed text is an object - sentence.transcript is a string
        }
        this.props.fetchText(text)
    }
    render() {
        const { transcript, resetTranscript, browserSupportsSpeechRecognition } = this.props

        if (!browserSupportsSpeechRecognition) {
            return null
        }
        return (
            <div className="container">
                {transcript}  {/* this transcript is the transcrapied speech rendered on the page. Below is a Stop button. When clicked it classs the clickHandler which sends the text to fetchTExt and then to google and then we get the scores*/}
                <br /> <br />
                <button style={{ "margin-right": "5px" }} className="btn btn-default" onClick={resetTranscript}>Reset</button>
                <button className="btn btn-default" onClick={() => this.clickHandler({ transcript })}>Stop</button>
            </div>
        )
    }
}

Dictaphone.propTypes = propTypes


const mapDispatchToProps = { fetchText }
const mapStateToProps = ({text}) => ({ text })

export default connect(mapStateToProps, mapDispatchToProps)(SpeechRecognition(Dictaphone))
