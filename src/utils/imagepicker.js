import ImagePicker from 'react-native-image-crop-picker';

export const camera = (setAvatar) => {
    ImagePicker.openCamera({
        width: 400,
        height: 400,
        cropping: true,
    })
    .then(image => {
       setAvatar(image.path)
    })
    .catch(err=>{
       
    })
};

export const galery = (setAvatar) => {
    ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
    })
    .then(image => {
        setAvatar(image.path)
    })
    .catch(err => {
       
    })
}