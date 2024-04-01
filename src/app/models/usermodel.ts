export interface Usermodel {
    userId : number;
    firstName : string;
    lastName : string;
    userName : string;
    image : Image;
}

export interface Image {
    imageId : number;
    imagePath : string;
}
