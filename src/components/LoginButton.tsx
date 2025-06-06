import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC = () => {

    const { loginWithRedirect, isAuthenticated } = useAuth0();

    return (
        !isAuthenticated && (
            <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => loginWithRedirect()}
                >
                    Log In
                </button>
            </div>
        )
    );
};

export default LoginButton;