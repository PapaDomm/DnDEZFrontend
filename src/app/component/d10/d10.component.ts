import { Component } from '@angular/core';

@Component({
  selector: 'app-d10',
  standalone: true,
  imports: [],
  templateUrl: './d10.component.html',
  styleUrl: './d10.component.scss'
})
export class D10Component {

  constructor() {}
  die: HTMLElement | undefined;
  sides: number = 10;
  initialSide: number = 1;
  lastFace: number | undefined; 
  timeoutId: any;
  transitionDuration: number = 500;
  animationDuration: number = 1000;

  ngOnInit(): void {
    this.die = document.querySelector('.die1') as HTMLElement;

    document.querySelectorAll('ul > li > a').forEach(anchor => {
      anchor.addEventListener('click', (event) => {
        this.reset();
        this.rollTo((event.target as HTMLAnchorElement).getAttribute('href'));
        event.preventDefault();
      });
    });

    document.querySelectorAll('.randomize, .die1').forEach(element => {
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
    this.lastFace = this.lastFace === face ? this.randomFace() : face;
    return face;
  }

  rollTo(face: string | null): void {
    clearTimeout(this.timeoutId);
    document.querySelectorAll('ul > li > a').forEach(anchor => {
      anchor.classList.remove('active');
    });
    if (face) {
      document.querySelector(`[href='${face}']`)?.classList.add('active');
    }
    this.die!.setAttribute('data-face', face || '');
  }

  reset(): void {
    this.die!.setAttribute('data-face', '');
    this.die!.classList.remove('rolling');
  }
}

