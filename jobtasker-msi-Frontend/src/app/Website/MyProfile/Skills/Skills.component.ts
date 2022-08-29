import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-Skills',
  templateUrl: './Skills.component.html',
  styleUrls: ['./Skills.component.scss']
})
export class SkillsComponent implements OnInit {

  newSelectedSkill : any = [];
  perAddedSkills : any = [];

  newSkill = '';

  states: any;

  constructor(private ds : DataService,
    private ts : ToastrService) { 
      this.ds.getSkillList().subscribe((resp: any) => {
        if (resp.success) {
          this.states = resp.data
        }
      })
      this.ds.getMySkill().subscribe((resp:any) => {
        if (resp.success) {
          for (const item of resp.data) {
            let obj = {
              id : item.skill.id,
              title : item.skill.title
            }
            console.log(obj);
            
            this.perAddedSkills.push(obj);
          }
        }
      })
    }

  ngOnInit() {
  }

  selectSkills(_id : number, _title : string ) : void {
    const obj = {
      id : _id,
      title : _title,
    };
    let newObj = this.perAddedSkills.filter((x : any) => x.id == _id);

    if (newObj.length > 0) {
      let removeItem = [];
      for (const i of this.perAddedSkills) {
        if (i.id != _id) {
          removeItem.push(i)
        }
      }
      this.perAddedSkills = removeItem;
      return;
    }   

    this.perAddedSkills.push(obj);

  }

  addNewSkill() : void {

    if (this.newSkill == '') {
      this.ts.warning('Please enter same skill to add in the list');
      return;
    }

    const obj = {
      title : this.newSkill
    }

    this.ds.addSkill(obj).subscribe((resp: any) => {
      if (resp.success) {
        let newObj = this.perAddedSkills.filter((x : any) => x.id == resp.data.id);
        if (newObj.length == 0) {
          this.states.push(resp.data);
          let obj = {
            id : resp.data.id,
            title : resp.data.title
          };
          this.perAddedSkills.push(obj);
        }
        this.newSkill = '';
      }
    })
  }

  updateSkill() : void {
    if (this.perAddedSkills.length < 1) {
      this.ts.warning('Please add skill to update');
      return;
    }

    let obj = {
      skillList : this.perAddedSkills
    }

    this.ds.updateSkill(obj).subscribe((resp:any) => {
      if (resp.success) {
        this.ts.success('The skills have been updated to your profile')
      } else {
        this.ts.error(resp.errors.general)
      }
    })

  }
 
}
