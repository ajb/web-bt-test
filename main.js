document.getElementById('connect').addEventListener('click', connect)
document.getElementById('send').addEventListener('click', send)

var strToWrite = (
  '001g' +
  '002g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '001g' +
  '611g' +
  '511g'
);

var valToWrite = new TextEncoder("utf-8").encode(strToWrite);

var characteristic;

// function str2ab(str) {
//   var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
//   var bufView = new Uint16Array(buf);
//   for (var i = 0, strLen = str.length; i < strLen; i++) {
//     bufView[i] = str.charCodeAt(i);
//   }
//   return buf;
// }
//
// function hexToArrayBuffer (hex) {
//   if (typeof hex !== 'string') {
//     throw new TypeError('Expected input to be a string')
//   }
//
//   if ((hex.length % 2) !== 0) {
//     throw new RangeError('Expected string to be an even number of characters')
//   }
//
//   var view = new Uint8Array(hex.length / 2)
//
//   for (var i = 0; i < hex.length; i += 2) {
//     view[i / 2] = parseInt(hex.substring(i, i + 2), 16)
//   }
//
//   return view.buffer
// }

async function connect() {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{services: ["19b10000-e8f2-537e-4f6c-d104768a1214"]}]
  })

  const server = await device.gatt.connect();
  const service = await server.getPrimaryService("19b10000-e8f2-537e-4f6c-d104768a1214");
  characteristic = await service.getCharacteristic("19b10001-e8f2-537e-4f6c-d104768a1214");
}

async function send() {
  console.log('writing...')
  await characteristic.writeValue(valToWrite)
  // await characteristic.writeValue(hexToArrayBuffer('0x1F4'))
  console.log('done')
  // characteristic.writeValue(hexToArrayBuffer('0x05'))
  // characteristic.writeValue(hexToArrayBuffer('0x06'))
  // characteristic.writeValue(hexToArrayBuffer('0x07'))
  // characteristic.writeValue(hexToArrayBuffer('0x08'))
  // characteristic.writeValue(hexToArrayBuffer('0x09'))
  // characteristic.writeValue(hexToArrayBuffer('0x0A'))
  // characteristic.writeValue(hexToArrayBuffer('0x0B'))
  // characteristic.writeValue(hexToArrayBuffer('0x0C'))
  // characteristic.writeValue(hexToArrayBuffer('0x0D'))
  // characteristic.writeValue(hexToArrayBuffer('0x0E'))
  // characteristic.writeValue(hexToArrayBuffer('0x0F'))
}

console.log('Will write:', valToWrite)
