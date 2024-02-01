var URL = `${process.env.REACT_APP_API_URL}`;

const API_KEY = "api";
var requests = "";

try {
    requests = {
        Register : `${URL}/${API_KEY}/auth/register`,
        Login : `${URL}/${API_KEY}/auth/login`,
        Logout : `${URL}/${API_KEY}/auth/logout`,

        //USER
        GetAllUsers : `${URL}/${API_KEY}/user`,
        GetUserById : `${URL}/${API_KEY}/user/{id}`,
        GetUserRolesByUserId : `${URL}/${API_KEY}/user/get-user-roles/{id}`,
        PostUserRolesByUserId : `${URL}/${API_KEY}/user/add-user-roles/{id}`,
        RemoveUserRolesByUserId : `${URL}/${API_KEY}/user/remove-user-roles/{id}`,

        //USER PREFERENCES
        GetAll : `${URL}/${API_KEY}/user-preferences/`,
        GetUserPreferencesByUserId : `${URL}/${API_KEY}/user-preferences/get-all-from-user/{id}`,
        PostUserPreferencesByUserId : `${URL}/${API_KEY}/user-preferences/create-preference/{count}`,

        //USER KEYWORDS
        GetUserKeywordsByUserId : `${URL}/${API_KEY}/user-keywords/get-all-from-user/{id}`,
        PostUserKeywordsByUserId : `${URL}/${API_KEY}/user-keywords/add-user-keyword/{userId}/{keywordId}`,
        DeleteUserKeywordsById : `${URL}/${API_KEY}/user-keywords/delete-by-id/{id}`,
        DeleteUserKeywordByKeywordName : `${URL}/${API_KEY}/user-keywords/delete-by-name/{id}`,
        DeleteAllUserKeywordsByUserId : `${URL}/${API_KEY}/user-keywords/delete-all-from-user/{id}`,

        //KEYWORDS
        GetAllKeywords : `${URL}/${API_KEY}/keywords`,
        GetKeywordById : `${URL}/${API_KEY}/keywords/{id}`,
        GetKeywordByName : `${URL}/${API_KEY}/keywords/get-one-by-name/{name}`,
        PostKeyword : `${URL}/${API_KEY}/keywords/create`,
        DeleteKeywordById : `${URL}/${API_KEY}/keywords/delete/{id}`,
        DeleteKeywordByName : `${URL}/${API_KEY}/keywords/delete-by-name/{name}`,

        //User Crypto List
        GetUserCryptoListByUserId : `${URL}/${API_KEY}/user-crypto-list/get-all-from-user/{id}`,
        PostUserCryptoListByUserId : `${URL}/${API_KEY}/user-crypto-list/{userId}/{cryptoId}`,
        DeleteUserCryptoListByUserId : `${URL}/${API_KEY}/user-crypto-list/delete-by-id/{id}`,

        //Crypto Coins
        GetAllCryptoCoins : `${URL}/${API_KEY}/crypto-coins/?sort={sort}&filter={filter}&limit={limit}&page={page}`,
        GetCryptoCoinById : `${URL}/${API_KEY}/crypto-coins/`,
        GetCryptoCoinByName : `${URL}/${API_KEY}/crypto-coins/get-one-by-name/{name}`,
        PostCryptoCoin : `${URL}/${API_KEY}/crypto-coins/create`,
        DeleteCryptoCoinById : `${URL}/${API_KEY}/crypto-coins/delete/{id}`,

        //Popular Crypto Coins
        GetAllPopularCryptoCoins : `${URL}/${API_KEY}/popular-crypto`,
        PostPopularCrypto : `${URL}/${API_KEY}/popular-crypto/create`,
        DeletePopularCryptoById : `${URL}/${API_KEY}/popular-crypto/delete-by-id/{id}`,
        
        // ConfigCount
        GetConfigCount :`${URL}/${API_KEY}/user/count/{id}`, 
        UpdateConfigCount :`${URL}/${API_KEY}/user/count/{id}`,
        
        // UserRole
        GetUserRole : `${URL}/${API_KEY}/user-roles/get-role-from-user/{id}`,
        
        apiUrl : URL
    };
  } catch (error) {}
  
  export default requests;
  