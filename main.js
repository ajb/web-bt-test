document.getElementById('connect').addEventListener('click', connect)
document.getElementById('send').addEventListener('click', send)

var characteristic;

function hexToArrayBuffer (hex) {
if (typeof hex !== 'string') {
  throw new TypeError('Expected input to be a string')
}

if ((hex.length % 2) !== 0) {
  throw new RangeError('Expected string to be an even number of characters')
}

var view = new Uint8Array(hex.length / 2)

for (var i = 0; i < hex.length; i += 2) {
  view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
}

return view.buffer
}

async function connect() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{services: ["19b10000-e8f2-537e-4f6c-d104768a1214"]}]
  })

  console.log('Connecting to GATT Server...');
  const server = await device.gatt.connect();

  console.log('Getting Service...');
  const service = await server.getPrimaryService("19b10000-e8f2-537e-4f6c-d104768a1214");

  console.log(service)


  console.log('Getting Characteristic...');
  characteristic = await service.getCharacteristic("19b10001-e8f2-537e-4f6c-d104768a1214");
}

async function send() {
  characteristic.writeValue(hexToArrayBuffer(document.getElementById('text').value))
}
