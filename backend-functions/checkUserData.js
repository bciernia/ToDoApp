const setCorrectData = (userDeadline) => {
    const date = new Date(userDeadline);

    if(date >= Date.now()){
        return date.toLocaleDateString();
    }
    return new Date(Date.now()).toLocaleDateString();
}

module.exports = {
    setCorrectData,
}