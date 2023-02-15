import { Alert, Box, Button, Center, FormControl, HStack, Icon, NativeBaseProvider, PresenceTransition, Select, Text, VStack } from "native-base"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from "@react-native-async-storage/async-storage";
import BluetoothSerial from "react-native-bluetooth-serial";
import { setDevices } from "../redux/actions/setDevices";
import { setPreferredDevice } from "../redux/actions/setPreferredDevice";

export const Settings = () => {
    const devices = useSelector(store => store.autoTherm.devices)
    const preferredDevice = useSelector(store => store.autoTherm.preferredDevice);
    const [selectedDevice, setSelectedDevice] = useState(preferredDevice);
    const [selectedDeviceError, setSelectedDeviceError] = useState("")
    const [isScanning, setIsScanning] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const onSelectDevice = (device) => {
        console.log(device)
        setSelectedDevice(device)
        setShowSuccessMessage(false);
    }
    const dispatch = useDispatch();
    const scanDevices = async () => {
        const devices = await BluetoothSerial.discoverUnpairedDevices();
        const alreadyPaired = await BluetoothSerial.list();
        dispatch(setDevices([...devices, ...alreadyPaired]));
    }
    const handleScan = async () => {
        setIsScanning(true);
        setShowSuccessMessage(false);
        await scanDevices();
        setIsScanning(false);
    }
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const handleSave = async () => {
        try {
            setIsSaving(true);
            setShowSuccessMessage(false);
            await AsyncStorage.setItem("preferred_device", selectedDevice)
            dispatch(setPreferredDevice(selectedDevice));
            setShowSuccessMessage(true);
        } catch {

        } finally {
            setIsSaving(false);
        }
    }
    const [isBluetoothEnabled, setIsBluetoothEnabled] = useState(false);
    const [isEnablingBluetooth, setIsEnablingBluetooth] = useState(false);
    const enableBluetooth = async () => {
        try {
            setIsEnablingBluetooth(true);
            const _isBluetoothEnabled = await BluetoothSerial.requestEnable();
            if (_isBluetoothEnabled) {
                setIsBluetoothEnabled(true);
                const pairedDevices = await BluetoothSerial.list();
                dispatch(setDevices(pairedDevices));
            }
        } catch (err) {
            setIsBluetoothEnabled(false);
        } finally {
            setIsEnablingBluetooth(false);
        }
    }
    useEffect(() => {
        (async () => {
            const _isBluetoothEnabled = await BluetoothSerial.isEnabled();
            setIsBluetoothEnabled(_isBluetoothEnabled);
            BluetoothSerial.on('bluetoothDisabled', () => {
                setIsBluetoothEnabled(false);
            })
            BluetoothSerial.on('bluetoothEnabled', () => {
                setIsBluetoothEnabled(true);
            })
        })()
    }, [])
    useEffect(() => {
        (async () => {
            if (isBluetoothEnabled) {
                const pairedDevices = await BluetoothSerial.list();
                dispatch(setDevices(pairedDevices));
            }
        })();
    }, [isBluetoothEnabled])
    return (
        <NativeBaseProvider>
            <VStack width="90%" mx="3" mt="10%">
                {
                    isBluetoothEnabled &&
                    <>
                        <Text fontSize="2xl">Preferred device</Text>
                        <PresenceTransition visible initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { duration: 250 } }}>
                            <FormControl isRequired isInvalid={selectedDeviceError.length > 0}>
                                <FormControl.Label _text={{ bold: true }}>
                                    Select device
                                </FormControl.Label>
                                {/* <Text fontSize="xs">Currently preferred: </Text>
                        <Text>{devices.filter(device => device.address == selectedDevice)[0]?.name}</Text> */}
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
                            <Button
                                mt="2"
                                colorScheme="primary"
                                isDisabled={isScanning || isSaving}
                                isLoading={isScanning}
                                isLoadingText={"Scan"}
                                leftIcon={<Icon as={<MaterialIcons name="search" />} ml={2} />}
                                variant="outline"
                                onPress={handleScan}
                            >Scan</Button>
                            <Button
                                mt="2"
                                leftIcon={<Icon as={<MaterialIcons name="save" />} />}
                                colorScheme="primary"
                                variant="outline"
                                isDisabled={isScanning || isSaving}
                                onPress={handleSave}
                                isLoading={isSaving}
                                isLoadingText="Save"
                            >Save</Button>
                        </PresenceTransition>
                    </>
                }
                {
                    showSuccessMessage && isBluetoothEnabled &&
                    <Alert variant="left-accent" mt="10%" w="auto" status="success">
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} justifyContent="space-between">
                                <HStack space={2} flexShrink={1}>
                                    <Alert.Icon mt="1" />
                                    <Text fontSize="xs" color="coolGray.800">
                                        {devices.filter(device => device.address == selectedDevice)[0]?.name} has been set as preferred device
                                    </Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Alert>
                }
                {
                    !isBluetoothEnabled &&
                    <>
                        <Alert variant="left-accent" mt="10%" w="auto" status="error">
                            <VStack space={2} flexShrink={1} w="100%">
                                <HStack flexShrink={1} space={2} justifyContent="space-between">
                                    <HStack space={2} flexShrink={1}>
                                        <Alert.Icon mt="1" />
                                        <Text fontSize="xs" color="coolGray.800">
                                            AutoTherm requires bluetooth enabled
                                        </Text>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </Alert>
                        <Button isLoading={isEnablingBluetooth} isLoadingText="Enable Bluetooth" isDisabled={isEnablingBluetooth} onPress={enableBluetooth} mt={5} variant="subtle" colorScheme="info" leftIcon={<Icon as={<MaterialIcons name="bluetooth" />} />}>
                            Enable Bluetooth
                        </Button>
                    </>
                }
            </VStack>
        </NativeBaseProvider>
    )
}