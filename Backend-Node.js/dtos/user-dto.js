module.exports=class UserDto{
    email;
    id;
    isActivated;
    balance;
    role;
    basket;
    inventar;
    
    constructor(model){
        this.email=model.email;
        this.id=model._id;
        this.isActivated=model.isActivated;
        this.balance=model.balance;
        this.role=model.role;
        this.basket=model.basket;
        this.inventar=model.inventar;
        

    }
}