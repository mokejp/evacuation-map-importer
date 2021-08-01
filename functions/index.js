const functions = require("firebase-functions");
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const ngeohash = require('ngeohash')
const crypto = require('crypto');
const db = admin.firestore()
const path = require('path');
const os = require('os');
const fs = require('fs');
const iconv = require('iconv-lite');
const parse = require('csv-parse/lib/sync');

function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })
}

exports.dummyUser = functions.https.onRequest(async (request, response) => {

  const dummyUsers = [
    [
      [35.8062984, 139.6855901],
      [35.806689, 139.685183],
      [35.807133, 139.685698],
      [35.807716, 139.685955],
      [35.808325, 139.686202],
      [35.808857, 139.686373],
      [35.809420, 139.686570],
      [35.809732, 139.686687],
      [35.810093, 139.686818],
      [35.810407, 139.686932],
      [35.810694, 139.687039]
    ],
    [
      [35.811410, 139.685425],
      [35.811379, 139.685696],
      [35.811346, 139.685967],
      [35.811300, 139.686257]
    ],
    [
      [35.810189, 139.685120],
      [35.810124, 139.685463],
      [35.810041, 139.685822],
      [35.809934, 139.686344],
      [35.809847, 139.686717],
      [35.810145, 139.686838]
    ],
    [
      [35.812282, 139.689483],
      [35.812019, 139.689314],
      [35.811680, 139.689086],
      [35.811389, 139.688866],
      [35.811435, 139.688509],
      [35.811498, 139.688128],
      [35.811555, 139.687600],
      [35.811385, 139.687286],
      [35.811167, 139.687208],
      [35.810834, 139.687098]
    ]
  ]
  const shelterCol = db.collection('shelter')
    .doc('bcf0a951cf4fed142d7b0cde74b569172acfae21')
  const userCol = shelterCol.collection('user');
  for (let i = 0; i < dummyUsers.length; i++) {
    await userCol.doc(`dummyUser${i}`).set({
      loc: []
    })
  }
  await sleep(5000)
  const maxLen = Math.max(...dummyUsers.map(u => u.length))
  for (let count = 1; count < maxLen; count++) {
    for (let i = 0; i < dummyUsers.length; i++) {
      const dummyUser = dummyUsers[i]
      const locs = []
      for (let j = 0; j < count; j++) {
        const loc = dummyUser[j]
        if (!loc) {
          break
        }
        locs.push(loc)
      }
      console.log(locs)
      userCol.doc(`dummyUser${i}`).set({
        loc: locs.map(a => { return { lat: a[0], lon: a[1] } })
      })
    }
    await sleep(3000)
  }
  const shelter = await shelterCol.get()
  const shelterData = shelter.data()
  shelterData.peopleCount = dummyUsers.length;
  shelterCol.set(shelterData)
  response.send("Dummy user imported!");
});

