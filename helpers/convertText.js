let str = " Antitoxin (3), Basic Poison Vial (1), Berry of Nourishment (1 Berry Equals 1 Day of Rations) (25), Flask of Oil (10), Healer’s Kit (1), Potion of Healing (3), Rations (20), Torches (10), Backpack (6), Bedroll (2), Climber’s Kit (3), Crowbar (1), Hammer (1), Hooded Lantern (2), Hunting Trap (3), Shovel (2), Tent (2), Common Clothes (3), Common Dress (7), Giant Kegs of Moonshine (2), Keys to Gallowsburg Barracks (1), Mask of the Beast (Stag-Shaped Cast Animal Friendship 3x/Day) (1) "

let getJson = (str) => {
  let strd = str.split(',');
  let json = {};
  strd.forEach(item => {
    const getName = () => item.slice(0, item.indexOf('(')).trim();

    const entryName = getName().toLowerCase();

    let entry = json[entryName] = {};
    entry.name = getName()

    if(item.split('(').length - 1 > 1) {
        entry.amount = parseInt(item.slice(item.lastIndexOf(')')-1,item.lastIndexOf(')')))
        entry.desc = item.trim().slice(item.indexOf('('),item.lastIndexOf(')')-5)
    } else {
        entry.amount = parseInt(item.slice(item.indexOf('(')+1,item.lastIndexOf(')')))
        entry.desc = "";
    }
    
    if(item.slice(0, item.indexOf('(')).trim().indexOf(' ') >= 0) {
      entry.alias = [getName().toLowerCase().replace(/ /g,'')];
    } else if(item.slice(0, item.indexOf('(')).trim().indexOf('-') >= 0) {
      entry.alias = [getName().toLowerCase().replace(/-/g,'')];
    } else {
      entry.alias = []
    }
  });
  return json;
}

console.log(JSON.stringify(getJson(str), null, 2));