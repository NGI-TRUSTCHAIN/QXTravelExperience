import QXLogo from "@/assets/images/QX_Logo.png";
import AuthCard from "@/components/custom/auth/auth-card";
import { useAuthStore } from "@/hooks/use-auth";
import React from "react";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuthStore();

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);


    return (
        <>
            <div className="w-full h-full min-h-screen grid md:grid-cols-2 bg-sidebar">
                <div className="col-span-1 flex justify-center items-center">
                    <img src={QXLogo} alt="qx-logo" className="w-[300px] object-contain" />
                </div>
                <div className="col-span-1 flex justify-center items-center">
                    <AuthCard />
                </div>
            </div>
        </>
    );
};

export default AuthPage;