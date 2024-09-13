# Reposheet

Welcome to the Reposheet project! This application allows you to manage and interact with GitHub user profiles and repositories using a modern tech stack.
[Live Demo](https://reposheet.onrender.com/)




<img width="1695" alt="Screenshot 2024-09-13 at 2 47 41 PM" src="https://github.com/user-attachments/assets/6a5d772c-73a0-4e06-8012-01e443a6b40a">


[Video Youtube](https://youtu.be/AROVBbZM3A0)

## Features

- **Tech Stack:** MERN (MongoDB, Express.js, React, Node.js) + TailwindCSS + GitHub API + AWS
- **Authentication & Authorization:** Passport.js with GitHub Auth
- **Fetch GitHub User Profiles and Repositories**
- **Client-side Repository Filtering**
- **In-depth Learning on Authentication**
- **Error Handling:** Both server-side and client-side
- **Deployment Ready**

## Setup

Before running the application, you'll need to configure the environment variables. Create a `.env` file in the root directory of the project with the following contents:

```dotenv
PORT=5000
MONGO_URI=your_mongo_database_uri
GITHUB_API_KEY=your_github_api_key
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
CLIENT_BASE_URL=your_client_base_url
```
## Custom Git Server Setup on AWS

If you want to create your own Git server using AWS, follow these instructions:

### Launch an EC2 Instance:
Choose an instance type and configure it according to your needs.
Ensure that you allow HTTP and SSH traffic in your security group.

### Install Git:
SSH into your EC2 instance.
Install Git with sudo apt-get install git (for Debian-based systems) or the appropriate command for your Linux distribution.

### Configure Git Server:
Create a new user for the Git server: sudo adduser git.
Set up SSH access for the user.

### Initialize a bare Git repository:
bash
```
mkdir /home/git/myrepo.git
cd /home/git/myrepo.git
git init --bare
```

## Push to Your Git Server:
#Add the remote to your local repository:

```
git remote add origin ssh://git@your-aws-instance-ip/home/git/myrepo.git
```

### Push your code:
```
git push origin master
```
### Set Up Git Web Interface:
You may choose to set up a web interface like GitWeb or GitLab for easier repository management.
Error Handling

The application includes error handling both on the server and client sides. Ensure that you handle exceptions and errors gracefully to provide a smooth user experience.

### Deployment

For deployment, you can use various methods depending on your preferred hosting platform. If you're using AWS, you can deploy using services like Elastic Beanstalk, ECS, or EC2. Make sure to configure your environment variables and security settings appropriately for production.

### Contributing

Feel free to contribute to the project by submitting pull requests or opening issues. Your feedback and contributions are highly appreciated!
