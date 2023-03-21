export const backendURL = "/backend";

export const register = (credential) => {
    const registerUrl = `${backendURL}/register`;

    return fetch(registerUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential)
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to register.");
        }
    });
};

export const login = (credential) => {
    const loginUrl = `${backendURL}/authenticate`;

    return fetch(loginUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credential)
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to log in.");
        }
        return response.json();
    });
};

export const savePlan = (req) => {
    const auth = localStorage.getItem("Token");
    const savePlanUrl = `${backendURL}/plans`;

    return fetch(savePlanUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth}`
        },
        body: JSON.stringify(req)
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to save plan.");
        }
    });
};

export const getPlans = () => {
    const auth = localStorage.getItem("Token");
    const getPlanUrl = `${backendURL}/plans`;

    return fetch(getPlanUrl, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${auth}`
        },
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to save plan.");
        }
        return response.json();
    });
};

export const deletePlan = (planId) => {
    const auth = localStorage.getItem("Token");
    const deletePlanUrl = `${backendURL}/plans/${planId}`;

    return fetch(deletePlanUrl, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${auth}`
        }
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to delete plan.");
        }
    });
};

export const uploadPlanPost = (req) => {
    const auth = localStorage.getItem("Token");
    const uploadPlanPostUrl = `${backendURL}/posts`;

    return fetch(uploadPlanPostUrl, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${auth}`
        },
        body: req
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to upload post.");
        }
    });
};

export const searchPlanPost = (req) => {
    const auth = localStorage.getItem("Token");
    const searchPlanPostUrl = `${backendURL}/posts?keyword=${req}`;

    return fetch(searchPlanPostUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${auth}`
        }
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to search post.");
        }
        return response.json();
    });
};

export const getPlanPost = (req) => {
    const auth = localStorage.getItem("Token");
    const getPlanPostUrl = `${backendURL}/posts/plan/${req}`;

    return fetch(getPlanPostUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${auth}`
        }
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to get post.");
        }
        return response.json();
    });
};

export const getPlanPostByUser = () => {
    const auth = localStorage.getItem("Token");
    const getPlanPostUrl = `${backendURL}/posts/user`;

    return fetch(getPlanPostUrl, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${auth}`
        }
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to get post.");
        }
        return response.json();
    });
};

export const deletePlanPost = (req) => {
    const auth = localStorage.getItem("Token");
    const deletePlanPostUrl = `${backendURL}/posts/${req}`;

    return fetch(deletePlanPostUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${auth}`
        }
    }).then(response => {
        if (response.status !== 200) {
            throw Error("Fail to delete post.");
        }
    });
};