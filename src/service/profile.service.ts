import Profile, { ProfileModel } from "@/models/schema/Profile";

export default class ProfileService {
  async updateProfile(profile: Profile): Promise<Profile> {
    if (profile._id || profile.userId) {
      ProfileModel.updateOne({ _id: profile._id }, { ...profile });
      return profile;
    } else {
      const newProfile = await ProfileModel.create(profile);
      return newProfile;
    }
  }
}
