import { parse, join } from 'path';

export function isImportable(file: string): boolean {
    const filePart = file.slice(-3);
    return filePart === '.js' || (filePart === '.ts' && file.slice(-5) !== '.d.ts');
}

export function getFullfilepathWithoutExtension(file: string): string {
    const parsedFile = parse(file);
    return join(parsedFile.dir, parsedFile.name);
}