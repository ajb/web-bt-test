document.getElementById('connect').addEventListener('click', connect)
document.getElementById('send').addEventListener('click', send)

var numLeds = 50;
var htmlStr = '';

for (var i = 0; i < numLeds; i++) {
  htmlStr += `
    <div>
    ${i}:
    <select>
      <option value=''>Off</option>
      <option value='r'>R</option>
      <option value='g'>G</option>
      <option value='b'>B</option>
    </select>
  </div>
  `

  document.getElementById('selects').innerHTML = htmlStr;
}


var characteristic;

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function calculateMessageString() {
  var str = ''

  var selects = document.getElementsByTagName('select');

  for (var i = 0; i < selects.length; i++) {
    if (selects[i].value) {
      str = str + pad(i, 3) + selects[i].value
    }
  }

  return str
}

async function connect() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{services: ["19b10000-e8f2-537e-4f6c-d104768a1214"]}]
  })

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService("19b10000-e8f2-537e-4f6c-d104768a1214");
  characteristic = await service.getCharacteristic("19b10001-e8f2-537e-4f6c-d104768a1214");
}

async function send() {
  var valToWrite = new TextEncoder("utf-8").encode(calculateMessageString());
  console.log('Writing...', valToWrite)
  await characteristic.writeValue(valToWrite)
  console.log('done')
}
