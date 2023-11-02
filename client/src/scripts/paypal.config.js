
const ppConfig = {
    
    clientId: process.env.NODE_ENV === "production" ? process.env.PP_CLIENT_ID : process.env.SB_CLIENT_ID

}

export default ppConfig;
