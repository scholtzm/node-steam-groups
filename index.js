/**
 * node-steam-groups
 * Custom node-steam handler which provides group functions
 * Author: Michael Scholtz <michael.scholtz@outlook.com>
 * Licence: MIT
 */
var ByteBuffer = require('bytebuffer');

module.exports = SteamGroups;

function SteamGroups(steamClient) {
    this._client = steamClient;
}

/**
 * Invite another user to specific Steam group
 */
SteamGroups.prototype.inviteUserToGroup = function(steamIdGroup, steamIdInvited) {
    this._client.send({
            msg: EMsg.ClientInviteUserToClan
        },
        MsgClientInviteUserToClan.serialize({
            steamIdInvited: steamIdInvited,
            steamIdGroup: steamIdGroup,
            unknown: 1 // I really don't know
        })
    );
};

/**
 * Accept/decline group invite
 */
SteamGroups.prototype.acknowledgeGroupInvite = function(steamIdGroup, response) {
    this._client.send({
            msg: EMsg.ClientAcknowledgeClanInvite
        },
        MsgClientAcknowledgeClanInvite.serialize({
            steamIdGroup: steamIdGroup,
            response: +response
        })
    );
};

/**
 * Define additional EMsg codes
 */
var EMsg = {
    ClientInviteUserToClan: 744,
    ClientAcknowledgeClanInvite: 745
};

/**
 * Define additional Steam messages
 */
// Sending group invites
var MsgClientInviteUserToClan = {
    serialize: function(object) {
        var buffer = new ByteBuffer(17, ByteBuffer.LITTLE_ENDIAN);

        buffer.writeUint64(ByteBuffer.Long.fromString(object.steamIdInvited) || 0);
        buffer.writeUint64(ByteBuffer.Long.fromString(object.steamIdGroup) || 0);
        buffer.writeUint8(object.unknown || 0);

        return buffer.flip().toBuffer();
    }
};

// Accepting/declining group invites
var MsgClientAcknowledgeClanInvite = {
    serialize: function(object) {
        var buffer = new ByteBuffer(9, ByteBuffer.LITTLE_ENDIAN);

        buffer.writeUint64(ByteBuffer.Long.fromString(object.steamIdGroup) || 0);
        buffer.writeUint8(object.response || 0);

        return buffer.flip().toBuffer();
    }
};
