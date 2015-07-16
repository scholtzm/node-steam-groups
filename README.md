# Steam Groups for node-steam

[![NPM version](http://img.shields.io/npm/v/steam-groups.svg?style=flat)](https://www.npmjs.org/package/steam-groups)
[![Dependency Status](https://david-dm.org/scholtzm/node-steam-groups.svg?style=flat)](https://david-dm.org/scholtzm/node-steam-groups)

This is a tiny node.js module which provides custom [node-steam](https://github.com/seishun/node-steam) handler for group functions.

# Installation

```
npm install steam-groups
```

# Usage

Firstly, require `steam` as well as `steam-groups` module ...

```js
var Steam = require('steam');
var SteamGroups = require('steam-groups');
```

After that, instantiate SteamGroups by providing the Steam client instance as a constructor parameter ...

```js
var client = new Steam.SteamClient();
var steamGroups = new SteamGroups(client);
```

That's it. You can now use additional group functions.

# Functions

### inviteUserToGroup(steamIdGroup, steamIdInvited)

Invite user `steamIdInvited` to group `steamIdGroup`. `steamIdGroup` has to be in `groupID64` format.

Example of `groupID64` can be found [here](http://steamcommunity.com/groups/tradingcards/memberslistxml/).

### acknowledgeGroupInvite(steamIdGroup, response)

Accept or decline an invite to join group `steamIdGroup`. `response` is a `boolean` value.

This can be used in conjunction with `node-steam`'s `group` event.

# Example

```js
// Require steam and steam-groups first
var Steam = require('steam');
var SteamGroups = require('steam-groups');

// Create new SteamClient object and pass it as a constructor param
var client = new Steam.SteamClient();
var steamFriends = new Steam.SteamFriends(client);

var steamGroups = new SteamGroups(client);

// Connect to Steam network and add additional code here ...

// Accept any incoming group invite
steamFriends.on('group', function(group, relationship) {
    if(relationship === Steam.EClanRelationship.Invited) {
        steamGroups.acknowledgeGroupInvite(group, true);
    }
});

// Invite anyone who messages us to a group
steamFriends.on('friendMsg', function(user, message, type) {
    if(type === Steam.EChatEntryType.ChatMsg) {
        steamGroups.inviteUserToGroup('1234567890', user);
    }
});
```

# Disclaimer

`node-steam` is port of `SteamKit2`, which does not support group functions. Automating group functionalities might be against Steam's EULA. There are many people who run trading bots and automate this process, but remember that you are using this at your own risk.

# License

MIT. See `LICENSE`.
