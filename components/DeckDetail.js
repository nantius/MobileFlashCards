import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native';
import {connect} from 'react-redux'
import {clearLocalNotification, setLocalNotification} from '../Notification'

class DeckDetail extends React.Component {

    static navigationOptions = ({navigation}) => {
        const {params} = navigation.state;

        return{
            title: params ? params.deckKey : 'Deck Detail'
        }
    };

    render(){

        const {deck} = this.props
        
        return(
            <View style={styles.container}>
                <View style={{marginTop: 45}}>
                    <Text style={styles.text}>{deck.title}</Text>
                    <Text style={styles.subtext}>{deck.questions.length} cards</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.button} 
                        onPress={() => this.props.navigation.navigate('NewCard', {deck})}
                    >
                        <Text style={{color: 'white'}}>Create New Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => (
                            deck.questions.length > 0 
                            ? clearLocalNotification()
                                .then(setLocalNotification)
                                    .then(() => this.props.navigation.navigate('Quiz', {deck}))         
                            : ToastAndroid.show('You have no cards for this deck', ToastAndroid.SHORT)
                            )
                        }
                    >
                        <Text style={{color: 'white'}}>Start Quiz</Text>
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
    subtext:{
        fontSize: 25,
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
        marginBottom: 5,
    },
    buttonContainer: {
        justifyContent: 'flex-end',
        flex: 1,
        marginBottom: 45
    }

})

function mapStateToProps(state, ownProps)
{
    return {
        deck: state[ownProps.navigation.state.params.deckKey]
    }
}

export default connect(mapStateToProps,null)(DeckDetail)

