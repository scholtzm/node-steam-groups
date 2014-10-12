# Steam Groups for node-steam

This is a tiny node.js module which allows user to extend `node-steam` to support group functions. This module therefore fully depends on `node-steam`.

# Installation

```
npm install git://github.com/scholtzm/node-steam-groups.git
```

# Usage

Firstly, require `node-steam` module ...

```js
var Steam = require('steam');
```

After that, simply extend `Steam` variable with `node-steam-groups` ...

```js
require('steam-groups')(Steam);
```

That's it. You can now use additional group functions.

# Functions

### groupInvite(steamIdGroup, steamIdInvited)

Invite user `steamIdInvited` to group `steamIdGroup`. `steamIdGroup` has to be in `groupID64` format.

Example of `groupID64` can be found [here](http://steamcommunity.com/groups/tradingcards/memberslistxml/).

### acceptGroup(steamIdGroup)

Accept group invite. This can be used in conjuntion with `node-steam`'s `group` event.

### declineGroup(steamIdGroup)

Decline group invite. This can be used in conjuntion with `node-steam`'s `group` event.

# Example

```js
// Require node-steam first
var Steam = require('steam');

// Extend node-steam with group functions
require('steam-groups')(Steam);

// Create new SteamClient object
var client = new Steam.SteamClient();

// Call logOn and add additional code here ...

// This will work
client.on('group', function(steamID, relationship) {
    if(relationship === Steam.EClanRelationship.Invited) {
        client.acceptGroup(steamID);
    }
});
```

# Disclaimer

`node-steam` is port of `SteamKit2`, which does not support group functions. Automating group functionalities might be against Steam's EULA. There are many people who run trading bots and automate this process, but remember that you are using this at your own risk.

# License

See `LICENSE`.
