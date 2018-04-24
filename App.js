import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import Quiz from './components/Quiz'
import QuizResults from './components/QuizResults'
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'
import {setLocalNotification} from './Notification'

export default class App extends React.Component {

  componentDidMount()
  {
    setLocalNotification()
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Provider store={createStore(reducer)}>
        <MainNavigator />
      </Provider>
    );
  }
}

const Tabs = TabNavigator({
  Decks: {
    screen: Decks
  },
  "New Deck": {
    screen: NewDeck
  }
},
{
  navigationOptions: {
    header: null
  }
}
)

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail:{
    screen: DeckDetail,
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      title: 'Add Card',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
    },
  },
  QuizResults: {
    screen: QuizResults,
    navigationOptions: {
      title: 'Quiz Results',
      headerLeft: null
    }
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
