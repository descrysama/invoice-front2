import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import moment from "moment";
import {
    Box,
    Card,
    CardBody,
    Text,
    Button,
    List,
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
import { fetchClientsForSearch, deleteQuoteRepairs, updateQuoteRepairs, setRepairSearch, setSelectedRepair, createQuote, removeSelectedUser } from "../../app/quotes/quoteActions";
import ClientCard from "../../components/quotes/ClientCard";
import { setSelectedUser } from "../../app/quotes/quoteActions";
import { createCustomer } from "../../app/customers/customerActions";
import RepairCard from "../../components/quotes/RepairCard";

const CreateQuote = () => {
    const { isOpen: isOpenClient, onOpen: onOpenClient, onClose: onCloseClient } = useDisclosure()
    const { isOpen: isOpenProduct, onOpen: onOpenProduct, onClose: onCloseProduct } = useDisclosure()
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
        <h2 className='font-bold text-xl md:my-5 text-center md:text-left'>Création Devis</h2> 
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
                    {!quote.selectedUser ? 
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
                    {quote.selectedUser ? 
                        <CardBody className="text-center">
                            <Container className="m-2">
                                <Text className="underline font-medium">Coordonées du client :</Text>
                                <Text className="m-2">{quote.selectedUser.firstname} {quote.selectedUser.lastname}</Text>
                                <Text className="m-2">{quote.selectedUser.email}</Text>
                                <Text className="m-2">{quote.selectedUser.tel}</Text>
                                <Text className="m-2">{quote.selectedUser.address}</Text>
                            </Container>
                            <Button borderRadius="lg" className='bg-[#F7596440] hover:bg-[#f7596379]' variant="" onClick={(e) => {
                                e.stopPropagation()
                                dispatch(removeSelectedUser())
                            }}>
                            <FiTrash color="#f75963" size={15}/><span className="text-[#f75963]"></span>
                            </Button>
                        </CardBody> : null}
                </Card>
            </div>
            {/* <Card className="w-full m-2">
                    <CardBody className="flex justify-start text-center flex-col">
                            <Container>
                                <Text className="m-1">Date du devis :</Text>
                                <Input
                                    placeholder="Select Date"
                                    size="sm"
                                    type="date"
                                    defaultValue={moment().format('YYYY-MM-DD')}
                                />
                            </Container>
                    </CardBody>
            </Card> */}
            <Card className="w-full m-2">
                    <CardBody className="flex justify-start text-center flex-col">
                        <div className="flex">
                            <Text className="m-1 font-semibold text-[20px] uppercase">Total :</Text>
                            <Text className="m-1 text-[20px] uppercase">{((quote.selectedRepair.reduce((sum, repair) => sum + repair.qty * repair.price, total) / 100) * (100+tva)).toFixed(2)}€ (TTC)</Text>
                        </div>
                        <Select defaultValue={20} placeholder='0,00%' onChange={(e) => !e.target.value ? setTva(parseInt(0)) : setTva(parseInt(e.target.value))}>
                            <option value={20}>20,00%</option>
                            <option value={10}>10,00%</option>
                        </Select>
                    </CardBody>
            </Card>
            <Card className="m-3 w-full">
                <CardBody className="flex text-center flex-col items-center">
                    <Container className="max-h-[250px] overflow-y-auto m-2 p-2 rounded-md">
                        <div className="flex items-center w-full justify-center">
                            <Button disabled={quote.selectedUser ? false : true} variant="" onClick={() => quote.selectedUser ? onOpenProduct() : toast.error("Veuillez Choisir ou créer un client d'abbord.")} size='md' className="m-2 bg-[#59e2f740] hover:bg-[#59bdf779]">
                                <span className="text-[#59a3f7] flex items-center"><FiFolderPlus className="m-1"/>Ajouter une réparation</span>
                            </Button>
                        </div>
                    </Container>
                    {quote.selectedRepair.length > 0 ? (
                        <Container className="flex flex-col items-center gap-3 w-[80%] p-2 max-h-[600px] overflow-auto">
                        {quote.selectedRepair.map((repair, key) => (
                            <Container key={key} className="flex justify-between items-center m-2 bg-gray-100/30 shadow-sm rounded-md p-2">
                                <div className="flex items-center">
                                    <Button onClick={() => dispatch(deleteQuoteRepairs(repair._id))} colorScheme="red" className="m-1"><FiTrash/></Button>
                                    <Heading size='sm' className="m-2" textTransform='uppercase'>{repair.libelle}</Heading>
                                </div>
                                <div>
                                    <Text>{(repair.qty *repair.price).toFixed(2)}€ (HT)</Text>
                                    <div className="flex items-center">
                                        <Button className="m-1" onClick={() => dispatch(updateQuoteRepairs({_id: repair._id, qty: repair.qty - 1}))}>-</Button>
                                        <NumberInput value={repair.qty} min={0}>
                                            <NumberInputField width={"70px"} onChange={(e) => {
                                                if(e.target.value) {
                                                    dispatch(updateQuoteRepairs({_id: repair._id, qty: parseInt(e.target.value)}))
                                                }
                                            }} />
                                        </NumberInput>
                                        <Button className="m-1" onClick={() => dispatch(updateQuoteRepairs({_id: repair._id, qty: repair.qty + 1}))}>+</Button>
                                    </div>
                                </div>
                            </Container>
                        ))}
                    </Container>
                    ) : null}
                    {quote.selectedRepair.length > 0 ? 
                    <Button onClick={() => dispatch(createQuote({customer: quote.selectedUser._id, tva: tva, repairs: quote.selectedRepair})).then(() => toast.success(<Link to="/quotes">Devis crée avec succès</Link>))} variant="" size='md' className="ml-4 bg-[#59e2f740] hover:bg-[#59bdf779] w-full">
                        <span className="text-[#59a3f7]">Créer le devis</span>
                        <FiPlus size={20} className="ml-2 text-[#59a3f7]"/>
                    </Button> : null}
                </CardBody>
            </Card>
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
          <ModalHeader>Recherchez vos réparations</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => onSubmit(e)}>
            <ModalBody pb={6}>
                <AutocompleteSearchRepair onClick={onCloseProduct}/>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCloseProduct}>Annuler</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
    
  )
}





const AutocompleteSearch = () => {
    const [inputValue, setInputValue] = useState('');
    const quote = useSelector(state => state.quote);
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
                    {quote.clientsforquote.length > 0 ? quote.clientsforquote.map((client, key) => (
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

  const AutocompleteSearchRepair = () => {
    const [inputValue, setInputValue] = useState('');
    const quote = useSelector(state => state.quote);
    const dispatch = useDispatch();

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const selectedUserUpdate = (user_id) => {
        dispatch(setSelectedUser(user_id))
        setInputValue("")
    }

    
    useEffect(() => {
        dispatch(setRepairSearch(inputValue));
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
                    {quote.repairList.length > 0 ? quote.repairList.map((repair, key) => (
                        <div className="w-full" key={key} onClick={() => dispatch(setSelectedRepair(repair))}>
                            <RepairCard props={repair}/>
                        </div>
                    )) : null}
                </Container>
            </List> 
        : null}
        
      </Box>
    );
  };

export default CreateQuote