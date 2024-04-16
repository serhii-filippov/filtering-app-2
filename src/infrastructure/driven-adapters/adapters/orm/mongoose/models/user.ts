import { USERS_COLLECTION } from '../../../../../../application/config/environment';
import { UserModel } from '../../../../../../domain/models/user';
import { model, Schema } from "mongoose";

const schema = new Schema<UserModel>({
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    roles: [{ role: String }]
});

export const UserModelSchema = model<UserModel>('Users', schema, USERS_COLLECTION);
