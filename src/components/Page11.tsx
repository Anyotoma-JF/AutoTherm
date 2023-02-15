import { Alert, AlertDialog, ArrowBackIcon, ArrowForwardIcon, Box, Button, Center, Checkbox, CheckIcon, FormControl, HStack, Icon, Input, InputGroup, InputLeftAddon, InputRightAddon, PresenceTransition, Progress, Select, Switch, Text, VStack } from "native-base";
import { useEffect, useRef, useState } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useDispatch, useSelector } from "react-redux";
import { setTherapyDuration } from "../redux/actions/setTherapyDuration";

import BluetoothSerial from "react-native-bluetooth-serial";
import { setDevices } from "../redux/actions/setDevices";
import { setPage } from "../redux/actions/setPage";
import { setProg } from "../redux/actions/setProg";
import { ToastAndroid } from "react-native";
export const Page11 = () => {
    // get temperature
    const temperature = useSelector(store => store.therapy.temperature)
    const [duration, _setDuration] = useState(useSelector(store => store.therapy.duration))
    const [durationError, setDurationError] = useState("");
    const preferredDevice = useSelector(store => store.autoTherm.preferredDevice);
    const [selectedDevice, setSelectedDevice] = useState(preferredDevice);
    const [selectedDeviceError, setSelectedDeviceError] = useState("")
    const [isConnecting, setIsConnecting] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const devices = useSelector(store => store.autoTherm.devices)
    const [shouldSendData, setShouldSendData] = useState(false);

    const dispatch = useDispatch();

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


    const scanDevices = async () => {
        const devices = await BluetoothSerial.discoverUnpairedDevices();
        const alreadyPaired = await BluetoothSerial.list();
        dispatch(setDevices([...devices, ...alreadyPaired]));
    }

    const connectToHC06 = async (device) => {
        try {
            const dev = await BluetoothSerial.connect(device)
            console.log(`U: ${dev}`);
            ToastAndroid.show(dev.message, ToastAndroid.SHORT)
        } catch (err) {
            throw err;
        }
    }

    const sendToHC06 = async (temperature, duration) => {
        const data = `${temperature.toString()},${duration.toString()}`
        console.log(data);
        const sendData = await BluetoothSerial.write(data);
        console.log(sendData);
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
            dispatch(setTherapyDuration(duration));
            // setShouldSendData(true);
            console.log('Okay sending')
            await connectToHC06(selectedDevice);
            await sendToHC06(temperature, duration);
            ToastAndroid.show("Countdown started", ToastAndroid.SHORT)
            dispatch(setPage(12));
            dispatch(setProg(11));
        } catch (err) {
            setIsOpen(true);
            console.log(err);
        } finally {
            setIsConnecting(false);
            // setShouldSendData(false);
        }
    }
    useEffect(()=>{
        setSelectedDevice(preferredDevice);
    }, [preferredDevice])
    // useEffect(()=>{
    //     (async ()=>{
    //         if (shouldSendData && temperature.length > 0 && duration.length > 0) {
    //             try {
    //                 console.log('Okay sending')
    //                 await connectToHC06(selectedDevice);
    //                 await sendToHC06(temperature, duration);
    //                 dispatch(setPage(12));
    //                 dispatch(setProg(11));
    //                 ToastAndroid.show("Countdown started", ToastAndroid.SHORT)
    //             } catch(err) {
    //                 setIsOpen(true);
    //                 console.log(err);
    //             } finally {
    //                 setIsConnecting(false);
    //                 setShouldSendData(false);
    //             }
    //         }
    //     })()
    // }, [shouldSendData, temperature, duration])
    const handleBack = () => {
        dispatch(setPage(10));
        dispatch(setProg(9));
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
    const cancelRef = useRef(null);
    return (
        <VStack width="90%" mx="3" mt="45%" maxW="300px">
            <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen}>
                <AlertDialog.Content>
                    <AlertDialog.Header>Failed to connect</AlertDialog.Header>
                    <AlertDialog.Body>
                        <Alert variant="subtle" status="error">
                            <HStack space={2} flexShrink={1}>
                                <Alert.Icon mt={1} />
                                <Text>Device not responding</Text>
                            </HStack>
                        </Alert>
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group>
                            <Button onPress={handleRetry} leftIcon={<Icon as={<MaterialIcons name="redo" />} />} colorScheme="primary" variant="outline">
                                Retry
                            </Button>
                            <Button onPress={() => setIsOpen(false)} leftIcon={<Icon as={<MaterialIcons name="close" />} />} colorScheme="error" variant="outline">
                                Close
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <Text fontSize="2xl">Duration</Text>
            <PresenceTransition visible initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                <FormControl isRequired isInvalid={durationError.length > 0}>
                    <FormControl.Label _text={{ bold: true }}>
                        Type in duration value
                    </FormControl.Label>
                    <Input keyboardType="numeric" value={duration} leftElement={<Icon as={<MaterialIcons name="timer"/>} size={5} ml={2}/>} onChangeText={handleDuration} size={5} placeholder="in minutes"/>
                    <Box>
                        <FormControl.ErrorMessage>{durationError}</FormControl.ErrorMessage>
                    </Box>
                </FormControl>
                <FormControl isRequired isInvalid={selectedDeviceError.length > 0}>
                    <FormControl.Label _text={{ bold: true }}>
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