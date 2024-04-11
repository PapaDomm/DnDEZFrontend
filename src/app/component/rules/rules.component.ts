import { Component } from '@angular/core';
import { RuleModel } from '../../models/rule-model';
import { DnDRulesService } from '../../services/DndRules/dn-drules.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.css'
})
export class RulesComponent {

  constructor(private DnDService: DnDRulesService, private userservice : UserService) {}

  rules:RuleModel[] = [];

  abiCheck:RuleModel = {} as RuleModel; 

  abiScore:RuleModel = {} as RuleModel;

  profBonus:RuleModel = {} as RuleModel;

  savingThrow:RuleModel = {} as RuleModel;

  abiRule:RuleModel = {} as RuleModel;

  charRules:RuleModel[] = [];

  ngOnInit() {
    this.getRules();
  }

  getRules() {
    this.DnDService.GetRules().subscribe((response) => {
      this.rules = response;
      this.getCharacterRules();
    });
  }

  getCharacterRules() {

    this.abiCheck = this.rules.filter(r => r.name == "Ability Checks")[0];
    this.abiScore = this.rules.filter(r => r.name == "Ability Scores and Modifiers")[0];
    this.profBonus = this.rules.filter(r => r.name == "Proficiency Bonus")[0];
    this.savingThrow = this.rules.filter(r => r.name == "Saving Throws")[0];
    this.abiRule = this.rules.filter(r => r.name == "Using Each Ability")[0];

    this.charRules.push(this.abiCheck);
    this.charRules.push(this.abiScore); 
    this.charRules.push(this.profBonus);
    this.charRules.push(this.savingThrow);
    this.charRules.push(this.abiRule);
  }


}
