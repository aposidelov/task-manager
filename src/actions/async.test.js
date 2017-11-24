import {
    SEND_DATA,
    SENT_SUCCESS,
    SENT_FAILURE
} from './types';
import * as actions from './async';



describe('send', () => {
    it('should create an action to start sending data', () => {
        const expectedAction = {
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
        expect(actions.send()).toEqual(expectedAction)
    })
})


describe('success', () => {
    it('should create an action to set success status of sending data', () => {
        const data = {
            id: 11,
            name: 'Task11'
        };
        const status = 200;
        const statusText = 'OK';

        const expectedAction = {
            type: SENT_SUCCESS,
            payload: {
                id: data.id,
                name: data.name,
                isFetching: false,
                isReceivedOk: true,
                status: {
                    value: status,
                    statusText,
                }
            }
        }
        expect(actions.success(data, status, statusText)).toEqual(expectedAction)
    })
})


describe('failure', () => {
    it('should create an action to set failure status of sending data', () => {
        const status = 500;
        const statusText = 'Internal Server Error';
        const expectedAction = {
            type: SENT_FAILURE,
            payload: {
                isFetching: false,
                isReceivedOk: false,
                status: {
                    value: status,
                    statusText,
                }
            }
        }
        expect(actions.failure(status, statusText)).toEqual(expectedAction)
    })
})