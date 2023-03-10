import { Box, Container, Input, List } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductsByPage } from '../../app/products/productActions';
import { setSelectedProduct } from '../../app/stores/storeSlice';
import ProductCard from './ProductCard';

const ProductSearch = ({onCloseProduct}) => {
    const [query, setQuery] = useState('')
    const [productsList, setProductsList] = useState([])
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setQuery(e.target.value)
        dispatch(
          fetchProductsByPage({ page: 1, query: e.target.value }),
        ).then((res) => setProductsList(res.payload.products))
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
                    {productsList
                        ? productsList.map((product, key) => (
                            <div
                            className="w-full"
                            key={key}
                            onClick={() => {
                                dispatch(setSelectedProduct(product))
                                onCloseProduct()
                            }}
                            >
                            <ProductCard props={product} />
                            </div>
                        ))
                        : null}
                    </Container>
                </List>
                ) : null}
            </Box>
    );
};

export default ProductSearch;