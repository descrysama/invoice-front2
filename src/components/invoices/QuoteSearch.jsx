import { Box, Container, Input, List, ListItem, Tag } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuotesByPage } from '../../app/quotes/quoteActions';
import { setSelectedQuote, setSelectedUser } from '../../app/stores/storeSlice';
import ProductCard from './ProductCard';

const QuoteSearch = ({onCloseQuote}) => {
    const [query, setQuery] = useState('')
    const [quoteList, setQuoteList] = useState([])
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setQuery(e.target.value)
        dispatch(
          fetchQuotesByPage({ page: 1, query: e.target.value }),
        ).then((res) => setQuoteList(res.payload.quotes))
      }

    return (
            <Box>
                <Input
                className='bg-white'
                type="text"
                value={query}
                onChange={(e) => handleChange(e)}
                placeholder="Recherche"
                />
                {query !== '' ? (
                <List>
                    <Container className="bg-white absolute flex w-[60%] items-center flex-col z-10 border-[1px] rounded-md max-h-[300px] overflow-x-hidden overflow-y-auto">
                    {quoteList
                        ? quoteList.map((quote, key) => (
                                quote.status ? null :
                                <div 
                                className="hover:bg-black/5 cursor-pointer w-full rounded-md p-4 m-1"
                                key={key}
                                onClick={() => {
                                    dispatch(setSelectedQuote(quote._id))
                                    dispatch(setSelectedUser(quote.customer._id))
                                    onCloseQuote()
                                }}
                                >
                                    <ListItem className="text-[14px] truncate w-full">{quote.customer.email ? quote.customer.email : quote.customer.tel}</ListItem>
                                    <ListItem className="text-[14px] truncate w-full">{quote.customer.firstname} {quote.customer.lastname}</ListItem>
                                    <ListItem className="text-[14px] truncate w-full">{new Date(quote.createdAt).toLocaleDateString("fr")}</ListItem>
                                    <ListItem className="text-[15px] truncate w-full">{quote.total.toFixed(2)}€</ListItem>
                                    <ListItem className="text-[15px] truncate w-full"><Tag colorScheme={quote.status ? "green" : "yellow"}>{quote.status ? 'Payé' : 'Impayé'}</Tag></ListItem>
                                </div>
                        ))
                        : null}
                    </Container>
                </List>
                ) : null}
            </Box>
    );
};

export default QuoteSearch;