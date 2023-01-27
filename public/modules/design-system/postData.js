export const postData = (url, item, onPostHandler) => {
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Success:', data);
            onPostHandler(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}