export const putData = (url, item, onPutHandler) => {
    fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Success:', data);
            onPutHandler(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}