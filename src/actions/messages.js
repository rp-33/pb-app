export const addToMessage = (payload,page) => ({
    type: 'ADD_MESSAGE',
    payload,
    page
});

export const removeToMessage = (payload) => ({
    type: 'REMOVE_MESSAGE',
    payload
});

export const updateToMessage = (_id,message,user) => ({
    type: 'UPDATE_MESSAGE',
    _id,
    message,
    user
});