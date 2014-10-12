/**
 * Export single function which injects new methods into Steam.
 */
module.exports = function(Steam) {
    var EMsg = Steam.EMsg;
    var prototype = Steam.SteamClient.prototype;

    prototype.acceptGroup = function(steamIdGroup) {
        this._send(EMsg.ClientAcknowledgeClanInvite, GroupMessages.MsgClientAcknowledgeClanInvite.serialize({
            steamIdGroup: steamIdGroup,
            acceptInvite: true
        }));
    };

    prototype.declineGroup = function(steamIdGroup) {
        this._send(EMsg.ClientAcknowledgeClanInvite, GroupMessages.MsgClientAcknowledgeClanInvite.serialize({
            steamIdGroup: steamIdGroup,
            acceptInvite: false
        }));
    };

    prototype.groupInvite = function(steamIdGroup, steamIdInvited) {
        this._send(EMsg.ClientInviteUserToClan, GroupMessages.MsgClientInviteUserToClan.serialize({
            steamIdInvited: steamIdInvited,
            steamIdGroup: steamIdGroup,
            unknown: true
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
        var buffer = new Buffer(17);

        buffer.writeUInt64LE(object.steamIdInvited || 0, 0);
        buffer.writeUInt64LE(object.steamIdGroup || 0, 8);
        buffer.writeUInt8(object.unknown || 0, 16);

        return buffer;
    },

    parse: function(buffer) {
        var object = {};

        object.steamIdInvited = buffer.readUInt64LE(0);
        object.steamIdGroup = buffer.readUInt64LE(8);
        object.unknown = buffer.readUInt8(16);

        return object;
    }
};

GroupMessages.MsgClientInviteUserToClan = MsgClientInviteUserToClan;

// Accepting/declining group invites
var MsgClientAcknowledgeClanInvite = {
    baseSize: 9,

    serialize: function(object) {
        var buffer = new Buffer(9);

        buffer.writeUInt64LE(object.steamIdGroup || 0, 0);
        buffer.writeUInt8(object.acceptInvite || 0, 8);

        return buffer;
    },

    parse: function(buffer) {
        var object = {};

        object.steamIdGroup = buffer.readUInt64LE(0);
        object.acceptInvite = buffer.readUInt8(8);

        return object;
    }
};

GroupMessages.MsgClientAcknowledgeClanInvite = MsgClientAcknowledgeClanInvite;
