import ApiClient from '../ApiClient';
import { API_GATEWAY} from '../constant' 

export const Login = (email,password) => {
    const data = {"email" : email,"password" : password}
    return ApiClient.post(`${API_GATEWAY}/users/login`,data);
}
