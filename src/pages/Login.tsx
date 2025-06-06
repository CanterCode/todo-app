import LoginButton from "../components/LoginButton";

const Login: React.FC = () => {
  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center p-4">
        <h1 className="mb-4">
          Welcome to <span className="text-primary">Cander!</span>
        </h1>
        <p className="lead mb-4">
          A simple, stress-free way to create and manage your tasks.
          <br />
          <strong>Get started by logging in!</strong>
        </p>
        <LoginButton />
        <p className="mt-3 text-muted">Secure login powered by Auth0</p>
      </div>
    </div>
  );
};

export default Login;
