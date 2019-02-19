class Command {
    Command(data) {
        if(!data.name || typeof data.name != String) return;
        this.name = data.name;
        this.prefix = data.prefix;
        this.description = data.description;
    }
}