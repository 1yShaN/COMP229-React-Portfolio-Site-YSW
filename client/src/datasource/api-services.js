
import { getToken } from '../components/auth/auth-helper';

let apiURL = import.meta.env.VITE_APP_APIURL;
let endpoint = "/api/services/";

const buildHeaders = (includeContentType = false) => {
    const headers = {};

    if (includeContentType) {
        headers['Content-Type'] = 'application/json';
    }

    const token = getToken();
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    return headers;
};

// GET ALL
const list = async () => {
    try {
        const response = await fetch(`${apiURL}${endpoint}`);
        return await response.json();
    } catch (error) {
        console.log("List error:", error);
        return { success: false, message: "API error (list)" };
    }
};

// CREATE
const create = async (service) => {
    try {
        const response = await fetch(`${apiURL}${endpoint}`, {
            method: 'POST',
            headers: buildHeaders(true),
            body: JSON.stringify(service)
        });
        return await response.json();
    } catch (error) {
        console.log("Create error:", error);
        return { success: false, message: "API error (create)" };
    }
};

// DELETE
const remove = async (id) => {
    try {
        const response = await fetch(`${apiURL}${endpoint}${id}`, {
            method: 'DELETE',
            headers: buildHeaders()
        });
        return await response.json();
    } catch (error) {
        console.log("Delete error:", error);
        return { success: false, message: "API error (delete)" };
    }
};

// UPDATE
const update = async (service, id) => {
    try {
        const response = await fetch(`${apiURL}${endpoint}${id}`, {
            method: 'PUT',
            headers: buildHeaders(true),
            body: JSON.stringify(service)
        });
        return await response.json();
    } catch (error) {
        console.log("Update error:", error);
        return { success: false, message: "API error (update)" };
    }
};

// READ ONE
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