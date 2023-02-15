import { Alert, Box, Button, Center, HStack, Icon, IconButton, NativeBaseProvider, Progress, StatusBar, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Page1 } from "./Page1";
import { Page2 } from "./Page2";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { Page3 } from "./Page3";
import { Page4 } from "./Page4";
import { Page5 } from "./Page5";
import { Page6 } from "./Page6";
import { Page7 } from "./Page7";
import { Page8 } from "./Page8";
import { Page9 } from "./Page9";

import BluetoothSerial from "react-native-bluetooth-serial";
import { Page10 } from "./Page10";
import { setDevices } from "../redux/actions/setDevices";
import { Page11 } from "./Page11";
import { Page12 } from "./Page12";
import { Page13 } from "./Page13";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setPreferredDevice } from "../redux/actions/setPreferredDevice";
import { setCurrentTemperature } from "../redux/actions/setCurrentTemperature";

export const AutoTherm = ({navigation}) => {
    const page = useSelector(store => store.autoTherm.page)
    const prog = useSelector(store => store.autoTherm.prog)

    const store = useSelector(store => store);
    useEffect(() => {
        console.log(store)
    }, [store])

    const [isBluetoothEnabled, setIsBluetoothEnabled] = useState();
    useEffect(() => {
        (async () => {
            const _isBluetoothEnabled = await BluetoothSerial.isEnabled();
            setIsBluetoothEnabled(_isBluetoothEnabled);
            BluetoothSerial.on('bluetoothEnabled', () => {
                setIsBluetoothEnabled(true);
            })
            BluetoothSerial.on('bluetoothDisabled', () => {
                setIsBluetoothEnabled(false);
            })
        })()
    }, [])
    useEffect(()=>{
        (async ()=>{
            if (isBluetoothEnabled) {
                const pairedDevices = await BluetoothSerial.list();
                dispatch(setDevices(pairedDevices));
            }
        })();
    }, [isBluetoothEnabled])
    const dispatch = useDispatch();
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
    useEffect(()=>{
        (async ()=>{
            const preferredDevice = await AsyncStorage.getItem("preferred_device");
            dispatch(setPreferredDevice(preferredDevice));
        })();
    }, [])
    const [_currentTemperature, _setCurrentTemperature] = useState("");
    BluetoothSerial.on('read', async ()=>{
        const datum = await BluetoothSerial.read();
        _setCurrentTemperature(_currentTemperature+datum);
        if (datum == ";") {
            dispatch(setCurrentTemperature(_currentTemperature));
            _setCurrentTemperature("");
        }
    });
    return (
        <NativeBaseProvider>
            {/* <Center>
                <StatusBar bg="#3700B3" barStyle="light-content" />
                <Box safeAreaTop />
                <HStack px="1" py="1" justifyContent="space-between" alignItems="center" w="100%">
                    <HStack alignItems="center">
                        <IconButton icon={<Icon size="xl" as={MaterialIcons} name="menu" color="dark" />} />
                        <Icon ml={20} size="xl" as={MaterialIcons} name="home" />
                        <Text ml={2} fontSize="20">
                            Home
                        </Text>
                    </HStack>
                </HStack>
            </Center> */}
            <Progress rounded="0" colorScheme="emerald" value={prog} max={13} size="xs" />
            <Center>
                {isBluetoothEnabled &&
                    <>
                        {
                            page === 1 && <Page1 />
                        }
                        {
                            page == 2 && <Page2 />
                        }
                        {
                            page == 3 && <Page3 />
                        }
                        {
                            page == 4 && <Page4 />
                        }
                        {
                            page == 5 && <Page5 />
                        }
                        {
                            page == 6 && <Page6 />
                        }
                        {
                            page == 7 && <Page7 />
                        }
                        {
                            page == 8 && <Page8 />
                        }
                        {
                            page == 9 && <Page9 />
                        }
                        {
                            page == 10 && <Page10 />
                        }
                        {
                            page == 11 && <Page11 />
                        }
                        {
                            page == 12 && <Page12 />
                        }
                        {
                            page == 13 && <Page13 />
                        }
                    </>
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
                                            AutoTherm requires enabling bluetooth
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
            </Center>
        </NativeBaseProvider>
    );
}