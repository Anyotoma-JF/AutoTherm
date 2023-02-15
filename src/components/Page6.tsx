import { ArrowBackIcon, Image, ArrowForwardIcon, Badge, Box, Button, Center, CheckIcon, FormControl, HStack, Icon, Input, PresenceTransition, Progress, Slider, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/setPage";
import { setPatientVASValueAVG } from "../redux/actions/setPatientVASValueAVG";
import { setProg } from "../redux/actions/setProg";
export const Page6 = () => {
    const presetVASValue = useSelector(store => store.patient.VASValueAVG);
    const [VASValue, setVASValue] = useState(presetVASValue);
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
    const dispatch = useDispatch();
    const handleNext = () => {
        dispatch(setPatientVASValueAVG(VASValue));
        dispatch(setPage(7));
        dispatch(setProg(6));
    }
    const handleBack = () => {
        dispatch(setPage(5));
        dispatch(setProg(4));
    }
    // for back 
    useEffect(() => {
        handleVASValue(presetVASValue);
    }, [presetVASValue])
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Face Pain Scale</Text>
            <PresenceTransition visible initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                <FormControl isRequired isInvalid={VASValueError.length > 0}>
                    <FormControl.Label _text={{ bold: true }}>
                        What is your typical or average pain?
                    </FormControl.Label>
                    <HStack>
                        <Text>0</Text>
                        <Text ml="auto">10</Text>
                    </HStack>
                    <Slider colorScheme={painTextColor} size="lg" defaultValue={VASValue} minValue={0} maxValue={10} step={1} onChange={handleVASValue}>
                        <Slider.Track>
                            <Slider.FilledTrack />
                        </Slider.Track>
                        <Slider.Thumb />
                    </Slider>
                    <Center>
                        <Text mt={5}>
                            {VASValue}
                        </Text>
                        {/* <Text fontSize="3xl" style={{color: "gray"}}>
                            {VASValue >= 1 && VASValue <= 3 && "Mild Pain"}
                            {VASValue >= 4 && VASValue <= 6 && "Moderate Pain"}
                            {VASValue >= 7 && VASValue <= 10 && "Severe Pain"}
                        </Text> */}
                        <Badge mt={5} colorScheme={painTextColor} variant="outline" _text={{ fontSize: 25 }}>
                            {painText}
                        </Badge>
                    </Center>
                    <Box>
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