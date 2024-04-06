import { Component } from '@angular/core';

@Component({
  selector: 'app-die',
  standalone: true,
  imports: [],
  templateUrl: './die.component.html',
  styleUrl: './die.component.scss'
})
export class DieComponent {

  constructor() {}
  die: HTMLElement | undefined;
  sides: number = 20;
  initialSide: number = 1;
  lastFace: number | undefined; 
  timeoutId: any;
  transitionDuration: number = 500;
  animationDuration: number = 1000;

  ngOnInit(): void {
    this.die = document.querySelector('.die') as HTMLElement;

    document.querySelectorAll('.randomize, .die').forEach(element => {
      element.addEventListener('click', () => {
        event?.preventDefault();
        this.die!.classList.add('rolling');
        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
          this.die!.classList.remove('rolling');
          this.rollTo(this.randomFace().toString());
        }, this.animationDuration);
      });
    });
  }

  randomFace(): number {
    let face = Math.floor((Math.random() * this.sides)) + this.initialSide;
    this.lastFace = face;
    return face;
  }

  rollTo(face: string | null): void {
    clearTimeout(this.timeoutId);

    this.die!.setAttribute('data-face', face || '');
  }

}
