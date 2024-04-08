import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-die',
  standalone: true,
  imports: [],
  templateUrl: './die.component.html',
  styleUrl: './die.component.scss'
})
export class DieComponent {

  constructor() {}
  @Input() dieNumber : number = 0;
  @Output() getAbi = new EventEmitter<number>();

  die: HTMLElement | undefined;
  sides: number = 20;
  initialSide: number = 1;
  lastFace: number | undefined; 
  timeoutId: any;
  transitionDuration: number = 500;
  animationDuration: number = 1000;
  dieToSelect : string = '';
  rolls : number = 1;

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
    return face;
  }

  rollTo(face: string | null): void {
    clearTimeout(this.timeoutId);

    this.die!.setAttribute('data-face', face || "");
    this.getAbi.emit(Number(face))
  }

}
