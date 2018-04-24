import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class QuizResults extends React.Component {

    render(){

        const {deck, correctAnswers, cardIndex} = this.props.navigation.state.params
        let deckKey = deck.title
        return( 
            <View style={styles.container}>
                <Text style={styles.text}>
                    You scored {correctAnswers}/{cardIndex+1}
                </Text>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => this.props.navigation.navigate('Quiz', {deck})}
                >
                    <Text style={{color: 'white'}}>Restart Quiz</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('DeckDetail', {deckKey})}
                    style={styles.button}
                >
                    <Text style={{color: 'white'}}>Back to Deck</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}
                    style={styles.button}
                >
                    <Text style={{color: 'white'}}>Back to Home</Text>
                </TouchableOpacity>
            </View>
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
        marginTop: 20,
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
        marginBottom: 10
    },
})

