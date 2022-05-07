import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/apiNote/note';
import {User} from '../src//apiNote/user';
import * as fs from 'fs';

describe('Test De instancia de User', () => {
  const user1 = new User();
  it('Test que comprueba si se puede añadir una nueva nota', () => {
    user1.addNote('Test', 'TDD', 'Esta es la prueba unitaria de un test', 'Blue');
    expect(fs.existsSync('database/Test/TDD.json')).true;
  });

  it('Comprobacion de fallo si la nota ya existe', () => {
    expect(user1.addNote('Test', 'TDD', 'Esta es la prueba unitaria de un test', 'Blue')).to.be.false;
  });

  it('Test que comprueba si se puede modificar una nota', () => {
    user1.modifyNote('Test', 'TDD', 'Se ha modificado el contenido', 'Yellow');
    expect(fs.existsSync('database/Test/TDD.json')).true;
    const information = fs.readFileSync('database/Test/TDD.json');
    expect(information.toString()).to.be.eql('{\n\"title\": \"TDD' + '\",\n\"body\": \"Se ha modificado el contenido'+ '\",\n\"color\": \"Yellow' + '\"\n}');
  });

  it('Test que comprueba si se puede listar las notas de un usuario', () => {
    user1.addNote('Test', 'TDD_2', 'Esta es una nota de para probar que se lista', 'Red');

    const nota1 = new Note('TDD', 'Se ha modificado el contenido', 'Yellow');
    const nota2 = new Note('TDD_2', 'Esta es una nota de para probar que se lista', 'Red');
    expect(user1.listNoteUser('Test')).to.be.eql([nota1, nota2]);
  });

  it('Test que comprueba si se puede leer una nota en el sistema', () => {
    const nota1 = new Note('TDD', 'Se ha modificado el contenido', 'Yellow');
    expect(user1.readNote('Test', 'TDD')).to.be.eql(nota1);
  });

  it('Test que comprueba si se puede eliminar una nota del sistema', () => {
    user1.deleteNote('Test', 'TDD');
    user1.deleteNote('Test', 'TDD_2');

    expect(fs.existsSync('database/Test/TDD.json')).false;
    expect(fs.existsSync('db/Test/TDD_2.json')).false;
  });

  it('Test que comprueba el error al modificar una nota no existente', () => {
    expect(user1.modifyNote('Test', 'TDD', 'Esta es una nota de prueba modificada', 'Blue')).to.be.false;
  });

  it('Test que comprueba el error al leer una nota que no existe', () => {
    expect(user1.readNote('Test', 'TDD')).to.be.true;
  });

  it('Test que comprueba si da error al eliminar una nota no existente', () => {
    expect(user1.deleteNote('Test', 'TDD')).to.be.false;
  });
});
