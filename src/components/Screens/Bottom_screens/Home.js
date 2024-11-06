import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import uuid from 'react-native-uuid'; // For generating anonymous IDs
import RBSheet from 'react-native-raw-bottom-sheet';
import Tooltip from 'react-native-walkthrough-tooltip';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {useRef, useState} from 'react';
const {width} = Dimensions.get('window');
const {height} = Dimensions.get('window');
const Home = ({navigation}) => {
  const {width} = Dimensions.get('window');
  const {height} = Dimensions.get('window');
  const [message, setmessage] = useState('');
  const refRBSheet = useRef();
  const [showTooltip1, setShowTooltip1] = useState(false);

  React.useEffect(() => {
    // Check if tooltips have been shown before
    AsyncStorage.getItem('tooltipsShownHome').then(value => {
      if (!value) {
        // First time user, show tooltips
        setShowTooltip1(true);
        AsyncStorage.setItem('tooltipsShownHome', 'true');
      }
    });
  }, []);

  const generateUserId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit ID
  };
  const [posts, setPosts] = useState([
    {
      id: '1',
      content:
        'XYZ Company has great work-life balance, but could improve management transparency.',
      category: 'Company',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '2',
      content:
        'ABC High School provides excellent education but needs to update its facilities.',
      category: 'School',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '3',
      content:
        'John Doe (Manager at ABC Ltd) is supportive, but micromanages the team.',
      category: 'Manager',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '4',
      content:
        'DEF University has an amazing campus, but the administration is slow to respond to student concerns.',
      category: 'University',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '5',
      content:
        'GHI Corporation offers excellent career growth opportunities, but their benefits package could be better.',
      category: 'Company',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '6',
      content:
        'LMN School has an inclusive environment, but more extracurricular activities would be beneficial.',
      category: 'School',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '7',
      content:
        'Sarah Lee (Manager at XYZ Inc) fosters innovation, but often sets unrealistic deadlines.',
      category: 'Manager',
      likes: 0,
      likedByUser: false,
    },
    {
      id: '8',
      content:
        'PQR College has a fantastic engineering department, but housing options for students are limited.',
      category: 'University',
      likes: 0,
      likedByUser: false,
    },
  ]);
  const userId = generateUserId(); // Generates a 6-digit random ID
  const [newPostContent, setNewPostContent] = useState('');

  // const userId = uuid.v4(); // This can be replaced by your logged-in user ID if available
  const toggleLike = postId => {
    setPosts(prevPosts => {
      return prevPosts.map(post => {
        if (post.id === postId) {
          // Toggle the like state
          const likedByUser = !post.likedByUser;
          const likes = likedByUser ? post.likes + 1 : post.likes - 1;

          return {
            ...post,
            likes: likes > 0 ? likes : 0, // Ensure likes don't go below 0
            likedByUser,
          };
        }
        return post;
      });
    });
  };

  const addNewPost = () => {
    if (newPostContent.trim() === '') {
      Alert.alert('Error', 'Please enter some feedback before submitting.');
      return;
    }

    refRBSheet.current.close();
    // Create a new post object
    const newPost = {
      id: (posts.length + 1).toString(), // Incrementing the ID (you can use a more robust method in production)
      content: newPostContent,
      category: 'General', // You can enhance this by letting users select categories
      likes: 0,
      likedByUser: false,
    };

    // Add the new post to the existing list of posts
    setPosts([newPost, ...posts]);
    alert('Post Added');
    // Clear the TextInput
    setNewPostContent('');
  };

  // Render each post item
  const renderItem = ({item}) => (
    <View style={{alignItems: 'center'}}>
      <View style={{width: width * 0.95}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 20, height: 20, borderRadius: 20}}
              source={require('../../../assets/images/profile.png')}></Image>
            <View style={{marginLeft: 10}}>
              <Text style={styles.t_text}>User{userId}</Text>
              <Text style={styles.t2_text}>{'22-10-2024'}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              style={{width: 20, height: 20, borderRadius: 20}}
              source={require('../../../assets/images/dots.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.postCategory}>Category: {item.category}</Text>
          <Text style={styles.postContent}>{item.content}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => toggleLike(item.id)}
              style={styles.likeButton}>
              {/* <Text>{item.likes}</Text> */}
              {item.likedByUser ? (
                <>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../assets/images/like.png')}></Image>
                </>
              ) : (
                <>
                  <Image
                    style={{width: 20, height: 20}}
                    source={require('../../../assets/images/dislike.png')}></Image>
                </>
              )}
              <Text
                style={[styles.likeText, item.likedByUser && {color: 'blue'}]}>
                {item.likedByUser ? 'Unlike' : 'Like'} ({item.likes})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          alignItems: 'center',
          backgroundColor: '#99ff99',

          borderBottomWidth: 1,
          borderBottomColor: '#ccc',
        }}>
        <View style={{width: width * 0.95}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 5,
              marginTop: 10,
            }}>
               <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{width: 35, height: 35}}
                source={require('../../../assets/images/safemind_logo.png')}></Image>
              <Text style={{fontSize: 15, fontWeight: '800', color: '#000'}}>
                SafeMind
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{marginRight: 30}}
                onPress={() => navigation.navigate('Groups')}>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../../assets/images/group_plus.png')}></Image>
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../../../assets/images/bell.png')}></Image>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginTop: 20}}>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 100}}
        />
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}>
        <Tooltip
          // style={{width: 40}}
          animated={true}
          // arrowSize={{width: 16, height: 8}}
          backgroundColor="rgba(0,0,0,0.5)"
          isVisible={showTooltip1}
          content={
            <Text style={{color: '#000', fontSize: 12}}>
              Click here to post your thought
            </Text>
          }
          placement="top"
          onClose={async () => {
            setShowTooltip1(false);
          }}>
          <TouchableOpacity onPress={() => refRBSheet.current.open()}>
            <Image
              style={{width: 50, height: 50}}
              source={require('../../../assets/images/add.png')}></Image>
          </TouchableOpacity>
        </Tooltip>
      </View>

      <View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(0,0,0,.6)',
            },
            draggableIcon: {
              backgroundColor: '#000',
              width: '10%',
            },
            container: {
              ...styles.bottom12,
              height: '96%',
            },
          }}>
          <SafeAreaView style={{backgroundColor: '#fff', alignItems: 'center'}}>
            <View style={{width: width * 0.9}}>
              <View>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: width * 0.95,
                      padding: 0,
                      marginBottom: 15,
                      marginTop: 15,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                          onPress={() => refRBSheet.current.close()}>
                          <Image
                            source={require('../../../assets/images/back.png')}
                            style={{width: 30, height: 30}}
                          />
                        </TouchableOpacity>

                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '800',
                            color: '#000',
                          }}>
                          {' '}
                          Feedback Post
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{marginTop: 0}}>
                <View
                  style={{
                    alignItems: 'center',
                    position: 'relative',
                    justifyContent: 'center',
                    marginTop: 0,
                  }}>
                  <View style={styles.inputContainer}>
                    <Text
                      style={{color: '#000', marginBottom: 20, marginTop: 20}}>
                      Enter Message
                    </Text>
                    <View style={styles.inputView2}>
                      <TextInput
                        style={styles.TextInput2}
                        onChangeText={message => setNewPostContent(message)}
                        placeholder="Enter Message"
                        placeholderTextColor="#8b9cb5"
                        keyboardType="default"
                        // ref={passwordInputRef}
                        // onSubmitEditing={Keyboard.dismiss}
                        multiline
                        underlineColorAndroid="#f000"

                        // value={password}
                      />
                      <View></View>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      style={styles.loginBtn}
                      onPress={addNewPost}>
                      <Text style={styles.loginText}> Send Message</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  postContainer: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  postContent: {
    fontSize: 14,
    marginBottom: 10,
    color: '#000',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 10,
    // backgroundColor: '#f0f0f0',
    // borderRadius: 5,
  },
  likeText: {
    fontSize: 14,
    color: '#333',
  },
  t_text: {
    color: '#000',
    fontSize: 12,
  },
  t2_text: {
    color: 'grey',
    fontSize: 9,
  },
  inputContainer: {
    position: 'relative',
    // width: '100%',
    // marginBottom: 20,
  },
  TextInput2: {
    height: 90,
    flex: 1,
    padding: 10,
    // marginLeft: 10,
    color: '#000',
    fontWeight: '600',
  },
  inputView2: {
    borderColor: '#000',
    borderRadius: 10,
    // width: "70%",
    // height: 45,
    width: width * 0.95,
    height: height * 0.15,
    shadowColor: '#000',
    marginBottom: 15,
    backgroundColor: '#fff',
    // alignItems: "center",

    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},

    elevation: 13,
    color: '#000',
    fontWeight: '600',
    borderWidth: 1,
    borderColor: '#000',
  },
  loginBtn: {
    width: width * 0.95,
    height: height * 0.05,
    borderRadius: 10,

    alignItems: 'center',
    justifyContent: 'center',
    marginTop: width * 0.01,
    backgroundColor: 'blue',
  },
  loginText: {
    color: '#fff',
  },
});
