import { useEffect, useState } from "react";
import Post from "./components/Post";
import Feed from "./components/Feed";

import { useGetUsersQuery } from "./service/users";

function App() {
  const userApi = useGetUsersQuery();
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (userApi.isSuccess) {
      setUserId(userApi.data[0]._id);
    }
  }, [userApi.isFetching]);

  return (
    <div
      id="container"
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        gap: "40px",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>
        {userId?.length ? (
          <>
            <Post userId={userId} />
            <Feed userId={userId} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default App;
