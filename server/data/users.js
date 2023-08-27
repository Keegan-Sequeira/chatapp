class User{
    constructor(username, password, email, id, roles, groups){
        this.username = username;
        this.password = password;
        this.email = email;
        this.id = id;
        this.roles = roles;
        this.groups = groups;
    }
}

const roles = {
    SA: "superAdmin",
    GA: "groupAdmin",
    U: "user"
}

let tempUsers = [
    new User("super", "123", "admin@chatlink.com", 1, [roles.SA, roles.GA, roles.U], ["open"]),
    new User("bob_smith", "Password1", "bob@gmail.com", 2, [roles.GA, roles.U], ["open"]),
    new User("kate312", "Password3", "kate.s@gmail.com", 3, [roles.U], ["open"])
];

module.exports = tempUsers;