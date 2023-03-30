const CLIENT_ID = '8941d914efd99b65ea28';

const LoginPage = () => {
  //Request a user's GitHub identity
  const loginWithGithub = () => {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=' +
        CLIENT_ID +
        '&scope=public_repo'
    );
  };

  return (
    <div className="App">
      <h1>Github Issue Tracker</h1>
      <button onClick={loginWithGithub}>Login</button>
    </div>
  );
};

export default LoginPage;
