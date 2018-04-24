import {AsyncStorage} from 'react-native'
export const DECK_STORAGE_KEY = 'Flashcards:decks'

export function createDeck(value)
{
    try{
        return AsyncStorage.mergeItem(DECK_STORAGE_KEY, value)
    }
    catch(e)
    {
        console.log(e)
    }
}

export function fetchDecks()
{
    try{
        return AsyncStorage.getItem(DECK_STORAGE_KEY).then(
            decks =>  (JSON.parse(decks))
        )
    }
    catch(e){
        console.log(e)
    }
}

export function addCard(value)
{
    try {
        return AsyncStorage.mergeItem(DECK_STORAGE_KEY, value)
    }
    catch(e)
    {
        console.log(e)
    }

}
