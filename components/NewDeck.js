import React from 'react';
import { Text, View, TextInput,StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {createDeck} from '../api'
import {createDeckAction} from '../actions'
import {connect} from 'react-redux'

class NewDeck extends React.Component {

    state = {
        deckName: '',
    }

    saveDeck = () => {

        // Pulls the information from the text input
        const {deckName} = this.state

        //Parses data to desired format
        let stringValue = JSON.stringify( 
            {
                 [deckName]: {
                    title: deckName,
                    questions: []
                }
            } 
        )

        // Sends data to storage
        createDeck(stringValue)

        // Sends data to store
        this.props.dispatch(
            createDeckAction({
                [deckName]: { 
                    title: deckName,
                    questions: []
                } 
            })
        )

        // Cleans state
        this.setState({deckName: ''})

        // Goes to the newly created deck
        this.props.navigation.navigate('DeckDetail', {deckKey: deckName})
    }

    render(){
        return(
            <KeyboardAvoidingView 
                behavior="padding"
                style={styles.container}
            > 
                <Text style={styles.text}> What is the title of your new deck?</Text>
                <TextInput 
                    onChangeText={(text) => this.setState({deckName:text})} 
                    style={styles.textInput} 
                    value={this.state.deckName}
                />
                <TouchableOpacity
                       onPress={this.saveDeck}
                       style={styles.button}
                   >
                       <Text style={{color: 'white'}}>Create Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>                   
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontSize: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    textInput: {
        marginBottom: 14,
        borderRadius: 7,
        marginLeft: 30,
        marginRight: 30,
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

export default connect(null,null)(NewDeck);