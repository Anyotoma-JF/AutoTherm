import {ArrowBackIcon, ArrowForwardIcon, Badge, Box, Button, Center, CheckIcon, FormControl, HStack, Icon, Image, Input, PresenceTransition, Progress, Slider, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
export const Page8 = ({setPatientMaxVASValue, setPage, setProg, data}) => {
    const [VASValue, setVASValue] = useState(data.patientMaxVASValue)
    const [VASValueError, setVASValueError] = useState("");

    const [color, setColor] = useState("primary");

    const [painText, setPainText] = useState("No pain");
    const [painTextColor, setPainTextColor] = useState("primary");
    const handleVASValue = (text) => {
        setVASValue(text);
        let pain = parseInt(text);
        if (pain == 0) {
            setColor("pimary");
            setPainTextColor("primary");
            setPainText("No pain")
        }
        else if (pain >= 1 && pain <= 3) {
            setColor("emerald"); setPainTextColor("success"); 
            setPainText("Mild");
        }
        else if (pain >= 4 && pain <= 6) {
            setColor("indigo"); setPainTextColor("warning"); 
            setPainText("Moderate");
        }
        else {
            setColor("orange");
            setPainTextColor("error");
            setPainText("Severe");
        }
    }
    const handleNext = () => {
        setPatientMaxVASValue(VASValue);
        setPage(9);
        setProg(8);
    }
    const handleBack = () => {
        setPage(7);
        setProg(6);
    }

    const [predictedMaxVASValue, setPredictedMaxVASValue] = useState();
    // pre evaluate max=2*avg-min
    useEffect(()=>{
        // only set when max value was not defined
        if (data.patientMaxVASValue == undefined) {
            const _predictedMaxVASValue = 2*data.patientVASValue - data.patientMinVASValue
            setPredictedMaxVASValue(_predictedMaxVASValue);
        } 
    }, []);
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Face Pain Scale</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={VASValueError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        What is pain at its worst? 
                    </FormControl.Label>
                    <HStack>
                        <Text>0</Text>
                        <Text ml="auto">10</Text>
                    </HStack>
                    <Slider colorScheme={painTextColor} size="lg" defaultValue={VASValue} minValue={0} maxValue={10} step={1} onChange={handleVASValue}>
                        <Slider.Track>
                            <Slider.FilledTrack/>
                        </Slider.Track>
                        <Slider.Thumb/>
                    </Slider>
                    <FormControl.HelperText>
                    How close to 10 does your pain get at its worst?
                    </FormControl.HelperText>
                    <Center>
                        <Text mt={5}>
                            {VASValue == undefined && predictedMaxVASValue <= 10 && predictedMaxVASValue >= 0 && predictedMaxVASValue >= data.patientMinVASValue && `Predicted value: ${predictedMaxVASValue}`}
                            {VASValue}
                        </Text>
        
                        <Badge mt={5} colorScheme={painTextColor} variant="outline" _text={{fontSize: 25}}>
                            {painText}
                        </Badge>
                    </Center>
                    <Box>
                        <FormControl.ErrorMessage>{VASValueError}</FormControl.ErrorMessage>
                        <FormControl.ErrorMessage>{VASValueError}</FormControl.ErrorMessage>
                        <Center>
                            <Image resizeMode="contain" width={Dimensions.get('window').width} height={200} alt="Face Pain Scale" source={require('./images/Pain_scale.jpg')} />
                        </Center>
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
                    isDisabled={VASValueError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}