import { Component } from '@angular/core';

@Component({
  selector: 'app-d6',
  standalone: true,
  imports: [],
  templateUrl: './d6.component.html',
  styleUrl: './d6.component.scss'
})
export class D6Component {
  die: HTMLElement | undefined;
  sides: number = 6;
  initialSide: number = 1;
  lastFace: number | undefined;
  timeoutId: any;
  transitionDuration: number = 500;
  animationDuration: number = 1000;
  ngOnInit(): void {
    this.die = document.querySelector('.die3') as HTMLElement;
    document.querySelectorAll('.randomize, .die3').forEach(element => {
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
