import 'mocha';
import {expect} from 'chai';
import {Note} from '../src/apiNote/note';

const firstNote: Note = new Note('Primera Nota', 'Esta es la primera nota', 'Red');
const secondNote: Note = new Note('Segunda Nota', 'Esta es la segunda nota', 'Yellow');
const thirdNote: Note = new Note('Tercera Nota', 'Esta es la tercera nota', 'Green');
const fourthNote: Note = new Note('Cuarta Nota', 'Esta es la cuarta nota', 'Blue');

describe('Pruebas Unitarias de la Clase Note', ()=> {
  it('Prueba de instancia de la clase Note', () =>{
    expect(firstNote).to.exist;
    expect(firstNote).not.null;
    expect(secondNote).to.exist;
    expect(secondNote).not.null;
    expect(thirdNote).to.exist;
    expect(thirdNote).not.null;
    expect(fourthNote).to.exist;
    expect(fourthNote).not.null;
  });
  it('Prueba de metodos de acceso "Getters" de la clase Note', () =>{
    expect(firstNote.geTitle()).to.be.eql('Primera Nota');
    expect(secondNote.geTitle()).to.be.eql('Segunda Nota');
    expect(thirdNote.geTitle()).to.be.eql('Tercera Nota');
    expect(fourthNote.geTitle()).to.be.eql('Cuarta Nota');

    expect(firstNote.getBody()).to.be.eql('Esta es la primera nota');
    expect(secondNote.getBody()).to.be.eql('Esta es la segunda nota');
    expect(thirdNote.getBody()).to.be.eql('Esta es la tercera nota');
    expect(fourthNote.getBody()).to.be.eql('Esta es la cuarta nota');

    expect(firstNote.getColor()).to.be.eql('Red');
    expect(secondNote.getColor()).to.be.eql('Yellow');
    expect(thirdNote.getColor()).to.be.eql('Green');
    expect(fourthNote.getColor()).to.be.eql('Blue');
  });

  it('Prueba de metodos de acceso "Setters" de la clase Note', () =>{
    firstNote.seTitle('Nota Actualizada');
    expect(firstNote.geTitle()).to.be.eql('Nota Actualizada');

    secondNote.setBody('Se ha actualizado el valor de la segunda nota');
    expect(secondNote.getBody()).to.be.eql('Se ha actualizado el valor de la segunda nota');

    fourthNote.setColor('Yellow');
    expect(fourthNote.getColor()).to.be.eql('Yellow');
  });
});
