import axios from './axios/axio.service';

const userService = {
    loginService: async(path, ctxt) => {
        try{
            let response = await axios.post(path, ctxt);
            return {
                status: response.status,
                data: response.data
            }
        }
        catch(err){
            console.log(`Error at user.login.service : ${err}`)
        }
    },

    signupService: async(path, ctxt) => {
        try{
            let response = await axios.post(path, ctxt)
            return {
                status: response.status,
                data: response.data
            }
        }
        catch(err){
            console.log(`Error at user.signup.service : ${err}`)
        }
    },

    getUserData: async(path, ctxt) => {
        let response = await axios.get(path);
        return{
            status: response.status,
            data: response.data
        }
    }
}

export default userService;