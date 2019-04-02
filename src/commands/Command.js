class Command {
    constructor(data) {
        if(!data.name || typeof data.name != String) throw new TypeError("Name undefined or name is not of type string");
        this.name = data.name;
        this.prefix = data.prefix;
        this.description = data.description;
    }

    execute(){
        
    }
}