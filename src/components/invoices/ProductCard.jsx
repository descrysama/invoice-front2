import { ListItem } from '@chakra-ui/react';
import React from 'react';

const ProductCard = ({props}) => {
    return (
        <div className="hover:bg-black/5 cursor-pointer w-full rounded-md p-4 m-1">
        <ListItem className="text-[15px] truncate w-full">{props.libelle}</ListItem>
        <ListItem className="text-[15px] truncate w-full">{props.price.toFixed(2)}€</ListItem>
      </div>
    );
};

export default ProductCard;

