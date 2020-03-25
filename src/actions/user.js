export const setAuth = (payload)=>({
    type : 'AUTH_USER',
	payload
});

export const setLogout = ()=>({
    type : 'LOGOUT_USER'
});

export const setAvatar = (payload)=>({
    type: 'AVATAR_USER',
    payload
});

export const setFamily = (payload)=>({
    type: 'Family_USER',
    payload
});

export const setDisplayName = (payload)=>({
    type: 'DISPLAYNAME_USER',
    payload
});

export const setBiography = (payload)=>({
    type: 'BIOGRAPHY_USER',
    payload
});


export const setDistance = (payload)=>({
    type: 'DISTANCE_USER',
    payload
});

export const setSex = (payload)=>({
    type: 'SEX_USER',
    payload
});

export const setNotifications = (payload)=>({
    type: 'NOTIFICATIONS_USER',
    payload
});

export const setStatus = (payload)=>({
    type: 'STATUS_USER',
    payload
});

export const setHobbie = (payload)=>({
    type: 'ADD_HOBBIE',
    payload
});

export const deleteHobbie = (payload)=>({
    type: 'DELETE_HOBBIE',
    payload
});

export const deletePicture = (payload)=>({
    type: 'DELETE_PICTURE',
    payload
});

export const deleteFamily = (payload)=>({
    type: 'DELETE_FAMILY',
    payload
});