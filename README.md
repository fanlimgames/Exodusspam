<h1 align="center">Exodusspam</h1>
<p align="center">Minecraft bot built with JavaScript using the mineflayer library</p>

<div align="center">
<img src="https://img.shields.io/github/stars/fanlimgames/Exodusspam.svg" alt="Stars"/>

<img src="https://img.shields.io/github/last-commit/fanlimgames/exodusspam" alt="GitHub last commit"/>
    <img src="https://img.shields.io/github/commit-activity/w/fanlimgames/exodusspam" alt="GitHub commit activity"/>
    <img src="https://img.shields.io/github/contributors/fanlimgames/exodusspam" alt="GitHub contributors"/>
    <img src="https://img.shields.io/github/languages/code-size/fanlimgames/exodusspam" alt="GitHub code size in bytes"/>
</div>

Hello, fellow developers! 👋 I'm fanlimgames, and I'm passionate about building awesome Minecraft bots with JavaScript using the mineflayer library. In this repository, I've created a powerful and efficient bot implementation that can connect to the 6b6t.org Minecraft server and engage in targeted messaging with other players. 🤖🚀

## Project Description

This project focuses on creating a versatile and interactive bot that can join the 6b6t.org Minecraft server and interact with players through chat messages. The bot utilizes the mineflayer library, a powerful tool for creating Minecraft bots in JavaScript.

The bot's main feature is its ability to send targeted messages to random players on the server. It maintains a list of spam messages and coordinates, allowing it to send either a random spam message or a message containing leaked coordinates to the selected player. The bot avoids messaging players in a blacklist to ensure a positive and enjoyable experience for everyone involved. 📨🎯

To provide a visually appealing output, the console displays the bot's username, the target player's username, and the message being sent, all styled using colors and emotes. This enhances readability and adds a touch of personality to the bot's interactions. 🌈😄

The code is designed with efficiency and performance in mind. It leverages the power of asynchronous programming, utilizing async/await and event-driven architecture to ensure smooth and responsive operation. The bot waits for a specific number of ticks before sending messages, reducing unnecessary load on the server and optimizing resource usage. ⚡🔧

The project also includes additional files such as user account details, spam messages, and coordinate data, which can be easily customized to suit individual preferences and the 6b6t.org server environment.

## Technologies Used

- JavaScript
- Node.js
- mineflayer
- colors

## How to Use

1. Clone the repository to your local machine. 🖥️
2. Install the required dependencies using `npm install`. ⚙️
3. Customize all files in the `config` directory. Most importantly the `users.json` file with your Minecraft account details. ✍️
4. By default, the chat spam feature is disabled. To enable it, set `enableMessageSpam` to `true` in the `users.json` file. 🚀
5. Run the bot using `node main.js`. 🏃‍♂️
6. Sit back and watch as the bot connects to the 6b6t.org server and starts engaging with other players. 🎮🌍
7. If you wish to disable the chat spam feature during runtime, simply set `enableMessageSpam` to `false` in the `users.json` file and restart the bot. ⛔️🗯️

Feel free to experiment and customize the bot's behavior by modifying the code. You can add new features, enhance the message selection logic, or integrate additional functionality from the mineflayer library.

Enjoy exploring the 6b6t.org Minecraft world with your interactive and dynamic bot! 🤖🌟


---
## Contributing

Contributions are welcome! If you have any ideas, bug reports, or feature requests, please open an issue on the GitHub repository. Feel free to fork the repository, make improvements, and submit pull requests. 🙌🔧

## Discord

Join our Exodus Discord server to be better: 🚀💪

[![Discord](https://discordapp.com/api/guilds/1103748412886761612/widget.png?style=banner4)](https://discord.gg/28n6FGcErT)

## License

Exodusspam is released under the MIT License. Please see the `LICENSE` file for more details. 📄⚖️

## Disclaimer

Exodusspam is meant for educational and recreational purposes only. Please use it responsibly and respect the rules and guidelines of the 6b6t.org Minecraft server. ⚠️🚧
