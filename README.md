# Discord Armory

*A Discord bot for managing a DnD 5e armory*

To get started and learn the available commands use:

```
{prefix}help
```

Command **prefix** can be setup in config. 


You can add custom commands as well by creating a file in the commands folder they must all follow the same schema to work properly outlined below:

```js

module.exports = {

  // String, Name of your command used for calling command
  name: "myCommand",
  
  // String, Description of command usually how its used and what it does
  description: "This command is very important and makes the world better! Syntax {prefix}myCommand",
  
  // Boolean, If the command will show up in help or not
  show: true,
  
  // Function that runs when the command is called message and args paramaters are passed into here
  async execute(message, args) {
  	...
  }
};

```

