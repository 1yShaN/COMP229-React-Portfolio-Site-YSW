// let apiURL = import.meta.env.VITE_APP_APIURL;
// let endpoint = "/auth"

// const signin = async (user)=>{
//     try {
//         let response = await fetch(apiURL + endpoint + "/signin", {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(user)
//         })
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     }
// }

// export { signin }