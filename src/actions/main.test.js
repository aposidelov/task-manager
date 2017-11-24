import {
    SELECT_TASK,
    WILL_EDIT_NAME,
    END_EDIT
} from './types';
import actions from './main';




describe('selectTask', () => {
    it('should create an action to select a task', () => {
        const id = '11';
        const expectedAction = {
            type: SELECT_TASK,
            id
        };
        expect(actions.selectTask(id)).toEqual(expectedAction)
    })
})

describe('willEditName', () => {
    it('should create an action to start edit name', () => {
        const id = '11';
        const expectedAction = {
            type: WILL_EDIT_NAME,
            payload: {
                editState: 'willEdit',
                id
            }
        };
        expect(actions.willEditName(id)).toEqual(expectedAction)
    })
})

describe('endEdit', () => {
    it('should create an action to end edit', () => {
        const expectedAction = {
            type: END_EDIT,
            payload: {
                id: '',
                value: '',
                editState: ''
            }
        };
        expect(actions.endEdit()).toEqual(expectedAction)
    })
})