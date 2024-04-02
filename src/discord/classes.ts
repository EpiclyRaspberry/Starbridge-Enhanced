class DiscordUser {
    id: string;
    username: string;
    avatar: string | null;
    discriminator: string;
    public_flags: number;
    premium_type: number;
    flags: number;
    banner: string | null;
    accent_color: string | null;
    global_name: string;
    avatar_decoration_data: any | null; // We don't know the exact structure
    banner_color: string | null;
  
    static fromJson(json: any): DiscordUser {
      const user = new DiscordUser();
      user.id = json.id;
      user.username = json.username;
      user.avatar = json.avatar;
      user.discriminator = json.discriminator;
      user.public_flags = json.public_flags;
      user.premium_type = json.premium_type;
      user.flags = json.flags;
      user.banner = json.banner;
      user.accent_color = json.accent_color;
      user.global_name = json.global_name;
      user.avatar_decoration_data = json.avatar_decoration_data;
      user.banner_color = json.banner_color;
      return user;
    }
  }

class GuildMember {
    avatar: string | null;
    communication_disabled_until: string | null;
    flags: number;
    joined_at: string;
    nick: string;
    pending: boolean;
    premium_since: string | null;
    roles: string[];
    unusual_dm_activity_until: string | null;
    user: DiscordUser;
    mute: boolean;
    deaf: boolean;
  
    static fromJson(json: any): GuildMember {
      const member = new GuildMember();
      member.avatar = json.avatar;
      member.communication_disabled_until = json.communication_disabled_until;
      member.flags = json.flags;
      member.joined_at = json.joined_at;
      member.nick = json.nick;
      member.pending = json.pending;
      member.premium_since = json.premium_since;
      member.roles = json.roles;
      member.unusual_dm_activity_until = json.unusual_dm_activity_until;
      member.user = DiscordUser.fromJson(json.user); // Recursively create User object
      member.mute = json.mute;
      member.deaf = json.deaf;
      return member;
    }
  }

export default {
    DiscordUser,
    GuildMember
}