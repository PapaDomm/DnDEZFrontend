import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-d10',
  standalone: true,
  imports: [],
  templateUrl: './d10.component.html',
  styleUrl: './d10.component.scss'
})
export class D10Component {

  constructor() {}
  @Input() dieNumber : number = 0;
  @Input() rolls : number = 0;
  @Output() getHealth = new EventEmitter<number>();

  die: HTMLElement | undefined;
  sides: number = 10;
  initialSide: number = 0;
  lastFace: number | undefined; 
  timeoutId: any;
  transitionDuration: number = 500;
  animationDuration: number = 1000;
  dieToSelect : string = '';

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


  randomFace(): number {
    let face = Math.floor((Math.random() * this.sides)) + this.initialSide;
    this.lastFace = face;
    if(this.lastFace == 0){
      this.lastFace = 10;
    }
    this.getHealth.emit(this.lastFace);
    return face;
  }
  rollTo(face: string | null): void {
    clearTimeout(this.timeoutId);
    this.die!.setAttribute('data-face', face || '');
  }
}

