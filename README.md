# Sprint Challenge: Authentication - Dad Jokes

This challenge allows you to practice the concepts and techniques learned over the past week and apply them in a concrete project. This Sprint explored Authentication. During this Sprint, you studied Introduction to Authentication, Using Sessions and Cookies, Using JSON Web Tokens (JWT), and Client-side Authentication. In your challenge this week, you will demonstrate proficiency by creating an application that will give you a list of random dad jokes, as long as you are authorized.

- **DISCLAIMER** Authentication is a subject that many people spend a large amount time throughout their careers obtaining knowledge over. This is not something we expect you to have a mastery over, rather, we're preparing you to be able have an intelligent conversation about the subject.

## Instructions

**Read these instructions carefully. Understand exactly what is expected _before_ starting this Sprint Challenge.**

This is an individual assessment. All work must be your own. Your challenge score is a measure of your ability to work independently using the material covered through this sprint. You need to demonstrate proficiency in the concepts and objectives introduced and practiced in preceding days.

You are not allowed to collaborate during the Sprint Challenge. However, you are encouraged to follow the twenty-minute rule and seek support from your PM and Instructor in your cohort help channel on Slack. Your work reflects your proficiency w/ Authentication and your command of the concepts and techniques in the Introduction to Authentication, Using Sessions and Cookies, Using JSON Web Tokens (JWT), and Client-side Authentication modules.

You have three hours to complete this challenge. Plan your time accordingly.

## Commits

Commit your code regularly and meaningfully. This helps both you (in case you ever need to return to old code for any number of reasons and your project manager.

## Description

In this challenge, you build a real wise-guy application. _Dad jokes_ are all the rage these days. Currently the application is trying to receive some `Dad Jokes`, however we are currently locked out.

Implement an User Authentication System in order to access the jokes from the Jokes API that we want to consume. You will need to ensure that your system uses `bcrypt` for hashing and encrypting your user's passwords, as well as JWT for handling the authorization aspect of the app.

## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. What is the purpose of using sessions?

   Some data on the internet—email, bank, and social media accounts for example—needs to be made available only to authorized users. A server needs to know how to respond to a request for such data, and yet the internet is stateless, and thus there can be no global “such-and-such-user-logged-in” variable. Sessions are one way for a server to track whether a particular user (really a particular device) is authorized to receive particular data. A user can provide login credentials to the server once, and then that user can access the restricted data for some length of time set by the server. Often session length is reset by user activity, so that a session can last an indefinite amount of time as long as the user remains active.

2. What does bcrypt do to help us store passwords in a secure manner?

   bcrypt hashes passwords—turns the password into a _seemingly_ random string—so that even if the credentials storage database were compromised, the password data would be unreadable. Notably, **hashing** a password does not mean **encrypting** the password. Encryption one part of a two-way process: If data thieves had access to the decryption key along with the encrypted passwords, they would then be able to read the passwords. Hashing, however, is a one-way process—there is no magic key to “unhash” hashed data.

3. What does bcrypt do to slow down attackers?

   Hashed passwords are not _impossible_ to decipher, however. There is perhaps no data security measure that, given enough time, a hacker couldn’t thwart. The clause “given even time” is important here. bcrypt can be configured to hash a password many times over—a process requiring such computational power that it may take full second or more to complete. While I don’t understand the details, this means that each cracking attempt that a hacker makes will take roughly the same amount of time. Since a given password make take billions or trillions of attempts to crack, lengthening the time of each attempt from a few microseconds to over a full second can have a significant impact on the total amount of time required. A password that might’ve taken hours or days to crack could instead take years. With any reasonable password update schedule, the cracked password should be useless by that time.

4. What are the three parts of the JSON Web Token?

   **Header**: Typically includes the type of token (here JWT) and the signing algorithm that was used in the signature part.
   **Payload**: This is the _content_ of the token, which is made up of “claims”. This is where information about the server request is stored—for example the user who is making the request and perhaps other small amounts of data.
   **Signature**: Using the signing algorithm designated in the header along with a secret, the payload is “signed”. If something in the payload were altered while being transmitted between client and server, the signature would no longer match the payload, and the app would know that the token had been tampered with.

## Project Set Up

Follow these steps to set up and work on your project:

- [ ] Create a forked copy of this project.
- [ ] Add PM as collaborator on Github.
- [ ] Clone your OWN version of Repo (Not Lambda's by mistake!).
- [ ] Create a new Branch on the clone: git checkout -b `<firstName-lastName>`.
- [ ] Implement the project on this Branch, committing changes regularly.
- [ ] Push commits: git push origin `<firstName-lastName>`.

Follow these steps for completing your project:

- [ ] `cd` into the root of the project and run `yarn` to install dependencies.
- [ ] Once you have your `node_modules` go ahead and run `yarn server` or `npm run server` to start your node server.
- [ ] Submit a Pull-Request to merge <firstName-lastName> Branch into master (student's Repo).
- [ ] Add your Project Manager as a Reviewer on the Pull-request
- [ ] PM then will count the HW as done by merging the branch back into master.

Helpful Tip on Testing this Project:

- [ ] **TEST** this project using **`POSTMAN`**.

## Minimum Viable Product

- [ ] Implement the `register` function inside `/config/routes.js`.
- [ ] Implement the `login` function inside `/config/routes.js`.
- [ ] Use JSON Web Tokens for authentication.

**Note** The migrations and a database with empty users is already included

- [ ] Add the authentication related code. If everything is done correctly, visiting `/api/jokes` should return a list of jokes.

## Stretch Problem: Build a front end to interface with your User Auth System

- Add a React client that connects to your API and has pages for `Sign Up`, `Sign In` and showing a list of `Jokes`.
- Once you have the functionality down, style it!
