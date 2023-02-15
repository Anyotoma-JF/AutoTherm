import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AutoTherm } from "./src/components/AutoTherm";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Settings } from "./src/components/Settings";
import {NavigationContainer} from "@react-navigation/native";
import { Box, Button, Center, Divider, Heading, HStack, Icon, NativeBaseProvider, Pressable, Text, VStack } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useState } from "react";
const Drawer = createDrawerNavigator()
const AutoThermDrawer = ({navigation}) => {
  const [selectedScreen, setSelectedScreen] = useState("Home");
  const handlePress = (screen) => {
    navigation.navigate(screen);
    setSelectedScreen(screen);
  } 
  const renderItem = (screen) => {
    return (
      <Pressable px="5" py="3" rounded="md" bg={selectedScreen === screen ? "rgba(6, 182, 212, 0.1)" : "transparent"} onPress={()=>handlePress(screen)}>
      <HStack space="7" alignContent="center">
        <Icon as={<MaterialIcons name={screen[0].toLowerCase() + screen.slice(1)}/>} size="lg" color={selectedScreen === screen ? "primary.500" : "gray.500"}/>
        <Text fontWeight="500" color={selectedScreen === screen ? "primary.500" : "gray.500"}>{screen}</Text>
      </HStack>
    </Pressable>
    );  
  }
  return (
    <NativeBaseProvider>
      <Center>
        <HStack>
          <Text fontSize="30" color="primary.500">A</Text>
          <Text fontSize="30" color="warmGray.300">uto</Text>
          <Text fontSize="30" color="primary.500">T</Text>
          <Text fontSize="30" color="warmGray.300">herm</Text>
        </HStack>
        <Divider />
        {/* <Heading fontSize="30" color="primary.500">AutoTherm</Heading> */}
      </Center>
      {renderItem("Home")}
      {renderItem("Settings")}
      <Box mt="auto">
        <Center>
          <Text mt="auto" color="gray.300">Version 4.0.1</Text>
        </Center>
      </Box>
    </NativeBaseProvider>
  )
}
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Drawer.Navigator drawerContent={(props)=><AutoThermDrawer {...props}/>} initialRouteName="home">
       <Drawer.Screen name="Home" component={AutoTherm} />
       <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;