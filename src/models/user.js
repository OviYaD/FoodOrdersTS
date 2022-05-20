export class User {
  constructor(id = "", name = "", mail = "", address = "") {
    this.id = id;
    this.name = name;
    this.mail = mail;
    this.address = address;
  }
}

//Firestore data converter
export const userConverter = {
  toFirestore: (user) => {
    return {
      uid: user.id,
      name: user.name,
      mail: user.mail,
      address: user.address,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new User(data.uid, data.name, data.mail, data.address);
  },
};
