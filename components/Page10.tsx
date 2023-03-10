import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Text, VStack } from "native-base";
import { useState } from "react";
import FAIcon from "react-native-vector-icons/FontAwesome5"
export const Page10 = ({setTemperature, setPage, setProg, data}) => {
    const [temperature, _setTemperature] = useState(data.temperature)
    const [temperatureError, setTemperatureError] = useState("");
    const handleTemperature = (text) => {
        if (text.length == 0) { 
            setTemperatureError("Temperature is required")
        } else {
            setTemperatureError("");
            _setTemperature(text);
        }
    }
    const handleNext = () => {
        if (temperature.length == 0) {
            setTemperatureError("Please enter some numeric value")
            return;
        }
        setTemperature(temperature);
        setPage(11);
        setProg(10);
    }
    const handleBack = () => {
        setPage(9);
        setProg(8);
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Temperature</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={temperatureError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Type in temperature value
                    </FormControl.Label>
                    <Input 
                        leftElement={<Icon as={<FAIcon name="temperature-high"/>} ml={2}/>}
                        keyboardType="numeric" 
                        value={temperature} 
                        onChangeText={handleTemperature} 
                        size={5} 
                        placeholder="eg: 25"/>
                    <Box>
                        <FormControl.ErrorMessage>{temperatureError}</FormControl.ErrorMessage>
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
                    isDisabled={temperatureError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}