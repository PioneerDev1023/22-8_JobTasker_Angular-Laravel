import { firebaseConfig } from './../../../environments/environment';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, OnInit, ViewChild } from '@angular/core';
//import { AngularFireDatabase  } from '@angular/fire/compat/database';
import { getDatabase, ref, set, child, push, get, query, orderByChild, equalTo, onValue, onChildAdded, onChildRemoved, onChildChanged } from 'firebase/database';


@Component({
  selector: 'app-Chat',
  templateUrl: './Chat.component.html',
  styleUrls: ['./Chat.component.scss']
})
export class ChatComponent implements OnInit {
  //itemsCollection : AngularFirestoreCollection<any>;
  db = getDatabase();
  constructor() { 
    onChildAdded(ref(this.db, '/chats'), (resp) => {
      resp.forEach(element => {
        console.log('Add',element.val())
      });
    });

    onChildChanged(ref(this.db, '/chats'), (resp) => {
      resp.forEach(element => {
        console.log('change',element.val())
      });
    });

    onChildRemoved(ref(this.db, '/chats'), (resp) => {
      resp.forEach(element => {
        console.log('remove',element.val())
      });
    });
  }

  ngOnInit() {
  }

  create() {
    const newPostKey = push(child(ref(this.db), 'chats')).key;
    set(ref(this.db, 'chats/' + newPostKey), {
      date : new Date(),
      message : 'hello world',
      nickname : 'abc',
      roomname : '123',
      type : "message"
    });
    
  }

}
