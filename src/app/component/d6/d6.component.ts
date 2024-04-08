import { TokenType } from '@angular/compiler';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-d6',
  standalone: true,
  imports: [],
  templateUrl: './d6.component.html',
  styleUrl: './d6.component.scss'
})
export class D6Component {
  @Input() dieNumber : number = 0;
  @Input() rolls : number = 0;
  @Input() type : string = '';
  @Output() getAbi = new EventEmitter<number>();
  @Output() getHealth = new EventEmitter<number>();


  die: HTMLElement | undefined;
  sides: number = 6;
  initialSide: number = 1;
  lastFace: number | undefined;
  timeoutId: any;
  transitionDuration: number = 500;
  animationDuration: number = 1000;
  dieToSelect : string = '';
  statsNums : number[] = [];

  ngOnInit(): void {
    this.dieToSelect = `.die-${this.dieNumber.toString()}`;
    this.die = document.querySelector(this.dieToSelect) as HTMLElement;
  }

  onClick(){
    if(this.rolls > 0){
      this.die = document.querySelector(this.dieToSelect) as HTMLElement;
      event?.preventDefault();
      this.die!.classList.add('rolling');
      clearTimeout(this.timeoutId);
  
      this.timeoutId = setTimeout(() => {
        this.die!.classList.remove('rolling');
        this.rollTo(this.randomFace().toString());
      }, this.animationDuration);
      this.rolls -- ;
    }
    
  }

  statsScore(){
    if(this.statsNums.length == 4){
      clearTimeout(this.timeoutId)

      this.timeoutId = setTimeout(() => {
        let min = Math.min.apply(null, this.statsNums);
        let index = this.statsNums.findIndex(n => n == min);
        this.statsNums.splice(index, 1);
        let total = this.statsNums.reduce((lastNum : number, currentNum : number) => {
          return lastNum += currentNum;
        });
        
        this.getAbi.emit(total)
        return total;
      }, this.animationDuration)
      
    }
    let total = this.statsNums.reduce((lastNum : number, currentNum : number) => {
      return lastNum += currentNum;
    });
    return total;
  }

  randomFace(): number {
    let face = Math.floor((Math.random() * this.sides)) + this.initialSide;
    this.lastFace = face;
    if(this.type == "health"){
      this.getHealth.emit(face);
    }
    else{
      this.statsNums.push(this.lastFace);
    }
    
    return face;
  }
  rollTo(face: string | null): void {
    clearTimeout(this.timeoutId);
    this.die!.setAttribute('data-face', face || '');
  }
}
