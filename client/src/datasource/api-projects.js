// // import { getToken } from "../components/auth/auth-helper";
// // let apiURL = import.meta.env.VITE_APP_APIURL;
// // let endpoint = "/api/projects/"

// // const list = async ()=>{
// //     try {
// //         let response = await fetch(apiURL + endpoint, {
// //             method: 'GET',
// //             headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //                 'Authorization': 'Bearer ' + getToken()
// //             }
// //         })
// //         return await response.json();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// // const create = async (project)=>{
// //     try {
// //         let response = await fetch(apiURL + endpoint, {
// //             method: 'POST',
// //             headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //                 'Authorization': 'Bearer ' + getToken()
// //             },
// //             body: JSON.stringify(project)
// //         })
// //         return await response.json();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// // const remove = async (id)=>{
// //     try {
// //         let response = await fetch(apiURL + endpoint + id, {
// //             method: 'DELETE',
// //             headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //                 'Authorization': 'Bearer ' + getToken()
// //             }
// //         })
// //         return await response.json();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// // const update = async (project, id)=>{
// //     try {
// //         let response = await fetch(apiURL + endpoint + id, {
// //             method: 'PUT',
// //             headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //                 'Authorization': 'Bearer ' + getToken()
// //             },
// //             body: JSON.stringify(project)
// //         })
// //         return await response.json();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// // const readOne = async (id)=>{
// //     try {
// //         let response = await fetch(apiURL + endpoint + id, {
// //             method: 'GET',
// //             headers: {
// //                 'Accept': 'application/json',
// //                 'Content-Type': 'application/json',
// //                 'Authorization': 'Bearer ' + getToken()
// //             }
// //         })
// //         return await response.json();
// //     } catch (error) {
// //         console.log(error);
// //     }
// // }

// // export {list, create, remove, update, readOne}

// let apiURL = import.meta.env.VITE_APP_APIURL;
// let endpoint = "/api/projects/";


// const list = async () => {
//     try {
//         let response = await fetch(apiURL + endpoint);
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//         return { success: false, message: "API error" }; // ✅ FIX
//     }
// };

// const create = async (project) => {
//     try {
//         let response = await fetch(apiURL + endpoint, {
//             method: 'POST',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(project)
//         });
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

// const remove = async (id) => {
//     try {
//         let response = await fetch(apiURL + endpoint + id, {
//             method: 'DELETE',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         });
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

// const update = async (project, id) => {
//     try {
//         let response = await fetch(apiURL + endpoint + id, {
//             method: 'PUT',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(project)
//         });
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

// const readOne = async (id) => {
//     try {
//         let response = await fetch(apiURL + endpoint + id, {
//             method: 'GET',
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json'
//             }
//         });
//         return await response.json();
//     } catch (error) {
//         console.log(error);
//     }
// };

// export { list, create, remove, update, readOne };

let apiURL = import.meta.env.VITE_APP_APIURL;
let endpoint = "/api/projects/";

// ✅ GET ALL
const list = async () => {
    try {
        const response = await fetch(`${apiURL}${endpoint}`);
        return await response.json();
    } catch (error) {
        console.log("List error:", error);
        return { success: false, message: "API error (list)" };
    }
};

// ✅ CREATE
const create = async (project) => {
    try {
        const response = await fetch(`${apiURL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        return await response.json();
    } catch (error) {
        console.log("Create error:", error);
        return { success: false, message: "API error (create)" };
    }
};

// ✅ DELETE
const remove = async (id) => {
    try {
        const response = await fetch(`${apiURL}${endpoint}${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.log("Delete error:", error);
        return { success: false, message: "API error (delete)" };
    }
};

// ✅ UPDATE
const update = async (project, id) => {
    try {
        const response = await fetch(`${apiURL}${endpoint}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        return await response.json();
    } catch (error) {
        console.log("Update error:", error);
        return { success: false, message: "API error (update)" };
    }
};

// ✅ READ ONE
const readOne = async (id) => {
    try {
        const response = await fetch(`${apiURL}${endpoint}${id}`);
        return await response.json();
    } catch (error) {
        console.log("ReadOne error:", error);
        return { success: false, message: "API error (readOne)" };
    }
};

export { list, create, remove, update, readOne };