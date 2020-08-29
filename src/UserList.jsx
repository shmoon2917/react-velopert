import React, { memo, useEffect, useContext, useCallback } from "react";
import { UserDispatch, TOGGLE_ACTIVE_USER, REMOVE_USER } from "./App";

const User = memo(({ user }) => {
  console.log("user hooks 실행");
  const { dispatch } = useContext(UserDispatch);

  const onToggle = useCallback(
    (id) => () => {
      dispatch({ type: TOGGLE_ACTIVE_USER, id });
    },
    []
  );

  const onRemove = useCallback((id) => () => {
    dispatch({ type: REMOVE_USER, id });
  });

  return (
    <div>
      <b
        style={{ cursor: "pointer", color: user.active ? "green" : "black" }}
        onClick={onToggle(user.id)}
      >
        {user.username}
      </b>
      &nbsp;
      <span>({user.email})</span>
      <button onClick={onRemove(user.id)}>delete</button>
    </div>
  );
});

const UserList = memo(({ users }) => {
  console.log("userList hooks 실행");
  return (
    <div>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </div>
  );
});

export default UserList;
