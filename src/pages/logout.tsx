import Cookies from 'js-cookie'
export const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nama_user');
    localStorage.removeItem('role_user');
    localStorage.removeItem('username');
    Cookies.remove('token')
    Cookies.remove('nama_user')
    Cookies.remove('role_user')
    Cookies.remove('username')
    window.location.href = '/';
};
