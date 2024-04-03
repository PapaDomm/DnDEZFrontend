import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { CharacterCreatorComponent } from './component/character-creator/character-creator.component';
import { UserpageComponent } from './component/userpage/userpage.component';
import { CharacterdetailsComponent } from './component/characterdetails/characterdetails.component';
import { RegisterpageComponent } from './component/registerpage/registerpage.component';
import { UpdatecharacterComponent } from './component/updatecharacter/updatecharacter.component';
import { AboutpageComponent } from './component/aboutpage/aboutpage.component';

export const routes: Routes = [
    {path: "Home", component: HomeComponent},
    {path: "CharacterCreator", component: CharacterCreatorComponent},
    {path: "CharacterCreator/:index", component: CharacterCreatorComponent},
    {path: "Profile/:id", component: UserpageComponent},
    {path: "Character/:id", component: CharacterdetailsComponent},
    {path: "Register", component: RegisterpageComponent},
    {path: "UpdateCharacter", component: UpdatecharacterComponent},
    {path: "About", component : AboutpageComponent},
    {path: "**", component : HomeComponent}
]; 
