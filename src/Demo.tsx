import {useState, useRef} from 'react';
import {View, Text, PixelRatio, Pressable, Dimensions} from 'react-native';
import type {SkImage} from '@shopify/react-native-skia';
import {makeImageFromView, Canvas, Image} from '@shopify/react-native-skia';
import Apple from './Apple.tsx';

const pd = PixelRatio.get();

const width = Dimensions.get('window').width;

const Demo = () => {
  // Create a ref for the view you'd like to take a snapshot of
  const ref = useRef<View>(null);
  // Create a state variable to store the snapshot
  const [image, setImage] = useState<SkImage | null>(null);
  // Create a function to take the snapshot
  const onPress = async () => {
    // Take the snapshot of the view
    const snapshot = await makeImageFromView(ref);
    setImage(snapshot);
  };
  return (
    <View style={{flex: 1}}>
      <Pressable
        ref={ref}
        collapsable={false}
        style={{width, height: width}}
        onPress={onPress}>
        <Text>This is a React Native View</Text>
        <Apple />
      </Pressable>
      {image && (
        <Canvas style={{width, height: width, backgroundColor: 'red'}}>
          <Image
            image={image}
            x={0}
            y={0}
            width={image.width() / pd}
            height={image.height() / pd}
          />
        </Canvas>
      )}
    </View>
  );
};

export default Demo;
