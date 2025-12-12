import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../core/component/header/header';
import { Footer } from '../../core/component/footer/footer';
import { Sidebar } from '../../core/component/sidebar/sidebar';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [
    RouterOutlet, 
    Header,
    Footer,
    Sidebar
  ],
  templateUrl: './secure.html',
  styleUrl: './secure.scss',
})
export class Secure {

}
