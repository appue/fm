module.exports = {
    setReponse () {
        const obj = {
            Ack: 'success',
            State: true,
            Time: new Date().getTime()
        };

        return obj;
    }
};
