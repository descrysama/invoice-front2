import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import moment from "moment";
import {
    Box,
    Card,
    CardBody,
    Text,
    List,
    Button,
    Input,
    Modal,
    useDisclosure,
    Heading,
    NumberInput,
    NumberInputField,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Select,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Container,
    Divider,
} from "@chakra-ui/react";
import { FiFolderPlus, FiTrash, FiPlus } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { setRepairSearch, setSelectedRepair, createQuote } from "../../app/quotes/quoteActions";
import { fetchClientsForSearch , setSelectedUser, updateInvoiceProducts, deleteInvoiceProducts, setSelectedQuote, deleteSelectedQuote, createInvoice} from "../../app/stores/storeSlice";
import ClientCard from "../../components/quotes/ClientCard";
import { createCustomer } from "../../app/customers/customerActions";
import RepairCard from "../../components/quotes/RepairCard";
import ProductSearch from '../../components/invoices/ProductSearch' 
import QuoteSearch from "../../components/invoices/QuoteSearch";

const CreateQuote = () => {
    const { isOpen: isOpenClient, onOpen: onOpenClient, onClose: onCloseClient } = useDisclosure()
    const { isOpen: isOpenProduct, onOpen: onOpenProduct, onClose: onCloseProduct } = useDisclosure()
    const { isOpen: isOpenQuote, onOpen: onOpenQuote, onClose: onCloseQuote } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const dispatch = useDispatch();
    const quote = useSelector(state => state.quote);
    const store = useSelector(state => state.store);

    const [payload, setPayload] = useState({
        id: "",
        firstname: "",
        lastname: "",
        address: "",
        tel: "",
        email: ""
    })

    const [total, setTotal] = useState(0);
    const [tva, setTva] = useState(20);

    const onSubmit = (e) => {
        e.preventDefault();
        if(payload.firstname && payload.lastname && payload.tel || payload.email) {
            dispatch(createCustomer(payload)).then((res) => {
                dispatch(setSelectedUser(res.payload._id))
                onCloseClient()
            })
        } else {
            toast.error('Nom prénom et téléphone ou email sont requis.')
        }
    }

    const calculateTotal = (totalQuote) => {
        return (store.selectedProducts.reduce((sum, product) => sum + product.qty * product.price, total) / 100) * (100+tva) + (isNaN(totalQuote) ? 0 :(totalQuote/ 100) * (100+tva))
    }

    useEffect(() => {
        onCloseProduct()
    },[quote.selectedRepair, tva])

  return (
    <Box className='md:pl-[239px] w-full flex flex-col justify-center items-center p-4'>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />
        <h2 className='font-bold text-xl md:my-5 text-center md:text-left'>Création facture</h2> 
        <div className="w-full flex flex-col justify-start items-center p-1">
            <div className="flex w-full xl:flex-row flex-col">
                <Card className="xl:w-[50%] m-2">
                    <CardBody className="flex flex-col justify-start text-center">
                            <Container className="m-2">
                                <Text className="underline font-medium">Vos coordonées :</Text>
                                <Text className="m-2">{store.store.name}</Text>
                                <Text className="m-2">{store.store.email}</Text>
                                <Text className="m-2">{store.store.tel}</Text>
                                <Text className="m-2">{store.store.address}</Text>
                            </Container>
                    </CardBody>
                </Card>
                <Card className="xl:w-[50%] m-2">
                    {!store.selectedUser ? 
                    <CardBody className="flex justify-start text-center flex-col">
                        <Container>
                            <Text className="m-1">Choisissez un client :</Text>
                            <AutocompleteSearch/>
                            <Container className="max-h-[250px] overflow-y-auto m-2 p-2 rounded-md">

                            </Container>
                        </Container>
                        <Text className="m-1 text-[16px] font-semibold">OU</Text>
                        <Divider />
                        <Container className="max-h-[250px] overflow-y-auto m-2 p-2 rounded-md">
                          <Button variant="" onClick={onOpenClient} size='md' className="ml-4 bg-[#59e2f740] hover:bg-[#59bdf779]">
                              <span className="text-[#59a3f7]">Créer le client</span>
                          </Button>
                        </Container>
                    </CardBody> : null}
                    {store.selectedUser ? 
                        <CardBody className="text-center">
                            <Container className="m-2">
                                <Text className="underline font-medium">Coordonées du client :</Text>
                                <Text className="m-2">{store.selectedUser.firstname} {store.selectedUser.lastname}</Text>
                                <Text className="m-2">{store.selectedUser.email}</Text>
                                <Text className="m-2">{store.selectedUser.tel}</Text>
                                <Text className="m-2">{store.selectedUser.address}</Text>
                            </Container>
                        </CardBody> : null}
                </Card>
            </div>
            <Card className="w-full m-2">
                    <CardBody className="flex justify-start text-center flex-col">
                        <div className="flex">
                            <Text className="m-1 font-semibold text-[20px] uppercase">Total :</Text>
                            <Text className="m-1 text-[20px] uppercase">{(calculateTotal((store.selectedQuote.total / (100+store.selectedQuote.tva) * 100))).toFixed(2)}€ (TTC)</Text>
                        </div>
                        <Select defaultValue={20} placeholder='0,00%' onChange={(e) => !e.target.value ? setTva(parseInt(0)) : setTva(parseInt(e.target.value))}>
                            <option value={20}>20,00%</option>
                            <option value={10}>10,00%</option>
                        </Select>
                    </CardBody>
            </Card>
            <div className="flex w-full">
              <Card className="m-3 w-1/2">
                  <CardBody className="flex text-center flex-col items-center">
                      <Container className="max-h-[250px] overflow-y-auto m-2 p-2 rounded-md">
                          <div className="flex items-center w-full justify-center">
                              <Button variant="" onClick={() => onOpenProduct()} size='md' className="m-2 bg-[#59e2f740] hover:bg-[#59bdf779]">
                                  <span className="text-[#59a3f7] flex items-center"><FiFolderPlus className="m-1"/>Ajouter un produit</span>
                              </Button>
                          </div>
                      </Container>
                      {store.selectedProducts.length > 0 ? (
                          <Container className="flex flex-col items-center gap-3 w-[80%] p-2 max-h-[600px] overflow-auto">
                            {store.selectedProducts.map((repair, key) => (
                                <Container key={key} className="flex justify-between items-center m-2 bg-gray-100/30 shadow-sm rounded-md p-2">
                                    <div className="flex items-center">
                                        <Button onClick={() => dispatch(deleteInvoiceProducts(repair._id))} colorScheme="red" className="m-1"><FiTrash/></Button>
                                        <Heading size='sm' className="m-2" textTransform='uppercase'>{repair.libelle}</Heading>
                                    </div>
                                    <div>
                                        <Text>{(repair.qty *repair.price).toFixed(2)}€ (HT)</Text>
                                        <div className="flex items-center">
                                            <Button className="m-1" onClick={() => dispatch(updateInvoiceProducts({_id: repair._id, qty: repair.qty - 1}))}>-</Button>
                                            <NumberInput value={repair.qty} min={0}>
                                                <NumberInputField width={"70px"} onChange={(e) => {
                                                    if(e.target.value) {
                                                        dispatch(updateInvoiceProducts({_id: repair._id, qty: parseInt(e.target.value)}))
                                                    }
                                                }} />
                                            </NumberInput>
                                            <Button className="m-1" onClick={() => dispatch(updateInvoiceProducts({_id: repair._id, qty: repair.qty + 1}))}>+</Button>
                                        </div>
                                    </div>
                                </Container>
                            ))}
                          </Container>
                      ) : null}
                  </CardBody>
              </Card>
              <Card className="m-3 w-1/2">
                  <CardBody className="flex text-center flex-col items-center">
                      <Container className="max-h-[250px] overflow-y-auto m-2 p-2 rounded-md">
                          <div className="flex items-center w-full justify-center">
                            {store.selectedQuote ? 
                                <Button variant="" onClick={() => dispatch(deleteSelectedQuote())} size='md' className="m-2 bg-[#59e2f740] hover:bg-[#59bdf779]">
                                    <span className="text-[#59a3f7] flex items-center"><FiFolderPlus className="m-1"/>Supprimer le devis</span>
                                </Button>
                            :
                                <Button variant="" onClick={() => onOpenQuote()} size='md' className="m-2 bg-[#59e2f740] hover:bg-[#59bdf779]">
                                    <span className="text-[#59a3f7] flex items-center"><FiFolderPlus className="m-1"/>Ajouter un devis</span>
                                </Button>
                            }
                          </div>
                      </Container>
                      {store.selectedQuote ? (
                          <Container className="flex flex-col items-center gap-3 w-[80%] p-2 max-h-[600px] overflow-auto">
                            <Container className="flex justify-between items-center m-2 bg-gray-100/30 shadow-sm rounded-md p-2">
                                    <div className="w-full">
                                        {store.selectedQuote.repairs.map((repair, key) => (
                                           <div key={key} className="flex items-center justify-end w-full m-2">
                                            <Heading size='sm' className="m-2" textTransform='uppercase'>- {repair.libelle}</Heading>
                                            <Text>{(repair.price).toFixed(2)}€</Text>
                                           </div>
                                        ))}
                                        <Text className="text-right">{(store.selectedQuote.total / (100+store.selectedQuote.tva) * 100).toFixed(2)}€ (HT)</Text>
                                    </div>
                                </Container>
                          </Container>
                      ) : null}
                  </CardBody>
              </Card>
            </div>
            {store.selectedProducts.length > 0 || store.selectedQuote ? 
              <Button onClick={() => {
                    dispatch(createInvoice({tva: tva, customer_id : store.selectedUser._id, products: store.selectedProducts ? store.selectedProducts : null, quote: store.selectedQuote ? store.selectedQuote._id : null}))
                    .then((res) => toast.success('Facture crée avec succès.'))
                }} variant="" size='md' className="ml-4 bg-[#59e2f740] hover:bg-[#59bdf779] w-full">
                  <span className="text-[#59a3f7]">Créer la facture</span>
                  <FiPlus size={20} className="ml-2 text-[#59a3f7]"/>
              </Button> : null}
        </div>
    <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenClient}
        onClose={onCloseClient}
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => onSubmit(e)}>
            <ModalBody pb={6}>
                <Container>
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
                </Container>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme='blue' mr={3}>
                Créer
              </Button>
              <Button onClick={onCloseClient}>Annuler</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenProduct}
        onClose={onCloseProduct}
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recherchez vos produits : </ModalHeader>
          <ModalCloseButton />
            <ModalBody pb={6}>
                <ProductSearch onCloseProduct={onCloseProduct}/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseProduct}>Annuler</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpenQuote}
        onClose={onCloseQuote}
    >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Recherchez vos devis : </ModalHeader>
          <ModalCloseButton />
            <ModalBody pb={6}>
                <QuoteSearch onCloseQuote={onCloseQuote}/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseQuote}>Annuler</Button>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    
  )
}





const AutocompleteSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const quote = useSelector(state => state.quote);
    const store = useSelector(state => state.store);
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const selectedUserUpdate = (user_id) => {
        dispatch(setSelectedUser(user_id))
        setInputValue("")
    }

    
    useEffect(() => {
        dispatch(fetchClientsForSearch(inputValue));
    }, [inputValue])
  
    return (
      <Box>

        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Recherche"
        />
        {inputValue != "" ? 
            <List>
                <Container className="bg-white absolute flex w-[60%] items-center flex-col z-10 border-[1px] rounded-md max-h-[300px] overflow-x-hidden overflow-y-auto">
                    {store.clientsforinvoice.length > 0 ? store.clientsforinvoice.map((client, key) => (
                        <div className="w-full" key={key} onClick={() => selectedUserUpdate(client._id)}>
                            <ClientCard props={client}/>
                        </div>
                    )) : null}
                </Container>
            </List> 
        : null}
        
      </Box>
    );
  };

 

export default CreateQuote