import { useAuth0 } from "@auth0/auth0-react";

const Login: React.FC = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <button
                    className="btn btn-primary"
                    onClick={() => loginWithRedirect()}
                >
                    Log In
                </button>
            </div>
        )
    );
};

export default Login;