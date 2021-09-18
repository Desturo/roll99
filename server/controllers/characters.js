export const getCharacters = async (req, res) => {
    try {
        //fetch from database
        console.log('fetching from database');
    } catch (error) {
        res.status(404).json({ message: error });
    }
}
