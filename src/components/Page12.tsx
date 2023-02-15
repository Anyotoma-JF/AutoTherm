import {Alert, ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, CheckIcon, FormControl, HStack, Icon, Input, PresenceTransition, Progress, Text, VStack } from "native-base";
import CountDown from "react-native-countdown-component"
import {CountdownCircleTimer} from "react-native-countdown-circle-timer";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/actions/setPage";
import { setProg } from "../redux/actions/setProg";
import FAIcon from "react-native-vector-icons/FontAwesome5"

export const Page12 = () => {
    const duration = useSelector(store => store.therapy.duration)
    const dispatch = useDispatch();

    const handlePostTask = () => {
        dispatch(setPage(13));
        dispatch(setProg(12));
    }
    const currentTemperature = useSelector(state => state.therapy.currentTemperature)
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
            <Center>
                <HStack>
                <Icon as={<FAIcon name="temperature-high"/>} size="8" mr="2"/>
                <Text fontSize="2xl" color="gray.500">Temperature: {currentTemperature}</Text>
                </HStack>
                <Text fontSize="3xl" color="gray.300">Heating is ongoing</Text>
            </Center>
            {/* <CountDown
                until={data.duration}
                onFinish={handlePostTask}
                onPress={() => alert('Please wait...')}
                size={20}
                timeToShow={["M", "S", "H"]}
            /> */}
            <Center>
                <CountdownCircleTimer
                        isPlaying={true}
                        duration={duration*60}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[10, 6, 3, 0]}
                        onComplete={handlePostTask}
                        updateInterval={1}
                    >
                    {({ remainingTime, color }) => (
                        <Text fontSize="5xl" color="gray.200">
                        {remainingTime}
                        </Text>
                        )}
                </CountdownCircleTimer>
            </Center>
            </PresenceTransition>
            <FormControl pt={2}>
            <Button.Group>
                <Button 
                    leftIcon={<ArrowBackIcon />} 
                    colorScheme="primary" 
                    isDisabled
                    >Back</Button>
                <Button 
                    ml="auto"
                    rightIcon={<ArrowForwardIcon />} 
                    colorScheme="primary" 
                    isDisabled
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}