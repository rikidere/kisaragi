import { osuapi as key } from "../config";
import request from 'request-promise';

const BASE_URL = "https://osu.ppy.sh/api/";

/**
 * 
 * @param {string} url - in the form of get_user etc 
 */
async function apiRequest(type, options) {

    return await request({
        url: BASE_URL + type,
        qs: options,
        json: true
    }).then( (res) => {
        return res;
      });
}

/**
 * 
 * @typedef {Object} options
 * @property {string} m - mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default value is 0.
 * @property {string} type - 'string' for usernames or 'id' for user_ids. Optional, default value is auto.
 * @property {string} event_days - Max number of days between now and last event date. Range of 1-31. Optional, default value is 1.
 */

/**
 * @
 * @param {string} user - id is recommended
 * @param {json} options - mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default value is 0.
 * 
 * @returns {json} - returns a promise of an array containing only the user.
 */
async function getUser(user, options = {}) {
    //read out options
    if(!user) throw new Error("user needs to be specified");
    if(typeof user != 'string' && typeof user != 'number') throw new TypeError("user has to be a string or a number");

    const mode = options.m;
    const type = options.type;
    const eventDays = options.event_days;
    let params = {};

    params.k = key;
    params.u = user;
    if(mode) params.m = mode;
    if(type) params.type = type;
    if(eventDays) params.event_days = eventDays;

    return apiRequest('get_user', params);
}
/**
 * 
 * @typedef {Object} options
 * @property {date} since - in MySQL format, in UTC
 * @property {string} m - mode (0 = osu!, 1 = Taiko, 2 = CtB, 3 = osu!mania). Optional, default value is 0.
 * @property {string} type - 'string' for usernames or 'id' for user_ids. Optional, default value is auto.
 * @property {string} a - include converted beatmaps, 0 = not included, 1 = included, default is 0
 * @property {string} h - beatmap hash
 * @property {string} limit - amount of results, default is 500
 * @property {string} mods - returns beatmap applied with some mods
 */
async function getBeatmaps(idType, id, options = {}){
    if(!idType) idType = "s";
    if(idType != "s" && idType != "b" && idType != "u") throw new Error("idType has to be 's','b' or 'u'");

    if(!id) throw new Error("id has to be specified");
    if(typeof id != "number" && !(typeof id == 'string' && idType == "u")) throw new TypeError("id has to be number");

    const mode = options.m;
    const type = options.type;
    const a = options.a;
    const hash = options.hash;
    const limit = options.limit;

    let params = {}
    if(idType == "s") params.s = id;
    else if(idType == "b") params.b = id;
    else if(idType == "u") params.u = id;
    if(mode) params.m = mode;
    if(type) params.type = type;
    if(a) params.a = a;
    if(hash) params.hash = hash;
    if(limit) params.limit = limit;

    return apiRequest('get_beatmaps', params);

}
export default { getUser };