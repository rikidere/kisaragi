const key = require("../config").osuapi;
const request = require('request-promise');
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
async function getUser(user, options) {
    //read out options
    if(!user) throw new Error("user needs to be specified");
    if(typeof user != 'string' && typeof user != 'number') throw new TypeError("user has to be a string or a number");

    const mode = options ? (options.m ? options.m : null) : null;
    const type = options ? (options.type ? options.type : null) : null;
    const eventDays = options ? (options.event_days ? options.event_days : null) : null;
    let params = {};

    params.k = key;
    params.u = user;
    if(mode) params.m = mode;
    if(type) params.type = type;
    if(eventDays) params.event_days = eventDays;

    return await apiRequest('get_user', params);
}

module.exports = { getUser };