class Reply {
    static success(message, data = null) {
        return { success: true, message, data };
    }

    static error(message, error = null) {
        return { success: false, message, error };
    }
}

module.exports = Reply;
