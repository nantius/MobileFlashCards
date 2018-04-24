import React from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'

export default class Quiz extends React.Component {

    state = {
        cardIndex: 0,
        correctAnswers: 0,
        showAnswer: false,
    }

    toggleAnswer = () => {
        this.setState({showAnswer: !this.state.showAnswer})
    }

    selectAnswer = async (answer) => {

        const {deck} = this.props.navigation.state.params
        let {cardIndex} = this.state

        // Verifying if user answered correctly or not
        answer === 1 && await this.setState({correctAnswers: this.state.correctAnswers+1})
        
        let correctAnswers = this.state.correctAnswers

        deck.questions[cardIndex+1] != undefined 
        ? this.setState({cardIndex: cardIndex+1})
        : this.props.navigation.navigate('QuizResults', {deck, correctAnswers, cardIndex})   
    }

    render(){

        const {deck} = this.props.navigation.state.params
        const {showAnswer, cardIndex} = this.state

        return(
                <View style={styles.container}>
                    <Text style={styles.subtext}>{cardIndex+1}/{deck.questions.length}</Text>

                    <View style={styles.textContainer}>
                        {
                            showAnswer 
                            ? <Text style={styles.text}>{deck.questions[cardIndex].answer}</Text>
                            : <Text style={styles.text}>{deck.questions[cardIndex].question}</Text>
                        }
                        <TouchableOpacity
                            onPress={() => this.toggleAnswer()}
                        >
                            <Text style={{fontSize: 20, color: 'red'}}>
                                {
                                    showAnswer
                                    ? 'Show Question'
                                    : 'Show Answer'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                   
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={() => this.selectAnswer(1)} 
                            style={[styles.button, {backgroundColor: 'green', marginBottom: 10}]}
                        >
                            <Text style={{color: 'white'}}>Correct</Text></TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.selectAnswer(0)} 
                            style={[styles.button, {backgroundColor: 'red'}]}
                        >
                            <Text style={{color: 'white'}}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text: {
        fontSize: 45,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    subtext:{
        fontSize: 25,
        marginLeft: 15,
        marginTop: 15,
    },
    button: {
        paddingTop: 15,
        paddingLeft: 50,
        paddingRight: 50,
        paddingBottom: 15,
        alignSelf: 'center',
        borderRadius: 5,
        marginBottom: 5,
    },
    buttonContainer: {
        justifyContent: 'flex-end', 
        flex: 1,
        marginBottom: 20
    }
})