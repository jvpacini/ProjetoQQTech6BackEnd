const { getUserById } = require('../models/Usuario');

const getUser = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getUser };
