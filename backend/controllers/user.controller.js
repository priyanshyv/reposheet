import User from "../models/user.model.js";

export const getUserProfileAndRepos = async (req, res) => {
	const { username } = req.params;
	try {
		// 60 requests per hour, 5000 requests per hour for authenticated requests
		 //as of now without authentication we can make 60 request per hours but if we make this authenticated then we can able to make this 5000(Rate limit for REST API)
          //for this what we have to do ki github pei jaakey go to setting and then developer option and after that personal access token then go with clasic one to take the token
		// https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28
		const userRes = await fetch(`https://api.github.com/users/${username}`, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		}
        );

		const userProfile = await userRes.json();

		const repoRes = await fetch(userProfile.repos_url, {
			headers: {
				authorization: `token ${process.env.GITHUB_API_KEY}`,
			},
		});
		const repos = await repoRes.json();

		res.status(200).json({ userProfile, repos });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const likeProfile = async (req, res) => {
	try {
		const { username } = req.params;
		//user vo kudh hai jo like karra hai 
		const user = await User.findById(req.user._id.toString());
		console.log(user, "auth user");
		//yei vo hai jisey hamey like karna hai
		const userToLike = await User.findOne({ username });

		if (!userToLike) {
			return res.status(404).json({ error: "User is not a member" });
		}

		//user ke database mei dekhre hai ki user already hai ki nahi hai if yess then we are saying that user is already liked
		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({ error: "User already liked" });
		}

		//like karra hai
		userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
		user.likedProfiles.push(userToLike.username);

		//this is little bit slow than the promise.all method to run this paralel[chatgpt this to understand this more]
		// await userToLike.save();
		// await user.save();
		await Promise.all([userToLike.save(), user.save()]);

		res.status(200).json({ message: "User liked" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const getLikes = async (req, res) => {
	try {
		const user = await User.findById(req.user._id.toString());
		res.status(200).json({ likedBy: user.likedBy });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};