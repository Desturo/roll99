import * as api from "../api/index";

class Auth {
  constructor() {
    this.authenticated = false;
  }

  login = async (user, cb) => {
    try {
      const { data } = await api.loginUser(user);

      if (data.loginValid) {
        const result = await api.checkToken();
        result.data === "token valid"
          ? (this.authenticated = true)
          : console.log("invalid login");
        cb();
      }
    } catch (error) {
      console.log(error.passwordValid);
    }
  };

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated = async () => {
    try {
      const data = await api.checkToken();
      if (data.data === "token valid") {
        console.log("valid toekn");
        return true;
      }
    } catch (error) {
      console.log("no valid toekn");
      return false;
    }
  };
}

export default new Auth();
