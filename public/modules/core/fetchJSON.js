const MethodType = {
    PUT: "PUT",
    POST: "POST",
    DELETE: "DELETE",
}

const fetchJSON = ({url, method, body}) => fetch(url, {
    method,
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
}).then(res => res.json())

export const putJSONData = ({url, body}) => fetchJSON({
    url,
    method: MethodType.PUT,
    body,
})

export const postJSONData = ({url, body}) => fetchJSON({
    url,
    method: MethodType.POST,
    body,
})

export const deleteJSONData = ({url}) => fetchJSON({
    url,
    method: MethodType.DELETE,
})