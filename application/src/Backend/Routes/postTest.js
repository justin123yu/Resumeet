function parseFrontEnd(data) {
    if (!data) return null;
    if (typeof data !== "object") return null;
    return {
      username: data.username,
      date: data.date,
      comment: data.comment,
      email: data.email,
    };
  }

  module.exports = { parseFrontEnd };