exports.dummyUser2 = functions.https.onRequest(async (request, response) => {

  const dummyUsers = [
    [
      // [35.805980, 139.684170],
      // [35.806114, 139.685186],
      // [35.806206, 139.686074],
      // [35.806027, 139.685979],
      // [35.805218, 139.686167],
      // [35.805262, 139.686961],
      // [35.805349, 139.687696],
      // [35.805632, 139.686878]
    ],
    [
      // [35.806293, 139.689037],
      // [35.806245, 139.688366],
      // [35.806223, 139.687669],
      // [35.805801, 139.687696],
      // [35.805362, 139.687750],
      // [35.805253, 139.687004],
      // [35.805632, 139.686878]
    ],
    [
      // [35.803574, 139.686505],
      // [35.804013, 139.686425],
      // [35.804452, 139.686339],
      // [35.805039, 139.686226],
      // [35.805248, 139.686966],
      // [35.805632, 139.686878]
    ],
    [
      // [35.806702, 139.685734],
      // [35.806641, 139.686101],
    ],
    [
      [35.80423158730156, 139.68560489787728],
      [35.804274715732426, 139.68595669069873],
      [35.804351019822, 139.68634120843382],
      [35.804599836996125, 139.686324845977],
      [35.80474249182442, 139.68626757737812],
      [35.80503111825153, 139.6861857650941],
      [35.80513396189742, 139.68623485246454],
      [35.80514059696679, 139.68632075536277],
      [35.80518040737128, 139.68643120194628],
      [35.80517377230525, 139.68663573265638],
      [35.805213582693106, 139.68681571968133],
      [35.80525339306101, 139.68695889117842],
      [35.80532969621041, 139.6869425287216],
      [35.80544912707968, 139.68691389442216],
      [35.80555528770162, 139.686909803808],
    ],
    [
      [35.80614580356593, 139.68488904039674],
      [35.80607613619175, 139.6849708526808],
      [35.806135851087625, 139.68530219243124],
      [35.8061822959756, 139.68562126033905],
      [35.806198883429026, 139.68580533797817],
      [35.80622542334729, 139.68623076185526],
      [35.80622874083643, 139.6860180499167],
      [35.80600315125803, 139.68602623114512],
      [35.80577424353089, 139.68605895605873],
      [35.80556855776405, 139.68607531851555],
      [35.805432539464356, 139.68611622465755],
      [35.80522433583394, 139.68616721720528],
      [35.80512961316009, 139.68634727739317],
      [35.80518881484449, 139.68673659671833],
      [35.80525591003344, 139.68698965427967],
      [35.80539404700872, 139.6869263898893],
      [35.80551244993915, 139.68690692392306],
      [35.805555864302754, 139.68690692392306]
    ],
    [
      [35.806968791546254, 139.68621588212096],
      [35.806672789316785, 139.6860990863234],
      [35.80655438811612, 139.68608935334026],
      [35.80635310566988, 139.68599689000055],
      [35.806254437617746, 139.68595309157647],
      [35.80625049089311, 139.68636187686786],
      [35.80623865071805, 139.6859482250849],
      [35.80602158052879, 139.68600662298368],
      [35.80578082926136, 139.6860552878993],
      [35.80552429022248, 139.6860990863234],
      [35.805236176160214, 139.68617695018844],
      [35.8051493470598, 139.68617695018844],
      [35.80512961316009, 139.68629374598598],
      [35.80518092128913, 139.68643000774975],
      [35.805196708399066, 139.68662953390393],
      [35.80520854872947, 139.68681446058332],
      [35.80526380358135, 139.68693612287245],
      [35.80539404700872, 139.68691179041463],
      [35.80555191754341, 139.68689232444837],
    ],
    [
      [35.8052677503545, 139.6896662246877],
      [35.805370366400915, 139.6884836672376],
      [35.805358526094636, 139.68810894738715],
      [35.80536641963234, 139.68792402070773],
      [35.80538615347323, 139.68780235841862],
      [35.80551639669994, 139.68778775894393],
      [35.80561901242512, 139.68775855999453],
      [35.80582029673176, 139.68770016209575],
      [35.80593475228644, 139.68765636367166],
      [35.80617155635874, 139.68760769875607],
      [35.806207076908684, 139.6876271647223],
      [35.80621102363548, 139.68734004172],
      [35.80620313018169, 139.68758823278978],
      [35.80605710114527, 139.68763689770543],
      [35.80589923161471, 139.68766609665482],
      [35.80576898901577, 139.68773909402827],
      [35.80567032023801, 139.68773909402827],
      [35.80556375782035, 139.68774396051984],
      [35.80546508878764, 139.68780235841862],
      [35.805299324536755, 139.68732057575374],
      [35.80527959067432, 139.6871940469731],
      [35.80523617615971, 139.68699452081893],
      [35.80536641963234, 139.68693612292017],
      [35.80548482260397, 139.6869166569539],
    ],
    [
      [35.804004772772345, 139.68642514130593],
      [35.80432446587112, 139.68636674340715],
      [35.804652051291896, 139.6862645470843],
      [35.804873072017344, 139.68623048164335],
      [35.80507041143107, 139.68618668321926],
      [35.805109879254985, 139.68620128269396],
      [35.80513750672004, 139.68633754445776],
      [35.80518486806638, 139.68652733762877],
      [35.805192761621356, 139.68662953395165],
      [35.805212495505366, 139.68677066220698],
      [35.80521644228157, 139.6868679920383],
      [35.80522828260905, 139.68693612292017],
      [35.80538615347323, 139.6869312564286],
      [35.80553218374322, 139.68691179046235],
    ]
  ]
  const shelterCol = db.collection('shelter')
    .doc('8fc736bbcd7b794d2339f0c28c3c1917482e6147')
  const userCol = shelterCol.collection('user');
  for (let i = 0; i < dummyUsers.length; i++) {
    await userCol.doc(`dummyUser2${i}`).set({
      loc: []
    })
  }
  await sleep(5000)
  const maxLen = Math.max(...dummyUsers.map(u => u.length))
  for (let count = 1; count < maxLen; count++) {
    for (let i = 0; i < dummyUsers.length; i++) {
      const dummyUser = dummyUsers[i]
      const locs = []
      for (let j = 0; j < count; j++) {
        const loc = dummyUser[j]
        if (!loc) {
          break
        }
        locs.push(loc)
      }
      console.log(locs)
      userCol.doc(`dummyUser2${i}`).set({
        loc: locs.map(a => { return { lat: a[0], lon: a[1] } })
      })
    }
    await sleep(1000)
  }
  const shelter = await shelterCol.get()
  const shelterData = shelter.data()
  shelterData.peopleCount = dummyUsers.length;
  shelterCol.set(shelterData)
  response.send("Dummy user imported!");
});

