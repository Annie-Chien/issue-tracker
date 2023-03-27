import { useEffect, useState } from "react";

import "./App.css";

const CLIENT_ID = "8941d914efd99b65ea28";

function App() {
  const [rerender, setRerender] = useState(false);
  const [user, setUser] = useState<any>();

  //Request a user's GitHub identity
  const loginWithGithub = () => {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" +
        CLIENT_ID +
        "&scope=public_repo"
    );
  };

  const getUserData = async () => {
    await fetch("http://localhost:4000/getUserData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data));
  };

  const getRepoData = async () => {
    await fetch("http://localhost:4000/getRepoData", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
    console.log("get repo data!!");
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");

    //localStorage
    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch("http://localhost:4000/getAccessToken?code=" + codeParam, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setRerender(!rerender);
            }
          });
      }
      getAccessToken();
    }
  }, []);

  return (
    <div className="App">
      {localStorage.getItem("accessToken") ? (
        <>
          <h1>Hello</h1>
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              setRerender(!rerender);
            }}
          >
            log out
          </button>
          <button onClick={getUserData}>Get userdata</button>
          <p>{user?.login}</p>
          <img src={user?.avatar_url} style={{ width: "50px" }} />
          <button onClick={getRepoData}>Repo</button>
        </>
      ) : (
        <>
          <h1>You are not logged in</h1>
          <button onClick={loginWithGithub}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
