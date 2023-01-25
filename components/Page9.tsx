import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Image, Input, PresenceTransition, Progress, Select, Text, VStack } from "native-base";
import { useState } from "react";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
export const Page9 = ({setPatientSufferingDuration, setPage, setProg, data}) => {
    const [sufferingDuration, setSufferingDuration] = useState(data.patientSufferingDuration)
    const [sufferingDurationError, setSufferingDurationError] = useState("");
    const handleNext = () => {
        if (sufferingDuration.length == 0) {
            setSufferingDurationError("Make a selection")
            return;
        }
        setPatientSufferingDuration(sufferingDuration);
        setPage(10);
        setProg(9);
    }
    const onSelectSufferingDuration = (text) => {
        setSufferingDuration(text);
        setSufferingDurationError("");
    }
    const handleBack = () => {
        setPage(8);
        setProg(7);
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">How many hours do you suffer?</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={sufferingDurationError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Select any
                    </FormControl.Label>
                    <Select selectedValue={sufferingDuration} accessibilityLabel="Select Suffering Duration" placeholder="Select Suffering Duration" onValueChange={onSelectSufferingDuration}>
                        <Select.Item label="1 hour" value="1"/>
                        <Select.Item label="2 hours" value="2"/>
                        <Select.Item label="3 hours" value="3"/>
                        <Select.Item label="4 hours" value="4"/>
                        <Select.Item label="More than 4 hours" value=">4"/>
                    </Select>
                    <Box>
                        <FormControl.ErrorMessage>{sufferingDurationError}</FormControl.ErrorMessage>
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
                    isDisabled={sufferingDurationError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}