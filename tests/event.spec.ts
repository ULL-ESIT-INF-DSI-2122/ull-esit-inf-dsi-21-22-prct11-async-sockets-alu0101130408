import 'mocha';
import {expect} from 'chai';
import {EventEmitter} from 'events';
import {MessageEventEmitterClient} from '../src/client/event';

describe('MessageEventEmitterClient', () => {
  it('Emision de un mensaje cliente', (done) => {
    const socket = new EventEmitter();
    const client = new MessageEventEmitterClient(socket);

    client.on('message', (message) => {
      expect(message).to.be.eql({'type': 'add', 'status': true});
      done();
    });

    socket.emit('data', '{"type": "add"');
    socket.emit('data', ', "status": true}');
    socket.emit('data', '\n');
  });
});
