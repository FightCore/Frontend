export class CsharpJsonHelper {
    public static parseUpperCaseObject(json: string): any {
        const jsonObject = JSON.parse(json);
        const keys = Object.keys(jsonObject);
        let keyAmount = keys.length;
        const lowerCasedObject = {};
        while (keyAmount--) {
          let name = keys[keyAmount].toString();
          name = name.charAt(0).toLowerCase() + name.slice(1);
          lowerCasedObject[name] = jsonObject[keys[keyAmount]];
        }

        return lowerCasedObject;
    }
}
