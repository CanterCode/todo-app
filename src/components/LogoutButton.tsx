import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton: React.FC = () => {

    const { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated && (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <button
                    className="btn btn-primary"
                    onClick={() => logout({ logoutParams: { returnTo: `${window.location.origin}/login` } })}
                >
                    Log Out
                </button>
            </div>
        )
    );
};

export default LogoutButton;