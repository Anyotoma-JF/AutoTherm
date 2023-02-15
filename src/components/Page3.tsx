import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Select, Text, VStack } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/setPage";
import { setPatientGender } from "../redux/actions/setPatientGender";
import { setProg } from "../redux/actions/setProg";
export const Page3 = () => {
    const [gender, setGender] = useState(useSelector(store => store.patient.gender));
    const [genderError, setGenderError] = useState("");
    const dispatch = useDispatch();
    const handleNext = () => {
        if (gender.length === 0) {
            setGenderError("Make a selection")
            return;
        }
        dispatch(setPatientGender(gender));
        dispatch(setPage(4));
        dispatch(setProg(3));
    }
    const onSelectGender = (text) => {
        setGender(text);
        setGenderError("");
    }
    const handleBack = () => {
        dispatch(setPage(2));
        dispatch(setProg(1));
    }
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <Text fontSize="2xl">Gender</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={genderError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Select gender
                    </FormControl.Label>
                    <Select selectedValue={gender} accessibilityLabel="Select gender" placeholder="Select gender" onValueChange={onSelectGender}>
                        <Select.Item label="Female" value="female"/>
                        <Select.Item label="Male" value="male"/>
                        <Select.Item label="Other" value="other"/>
                    </Select>
                    <Box>
                        <FormControl.ErrorMessage>{genderError}</FormControl.ErrorMessage>
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
                    isDisabled={genderError.length > 0}
                    onPress={handleNext}
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}