exports.loadCsv = functions.https.onRequest(async (request, response) => {
  
  const bucket = admin.storage().bucket('gs://evacuation-map.appspot.com')
  const filePath = '11219.csv'
  const tempFilePath = path.join(os.tmpdir(), filePath)
  await bucket.file(filePath).download({destination: tempFilePath})
  const data = fs.readFileSync(tempFilePath)
  const str = iconv.decode(data, 'Shift_JIS')
  const records = parse(str, {
    columns: true,
  })
  const shelterCol = db.collection('shelter')
  records.forEach(line => {
    const disasterTypes = []
    if (line['洪水'] == 1) {
      disasterTypes.push('flood')
    }
    if (line['崖崩れ、土石流及び地滑り'] == 1) {
      disasterTypes.push('mudflow')
    }
    if (line['高潮'] == 1) {
      disasterTypes.push('hightide')
    }
    if (line['地震'] == 1) {
      disasterTypes.push('earthquake')
    }
    if (line['津波'] == 1) {
      disasterTypes.push('tsunami')
    }
    if (line['大規模な火事'] == 1) {
      disasterTypes.push('fire')
    }
    if (line['内水氾濫'] == 1) {
      disasterTypes.push('rainfall')
    }
    if (line['火山現象'] == 1) {
      disasterTypes.push('volcanic')
    }
    const obj = {
      name: line['施設・場所名'],
      address: line['住所'],
      loc: new admin.firestore.GeoPoint(Number(line['緯度']), Number(line['経度'])),
      lochash: ngeohash.encode(Number(line['緯度']), Number(line['経度'])),
      lochash5: ngeohash.encode(Number(line['緯度']), Number(line['経度']), precision=5),
      disasterTypes: disasterTypes,
    }
    const id = crypto.createHash('sha1').update(obj.address).digest('hex')
    shelterCol.doc(id).set(obj)
  })
  
  response.send("Imported!");
});

exports.loadNakano = functions.https.onRequest(async (request, response) => {
  const shelterCol = db.collection('shelter')
  const obj1 = {
    name: '中野区中央公園',
    address: '東京都中野区中央５丁目３９−１３',
    loc: new admin.firestore.GeoPoint(35.6999952, 139.6666638),
    lochash: ngeohash.encode(35.6999952, 139.6666638),
    lochash5: ngeohash.encode(35.6999952, 139.6666638),
    disasterTypes: ['flood', 'mudflow', 'earthquake', 'tsunami'],
  }
  const id1 = crypto.createHash('sha1').update(obj1.address).digest('hex')
  shelterCol.doc(id1).set(obj1)

  const obj2 = {
    name: '天祖神社',
    address: '東京都中野区中央４丁目１３',
    loc: new admin.firestore.GeoPoint(35.699801, 139.6678697),
    lochash: ngeohash.encode(35.699801, 139.6678697),
    lochash5: ngeohash.encode(35.699801, 139.6678697),
    disasterTypes: ['flood', 'mudflow', 'earthquake', 'tsunami'],
  }
  const id2 = crypto.createHash('sha1').update(obj2.address).digest('hex')
  shelterCol.doc(id2).set(obj2)
  response.send("Imported!");
});