import { routes } from '@/constants/routes';
import { useAuthStore } from '@/hooks/use-auth';
import { verifyOtp } from '@/services/user';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyAuth = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { setIsAuthenticated, setAuthToken } = useAuthStore();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const email = query.get('email');
        const code = query.get('code');

        if (email && code) {
            const verifyToken = async () => {
                try {
                    const { token } = await verifyOtp({ body: { token: code, email } })
                    const expirationDate = Date.now() + (14 * 24 * 60 * 60 * 1000); // 2 weeks

                    localStorage.setItem('auth-data', JSON.stringify({ token, expirationDate }));
                    setAuthToken(token);
                    setIsAuthenticated(true);

                    navigate(routes.home);
                } catch (error) {
                    console.error('Verification failed:', error);
                }
            };
            verifyToken();
        }
    }, [location.search, navigate, setAuthToken, setIsAuthenticated]);

    return null;
};

export default VerifyAuth;
