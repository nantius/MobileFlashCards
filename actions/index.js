export const CREATE_DECK = 'CREATE_DECK';
export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const CREATE_CARD = 'CREATE_CARD';

export function createDeckAction(deck)
{
    return {
        type: CREATE_DECK,
        deck
    }
}

export function receiveDecksAction(decks)
{
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function createCardAction(card, deckKey)
{
    return {
        type: CREATE_CARD,
        card,
        deckKey
    }
}