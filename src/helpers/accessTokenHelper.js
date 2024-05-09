import axios from 'axios';

const generateAccessToken = async () => {
    try {
      const userJSON = localStorage.getItem("authUser");
      if (!userJSON) {
        return null;
      }
      const user = JSON.parse(userJSON);
      if (!user || !user.refreshToken) {
        return null;
      }
      const response = await axios.post('https://app.packreal.planetmedia.dev/api/access-token', { refreshToken: user.refreshToken });
      if (response && response.accessToken) {
        const updatedUser = { ...user, accessToken: response.accessToken }; 
        localStorage.setItem('authUser', JSON.stringify(updatedUser)); 
        return response.accessToken;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during create access token:', error);
      return false;
    }
  };

export { generateAccessToken };
