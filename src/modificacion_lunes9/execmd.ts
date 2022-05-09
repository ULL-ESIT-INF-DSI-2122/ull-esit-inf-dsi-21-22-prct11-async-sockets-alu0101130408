
import {spawn} from 'child_process';

export function createSpawn(commandos: string, argumentos :string) {
  const commandSpawn = spawn(commandos, [argumentos]);
  return commandSpawn;
}
