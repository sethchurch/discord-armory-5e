module.exports = args => {
    // if the arg doesn't have a comma at the end its part of another one so add a space.
    let mappedArgs = args.map(arg => {
        if(!arg.includes(',')) {
          arg += ' ';
        }
        return arg;
      })
  
      let argsString = mappedArgs.join('');
      let itemArray = argsString.split(',');
      itemArray = itemArray.map( item => item.trim());
      
      return itemArray;
}