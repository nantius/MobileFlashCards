import {CREATE_DECK, RECEIVE_DECKS, CREATE_CARD} from '../actions'

function deck (state= {}, action)
{
    switch(action.type){
        case CREATE_DECK:
            return {
                ...state,
                ...action.deck
            }
        case CREATE_CARD:
            return{
                ...state,
                [action.deckKey]: {
                    ...state[action.deckKey],
                    questions: [
                        ...state[action.deckKey].questions,
                        ...action.card
                    ]
                }
            }
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        default:
            return state
    }
}

export default deck