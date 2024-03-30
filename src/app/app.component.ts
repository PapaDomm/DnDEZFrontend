import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterCreatorComponent } from './component/character-creator/character-creator.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CharacterCreatorComponent, HeaderComponent, FooterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DnDEZFrontEnd';
}
