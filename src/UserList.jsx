import React, { memo, useEffect } from "react";

const User = memo(({ user, onRemove, onToggle }) => {
  console.log("user hooks 실행");
  useEffect(() => {
    console.log("mount or update", user);
    return () => {
      console.log("unmount", user);
    };
  }, [user]);

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

const UserList = memo(({ users, onRemove, onToggle }) => {
  console.log("userList hooks 실행");
  return (
    <div>
      {users.map((user) => (
        <User
          user={user}
          key={user.id}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
});

export default UserList;
