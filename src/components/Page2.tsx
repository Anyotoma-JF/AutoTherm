import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Text, VStack } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/setPage";
import { setPatientID } from "../redux/actions/setPatientID";
import { setProg } from "../redux/actions/setProg";
import { store } from "../redux/store";
export const Page2 = () => {
    const [ID, setID] = useState(useSelector(store => store.patient.id))
    const [IDError, setIDError] = useState("");
    const handlePatientID = (text) => {
        if (text.length == 0) { 
            setIDError("ID is required")
            return;
        } else {
            setIDError("");
            setID(text);
        }
    }
    const dispatch = useDispatch();
    const handleNext = () => {
        if (ID.length == 0) {
            setIDError("Please enter an ID first")
            return;
        }
        dispatch(setPatientID(ID));
        dispatch(setPage(3));
        dispatch(setProg(2));
    }
    const handleBack = () => {
        dispatch(setPage(1));
        dispatch(setProg(0));
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Patient ID</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={IDError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Type in patient ID
                    </FormControl.Label>
                    <Input variant="rounded" value={ID} onChangeText={handlePatientID} leftElement={<Icon as={<MaterialIcons name="tag"/>} size={5} ml={2}/>} placeholder="eg: XXXX"/>
                    <Box>
                        <FormControl.ErrorMessage>{IDError}</FormControl.ErrorMessage>
                    </Box>
                </FormControl>
            </PresenceTransition>
            <FormControl pt={2}>
            <Button.Group>
                <Button 
                    leftIcon={<ArrowBackIcon />} 
                    colorScheme="primary" 
                    onPress={handleBack}
                    >Back</Button>
                <Button 
                    ml="auto"
                    rightIcon={<ArrowForwardIcon />} 
                    colorScheme="primary" 
                    isDisabled={IDError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}