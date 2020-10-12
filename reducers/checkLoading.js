const checkLoadingReducer = (isloading = true, action) => {
   switch (action.type) {
     case "CHECK_LOADING":
       return { ...isloading, isloading: action.payload };

     default:
       return isloading;
   }
 };

export default checkLoadingReducer;


