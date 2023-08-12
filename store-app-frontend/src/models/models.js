export class UserModel {
    constructor(obj) {
      this.id = obj.id;
      this.username = obj.username;
      this.email = obj.email;
      this.fullName = obj.fullName;
      this.birthday = obj.birthday;
      this.address = obj.address;
      this.type = obj.type;
      this.userImage = obj.userImage;
    }
  }

  export class GetUserModel {
    constructor(id, username, email, fullName, birthday, address, typeOfUser, userImage) {
      this.id = id;
      this.username = username;
      this.email = email;
      this.fullName = fullName;
      this.birthday = birthday;
      this.address = address;
      this.typeOfUser = typeOfUser;
      this.userImage = userImage;
    }
};