import * as reducer from './tasks.js';
import actions from '../actions/main';
import * as async from '../actions/async';


describe('tasks', () => {
    it('should return the initial state', () => {
        const initialState = [
            {
                id: '11',
                name: 'Task 11',
            },
             {
                id: '12',
                name: 'Task 12',
            }
        ];

        expect(reducer.tasks(initialState, {})).toEqual(initialState)
    })
})

describe('tasks', () => {
    it('should check the correct work with the action', () => {
    
        const stateBefore = [
            {
                id: '11',
                name: 'Task 11',
            },
             {
                id: '12',
                name: 'Task 12',
            }
        ];

        const newTask = {
            id: '11',
            name: 'New Task',
        };

        const action = async.success(newTask, '', '');
        const stateAfter = [
            {
                id: '11',
                name: 'New Task',
            },
             {
                id: '12',
                name: 'Task 12',
            }
        ];

        deepFreeze(stateBefore);
        expect(
            reducer.tasks(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('taskHandling', () => {
    it('should return the initial state', () => {
        const handlingInitial = {
            id: '',
            editState: '',
            value: ''
        };

        expect(reducer.taskHandling(handlingInitial, {})).toEqual(handlingInitial)
    })
})

describe('taskHandling', () => {
    it('should check the correct work with the action "selectTask" ', () => {
    
        const stateBefore = {
            id: '',
            editState: '',
            value: ''
        };

        const action = actions.selectTask('12');
        const stateAfter = {
            id: '12',
            editState: '',
            value: ''
        };

        deepFreeze(stateBefore);
        expect(
            reducer.taskHandling(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('taskHandling', () => {
    it('should check the correct work with the action "willEditName" ', () => {
    
        const stateBefore = {
            id: '',
            editState: '',
            value: ''
        };

        const action = actions.willEditName('12');
        const stateAfter = {
            id: '12',
            editState: 'willEdit',
            value: ''
        };

        deepFreeze(stateBefore);
        expect(
            reducer.taskHandling(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('taskHandling', () => {
    it('should check the correct work with the action "send" ', () => {
    
        const stateBefore = {
            id: '12',
            editState: '',
            value: ''
        };

        const action = async.send();
        const stateAfter = {
            id: '12',
            editState: 'sending',
            value: ''
        };

        deepFreeze(stateBefore);
        expect(
            reducer.taskHandling(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('taskHandling', () => {
    it('should check the correct work with the action "success" ', () => {
    
        const stateBefore = {
            id: '12',
            editState: 'sending',
            value: ''
        };

        const newTask = {
            id: '11',
            name: 'New Task',
        };

        const action = async.success(newTask, 200, 'OK');
        const stateAfter = {
            id: '11',
            editState: 'success',
            value: 'New Task'
        };

        deepFreeze(stateBefore);
        expect(
            reducer.taskHandling(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('taskHandling', () => {
    it('should check the correct work with the action "endEdit" ', () => {
    
        const stateBefore = {
            id: '11',
            editState: 'dddddddddd',
            value: 'rrrrrrrrr'
        };

        const action = actions.endEdit();
        const stateAfter = {
            id: '',
            editState: '',
            value: ''
        };

        deepFreeze(stateBefore);
        expect(
            reducer.taskHandling(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('sendTask', () => {
    it('should return the initial state', () => {
        const sendTaskInitial = {
            isFetching: false,
            isReceivedOk: true,
            status: {
                value: '',
                statusText: ''
            }
        };


        expect(reducer.sendTask(sendTaskInitial, {})).toEqual(sendTaskInitial)
    })
})

describe('sendTask', () => {
    it('should check the correct work with the action "send" ', () => {
    
        const stateBefore = {
            isFetching: false,
            isReceivedOk: true,
            status: {
                value: '',
                statusText: ''
            }
        };

        const action = async.send();
        const stateAfter = {
            isFetching: true,
            isReceivedOk: false,
            status: {
                value: '',
                statusText: ''
            }
        };

        deepFreeze(stateBefore);
        expect(
            reducer.sendTask(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('sendTask', () => {
    it('should check the correct work with the action "success" ', () => {
    
        const stateBefore = {
            isFetching: true,
            isReceivedOk: false,
            status: {
                value: '',
                statusText: ''
            }
        };

        const action = async.success({}, 200, 'OK');
        const stateAfter = {
            isFetching: false,
            isReceivedOk: true,
            status: {
                value: 200,
                statusText: 'OK'
            }
        };

        deepFreeze(stateBefore);
        expect(
            reducer.sendTask(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})

describe('sendTask', () => {
    it('should check the correct work with the action "failure" ', () => {
    
        const stateBefore = {
            isFetching: true,
            isReceivedOk: false,
            status: {
                value: '',
                statusText: ''
            }
        };

        const action = async.failure( 500, 'Internal Server Error');
        const stateAfter = {
            isFetching: false,
            isReceivedOk: false,
            status: {
                value: 500,
                statusText: 'Internal Server Error'
            }
        };

        deepFreeze(stateBefore);
        expect(
            reducer.sendTask(stateBefore, action)
        ).toEqual(stateAfter);
     
    })
})



// To make obj immutable, freeze each object in obj.
// To do so, we use this function.
function deepFreeze(obj) {
  // Retrieve the property names defined on obj
  var propNames = Object.getOwnPropertyNames(obj);
  // Freeze properties before freezing self
  propNames.forEach(function(name) {
    var prop = obj[name];
    // Freeze prop if it is an object
    if (typeof prop == 'object' && prop !== null)
      deepFreeze(prop);
  });
  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
}
