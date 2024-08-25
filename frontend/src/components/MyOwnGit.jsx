import React, { useState } from 'react'
import Copycode from './Copycode';

const MyOwnGit = () => {


    return (
        <div style={{ minHeight: '100vh', overflowY: 'auto' }} className="p-6 bg-glass rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Setting Up a Git Server on AWS</h1>
        
        <h2 className="text-xl font-semibold mb-2">1. Create an AWS Account</h2>
        <p className="mb-4">
          Before you begin, ensure that you have an AWS account. If you don't have one, you can create it by visiting the 
          <a href="https://aws.amazon.com/" className="text-blue-500 underline"> AWS sign-up page</a>.
        </p>
  
        <h2 className="text-xl font-semibold mb-2">2. Launch an EC2 Instance</h2>
        <p className="mb-4">
          To host your Git server, you’ll need to launch an EC2 instance on AWS.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Instance Type</strong>: Choose an instance type based on your needs. While the <code>t2.micro</code> instance is free-tier eligible, it's advisable to go with <code>t2.medium</code> or <code>t2.large</code> for better performance, especially if you anticipate moderate to heavy usage.</li>
        </ul>
  
        <h2 className="text-xl font-semibold mb-2">3. Create a Key Pair</h2>
        <p className="mb-4">
          To securely connect to your instance, you'll need to create an SSH key pair.
        </p>
        <ul className="list-disc list-inside mb-4">
          <li><strong>Key Pair</strong>: During the instance launch, AWS will prompt you to create or select a key pair. If you create a new key pair, you'll receive a <code>.pem</code> file (e.g., <code>git.pem</code>). Store this file securely, as it will be required to SSH into your instance.</li>
        </ul>
  
        <h2 className="text-xl font-semibold mb-2">4. Connect to Your Instance</h2>
        <p className="mb-4">
          Once your instance is running, you can connect to it using SSH. Below are the steps to do this from your local machine:
        </p>
        <ol className="list-decimal list-inside mb-4">
          <li>Open your terminal (Linux/Mac) or command prompt (Windows).</li>
          <li>Navigate to the directory where your <code>.pem</code> file is stored.</li>
          <li>Change the permissions of your key pair file to ensure it is not publicly viewable:</li>
          <Copycode inputText={'chmod 400 git.pem'}/>
          <li>Connect to your EC2 instance using the following command:</li>
          <Copycode inputText="ssh -i 'git.pem' ec2-user@your-ec2-instance-public-ip" />
          <li>Replace <Copycode inputText="git.pem" /> with the path to your key pair file if it's not in the current directory.</li>
          <li>Replace <Copycode inputText="your-ec2-instance-public-ip" /> with the public IP address of your EC2 instance.</li>
        </ol>
        <p>This command will open a secure connection to your server, allowing you to begin configuring your Git server on AWS.</p>
        <br /><br />
      <h1 className="text-2xl font-bold mb-4">Setting Up a Git Server on Ubuntu</h1>

      <h2 className="text-xl font-semibold mb-2">1. Configure Security Group</h2>
      <p className="mb-4">
        Go to your cloud provider's security group settings and add a rule to allow incoming traffic on TCP port 
        <code>1234</code> from anywhere (both <code>IPv4</code> and <code>IPv6</code>).
      </p>

      <h2 className="text-xl font-semibold mb-2">2. Create a Git User</h2>
      <p className="mb-4">
        Run the following commands to create a new user and switch to that user:
      </p>
      <Copycode inputText="sudo adduser git" />
      <Copycode inputText="sudo su git" />

      <h2 className="text-xl font-semibold mb-2">3. Install Required Software</h2>
      <p className="mb-4">
        Install Ruby and GitWeb using these commands:
      </p>
      <Copycode inputText="sudo apt install ruby" />
      <Copycode inputText="sudo apt install gitweb" />

      <h2 className="text-xl font-semibold mb-2">4. Set Up SSH Access</h2>
      <p className="mb-4">
        Configure SSH access by following these steps:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li>Create the <code>.ssh</code> directory and set up the authorized keys:
          <Copycode inputText="cd /home/git" />
          <Copycode inputText="mkdir .ssh" />
          <Copycode inputText="cd .ssh/" />
          <Copycode inputText="vim authorized_keys" />
          <p>Paste your SSH key into the file, then save and exit with <code>:wq</code>.</p>
        </li>
      </ol>

      <h2 className="text-xl font-semibold mb-2">5. Create and Initialize the Git Repository</h2>
      <p className="mb-4">
        Run the following commands to create a new Git repository and set permissions:
      </p>
      <ol className="list-decimal list-inside mb-4">
        <li>Create the repository directory:
          <Copycode inputText="cd /var/lib/git/" />
          <Copycode inputText="mkdir abc.git" />
        </li>
        <li>Change the ownership of the directory:
          <Copycode inputText="sudo chown -R git:git /var/lib/git" />
        </li>
        <li>Initialize the repository:
          <Copycode inputText="cd /var/lib/git/abc.git" />
          <Copycode inputText="git init --bare" />
        </li>
      </ol>

      <p className="mb-4">Your Git server is now set up and ready to use. Enjoy!</p>
        <br /><br />
        <h1 className="text-2xl font-bold mb-4">Setting Up Your Git Server</h1>
      
      <p className="mb-4">
        Don't worry! By following the instructions and using the provided code, setting up your Git server will be straightforward. After completing all the steps, refer to the image below to see where you need to change the URL.
      </p>
      <img src="https://res.cloudinary.com/dzdl5vmxt/image/upload/v1724588453/Screenshot_2024-08-25_at_5.50.22_PM_b43hpl.png" alt="Update URL Instructions" className="mb-4" />
      <img src="https://res.cloudinary.com/dzdl5vmxt/image/upload/v1724588596/Screenshot_2024-08-25_at_5.51.13_PM_q4qnqt.png" alt="Update URL Instructions" className="mb-4" />
    
      <p className="mb-4">
        Change the URL to <code>http://(your public instance IP address):1234</code>.
      </p>
      
      <a 
        href="http://13.233.155.204:1234" 
        className="bg-blue-500 text-white p-2 rounded" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        Enjoy Your Git Server
      </a>
      </div>
      
    );
}

export default MyOwnGit
