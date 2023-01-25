import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Text, VStack } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
export const Page11 = ({setDuration, setPage, setProg, data, sendToHC06}) => {
    const [duration, _setDuration] = useState(data.duration)
    const [durationError, setDurationError] = useState("");
    const handleDuration = (text) => {
        if (text.length == 0) { 
            setDurationError("Duration is required")
            return;
        } else {
            setDurationError("");
            _setDuration(text);
        }
    }
    const handleNext = () => {
        if (duration.length == 0) {
            setDurationError("Please enter some numeric value")
            return;
        }
        setDuration(parseInt(duration));
        sendToHC06();
        setPage(12);
        setProg(11);
    }
    const handleBack = () => {
        setPage(10);
        setProg(9);
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Duration</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={durationError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Type in duration value
                    </FormControl.Label>
                    <Input keyboardType="numeric" value={duration} leftElement={<Icon as={<MaterialIcons name="timer"/>} size={5} ml={2}/>} onChangeText={handleDuration} size={5} placeholder="in minutes"/>
                    <Box>
                        <FormControl.ErrorMessage>{durationError}</FormControl.ErrorMessage>
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
                    isDisabled={durationError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}