import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Pressable,
  Modal,
  TextInput,
  Button,FlatList
} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import EncryptedStorage from 'react-native-encrypted-storage';

const {width} = Dimensions.get('window');
const Groups = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');

  const [dialogBoxVisible, setDialogBoxVisible] = useState(false);
  const [groups, setgroups] = useState(false);
  const [collegename, setcollegename] = useState('');
  const [groupname, setgroupname] = useState('');
  const [date, setDate] = useState(new Date()); // Initial date state
  const [show, setShow] = useState(false); // Controls visibility of the picker
  // Controls visibility of the picker
  const [mode, setMode] = useState('date'); // Keeps track of date or time mode

  const [groupDescription, setGroupDescription] = useState('');

  const onpressContinue = () => {
    setDialogBoxVisible(true);
  };
  // Handle date change
  // Function to handle the change event
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios'); // Keep the picker open on iOS
    setDate(currentDate);
  };

  // Function to show DatePicker
  const showDatePicker = () => {
    setMode('date');
    setShow(true);
  };

  // Function to show TimePicker
  const showTimePicker = () => {
    setMode('time');
    setShow(true);
  };
  const [posts, setPosts] = useState([]);


  const handlecreate = async () => {
    if(groupname && groupDescription && date){
      setDialogBoxVisible(false)
    const sessionss = await EncryptedStorage.getItem('secrets_login_safeminds');
    const client_secret_data_api = JSON.parse(sessionss).data;

    console.log(client_secret_data_api, 'secrets_login_safeminds');

    const newPost = {
      id: (posts.length + 1).toString(), // Incrementing the ID (you can use a more robust method in production)
      userid: client_secret_data_api[0].userid,
      createdname: client_secret_data_api[0].name,
      university: client_secret_data_api[0].university,
      group: groupname,
      description: groupDescription,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
      createdat: new Date().toLocaleTimeString(),
    };
    console.log(newPost, 'newPost');
    setgroupname('');
  setGroupDescription('')
    // Add the new post to the existing list of posts
    setPosts([newPost, ...posts]);
    alert('Post Added');
    }else{
alert("Please Enter details")
    }
    
  };

  const handlecreatesend=async(item)=>{
    const sessionss = await EncryptedStorage.getItem('secrets_login_safeminds');
    const client_secret_data_api = JSON.parse(sessionss).data;


    navigation.navigate('Chatting', {
      userKey: item,
      reciverKey: client_secret_data_api[0].userid,
    });
  }
  const renderChatItem = ({item}) => {
    return (
      <Pressable onPress={() => handlecreatesend(item)}>
        <View style={styles.cchat}>
          <Image
            source={require('../../../../assets/images/user1.png')}
            style={{
              width: 40,
              height: 40,
          
          
            }}
          />

          <View style={styles.crightContainer}>
            <View>
            <Text style={styles.cmessage}>{item.university}</Text>
              <Text style={styles.cusername}>{item.group}</Text>

              <Text style={styles.cmessage}>{item.description}</Text>
            </View>
            <View>
              <Text style={styles.ctime}>
              {item.date} | {item.time}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
              All Groups
            </Text>
            <Text></Text>
          </View>
        </View>
      </View>
      {posts ? (
        <>
          <View>
            <FlatList
              data={posts}
              keyExtractor={(item, index) => index.toString()}
              // renderItem={({item}) => <ChatComponent item={item} />}
              renderItem={renderChatItem}
              contentContainerStyle={{paddingBottom: height * 0.2}}
            />
          </View>
        </>
      ) : (
        <>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{color: '#000', fontSize: 15, fontWeight: '800'}}>
              No Groups Available
            </Text>
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={onpressContinue}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../../assets/images/add.png')}></Image>

                <Text style={{color: 'blue', fontSize: 15, fontWeight: '800'}}>
                  Create One
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

 

      <View>
        <Modal
          animationType="slide"
          transparent
          visible={dialogBoxVisible}
          presentationStyle="overFullScreen">
          <View style={styles.viewWrapper}>
            <View style={styles.modalView}>
              <View style={{alignItems: 'center'}}>
                <View style={{width: width * 0.8}}>
                  <Text style={styles.modalsubheading}>Create a New Group</Text>

              
                  <TextInput
                    style={styles.input}
                    placeholder="Enter Streams "
                    placeholderTextColor={'grey'}
                    value={groupname}
                    onChangeText={text => setgroupname(text)}
                  />
                  <TextInput
                    style={[styles.input, {height: 100}]}
                    placeholder="Class Description"
                    placeholderTextColor={'grey'}
                    multiline
                    value={groupDescription}
                    onChangeText={text => setGroupDescription(text)}
                  />

                  <TouchableOpacity
                    style={styles.input}
                    onPress={showDatePicker}>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 12,
                          fontWeight: '700',
                          marginTop: 10,
                        }}>
                        {date ? date.toLocaleDateString() : 'Select Date'}
                      </Text>
                    </View>
                    <View style={{position: 'absolute', top: 5, right: 10}}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../assets/images/date.png')}></Image>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.input}
                    onPress={showTimePicker}>
                    <View>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 12,
                          fontWeight: '700',
                          marginTop: 10,
                        }}>
                        {date ? date.toLocaleTimeString() : 'Select Date'}
                      </Text>
                    </View>
                    <View style={{position: 'absolute', top: 5, right: 10}}>
                      <Image
                        style={{width: 20, height: 20}}
                        source={require('../../../../assets/images/timer1.png')}></Image>
                    </View>
                  </TouchableOpacity>

                  {/* <Text style={styles.text}>
                    Selected Time: {date.toLocaleTimeString()}
                  </Text> */}
                  {/* 
                  <Button title="Pick Date" onPress={showDatePicker} />
                  <Button title="Pick Time" onPress={showTimePicker} /> */}

                  {show && (
                    <DateTimePicker
                      value={date}
                      mode={mode}
                      display="default"
                      onChange={onChange}
                      onTouchCancel={() => setShow(false)} // Optional, in case you need to close on cancel
                    />
                  )}
                  <View style={styles.modalbuttonContainer}>
                    <Pressable
                      style={styles.modalbutton1}
                      onPress={handlecreate}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        CREATE
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.modalbutton2]}
                      onPress={() => setDialogBoxVisible(false)}>
                      <Text
                        style={{color: 'red', fontSize: 12, fontWeight: '700'}}>
                        CANCEL
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              {/* <View style={styles.modalContainer}> */}

              {/* </View> */}
            </View>
          </View>
        </Modal>
      </View>




        <View
          style={{
           
            position: 'absolute',
            bottom: 20,
            right: 10,
          }}>
          <TouchableOpacity onPress={onpressContinue}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../../../assets/images/add.png')}></Image>
          </TouchableOpacity>
        </View>
    
    </SafeAreaView>
  );
};

