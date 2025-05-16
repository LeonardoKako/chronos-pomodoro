self.onmessage = function (event) {
  console.log('Worker recebeu: ', event.data);

  self.postMessage('Hello nigga');
};
