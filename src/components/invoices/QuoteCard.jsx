import { ListItem } from '@chakra-ui/react'
import React from 'react'

const QuoteCard = ({ props }) => {
  return (
    <div className="hover:bg-black/5 cursor-pointer w-full rounded-md p-4 m-1">
      <ListItem className="text-[15px] truncate w-full">
        {props.customer.firstname + ' ' + props.customer.lastname} -{' '}
        <span className="text-[14px]">{props.customer.email}</span>
      </ListItem>
      <ListItem className="text-[15px] truncate w-full">
        {props.customer.tel
          ? props.customer.tel
          : '-' - props.customer.address
          ? props.customer.address
          : '-'}
      </ListItem>
      <ListItem className="text-[15px] truncate w-full">
        {props.total.toFixed(2)} €
      </ListItem>
    </div>
  )
}

export default QuoteCard
