import Profile, { ProfileModel } from "@/models/schema/Profile";

export default class ProfileService {
  async getProfile(userId: any): Promise<Profile | null> {
    return await ProfileModel.findOne({ userId });
  }
  async updateCreateProfile(
    data: Profile,
    _id: String | undefined
  ): Promise<Profile> {
    if (_id) {
      await ProfileModel.updateOne({ _id: _id }, { ...data });
      return { ...data };
    } else {
      const newProfile = await ProfileModel.create(data);
      return newProfile;
    }
  }
}
