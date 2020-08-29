import React, {
  useRef,
  useState,
  memo,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import CreateUser from "./CreateUser";
import UserList from "./UserList";
import useInputs from "./hooks/useInputs";

const userListDummy = [
  {
    id: 1,
    username: "velopert",
    email: "public.velopert@gmail.com",
    active: true,
  },
  {
    id: 2,
    username: "tester",
    email: "tester@example.com",
    active: false,
  },
  {
    id: 3,
    username: "liz",
    email: "liz@example.com",
    active: false,
  },
];

const countActiveUsers = (users) => {
  return users.filter((user) => user.active).length;
};

const initialState = {
  users: userListDummy,
};

export const CHANGE_INPUT = "CHANGE_INPUT";
export const CREATE_USER = "CREATE_USER";
export const REMOVE_USER = "REMOVE_USER";
export const TOGGLE_ACTIVE_USER = "TOGGLE_ACTIVE_USER";

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value,
        },
      };
    }
    case CREATE_USER: {
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user),
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    }
    case TOGGLE_ACTIVE_USER: {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, active: !user.active } : user
        ),
      };
    }
    default:
      return state;
  }
};

const UserAppReducer = memo(() => {
  console.log("user app hooks 실행");
  const [{ username, email }, onChange, reset] = useInputs({
    username: "",
    email: "",
  });
  const [state, dispatch] = useReducer(reducer, initialState);

  const { users } = state;
  const nextId = useRef(users.length + 1);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
    };
    dispatch({ type: CREATE_USER, user });
    nextId.current += 1;
    reset();
  }, [username, email]);

  const onRemove = useCallback(
    (id) => () => {
      dispatch({ type: REMOVE_USER, id });
    },
    []
  );

  const onToggle = useCallback(
    (id) => () => {
      dispatch({ type: TOGGLE_ACTIVE_USER, id });
    },
    []
  );

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      <div>활성화된 유저 수 : {count}</div>
      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
});

export default UserAppReducer;
