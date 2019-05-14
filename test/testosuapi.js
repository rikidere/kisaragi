const osu = require('../api/osu');

async function test(){
    const User = osu.getUser("[ Riki-dere ]");
    console.log(User);
}

test();