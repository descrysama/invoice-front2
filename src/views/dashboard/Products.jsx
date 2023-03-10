import { useState, useEffect, useRef } from "react";
import { addProduct, fetchProductsByPage } from "../../app/products/productActions";
import { useDispatch, useSelector } from "react-redux";
import { Box, InputGroup, Select } from '@chakra-ui/react';
import { ToastContainer, toast } from 'react-toastify';
import { 
    InputRightElement, 
    Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    useDisclosure,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import {
    FiSearch,
    FiPlusSquare,
    FiTrash
} from "react-icons/fi";
import TableParser from "../../components/products/TableParser";
import { fetchCategories } from "../../app/categories/categoryActions";

const Products = () => {
    
    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const category = useSelector(state => state.category);
    const [filter, setFilter] = useState();
    const [query, setQuery] = useState("");
    const [payload, setPayload] = useState({
        price: "",
        libelle: "",
        category: ""
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    let [page, setPage] = useState(1);

    useEffect(() => {
      dispatch(fetchProductsByPage({page}))
      dispatch(fetchCategories());
    }, [])

    useEffect(() => {
      setPage(1)
      dispatch(fetchProductsByPage({page: 1, filter: filter ? filter : null, query: query ? query : null}))
    }, [filter])

    const paginationChange = (page) => {
      dispatch(fetchProductsByPage({page, filter: filter ? filter : null, query: query ? query : null}))
        setPage(page)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(payload.price != "" && payload.libelle != "" && payload.category != "") {
          dispatch(addProduct(payload)).then((res) => {
            if(res.payload.error) {
              toast.error(res.payload.error)
            }
          });
        } else {
          toast.error("Veuillez renseigner tout les champs.")
        }
        onClose()
        setPayload({
            price: 0,
            libelle: "",
            category: ""
        })
    }

    const toggleSearch = (e) => {
        e.preventDefault();
        setPage(1)
        dispatch(fetchProductsByPage({page: 1, filter: filter ? filter : null, query: query ? query : null}))
    }

    const removeFilter = () => {
      dispatch(fetchProductsByPage({page: 1, query: null, filter: null}))
      setQuery("")
      setFilter("")
      setPage(1)
    }



  return (
    <Box className='md:pl-[239px] w-full flex flex-col justify-center items-center p-4'>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />
        <div className="w-[95%]  flex flex-wrap m-2 sm:justify-between justify-center items-center">
            <div className="flex md:flex-row flex-wrap sm:flex-nowrap justify-center sm:justify-start">
                <div className="w-full flex justify-center items-center">
                  <form onSubmit={(e) => toggleSearch(e)} className="m-2">
                    <InputGroup minWidth={"280px"} maxWidth={"800px"} className="bg-white rounded-md">
                      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Recherchez vos produits' />
                      <InputRightElement children={<button type="submit" className="p-[5px] bg-[#59a3f7] w-full h-full rounded-r-md active:bg-[#59bdf779] hover:bg-[#2769a6] duration-300 flex justify-center items-center">
                        <FiSearch size={20} color={"white"}/>
                        </button>
                      } />
                    </InputGroup>
                  </form>
                </div>
                  {query != "" ? <button  onClick={() => removeFilter()} className="animate-waving-hand bg-[#59a3f7] text-white px-4 rounded w-auto"><FiTrash/></button> : null}
                
                <Select background={'white'} minWidth={"150px"} maxWidth={"250px"} className="m-2" placeholder='Filtre' defaultValue={""} value={filter} onChange={(e) => setFilter(e.target.value)}>
                  {category.categories.length > 0 ? category.categories.map((category, key) => (
                    <option key={key} value={category._id}>{category.libelle}</option>
                  )) : null}
                </Select>
            </div>
            <Button variant="" onClick={onOpen} size='md' className="ml-4 bg-[#59e2f740] hover:bg-[#59bdf779]">
              <span className="text-[#59a3f7]">Ajouter un produit</span>
              <FiPlusSquare size={20} className="ml-2 text-[#59a3f7]"/>
            </Button>
        </div>
        <div className="flex justify-center items-center">
            {Array.from({ length: product.total_pages }, (_, i) => (
                <Button key={i} onClick={() => paginationChange(i+1)} className="m-1" colorScheme='blue' variant={page == i+1 ? 'solid' : 'outline'}>{i+1}</Button>
            ))}
        </div>
        <TableParser />
        <div className="flex justify-center items-center">
            {Array.from({ length: product.total_pages }, (_, i) => (
                <Button key={i} onClick={() => paginationChange(i+1)} className="m-1" colorScheme='blue' variant={page == i+1 ? 'solid' : 'outline'}>{i+1}</Button>
            ))}
        </div>


      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un produit :</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => onSubmit(e)}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Nom :</FormLabel>
                <Input required ref={initialRef} placeholder='Ecran iphone 12' value={payload.libelle} onChange={(e) => setPayload({...payload, libelle: e.target.value})}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Catégorie <span className="text-red-400">*</span> :</FormLabel>
                  <Select required placeholder='-' value={payload.category} onChange={(e) => setPayload({...payload, category: e.target.value})}>
                    {category.categories.length > 0 ? category.categories.map((category, key) => (
                      <option key={key} value={category._id}>{category.libelle}</option>
                    )) : null}
                  </Select>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Prix (HT)</FormLabel>
                  <NumberInput required precision={2} step={0.2} value={payload.price} onChange={(value) => setPayload({...payload, price: value})}>
                      <NumberInputField />
                      <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                      </NumberInputStepper>
                  </NumberInput>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Créer
              </Button>
              <Button onClick={onClose}>Annuler</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
    
  )
}

export default Products