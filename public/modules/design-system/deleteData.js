export const deleteData = (url, onDeleteHandler) => {
    fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.json())
        .then((data) => {
            console.log('Success:', data);
            onDeleteHandler(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}