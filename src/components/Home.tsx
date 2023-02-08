import { ArrowForwardIcon, Box, Button, CheckIcon, FormControl, Icon, Input, PresenceTransition, Progress, Text, VStack } from "native-base";

export const Home = ({setTemp, setDuration, handleStart}) => {
    const handleTemp = (value) => {
        setTemp(value)
    }
    const handleDuration = (value) => {
        setDuration(value)
    }

    return (
        <VStack width="90%" mx="3" mt="30%" maxW="300px">
            <PresenceTransition visible initial={{opacity: 0, scale: 0}} animate={{opacity: 1, transition: {duration: 500}}}>
            <Text fontSize="2xl">Welcome to AutoTherm</Text>
            <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>
                    Temperature
                </FormControl.Label>
            <Input keyboardType="numeric" placeholder="in celcius" onChangeText={handleTemp}/>
            </FormControl>
            <FormControl isRequired>
                <FormControl.Label _text={{bold: true}}>
                    Duration
                </FormControl.Label>
                <Input keyboardType="numeric" placeholder="in seconds" onChangeText={handleDuration}/>
            </FormControl>
            <FormControl pt={2}>
                <Button rightIcon={<ArrowForwardIcon />} colorScheme="primary" onPress={handleStart}>Start</Button>
            </FormControl>
            </PresenceTransition>
        </VStack>
    );
}