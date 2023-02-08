import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Text, VStack } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
export const Page1 = ({setPatientName, setPage, setProg, data}) => {
    const [name, setName] = useState(data.patientName)
    const [nameError, setNameError] = useState("");
    const handlePatientName = (text) => {
        if (text.length == 0) { 
            setNameError("Name is required")
        } else {
            setNameError("");
            setName(text);
        }
    }
    const handleNext = () => {
        if (name.length == 0) {
            setNameError("Please enter a name first")
            return;
        }
        setPatientName(name);
        setPage(2);
        setProg(1);
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
                    rightIcon={<ArrowForwardIcon />} 
                    colorScheme="primary" 
                    isDisabled={nameError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </FormControl>
        </VStack>
    )
}