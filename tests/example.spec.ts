import 'mocha';
import {expect} from 'chai';
import {hello} from '../src/example';

describe('pruebas unitarias de ejemplo', ()=> {
  it('Prueba de hello', () =>{
    expect(hello()).to.be.eql('Hola Mundo');
  });
});
