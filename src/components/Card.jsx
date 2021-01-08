 /* eslint-disable */ 
import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from '../ItemType';

const style = {
    width: '60%',
    margin: '0px 0px 0px 25px'
};
const imageStyle = {
    width: '100%',
    height: '10%',
    cursor: 'move',
    opacity: '1',
};

export const Card = ({ id, text, moveCard, removeCard, findCard, movieList, UpdateIndex}) => {
    const originalIndex = findCard(id).index;
    const [{ isDragging }, drag] = useDrag({
        item: { type: ItemTypes.CARD, id, originalIndex },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        end: (dropResult, monitor) => {
            const { id: droppedId, originalIndex } = monitor.getItem();
            const didDrop = monitor.didDrop();
            if (!didDrop) {
                moveCard(droppedId, originalIndex);
            }
        },
    });
    const [, drop] = useDrop({
        accept: ItemTypes.CARD,
        canDrop: () => false,
        hover({ id: draggedId }) {
            if (draggedId !== id) {
                const { index: overIndex } = findCard(id);
                moveCard(draggedId, overIndex);
            }
        },
    });
    const opacity = isDragging ? 0 : 1;

    if(text === ''){
        return(
        <div ref={(node) => drag(drop(node))} style={{ ...style, opacity}}>
		</div>
        );
    }
    else{
        let index = findCard(id).index +1;
        UpdateIndex(id, index)
        //console.log("index:" + index.index +"id:" + id);
        return (
            <div ref={(node) => drag(drop(node))} style={{ ...style, opacity,}}>
                    <div id = "ranking">
                        {index}
                    </div>
                    <div id = "rankingMovie">
                        <div id="wrapper">
                            <div id="removebutton">
                                <div id= "remButton" data-role="button" onClick={()=>{removeCard(id)}}>-</div>
                            </div>
                            <img style={{ ...imageStyle}} src={text}/>  
                        </div>
                    </div>
            
            </div>);
    }
};
