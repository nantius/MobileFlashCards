import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import {connect} from 'react-redux';
import {fetchDecks} from '../api'
import {AsyncStorage} from 'react-native'
import {receiveDecksAction} from '../actions'

class Decks extends React.Component {

    componentDidMount = () => {
        // AsyncStorage.clear()
        fetchDecks().then(decks => this.props.dispatch(receiveDecksAction(decks)))
    }

    render(){

        let {decks} = this.props
        Object.values(decks).length > 0 
        ? decks = Object.values(decks)
        : decks = []
     
        return(
            <FlatList
                data={decks}
                keyExtractor={(item, id) => item.id}
                ItemSeparatorComponent={() =>  <View style={styles.horizontalLine}/>}
                ListEmptyComponent={() => <Text style={styles.text}>No Cards</Text>}
                renderItem={({item}) => 
                    <TouchableOpacity key={item.title} onPress={() => this.props.navigation.navigate('DeckDetail', {deckKey: item.title})}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text style={styles.subtext}>{item.questions.length} cards</Text> 
                     </TouchableOpacity>
                }
            />
        )
    }

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    text: {
        fontSize: 30,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    subtext:{
        fontSize: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    horizontalLine: { 
        borderBottomColor: 'black', 
        borderBottomWidth: 1
    }
})


function mapStateToProps(state)
{
    return {
        decks: state
    }
}


export default connect(mapStateToProps, null)(Decks)
