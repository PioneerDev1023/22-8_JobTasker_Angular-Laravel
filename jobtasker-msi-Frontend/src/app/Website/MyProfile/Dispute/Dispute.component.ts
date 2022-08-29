import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { getDatabase, ref, set, child, push, get, query, orderByChild } from 'firebase/database';

@Component({
  selector: 'app-Dispute',
  templateUrl: './Dispute.component.html',
  styleUrls: ['./Dispute.component.scss']
})
export class DisputeComponent implements OnInit {

  filledByMe : any;
  againestMe : any;

  //ref = firebase.database().ref('rooms/');
  db = getDatabase();

  constructor(private ds : DataService,
              private ts : ToastrService,
              private route : Router) { }

  ngOnInit() {
    this.ds.getIFilledDispute().subscribe((resp: any) => {
      if (resp.success) {
        this.filledByMe = resp.data;
      }  
    });
    this.ds.getDisputeAgainestMe().subscribe((resp: any) => {
      if (resp.success) {
        this.againestMe = resp.data;
      }
    })
  }

  startChat(chatRoom: string) : void {
    this.route.navigate(['/profile/dispute-chat', chatRoom])
    // let room = {
    //   roomname : chatRoom
    // }

    // const mostViewedPosts = query(ref(this.db, 'rooms'), orderByChild(room.roomname));

    // console.log(mostViewedPosts);
    

    // //const dbRef = ref(getDatabase());


    // // get(child(dbRef, 'rooms/')).then((resp: any) => {
    // //    let ab = equalTo(room.roomname);
    // //    console.log(ab.length);
       
    // // })



    // // const newPostKey = push(child(ref(this.db), 'rooms')).key;
    // // set(ref(this.db, 'rooms/' + newPostKey), room);
    // // this.ref.orderByChild('roomname').equalTo(room.roomname).once('value', (snapshot: any) => {
    // //   if (snapshot.exists()) {
        
    // //   } else {
    // //     const newRoom = firebase.database().ref('rooms/').push();
    // //     newRoom.set(room);
    // //     //this.router.navigate(['/roomlist']);
    // //   }
    // // });
  }

}
