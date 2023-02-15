import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Select, Text, VStack } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/setPage";
import { setPatientDOP } from "../redux/actions/setPatientDOP";
import { setProg } from "../redux/actions/setProg";
export const Page5 = () => {
    const [DOP, setDOP] = useState(useSelector(store => store.patient.dop));
    const [DOPError, setDOPError] = useState("");
    const dispatch = useDispatch();
    const handleNext = () => {
        if (DOP.length == 0) {
            setDOPError("Make a selection")
            return;
        }
        dispatch(setPatientDOP(DOP));
        dispatch(setPage(6));
        dispatch(setProg(5));
    }
    const onSelectDOP = (text) => {
        setDOP(text);
        setDOPError("");
    }
    const handleBack = () => {
        dispatch(setPage(4));
        dispatch(setProg(3));
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Disease/Problem</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={DOPError.length > 0}>
                    <FormControl.Label  _text={{bold: true}}>
                        Select any
                    </FormControl.Label>
                    <Select selectedValue={DOP} accessibilityLabel="Select DOP" placeholder="Select DOP" onValueChange={onSelectDOP}>
                        <Select.Item label="Stroke" value="stroke"/>
                        <Select.Item label="Muscle Spasm" value="musle_spasm"/>
                        <Select.Item label="Arthritis" value="arthritis"/>
                        <Select.Item label="Osteoporesis" value="osteoporesis"/>
                        <Select.Item label="Rheumatoid" value="rheumatoid" />
                        <Select.Item label="Sclerosis" value="sclerosis" />
                        <Select.Item label="Neuromuscular" value="neuromuscular" />
                        <Select.Item label="Others" value="others" />   
                    </Select>
                    <Box>
                        <FormControl.ErrorMessage>{DOPError}</FormControl.ErrorMessage>
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
                    isDisabled={DOPError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}