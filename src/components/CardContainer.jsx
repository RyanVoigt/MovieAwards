 /* eslint-disable */ 
import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';
import update from 'immutability-helper';
import { ItemTypes } from '../ItemType';
import App from '../App';

const style = {
    width: '100%',
};
var ITEMS = [
    {
        id: 1,
        text: 'https://m.media-amazon.com/images/M/MV5BMTQ1MjQwMTE5OF5BMl5BanBnXkFtZTgwNjk3MTcyMDE@._V1_SX300.jpg'
    },
    {
        id: 2,
        text: 'Make it generic enough',
    },
    {
        id: 3,
        text: 'Write README',
    },
    {
        id: 4,
        text: 'Create some examples',
    },
    {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it',
    },
    {
        id: 6,
        text: '???',
    },
    {
        id: 7,
        text: 'PROFIT',
    },
];
export const Container = ({movieList, handleCardUpdate, UpdateIndex}) => {
    
    const [cards, setCards] = useState(movieList);
    // Logic for moving card 
    const moveCard = (id, atIndex) => {
        const { card, index } = findCard(id);
        UpdateIndex(id, index);
        setCards(update(cards, {
            $splice: [
                [index, 1],
                [atIndex, 0, card],
            ],
        }));
    };    
    //Logic for removing cards from the list
    const removeCard = (id, atIndex)=>{
        //logic to remove
        const { card, index } = findCard(id);
        card.text = '';
        console.log("works");
        handleCardUpdate(id);
        UpdateIndex(id, index);
    }
//Logic to find cards index in the list
    const findCard = (id) => {
        const card = cards.filter((c) => `${c.id}` === id)[0];
        return {
            card,
            index: cards.indexOf(card),
        };
    };
    const [, drop] = useDrop({ accept: ItemTypes.CARD });
    return (<>
			<div key={movieList} ref={drop} style={style}>
				{cards.map((card) => (<Card key={card.id} id={`${card.id}`} text={movieList[card.id - 1].text} moveCard={moveCard} removeCard={removeCard} findCard={findCard} movieList={movieList} UpdateIndex = {UpdateIndex}/>))}
			</div>
		</>);
};
