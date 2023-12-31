import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    // 🔑 We also need to apply the jwt library's decode() method to our token. 
    // It looks like the expiration time, as set by the server, is being retrieved and stored in a variable decoded:
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    // 🔑 Next, we look at the code used to compare the expiration date to the current time. For the comparison to work, the time units we use must be the same. 
    // Because decoded.exp is in seconds and the Date.now() method returns a value in milliseconds, we divide the value that Date.now() returns by 1000. 
    // Then a valid comparison can be made:
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
