import {Alert, AlertDialog, ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, Checkbox, CheckIcon, FormControl, HStack, Icon, Input, InputGroup, InputLeftAddon, InputRightAddon, PresenceTransition, Progress, Select, Switch, Text, VStack } from "native-base";
import { useRef, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
export const Page11 = ({setDuration, setPage, setProg, data, devices, scanDevices, connectToHC06, sendToHC06}) => {
    const [duration, _setDuration] = useState(data.duration)
    const [durationError, setDurationError] = useState("");
    const [selectedDevice, setSelectedDevice] = useState("");
    const [selectedDeviceError, setSelectedDeviceError] = useState("")
    const [isConnecting, setIsConnecting] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [unit, setUnit] = useState("m");
    const handleDuration = (text) => {
        if (text.length == 0) { 
            setDurationError("Duration is required")
            return;
        } else {
            setDurationError("");
            _setDuration(text);
        }
    }
    const onSelectDevice = (device) => {
        console.log(device)
        setSelectedDevice(device)
    }
    const handleNext = async () => {
        try {
            setIsConnecting(true);
            if (duration.length == 0) {
                setDurationError("Please enter some numeric value")
                return;
            }
            if (selectedDevice.length == 0) {
                setSelectedDeviceError("Make a selection")
                return;
            }
            let _duration = parseInt(duration);
            console.log(`_duration: ${_duration}`);
            if (unit === "s") _duration = _duration/60;
            await setDuration(_duration);
            console.log(`duration: ${duration}`);
            await connectToHC06(selectedDevice);
            await sendToHC06(data.temperature, duration);
            setPage(12);
            setProg(11);
            // setTimeout(async ()=>{
            //     await sendToHC06();
            //     setPage(12);
            //     setProg(11);
            //     setIsConnecting(false);
            // }, 2000);
        } catch (err) {
            setIsOpen(true);
            console.log(err);
        } finally {
            setIsConnecting(false);
        }
    }
    const handleBack = () => {
        setPage(10);
        setProg(9);
    }
    const handleRetry = () => {
        setIsOpen(false);
        handleNext();
    }
    const handleScan = async () => {
        setIsScanning(true);
        await scanDevices();
        setIsScanning(false);
    }
    const handleUnit = (val) => {
        setUnit(val === true ? "m" : "s");
    }
    const cancelRef = useRef(null);
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen}>
                <AlertDialog.Content>
                <AlertDialog.Header>Failed to connect</AlertDialog.Header>
                <AlertDialog.Body>
                <Alert variant="subtle" status="error">
                    <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt={1}/>
                        <Text>Device not responding</Text>
                    </HStack>
                </Alert>
                </AlertDialog.Body>
                <AlertDialog.Footer>
                    <Button.Group>
                        <Button onPress={handleRetry} leftIcon={<Icon as={<MaterialIcons name="redo"/>} />} colorScheme="primary" variant="outline">
                            Retry
                        </Button>
                        <Button onPress={()=>setIsOpen(false)} leftIcon={<Icon as={<MaterialIcons name="close"/>} />} colorScheme="error" variant="outline">
                            Close
                        </Button>
                    </Button.Group>
                </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <Text fontSize="2xl">Duration</Text>
            <PresenceTransition visible initial={{opacity: 0}} animate={{opacity: 1, transition: {duration: 250}}}>
                <FormControl isRequired isInvalid={durationError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Type in duration value
                    </FormControl.Label>
                    <Input keyboardType="numeric" value={duration} leftElement={<Icon as={<MaterialIcons name="timer"/>} size={5} ml={2}/>} onChangeText={handleDuration} size={5} placeholder={`in ${unit === "m" ? "minutes" : "seconds"}`}/>
                    <Box>
                        <FormControl.ErrorMessage>{durationError}</FormControl.ErrorMessage>
                    </Box>
                    <FormControl>
                    <FormControl.Label>
                        Toggle unit
                    </FormControl.Label>
                    <HStack>
                    <Switch mr="auto" size="md" offTrackColor="emerald.500" isChecked={unit=="m"} onToggle={handleUnit}/>
                    <Text color="gray.400">
                        {unit === "m" ? "minute" : "second"}
                    </Text>
                    </HStack>
                    </FormControl>
                </FormControl>
                <FormControl isRequired isInvalid={selectedDeviceError.length > 0}>
                    <FormControl.Label _text={{bold: true}}>
                        Select device
                    </FormControl.Label>
                    <Select isDisabled={isScanning} selectedValue={selectedDevice} accessibilityLabel="Select device" placeholder={isScanning ? "Scanning devices" : "Select device"} onValueChange={onSelectDevice}>
                        {/* <Select.Item label="Female" value="female"/>
                        <Select.Item label="Male" value="male"/>
                        <Select.Item label="Other" value="other"/> */}
                        {
                            devices.map(device => {
                                return <Select.Item key={device.id} label={device.name} value={device.address} />
                            })
                        }
                    </Select>
                    <Box>
                        <FormControl.ErrorMessage>{selectedDeviceError}</FormControl.ErrorMessage>
                    </Box>
                </FormControl>
            </PresenceTransition>
            <FormControl pt={2}>
            <Button.Group>
                <Button 
                    isDisabled={isScanning || isConnecting}
                    leftIcon={<ArrowBackIcon />} 
                    colorScheme="primary" 
                    onPress={handleBack}
                    >Back</Button>
                    <Button 
                    ml="auto"
                    colorScheme="primary"
                    isDisabled={isScanning || isConnecting}
                    isLoading={isScanning}
                    isLoadingText={"Scan"}
                    leftIcon={<Icon as={<MaterialIcons name="search" />} ml={2} />} 
                    variant="outline" 
                    onPress={handleScan}
                    >Scan</Button>
                <Button 
                    ml="auto"
                    rightIcon={<ArrowForwardIcon />} 
                    colorScheme="primary" 
                    isDisabled={durationError.length > 0 || isScanning || isConnecting}
                    onPress={handleNext}
                    isLoading={isConnecting}
                    isLoadingText="Connect"
                    >Next</Button>
            </Button.Group>
            </FormControl>
        </VStack>
    )
}