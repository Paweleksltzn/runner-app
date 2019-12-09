import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public async setObject(key: string, object: any) {
    await Storage.set({
      key,
      value: JSON.stringify(object)
    });
  }

  public async getObject(key: string) {
    const ret = await Storage.get({ key });
    return JSON.parse(ret.value);
  }

  public async setItem(key: string, value: string | number | boolean) {
    await Storage.set({
      key,
      value: value.toString()
    });
  }

  public async getItem(key: string) {
    return await Storage.get({ key });
  }

}
