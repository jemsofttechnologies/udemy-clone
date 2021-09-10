export const uploadImage = async (req, res) => {
	try {
		console.log(req.body);
	} catch (err) {
        console.log(err)
		return res.status(404).send("Error!. Please try again");
	}
};
