const { osuapi } = require("../config");
const RATE_LIMIT = 60;

const request = require('request-promise');

const userId = 1946213;
let lastDate;
let lastScore;
let time = 0;

console.log(osuapi);
//getScore();


startTracker()

async function startTracker() {
    while(true) {
        //wait 10 seconds
        if (Date.now() - time >= 10000) {
            
            d = await getScore();
            //console.log(lastScore);
            
            //if a new score has been made
            if(lastDate != lastScore.date){
                lastDate = lastScore.date;
                
                console.log("==== NEW SCORE DETECTED ==== ");
                
                bm = await getBeatmap(lastScore.beatmap_id);
                console.log("last date: " + lastScore.date);
                console.log(`name: ${bm.artist} - ${bm.title} [${bm.version}]`);

            } else {
                console.log("==== NO NEW SCORE DETECTED ====");
                console.log("last date: " + lastScore.date);
            }
            console.log("\n\n");
            time = Date.now();
        }

    }
}


async function getScore() {
    console.log("trying to get score");
    return request({ url: `https://osu.ppy.sh/api/get_user_recent?k=${osuapi}&u=${userId}`, json: true }).then( (res) => {
        //console.log(res);
        lastScore = res[0];
        console.log("score acquired");
      });
}
async function getBeatmap(bmId) {
    console.log("acquiring beatmap info");
    let bm;
    await request({ url: `https://osu.ppy.sh/api/get_beatmaps?k=${osuapi}&b=${bmId}`, json: true }).then( (res) => {
        //console.log(res);
        bm = res[0];
        console.log("beatmap acquired");
      });
    return bm;
}


console.log("test");