class Aggie {
  firstName: String = "";
  lastName: String = "";
  email: String = "";
  profieImage: any;
  role: number = 0;

  public User(firstName: String, lastName: String, email: String, profileImage: any) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profieImage = profileImage;
  }


}
