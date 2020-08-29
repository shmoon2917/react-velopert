import React, { memo, useMemo, useReducer, createContext } from 'react';
import CreateUser from './CreateUser';
import UserList from './UserList';
import { userListDummy } from './dummy/UserDummy';
import produce from 'immer';

const countActiveUsers = (users) => {
  return users.filter((user) => user.active).length;
};

const initialState = {
  users: userListDummy,
};

export const CHANGE_INPUT = 'CHANGE_INPUT';
export const CREATE_USER = 'CREATE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const TOGGLE_ACTIVE_USER = 'TOGGLE_ACTIVE_USER';

const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER: {
      return produce(state, (draft) => {
        draft.users.push(action.user);
      });
    }
    case REMOVE_USER: {
      return produce(state, (draft) => {
        const index = draft.users.findIndex((user) => user.id === action.id);
        draft.users.splice(index, 1);
      });
    }
    case TOGGLE_ACTIVE_USER: {
      return produce(state, (draft) => {
        const user = draft.users.find((user) => user.id === action.id);
        user.active = !user.active;
      });
    }
    default:
      return state;
  }
};

// UserDispatch 라는 이름으로 내보내줍니다.
export const UserDispatch = createContext(null);

const App = memo(() => {
  console.log('user app hooks 실행');

  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div className="App">
      <UserDispatch.Provider value={dispatch}>
        <CreateUser />
        <div>활성화된 유저 수 : {count}</div>
        <UserList users={users} />
      </UserDispatch.Provider>
    </div>
  );
});

export default App;
