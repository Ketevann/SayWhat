import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { fetchText, buttonClick, buttonUnClick, pushScore, pushMagnitude } from './reducers'
import Output from './Output'
import SpeechRecognition from 'react-speech-recognition'
import store from './store'
import Dict from './Dict'

console.log(fetchText)
class Input extends React.Component {
    constructor(props) {
        super(props)
        this.submitHandler = this.submitHandler.bind(this)
        this.clickHandler = this.clickHandler.bind(this)

    }
    submitHandler(event) {
        event.preventDefault()
        console.log("event", event.target.text.value, event.target)
        const text = {
            content: event.target.text.value
        }
        this.props.fetchText(text)
    }
    clickHandler() {
        store.dispatch(this.props.buttonClick())
    }

    render() {               
        return (
            <div className="container">
                <img src={"http://i.imgur.com/9ySNjab.png"} />
                <h3 class="display-4">Text Input</h3>
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <textarea color= "#FFF" name="text" rows="5" className="form-control" placeholder="Say This" />
                        <button style={{ "margin": "10px" }} id="sentimentBtn" className="btn btn-primary" type="Submit">Submit</button>
                    </div>
                </form>
                <h3 class="display-4">Audio Input</h3>
                <button style={{ "margin": "10px" }} className="btn btn-success" type="submit" onClick={() => this.clickHandler()}>Start Recoring</button>

                {this.props.showComponent === true ?
                    <Dict />
                    : null}
                <Output mag={this.props.text.sentiment.magnitude} score={this.props.text.sentiment.score} entities={this.props.text.entities} />
                {console.log("input PROPZ", this.props.text.entities)}
            </div>
        )
    }
}

const mapDispatchToProps = { fetchText, buttonClick, buttonUnClick, pushScore, pushMagnitude }
const mapStateToProps = ({text, showComponent}) => ({ text, showComponent })

export default connect(mapStateToProps, mapDispatchToProps)(Input)
