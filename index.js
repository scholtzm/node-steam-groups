/**
 * node-steam-groups
 * node-steam extension which adds group functions
 * Author: Michael Scholtz <michael.scholtz@outlook.com>
 * Licence: MIT
 */
var ByteBuffer = require('bytebuffer');

/**
 * Export single function which injects new methods into Steam.
 */
module.exports = function(Steam) {
    var EMsg = Steam.EMsg;
    var prototype = Steam.SteamClient.prototype;

    prototype.acceptGroup = function(steamIdGroup) {
        this._send(EMsg.ClientAcknowledgeClanInvite, GroupMessages.MsgClientAcknowledgeClanInvite.serialize({
            steamIdGroup: steamIdGroup,
            acceptInvite: 1
        }));
    };

    prototype.declineGroup = function(steamIdGroup) {
        this._send(EMsg.ClientAcknowledgeClanInvite, GroupMessages.MsgClientAcknowledgeClanInvite.serialize({
            steamIdGroup: steamIdGroup,
            acceptInvite: 0
        }));
    };

    prototype.groupInvite = function(steamIdGroup, steamIdInvited) {
        this._send(EMsg.ClientInviteUserToClan, GroupMessages.MsgClientInviteUserToClan.serialize({
            steamIdInvited: steamIdInvited,
            steamIdGroup: steamIdGroup,
            unknown: 1
        }));
    };
};

/**
 * Define additional Steam messages
 */
var GroupMessages = {};

// Sending group invites
var MsgClientInviteUserToClan = {
    baseSize: 17,

    serialize: function(object) {
        var buffer = new ByteBuffer(17, ByteBuffer.LITTLE_ENDIAN);

        buffer.writeUint64(ByteBuffer.Long.fromString(object.steamIdInvited) || 0);
        buffer.writeUint64(ByteBuffer.Long.fromString(object.steamIdGroup) || 0);
        buffer.writeUint8(object.unknown || 0);

        return buffer.flip();
    }
};

GroupMessages.MsgClientInviteUserToClan = MsgClientInviteUserToClan;

// Accepting/declining group invites
var MsgClientAcknowledgeClanInvite = {
    baseSize: 9,

    serialize: function(object) {
        var buffer = new ByteBuffer(9, ByteBuffer.LITTLE_ENDIAN);

        buffer.writeUint64(ByteBuffer.Long.fromString(object.steamIdGroup) || 0);
        buffer.writeUint8(object.acceptInvite || 0);

        return buffer.flip();
    }
};

GroupMessages.MsgClientAcknowledgeClanInvite = MsgClientAcknowledgeClanInvite;
