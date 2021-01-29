class User {
    isLoggedIn = () => this.get('isLoggedIn') === 'true';
  
    set = (key, value) => localStorage.setItem(key, value);
    setArr = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  
    get = key => this.getLocalStorage(key);
  
    getLocalStorage = key => {
      const ret = localStorage.getItem(key);
      if (ret) {
        return ret;
      }
      return null;
    };
  
    // login = async (email, password) => {
    login = async () => {  
      this.set('isLoggedIn', true);
      return true;
    };
  
    logout = async () => {
      if (this.isLoggedIn()) {
        this.set('isLoggedIn', false);        
      }
    };
  }
  
  export default new User();