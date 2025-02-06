import {  jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      throw "not logged in";
    }
    return jwtDecode(token)
  }

  loggedIn() {
    return this.getToken();
  }
  
  // isTokenExpired(token: string) {
  //   // TODO: return a value that indicates if the token is expired
  // }

  getToken(): string | null {
    return localStorage.getItem('token')
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken)
    window.location.assign('/')
    return idToken;
  }

  logout() {
    localStorage.removeItem('token')
    window.location.assign('/')
  }
}

export default new AuthService();
