import action from './main';
import { SEND_DATA, SENT_SUCCESS, SENT_FAILURE } from './types';


//Perhaps this will need to be updated
const url = 'https://www.mocky.io/v2/5185415ba171ea3a00704eed';

const put = data => {
    const stringifiedData = JSON.stringify(data);
    return {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: stringifiedData
    }
};

export const send = () => {
    return {
        type: SEND_DATA,
        payload: {
            isFetching: true,
            isReceivedOk: false,
            status: {
                value: '',
                statusText: ''
            }
        }
    }
};

export const success = ({id, name}, status, statusText) => {
    return {
        type: SENT_SUCCESS,
        payload: {
            id,
            name,
            isFetching: false,
            isReceivedOk: true,
            status: {
                value: status,
                statusText,
            }
        }
    };
};

export const failure = (status, statusText) => {
    return {
        type: SENT_FAILURE,
        payload: {
            isFetching: false,
            isReceivedOk: false,
            status: {
                value: status,
                statusText
            }
        }
    };
};


export const sendToServer = data => dispatch => {

    dispatch(send());
    return fetch(url, put(data))
    .then(response => {
        const {status, statusText} = response;
        if (status === 200 || status === 204){
            dispatch(success(data, status, statusText));
            dispatch(action.endEdit());
            return Promise.resolve();
        } else {
            dispatch(failure(status, statusText));
            dispatch(action.endEdit());
            return Promise.reject(new Error(statusText));
        }
    })
    .catch(err => {
        console.log(err.message);
    }); 

};

