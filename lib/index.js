"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const Discord = require('discord.js')
const discord_js_1 = __importDefault(require("discord.js"));
const util_1 = require("util");
const jimp_1 = __importDefault(require("jimp"));
const crypto_1 = require("crypto");
const client = new discord_js_1.default.Client();
client.on("ready", () => {
    // console.log(`Logged in as ${client.user.tag}!`)
    return Promise.resolve();
});
client.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg.content.startsWith('!dankbot'))
        return;
    const commands = msg.content.split(' ');
    switch (commands[1]) {
        case 'fry':
            // msg.reply('this feature is coming soooooon')
            console.log('attempting deepfry');
            yield deepFry(msg);
            break;
        default:
        case 'help':
            msg.reply('whats good homie' +
                '\n\ncommands are seperated by spaces, for example: \n`!dankbot fry brutal` deepfries the latest picture in the chat brutally' +
                '\nahere are some commands:' +
                '\n  - `fry`' +
                '\n    - `mild`' +
                '\n    - `medium` (default)' +
                '\n    - `brutal`' +
                '\n - `help`');
            break;
    }
    return Promise.resolve();
}));
function deepFry(msg) {
    return __awaiter(this, void 0, void 0, function* () {
        const filter = (m) => m.attachments.size > 0;
        console.log('getting messages');
        const messages = yield msg.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] });
        console.log('got messages:\n' + util_1.inspect(messages));
        let url;
        for (const m of messages) {
            url = m[1].url;
            if (url)
                break;
        }
        if (!url) {
            console.log('no url found');
            msg.reply('no image found');
            return;
        }
        console.log('url: ' + url);
        const imgPath = __dirname + '/toasty' + crypto_1.randomBytes(10).toString('hex') + '.png';
        console.log('new image path: ' + imgPath);
        const img = yield jimp_1.default.read(url, (e, jimage) => {
            if (e) {
                msg.reply('something failed homie');
                return;
            }
            jimage
                .pixelate(40)
                .contrast(0.95)
                .posterize(1)
                .write(imgPath);
        });
        if (img) {
            msg.channel.send({
                files: [{
                        attachment: imgPath,
                        name: 'epic'
                    }]
            });
            return;
        }
    });
}
client.login(process.env.login_key);