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
  console.log("count");
  return users.filter((user) => user.active).length;
};

const UserApp = memo(() => {
  console.log("user app hooks 실행");
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
  });

  const { username, email } = inputs;

  const onChange = useCallback((event) => {
    const {
      target: { name, value },
    } = event;
    setInputs((prevInputs) => {
      return {
        ...prevInputs,
        [name]: value,
      };
    });
  }, []);

  const [users, setUsers] = useState(userListDummy);
  const nextId = useRef(users.length + 1);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId,
      username,
      email,
      active: false,
    };

    setUsers((prevUsers) => prevUsers.concat(user));
    setInputs({
      username: "",
      email: "",
    });
    nextId.current += 1;
  }, [username, email]);

  const onRemove = useCallback(
    (id) => () => {
      console.log("onRemove", id);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    },
    []
  );

  const onToggle = useCallback(
    (id) => () => {
      console.log("onToggle", id);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, active: !user.active } : user
        )
      );
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

export default UserApp;
