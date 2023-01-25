import {ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, maleIcon, Input, PresenceTransition, Progress, Text, VStack, ArrowBackIcon } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
export const Page4 = ({setPatientAge, setPage, setProg, data}) => {
    const [age, setAge] = useState(data.patientAge)
    const [ageError, setAgeError] = useState("");
    const handlePatientAge = (text) => {
        if (text.length == 0) { 
            setAgeError("Age is required")
            return;
        } else {
            setAgeError("");
            setAge(text);
        }
    }
    const handleNext = () => {
        if (age.length == 0) {
            setAgeError("Please enter age first")
            return;
        }
        if (age === "0") {
            setAgeError("Really?")
            return;
        }
        if (isNaN(age)) {
            setAgeError("Please enter a numeric value")
            return;
        }
        setPatientAge(age);
        setPage(5);
        setProg(4);
    }
    const handleBack = () => {
        setPage(3);
        setProg(2);
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Patient's Age</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={ageError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Type in patient's Age
                    </FormControl.Label>
                    <Input value={age} keyboardType="numeric" onChangeText={handlePatientAge} placeholder="eg: 24"/>
                    <Box>
                        <FormControl.ErrorMessage>{ageError}</FormControl.ErrorMessage>
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
                    isDisabled={ageError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}