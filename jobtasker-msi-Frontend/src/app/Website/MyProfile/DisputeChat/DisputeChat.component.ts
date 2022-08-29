import { ApiService } from './../../../servies/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { getDatabase, ref, set, child, push, get, query, orderByChild, equalTo, onValue, onChildAdded, onChildRemoved, onChildChanged } from 'firebase/database';



@Component({
  selector: 'app-DisputeChat',
  templateUrl: './DisputeChat.component.html',
  styleUrls: ['./DisputeChat.component.scss']
})
export class DisputeChatComponent implements OnInit {

  db = getDatabase();

  @ViewChild('chatcontent') chatcontent : ElementRef | undefined;
  scrolltop : number = 0;

  chatForm!: UntypedFormGroup;
  nickname : any;
  roomname : any;
  message = '';
  users = [];
  chats: any = [] ;

  constructor(private formBuilder: UntypedFormBuilder,private route : ActivatedRoute, private api : ApiService) { 
    this.roomname = this.route.snapshot.paramMap.get('roomname');
    this.nickname = this.api.getUser().name;
    const filter = equalTo(this.roomname, 'roomname');
    console.log('filter', filter);
    
    onChildAdded(ref(this.db, '/chats'), (resp) => {
      resp.forEach(element => {
        console.log('Add', element.ref.isEqual(query(ref(this.db, '/chats'), orderByChild('123'))))
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
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }

  onFormSubmit(form: any) {
    const chat = form;
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = new Date();
    chat.type = 'message';
    console.log(chat);
    // let obj = {
    //   roomname : 'test',
    //   nickname : 'user',
    //   date : new Date(),
    //   message : chat.value.message
    // }
    //const newMessage = firebase.database().ref('chats/').push();
    //newMessage.set(chat);
    this.chats.push(chat)
    this.chatForm = this.formBuilder.group({
      'message' : [null, Validators.required]
    });
  }

}
