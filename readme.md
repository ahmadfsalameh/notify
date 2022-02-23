<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.svg" width="100" height="100">
  </a>

  <h3 align="center">Notify - Issue Tracker</h3>

  <p align="center">
    Notify is an issue tracker/reporting system where you and your team can collaborate on managing apps.
    <br />
    <br />
    <br />
    <a target="_blank" href="http://notify.devsdash.com/">View Demo</a>
    ·
    <a target="_blank" href="https://github.com/ahmadfsalameh/notify/issues">Report Bug</a>
    ·
    <a target="_blank" href="https://github.com/ahmadfsalameh/notify/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#settings">Settings</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="images/ipad-screenshot.png" />

Issues tracking software is essential for managing businesses, but it's not usually tailored for developers and lacks some important functionalities. I know that this project isn't the most features-packed one, but you should give it a try.

Here's why:

- Just like a normal issues tracking software you can create teams and easily assign issues to different team members.
- You can connect your application to your account using a script then anytime an error popup to one of your users a new ticket will be created.
- It's free, open-source, and has an amazing user experience.

Other features will be useful to have, and guess what? I will be constantly adding new features all the time. also if you want to contribute to this project <a href="#contributing">here is how</a>.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React.js](https://reactjs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

Let me guide you through installing, setting up the project and getting it up and running on your local machine.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ahmadfsalameh/notify.git
   ```
2. Install NPM packages (For both - Server & Client)
   ```sh
   npm install
   ```

### Settings

1.  In the server folder create `.env` file with the following code:

    ```sh
    database = DATABASE_CONNECTION_URL;
    jwtSecret = JWT_SECRET;
    sendgrid_api = API_KEY (Optional);
    email = SENDER_EMAIL;
    ```

    Please fill in the correct values. For more information about SendGrid <a href="https://sendgrid.com/" target="_blank">click here</a>.

2.  In server folder/`configs.js` change the the path to your front-end if needed (Used in sent emails).

3.  In client folder/src/`configs.js` change the path to your back-end.

    And you're ready 😀! Just run `npm start` in the client folder and run `node index.js` in the server folder.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Here is how you can connect your application to your issues to track your application errors in real-time.

On any page in your application or `index.html` if it is a single page application (React, Vue, etc) insert the following `Javascript` code:

```
<script>
  window.onerror = function (msg, url, lineNo, columnNo, err) {
    fetch("https://notify-issue-tracker.herokuapp.com/api/bugs", {
      method: "POST",
      body: JSON.stringify({
        apiKey: "YOUR_API_KEY",
        bug: {
          message: msg,
          error: JSON.stringify(err.stack),
        },
      }),
      headers: {
        "content-type": "application/json",
      },
    });
  };
</script>
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

[Ahmad Salameh](https://devsdash.com) - ahmadsalameh@devsdash.com

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

Some of the amazing libraries that I've used in this project.

- [DiceBear](https://avatars.dicebear.com/)
- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd)
- [Font Awesome](https://fontawesome.com)
- [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#top">back to top</a>)</p>
