export class User {
    constructor(
        id = "",
        name = "",
        mail = "",
        address = "",
        aadhaar = "",
        contact = ""
    ) {
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.address = address;
        this.aadhaar = aadhaar;
        this.contact = contact;
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
            aadhaar: user.aadhaar,
            contact: user.contact,
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(
            snapshot.id,
            data.name,
            data["mail"],
            data.address,
            data.aadhaar,
            data.contact
        );
    },
};