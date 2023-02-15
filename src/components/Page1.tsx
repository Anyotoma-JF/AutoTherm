import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/setPage";
import { setPatientName } from "../redux/actions/setPatientName";
import { setProg } from "../redux/actions/setProg";
import { SET_PATIENT_NAME } from "../redux/actions/types";
export const Page1 = () => {
    const [name, setName] = useState(useSelector(store => store.patient.name))
    const [nameError, setNameError] = useState("");

    const handlePatientName = (text) => {
        if (text.length == 0) { 
            setNameError("Name is required")
        } else {
            setNameError("");
            setName(text);
        }
    }
    const dispatch = useDispatch();
    const handleNext = () => {
        if (name.length == 0) {
            setNameError("Please enter a name first")
            return;
        }
        dispatch(setPatientName(name));
        dispatch(setPage(2));
        dispatch(setProg(1));
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Patient name</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={nameError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Type in patient name
                    </FormControl.Label>
                    <Input variant="rounded" value={name} onChangeText={handlePatientName} leftElement={<Icon as={<MaterialIcons name="person"/>} size={5} ml={2}/>} placeholder="eg: John Doe"/>
                    <Box>
                        <FormControl.ErrorMessage>{nameError}</FormControl.ErrorMessage>
                    </Box>
                </FormControl>
            </PresenceTransition>
            <FormControl pt={2}>
            <Button
                    size="lg"
                    variant="ghost"
                    rightIcon={<ArrowForwardIcon />} 
                    isDisabled={nameError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </FormControl>
        </VStack>
    )
}