import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-1d081.firebaseio.com/"
});

export default instance;
