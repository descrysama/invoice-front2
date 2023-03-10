import { useState, useEffect, useRef } from "react";
import { addProduct, fetchProductsByPage } from "../../app/products/productActions";
import { useDispatch, useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import { 
    Box, 
    InputGroup,
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
} from '@chakra-ui/react'
import {
    FiSearch,
    FiPlusSquare
} from "react-icons/fi";
import { 
    fetchCustomersByPage,
    createCustomer,
    deleteCustomer,
    updateCustomer
} from "../../app/customers/customerActions";
import TableParser from "../../components/customers/TableParser";

const Customers = () => {
    
    const dispatch = useDispatch();
    const customer = useSelector(state => state.customer);
    const [query, setQuery] = useState("");
    const [payload, setPayload] = useState({
        firstname: "",
        lastname: "",
        address: "",
        tel: "",
        email: ""
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)

    let [page, setPage] = useState(1);

    useEffect(() => {
      dispatch(fetchCustomersByPage({page}))
    }, [])

    const paginationChange = (page) => {
        dispatch(fetchCustomersByPage({page, query: query ? query : null}))
        setPage(page)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(payload.price != "" && payload.libelle != "" && payload.category != "") {
          dispatch(createCustomer(payload)).then((res) => {
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
        dispatch(fetchCustomersByPage({page: 1, query: query ? query : null}))
    }

    const removeFilter = () => {
      dispatch(fetchCustomersByPage({page: 1, query: null}))
      setQuery("")
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
                    <InputGroup className="sm:min-w-[350px] bg-white rounded-md" maxWidth={"800px"}>
                      <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Recherchez par email, noms, numero de téléphone' />
                      <InputRightElement children={<button type="submit" className="p-[5px] bg-[#59a3f7] w-full h-full rounded-r-md active:bg-[#59bdf779] hover:bg-[#2769a6] duration-300 flex justify-center items-center">
                        <FiSearch size={20} color={"white"}/>
                        </button>
                      } />
                    </InputGroup>
                  </form>
                  {query != "" ? <button  onClick={() => removeFilter()} className="animate-waving-hand bg-[#59a3f7] text-white py-2 px-4 rounded">supprimer le filtre</button> : null}
                </div>
            </div>
            <Button variant="" onClick={onOpen} size='md' className="ml-4 bg-[#59e2f740] hover:bg-[#59bdf779]">
              <span className="text-[#59a3f7]">Ajouter un client</span>
              <FiPlusSquare size={20} className="ml-2 text-[#59a3f7]"/>
            </Button>
        </div>
        <div className="flex justify-center items-center">
            {Array.from({ length: customer.total_pages }, (_, i) => (
                i < 5 ? 
                <Button key={i} onClick={() => paginationChange(i+1)} className="m-1" colorScheme='blue' variant={page == i+1 ? 'solid' : 'outline'}>{i+1}</Button> : <div key={i}></div>

            ))}
        {customer.total_pages > 5 ? <Input value={page} onChange={(e) => paginationChange(e.target.value)} placeholder='10' className="max-w-[75px]"/> : null}
        {customer.total_pages > 5 ? <Button key={customer.total_pages} onClick={() => paginationChange(customer.total_pages)} className="m-1" colorScheme='blue' variant={page == customer.total_pages ? 'solid' : 'outline'}>{customer.total_pages}</Button> : <div></div>}
        </div>
        <TableParser/>
        <div className="flex justify-center items-center">
            {Array.from({ length: customer.total_pages }, (_, i) => (
                i < 5 ? 
                <Button key={i} onClick={() => paginationChange(i+1)} className="m-1" colorScheme='blue' variant={page == i+1 ? 'solid' : 'outline'}>{i+1}</Button> : <div key={i}></div>

            ))}
        {customer.total_pages > 5 ? <Input value={page} onChange={(e) => paginationChange(e.target.value)} placeholder='10' className="max-w-[75px]"/> : null}
        {customer.total_pages > 5 ? <Button key={customer.total_pages} onClick={() => paginationChange(customer.total_pages)} className="m-1" colorScheme='blue' variant={page == customer.total_pages ? 'solid' : 'outline'}>{customer.total_pages}</Button> : <div></div>}
        </div>



      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ajouter un Client :</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => onSubmit(e)}>
            <ModalBody pb={6}>
              <FormControl className="mb-2">
                <FormLabel>Nom <span className="text-red-400 text-[14px] font-light">obligatoire*</span> :</FormLabel>
                <Input required placeholder='John' value={payload.lastname} onChange={(e) => setPayload({...payload, lastname: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Prénom <span className="text-red-400 text-[14px] font-light">obligatoire*</span> :</FormLabel>
                <Input required placeholder='Doe' value={payload.firstname} onChange={(e) => setPayload({...payload, firstname: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Email :</FormLabel>
                <Input placeholder='johndoe@gmail.com' value={payload.email} onChange={(e) => setPayload({...payload, email: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Numero de téléphone :</FormLabel>
                <Input placeholder='0606060606' value={payload.tel} onChange={(e) => setPayload({...payload, tel: e.target.value})}/>
              </FormControl>
              <FormControl className="mb-2">
                <FormLabel>Adresse :</FormLabel>
                <Input placeholder='1 rue de la république, 69001' value={payload.address} onChange={(e) => setPayload({...payload, address: e.target.value})}/>
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

export default Customers