export default Groups;

const styles = StyleSheet.create({
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    elevation: 5,
    // transform: [{ translateX: -(width * 0.45) }, { translateY: -90 }],
    height: 'auto',
    width: width * 0.9,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  modalbutton: {
    width: '40%',
    height: 45,
    backgroundColor: 'green',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  modaltext: {
    color: '#fff',
  },
  modalContainer: {
    width: '100%',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    elevation: 1,
    height: 400,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    zIndex: 10,
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  modalinput: {
    borderWidth: 2,
    padding: 15,
  },
  modalsubheading: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#000',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#800000',
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.55,
    shadowRadius: 14.78,

    elevation: 22,
    borderRadius: 5,
    color: '#000',
    fontSize: 12,
    fontWeight: '700',
    position: 'relative',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: '#000',
  },
  modalbutton1: {
    width: '40%',
    height: 45,
    backgroundColor: '#800000',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  cchat: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 70,
    marginBottom: 10,
    alignContent: 'center',
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#b3b3b3',
    borderBottomColor:'#800000',
    borderBottomWidth:1

 
  },
  crightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: 10,
  },
  ctime: {
    opacity: 0.5,
    color: '#777',
    fontSize: 10,
  },
  cusername: {
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#000',
  },
  cmessage: {
    fontSize: 10,
    opacity: 0.7,
    color: '#777',
  },
});
