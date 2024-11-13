import React, {useState, useLayoutEffect, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ProgressSteps,
  ProgressStep,
  StyleSheet,
  TouchableOpacity,
  Image,
  Linking,
  BackHandler,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Switch,
  SafeAreaView,
  Pressable,
  TextInput,
  Button,
  ImageBackground,
} from 'react-native';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');

const Chatting = ({navigation}) => {
    const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const [messages, setMessages] = useState([]);
const [newMessage, setNewMessage] = useState('');
const scrollViewRef = useRef();

const renderChatItem = ({item}) => {
  return (
    <View style={{alignItems: 'flex-start', marginBottom: 10}}>
      <Text style={{fontSize: 16, color: '#000'}}>{item.text}</Text>
    </View>
  );
}

  return (
    <ImageBackground
      source={require('../../../../assets/images/plane_line.jpg')}
      resizeMode="stretch"
      style={{
        height: '100%',
        width: '100%',

        alignItems: 'center',
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1}}>
      <View style={{alignItems: 'center', backgroundColor: '#99ff99'}}>
        <View style={{width: width * 0.95, marginTop: 10, marginBottom: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{width: 30, height: 30}}
                source={require('../../../../assets/images/back_button.png')}></Image>
            </TouchableOpacity>
            <Text style={{color: '#000', fontSize: 12, fontWeight: '800'}}>
              Chat
            </Text>
            <Text></Text>
          </View>
        </View>
      </View>

      {messages && (
          <>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }>
              <FlatList
                data={messages}
                renderItem={renderChatItem}
                keyExtractor={(item, index) => index.toString()}
              />
            </ScrollView>
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}>
          <View
            style={{
              width: width * 0.95,
              height: height * 0.065,
              borderWidth: 1,
              borderRadius: 10,
              borderColor: '#ccc',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 9,
              },
              shadowOpacity: 0.5,
              shadowRadius: 12.35,

              elevation: 19,
            }}>
            <TextInput
              value={newMessage}
              onChangeText={text => setNewMessage(text)}
              placeholder="Type a message..."
              style={{flex: 1, color: '#000'}}
              placeholderTextColor="#000"
            />
            <TouchableOpacity >
              <View
                style={{
                  backgroundColor: '#f2f2f2',
                  width: 75,
                  height: 45,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: 'blue', fontWeight: '600'}}>Send</Text>
                {/* <Image
                  style={{width: 30, height: 30}}
                  source={require('../../../assets/images/send_red.png')}></Image> */}
              </View>
            </TouchableOpacity>
          </View>
          {/* <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: 'red',
            width: width * 0.2,
            height: height * 0.065,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            marginLeft: 10,
          }}>
          <View>
            <Text style={{color: '#fff'}}>Send</Text>
          </View>
        </TouchableOpacity> */}
          {/* <View>
        <Button style={{backgroundColor:'red'}} title="Send" onPress={sendMessage} />
        </View> */}
        </View>
      </SafeAreaView>
      </ImageBackground>
  )
}

export default Chatting

const styles = StyleSheet.create({})