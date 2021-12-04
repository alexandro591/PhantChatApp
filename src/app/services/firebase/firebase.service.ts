import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfigs = [
  {
    apiKey: 'AIzaSyC24qnZMIBX99xr5Xlx_0rze96nyxozQto',
    authDomain: 'phant0.firebaseapp.com',
    databaseURL: 'https://phant0-default-rtdb.firebaseio.com',
    projectId: 'phant0',
    storageBucket: 'phant0.appspot.com',
    messagingSenderId: '517471593889',
    appId: '1:517471593889:web:784c8826e5353354fa97e0',
    measurementId: 'G-C16DEG44YL',
  },
  {
    apiKey: 'AIzaSyAJMmO74cvpTizhJmd-I1kGPdWaJR49a_M',
    authDomain: 'phant1.firebaseapp.com',
    projectId: 'phant1',
    storageBucket: 'phant1.appspot.com',
    messagingSenderId: '1058910778686',
    appId: '1:1058910778686:web:346995dcf9550ed7ac686f',
    measurementId: 'G-5411DBQJBX',
  },
  {
    apiKey: 'AIzaSyANZGzmYjR3OX4CMe9clzakRF9N7v8Xv4M',
    authDomain: 'phant2.firebaseapp.com',
    databaseURL: 'https://phant2-default-rtdb.firebaseio.com',
    projectId: 'phant2',
    storageBucket: 'phant2.appspot.com',
    messagingSenderId: '549616258237',
    appId: '1:549616258237:web:c77d300427ebf7a2477bd4',
    measurementId: 'G-YLKYPF1RJW',
  },
];

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  db: any;
  dbId: number = 0;

  dbInit(dbParams: any) {
    dbParams = Object.keys(dbParams).length
      ? dbParams
      : {
          dbId: Math.floor(Math.random() * firebaseConfigs.length),
        };
    this.dbId = dbParams.dbId;
    this.db = getDatabase(
      initializeApp(firebaseConfigs[this.dbId], this.dbId.toString())
    );
  }

  constructor() {}
}
