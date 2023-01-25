import {ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Select, Text, VStack } from "native-base";
import { useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
export const Page3 = ({setPatientGender, setPage, setProg, data}) => {
    const [gender, setGender] = useState(data.patientGender)
    const [genderError, setGenderError] = useState("");
    const handleNext = () => {
        if (gender.length == 0) {
            setGenderError("Make a selection")
            return;
        }
        setPatientGender(gender);
        setPage(4);
        setProg(3);
    }
    const onSelectGender = (text) => {
        setGender(text);
        setGenderError("");
    }
    const handleBack = () => {
        setPage(2);
        setProg(1);
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