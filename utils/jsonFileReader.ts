import * as fs from 'fs';

export function readJsonFile(filePath: string): any {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}