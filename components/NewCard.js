import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native';
import {connect} from 'react-redux'
import {addCard} from '../api'
import {createCardAction} from '../actions'

class NewCard extends React.Component {

    state = {
        question: '',
        answer: ''
    }

    saveCard = () => {

        // Pulls the information from the text input
        const {question, answer} = this.state
        const {deck} = this.props.navigation.state.params

        let newCard = {
            question: question,
            answer: answer
        }

        deck.questions.push(newCard)

        let stringValue = JSON.stringify({[deck.title]: deck})

        // Sends data to storage
        addCard(stringValue)

        // Sends data to store
        this.props.dispatch(
            createCardAction(newCard,deck.title)
        )

        // Cleans output
        this.setState({question: '', answer: '' })

        this.props.navigation.goBack()
    }

    render(){
        
        return(
            <KeyboardAvoidingView 
                behavior="padding"
                style={styles.container}
            > 
                <TextInput 
                    placeholder='Question...'
                    onChangeText={(text) => this.setState({question:text})} 
                    style={styles.textInput} 
                    value={this.state.question}
                />
                <TextInput 
                    placeholder='Answer...'
                    onChangeText={(text) => this.setState({answer:text})} 
                    style={styles.textInput} 
                    value={this.state.answer}
                />
                <TouchableOpacity
                    onPress={this.saveCard}
                    style={styles.button}
                >
                    <Text style={{color: 'white'}}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>  
          
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    textInput: {
        fontSize: 15,
        marginBottom: 14,
        borderRadius: 7,
        marginLeft: 30,
        marginRight: 30,
    },
    subtext:{
        fontSize: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        paddingTop: 15,
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,
        backgroundColor: 'black',
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
})


export default connect(null,null)(NewCard)

